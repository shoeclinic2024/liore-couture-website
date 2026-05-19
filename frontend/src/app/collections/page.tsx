"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const products = [
  {
    name: "Aurelia Double-Welt Oxford",
    slug: "aurelia-double-welt-oxford",
    price: "$950.00",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500&auto=format&fit=crop",
    category: "Footwear",
  },
  {
    name: "Classic Suede Chelsea Boot",
    slug: "classic-suede-chelsea-boot",
    price: "$1,100.00",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=500&auto=format&fit=crop",
    category: "Footwear",
  },
  {
    name: "Atelier Leather Satchel Bag",
    slug: "atelier-leather-satchel-bag",
    price: "$1,850.00",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500&auto=format&fit=crop",
    category: "Women's Bags",
  },
  {
    name: "Patina Full-Grain Cardholder",
    slug: "patina-full-grain-cardholder",
    price: "$220.00",
    image: "https://images.unsplash.com/photo-1627124765135-567b364e59c6?q=80&w=500&auto=format&fit=crop",
    category: "Small Goods",
  },
];

export default function Collections() {
  return (
    <div className="bg-luxury-black text-luxury-ivory font-sans py-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
          Lioré Collections
        </span>
        <h1 className="text-4xl md:text-6xl font-serif text-luxury-ivory mt-4">
          Atelier Leather Goods
        </h1>
        <p className="font-sans text-xs text-luxury-ivory/60 mt-4 leading-relaxed">
          Each piece is cut, molded, and hand-finished in our atelier. Designed to develop a unique patina and outlast generations.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((prod, idx) => (
          <motion.div
            key={prod.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="flex flex-col group cursor-pointer"
          >
            <Link href={`/collections/${prod.slug}`} className="flex flex-col h-full justify-between">
              <div>
                <div className="overflow-hidden border border-white/5 relative aspect-[3/4] mb-6">
                  <div className="absolute inset-0 bg-luxury-black/10 group-hover:bg-luxury-black/0 transition-colors duration-500 z-10" />
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="object-cover w-full h-full transform group-hover:scale-102 transition-transform duration-[1.2s] ease-out"
                  />
                </div>
                <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-luxury-gold">
                  {prod.category}
                </span>
                <h3 className="font-serif text-base text-luxury-ivory group-hover:text-luxury-gold transition-colors duration-300 mt-2">
                  {prod.name}
                </h3>
              </div>
              <p className="font-sans text-xs text-luxury-ivory/70 mt-3 font-semibold">
                {prod.price}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
