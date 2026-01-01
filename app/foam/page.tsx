"use client";

import { ArrowRight, ArrowLeft, Check, Star, Phone } from "lucide-react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const mattressProducts = [
    { name: "Premium King Mattress", price: "GMD 18,000", size: "King Size", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop" },
    { name: "Queen Foam Mattress", price: "GMD 14,000", size: "Queen Size", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop" },
    { name: "Single Student Mattress", price: "GMD 6,500", size: "Single", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop" },
    { name: "Double Foam Mattress", price: "GMD 10,000", size: "Double", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop" },
];

const furnitureProducts = [
    { name: "3-Seater Sofa Set", price: "GMD 35,000", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop" },
    { name: "Executive Office Chair", price: "GMD 8,500", image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop" },
    { name: "Dining Chair Cushions", price: "GMD 4,500", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop" },
    { name: "Custom Foam Cutting", price: "From GMD 500", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
];

const features = [
    "Locally manufactured in The Gambia",
    "Premium quality foam materials",
    "Custom sizes available",
    "Bulk orders for hotels & businesses",
    "Delivery across the country",
    "Warranty on all products",
];

export default function FoamPage() {
    return (
        <>
            <Navigation />
            <main>
                {/* Hero */}
                <section
                    className="pt-32 pb-20"
                    style={{ background: "linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)" }}
                >
                    <div className="section-container">
                        {/* Back Button */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors hover:text-[#0d5c3f]"
                            style={{ color: "#555" }}
                        >
                            <ArrowLeft size={18} />
                            Back to Home
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="badge badge-success mb-4">Manufacturing Excellence</span>
                                <h1 className="heading-hero mb-6" style={{ fontFamily: "var(--font-outfit)", color: "#0d5c3f" }}>
                                    Hydara Foam Manufacturing
                                </h1>
                                <p className="text-body-large mb-8" style={{ color: "#555" }}>
                                    Premium foam products manufactured right here in The Gambia. From comfortable
                                    mattresses to elegant sofas, we craft quality that lasts for years.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <a href="#products" className="btn-primary">
                                        View Products
                                        <ArrowRight size={18} />
                                    </a>
                                    <a href="tel:+2207817221" className="btn-secondary">
                                        <Phone size={18} />
                                        Call Us
                                    </a>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="rounded-3xl overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/foam.jpg"
                                        alt="Foam Manufacturing"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -left-6 card-glass p-4" style={{ maxWidth: "200px" }}>
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
                    </div>
                </section>

                {/* Features */}
                <section className="py-16" style={{ background: "#ffffff" }}>
                    <div className="section-container">
                        <h2 className="heading-section text-center mb-12" style={{ fontFamily: "var(--font-outfit)" }}>
                            Why Choose Hydara Foam?
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "#f8f6f3" }}>
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#e8f5e9" }}>
                                        <Check size={16} style={{ color: "#2e7d32" }} />
                                    </div>
                                    <span className="font-medium" style={{ color: "#333" }}>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Products */}
                <section id="products" className="py-20" style={{ background: "#f8f6f3" }}>
                    <div className="section-container">
                        {/* Mattresses */}
                        <div className="mb-16">
                            <h2 className="heading-section mb-8" style={{ fontFamily: "var(--font-outfit)" }}>
                                Mattresses & Bedding
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {mattressProducts.map((product) => (
                                    <div key={product.name} className="card-product group cursor-pointer">
                                        <div className="relative aspect-square overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        </div>
                                        <div className="p-4">
                                            <span className="text-xs px-2 py-1 rounded-full mb-2 inline-block" style={{ background: "#e8f5e9", color: "#2e7d32" }}>
                                                {product.size}
                                            </span>
                                            <h4 className="text-sm font-medium mb-1" style={{ color: "#0d5c3f" }}>{product.name}</h4>
                                            <p className="font-semibold" style={{ color: "#0d5c3f" }}>{product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Furniture */}
                        <div>
                            <h2 className="heading-section mb-8" style={{ fontFamily: "var(--font-outfit)" }}>
                                Sofas & Furniture Foam
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {furnitureProducts.map((product) => (
                                    <div key={product.name} className="card-product group cursor-pointer">
                                        <div className="relative aspect-square overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-sm font-medium mb-1" style={{ color: "#0d5c3f" }}>{product.name}</h4>
                                            <p className="font-semibold" style={{ color: "#0d5c3f" }}>{product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20" style={{ background: "linear-gradient(135deg, #0d5c3f 0%, #1e9966 100%)" }}>
                    <div className="section-container text-center">
                        <h2 className="heading-section text-white mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                            Need a Custom Order?
                        </h2>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">
                            We offer custom foam cutting and bulk orders for hotels, businesses, and individuals.
                        </p>
                        <a href="tel:+2207817221" className="btn-primary" style={{ background: "white", color: "#0d5c3f" }}>
                            <Phone size={18} />
                            Call +220 781 7221
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
