"use client";

import { ArrowRight, ArrowLeft, Star, ShoppingCart, Phone, Truck, Shield } from "lucide-react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const categories = ["All", "TVs", "Phones", "Appliances", "Audio", "Wearables"];

const products = [
    { name: "Samsung Smart TV 65\"", price: "GMD 45,000", category: "TVs", badge: "Best Seller", image: "/smart-tv.png" },
    { name: "Galaxy S24 Ultra", price: "GMD 75,000", category: "Phones", badge: "New", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop" },
    { name: "Samsung Refrigerator", price: "GMD 38,000", category: "Appliances", badge: null, image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop" },
    { name: "Galaxy Buds Pro", price: "GMD 8,500", category: "Audio", badge: null, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop" },
    { name: "Galaxy Watch 6", price: "GMD 15,000", category: "Wearables", badge: "Popular", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop" },
    { name: "Samsung 50\" 4K TV", price: "GMD 32,000", category: "TVs", badge: null, image: "/smart-tv.png" },
    { name: "Galaxy A54", price: "GMD 22,000", category: "Phones", badge: null, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop" },
    { name: "Samsung Washer", price: "GMD 28,000", category: "Appliances", badge: "Sale", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop" },
    { name: "Soundbar Q-Series", price: "GMD 18,000", category: "Audio", badge: null, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop" },
    { name: "Galaxy Tab S9", price: "GMD 45,000", category: "Phones", badge: "New", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop" },
];

const features = [
    { icon: Truck, title: "Free Delivery", desc: "On orders over GMD 10,000" },
    { icon: Shield, title: "Warranty", desc: "Official Samsung warranty" },
    { icon: Star, title: "Genuine Products", desc: "100% authentic Samsung" },
];

export default function ElectronicsPage() {
    return (
        <>
            <Navigation />
            <main>
                {/* Hero */}
                <section
                    className="pt-32 pb-20"
                    style={{ background: "linear-gradient(180deg, #e3f2fd 0%, #ffffff 100%)" }}
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
                                <span className="badge badge-navy mb-4">Official Samsung Distributor</span>
                                <h1 className="heading-hero mb-6" style={{ fontFamily: "var(--font-outfit)", color: "#0d5c3f" }}>
                                    Electronics & Technology
                                </h1>
                                <p className="text-body-large mb-8" style={{ color: "#555" }}>
                                    The latest Samsung products available in The Gambia. From stunning TVs
                                    to powerful smartphones, we bring the future to your doorstep.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <a href="#products" className="btn-primary">
                                        Shop Now
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
                                        src="/smart-tv.png"
                                        alt="Samsung Electronics"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Bar */}
                <section className="py-8" style={{ background: "#0d5c3f" }}>
                    <div className="section-container">
                        <div className="grid md:grid-cols-3 gap-6">
                            {features.map((feature) => (
                                <div key={feature.title} className="flex items-center gap-4 text-white">
                                    <feature.icon size={32} />
                                    <div>
                                        <h4 className="font-semibold">{feature.title}</h4>
                                        <p className="text-sm text-white/70">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Products */}
                <section id="products" className="py-20" style={{ background: "#ffffff" }}>
                    <div className="section-container">
                        <h2 className="heading-section mb-8" style={{ fontFamily: "var(--font-outfit)" }}>
                            Our Products
                        </h2>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            {categories.map((cat, index) => (
                                <button
                                    key={cat}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${index === 0 ? 'bg-[#0d5c3f] text-white' : 'bg-white text-[#555] hover:bg-[#0d5c3f] hover:text-white'}`}
                                    style={{ border: "1px solid #e8e6e1" }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {products.map((product) => (
                                <div key={product.name} className="card-product group cursor-pointer">
                                    <div className="relative aspect-square overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        {product.badge && (
                                            <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${product.badge === 'New' ? 'bg-[#ffebee] text-[#c62828]' :
                                                product.badge === 'Sale' ? 'bg-[#e8f5e9] text-[#2e7d32]' :
                                                    product.badge === 'Best Seller' ? 'bg-[#fff3e0] text-[#e65100]' :
                                                        'bg-[#e3f2fd] text-[#1565c0]'
                                                }`}>
                                                {product.badge}
                                            </span>
                                        )}
                                        <button className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#0d5c3f] hover:text-white">
                                            <ShoppingCart size={18} />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < 4 ? "#c9a962" : "transparent"} stroke={i < 4 ? "#c9a962" : "#ddd"} />
                                            ))}
                                        </div>
                                        <h4 className="text-sm font-medium mb-1" style={{ color: "#0d5c3f" }}>{product.name}</h4>
                                        <p className="font-semibold" style={{ color: "#0d5c3f" }}>{product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20" style={{ background: "linear-gradient(135deg, #0d5c3f 0%, #1e9966 100%)" }}>
                    <div className="section-container text-center">
                        <h2 className="heading-section text-white mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                            Visit Our Store
                        </h2>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">
                            Experience Samsung products in person at Hydara Plaza, Serekunda.
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
