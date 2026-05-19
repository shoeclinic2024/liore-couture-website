"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ShieldCheck, Plus, CheckCircle, PackageOpen, Award, Sliders, ClipboardList, Layers } from "lucide-react";

// Mock Restoration Jobs for Admin Panel
const mockJobs = [
  { id: "JOB-73569", client: "Vikram Nair", item: "Berluti Wholecut Oxford", stage: 5, status: "Pending Quote Approval" },
  { id: "JOB-90210", client: "Sara Khan", item: "Hermès Birkin Bag", stage: 6, status: "Restoration in Progress" },
  { id: "JOB-48203", client: "John Doe", item: "Santoni Double Monkstrap", stage: 3, status: "Item Received" },
];

const mockProducts = [
  { name: "Aurelia Double-Welt Oxford", price: "$950.00", category: "Footwear" },
  { name: "Atelier Leather Satchel Bag", price: "$1,850.00", category: "Women's Bags" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"restorations" | "catalog">("restorations");
  const [jobs, setJobs] = useState(mockJobs);
  const [productsList, setProductsList] = useState(mockProducts);
  
  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Footwear",
    image: "",
    craftsmanship_story: "",
    material_story: "",
    care_guide: "",
    restoration_support: "",
  });

  const [productAdded, setProductAdded] = useState(false);

  // Update restoration request stage
  const handleStageChange = (jobId: string, newStage: number) => {
    setJobs(
      jobs.map((job) => {
        if (job.id === jobId) {
          const statusList = [
            "Request Submitted",
            "Pickup Scheduled",
            "Item Received",
            "Inspection",
            "Quotation Approval",
            "Restoration In Progress",
            "Quality Check",
            "Completed",
            "Delivery",
          ];
          return { ...job, stage: newStage, status: statusList[newStage - 1] };
        }
        return job;
      })
    );
  };

  // Add product submission handler
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setProductsList([...productsList, { name: newProduct.name, price: newProduct.price, category: newProduct.category }]);
    setProductAdded(true);
    setTimeout(() => {
      setProductAdded(false);
      setNewProduct({
        name: "",
        price: "",
        category: "Footwear",
        image: "",
        craftsmanship_story: "",
        material_story: "",
        care_guide: "",
        restoration_support: "",
      });
    }, 2000);
  };

  return (
    <div className="bg-luxury-black text-luxury-ivory font-sans min-h-screen py-16 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Lioré Administration Panel
          </span>
          <h1 className="text-3xl md:text-5xl font-serif mt-3 text-luxury-ivory">
            Atelier Management
          </h1>
        </div>
        
        {/* Toggle between tabs */}
        <div className="flex gap-2 border border-white/5 p-1 bg-luxury-charcoal">
          <button
            onClick={() => setActiveTab("restorations")}
            className={`font-sans text-[10px] uppercase tracking-widest px-4 py-2.5 transition-all ${
              activeTab === "restorations" ? "bg-luxury-gold text-luxury-black font-semibold" : "text-luxury-ivory/60 hover:text-luxury-ivory"
            }`}
          >
            Restoration Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab("catalog")}
            className={`font-sans text-[10px] uppercase tracking-widest px-4 py-2.5 transition-all ${
              activeTab === "catalog" ? "bg-luxury-gold text-luxury-black font-semibold" : "text-luxury-ivory/60 hover:text-luxury-ivory"
            }`}
          >
            Product Story Catalog ({productsList.length})
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass-panel p-6 border border-white/5">
          <span className="font-sans text-[9px] uppercase tracking-wider text-luxury-ivory/40">Active Restorations</span>
          <h3 className="font-serif text-3xl text-luxury-gold mt-2">09</h3>
        </div>
        <div className="glass-panel p-6 border border-white/5">
          <span className="font-sans text-[9px] uppercase tracking-wider text-luxury-ivory/40">Pending Quotes</span>
          <h3 className="font-serif text-3xl text-luxury-gold mt-2">03</h3>
        </div>
        <div className="glass-panel p-6 border border-white/5">
          <span className="font-sans text-[9px] uppercase tracking-wider text-luxury-ivory/40">In Progress</span>
          <h3 className="font-serif text-3xl text-luxury-gold mt-2">04</h3>
        </div>
        <div className="glass-panel p-6 border border-white/5">
          <span className="font-sans text-[9px] uppercase tracking-wider text-luxury-ivory/40">Catalog Products</span>
          <h3 className="font-serif text-3xl text-luxury-gold mt-2">{productsList.length}</h3>
        </div>
      </div>

      {/* Tab Contents: Restoration Jobs */}
      {activeTab === "restorations" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 border border-white/5"
        >
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
            <ClipboardList className="w-5 h-5 text-luxury-gold" />
            <h2 className="font-serif text-xl text-luxury-ivory">Restoration Jobs Status Dashboard</h2>
          </div>

          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-6 border border-white/5 bg-luxury-black flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-luxury-gold font-bold">{job.id}</span>
                    <span className="font-serif text-sm text-luxury-ivory">{job.item}</span>
                  </div>
                  <p className="font-sans text-[11px] text-luxury-ivory/50 mt-1">
                    Client: {job.client} | Current Stage: <span className="text-luxury-gold font-semibold">Stage 0{job.stage} ({job.status})</span>
                  </p>
                </div>

                {/* Dropdown status update */}
                <div className="flex items-center gap-3 flex-wrap">
                  <label className="font-sans text-[10px] uppercase tracking-widest text-luxury-ivory/40">Change Stage:</label>
                  <select
                    value={job.stage}
                    onChange={(e) => handleStageChange(job.id, Number(e.target.value))}
                    className="bg-luxury-charcoal border border-white/10 p-2.5 text-xs text-luxury-ivory outline-none focus:border-luxury-gold"
                  >
                    <option value={1}>Stage 1: Submitted</option>
                    <option value={2}>Stage 2: Pickup Scheduled</option>
                    <option value={3}>Stage 3: Item Received</option>
                    <option value={4}>Stage 4: Inspection</option>
                    <option value={5}>Stage 5: Quote Approval</option>
                    <option value={6}>Stage 6: In Progress</option>
                    <option value={7}>Stage 7: Quality Check</option>
                    <option value={8}>Stage 8: Completed</option>
                    <option value={9}>Stage 9: Delivery</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tab Contents: Catalog Manager with Product Story Module */}
      {activeTab === "catalog" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Add Product Form */}
          <div className="lg:col-span-2 glass-panel p-8 border border-white/5">
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <Plus className="w-5 h-5 text-luxury-gold" />
              <h2 className="font-serif text-xl text-luxury-ivory">Add Premium Product with Stories</h2>
            </div>

            {productAdded ? (
              <div className="text-center py-12 text-luxury-gold">
                <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-serif text-lg">Product Story Module Saved Successfully</h3>
              </div>
            ) : (
              <form onSubmit={handleAddProduct} className="space-y-6 text-xs text-luxury-ivory/70">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <label className="uppercase tracking-widest text-luxury-ivory/50">Product Name</label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="bg-white/5 border border-white/10 p-3.5 text-luxury-ivory outline-none focus:border-luxury-gold"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="uppercase tracking-widest text-luxury-ivory/50">Price (e.g. $950.00)</label>
                    <input
                      type="text"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="bg-white/5 border border-white/10 p-3.5 text-luxury-ivory outline-none focus:border-luxury-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <label className="uppercase tracking-widest text-luxury-ivory/50">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="bg-luxury-black border border-white/10 p-3.5 text-luxury-ivory outline-none focus:border-luxury-gold"
                    >
                      <option value="Footwear">Luxury Footwear</option>
                      <option value="Women's Bags">Women's Bags</option>
                      <option value="Small Goods">Small Goods</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="uppercase tracking-widest text-luxury-ivory/50">Image URL</label>
                    <input
                      type="text"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="bg-white/5 border border-white/10 p-3.5 text-luxury-ivory outline-none focus:border-luxury-gold"
                    />
                  </div>
                </div>

                <hr className="border-white/5 my-4" />
                <h3 className="font-serif text-sm text-luxury-gold uppercase tracking-widest">Product Story Module Details</h3>

                <div className="flex flex-col space-y-2">
                  <label className="uppercase tracking-widest text-luxury-ivory/50">Craftsmanship Story (Atelier hand-crafting process)</label>
                  <textarea
                    rows={3}
                    value={newProduct.craftsmanship_story}
                    onChange={(e) => setNewProduct({ ...newProduct, craftsmanship_story: e.target.value })}
                    placeholder="Describe how the item was cut, sewn, or custom patinated..."
                    className="bg-white/5 border border-white/10 p-3.5 text-luxury-ivory outline-none focus:border-luxury-gold resize-none"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="uppercase tracking-widest text-luxury-ivory/50">Material Story (Leather selection details)</label>
                  <textarea
                    rows={3}
                    value={newProduct.material_story}
                    onChange={(e) => setNewProduct({ ...newProduct, material_story: e.target.value })}
                    placeholder="E.g., Organic vegetable-tanned French calfskin hides..."
                    className="bg-white/5 border border-white/10 p-3.5 text-luxury-ivory outline-none focus:border-luxury-gold resize-none"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="uppercase tracking-widest text-luxury-ivory/50">Daily Care Guide</label>
                  <textarea
                    rows={3}
                    value={newProduct.care_guide}
                    onChange={(e) => setNewProduct({ ...newProduct, care_guide: e.target.value })}
                    placeholder="Brushing, milk cleansing, conditioning schedule..."
                    className="bg-white/5 border border-white/10 p-3.5 text-luxury-ivory outline-none focus:border-luxury-gold resize-none"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="uppercase tracking-widest text-luxury-ivory/50">Restoration & Aftercare Support</label>
                  <textarea
                    rows={3}
                    value={newProduct.restoration_support}
                    onChange={(e) => setNewProduct({ ...newProduct, restoration_support: e.target.value })}
                    placeholder="Lifespan resoling limits, free edge-reinking coverage..."
                    className="bg-white/5 border border-white/10 p-3.5 text-luxury-ivory outline-none focus:border-luxury-gold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-luxury-gold text-luxury-black font-semibold py-4 uppercase tracking-widest text-xs hover:bg-luxury-accent transition-colors"
                >
                  Save Product Stories
                </button>
              </form>
            )}
          </div>

          {/* Current Catalog List */}
          <div className="glass-panel p-8 border border-white/5 flex flex-col space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Layers className="w-5 h-5 text-luxury-gold" />
              <h2 className="font-serif text-xl text-luxury-ivory">Catalog Items</h2>
            </div>
            
            <div className="space-y-4">
              {productsList.map((prod) => (
                <div key={prod.name} className="p-4 border border-white/5 bg-luxury-black/40">
                  <h4 className="font-serif text-sm text-luxury-ivory">{prod.name}</h4>
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-luxury-gold mt-2">
                    <span>{prod.category}</span>
                    <span className="font-bold">{prod.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
