"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Upload, Loader2 } from "lucide-react";
import { usePlazaShops, PlazaShop } from "@/lib/hooks/useFirestore";
import { useStorage } from "@/lib/hooks/useStorage";

const floorOptions = ["Ground Floor", "First Floor", "Second Floor"];

export default function PlazaAdmin() {
    const { data: shops, loading, addItem, updateItem, deleteItem } = usePlazaShops();
    const { uploadImage, isUploading, progress } = useStorage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingShop, setEditingShop] = useState<PlazaShop | null>(null);
    const [formData, setFormData] = useState({ name: "", floor: "Ground Floor", label: "", imageUrl: "" });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const openModal = (shop?: PlazaShop) => {
        if (shop) {
            setEditingShop(shop);
            setFormData({ name: shop.name, floor: shop.floor, label: shop.label, imageUrl: shop.imageUrl || "" });
        } else {
            setEditingShop(null);
            setFormData({ name: "", floor: "Ground Floor", label: "", imageUrl: "" });
        }
        setImageFile(null);
        setIsModalOpen(true);
    };

    const closeModal = () => { setIsModalOpen(false); setEditingShop(null); setImageFile(null); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            let imageUrl = formData.imageUrl;
            if (imageFile) imageUrl = await uploadImage(imageFile, "plaza");
            const shopData = { name: formData.name, floor: formData.floor, label: formData.label, imageUrl };
            if (editingShop?.id) await updateItem(editingShop.id, shopData);
            else await addItem(shopData);
            closeModal();
        } catch (error) { console.error("Error saving shop:", error); }
        finally { setIsSaving(false); }
    };

    const handleDelete = async (id: string) => { if (confirm("Are you sure you want to delete this shop?")) await deleteItem(id); };

    const shopsByFloor = shops.reduce((acc, shop) => {
        const floor = shop.floor || "Ground Floor";
        if (!acc[floor]) acc[floor] = [];
        acc[floor].push(shop);
        return acc;
    }, {} as Record<string, PlazaShop[]>);

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-outfit)", color: "#8b5cf6" }}>Plaza & Tenants</h1>
                    <p style={{ color: "#666" }}>Manage plaza shops and tenants</p>
                </div>
                <button onClick={() => openModal()} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" }}>
                    <Plus size={18} />Add Shop
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin" style={{ color: "#8b5cf6" }} /></div>
            ) : shops.length === 0 ? (
                <div className="text-center py-20 rounded-2xl" style={{ background: "white", border: "1px solid #e8e6e1" }}>
                    <p className="mb-4" style={{ color: "#888" }}>No shops yet</p>
                    <button onClick={() => openModal()} className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#8b5cf6" }}>Add your first shop</button>
                </div>
            ) : (
                <div className="space-y-8">
                    {Object.entries(shopsByFloor).map(([floor, floorShops]) => (
                        <div key={floor}>
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "#333" }}>
                                <span className="w-2 h-2 rounded-full" style={{ background: "#8b5cf6" }} />
                                {floor}
                                <span className="text-sm font-normal" style={{ color: "#888" }}>({floorShops.length} shops)</span>
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {floorShops.map((shop) => (
                                    <div key={shop.id} className="rounded-2xl overflow-hidden group" style={{ background: "white", border: "1px solid #e8e6e1" }}>
                                        <div className="aspect-video relative overflow-hidden">
                                            {shop.imageUrl ? <img src={shop.imageUrl} alt={shop.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center" style={{ background: "#f5f5f5" }}><span style={{ color: "#ccc" }}>No image</span></div>}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button onClick={() => openModal(shop)} className="p-2.5 rounded-xl bg-white/90 hover:bg-white transition-colors"><Edit2 size={16} style={{ color: "#333" }} /></button>
                                                <button onClick={() => shop.id && handleDelete(shop.id)} className="p-2.5 rounded-xl bg-red-100 hover:bg-red-200 transition-colors"><Trash2 size={16} style={{ color: "#dc2626" }} /></button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium text-sm" style={{ color: "#333" }}>{shop.name}</h3>
                                            <p className="text-xs mt-1" style={{ color: "#888" }}>{shop.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto" style={{ background: "white", border: "1px solid #e8e6e1" }}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold" style={{ color: "#333" }}>{editingShop ? "Edit Shop" : "Add Shop"}</h2>
                            <button onClick={closeModal} className="p-2 hover:bg-black/5 rounded-lg transition-colors"><X size={20} style={{ color: "#666" }} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div><label className="block text-sm font-medium mb-2" style={{ color: "#333" }}>Shop Name</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 rounded-xl outline-none" style={{ background: "#f5f5f5", border: "1px solid #e8e6e1", color: "#333" }} placeholder="Amana Travel & Tours" /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium mb-2" style={{ color: "#333" }}>Floor</label><select value={formData.floor} onChange={(e) => setFormData({ ...formData, floor: e.target.value })} className="w-full px-4 py-3 rounded-xl outline-none" style={{ background: "#f5f5f5", border: "1px solid #e8e6e1", color: "#333" }}>{floorOptions.map(floor => <option key={floor} value={floor}>{floor}</option>)}</select></div>
                                <div><label className="block text-sm font-medium mb-2" style={{ color: "#333" }}>Label</label><input type="text" value={formData.label} onChange={(e) => setFormData({ ...formData, label: e.target.value })} required className="w-full px-4 py-3 rounded-xl outline-none" style={{ background: "#f5f5f5", border: "1px solid #e8e6e1", color: "#333" }} placeholder="Travel Agency" /></div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: "#333" }}>Shop Image</label>
                                <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-[#8b5cf6] transition-colors" style={{ borderColor: "#e8e6e1" }} onClick={() => document.getElementById("file-input")?.click()}>
                                    <input id="file-input" type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) setImageFile(file); }} />
                                    {imageFile ? <p style={{ color: "#333" }}>{imageFile.name}</p> : formData.imageUrl ? <p style={{ color: "#666" }}>Current image set. Click to change.</p> : <><Upload size={24} className="mx-auto mb-2" style={{ color: "#ccc" }} /><p className="text-sm" style={{ color: "#888" }}>Click to upload image</p></>}
                                </div>
                                {isUploading && <div className="mt-2"><div className="h-2 rounded-full overflow-hidden" style={{ background: "#e8e6e1" }}><div className="h-full transition-all duration-300" style={{ width: `${progress}%`, background: "#8b5cf6" }} /></div></div>}
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl font-medium transition-colors" style={{ background: "#f5f5f5", color: "#555" }}>Cancel</button>
                                <button type="submit" disabled={isSaving} className="flex-1 px-4 py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 disabled:opacity-50" style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" }}>{isSaving ? <Loader2 size={18} className="animate-spin" /> : (editingShop ? "Save Changes" : "Add Shop")}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
