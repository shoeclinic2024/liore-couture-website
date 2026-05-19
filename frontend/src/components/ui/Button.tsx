"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "gold";
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center font-sans text-xs uppercase tracking-widest py-4 px-8 border transition-all duration-500 select-none overflow-hidden relative group";

  const variants = {
    primary: "border-luxury-ivory text-luxury-ivory hover:text-luxury-black bg-transparent",
    secondary: "border-white/10 text-luxury-ivory/60 hover:border-luxury-ivory hover:text-luxury-ivory bg-transparent",
    gold: "border-luxury-gold text-luxury-gold hover:text-luxury-black bg-transparent",
  };

  const bgVariants = {
    primary: "bg-luxury-ivory",
    secondary: "bg-luxury-ivory",
    gold: "bg-luxury-gold",
  };

  const content = (
    <>
      {/* Hover Background Expansion */}
      <span className={`absolute inset-0 w-full h-full transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out -z-10 ${bgVariants[variant]}`} />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseStyle} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {content}
    </button>
  );
}
