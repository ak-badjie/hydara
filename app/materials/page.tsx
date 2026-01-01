"use client";

import { ArrowRight, ArrowLeft, Phone, Truck, CheckCircle, Hammer } from "lucide-react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const categories = [
    { name: "Cement & Concrete", image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=400&h=400&fit=crop" },
    { name: "Steel & Iron", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop" },
    { name: "Tiles & Flooring", image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400&h=400&fit=crop" },
    { name: "Plumbing", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=400&fit=crop" },
    { name: "Electrical", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop" },
    { name: "Paint & Finishes", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop" },
    { name: "Roofing", image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=400&h=400&fit=crop" },
    { name: "Tools", image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop" },
];

const features = [
    { icon: Truck, title: "Delivery Available", desc: "We deliver across The Gambia" },
    { icon: CheckCircle, title: "Quality Guaranteed", desc: "Only genuine materials" },
    { icon: Hammer, title: "Bulk Orders", desc: "Special prices for contractors" },
];

export default function MaterialsPage() {
    return (
        <>
            <Navigation />
            <main>
                {/* Hero */}
                <section
                    className="pt-32 pb-20"
                    style={{ background: "linear-gradient(180deg, #fce4ec 0%, #ffffff 100%)" }}
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
                                <span className="badge" style={{ background: "#fce4ec", color: "#c2185b" }}>Build With Confidence</span>
                                <h1 className="heading-hero mb-6 mt-4" style={{ fontFamily: "var(--font-outfit)", color: "#0d5c3f" }}>
                                    Building Materials
                                </h1>
                                <p className="text-body-large mb-8" style={{ color: "#555" }}>
                                    Quality construction and building supplies for projects of all sizes.
                                    From foundation to finish, we have everything you need.
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
                                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"
                                        alt="Building Materials"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-8" style={{ background: "#c2185b" }}>
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
                        <h2 className="heading-section text-center mb-12" style={{ fontFamily: "var(--font-outfit)" }}>
                            Product Categories
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {categories.map((cat) => (
                                <div key={cat.name} className="card-product group cursor-pointer">
                                    <div className="relative aspect-square overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4 text-center">
                                        <h4 className="font-medium" style={{ color: "#0d5c3f" }}>{cat.name}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20" style={{ background: "linear-gradient(135deg, #c2185b 0%, #e91e63 100%)" }}>
                    <div className="section-container text-center">
                        <h2 className="heading-section text-white mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                            Need Materials for Your Project?
                        </h2>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">
                            Contact us for quotes on bulk orders and special contractor pricing.
                        </p>
                        <a href="tel:+2207817221" className="btn-primary" style={{ background: "white", color: "#c2185b" }}>
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
