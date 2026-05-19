"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Luxury Footwear",
    slug: "footwear",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
    desc: "Handcrafted oxfords, boots, and loafers patinated to perfection.",
  },
  {
    name: "Women’s Leather Bags",
    slug: "bags",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    desc: "Architectural shapes, soft top grain leathers, and custom hardware.",
  },
  {
    name: "Small Leather Goods",
    slug: "wallets",
    image: "https://images.unsplash.com/photo-1627124765135-567b364e59c6?q=80&w=800&auto=format&fit=crop",
    desc: "Minimalist wallets, key holders, and passport sleeves.",
  },
  {
    name: "Signature Essentials",
    slug: "essentials",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
    desc: "Care creams, premium brushes, and custom leather accents.",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-32 px-6 md:px-12 bg-luxury-black max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
            E-Commerce Atelier
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mt-3 text-luxury-ivory">
            Featured Collections
          </h2>
        </div>
        <Link
          href="/collections"
          className="text-xs uppercase tracking-widest text-luxury-gold hover:text-luxury-ivory transition-colors mt-4 md:mt-0 font-sans border-b border-luxury-gold/30 hover:border-luxury-ivory/50 pb-1"
        >
          View All Collections
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className="flex flex-col group cursor-pointer"
          >
            {/* Image Container */}
            <div className="overflow-hidden border border-white/5 relative aspect-[3/4] mb-6">
              {/* Overlay */}
              <div className="absolute inset-0 bg-luxury-black/30 group-hover:bg-luxury-black/10 transition-colors duration-700 z-10" />
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
            </div>

            {/* Typography */}
            <h3 className="font-serif text-lg text-luxury-ivory group-hover:text-luxury-gold transition-colors duration-300">
              {cat.name}
            </h3>
            <p className="font-sans text-xs text-luxury-ivory/50 mt-2 leading-relaxed">
              {cat.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
