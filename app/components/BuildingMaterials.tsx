"use client";

import { ArrowRight, Hammer, Truck, CheckCircle } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import { ProductImagePlaceholder } from "./ImagePlaceholder";

const categories = [
    { id: 40, name: "Cement & Concrete", label: "Cement Bags" },
    { id: 41, name: "Steel & Iron", label: "Steel Rods" },
    { id: 42, name: "Tiles & Flooring", label: "Tiles Collection" },
    { id: 43, name: "Plumbing", label: "Plumbing Supplies" },
    { id: 44, name: "Electrical", label: "Electrical Items" },
    { id: 45, name: "Paint & Finishes", label: "Paint Colors" },
    { id: 46, name: "Roofing", label: "Roofing Sheets" },
    { id: 47, name: "Tools & Equipment", label: "Construction Tools" },
];

const features = [
    { icon: Truck, title: "Delivery Available", description: "Delivery across Greater Banjul Area" },
    { icon: CheckCircle, title: "Quality Guaranteed", description: "Only trusted brands and materials" },
    { icon: Hammer, title: "Bulk Orders", description: "Special pricing for contractors" },
];

export default function BuildingMaterials() {
    return (
        <section
            id="materials"
            className="section-spacing"
            style={{ background: "#ffffff" }}
        >
            <div className="section-container">
                {/* Header with Image */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <span className="badge mb-4" style={{ background: "#fce4ec", color: "#c2185b" }}>
                            <Hammer size={14} className="inline mr-1" />
                            Construction Supplies
                        </span>
                        <h2 className="heading-section mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                            Building Materials
                        </h2>
                        <p className="text-body-large mb-8">
                            Everything you need to build your dream project. Quality construction
                            materials from trusted suppliers, all available at Hydara Plaza.
                        </p>

                        {/* Features */}
                        <div className="space-y-4 mb-8">
                            {features.map((feature) => (
                                <div key={feature.title} className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: "#fce4ec" }}
                                    >
                                        <feature.icon size={24} style={{ color: "#c2185b" }} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium" style={{ color: "#0d5c3f" }}>{feature.title}</h4>
                                        <p className="text-sm" style={{ color: "#555" }}>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a href="#contact" className="btn-primary" style={{ background: "#c2185b" }}>
                            Request Quote
                            <ArrowRight size={18} />
                        </a>
                    </div>

                    {/* Main Image */}
                    <div>
                        <ImagePlaceholder
                            id={48}
                            label="Building Materials Store / Warehouse"
                            aspectRatio="video"
                        />
                    </div>
                </div>

                {/* Categories Grid */}
                <div>
                    <h3 className="heading-card mb-8 text-center" style={{ fontFamily: "var(--font-outfit)" }}>
                        Our Product Categories
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="card-product group cursor-pointer text-center"
                            >
                                <ProductImagePlaceholder id={cat.id} label={cat.label} />
                                <div className="p-4">
                                    <h4 className="text-sm font-medium" style={{ color: "#0d5c3f" }}>
                                        {cat.name}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
