"use client";

import { useState } from "react";

interface ImagePlaceholderProps {
    id: number;
    aspectRatio?: "square" | "video" | "portrait" | "wide" | "hero";
    label?: string;
    dark?: boolean;
    className?: string;
}

const aspectRatios = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
    hero: "aspect-[16/9]",
};

// Placeholder images from Unsplash for preview
const placeholderImages: { [key: number]: string } = {
    // Hero Section
    1: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&h=800&fit=crop",
    2: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    3: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    4: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
    5: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop",
    6: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop",
    7: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    8: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    9: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    10: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop",
    11: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=600&fit=crop",
    12: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    13: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    14: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    15: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
    16: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
    17: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    18: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    19: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    20: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    21: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop",
    22: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
    23: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    24: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop",
    25: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop",
    26: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop",
    27: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop",
    28: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    29: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop",
    30: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop",
    31: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    32: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=500&fit=crop",
    33: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=500&fit=crop",
    34: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=500&fit=crop",
    35: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=500&fit=crop",
    36: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&h=400&fit=crop",
    37: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=400&fit=crop",
    38: "https://images.unsplash.com/photo-1559599746-8823b38544c6?w=400&h=400&fit=crop",
    39: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop",
    40: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=400&h=400&fit=crop",
    41: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop",
    42: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400&h=400&fit=crop",
    43: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=400&fit=crop",
    44: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop",
    45: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop",
    46: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=400&h=400&fit=crop",
    47: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
    48: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
    49: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    50: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400&fit=crop",
    51: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop",
    52: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    53: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    54: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop",
    55: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    56: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop",
    57: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    58: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=400&fit=crop",
    59: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    60: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    61: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop",
    62: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    63: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    64: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    65: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    66: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=100&fit=crop",
    67: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop",
    68: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop",
    69: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop",
    70: "https://images.unsplash.com/photo-1524661135423-fa4ba6f46c34?w=1200&h=400&fit=crop",
};

// Map of local images - add your images here with their exact filenames
const localImages: { [key: number]: string } = {
    // Add your images here as you add them to /public/
    // Example: 4: "/4.png",
};

export default function ImagePlaceholder({
    id,
    aspectRatio = "video",
    label,
    className = ""
}: ImagePlaceholderProps) {
    const [useFallback, setUseFallback] = useState(false);

    const localImage = localImages[id];
    const fallbackImage = placeholderImages[id] || `https://picsum.photos/seed/${id}/800/600`;
    const imageSrc = localImage && !useFallback ? localImage : fallbackImage;

    return (
        <div
            className={`relative overflow-hidden ${aspectRatios[aspectRatio]} rounded-2xl ${className}`}
            data-placeholder-id={id}
            title={`Image #${id} - ${label || 'Add your image here'}`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={imageSrc}
                alt={label || `Image ${id}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={() => setUseFallback(true)}
            />
        </div>
    );
}

export function ProductImagePlaceholder({
    id,
    label,
    className = ""
}: {
    id: number;
    label?: string;
    className?: string;
}) {
    const [useFallback, setUseFallback] = useState(false);

    const localImage = localImages[id];
    const fallbackImage = placeholderImages[id] || `https://picsum.photos/seed/${id}/400/400`;
    const imageSrc = localImage && !useFallback ? localImage : fallbackImage;

    return (
        <div
            className={`relative aspect-square overflow-hidden ${className}`}
            data-placeholder-id={id}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={imageSrc}
                alt={label || `Product ${id}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={() => setUseFallback(true)}
            />
        </div>
    );
}

export function HeroImagePlaceholder({
    id,
    label,
    className = ""
}: {
    id: number;
    label?: string;
    className?: string;
}) {
    const [useFallback, setUseFallback] = useState(false);

    const localImage = localImages[id];
    const fallbackImage = placeholderImages[id] || `https://picsum.photos/seed/${id}/1200/800`;
    const imageSrc = localImage && !useFallback ? localImage : fallbackImage;

    return (
        <div
            className={`relative w-full min-h-[300px] overflow-hidden rounded-3xl ${className}`}
            style={{ aspectRatio: "16/10" }}
            data-placeholder-id={id}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={imageSrc}
                alt={label || `Hero Image ${id}`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                onError={() => setUseFallback(true)}
            />
        </div>
    );
}

export function GalleryImagePlaceholder({
    id,
    size = "medium",
    label
}: {
    id: number;
    size?: "small" | "medium" | "large";
    label?: string;
}) {
    const [useFallback, setUseFallback] = useState(false);

    const localImage = localImages[id];
    const fallbackImage = placeholderImages[id] || `https://picsum.photos/seed/${id}/600/400`;
    const imageSrc = localImage && !useFallback ? localImage : fallbackImage;

    const sizeClasses = {
        small: "h-32",
        medium: "h-48",
        large: "h-64",
    };

    return (
        <div
            className={`relative w-full ${sizeClasses[size]} overflow-hidden rounded-xl`}
            data-placeholder-id={id}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={imageSrc}
                alt={label || `Gallery ${id}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={() => setUseFallback(true)}
            />
        </div>
    );
}
