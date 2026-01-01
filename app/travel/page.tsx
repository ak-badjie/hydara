"use client";

import { ArrowRight, ArrowLeft, Phone, Moon, Users, Calendar, Shield, Plane, Star } from "lucide-react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const packages = [
    {
        name: "Hajj Package 2025",
        price: "Contact for Price",
        duration: "21 Days",
        features: ["5-Star Hotel", "All Meals", "Guided Tours", "Visa Processing", "Flight Included"],
        image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=500&fit=crop"
    },
    {
        name: "Umrah Economy",
        price: "GMD 85,000",
        duration: "10 Days",
        features: ["3-Star Hotel", "Breakfast", "Group Transport", "Visa Included"],
        image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=500&fit=crop"
    },
    {
        name: "Umrah Premium",
        price: "GMD 150,000",
        duration: "14 Days",
        features: ["5-Star Hotel", "All Meals", "Private Transport", "VIP Services"],
        image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=500&fit=crop"
    },
];

const stats = [
    { icon: Plane, value: "500+", label: "Pilgrims Served" },
    { icon: Moon, value: "10+", label: "Years Experience" },
    { icon: Users, value: "98%", label: "Satisfaction Rate" },
    { icon: Calendar, value: "12", label: "Trips per Year" },
];

export default function TravelPage() {
    return (
        <>
            <Navigation />
            <main>
                {/* Hero */}
                <section
                    className="pt-32 pb-20 relative"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1920&h=1080&fit=crop')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >
                    <div className="section-container relative z-10">
                        {/* Back Button */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors text-white/70 hover:text-white"
                        >
                            <ArrowLeft size={18} />
                            Back to Home
                        </Link>

                        <div className="max-w-2xl">
                            <span className="badge badge-gold mb-4">Your Journey Begins Here</span>
                            <h1 className="heading-hero mb-6 text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                                Amana Travel & Tours
                            </h1>
                            <p className="text-body-large mb-8 text-white/90">
                                Your trusted partner for Hajj and Umrah. Experience the spiritual journey
                                of a lifetime with our premium travel packages.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="#packages" className="btn-primary">
                                    View Packages
                                    <ArrowRight size={18} />
                                </a>
                                <a href="tel:+2207817221" className="btn-secondary" style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
                                    <Phone size={18} />
                                    Call Us
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-12" style={{ background: "#0d5c3f" }}>
                    <div className="section-container">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center text-white">
                                    <stat.icon size={32} className="mx-auto mb-2 opacity-80" />
                                    <div className="text-3xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>{stat.value}</div>
                                    <div className="text-sm text-white/70">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Packages */}
                <section id="packages" className="py-20" style={{ background: "#ffffff" }}>
                    <div className="section-container">
                        <h2 className="heading-section text-center mb-12" style={{ fontFamily: "var(--font-outfit)" }}>
                            Our Packages
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {packages.map((pkg) => (
                                <div key={pkg.name} className="card-solid overflow-hidden group">
                                    <div className="relative h-48 overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "var(--font-outfit)", color: "#0d5c3f" }}>{pkg.name}</h3>
                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="text-2xl font-bold" style={{ color: "#0d5c3f" }}>{pkg.price}</span>
                                            <span className="text-sm" style={{ color: "#888" }}>/ {pkg.duration}</span>
                                        </div>
                                        <ul className="space-y-2 mb-6">
                                            {pkg.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-2 text-sm" style={{ color: "#555" }}>
                                                    <Shield size={14} style={{ color: "#0d5c3f" }} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <a href="tel:+2207817221" className="btn-primary w-full">
                                            Book Now
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20" style={{ background: "linear-gradient(135deg, #e65100 0%, #ff8f00 100%)" }}>
                    <div className="section-container text-center">
                        <h2 className="heading-section text-white mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                            Ready to Begin Your Journey?
                        </h2>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">
                            Contact us today to learn more about our Hajj and Umrah packages.
                        </p>
                        <a href="tel:+2207817221" className="btn-primary" style={{ background: "white", color: "#e65100" }}>
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
