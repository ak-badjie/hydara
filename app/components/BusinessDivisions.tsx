"use client";

import { ArrowRight, Sofa, Monitor, Plane, Hammer, Building2 } from "lucide-react";

const divisions = [
    {
        id: 1,
        name: "Hydara Foam Manufacturing",
        description: "Premium mattresses, sofas, and foam products manufactured locally in The Gambia.",
        icon: Sofa,
        image: "/foam.jpg",
        color: "#e8f5e9",
        accent: "#2e7d32",
        href: "/foam"
    },
    {
        id: 2,
        name: "Electronics & Samsung",
        description: "Authorized Samsung distributor. TVs, phones, appliances, and the latest technology.",
        icon: Monitor,
        image: "/smart-tv.png",
        color: "#e3f2fd",
        accent: "#1565c0",
        href: "/electronics"
    },
    {
        id: 3,
        name: "Amana Travel & Tours",
        description: "Your trusted partner for Hajj, Umrah, and international travel arrangements.",
        icon: Plane,
        image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=600&fit=crop",
        color: "#fff3e0",
        accent: "#e65100",
        href: "/travel"
    },
    {
        id: 4,
        name: "Building Materials",
        description: "Quality construction and building supplies for projects of all sizes.",
        icon: Hammer,
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
        color: "#fce4ec",
        accent: "#c2185b",
        href: "/materials"
    },
    {
        id: 5,
        name: "Hydara Plaza",
        description: "The premier commercial hub in Serekunda with shops, restaurant, and mosque.",
        icon: Building2,
        image: "/plaza.jpeg",
        color: "#f3e5f5",
        accent: "#7b1fa2",
        href: "/plaza"
    },
];

export default function BusinessDivisions() {
    return (
        <section id="divisions" className="section-spacing" style={{ background: "#ffffff" }}>
            <div className="section-container">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="badge badge-gold mb-4">Our Empire</span>
                    <h2 className="heading-section mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                        Five Pillars of Excellence
                    </h2>
                    <p className="text-body-large max-w-2xl mx-auto">
                        From manufacturing to retail, travel to real estate - discover the Hydara
                        family's diverse portfolio of premium businesses serving The Gambia.
                    </p>
                </div>

                {/* Divisions Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {divisions.map((division, index) => (
                        <a
                            key={division.id}
                            href={division.href}
                            className={`card-solid group ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                            style={{
                                animationDelay: `${index * 0.1}s`,
                            }}
                        >
                            {/* Image */}
                            <div className={`relative overflow-hidden rounded-t-2xl ${index === 0 ? 'aspect-video' : 'aspect-square'}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={division.image}
                                    alt={division.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Overlay on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                                    style={{ background: `${division.accent}cc` }}
                                >
                                    <span className="text-white font-medium flex items-center gap-2">
                                        Explore <ArrowRight size={18} />
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                                            style={{ background: division.color }}
                                        >
                                            <division.icon size={24} style={{ color: division.accent }} />
                                        </div>
                                        <h3 className="heading-card mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                                            {division.name}
                                        </h3>
                                        <p className="text-body text-sm">
                                            {division.description}
                                        </p>
                                    </div>
                                    <ArrowRight
                                        size={20}
                                        className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-2"
                                        style={{ color: "#888" }}
                                    />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <a href="#products" className="btn-ghost">
                        View All Products & Services
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
}
