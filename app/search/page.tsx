"use client";

import { useState } from "react";
import { Search, X, ShoppingBag, Bed, Plane, Hammer, Building2, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import { useSearch } from "@/lib/hooks/useFirestore";

const sectionFilters = [
    { id: "all", name: "All", icon: Search },
    { id: "products", name: "Shop", icon: ShoppingBag },
    { id: "foam", name: "Foam", icon: Bed },
    { id: "travel", name: "Travel", icon: Plane },
    { id: "materials", name: "Materials", icon: Hammer },
    { id: "plaza", name: "Plaza", icon: Building2 },
];

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const { results, loading } = useSearch(query);

    const filteredProducts = activeFilter === "all" || activeFilter === "products"
        ? results.products.filter(p => p.section === "electronics")
        : [];
    const filteredFoam = activeFilter === "all" || activeFilter === "foam"
        ? results.products.filter(p => p.section === "foam" || p.section === "furniture")
        : [];
    const filteredPackages = activeFilter === "all" || activeFilter === "travel" ? results.packages : [];
    const filteredMaterials = activeFilter === "all" || activeFilter === "materials" ? results.materials : [];
    const filteredShops = activeFilter === "all" || activeFilter === "plaza" ? results.shops : [];

    const hasResults = filteredProducts.length > 0 || filteredFoam.length > 0 ||
        filteredPackages.length > 0 || filteredMaterials.length > 0 ||
        filteredShops.length > 0;

    return (
        <>
            <Navigation />
            <main className="min-h-screen pt-24 pb-16" style={{ background: "#fafafa" }}>
                <div className="section-container">
                    {/* Search Header */}
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1
                            className="text-4xl md:text-5xl font-bold mb-4"
                            style={{ color: "#0d5c3f", fontFamily: "var(--font-outfit)" }}
                        >
                            Search Everything
                        </h1>
                        <p className="text-lg mb-8" style={{ color: "#666" }}>
                            Find products, services, and locations across all of Hydara Trading
                        </p>

                        {/* Search Input */}
                        <div className="relative max-w-xl mx-auto">
                            <Search
                                size={22}
                                className="absolute left-5 top-1/2 -translate-y-1/2"
                                style={{ color: "#888" }}
                            />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for products, packages, shops..."
                                className="w-full pl-14 pr-12 py-5 rounded-2xl text-lg outline-none transition-shadow focus:shadow-lg"
                                style={{
                                    background: "white",
                                    border: "2px solid #e8e6e1",
                                    color: "#333"
                                }}
                                autoFocus
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery("")}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 rounded-full"
                                >
                                    <X size={20} style={{ color: "#888" }} />
                                </button>
                            )}
                        </div>

                        {/* Filter Chips */}
                        <div className="flex flex-wrap justify-center gap-2 mt-6">
                            {sectionFilters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all"
                                    style={{
                                        background: activeFilter === filter.id ? "#0d5c3f" : "white",
                                        color: activeFilter === filter.id ? "white" : "#555",
                                        border: "1px solid #e8e6e1"
                                    }}
                                >
                                    <filter.icon size={16} />
                                    {filter.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    {query.trim() === "" ? (
                        <div className="text-center py-20">
                            <div
                                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                                style={{ background: "#e8f5e9" }}
                            >
                                <Search size={32} style={{ color: "#0d5c3f" }} />
                            </div>
                            <p className="text-lg" style={{ color: "#888" }}>
                                Start typing to search across all sections
                            </p>
                        </div>
                    ) : loading ? (
                        <div className="text-center py-20">
                            <div className="w-8 h-8 border-3 border-[#0d5c3f]/20 border-t-[#0d5c3f] rounded-full animate-spin mx-auto" />
                        </div>
                    ) : !hasResults ? (
                        <div className="text-center py-20">
                            <p className="text-lg mb-2" style={{ color: "#888" }}>
                                No results found for &quot;{query}&quot;
                            </p>
                            <p className="text-sm" style={{ color: "#aaa" }}>
                                Try adjusting your search or filters
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {/* Electronics Products */}
                            {filteredProducts.length > 0 && (
                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: "#0d5c3f" }}>
                                            <ShoppingBag size={20} />
                                            Shop / Electronics
                                            <span className="text-sm font-normal" style={{ color: "#888" }}>
                                                ({filteredProducts.length})
                                            </span>
                                        </h2>
                                        <Link href="/electronics" className="text-sm font-medium flex items-center gap-1" style={{ color: "#0d5c3f" }}>
                                            View all <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {filteredProducts.slice(0, 5).map((product) => (
                                            <div key={product.id} className="card-product">
                                                <div className="aspect-square overflow-hidden">
                                                    {product.imageUrl ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                            <ShoppingBag size={32} className="text-gray-300" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-4">
                                                    <div className="flex items-center gap-0.5 mb-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={10} fill={i < 4 ? "#c9a962" : "transparent"} stroke={i < 4 ? "#c9a962" : "#ddd"} />
                                                        ))}
                                                    </div>
                                                    <h3 className="text-sm font-medium truncate" style={{ color: "#0d5c3f" }}>{product.name}</h3>
                                                    <p className="font-semibold mt-1" style={{ color: "#0d5c3f" }}>GMD {product.price?.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Foam Products */}
                            {filteredFoam.length > 0 && (
                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: "#0d5c3f" }}>
                                            <Bed size={20} />
                                            Foam Products
                                            <span className="text-sm font-normal" style={{ color: "#888" }}>
                                                ({filteredFoam.length})
                                            </span>
                                        </h2>
                                        <Link href="/foam" className="text-sm font-medium flex items-center gap-1" style={{ color: "#0d5c3f" }}>
                                            View all <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {filteredFoam.slice(0, 4).map((product) => (
                                            <div key={product.id} className="card-product">
                                                <div className="aspect-square overflow-hidden">
                                                    {product.imageUrl ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                            <Bed size={32} className="text-gray-300" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-4">
                                                    {product.size && (
                                                        <span className="text-xs px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: "#e8f5e9", color: "#2e7d32" }}>
                                                            {product.size}
                                                        </span>
                                                    )}
                                                    <h3 className="text-sm font-medium truncate" style={{ color: "#0d5c3f" }}>{product.name}</h3>
                                                    <p className="font-semibold mt-1" style={{ color: "#0d5c3f" }}>GMD {product.price?.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Travel Packages */}
                            {filteredPackages.length > 0 && (
                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: "#0d5c3f" }}>
                                            <Plane size={20} />
                                            Travel Packages
                                            <span className="text-sm font-normal" style={{ color: "#888" }}>
                                                ({filteredPackages.length})
                                            </span>
                                        </h2>
                                        <Link href="/travel" className="text-sm font-medium flex items-center gap-1" style={{ color: "#0d5c3f" }}>
                                            View all <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        {filteredPackages.slice(0, 3).map((pkg) => (
                                            <div key={pkg.id} className="card-solid">
                                                <div className="aspect-video overflow-hidden rounded-t-xl">
                                                    {pkg.imageUrl ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                                                            <Plane size={48} className="text-orange-200" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-5">
                                                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#fff3e0", color: "#e65100" }}>
                                                        {pkg.label}
                                                    </span>
                                                    <h3 className="text-lg font-semibold mt-3 mb-1" style={{ color: "#0d5c3f" }}>{pkg.name}</h3>
                                                    <p className="text-sm mb-3" style={{ color: "#666" }}>{pkg.duration}</p>
                                                    <p className="font-semibold" style={{ color: "#e65100" }}>From GMD {pkg.price?.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Materials */}
                            {filteredMaterials.length > 0 && (
                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: "#0d5c3f" }}>
                                            <Hammer size={20} />
                                            Building Materials
                                            <span className="text-sm font-normal" style={{ color: "#888" }}>
                                                ({filteredMaterials.length})
                                            </span>
                                        </h2>
                                        <Link href="/materials" className="text-sm font-medium flex items-center gap-1" style={{ color: "#0d5c3f" }}>
                                            View all <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {filteredMaterials.slice(0, 4).map((material) => (
                                            <div key={material.id} className="card-product text-center">
                                                <div className="aspect-square overflow-hidden">
                                                    {material.imageUrl ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={material.imageUrl} alt={material.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                            <Hammer size={32} className="text-gray-300" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="text-sm font-medium" style={{ color: "#0d5c3f" }}>{material.name}</h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Plaza Shops */}
                            {filteredShops.length > 0 && (
                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: "#0d5c3f" }}>
                                            <Building2 size={20} />
                                            Plaza Shops
                                            <span className="text-sm font-normal" style={{ color: "#888" }}>
                                                ({filteredShops.length})
                                            </span>
                                        </h2>
                                        <Link href="/plaza" className="text-sm font-medium flex items-center gap-1" style={{ color: "#0d5c3f" }}>
                                            View all <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {filteredShops.slice(0, 3).map((shop) => (
                                            <div key={shop.id} className="card-product">
                                                <div className="aspect-video overflow-hidden">
                                                    {shop.imageUrl ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={shop.imageUrl} alt={shop.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                            <Building2 size={32} className="text-gray-300" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-4">
                                                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#f3e5f5", color: "#7b1fa2" }}>
                                                        {shop.floor}
                                                    </span>
                                                    <h3 className="text-sm font-medium mt-2" style={{ color: "#0d5c3f" }}>{shop.name}</h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
