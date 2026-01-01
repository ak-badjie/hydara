"use client";

import {
    Sofa, Monitor, Plane, Hammer, Building2,
    Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube,
    ChevronUp, Heart, Code
} from "lucide-react";
import Link from "next/link";

const divisions = [
    { name: "Foam Manufacturing", href: "/foam", icon: Sofa },
    { name: "Electronics", href: "/electronics", icon: Monitor },
    { name: "Travel & Tours", href: "/travel", icon: Plane },
    { name: "Building Materials", href: "/materials", icon: Hammer },
    { name: "Hydara Plaza", href: "/plaza", icon: Building2 },
];

const quickLinks = [
    { name: "About Us", href: "/#about" },
    { name: "Our Products", href: "/#products" },
    { name: "Contact Us", href: "/#contact" },
    { name: "Careers", href: "/#careers" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
];

const contactInfo = [
    { icon: MapPin, text: "Hydara Plaza, Serekunda, The Gambia" },
    { icon: Phone, text: "+220 781 7221" },
    { icon: Mail, text: "info@hydaratrading.com" },
    { icon: Clock, text: "Mon - Sun: 8:00 AM - 10:00 PM" },
];

const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/hydaratrading", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/hydaratrading", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/hydaratrading", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/hydaratrading", label: "YouTube" },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            className="flex flex-col"
            style={{
                background: "linear-gradient(180deg, #0d5c3f 0%, #063d2a 100%)",
                minHeight: "calc(100vh - 64px)"
            }}
        >
            {/* Main Footer Content */}
            <div className="section-container flex-1 py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <span
                                className="text-2xl font-bold tracking-tight text-white"
                                style={{ fontFamily: "var(--font-outfit)" }}
                            >
                                HYDARA TRADING
                            </span>
                        </Link>
                        <p className="text-white/70 text-sm mb-6 leading-relaxed">
                            The Gambia's premier business conglomerate. From Samsung electronics to
                            premium foam products, Hajj & Umrah travel services, building materials,
                            and our flagship commercial plaza in Serekunda.
                        </p>
                        <p className="text-white/50 text-xs mb-8">
                            Established in The Gambia • Serving West Africa
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20"
                                    style={{ background: "rgba(255,255,255,0.1)" }}
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} className="text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Divisions Column */}
                    <div>
                        <h4
                            className="text-white font-semibold mb-6"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            Our Divisions
                        </h4>
                        <ul className="space-y-4">
                            {divisions.map((division) => (
                                <li key={division.name}>
                                    <Link
                                        href={division.href}
                                        className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                                    >
                                        <division.icon size={16} className="text-white/50 group-hover:text-white" />
                                        <span className="text-sm">{division.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h4
                            className="text-white font-semibold mb-6"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            Quick Links
                        </h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-white/70 hover:text-white transition-colors text-sm inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4
                            className="text-white font-semibold mb-6"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            {contactInfo.map((item) => (
                                <li key={item.text} className="flex items-start gap-3">
                                    <item.icon size={16} className="text-white/50 flex-shrink-0 mt-0.5" />
                                    <span className="text-white/70 text-sm">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{ background: "rgba(0,0,0,0.2)" }}>
                <div className="section-container py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
                            <p className="text-white/50 text-xs">
                                © {new Date().getFullYear()} Hydara Trading Company. All rights reserved.
                            </p>
                            <span className="hidden md:inline text-white/30">•</span>
                            <p className="text-white/40 text-xs flex items-center gap-1">
                                Made with <Heart size={12} className="text-red-400" fill="currentColor" /> in The Gambia
                            </p>
                            <span className="hidden md:inline text-white/30">•</span>
                            <p className="text-white/40 text-xs flex items-center gap-1">
                                Built by <Code size={12} className="text-[#c9a962]" /> <span className="font-medium text-white/60">DaveLabs</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-white/40 text-xs">
                                Official Samsung Distributor
                            </span>
                            <button
                                onClick={scrollToTop}
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                style={{ background: "rgba(255,255,255,0.1)" }}
                                aria-label="Scroll to top"
                            >
                                <ChevronUp size={20} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
