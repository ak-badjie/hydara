"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Upload, Loader2 } from "lucide-react";
import { useMaterialCategories, MaterialCategory } from "@/lib/hooks/useFirestore";
import { useStorage } from "@/lib/hooks/useStorage";

export default function MaterialsAdmin() {
    const { data: categories, loading, addItem, updateItem, deleteItem } = useMaterialCategories();
    const { uploadImage, isUploading, progress } = useStorage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<MaterialCategory | null>(null);
    const [formData, setFormData] = useState({ name: "", label: "", imageUrl: "" });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const openModal = (category?: MaterialCategory) => {
        if (category) {
            setEditingCategory(category);
            setFormData({ name: category.name, label: category.label, imageUrl: category.imageUrl || "" });
        } else {
            setEditingCategory(null);
            setFormData({ name: "", label: "", imageUrl: "" });
        }
        setImageFile(null);
        setIsModalOpen(true);
    };

    const closeModal = () => { setIsModalOpen(false); setEditingCategory(null); setImageFile(null); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            let imageUrl = formData.imageUrl;
            if (imageFile) imageUrl = await uploadImage(imageFile, "materials");
            const categoryData = { name: formData.name, label: formData.label, imageUrl };
            if (editingCategory?.id) await updateItem(editingCategory.id, categoryData);
            else await addItem(categoryData);
            closeModal();
        } catch (error) { console.error("Error saving category:", error); }
        finally { setIsSaving(false); }
    };

    const handleDelete = async (id: string) => { if (confirm("Are you sure you want to delete this category?")) await deleteItem(id); };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-outfit)", color: "#ec4899" }}>Building Materials</h1>
                    <p style={{ color: "#666" }}>Manage material categories</p>
                </div>
                <button onClick={() => openModal()} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)" }}>
                    <Plus size={18} />Add Category
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin" style={{ color: "#ec4899" }} /></div>
            ) : categories.length === 0 ? (
                <div className="text-center py-20 rounded-2xl" style={{ background: "white", border: "1px solid #e8e6e1" }}>
                    <p className="mb-4" style={{ color: "#888" }}>No categories yet</p>
                    <button onClick={() => openModal()} className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#ec4899" }}>Add your first category</button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <div key={category.id} className="rounded-2xl overflow-hidden group" style={{ background: "white", border: "1px solid #e8e6e1" }}>
                            <div className="aspect-square relative overflow-hidden">
                                {category.imageUrl ? <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center" style={{ background: "#f5f5f5" }}><span style={{ color: "#ccc" }}>No image</span></div>}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button onClick={() => openModal(category)} className="p-3 rounded-xl bg-white/90 hover:bg-white transition-colors"><Edit2 size={18} style={{ color: "#333" }} /></button>
                                    <button onClick={() => category.id && handleDelete(category.id)} className="p-3 rounded-xl bg-red-100 hover:bg-red-200 transition-colors"><Trash2 size={18} style={{ color: "#dc2626" }} /></button>
                                </div>
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="font-medium" style={{ color: "#333" }}>{category.name}</h3>
                                <p className="text-xs mt-1" style={{ color: "#888" }}>{category.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto" style={{ background: "white", border: "1px solid #e8e6e1" }}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold" style={{ color: "#333" }}>{editingCategory ? "Edit Category" : "Add Category"}</h2>
                            <button onClick={closeModal} className="p-2 hover:bg-black/5 rounded-lg transition-colors"><X size={20} style={{ color: "#666" }} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div><label className="block text-sm font-medium mb-2" style={{ color: "#333" }}>Category Name</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 rounded-xl outline-none" style={{ background: "#f5f5f5", border: "1px solid #e8e6e1", color: "#333" }} placeholder="Cement & Concrete" /></div>
                            <div><label className="block text-sm font-medium mb-2" style={{ color: "#333" }}>Label / Description</label><input type="text" value={formData.label} onChange={(e) => setFormData({ ...formData, label: e.target.value })} required className="w-full px-4 py-3 rounded-xl outline-none" style={{ background: "#f5f5f5", border: "1px solid #e8e6e1", color: "#333" }} placeholder="Cement Bags" /></div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: "#333" }}>Category Image</label>
                                <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-[#ec4899] transition-colors" style={{ borderColor: "#e8e6e1" }} onClick={() => document.getElementById("file-input")?.click()}>
                                    <input id="file-input" type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) setImageFile(file); }} />
                                    {imageFile ? <p style={{ color: "#333" }}>{imageFile.name}</p> : formData.imageUrl ? <p style={{ color: "#666" }}>Current image set. Click to change.</p> : <><Upload size={24} className="mx-auto mb-2" style={{ color: "#ccc" }} /><p className="text-sm" style={{ color: "#888" }}>Click to upload image</p></>}
                                </div>
                                {isUploading && <div className="mt-2"><div className="h-2 rounded-full overflow-hidden" style={{ background: "#e8e6e1" }}><div className="h-full transition-all duration-300" style={{ width: `${progress}%`, background: "#ec4899" }} /></div></div>}
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl font-medium transition-colors" style={{ background: "#f5f5f5", color: "#555" }}>Cancel</button>
                                <button type="submit" disabled={isSaving} className="flex-1 px-4 py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 disabled:opacity-50" style={{ background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)" }}>{isSaving ? <Loader2 size={18} className="animate-spin" /> : (editingCategory ? "Save Changes" : "Add Category")}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
