"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import FeaturedCollections from "@/components/ecommerce/FeaturedCollections";
import ServiceGrid from "@/components/clinic/ServiceGrid";
import ProcessTracker from "@/components/clinic/ProcessTracker";
import { ArrowRight, ShieldCheck, Award, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-luxury-black text-luxury-ivory overflow-x-hidden font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=1600&auto=format&fit=crop"
            alt="Leather Crafting Background"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-6 md:px-12 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-2 mb-6 border border-luxury-gold/25 px-4 py-1.5 rounded-full bg-luxury-gold/5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
            <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-luxury-gold">
              Dual Identity Atelier
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-8xl font-serif font-light tracking-tight leading-[1.1] mb-6"
          >
            Crafted for <br />
            <span className="italic font-normal text-luxury-gold">Generations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-xs sm:text-sm md:text-base text-luxury-ivory/70 max-w-2xl font-light leading-relaxed tracking-wide mb-12"
          >
            Handcrafted luxury leather goods supported by professional restoration expertise and timeless design philosophy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
          >
            <Button variant="primary" href="/collections" className="w-full sm:w-56">
              Shop Collection
            </Button>
            <Button variant="gold" href="/clinic" className="w-full sm:w-56">
              Discover The Shoe Clinic
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTIONS SECTION */}
      <FeaturedCollections />

      {/* 3. CRAFTSMANSHIP SECTION */}
      <section className="py-32 px-6 md:px-12 bg-luxury-charcoal border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="overflow-hidden border border-white/5 relative aspect-square max-w-lg lg:max-w-none"
          >
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop"
              alt="Artisan Craftsmanship"
              className="object-cover w-full h-full"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
              Handcrafted Atelier
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-ivory leading-tight">
              Crafted by Hand. <br />Refined by Time.
            </h2>
            <p className="font-sans text-xs text-luxury-ivory/60 leading-relaxed">
              Every piece is handcrafted using carefully selected full grain and premium top grain leather. Crafted in small batches to preserve details, each seam, edge, and patina is treated as unique.
            </p>
            <p className="font-sans text-xs text-luxury-ivory/60 leading-relaxed">
              Designed not only to be worn, but to be restored, conditioned, and preserved through time. When you buy our leather, you inherit the lifetime backing of our service division.
            </p>
            <div className="pt-6">
              <Button variant="secondary" href="/about">
                Read Brand Story
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. THE SHOE CLINIC FEATURE SECTION */}
      <ServiceGrid />

      {/* 5. WORKFLOW TRACKER */}
      <ProcessTracker />

      {/* 6. RESTORATION PHILOSOPHY & BRAND STORY */}
      <section className="py-32 px-6 md:px-12 bg-luxury-black relative overflow-hidden">
        {/* Glow element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-luxury-brown/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-20 relative z-10">
          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
              Restoration Philosophy
            </span>
            <h3 className="text-3xl md:text-5xl font-serif text-luxury-ivory">
              Luxury Should Never Be Disposable
            </h3>
            <p className="font-sans text-xs sm:text-sm text-luxury-ivory/70 max-w-2xl mx-auto leading-relaxed italic">
              "Years spent restoring heritage leather goods taught us a simple belief: True craftsmanship deserves longevity. That philosophy shapes both our products and our restoration services."
            </p>
          </motion.div>

          <hr className="w-16 mx-auto border-white/10" />

          {/* Brand Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
              Origin Narrative
            </span>
            <h3 className="text-3xl md:text-5xl font-serif text-luxury-ivory">
              From Restoration to Future Heritage
            </h3>
            <p className="font-sans text-xs text-luxury-ivory/60 max-w-2xl mx-auto leading-relaxed">
              What began through years of leather restoration evolved into a commitment to creating handcrafted leather goods designed to outlive trends and time. We combine old-world techniques with an aftercare division built for modern lifetimes.
            </p>
            <div className="pt-6">
              <Button variant="gold" href="/clinic#book" className="w-full sm:w-64">
                Book Restoration Service
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
