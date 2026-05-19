"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldAlert, Award, RefreshCw } from "lucide-react";

const services = [
  {
    name: "Luxury Shoe Restoration",
    desc: "Complete rebuild of fine footwear, addressing welt, lining, and upper structural damages.",
    icon: Award,
  },
  {
    name: "Leather Recoloring",
    desc: "Expert pigment matching and airbrush coating to revive faded hues or completely change colors.",
    icon: Sparkles,
  },
  {
    name: "Sole Replacement",
    desc: "Full leather or Vibram resoling using traditional Goodyear welted or Blake stitched methods.",
    icon: RefreshCw,
  },
  {
    name: "Premium Cleaning & Care",
    desc: "Delicate chemical-free deep cleanse followed by deep nourishment using natural organic creams.",
    icon: ShieldAlert,
  },
  {
    name: "Bag & Goods Repair",
    desc: "Edge refinishing, structural restoration, and meticulous hardware replacements for designer handbags.",
    icon: Award,
  },
  {
    name: "Sneaker Restoration",
    desc: "Sole un-yellowing, deep scrubbing, stitching repair, and protective nano-coatings.",
    icon: Sparkles,
  },
];

export default function ServiceGrid() {
  return (
    <section className="py-24 bg-luxury-charcoal/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
            Restoration Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mt-3 text-luxury-ivory">
            The Shoe Clinic Services
          </h2>
          <p className="font-sans text-xs text-luxury-ivory/60 mt-4 leading-relaxed">
            Professional restoration and leather care services designed to preserve structural craftsmanship and elevate longevity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-panel p-8 flex flex-col items-start hover:border-luxury-gold/30 transition-all duration-500 group"
              >
                <div className="p-3 bg-white/5 border border-white/10 group-hover:border-luxury-gold/20 mb-6 transition-colors">
                  <Icon className="w-5 h-5 text-luxury-gold" />
                </div>
                <h3 className="font-serif text-lg text-luxury-ivory mb-3 group-hover:text-luxury-gold transition-colors duration-300">
                  {srv.name}
                </h3>
                <p className="font-sans text-xs text-luxury-ivory/50 leading-relaxed">
                  {srv.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
