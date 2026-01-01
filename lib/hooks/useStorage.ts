"use client";

import { useState, useCallback } from "react";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

interface UploadProgress {
    progress: number;
    downloadUrl: string | null;
    error: Error | null;
    isUploading: boolean;
}

export function useStorage() {
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
        progress: 0,
        downloadUrl: null,
        error: null,
        isUploading: false
    });

    const uploadFile = useCallback(async (
        file: File,
        path: string,
        onProgress?: (progress: number) => void
    ): Promise<string> => {
        if (!storage) {
            throw new Error("Storage not initialized");
        }

        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, path);
            const uploadTask = uploadBytesResumable(storageRef, file);

            setUploadProgress({
                progress: 0,
                downloadUrl: null,
                error: null,
                isUploading: true
            });

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(prev => ({ ...prev, progress }));
                    onProgress?.(progress);
                },
                (error) => {
                    setUploadProgress(prev => ({
                        ...prev,
                        error,
                        isUploading: false
                    }));
                    reject(error);
                },
                async () => {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    setUploadProgress({
                        progress: 100,
                        downloadUrl,
                        error: null,
                        isUploading: false
                    });
                    resolve(downloadUrl);
                }
            );
        });
    }, []);

    const deleteFile = useCallback(async (path: string) => {
        if (!storage) {
            throw new Error("Storage not initialized");
        }

        const storageRef = ref(storage, path);
        await deleteObject(storageRef);
    }, []);

    const uploadImage = useCallback(async (
        file: File,
        folder: string = "images"
    ): Promise<string> => {
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const path = `${folder}/${timestamp}_${safeName}`;
        return uploadFile(file, path);
    }, [uploadFile]);

    return {
        uploadFile,
        uploadImage,
        deleteFile,
        ...uploadProgress
    };
}
