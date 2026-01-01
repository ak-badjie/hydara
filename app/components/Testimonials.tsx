"use client";

import { Star, Quote } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";

const testimonials = [
    {
        id: 62,
        name: "Amadou Jallow",
        role: "Hotel Owner, Banjul",
        quote: "Hydara Foam has been our trusted supplier for 5 years. The quality of their mattresses is unmatched in The Gambia.",
        rating: 5,
        label: "Hotel Owner Photo"
    },
    {
        id: 63,
        name: "Fatou Ceesay",
        role: "Hajj Pilgrim, 2024",
        quote: "Amana Travel made our Hajj journey seamless and memorable. The organization was perfect from start to finish.",
        rating: 5,
        label: "Hajj Pilgrim Photo"
    },
    {
        id: 64,
        name: "Modou Sanneh",
        role: "Contractor, Serekunda",
        quote: "I get all my building materials from Hydara. Fair prices, quality products, and they always have stock.",
        rating: 5,
        label: "Contractor Photo"
    },
    {
        id: 65,
        name: "Mariama Touray",
        role: "Shop Owner",
        quote: "The Samsung products at Hydara Plaza are genuine and the after-sales service is excellent.",
        rating: 5,
        label: "Shop Owner Photo"
    },
];

export default function Testimonials() {
    return (
        <section
            id="testimonials"
            className="section-spacing"
            style={{ background: "#ffffff" }}
        >
            <div className="section-container">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="badge badge-gold mb-4">Trusted by Thousands</span>
                    <h2 className="heading-section mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                        What Our Customers Say
                    </h2>
                    <p className="text-body-large max-w-xl mx-auto">
                        Don't just take our word for it. Hear from the people who
                        have experienced the Hydara difference.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className="card-glass p-8 relative"
                            style={{
                                background: index % 2 === 0 ? "white" : "linear-gradient(135deg, #faf8f5 0%, #ffffff 100%)"
                            }}
                        >
                            {/* Quote Icon */}
                            <Quote
                                size={40}
                                className="absolute top-6 right-6 opacity-10"
                                style={{ color: "#c9a962" }}
                            />

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="#c9a962" stroke="#c9a962" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p
                                className="text-lg mb-6 italic"
                                style={{ color: "#0d5c3f", lineHeight: 1.7 }}
                            >
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden">
                                    <ImagePlaceholder
                                        id={testimonial.id}
                                        label={testimonial.label}
                                        aspectRatio="square"
                                        className="w-full h-full"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-medium" style={{ color: "#0d5c3f" }}>
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm" style={{ color: "#888" }}>
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 text-center">
                    <p className="text-small mb-6">Trusted Partners & Certifications</p>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            { id: 66, label: "Samsung Logo" },
                            { id: 67, label: "Partner Logo 1" },
                            { id: 68, label: "Partner Logo 2" },
                            { id: 69, label: "Certification Badge" },
                        ].map((logo) => (
                            <div
                                key={logo.id}
                                className="w-24 h-12 rounded-lg overflow-hidden opacity-60 hover:opacity-100 transition-opacity"
                            >
                                <ImagePlaceholder
                                    id={logo.id}
                                    label={logo.label}
                                    className="w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
