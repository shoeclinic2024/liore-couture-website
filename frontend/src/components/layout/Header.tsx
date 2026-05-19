"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Menu, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "The Shoe Clinic", href: "/clinic" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-luxury-black/90 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Identity / Dual Logo */}
        <Link href="/" className="flex flex-col select-none group">
          <span className="font-serif text-xl tracking-[0.2em] font-semibold text-luxury-ivory group-hover:text-luxury-gold transition-colors">
            LIORÉ COUTURE
          </span>
          <span className="font-sans text-[0.6rem] tracking-[0.3em] text-luxury-gold flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5 text-luxury-gold" />
            THE SHOE CLINIC DIVISION
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-sans text-xs uppercase tracking-widest hover:text-luxury-gold transition-all duration-300 relative py-1 ${
                  isActive ? "text-luxury-gold font-medium" : "text-luxury-ivory/80"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-6 text-luxury-ivory/85">
          <Link href="/profile" className="hover:text-luxury-gold transition-colors">
            <User className="w-4 h-4" />
          </Link>
          <button className="hover:text-luxury-gold transition-colors relative">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-luxury-gold text-luxury-black font-sans text-[0.6rem] font-bold rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-luxury-ivory hover:text-luxury-gold transition-colors focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-luxury-black/95 border-b border-white/5 backdrop-blur-lg flex flex-col py-8 px-6 space-y-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-sans text-sm uppercase tracking-widest text-luxury-ivory/90 hover:text-luxury-gold py-2 transition-colors border-b border-white/5"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-8 pt-4">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-luxury-ivory hover:text-luxury-gold transition-colors"
              >
                <User className="w-4 h-4" /> Account
              </Link>
              <button className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-luxury-ivory hover:text-luxury-gold transition-colors">
                <ShoppingBag className="w-4 h-4" /> Cart (0)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
