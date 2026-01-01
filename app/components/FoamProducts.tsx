"use client";

import { ArrowRight, Check, Star } from "lucide-react";

// Mattress products - keep using placeholders for variety
const mattressProducts = [
    { id: 24, name: "Premium King Mattress", price: "GMD 18,000", size: "King Size", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop" },
    { id: 25, name: "Queen Foam Mattress", price: "GMD 14,000", size: "Queen Size", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop" },
    { id: 26, name: "Single Student Mattress", price: "GMD 6,500", size: "Single", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop" },
    { id: 27, name: "Double Foam Mattress", price: "GMD 10,000", size: "Double", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop" },
];

// Furniture products - use placeholders
const furnitureProducts = [
    { id: 28, name: "3-Seater Sofa Set", price: "GMD 35,000", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop" },
    { id: 29, name: "Executive Office Chair", price: "GMD 8,500", image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop" },
    { id: 30, name: "Dining Chair Cushions (Set)", price: "GMD 4,500", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop" },
    { id: 31, name: "Custom Foam Cutting", price: "From GMD 500", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
];

const features = [
    "Locally manufactured in The Gambia",
    "Premium quality foam materials",
    "Custom sizes available",
    "Bulk orders for hotels & businesses",
    "Delivery across the country",
    "Warranty on all products",
];

export default function FoamProducts() {
    return (
        <section
            id="foam"
            className="section-spacing"
            style={{ background: "#ffffff" }}
        >
            <div className="section-container">
                {/* Section Header */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <span className="badge badge-success mb-4">Manufacturing Excellence</span>
                        <h2 className="heading-section mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                            Hydara Foam Manufacturing
                        </h2>
                        <p className="text-body-large mb-6">
                            Premium foam products manufactured right here in The Gambia. From comfortable
                            mattresses to elegant sofas, we craft quality that lasts.
                        </p>

                        {/* Features List */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-center gap-2">
                                    <div
                                        className="w-5 h-5 rounded-full flex items-center justify-center"
                                        style={{ background: "#e8f5e9" }}
                                    >
                                        <Check size={12} style={{ color: "#2e7d32" }} />
                                    </div>
                                    <span className="text-sm" style={{ color: "#555" }}>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <a href="#contact" className="btn-primary">
                            Request Custom Quote
                            <ArrowRight size={18} />
                        </a>
                    </div>

                    {/* Main Image - foam.jpg */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-2xl aspect-video">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/foam.jpg"
                                alt="Foam Factory / Manufacturing"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div
                            className="absolute -bottom-6 -left-6 card-glass p-4"
                            style={{ maxWidth: "200px" }}
                        >
                            <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill="#c9a962" stroke="#c9a962" />
                                ))}
                            </div>
                            <p className="text-sm font-medium" style={{ color: "#0d5c3f" }}>
                                "Best mattress quality in Gambia!"
                            </p>
                            <p className="text-xs mt-1" style={{ color: "#888" }}>— Hotel Manager</p>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Mattresses */}
                    <div>
                        <h3 className="heading-card mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
                            Mattresses & Bedding
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {mattressProducts.map((product) => (
                                <div key={product.id} className="card-product group cursor-pointer">
                                    <div className="relative aspect-square overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <span
                                            className="text-xs px-2 py-1 rounded-full mb-2 inline-block"
                                            style={{ background: "#e8f5e9", color: "#2e7d32" }}
                                        >
                                            {product.size}
                                        </span>
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
                    </div>

                    {/* Furniture & Custom */}
                    <div>
                        <h3 className="heading-card mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
                            Sofas & Furniture Foam
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {furnitureProducts.map((product) => (
                                <div key={product.id} className="card-product group cursor-pointer">
                                    <div className="relative aspect-square overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4">
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
                    </div>
                </div>
            </div>
        </section>
    );
}
