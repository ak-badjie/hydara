"use client";

import { useProducts, useTravelPackages, useMaterialCategories, usePlazaShops } from "@/lib/hooks/useFirestore";
import { ShoppingBag, Bed, Plane, Hammer, Building2, TrendingUp, Package, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const { data: products, loading: productsLoading } = useProducts();
    const { data: packages, loading: packagesLoading } = useTravelPackages();
    const { data: materials, loading: materialsLoading } = useMaterialCategories();
    const { data: shops, loading: shopsLoading } = usePlazaShops();

    const isLoading = productsLoading || packagesLoading || materialsLoading || shopsLoading;

    const stats = [
        {
            name: "Shop Products",
            count: products.filter(p => p.section === "electronics").length,
            icon: ShoppingBag,
            color: "#3b82f6",
            href: "/admin/shop"
        },
        {
            name: "Foam Products",
            count: products.filter(p => p.section === "foam" || p.section === "furniture").length,
            icon: Bed,
            color: "#22c55e",
            href: "/admin/foam"
        },
        {
            name: "Travel Packages",
            count: packages.length,
            icon: Plane,
            color: "#f59e0b",
            href: "/admin/travel"
        },
        {
            name: "Material Categories",
            count: materials.length,
            icon: Hammer,
            color: "#ec4899",
            href: "/admin/materials"
        },
        {
            name: "Plaza Shops",
            count: shops.length,
            icon: Building2,
            color: "#8b5cf6",
            href: "/admin/plaza"
        },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1
                    className="text-3xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-outfit)", color: "#0d5c3f" }}
                >
                    Dashboard
                </h1>
                <p style={{ color: "#666" }}>
                    Manage your Hydara Trading content and products
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {stats.map((stat) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                        style={{
                            background: "white",
                            border: "1px solid #e8e6e1"
                        }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ background: `${stat.color}15` }}
                            >
                                <stat.icon size={24} style={{ color: stat.color }} />
                            </div>
                            <TrendingUp size={18} style={{ color: "#ccc" }} />
                        </div>
                        <div>
                            <p className="text-sm mb-1" style={{ color: "#888" }}>
                                {stat.name}
                            </p>
                            <p className="text-3xl font-bold" style={{ color: "#333" }}>
                                {isLoading ? "—" : stat.count}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div
                className="p-6 rounded-2xl mb-8"
                style={{
                    background: "white",
                    border: "1px solid #e8e6e1"
                }}
            >
                <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-outfit)", color: "#333" }}>
                    Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Link
                        href="/admin/shop"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:opacity-80"
                        style={{ background: "rgba(59, 130, 246, 0.1)" }}
                    >
                        <Package size={18} style={{ color: "#3b82f6" }} />
                        <span className="text-sm font-medium" style={{ color: "#3b82f6" }}>
                            Add Product
                        </span>
                    </Link>
                    <Link
                        href="/admin/travel"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:opacity-80"
                        style={{ background: "rgba(245, 158, 11, 0.1)" }}
                    >
                        <Plane size={18} style={{ color: "#f59e0b" }} />
                        <span className="text-sm font-medium" style={{ color: "#f59e0b" }}>
                            Add Package
                        </span>
                    </Link>
                    <Link
                        href="/admin/materials"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:opacity-80"
                        style={{ background: "rgba(236, 72, 153, 0.1)" }}
                    >
                        <Hammer size={18} style={{ color: "#ec4899" }} />
                        <span className="text-sm font-medium" style={{ color: "#ec4899" }}>
                            Add Category
                        </span>
                    </Link>
                    <Link
                        href="/admin/plaza"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:opacity-80"
                        style={{ background: "rgba(139, 92, 246, 0.1)" }}
                    >
                        <Building2 size={18} style={{ color: "#8b5cf6" }} />
                        <span className="text-sm font-medium" style={{ color: "#8b5cf6" }}>
                            Add Shop
                        </span>
                    </Link>
                </div>
            </div>

            {/* Info Card */}
            <div
                className="p-6 rounded-2xl flex items-start gap-4"
                style={{
                    background: "rgba(13, 92, 63, 0.08)",
                    border: "1px solid rgba(13, 92, 63, 0.2)"
                }}
            >
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(13, 92, 63, 0.15)" }}
                >
                    <AlertCircle size={20} style={{ color: "#0d5c3f" }} />
                </div>
                <div>
                    <h3 className="font-medium mb-1" style={{ color: "#0d5c3f" }}>Getting Started</h3>
                    <p className="text-sm" style={{ color: "#555" }}>
                        Use the sidebar to navigate between sections. You can add, edit, and delete
                        products from each section. Images are automatically uploaded to Firebase Storage.
                    </p>
                </div>
            </div>
        </div>
    );
}
