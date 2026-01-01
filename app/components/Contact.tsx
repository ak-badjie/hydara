"use client";

import { useState } from "react";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    MessageCircle,
    Facebook,
    Instagram
} from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic would go here
        alert("Thank you for your message! We will get back to you soon.");
    };

    return (
        <section
            id="contact"
            className="section-spacing"
            style={{ background: "linear-gradient(180deg, #f8f6f3 0%, #ffffff 100%)" }}
        >
            <div className="section-container">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="badge badge-navy mb-4">Get In Touch</span>
                    <h2 className="heading-section mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                        Contact Us
                    </h2>
                    <p className="text-body-large max-w-xl mx-auto">
                        Visit us at Hydara Plaza or reach out through any of our channels.
                        We're here to help you with all your needs.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        {/* Info Cards */}
                        <div className="space-y-4 mb-8">
                            <div className="card-glass p-6 flex items-start gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: "#e3f2fd" }}
                                >
                                    <MapPin size={24} style={{ color: "#1565c0" }} />
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1" style={{ color: "#0d5c3f" }}>Visit Us</h4>
                                    <p className="text-sm" style={{ color: "#555" }}>
                                        Hydara Plaza, C8Q9+PG5<br />
                                        Serekunda, opposite Central Mosque<br />
                                        The Gambia
                                    </p>
                                </div>
                            </div>

                            <div className="card-glass p-6 flex items-start gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: "#e8f5e9" }}
                                >
                                    <Phone size={24} style={{ color: "#2e7d32" }} />
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1" style={{ color: "#0d5c3f" }}>Call Us</h4>
                                    <p className="text-sm" style={{ color: "#555" }}>
                                        Main: +220 781 7221<br />
                                        Amana Travel: +220 781 7221
                                    </p>
                                </div>
                            </div>

                            <div className="card-glass p-6 flex items-start gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: "#fff3e0" }}
                                >
                                    <Clock size={24} style={{ color: "#e65100" }} />
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1" style={{ color: "#0d5c3f" }}>Business Hours</h4>
                                    <p className="text-sm" style={{ color: "#555" }}>
                                        Monday - Sunday<br />
                                        8:00 AM - 10:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social & WhatsApp */}
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="https://wa.me/2207817221"
                                target="_blank"
                                className="flex items-center gap-2 px-5 py-3 rounded-full text-white transition-transform hover:scale-105"
                                style={{ background: "#25D366" }}
                            >
                                <MessageCircle size={20} />
                                <span className="font-medium">WhatsApp</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 px-5 py-3 rounded-full text-white transition-transform hover:scale-105"
                                style={{ background: "#1877F2" }}
                            >
                                <Facebook size={20} />
                                <span className="font-medium">Facebook</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 px-5 py-3 rounded-full text-white transition-transform hover:scale-105"
                                style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
                            >
                                <Instagram size={20} />
                                <span className="font-medium">Instagram</span>
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card-solid p-8">
                        <h3 className="heading-card mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
                            Send Us a Message
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: "#0d5c3f" }}>
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: "#e8e6e1",
                                            background: "#faf8f5"
                                        }}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: "#0d5c3f" }}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: "#e8e6e1",
                                            background: "#faf8f5"
                                        }}
                                        placeholder="+220 XXX XXXX"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: "#0d5c3f" }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
                                    style={{
                                        borderColor: "#e8e6e1",
                                        background: "#faf8f5"
                                    }}
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: "#0d5c3f" }}>
                                    Subject
                                </label>
                                <select
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
                                    style={{
                                        borderColor: "#e8e6e1",
                                        background: "#faf8f5"
                                    }}
                                >
                                    <option value="">Select a topic</option>
                                    <option value="electronics">Electronics & Samsung</option>
                                    <option value="foam">Foam Products</option>
                                    <option value="travel">Travel & Hajj/Umrah</option>
                                    <option value="materials">Building Materials</option>
                                    <option value="plaza">Plaza Rental Inquiry</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: "#0d5c3f" }}>
                                    Message
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 resize-none"
                                    style={{
                                        borderColor: "#e8e6e1",
                                        background: "#faf8f5"
                                    }}
                                    placeholder="Tell us how we can help..."
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-primary w-full">
                                Send Message
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-16">
                    <div className="w-full h-80 rounded-3xl overflow-hidden">
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
            </div>
        </section>
    );
}
