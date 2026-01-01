"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { Eye, EyeOff, Lock, User, ArrowRight, AlertCircle, Building2, ShoppingBag, Plane, Hammer } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { login, isAuthenticated } = useAuth();

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/admin");
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const success = await login(username, password);
            if (success) {
                router.push("/admin");
            } else {
                setError("Invalid username or password");
            }
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding & Pattern Image */}
            <div
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
                style={{
                    backgroundImage: "url('/pattern.avif')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                {/* Subtle overlay to ensure text readability */}
                <div
                    className="absolute inset-0"
                    style={{ background: "rgba(255,255,255,0.4)" }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    {/* Logo */}
                    <div>
                        <Link href="/" className="inline-block">
                            <h1
                                className="text-3xl font-bold tracking-tight"
                                style={{ fontFamily: "var(--font-outfit)", color: "#0d5c3f" }}
                            >
                                HYDARA TRADING
                            </h1>
                        </Link>
                        <p className="mt-1 text-sm" style={{ color: "#333" }}>Enterprise Management System</p>
                    </div>

                    {/* Center Content */}
                    <div className="my-auto">
                        <h2
                            className="text-4xl xl:text-5xl font-bold leading-tight mb-6"
                            style={{ fontFamily: "var(--font-outfit)", color: "#1a1a1a" }}
                        >
                            Manage Your<br />
                            <span style={{ color: "#0d5c3f" }}>Business Empire</span>
                        </h2>
                        <p className="text-lg max-w-md leading-relaxed" style={{ color: "#444" }}>
                            Access your dashboard to manage products, services, travel packages,
                            and plaza operations all in one place.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 mt-8">
                            <div
                                className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm"
                                style={{ background: "rgba(255,255,255,0.9)", border: "1px solid #e8e6e1" }}
                            >
                                <ShoppingBag size={16} style={{ color: "#0d5c3f" }} />
                                <span className="text-sm font-medium" style={{ color: "#333" }}>Electronics</span>
                            </div>
                            <div
                                className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm"
                                style={{ background: "rgba(255,255,255,0.9)", border: "1px solid #e8e6e1" }}
                            >
                                <Plane size={16} style={{ color: "#e65100" }} />
                                <span className="text-sm font-medium" style={{ color: "#333" }}>Travel</span>
                            </div>
                            <div
                                className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm"
                                style={{ background: "rgba(255,255,255,0.9)", border: "1px solid #e8e6e1" }}
                            >
                                <Hammer size={16} style={{ color: "#c2185b" }} />
                                <span className="text-sm font-medium" style={{ color: "#333" }}>Materials</span>
                            </div>
                            <div
                                className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm"
                                style={{ background: "rgba(255,255,255,0.9)", border: "1px solid #e8e6e1" }}
                            >
                                <Building2 size={16} style={{ color: "#7b1fa2" }} />
                                <span className="text-sm font-medium" style={{ color: "#333" }}>Plaza</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-4 text-sm" style={{ color: "#666" }}>
                        <span>© 2025 Hydara Trading</span>
                        <span>•</span>
                        <span>The Gambia</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div
                className="w-full lg:w-1/2 flex items-center justify-center p-8"
                style={{ background: "#fafafa" }}
            >
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <Link href="/" className="inline-block">
                            <h1
                                className="text-2xl font-bold tracking-tight"
                                style={{ fontFamily: "var(--font-outfit)", color: "#0d5c3f" }}
                            >
                                HYDARA TRADING
                            </h1>
                        </Link>
                    </div>

                    {/* Login Card */}
                    <div
                        className="rounded-3xl p-8 shadow-xl"
                        style={{
                            background: "white",
                            border: "1px solid #e8e6e1"
                        }}
                    >
                        <div className="text-center mb-8">
                            <div
                                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #0d5c3f 0%, #157a54 100%)" }}
                            >
                                <Lock size={28} className="text-white" />
                            </div>
                            <h2
                                className="text-2xl font-semibold"
                                style={{ color: "#0d5c3f", fontFamily: "var(--font-outfit)" }}
                            >
                                Admin Login
                            </h2>
                            <p className="text-sm mt-1" style={{ color: "#888" }}>
                                Enter your credentials to access the dashboard
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div
                                className="flex items-center gap-2 px-4 py-3 rounded-xl mb-6"
                                style={{ background: "#fee2e2", color: "#dc2626" }}
                            >
                                <AlertCircle size={18} />
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Username Field */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "#333" }}
                                >
                                    Username
                                </label>
                                <div className="relative">
                                    <User
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2"
                                        style={{ color: "#888" }}
                                    />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter username"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm transition-all duration-200 outline-none"
                                        style={{
                                            background: "#f5f5f5",
                                            border: "2px solid transparent",
                                            color: "#333"
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = "#0d5c3f"}
                                        onBlur={(e) => e.target.style.borderColor = "transparent"}
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "#333" }}
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2"
                                        style={{ color: "#888" }}
                                    />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm transition-all duration-200 outline-none"
                                        style={{
                                            background: "#f5f5f5",
                                            border: "2px solid transparent",
                                            color: "#333"
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = "#0d5c3f"}
                                        onBlur={(e) => e.target.style.borderColor = "transparent"}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 rounded-lg transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} style={{ color: "#888" }} />
                                        ) : (
                                            <Eye size={18} style={{ color: "#888" }} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 rounded-xl font-medium text-white flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    background: "linear-gradient(135deg, #0d5c3f 0%, #157a54 100%)",
                                }}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Hint */}
                        <p className="text-center text-xs mt-6" style={{ color: "#aaa" }}>
                            Contact administrator if you forgot your credentials
                        </p>
                    </div>

                    {/* Back to Home */}
                    <div className="text-center mt-6">
                        <Link
                            href="/"
                            className="text-sm transition-colors hover:underline"
                            style={{ color: "#0d5c3f" }}
                        >
                            ← Back to Website
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
