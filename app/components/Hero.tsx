"use client";

import { ArrowRight, Monitor, Tv, Smartphone, Watch, Headphones } from "lucide-react";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen pt-20 overflow-hidden"
            style={{
                backgroundImage: "url('/hero.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="section-container relative z-10">
                <div className="flex flex-col justify-center min-h-[calc(100vh-200px)] py-12">

                    {/* Content */}
                    <div className="flex flex-col gap-8 max-w-2xl animate-fade-in-left" style={{ animationDuration: "1s" }}>
                        {/* Badge */}
                        <div className="flex items-center gap-3">
                            <span className="badge badge-gold">Authorized Samsung Distributor</span>
                            <span className="badge badge-navy">Est. Gambia</span>
                        </div>

                        {/* Headline */}
                        <h1
                            className="heading-hero"
                            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                        >
                            <span style={{ color: "#0d5c3f" }}>Experience</span>
                            <br />
                            <span className="gradient-text">Premium Living</span>
                            <br />
                            <span style={{ color: "#0d5c3f" }}>With Hydara</span>
                        </h1>

                        {/* Subtext */}
                        <p
                            className="text-body-large max-w-lg font-bold p-4 rounded-xl"
                            style={{
                                color: "white",
                                background: "rgba(255,255,255,0.15)",
                                border: "1px solid rgba(255,255,255,0.2)"
                            }}
                        >
                            From cutting-edge Samsung electronics to premium foam products,
                            world-class travel services, and The Gambia's premier commercial plaza.
                            We bring excellence to every aspect of your life.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <a href="#electronics" className="btn-primary">
                                Explore Electronics
                                <ArrowRight size={18} />
                            </a>
                            <a href="#products" className="btn-secondary">
                                View All Products
                            </a>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-8 pt-4">
                            <div>
                                <div className="text-3xl font-semibold" style={{ color: "#0d5c3f", fontFamily: "var(--font-outfit)" }}>20+</div>
                                <div className="text-sm" style={{ color: "#555" }}>Years of Excellence</div>
                            </div>
                            <div>
                                <div className="text-3xl font-semibold" style={{ color: "#0d5c3f", fontFamily: "var(--font-outfit)" }}>5</div>
                                <div className="text-sm" style={{ color: "#555" }}>Business Divisions</div>
                            </div>
                            <div>
                                <div className="text-3xl font-semibold" style={{ color: "#0d5c3f", fontFamily: "var(--font-outfit)" }}>1000+</div>
                                <div className="text-sm" style={{ color: "#555" }}>Happy Customers</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Electronics Quick Category Bar */}
                <div className="pb-12">
                    <div
                        className="card-glass flex flex-wrap justify-center gap-6 lg:gap-12 py-6 px-8 max-w-4xl mx-auto"
                        style={{ borderRadius: "100px" }}
                    >
                        {[
                            { icon: Tv, label: "Smart TVs" },
                            { icon: Smartphone, label: "Phones" },
                            { icon: Monitor, label: "Monitors" },
                            { icon: Watch, label: "Wearables" },
                            { icon: Headphones, label: "Audio" },
                        ].map((item) => (
                            <a
                                key={item.label}
                                href="#electronics"
                                className="flex flex-col items-center gap-2 group cursor-pointer"
                            >
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                    style={{ background: "#f0ede6" }}
                                >
                                    <item.icon size={20} style={{ color: "#0d5c3f" }} />
                                </div>
                                <span className="text-xs font-medium" style={{ color: "#555" }}>
                                    {item.label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
