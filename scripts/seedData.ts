/**
 * Seed Script for Hydara Firebase Database
 * 
 * This script uploads initial images to Firebase Storage and populates
 * Firestore with the initial product data.
 * 
 * Run with: npx ts-node scripts/seedData.ts
 * 
 * Make sure you have the Firebase SDK installed and configured.
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfig = {
    apiKey: "AIzaSyDICqj7kkDh92xEM5QW3P0gqPd6G6TtASY",
    authDomain: "hydara.firebaseapp.com",
    projectId: "hydara",
    storageBucket: "hydara.firebasestorage.app",
    messagingSenderId: "106638362146",
    appId: "1:106638362146:web:ad71595d916b7f796eec7b",
    measurementId: "G-1G7WL5RYV8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Helper to upload a file to Firebase Storage
async function uploadFile(filePath: string, storagePath: string): Promise<string> {
    const file = fs.readFileSync(filePath);
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(`✓ Uploaded: ${storagePath}`);
    return downloadURL;
}

// Helper to clear a collection
async function clearCollection(collectionName: string) {
    const snapshot = await getDocs(collection(db, collectionName));
    const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, collectionName, d.id)));
    await Promise.all(deletePromises);
    console.log(`✓ Cleared collection: ${collectionName}`);
}

async function seedDatabase() {
    console.log("\n🚀 Starting Hydara Database Seed...\n");

    // Get the public folder path (relative to script location)
    const publicDir = path.join(__dirname, "..", "public");

    // ============================================
    // 1. Upload Site Images to Storage
    // ============================================
    console.log("📸 Uploading site images...");

    const siteImages: { name: string; type: string; url: string }[] = [];
    const imagesToUpload = [
        { file: "foam.jpg", type: "foam" },
        { file: "hero.jpeg", type: "hero" },
        { file: "plaza.jpeg", type: "plaza" },
        { file: "smart-tv.png", type: "smart-tv" }
    ];

    for (const img of imagesToUpload) {
        const filePath = path.join(publicDir, img.file);
        if (fs.existsSync(filePath)) {
            const url = await uploadFile(filePath, `site-images/${img.file}`);
            siteImages.push({ name: img.file, type: img.type, url });
        } else {
            console.log(`⚠ File not found: ${filePath}`);
        }
    }

    // ============================================
    // 2. Clear existing data
    // ============================================
    console.log("\n🗑️  Clearing existing data...");
    await clearCollection("admins");
    await clearCollection("products");
    await clearCollection("travelPackages");
    await clearCollection("materialCategories");
    await clearCollection("plazaShops");
    await clearCollection("siteImages");

    // ============================================
    // 3. Seed Admin User
    // ============================================
    console.log("\n👤 Creating admin user...");
    await addDoc(collection(db, "admins"), {
        username: "admin",
        password: "admin",  // In production, use proper hashing
        createdAt: new Date()
    });
    console.log("✓ Admin user created: admin / admin");

    // ============================================
    // 4. Seed Site Images
    // ============================================
    console.log("\n🖼️  Saving site image references...");
    for (const img of siteImages) {
        await addDoc(collection(db, "siteImages"), img);
    }
    console.log(`✓ Saved ${siteImages.length} site images`);

    // Get the smart-tv URL for products
    const smartTvUrl = siteImages.find(i => i.type === "smart-tv")?.url || "/smart-tv.png";

    // ============================================
    // 5. Seed Electronics Products
    // ============================================
    console.log("\n📺 Seeding electronics products...");
    const electronics = [
        { name: "Samsung Smart TV 65\"", price: 45000, category: "TVs", badge: "Best Seller", imageUrl: smartTvUrl },
        { name: "Galaxy S24 Ultra", price: 75000, category: "Phones", badge: "New", imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop" },
        { name: "Samsung Refrigerator", price: 38000, category: "Appliances", badge: null, imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop" },
        { name: "Galaxy Buds Pro", price: 8500, category: "Audio", badge: null, imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop" },
        { name: "Galaxy Watch 6", price: 15000, category: "Wearables", badge: "Popular", imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop" },
        { name: "Samsung 50\" 4K TV", price: 32000, category: "TVs", badge: null, imageUrl: smartTvUrl },
        { name: "Galaxy A54", price: 22000, category: "Phones", badge: null, imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop" },
        { name: "Samsung Washer", price: 28000, category: "Appliances", badge: "Sale", imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop" },
        { name: "Soundbar Q-Series", price: 18000, category: "Audio", badge: null, imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop" },
        { name: "Galaxy Tab S9", price: 45000, category: "Phones", badge: "New", imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop" },
    ];

    for (const product of electronics) {
        await addDoc(collection(db, "products"), {
            ...product,
            currency: "GMD",
            rating: 4,
            section: "electronics",
            tags: [product.category.toLowerCase()],
            createdAt: new Date()
        });
    }
    console.log(`✓ Added ${electronics.length} electronics products`);

    // ============================================
    // 6. Seed Foam Products
    // ============================================
    console.log("\n🛏️  Seeding foam products...");
    const foamProducts = [
        { name: "Premium King Mattress", price: 18000, size: "King Size", section: "foam", imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop" },
        { name: "Queen Foam Mattress", price: 14000, size: "Queen Size", section: "foam", imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop" },
        { name: "Single Student Mattress", price: 6500, size: "Single", section: "foam", imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop" },
        { name: "Double Foam Mattress", price: 10000, size: "Double", section: "foam", imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop" },
        { name: "3-Seater Sofa Set", price: 35000, section: "furniture", imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop" },
        { name: "Executive Office Chair", price: 8500, section: "furniture", imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop" },
        { name: "Dining Chair Cushions (Set)", price: 4500, section: "furniture", imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop" },
        { name: "Custom Foam Cutting", price: 500, section: "furniture", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
    ];

    for (const product of foamProducts) {
        await addDoc(collection(db, "products"), {
            ...product,
            currency: "GMD",
            category: product.section === "foam" ? "Mattress" : "Furniture",
            badge: null,
            rating: 4,
            tags: [product.section],
            createdAt: new Date()
        });
    }
    console.log(`✓ Added ${foamProducts.length} foam products`);

    // ============================================
    // 7. Seed Travel Packages
    // ============================================
    console.log("\n✈️  Seeding travel packages...");
    const packages = [
        {
            name: "Hajj Package 2025",
            description: "Complete Hajj pilgrimage package with accommodation near Haram",
            duration: "21 Days",
            price: 350000,
            features: ["5-Star Hotels", "Direct Flights", "Full Board", "Guided Tours"],
            label: "Hajj Pilgrimage",
            popular: true,
            imageUrl: ""
        },
        {
            name: "Umrah Economy",
            description: "Affordable Umrah package for spiritual journey",
            duration: "10 Days",
            price: 120000,
            features: ["3-Star Hotels", "Visa Processing", "Transport"],
            label: "Umrah Package",
            popular: false,
            imageUrl: ""
        },
        {
            name: "Umrah Premium",
            description: "Luxury Umrah experience with premium accommodation",
            duration: "14 Days",
            price: 200000,
            features: ["5-Star Hotels", "VIP Transport", "Private Guide"],
            label: "Premium Umrah",
            popular: false,
            imageUrl: ""
        },
    ];

    for (const pkg of packages) {
        await addDoc(collection(db, "travelPackages"), {
            ...pkg,
            createdAt: new Date()
        });
    }
    console.log(`✓ Added ${packages.length} travel packages`);

    // ============================================
    // 8. Seed Material Categories
    // ============================================
    console.log("\n🔨 Seeding material categories...");
    const categories = [
        { name: "Cement & Concrete", label: "Cement Bags" },
        { name: "Steel & Iron", label: "Steel Rods" },
        { name: "Tiles & Flooring", label: "Tiles Collection" },
        { name: "Plumbing", label: "Plumbing Supplies" },
        { name: "Electrical", label: "Electrical Items" },
        { name: "Paint & Finishes", label: "Paint Colors" },
        { name: "Roofing", label: "Roofing Sheets" },
        { name: "Tools & Equipment", label: "Construction Tools" },
    ];

    for (const cat of categories) {
        await addDoc(collection(db, "materialCategories"), {
            ...cat,
            imageUrl: "",
            createdAt: new Date()
        });
    }
    console.log(`✓ Added ${categories.length} material categories`);

    // ============================================
    // 9. Seed Plaza Shops
    // ============================================
    console.log("\n🏢 Seeding plaza shops...");
    const shops = [
        { name: "Amana Travel & Tours", floor: "Ground Floor", label: "Travel Agency Shop" },
        { name: "Unitrade Body Care", floor: "Ground Floor", label: "Body Care Products" },
        { name: "Electronics Store", floor: "Ground Floor", label: "Electronics Shop" },
        { name: "Building Materials", floor: "Ground Floor", label: "Materials Shop" },
        { name: "Fashion & Cosmetics", floor: "First Floor", label: "Fashion Store" },
        { name: "General Trading", floor: "First Floor", label: "Trading Shop" },
    ];

    for (const shop of shops) {
        await addDoc(collection(db, "plazaShops"), {
            ...shop,
            imageUrl: "",
            createdAt: new Date()
        });
    }
    console.log(`✓ Added ${shops.length} plaza shops`);

    // ============================================
    // Done!
    // ============================================
    console.log("\n✅ Database seeding complete!\n");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("👤 Admin Username: admin");
    console.log("🔑 Password: admin");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    process.exit(0);
}

seedDatabase().catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
});
