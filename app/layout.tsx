import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hydara | Premium Business Conglomerate in The Gambia",
  description: "Hydara - A premier business conglomerate in The Gambia. From foam manufacturing to real estate, travel services to electronics. Experience excellence at Hydara Plaza, Serekunda.",
  keywords: ["Hydara", "Hydara Plaza", "Hydara Foam", "Gambia Business", "Serekunda", "Samsung Gambia", "Amana Travel", "Building Materials Gambia"],
  authors: [{ name: "Hydara Family Enterprises" }],
  openGraph: {
    title: "Hydara | Premium Business Conglomerate",
    description: "Experience the excellence of Hydara - Manufacturing, Retail, Travel, and Real Estate in The Gambia",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

