"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import {
    LayoutDashboard,
    ShoppingBag,
    Bed,
    Plane,
    Hammer,
    Building2,
    LogOut,
    ChevronRight,
    Home
} from "lucide-react";

const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Shop / Electronics", href: "/admin/shop", icon: ShoppingBag },
    { name: "Foam Products", href: "/admin/foam", icon: Bed },
    { name: "Travel Packages", href: "/admin/travel", icon: Plane },
    { name: "Building Materials", href: "/admin/materials", icon: Hammer },
    { name: "Plaza & Tenants", href: "/admin/plaza", icon: Building2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading, admin, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f1419" }}>
                <div className="w-8 h-8 border-3 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen flex" style={{ background: "#0f1419" }}>
            {/* Sidebar */}
            <aside
                className="w-64 fixed left-0 top-0 bottom-0 flex flex-col"
                style={{
                    background: "linear-gradient(180deg, #1a1f26 0%, #0f1419 100%)",
                    borderRight: "1px solid rgba(255,255,255,0.08)"
                }}
            >
                {/* Logo */}
                <div className="p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <Link href="/" className="flex items-center gap-2">
                        <span
                            className="text-lg font-bold text-white tracking-tight"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            HYDARA
                        </span>
                        <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: "#0d5c3f", color: "#fff" }}
                        >
                            Admin
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                                style={{
                                    background: isActive ? "rgba(13, 92, 63, 0.2)" : "transparent",
                                    color: isActive ? "#4ade80" : "rgba(255,255,255,0.6)",
                                }}
                            >
                                <link.icon size={18} />
                                <span className="flex-1">{link.name}</span>
                                {isActive && <ChevronRight size={16} />}
                            </Link>
                        );
                    })}
                </nav>

                {/* User & Logout */}
                <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <div className="mb-3 px-4">
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Logged in as</p>
                        <p className="text-sm font-medium text-white truncate">{admin?.username}</p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href="/"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                color: "rgba(255,255,255,0.6)"
                            }}
                        >
                            <Home size={16} />
                            Site
                        </Link>
                        <button
                            onClick={() => {
                                logout();
                                router.push("/");
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-red-500/20"
                            style={{
                                background: "rgba(239, 68, 68, 0.1)",
                                color: "#ef4444"
                            }}
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
