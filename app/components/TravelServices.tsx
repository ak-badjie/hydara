"use client";

import { ArrowRight, Plane, Moon, Users, Calendar, Shield, Phone } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import { ProductImagePlaceholder } from "./ImagePlaceholder";

const packages = [
    {
        id: 33,
        name: "Hajj Package 2025",
        description: "Complete Hajj pilgrimage package with accommodation near Haram",
        duration: "21 Days",
        price: "From GMD 350,000",
        features: ["5-Star Hotels", "Direct Flights", "Full Board", "Guided Tours"],
        label: "Hajj Pilgrimage",
        popular: true
    },
    {
        id: 34,
        name: "Umrah Economy",
        description: "Affordable Umrah package for spiritual journey",
        duration: "10 Days",
        price: "From GMD 120,000",
        features: ["3-Star Hotels", "Visa Processing", "Transport"],
        label: "Umrah Package",
        popular: false
    },
    {
        id: 35,
        name: "Umrah Premium",
        description: "Luxury Umrah experience with premium accommodation",
        duration: "14 Days",
        price: "From GMD 200,000",
        features: ["5-Star Hotels", "VIP Transport", "Private Guide"],
        label: "Premium Umrah",
        popular: false
    },
];

const gallery = [
    { id: 36, label: "Mecca Kaaba" },
    { id: 37, label: "Medina Mosque" },
    { id: 38, label: "Pilgrims Group" },
    { id: 39, label: "Hotel Room" },
];

export default function TravelServices() {
    return (
        <section
            id="travel"
            className="section-spacing"
            style={{ background: "linear-gradient(180deg, #fff3e0 0%, #ffffff 100%)" }}
        >
            <div className="section-container">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="badge mb-4" style={{ background: "#fff3e0", color: "#e65100" }}>
                        <Plane size={14} className="inline mr-1" />
                        Trusted Travel Partner
                    </span>
                    <h2 className="heading-section mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                        Amana Travel & Tours
                    </h2>
                    <p className="text-body-large max-w-2xl mx-auto">
                        Embark on your spiritual journey with confidence. We have been helping
                        Gambians fulfill their dreams of Hajj and Umrah for over a decade.
                    </p>
                </div>

                {/* Stats Bar */}
                <div
                    className="card-glass flex flex-wrap justify-center gap-8 lg:gap-16 py-8 px-6 mb-16"
                    style={{ borderRadius: "20px" }}
                >
                    {[
                        { icon: Users, value: "5000+", label: "Pilgrims Served" },
                        { icon: Calendar, value: "15+", label: "Years Experience" },
                        { icon: Shield, value: "100%", label: "Satisfaction" },
                        { icon: Plane, value: "50+", label: "Trips Annually" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <stat.icon size={24} className="mx-auto mb-2" style={{ color: "#e65100" }} />
                            <div className="text-2xl font-semibold" style={{ color: "#0d5c3f", fontFamily: "var(--font-outfit)" }}>
                                {stat.value}
                            </div>
                            <div className="text-sm" style={{ color: "#888" }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Packages Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className={`card-solid relative ${pkg.popular ? 'ring-2 ring-[#e65100]' : ''}`}
                        >
                            {pkg.popular && (
                                <div
                                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                                    style={{ background: "#e65100" }}
                                >
                                    Most Popular
                                </div>
                            )}

                            <div className="relative">
                                <ImagePlaceholder id={pkg.id} label={pkg.label} aspectRatio="video" />
                                <div
                                    className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white"
                                    style={{ background: "rgba(0,0,0,0.6)" }}
                                >
                                    <Moon size={12} className="inline mr-1" />
                                    {pkg.duration}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="heading-card mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                                    {pkg.name}
                                </h3>
                                <p className="text-sm mb-4" style={{ color: "#555" }}>
                                    {pkg.description}
                                </p>

                                <ul className="space-y-2 mb-6">
                                    {pkg.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#e65100" }} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-xs" style={{ color: "#888" }}>Starting</span>
                                        <div className="font-semibold" style={{ color: "#0d5c3f" }}>{pkg.price}</div>
                                    </div>
                                    <a href="#contact" className="btn-primary py-2 px-4 text-sm">
                                        Book Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gallery Row */}
                <div className="mb-12">
                    <h3 className="heading-card mb-6 text-center" style={{ fontFamily: "var(--font-outfit)" }}>
                        Journey Moments
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {gallery.map((img) => (
                            <div key={img.id} className="hover-lift rounded-xl overflow-hidden">
                                <ImagePlaceholder id={img.id} label={img.label} aspectRatio="square" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div
                    className="text-center p-8 rounded-3xl"
                    style={{ background: "linear-gradient(135deg, #0d5c3f 0%, #157a54 100%)" }}
                >
                    <h3 className="text-2xl font-medium text-white mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                        Ready to Begin Your Journey?
                    </h3>
                    <p className="text-white/70 mb-6">
                        Contact us today for personalized travel packages
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="tel:+2207817221" className="btn-primary" style={{ background: "#e65100" }}>
                            <Phone size={16} />
                            Call: +220 781 7221
                        </a>
                        <a href="#contact" className="btn-secondary" style={{ borderColor: "white", color: "white" }}>
                            Send Inquiry
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
