"use client";

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDICqj7kkDh92xEM5QW3P0gqPd6G6TtASY",
    authDomain: "hydara.firebaseapp.com",
    projectId: "hydara",
    storageBucket: "hydara.firebasestorage.app",
    messagingSenderId: "106638362146",
    appId: "1:106638362146:web:ad71595d916b7f796eec7b",
    measurementId: "G-1G7WL5RYV8"
};

// Initialize Firebase (prevent multiple initializations)
let app: FirebaseApp;
let db: Firestore;
let storage: FirebaseStorage;

if (typeof window !== "undefined") {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    storage = getStorage(app);
}

export { app, db, storage };
export { firebaseConfig };
