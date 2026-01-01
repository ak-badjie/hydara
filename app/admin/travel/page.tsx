"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Upload, Loader2, Star } from "lucide-react";
import { useTravelPackages, TravelPackage } from "@/lib/hooks/useFirestore";
import { useStorage } from "@/lib/hooks/useStorage";

export default function TravelAdmin() {
    const { data: packages, loading, addItem, updateItem, deleteItem } = useTravelPackages();
    const { uploadImage, isUploading, progress } = useStorage();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        duration: "",
        price: "",
        features: "",
        label: "",
        popular: false,
        imageUrl: ""
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const openModal = (pkg?: TravelPackage) => {
        if (pkg) {
            setEditingPackage(pkg);
            setFormData({
                name: pkg.name,
                description: pkg.description,
                duration: pkg.duration,
                price: pkg.price.toString(),
                features: pkg.features.join(", "),
                label: pkg.label,
                popular: pkg.popular,
                imageUrl: pkg.imageUrl || ""
            });
        } else {
            setEditingPackage(null);
            setFormData({
                name: "",
                description: "",
                duration: "",
                price: "",
                features: "",
                label: "",
                popular: false,
                imageUrl: ""
            });
        }
        setImageFile(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPackage(null);
        setImageFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            let imageUrl = formData.imageUrl;

            if (imageFile) {
                imageUrl = await uploadImage(imageFile, "travel");
            }

            const packageData = {
                name: formData.name,
                description: formData.description,
                duration: formData.duration,
                price: parseFloat(formData.price),
                features: formData.features.split(",").map(f => f.trim()).filter(Boolean),
                label: formData.label,
                popular: formData.popular,
                imageUrl
            };

            if (editingPackage?.id) {
                await updateItem(editingPackage.id, packageData);
            } else {
                await addItem(packageData);
            }

            closeModal();
        } catch (error) {
            console.error("Error saving package:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this package?")) {
            await deleteItem(id);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                        Travel Packages
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.5)" }}>
                        Manage Hajj and Umrah packages
                    </p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" }}
                >
                    <Plus size={18} />
                    Add Package
                </button>
            </div>

            {/* Packages Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 size={32} className="animate-spin text-white/50" />
                </div>
            ) : packages.length === 0 ? (
                <div
                    className="text-center py-20 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                    <p className="text-white/50 mb-4">No travel packages yet</p>
                    <button
                        onClick={() => openModal()}
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ background: "#f59e0b", color: "white" }}
                    >
                        Add your first package
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className="rounded-2xl overflow-hidden group relative"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                            {pkg.popular && (
                                <div
                                    className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                                    style={{ background: "#f59e0b", color: "white" }}
                                >
                                    <Star size={12} fill="white" />
                                    Popular
                                </div>
                            )}
                            <div className="aspect-video relative overflow-hidden">
                                {pkg.imageUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={pkg.imageUrl}
                                        alt={pkg.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                                        <span className="text-white/20">No image</span>
                                    </div>
                                )}
                                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(0,0,0,0.6)", color: "white" }}>
                                    {pkg.duration}
                                </div>
                            </div>
                            <div className="p-5">
                                <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: "rgba(245, 158, 11, 0.2)", color: "#f59e0b" }}>
                                    {pkg.label}
                                </span>
                                <h3 className="text-lg font-semibold text-white mt-3 mb-2">{pkg.name}</h3>
                                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                                    {pkg.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {pkg.features.slice(0, 3).map((feature) => (
                                        <span key={feature} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)" }}>
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                                    <div>
                                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>From</p>
                                        <p className="text-xl font-bold" style={{ color: "#f59e0b" }}>GMD {pkg.price?.toLocaleString()}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openModal(pkg)}
                                            className="p-2.5 rounded-lg transition-colors"
                                            style={{ background: "rgba(255,255,255,0.05)" }}
                                        >
                                            <Edit2 size={16} className="text-white/60" />
                                        </button>
                                        <button
                                            onClick={() => pkg.id && handleDelete(pkg.id)}
                                            className="p-2.5 rounded-lg transition-colors"
                                            style={{ background: "rgba(239, 68, 68, 0.1)" }}
                                        >
                                            <Trash2 size={16} className="text-red-400" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ background: "rgba(0,0,0,0.8)" }}>
                    <div
                        className="w-full max-w-lg rounded-2xl p-6 my-8"
                        style={{ background: "#1a1f26", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-white">
                                {editingPackage ? "Edit Package" : "Add Package"}
                            </h2>
                            <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                <X size={20} className="text-white/60" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">Package Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-xl text-white outline-none"
                                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                                    placeholder="Hajj Package 2025"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-xl text-white outline-none resize-none"
                                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                                    placeholder="Complete Hajj pilgrimage package..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">Duration</label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-xl text-white outline-none"
                                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                                        placeholder="21 Days"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">Price (GMD)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-xl text-white outline-none"
                                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                                        placeholder="350000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">Label</label>
                                <input
                                    type="text"
                                    value={formData.label}
                                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-xl text-white outline-none"
                                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                                    placeholder="Hajj Pilgrimage"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">Features (comma-separated)</label>
                                <input
                                    type="text"
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl text-white outline-none"
                                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                                    placeholder="5-Star Hotels, Direct Flights, Full Board"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="popular"
                                    checked={formData.popular}
                                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                                    className="w-5 h-5 rounded"
                                />
                                <label htmlFor="popular" className="text-sm text-white/70">Mark as Popular</label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">Package Image</label>
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
                                                style={{ width: `${progress}%`, background: "#f59e0b" }}
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
                                    style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" }}
                                >
                                    {isSaving ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        editingPackage ? "Save Changes" : "Add Package"
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
