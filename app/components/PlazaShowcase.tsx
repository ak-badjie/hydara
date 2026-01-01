"use client";

import { MapPin, Clock, Car, Accessibility, Utensils, ShoppingBag, Building2 } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";

const amenities = [
    { icon: ShoppingBag, label: "Multiple Shops" },
    { icon: Utensils, label: "Restaurant" },
    { icon: Building2, label: "Mosque" },
    { icon: Car, label: "Parking" },
    { icon: Accessibility, label: "Wheelchair Access" },
];

const shops = [
    { id: 49, name: "Amana Travel & Tours", floor: "Ground Floor", label: "Travel Agency Shop" },
    { id: 50, name: "Unitrade Body Care", floor: "Ground Floor", label: "Body Care Products" },
    { id: 51, name: "Electronics Store", floor: "Ground Floor", label: "Electronics Shop" },
    { id: 52, name: "Building Materials", floor: "Ground Floor", label: "Materials Shop" },
    { id: 53, name: "Fashion & Cosmetics", floor: "First Floor", label: "Fashion Store" },
    { id: 54, name: "General Trading", floor: "First Floor", label: "Trading Shop" },
];

const galleryImages = [
    { id: 55, label: "Plaza Exterior Front" },
    { id: 56, label: "Plaza Interior Corridor" },
    { id: 57, label: "Restaurant Area" },
    { id: 58, label: "Mosque Entrance" },
    { id: 59, label: "Shop Displays" },
    { id: 60, label: "Plaza Evening View" },
];

export default function PlazaShowcase() {
    return (
        <section
            id="plaza"
            className="section-spacing"
            style={{ background: "linear-gradient(180deg, #f3e5f5 0%, #ffffff 100%)" }}
        >
            <div className="section-container">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="badge mb-4" style={{ background: "#f3e5f5", color: "#7b1fa2" }}>
                        <Building2 size={14} className="inline mr-1" />
                        Commercial Hub
                    </span>
                    <h2 className="heading-section mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                        Hydara Plaza
                    </h2>
                    <p className="text-body-large max-w-2xl mx-auto">
                        The heart of Serekunda's commercial activity. A modern two-floor plaza
                        featuring diverse businesses, a restaurant, and a mosque.
                    </p>
                </div>

                {/* Main Hero Image */}
                <div className="mb-12">
                    <ImagePlaceholder
                        id={61}
                        label="Hydara Plaza Full Exterior View"
                        aspectRatio="wide"
                    />
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {/* Location */}
                    <div className="card-glass p-6">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                            style={{ background: "#f3e5f5" }}
                        >
                            <MapPin size={24} style={{ color: "#7b1fa2" }} />
                        </div>
                        <h4 className="font-medium mb-2" style={{ color: "#0d5c3f" }}>Location</h4>
                        <p className="text-sm" style={{ color: "#555" }}>
                            C8Q9+PG5, Serekunda<br />
                            Opposite Serekunda Central Mosque<br />
                            Near the Main Market
                        </p>
                        <a
                            href="https://maps.google.com"
                            target="_blank"
                            className="btn-ghost text-sm mt-4"
                            style={{ color: "#7b1fa2" }}
                        >
                            Get Directions →
                        </a>
                    </div>

                    {/* Hours */}
                    <div className="card-glass p-6">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                            style={{ background: "#f3e5f5" }}
                        >
                            <Clock size={24} style={{ color: "#7b1fa2" }} />
                        </div>
                        <h4 className="font-medium mb-2" style={{ color: "#0d5c3f" }}>Opening Hours</h4>
                        <div className="space-y-1 text-sm" style={{ color: "#555" }}>
                            <p>Monday - Sunday</p>
                            <p className="font-semibold text-lg" style={{ color: "#0d5c3f" }}>8:00 AM - 10:00 PM</p>
                            <p className="text-xs">Open every day including holidays</p>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="card-glass p-6">
                        <h4 className="font-medium mb-4" style={{ color: "#0d5c3f" }}>Amenities</h4>
                        <div className="flex flex-wrap gap-3">
                            {amenities.map((amenity) => (
                                <div
                                    key={amenity.label}
                                    className="flex items-center gap-2 px-3 py-2 rounded-full"
                                    style={{ background: "#f3e5f5" }}
                                >
                                    <amenity.icon size={16} style={{ color: "#7b1fa2" }} />
                                    <span className="text-xs font-medium" style={{ color: "#7b1fa2" }}>
                                        {amenity.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Shops Grid */}
                <div className="mb-16">
                    <h3 className="heading-card mb-8 text-center" style={{ fontFamily: "var(--font-outfit)" }}>
                        Shops & Tenants
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {shops.map((shop) => (
                            <div key={shop.id} className="card-product group">
                                <ImagePlaceholder
                                    id={shop.id}
                                    label={shop.label}
                                    aspectRatio="video"
                                />
                                <div className="p-4">
                                    <span
                                        className="text-xs px-2 py-1 rounded-full mb-2 inline-block"
                                        style={{ background: "#f3e5f5", color: "#7b1fa2" }}
                                    >
                                        {shop.floor}
                                    </span>
                                    <h4 className="text-sm font-medium" style={{ color: "#0d5c3f" }}>
                                        {shop.name}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gallery */}
                <div>
                    <h3 className="heading-card mb-8 text-center" style={{ fontFamily: "var(--font-outfit)" }}>
                        Plaza Gallery
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map((img) => (
                            <div key={img.id} className="hover-lift rounded-xl overflow-hidden">
                                <ImagePlaceholder
                                    id={img.id}
                                    label={img.label}
                                    aspectRatio="video"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
