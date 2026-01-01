"use client";

import { useState, useEffect } from "react";
import { Search, User, Menu, X, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";

const navLinks = [
    { name: "Shop", href: "/electronics" },
    { name: "Foam", href: "/foam" },
    { name: "Travel", href: "/travel" },
    { name: "Materials", href: "/materials" },
    { name: "Plaza", href: "/plaza" },
    { name: "Contact", href: "/#contact" },
];

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav
                className="transition-all duration-300"
                style={{
                    background: scrolled ? "rgba(255,255,255,0.98)" : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "none"
                }}
            >
                <div className="section-container">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <span
                                className="text-xl font-bold tracking-tight transition-colors duration-300"
                                style={{ fontFamily: "var(--font-outfit)", color: "#0d5c3f" }}
                            >
                                HYDARA TRADING
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium transition-colors text-[#333] hover:text-[#0d5c3f]"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right Icons */}
                        <div className="flex items-center gap-2">
                            <Link
                                href="/search"
                                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-white text-sm rounded-full hover:bg-[#333] transition-colors"
                            >
                                <Search size={16} />
                                <span>Search</span>
                            </Link>

                            {isAuthenticated ? (
                                <Link
                                    href="/admin"
                                    className="p-2.5 hover:bg-black/5 rounded-full transition-colors"
                                    title="Dashboard"
                                >
                                    <LayoutDashboard size={20} style={{ color: "#0d5c3f" }} />
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="p-2.5 hover:bg-black/5 rounded-full transition-colors"
                                    title="Admin Login"
                                >
                                    <User size={20} style={{ color: "#333" }} />
                                </Link>
                            )}

                            <button
                                className="lg:hidden p-2.5 hover:bg-black/5 rounded-full transition-colors"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X size={20} style={{ color: "#333" }} /> : <Menu size={20} style={{ color: "#333" }} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-16" style={{ background: "white" }}>
                    <div className="p-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block text-lg font-medium py-3 border-b"
                                style={{ color: "#333", borderColor: "#eee" }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/search"
                            className="block text-lg font-medium py-3 border-b"
                            style={{ color: "#333", borderColor: "#eee" }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Search
                        </Link>
                        <Link
                            href={isAuthenticated ? "/admin" : "/login"}
                            className="block text-lg font-medium py-3 border-b"
                            style={{ color: "#0d5c3f", borderColor: "#eee" }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {isAuthenticated ? "Dashboard" : "Admin Login"}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

