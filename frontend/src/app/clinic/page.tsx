"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import ProcessTracker from "@/components/clinic/ProcessTracker";
import { Check, ClipboardList, Info, HelpCircle, PhoneCall } from "lucide-react";

const beforeAfterPairs = [
  {
    title: "Heritage Oxford Resoling & Patina",
    before: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600&auto=format&fit=crop",
    desc: "Scuffed leather rebuilt with fresh oak bark tanned leather soles and hand-painted dye.",
  },
  {
    title: "Designer Suede Bag Cleaning & Edge Coating",
    before: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop",
    desc: "Cleaned stains, recolored handles, and sealed cracked edge paint with organic lacquer.",
  },
];

const clinicServices = {
  footwear: [
    "Luxury shoe cleaning",
    "Sole replacement (Goodyear/Blake)",
    "Color restoration & customized patina",
    "Premium waxing & polishing",
    "Structural upper lining repair",
    "Premium sneaker cleaning & un-yellowing",
  ],
  bags: [
    "Designer handbag restoration",
    "Hand-painted edge refinishing",
    "Deep leather nourishment & conditioning",
    "Internal lining replacement",
    "Premium hardware replacement & plating",
    "Faded color revival & redyeing",
  ],
};

export default function ShoeClinic() {
  const [selectedPair, setSelectedPair] = useState(0);
  const [showAfter, setShowAfter] = useState(true);

  // Booking form state
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    itemType: "Footwear",
    brand: "",
    description: "",
    pickupRequired: "yes",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-luxury-black text-luxury-ivory font-sans">
      {/* 1. HERO BANNER */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1600&auto=format&fit=crop"
            alt="Restoration Tools"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/70 to-transparent" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
            The Shoe Clinic Division
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-luxury-ivory mt-4">
            Restoring Craftsmanship
          </h1>
          <p className="font-sans text-xs md:text-sm text-luxury-ivory/60 mt-4 max-w-xl mx-auto leading-relaxed">
            Luxury restoration and leather care services designed to extend the lifetime of exceptional leather products.
          </p>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Footwear Services */}
        <div className="glass-panel p-8 md:p-12 border border-white/5 flex flex-col space-y-8">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-gold">
            Category 01
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-luxury-ivory">
            Footwear Care & Resoling
          </h2>
          <ul className="space-y-4">
            {clinicServices.footwear.map((svc) => (
              <li key={svc} className="flex items-start gap-3 text-xs text-luxury-ivory/70">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span>{svc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bags & Leather Goods */}
        <div className="glass-panel p-8 md:p-12 border border-white/5 flex flex-col space-y-8">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-gold">
            Category 02
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-luxury-ivory">
            Bags & Leather Goods
          </h2>
          <ul className="space-y-4">
            {clinicServices.bags.map((svc) => (
              <li key={svc} className="flex items-start gap-3 text-xs text-luxury-ivory/70">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span>{svc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. BEFORE / AFTER GALLERY */}
      <section className="py-24 bg-luxury-charcoal/30 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
            Restoration Gallery
          </span>
          <h2 className="text-3xl font-serif text-luxury-ivory mt-3 mb-12">
            Visual Proof of Artisanship
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Visual Interactive View */}
            <div className="flex flex-col space-y-6">
              <div className="overflow-hidden border border-white/5 aspect-[4/3] relative">
                <img
                  src={showAfter ? beforeAfterPairs[selectedPair].after : beforeAfterPairs[selectedPair].before}
                  alt={beforeAfterPairs[selectedPair].title}
                  className="w-full h-full object-cover transition-all duration-75"
                />
                <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                  <button
                    onClick={() => setShowAfter(false)}
                    className={`px-3 py-1.5 text-[9px] uppercase tracking-widest border transition-all ${
                      !showAfter ? "bg-luxury-ivory text-luxury-black border-luxury-ivory" : "bg-luxury-black/80 border-white/10 text-luxury-ivory/60"
                    }`}
                  >
                    Before
                  </button>
                  <button
                    onClick={() => setShowAfter(true)}
                    className={`px-3 py-1.5 text-[9px] uppercase tracking-widest border transition-all ${
                      showAfter ? "bg-luxury-ivory text-luxury-black border-luxury-ivory" : "bg-luxury-black/80 border-white/10 text-luxury-ivory/60"
                    }`}
                  >
                    After
                  </button>
                </div>
              </div>
              <p className="font-sans text-xs text-luxury-ivory/50 leading-relaxed text-left">
                {beforeAfterPairs[selectedPair].desc}
              </p>
            </div>

            {/* List Selection */}
            <div className="flex flex-col space-y-4 text-left">
              {beforeAfterPairs.map((pair, idx) => (
                <button
                  key={pair.title}
                  onClick={() => {
                    setSelectedPair(idx);
                    setShowAfter(true);
                  }}
                  className={`p-6 border text-left transition-all flex flex-col space-y-2 ${
                    selectedPair === idx
                      ? "border-luxury-gold bg-luxury-gold/5"
                      : "border-white/5 hover:border-white/10 bg-transparent"
                  }`}
                >
                  <span className="font-serif text-sm text-luxury-ivory">{pair.title}</span>
                  <span className="font-sans text-[10px] text-luxury-gold uppercase tracking-wider">
                    Restoration Showcase {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROCESS TIMELINE */}
      <ProcessTracker />

      {/* 5. BOOKING SYSTEM */}
      <section id="book" className="py-24 max-w-3xl mx-auto px-6">
        <div className="glass-panel p-8 md:p-12 border border-white/5">
          <div className="text-center mb-12">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
              Client Portal
            </span>
            <h2 className="text-3xl font-serif text-luxury-ivory mt-3">
              Request Restoration Service
            </h2>
            <p className="font-sans text-xs text-luxury-ivory/50 mt-3 leading-relaxed">
              Fill in details about your leather item. We will schedule a courier pickup, complete structural inspection, and issue a digital quote.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs text-luxury-ivory/80 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="uppercase tracking-widest text-luxury-ivory/60">Full Name</label>
                  <input
                    type="text"
                    required
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border border-white/10 p-4 outline-none focus:border-luxury-gold text-luxury-ivory"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="uppercase tracking-widest text-luxury-ivory/60">Email Address</label>
                  <input
                    type="email"
                    required
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border border-white/10 p-4 outline-none focus:border-luxury-gold text-luxury-ivory"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="itemType" className="uppercase tracking-widest text-luxury-ivory/60">Item Type</label>
                  <select
                    id="itemType"
                    value={formData.itemType}
                    onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
                    className="bg-luxury-black border border-white/10 p-4 outline-none focus:border-luxury-gold text-luxury-ivory"
                  >
                    <option value="Footwear">Luxury Footwear</option>
                    <option value="Bags">Bags & Leather Goods</option>
                    <option value="SmallGoods">Wallets & Accessories</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="brand" className="uppercase tracking-widest text-luxury-ivory/60">Brand (e.g. Berluti, Polène)</label>
                  <input
                    type="text"
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="bg-white/5 border border-white/10 p-4 outline-none focus:border-luxury-gold text-luxury-ivory"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="description" className="uppercase tracking-widest text-luxury-ivory/60">Describe Damage & Requested Services</label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Scuffed heels, cracked edges, missing buckle, deep stains..."
                  className="bg-white/5 border border-white/10 p-4 outline-none focus:border-luxury-gold text-luxury-ivory resize-none"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="uppercase tracking-widest text-luxury-ivory/60">Schedule Courier Pickup?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="pickup"
                      value="yes"
                      checked={formData.pickupRequired === "yes"}
                      onChange={() => setFormData({ ...formData, pickupRequired: "yes" })}
                      className="accent-luxury-gold"
                    />
                    <span>Yes, schedule courier pickup</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="pickup"
                      value="no"
                      checked={formData.pickupRequired === "no"}
                      onChange={() => setFormData({ ...formData, pickupRequired: "no" })}
                      className="accent-luxury-gold"
                    />
                    <span>No, drop off at Atelier myself</span>
                  </label>
                </div>
              </div>

              {formData.pickupRequired === "yes" && (
                <div className="flex flex-col space-y-2">
                  <label htmlFor="address" className="uppercase tracking-widest text-luxury-ivory/60">Pickup Address</label>
                  <input
                    type="text"
                    required
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="bg-white/5 border border-white/10 p-4 outline-none focus:border-luxury-gold text-luxury-ivory"
                  />
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-luxury-gold text-luxury-black font-sans text-xs uppercase tracking-widest font-semibold py-4 hover:bg-luxury-accent transition-colors"
                >
                  Submit Booking Request
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center space-y-6"
            >
              <div className="w-16 h-16 bg-luxury-gold/10 border border-luxury-gold/30 rounded-full flex items-center justify-center text-luxury-gold mb-2">
                <ClipboardList className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-luxury-ivory">Request Successfully Submitted</h3>
              <p className="font-sans text-xs text-luxury-ivory/60 max-w-sm leading-relaxed">
                Thank you, {formData.name}. We have registered your request. An email contains your active restoration Job ID. A courier team member will contact you to finalize pickup.
              </p>
              <div className="pt-4 flex gap-4">
                <Button variant="secondary" onClick={() => setSubmitted(false)}>Submit Another Request</Button>
                <Button variant="gold" href="https://wa.me/442079460192">
                  <PhoneCall className="w-3.5 h-3.5 mr-2 inline" /> WhatsApp Support
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
