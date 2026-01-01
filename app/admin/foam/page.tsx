"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Upload, Loader2 } from "lucide-react";
import { useProducts, Product } from "@/lib/hooks/useFirestore";
import { useStorage } from "@/lib/hooks/useStorage";

const sizeOptions = ["King Size", "Queen Size", "Double", "Single"];
const sections = [
    { value: "foam", label: "Mattresses & Bedding" },
    { value: "furniture", label: "Sofas & Furniture" }
];

export default function FoamAdmin() {
    const { data: allProducts, loading, addItem, updateItem, deleteItem } = useProducts();
    const mattresses = allProducts.filter(p => p.section === "foam");
    const furniture = allProducts.filter(p => p.section === "furniture");
    const { uploadImage, isUploading, progress } = useStorage();

    const [activeTab, setActiveTab] = useState<"foam" | "furniture">("foam");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        size: "King Size",
        section: "foam" as "foam" | "furniture",
        imageUrl: ""
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const currentProducts = activeTab === "foam" ? mattresses : furniture;

    const openModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                price: product.price.toString(),
                size: product.size || "King Size",
                section: product.section as "foam" | "furniture",
                imageUrl: product.imageUrl
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: "",
                price: "",
                size: "King Size",
                section: activeTab,
                imageUrl: ""
            });
        }
        setImageFile(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setImageFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            let imageUrl = formData.imageUrl;

            if (imageFile) {
                imageUrl = await uploadImage(imageFile, "foam");
            }

            const productData = {
                name: formData.name,
                price: parseFloat(formData.price),
                currency: "GMD",
                category: formData.section === "foam" ? "Mattress" : "Furniture",
                badge: null,
                imageUrl,
                rating: 4,
                section: formData.section,
                size: formData.size,
                tags: [formData.section]
            };

            if (editingProduct?.id) {
                await updateItem(editingProduct.id, productData);
            } else {
                await addItem(productData);
            }

            closeModal();
        } catch (error) {
            console.error("Error saving product:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteItem(id);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                        Foam Products
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.5)" }}>
                        Manage mattresses and foam furniture
                    </p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" }}
                >
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                {sections.map((section) => (
                    <button
                        key={section.value}
                        onClick={() => setActiveTab(section.value as "foam" | "furniture")}
                        className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                        style={{
                            background: activeTab === section.value ? "#22c55e" : "rgba(255,255,255,0.05)",
                            color: activeTab === section.value ? "white" : "rgba(255,255,255,0.6)"
                        }}
                    >
                        {section.label}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 size={32} className="animate-spin text-white/50" />
                </div>
            ) : currentProducts.length === 0 ? (
                <div
                    className="text-center py-20 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                    <p className="text-white/50 mb-4">No {activeTab === "foam" ? "mattresses" : "furniture"} yet</p>
                    <button
                        onClick={() => openModal()}
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ background: "#22c55e", color: "white" }}
                    >
                        Add your first product
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {currentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="rounded-2xl overflow-hidden group"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                            <div className="aspect-square relative overflow-hidden">
                                {product.imageUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                                        <span className="text-white/20">No image</span>
                                    </div>
                                )}
                                {product.size && (
                                    <span
                                        className="absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full"
                                        style={{ background: "#22c55e", color: "white" }}
                                    >
                                        {product.size}
                                    </span>
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => openModal(product)}
                                        className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                                    >
                                        <Edit2 size={18} className="text-white" />
                                    </button>
                                    <button
                                        onClick={() => product.id && handleDelete(product.id)}
                                        className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition-colors"
                                    >
                                        <Trash2 size={18} className="text-red-400" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-white font-medium mb-1 truncate">{product.name}</h3>
                                <p className="text-lg font-semibold mt-2" style={{ color: "#4ade80" }}>
                                    GMD {product.price?.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)" }}>
                    <div
                        className="w-full max-w-lg rounded-2xl p-6"
                        style={{ background: "#1a1f26", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-white">
                                {editingProduct ? "Edit Product" : "Add Product"}
                            </h2>
                            <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                <X size={20} className="text-white/60" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-xl text-white outline-none"
                                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                                    placeholder="Premium King Mattress"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">Price (GMD)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-xl text-white outline-none"
                                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                                        placeholder="18000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">Type</label>
                                    <select
                                        value={formData.section}
                                        onChange={(e) => setFormData({ ...formData, section: e.target.value as "foam" | "furniture" })}
                                        className="w-full px-4 py-3 rounded-xl text-white outline-none"
                                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                                    >
                                        {sections.map(s => (
                                            <option key={s.value} value={s.value} style={{ background: "#1a1f26" }}>{s.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {formData.section === "foam" && (
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">Size</label>
                                    <div className="flex flex-wrap gap-2">
                                        {sizeOptions.map((size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, size })}
                                                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                                style={{
                                                    background: formData.size === size ? "#22c55e" : "rgba(255,255,255,0.05)",
                                                    color: formData.size === size ? "white" : "rgba(255,255,255,0.6)"
                                                }}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">Product Image</label>
                                <div
                                    className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-white/30 transition-colors"
                                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                                    onClick={() => document.getElementById("file-input")?.click()}
                                >
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) setImageFile(file);
                                        }}
                                    />
                                    {imageFile ? (
                                        <p className="text-white/70">{imageFile.name}</p>
                                    ) : formData.imageUrl ? (
                                        <p className="text-white/70">Current image set. Click to change.</p>
                                    ) : (
                                        <>
                                            <Upload size={24} className="mx-auto mb-2 text-white/30" />
                                            <p className="text-white/50 text-sm">Click to upload image</p>
                                        </>
                                    )}
                                </div>
                                {isUploading && (
                                    <div className="mt-2">
                                        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                                            <div
                                                className="h-full transition-all duration-300"
                                                style={{ width: `${progress}%`, background: "#22c55e" }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-3 rounded-xl font-medium transition-colors"
                                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 px-4 py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 disabled:opacity-50"
                                    style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" }}
                                >
                                    {isSaving ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        editingProduct ? "Save Changes" : "Add Product"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
