"use client";

import { useState, useEffect, useCallback } from "react";
import {
    collection,
    query,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    orderBy,
    Timestamp,
    DocumentData
} from "firebase/firestore";
import { db } from "../firebase";

// Types
export interface Product {
    id?: string;
    name: string;
    price: number;
    currency: string;
    category: string;
    badge: string | null;
    imageUrl: string;
    rating: number;
    section: "electronics" | "foam" | "furniture";
    tags: string[];
    size?: string;
    createdAt?: Timestamp;
}

export interface TravelPackage {
    id?: string;
    name: string;
    description: string;
    duration: string;
    price: number;
    features: string[];
    label: string;
    popular: boolean;
    imageUrl: string;
}

export interface MaterialCategory {
    id?: string;
    name: string;
    label: string;
    imageUrl: string;
}

export interface PlazaShop {
    id?: string;
    name: string;
    floor: string;
    label: string;
    imageUrl: string;
}

export interface GalleryImage {
    id?: string;
    label: string;
    imageUrl: string;
    section: string;
}

export interface SiteImage {
    id?: string;
    name: string;
    url: string;
    type: "hero" | "foam" | "plaza" | "smart-tv";
}

// Generic hook for Firestore collections
function useFirestoreCollection<T extends DocumentData>(collectionName: string) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!db) return;
        try {
            setLoading(true);
            const q = query(collection(db, collectionName));
            const snapshot = await getDocs(q);
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as unknown as T[];
            setData(items);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [collectionName]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const addItem = async (item: Omit<T, "id">) => {
        if (!db) return;
        try {
            const docRef = await addDoc(collection(db, collectionName), {
                ...item,
                createdAt: Timestamp.now()
            });
            await fetchData();
            return docRef.id;
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    };

    const updateItem = async (id: string, updates: Partial<T>) => {
        if (!db) return;
        try {
            await updateDoc(doc(db, collectionName, id), updates as DocumentData);
            await fetchData();
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    };

    const deleteItem = async (id: string) => {
        if (!db) return;
        try {
            await deleteDoc(doc(db, collectionName, id));
            await fetchData();
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    };

    return { data, loading, error, refetch: fetchData, addItem, updateItem, deleteItem };
}

// Specific hooks
export function useProducts() {
    return useFirestoreCollection<Product>("products");
}

export function useElectronicsProducts() {
    const { data, ...rest } = useFirestoreCollection<Product>("products");
    return {
        data: data.filter(p => p.section === "electronics"),
        ...rest
    };
}

export function useFoamProducts() {
    const { data, ...rest } = useFirestoreCollection<Product>("products");
    return {
        data: data.filter(p => p.section === "foam" || p.section === "furniture"),
        mattresses: data.filter(p => p.section === "foam"),
        furniture: data.filter(p => p.section === "furniture"),
        ...rest
    };
}

export function useTravelPackages() {
    return useFirestoreCollection<TravelPackage>("travelPackages");
}

export function useMaterialCategories() {
    return useFirestoreCollection<MaterialCategory>("materialCategories");
}

export function usePlazaShops() {
    return useFirestoreCollection<PlazaShop>("plazaShops");
}

export function useGalleryImages() {
    return useFirestoreCollection<GalleryImage>("galleryImages");
}

export function useSiteImages() {
    return useFirestoreCollection<SiteImage>("siteImages");
}

// Search across all collections
export function useSearch(searchQuery: string) {
    const [results, setResults] = useState<{
        products: Product[];
        packages: TravelPackage[];
        materials: MaterialCategory[];
        shops: PlazaShop[];
    }>({ products: [], packages: [], materials: [], shops: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!searchQuery.trim() || !db) {
            setResults({ products: [], packages: [], materials: [], shops: [] });
            return;
        }

        const search = async () => {
            setLoading(true);
            const query_lower = searchQuery.toLowerCase();

            try {
                // Fetch all collections
                const [productsSnap, packagesSnap, materialsSnap, shopsSnap] = await Promise.all([
                    getDocs(collection(db, "products")),
                    getDocs(collection(db, "travelPackages")),
                    getDocs(collection(db, "materialCategories")),
                    getDocs(collection(db, "plazaShops"))
                ]);

                const products = productsSnap.docs
                    .map(doc => ({ id: doc.id, ...doc.data() } as Product))
                    .filter(p =>
                        p.name.toLowerCase().includes(query_lower) ||
                        p.category?.toLowerCase().includes(query_lower) ||
                        p.tags?.some(t => t.toLowerCase().includes(query_lower))
                    );

                const packages = packagesSnap.docs
                    .map(doc => ({ id: doc.id, ...doc.data() } as TravelPackage))
                    .filter(p =>
                        p.name.toLowerCase().includes(query_lower) ||
                        p.description?.toLowerCase().includes(query_lower)
                    );

                const materials = materialsSnap.docs
                    .map(doc => ({ id: doc.id, ...doc.data() } as MaterialCategory))
                    .filter(m => m.name.toLowerCase().includes(query_lower));

                const shops = shopsSnap.docs
                    .map(doc => ({ id: doc.id, ...doc.data() } as PlazaShop))
                    .filter(s => s.name.toLowerCase().includes(query_lower));

                setResults({ products, packages, materials, shops });
            } catch (err) {
                console.error("Search error:", err);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(search, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    return { results, loading };
}
