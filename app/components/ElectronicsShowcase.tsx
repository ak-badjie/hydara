"use client";

import { ArrowRight, Star, ShoppingCart } from "lucide-react";

const categories = ["All", "TVs", "Phones", "Appliances", "Audio", "Wearables"];

// Products with direct image paths - add your images to /public/ folder
const products = [
    // Row 1 - Featured
    { id: 14, name: "Samsung Smart TV 65\"", price: "GMD 45,000", category: "TVs", badge: "Best Seller", image: "/smart-tv.png" },
    { id: 15, name: "Galaxy S24 Ultra", price: "GMD 75,000", category: "Phones", badge: "New", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop" },
    { id: 16, name: "Samsung Refrigerator", price: "GMD 38,000", category: "Appliances", badge: null, image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop" },
    { id: 17, name: "Galaxy Buds Pro", price: "GMD 8,500", category: "Audio", badge: null, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop" },
    { id: 18, name: "Galaxy Watch 6", price: "GMD 15,000", category: "Wearables", badge: "Popular", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop" },
    // Row 2
    { id: 19, name: "Samsung 50\" 4K TV", price: "GMD 32,000", category: "TVs", badge: null, image: "/smart-tv.png" },
    { id: 20, name: "Galaxy A54", price: "GMD 22,000", category: "Phones", badge: null, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop" },
    { id: 21, name: "Samsung Washer", price: "GMD 28,000", category: "Appliances", badge: "Sale", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop" },
    { id: 22, name: "Soundbar Q-Series", price: "GMD 18,000", category: "Audio", badge: null, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop" },
    { id: 23, name: "Galaxy Tab S9", price: "GMD 45,000", category: "Phones", badge: "New", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop" },
];

export default function ElectronicsShowcase() {
    return (
        <section
            id="electronics"
            className="section-spacing"
            style={{ background: "linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%)" }}
        >
            <div className="section-container">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
                    <div>
                        <span className="badge badge-navy mb-4">Official Samsung Distributor</span>
                        <h2 className="heading-section" style={{ fontFamily: "var(--font-outfit)" }}>
                            Electronics & Technology
                        </h2>
                        <p className="text-body-large mt-4 max-w-xl">
                            The latest Samsung products available in The Gambia. From stunning TVs
                            to powerful smartphones, we bring the future to your doorstep.
                        </p>
                    </div>
                    <a href="#contact" className="btn-primary self-start lg:self-auto">
                        Visit Store
                        <ArrowRight size={18} />
                    </a>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {categories.map((cat, index) => (
                        <button
                            key={cat}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${index === 0
                                ? 'bg-[#0d5c3f] text-white'
                                : 'bg-white text-[#555] hover:bg-[#0d5c3f] hover:text-white'
                                }`}
                            style={{ border: "1px solid #e8e6e1" }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="card-product group cursor-pointer">
                            {/* Image */}
                            <div className="relative aspect-square overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Badge */}
                                {product.badge && (
                                    <span
                                        className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${product.badge === 'New' ? 'bg-[#ffebee] text-[#c62828]' :
                                            product.badge === 'Sale' ? 'bg-[#e8f5e9] text-[#2e7d32]' :
                                                product.badge === 'Best Seller' ? 'bg-[#fff3e0] text-[#e65100]' :
                                                    'bg-[#e3f2fd] text-[#1565c0]'
                                            }`}
                                    >
                                        {product.badge}
                                    </span>
                                )}

                                {/* Quick Add Button */}
                                <button
                                    className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#0d5c3f] hover:text-white"
                                >
                                    <ShoppingCart size={18} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={12}
                                            fill={i < 4 ? "#c9a962" : "transparent"}
                                            stroke={i < 4 ? "#c9a962" : "#ddd"}
                                        />
                                    ))}
                                </div>
                                <h4 className="text-sm font-medium mb-1" style={{ color: "#0d5c3f" }}>
                                    {product.name}
                                </h4>
                                <p className="font-semibold" style={{ color: "#0d5c3f" }}>
                                    {product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center mt-10">
                    <a href="#contact" className="btn-secondary">
                        View All Electronics
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
}
