"use client";

import { useState, useEffect } from "react";
import { Search, User, LayoutDashboard, ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import { HamburgerMenuOverlay, MenuItem } from "./ui/HambugerMenu";
import { useRouter } from "next/navigation";

const navLinks = [
    { name: "Shop", href: "/electronics" },
    { name: "Foam", href: "/foam" },
    { name: "Travel", href: "/travel" },
    { name: "Materials", href: "/materials" },
    { name: "Plaza", href: "/plaza" },
    { name: "Contact", href: "/#contact" },
];

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Create menu items for HamburgerMenuOverlay - only nav links (Search and Admin are in navbar)
    const menuItems: MenuItem[] = navLinks.map(link => ({
        label: link.name,
        onClick: () => router.push(link.href),
        icon: (
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-current mr-2">
                <ArrowUpLeft size={16} />
            </span>
        ),
    }));

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50">
                <nav
                    className="transition-all duration-300"
                    style={{
                        background: menuOpen ? "white" : (scrolled ? "rgba(255,255,255,0.98)" : "transparent"),
                        backdropFilter: scrolled ? "blur(20px)" : "none",
                        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
                        borderBottom: scrolled || menuOpen ? "1px solid rgba(0,0,0,0.08)" : "none"
                    }}
                >
                    <div className="section-container">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-2 relative z-[102]">
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
                            <div className="flex items-center gap-2 relative z-[102]">
                                {/* Desktop Search button */}
                                <Link
                                    href="/search"
                                    className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-white text-sm rounded-full hover:bg-[#333] transition-colors"
                                >
                                    <Search size={16} />
                                    <span>Search</span>
                                </Link>

                                {/* Mobile Search Icon */}
                                <Link
                                    href="/search"
                                    className="lg:hidden p-2.5 hover:bg-black/5 rounded-full transition-colors"
                                    title="Search"
                                >
                                    <Search size={20} style={{ color: "#333" }} />
                                </Link>

                                {/* Admin/Login Icon - Both Mobile and Desktop */}
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

                                {/* Spacer for hamburger button on mobile */}
                                <div className="lg:hidden w-12 h-12" />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* HamburgerMenuOverlay - Full Screen, button on right side */}
            <div className="lg:hidden fixed inset-0 w-full h-full" style={{ zIndex: 100, pointerEvents: "none" }}>
                <div className="relative w-full h-full" style={{ pointerEvents: "auto" }}>
                    <HamburgerMenuOverlay
                        items={menuItems}
                        buttonTop="32px"
                        buttonLeft="calc(100% - 40px)"
                        buttonSize="md"
                        buttonColor="transparent"
                        overlayBackground="white"
                        textColor="#0d5c3f"
                        fontSize="xl"
                        fontFamily="var(--font-outfit), sans-serif"
                        fontWeight="bold"
                        animationDuration={1.5}
                        staggerDelay={0.1}
                        menuAlignment="left"
                        zIndex={101}
                        onOpen={() => setMenuOpen(true)}
                        onClose={() => setMenuOpen(false)}
                    />
                </div>
            </div>
        </>
    );
}
