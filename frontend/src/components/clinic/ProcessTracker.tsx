"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Clipboard, Search, CheckCircle, PackageOpen, Award, Check } from "lucide-react";

const steps = [
  { id: 1, label: "Request Submitted", icon: Clipboard, desc: "Submit details and images of your leather item online." },
  { id: 2, label: "Pickup Scheduled", icon: Truck, desc: "Secure courier scheduled to safely transport your item." },
  { id: 3, label: "Item Received", icon: PackageOpen, desc: "Item catalogued and carefully stored at our atelier." },
  { id: 4, label: "Inspection", icon: Search, desc: "Artisans assess structure, damage, and leather grain." },
  { id: 5, label: "Quotation Approval", icon: ShieldCheck, desc: "Review detailed inspection report and cost quote." },
  { id: 6, label: "Restoration In Progress", icon: Award, desc: "Meticulous deep-care, structural repair, and paint matching." },
  { id: 7, label: "Quality Check", icon: ShieldCheck, desc: "Multi-point inspection verifying strength and aesthetic finish." },
  { id: 8, label: "Completed", icon: CheckCircle, desc: "Final patination applied. Item packed in signature boxes." },
  { id: 9, label: "Delivery", icon: Truck, desc: "Item dispatched back. Tracking link sent to client." },
];

export default function ProcessTracker() {
  const [activeStep, setActiveStep] = useState(5); // Default to "Quotation Approval" for demonstration

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-luxury-black">
      <div className="flex flex-col md:flex-row justify-between items-start mb-20">
        <div className="max-w-xl">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
            Restoration Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mt-3 text-luxury-ivory">
            The Restoration Workflow
          </h2>
          <p className="font-sans text-xs text-luxury-ivory/50 mt-4 leading-relaxed">
            Follow the lifecycle of your item from submission to delivery. Total transparency, premium craft.
          </p>
        </div>
        <div className="mt-6 md:mt-0 flex gap-3 flex-wrap">
          {[1, 3, 5, 8, 9].map((stepId) => (
            <button
              key={stepId}
              onClick={() => setActiveStep(stepId)}
              className={`font-sans text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-all duration-300 ${
                activeStep === stepId
                  ? "border-luxury-gold text-luxury-gold bg-luxury-gold/5"
                  : "border-white/10 text-luxury-ivory/40 hover:border-white/30"
              }`}
            >
              Demo Stage {stepId}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative flex flex-col md:flex-row justify-between items-center w-full gap-8 md:gap-0 mt-8">
        {/* Background connector line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 hidden md:block z-0" />
        
        {/* Active connector line */}
        <motion.div
          className="absolute top-1/2 left-0 h-[1px] bg-luxury-gold -translate-y-1/2 hidden md:block z-0 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (activeStep - 1) / (steps.length - 1) }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ width: "100%" }}
        />

        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = step.id < activeStep;
          const isActive = step.id === activeStep;
          
          return (
            <div key={step.id} className="flex flex-col items-center relative z-10 md:w-28 text-center">
              {/* Step Circle */}
              <motion.button
                onClick={() => setActiveStep(step.id)}
                whileHover={{ scale: 1.05 }}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 cursor-pointer select-none ${
                  isCompleted
                    ? "bg-luxury-gold border-luxury-gold text-luxury-black"
                    : isActive
                    ? "bg-luxury-black border-luxury-accent text-luxury-accent shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                    : "bg-luxury-black border-white/10 text-luxury-ivory/30"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </motion.button>

              {/* Step Label */}
              <h4
                className={`font-serif text-xs mt-4 transition-colors duration-300 ${
                  isActive ? "text-luxury-accent font-semibold" : isCompleted ? "text-luxury-gold" : "text-luxury-ivory/40"
                }`}
              >
                {step.label}
              </h4>
              
              {/* Step ID marker */}
              <span className="font-sans text-[8px] tracking-widest text-luxury-ivory/20 mt-1 uppercase">
                Stage 0{step.id}
              </span>
            </div>
          );
        })}
      </div>

      {/* Selected Step Detail Panel */}
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel mt-16 p-8 md:p-12 max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-center border border-white/5 hover:border-luxury-gold/10 transition-colors"
      >
        <div className="p-5 bg-white/5 border border-white/10 rounded-full shrink-0">
          {React.createElement(steps[activeStep - 1].icon, { className: "w-8 h-8 text-luxury-gold" })}
        </div>
        <div className="text-center md:text-left flex-grow">
          <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-luxury-gold">
            Current Active State — Stage {activeStep} of 9
          </span>
          <h3 className="font-serif text-2xl text-luxury-ivory mt-2">
            {steps[activeStep - 1].label}
          </h3>
          <p className="font-sans text-xs text-luxury-ivory/60 mt-3 leading-relaxed">
            {steps[activeStep - 1].desc}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
