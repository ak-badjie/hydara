"use client";

import { useEffect, useState } from "react";
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
    Home,
    Menu,
    X
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
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: "#fafafa" }}>
                <div className="w-8 h-8 border-3 border-[#0d5c3f]/20 border-t-[#0d5c3f] rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen flex" style={{ background: "#fafafa" }}>
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/30 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-0 bottom-0 w-64 flex flex-col z-50
                    transform transition-transform duration-300 lg:translate-x-0
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
                style={{
                    background: "white",
                    borderRight: "1px solid #e8e6e1"
                }}
            >
                {/* Logo */}
                <div className="p-6 flex items-center justify-between" style={{ borderBottom: "1px solid #e8e6e1" }}>
                    <Link href="/" className="flex items-center gap-2">
                        <span
                            className="text-lg font-bold tracking-tight"
                            style={{ fontFamily: "var(--font-outfit)", color: "#0d5c3f" }}
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
                    <button
                        className="lg:hidden p-2 hover:bg-black/5 rounded-lg"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={20} style={{ color: "#333" }} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                                style={{
                                    background: isActive ? "rgba(13, 92, 63, 0.1)" : "transparent",
                                    color: isActive ? "#0d5c3f" : "#555",
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
                <div className="p-4" style={{ borderTop: "1px solid #e8e6e1" }}>
                    <div className="mb-3 px-4">
                        <p className="text-xs" style={{ color: "#888" }}>Logged in as</p>
                        <p className="text-sm font-medium truncate" style={{ color: "#333" }}>{admin?.username}</p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href="/"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-black/5"
                            style={{
                                background: "#f5f5f5",
                                color: "#555"
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
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-red-100"
                            style={{
                                background: "#fef2f2",
                                color: "#dc2626"
                            }}
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64">
                {/* Mobile Header */}
                <div className="lg:hidden sticky top-0 z-30 flex items-center gap-4 px-4 py-3" style={{ background: "white", borderBottom: "1px solid #e8e6e1" }}>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 hover:bg-black/5 rounded-lg"
                    >
                        <Menu size={20} style={{ color: "#333" }} />
                    </button>
                    <span className="font-semibold" style={{ color: "#0d5c3f", fontFamily: "var(--font-outfit)" }}>
                        Admin Dashboard
                    </span>
                </div>
                <div className="p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
