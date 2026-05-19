import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LIORÉ COUTURE | Handcrafted Luxury Leather & Care Atelier",
  description:
    "Discover handcrafted premium leather goods designed for generations. Supported by The Shoe Clinic - professional leather restoration, cleaning, and custom aftercare services.",
  keywords: [
    "luxury leather",
    "leather restoration",
    "handcrafted bags",
    "shoe cleaning",
    "sole replacement",
    "premium care",
    "London atelier",
  ],
  openGraph: {
    title: "LIORÉ COUTURE | Handcrafted Luxury Leather",
    description: "Premium handcrafted leather goods supported by restoration craftsmanship.",
    url: "https://liore-couture.com",
    siteName: "LIORÉ COUTURE",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-luxury-black text-luxury-ivory min-h-screen flex flex-col justify-between overflow-x-hidden antialiased">
        <Header />
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
