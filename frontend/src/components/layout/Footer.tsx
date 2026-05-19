import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-luxury-black border-t border-white/5 pt-20 pb-10 text-luxury-ivory/60 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
        {/* Brand Block */}
        <div className="flex flex-col space-y-4">
          <span className="font-serif text-xl tracking-[0.2em] font-semibold text-luxury-ivory">
            LIORÉ COUTURE
          </span>
          <p className="text-xs leading-relaxed max-w-xs">
            Handcrafted luxury leather goods supported by restoration craftsmanship and a commitment to longevity.
          </p>
          <div className="flex space-x-4 pt-2">
            <Link href="https://instagram.com" className="hover:text-luxury-gold transition-colors">
              <Instagram className="w-4 h-4" />
            </Link>
            <Link href="https://facebook.com" className="hover:text-luxury-gold transition-colors">
              <Facebook className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Divisions Links */}
        <div>
          <h4 className="font-serif text-sm font-semibold tracking-wider text-luxury-ivory mb-6 uppercase">
            Divisions
          </h4>
          <ul className="space-y-3 text-xs">
            <li>
              <Link href="/collections" className="hover:text-luxury-gold transition-colors">
                Luxury Brand Products
              </Link>
            </li>
            <li>
              <Link href="/clinic" className="hover:text-luxury-gold transition-colors">
                The Shoe Clinic Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-luxury-gold transition-colors">
                Atelier Craftsmanship
              </Link>
            </li>
            <li>
              <Link href="/about#restoration-philosophy" className="hover:text-luxury-gold transition-colors">
                Restoration Philosophy
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="font-serif text-sm font-semibold tracking-wider text-luxury-ivory mb-6 uppercase">
            Inquiries
          </h4>
          <ul className="space-y-3 text-xs">
            <li>
              <Link href="/clinic#book" className="hover:text-luxury-gold transition-colors">
                Book a Restoration
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-luxury-gold transition-colors">
                Contact & Support
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-luxury-gold transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/care" className="hover:text-luxury-gold transition-colors">
                Leather Care Guide
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Block */}
        <div className="space-y-4">
          <h4 className="font-serif text-sm font-semibold tracking-wider text-luxury-ivory mb-6 uppercase">
            The Atelier
          </h4>
          <div className="flex items-start space-x-3 text-xs">
            <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
            <span>HV9G+RXP, Thiruvananthapuram Byp, Kizhakkum Bhagam Residence Association, Thiruvananthapuram, Kerala 695582</span>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
            <span>+91 73569 29855</span>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
            <span>atelier@liore-couture.com</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest">
        <span>© {new Date().getFullYear()} LIORÉ COUTURE. All rights reserved.</span>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-luxury-gold transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-luxury-gold transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
