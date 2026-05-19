"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ShieldCheck, Sparkles, RefreshCw, Layers } from "lucide-react";

// Mock Product with Story Details
const mockProduct = {
  name: "Aurelia Double-Welt Oxford",
  slug: "aurelia-double-welt-oxford",
  price: "$950.00",
  category: "Footwear",
  image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
  description:
    "A sleek, wholecut oxford shoe featuring a traditional double Goodyear welt, hand-burnished crust leather, and solid brass detailing.",
  stories: {
    craftsmanship:
      "Crafted by hand using a single piece of flawless crust leather. Hand-sewn double welt stitches attach the leather sole to the welt and upper, ensuring standard water resistance and maximum rebuildable longevity. Patinated over 4 hours in our London workshop.",
    material:
      "Select French calf hides, tanned using organic mimosa and chestnut extracts (vegetable tanning). Full-grain skin that retains natural grains, allowing breathing and creating an exquisite, dark caramel patina over the years.",
    care:
      "Brush away loose dirt with horsehair brushes. Clean monthly using organic milk cleansers. Apply our beeswax patinating creams, wait 10 minutes, and polish with microfiber cloths. Avoid synthetic silicon sprays.",
    restoration:
      "This product is covered by our lifetime aftercare program. Re-soling, edge recoloring, and lining fixes can be scheduled through The Shoe Clinic. We guarantee this shoe can be fully rebuilt up to 5 times over its lifespan.",
  },
};

export default function ProductDetail() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<"craftsmanship" | "material" | "care" | "restoration">("craftsmanship");

  const tabContent = {
    craftsmanship: {
      text: mockProduct.stories.craftsmanship,
      icon: Sparkles,
      title: "Atelier Hand-Crafting",
    },
    material: {
      text: mockProduct.stories.material,
      icon: Layers,
      title: "Vegetable Tanned Leather",
    },
    care: {
      text: mockProduct.stories.care,
      icon: ShieldCheck,
      title: "Leather Maintenance Guide",
    },
    restoration: {
      text: mockProduct.stories.restoration,
      icon: RefreshCw,
      title: "Shoe Clinic Lifetime Support",
    },
  };

  const ActiveIcon = tabContent[activeTab].icon;

  return (
    <div className="bg-luxury-black text-luxury-ivory font-sans py-16 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Product Top Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
        {/* Product Image */}
        <div className="overflow-hidden border border-white/5 relative aspect-[3/4]">
          <img
            src={mockProduct.image}
            alt={mockProduct.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details & Purchase */}
        <div className="flex flex-col space-y-8 lg:sticky lg:top-32">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
              {mockProduct.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-luxury-ivory mt-3">
              {mockProduct.name}
            </h1>
            <p className="text-2xl font-sans text-luxury-gold mt-4 font-light">
              {mockProduct.price}
            </p>
          </div>

          <p className="text-xs text-luxury-ivory/60 leading-relaxed font-light">
            {mockProduct.description}
          </p>

          <hr className="border-white/5" />

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-5">
            <Button variant="primary" className="flex-grow py-5">
              Add to Bag
            </Button>
            <Button variant="gold" href="/clinic#book" className="flex-grow py-5">
              Request Restoration Check
            </Button>
          </div>

          <div className="flex items-center gap-3 text-[10px] tracking-wider text-luxury-ivory/40 uppercase">
            <ShieldCheck className="w-4 h-4 text-luxury-gold" />
            <span>Includes Lifetime Shoe Clinic Aftercare Support</span>
          </div>
        </div>
      </div>

      {/* 2. PRODUCT STORY MODULE (TABS) */}
      <section className="py-16 border-t border-white/5">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
            Heritage Narrative
          </span>
          <h2 className="text-3xl font-serif mt-3 text-luxury-ivory">
            The Product Story Module
          </h2>
          <p className="font-sans text-xs text-luxury-ivory/50 mt-4 leading-relaxed">
            Luxury items are investments. Explore the origin, premium materials, daily upkeep, and lifelong restoration path of this item.
          </p>
        </div>

        {/* Tabs Bar */}
        <div className="flex justify-center flex-wrap gap-4 md:gap-8 border-b border-white/5 pb-6 mb-12">
          {(["craftsmanship", "material", "care", "restoration"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-sans text-xs uppercase tracking-widest pb-2 px-1 relative transition-colors ${
                activeTab === tab ? "text-luxury-accent font-semibold" : "text-luxury-ivory/40 hover:text-luxury-ivory/70"
              }`}
            >
              {tab === "care" ? "Care Guide" : tab === "restoration" ? "Restoration" : tab}
              {activeTab === tab && (
                <motion.span
                  layoutId="activeStoryTabLine"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-luxury-accent"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tabs Content Panel */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8 md:p-12 max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-start border border-white/5 hover:border-luxury-gold/5"
        >
          <div className="p-4 bg-white/5 border border-white/10 rounded-full shrink-0">
            <ActiveIcon className="w-6 h-6 text-luxury-gold" />
          </div>
          <div>
            <h3 className="font-serif text-xl text-luxury-ivory mb-4">
              {tabContent[activeTab].title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-luxury-ivory/60 leading-relaxed font-light">
              {tabContent[activeTab].text}
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
