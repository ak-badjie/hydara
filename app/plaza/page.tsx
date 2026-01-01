"use client";

import { MapPin, Clock, Phone, Car, Utensils, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const shops = [
    { name: "Amana Travel", floor: "Ground", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" },
    { name: "Body Care", floor: "Ground", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop" },
    { name: "Electronics", floor: "Ground", image: "/smart-tv.png" },
    { name: "Materials", floor: "Ground", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop" },
    { name: "Fashion", floor: "1st Floor", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop" },
    { name: "Trading", floor: "1st Floor", image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop" },
];

const amenities = [
    { icon: Car, name: "Parking" },
    { icon: Utensils, name: "Restaurant" },
    { icon: ShoppingBag, name: "Shopping" },
];

export default function PlazaPage() {
    return (
        <>
            <Navigation />
            <main>
                {/* Hero */}
                <section
                    className="pt-32 pb-20 relative"
                    style={{
                        backgroundImage: "url('/plaza.jpeg')",
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
                            <span className="badge badge-gold mb-4">The Heart of Serekunda</span>
                            <h1 className="heading-hero mb-6 text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                                Hydara Plaza
                            </h1>
                            <p className="text-body-large mb-8 text-white/90">
                                The premier commercial hub in Serekunda. A modern shopping destination
                                with diverse shops, restaurants, and a beautiful mosque.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="#shops" className="btn-primary">
                                    Explore Shops
                                </a>
                                <a href="https://maps.google.com" target="_blank" className="btn-secondary" style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
                                    <MapPin size={18} />
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Info Cards */}
                <section className="py-12" style={{ background: "#7b1fa2" }}>
                    <div className="section-container">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-white">
                                <MapPin size={32} className="mb-3" />
                                <h4 className="font-semibold mb-1">Location</h4>
                                <p className="text-sm text-white/70">C8Q9+PG5, Serekunda<br />Opposite Central Mosque</p>
                            </div>
                            <div className="text-white">
                                <Clock size={32} className="mb-3" />
                                <h4 className="font-semibold mb-1">Opening Hours</h4>
                                <p className="text-sm text-white/70">Monday - Sunday<br />8:00 AM - 10:00 PM</p>
                            </div>
                            <div className="text-white">
                                <Phone size={32} className="mb-3" />
                                <h4 className="font-semibold mb-1">Contact</h4>
                                <p className="text-sm text-white/70">+220 781 7221<br />info@hydaraplaza.com</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Amenities */}
                <section className="py-12" style={{ background: "#f8f6f3" }}>
                    <div className="section-container">
                        <div className="flex flex-wrap justify-center gap-8">
                            {amenities.map((amenity) => (
                                <div key={amenity.name} className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#f3e5f5" }}>
                                        <amenity.icon size={24} style={{ color: "#7b1fa2" }} />
                                    </div>
                                    <span className="font-medium" style={{ color: "#333" }}>{amenity.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Shops */}
                <section id="shops" className="py-20" style={{ background: "#ffffff" }}>
                    <div className="section-container">
                        <h2 className="heading-section text-center mb-12" style={{ fontFamily: "var(--font-outfit)" }}>
                            Our Tenants
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {shops.map((shop) => (
                                <div key={shop.name} className="card-product group cursor-pointer">
                                    <div className="relative h-40 overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <span className="absolute top-3 left-3 px-2 py-1 text-xs rounded-full" style={{ background: "#f3e5f5", color: "#7b1fa2" }}>
                                            {shop.floor}
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-medium" style={{ color: "#0d5c3f" }}>{shop.name}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Map */}
                <section className="py-20" style={{ background: "#f8f6f3" }}>
                    <div className="section-container">
                        <h2 className="heading-section text-center mb-8" style={{ fontFamily: "var(--font-outfit)" }}>
                            Find Us
                        </h2>
                        <div className="rounded-3xl overflow-hidden h-96">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.4!2d-16.6781!3d13.4389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec29b5ddea1a0a1%3A0x7edf0f4a0f4e1234!2sSerekunda%2C%20The%20Gambia!5e0!3m2!1sen!2sgm!4v1704067200000!5m2!1sen!2sgm"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
