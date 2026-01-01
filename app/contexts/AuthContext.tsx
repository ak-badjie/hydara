"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Admin {
    id: string;
    username: string;
}

interface AuthContextType {
    admin: Admin | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = "hydara_admin";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (stored) {
            try {
                setAdmin(JSON.parse(stored));
            } catch {
                localStorage.removeItem(ADMIN_STORAGE_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        if (!db) return false;

        try {
            // Query admins collection for matching username
            const adminsRef = collection(db, "admins");
            const q = query(adminsRef, where("username", "==", username.toLowerCase()));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                return false;
            }

            const adminDoc = snapshot.docs[0];
            const adminData = adminDoc.data();

            // Simple password check (in production, use proper hashing)
            if (adminData.password === password) {
                const adminUser: Admin = {
                    id: adminDoc.id,
                    username: adminData.username
                };
                setAdmin(adminUser);
                localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
                return true;
            }

            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem(ADMIN_STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value={{
            admin,
            isLoading,
            login,
            logout,
            isAuthenticated: !!admin
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

