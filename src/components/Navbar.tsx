import React, { useState } from "react";
import { GraduationCap, ShoppingCart, Menu, X, LayoutDashboard, Compass } from "lucide-react";
import { CartItem } from "../types";

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
}

export default function Navbar({ currentView, setCurrentView, cart, setIsCartOpen }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "landing", label: "الرئيسية" },
    { id: "teachers", label: "نخبة المعلمين" },
    { id: "packages", label: "الباقات الدراسية" },
    { id: "store", label: "متجر الكتب والمذكرات" },
  ];

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8 mb-6">
      <div className="max-w-7xl mx-auto glass-panel rounded-[24px] px-4 sm:px-6 lg:px-8 transition-all duration-300 shadow-2xl">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => { setCurrentView("landing"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl gold-gradient-bg shadow-lg shadow-brand-gold-500/20 group-hover:scale-105 transition-all duration-300">
              <GraduationCap className="w-7 h-7 text-brand-navy-950" />
              <div className="absolute -inset-0.5 rounded-xl gold-gradient-bg blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-brand-gold-400 transition-colors">
                أكاديمية <span className="gold-gradient-text font-black">صَرح</span>
              </span>
              <span className="text-[10px] text-brand-gold-300 font-medium tracking-widest">
                SARH EDUCATIONAL ACADEMY
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setCurrentView(link.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={`relative px-1 py-2 text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  currentView === link.id
                    ? "text-brand-gold-400 font-bold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
                {currentView === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 gold-gradient-bg rounded-full shadow-[0_2px_8px_rgba(223,185,68,0.4)]" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Buttons & Cart */}
          <div className="hidden md:flex items-center gap-4">
            {/* Admin Dashboard Entry */}
            <button
              onClick={() => { setCurrentView("admin"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border cursor-pointer ${
                currentView === "admin"
                  ? "bg-brand-gold-500 text-brand-navy-950 border-brand-gold-400 shadow-md shadow-brand-gold-400/20"
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>لوحة التحكم (المدير)</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 rounded-xl bg-brand-navy-800 hover:bg-brand-navy-700 text-white border border-white/10 transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2 group"
            >
              <ShoppingCart className="w-5 h-5 text-brand-gold-400 group-hover:animate-bounce" />
              <span className="text-xs font-bold hidden lg:inline">طلبات الحجز</span>
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full gold-gradient-bg text-[10px] font-black text-brand-navy-950 ring-2 ring-brand-navy-950 animate-pulse">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Quick Request Quote CTA */}
            <button
              onClick={() => { setCurrentView("cart"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="px-5 py-2.5 rounded-xl gold-gradient-bg hover:opacity-90 font-bold text-xs text-brand-navy-950 shadow-lg shadow-brand-gold-500/20 hover:shadow-brand-gold-500/30 transition-all duration-300 cursor-pointer"
            >
              إرسال طلب عاجل
            </button>
          </div>

          {/* Mobile menu and cart trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg bg-brand-navy-800 text-white border border-white/10"
            >
              <ShoppingCart className="w-5 h-5 text-brand-gold-400" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full gold-gradient-bg text-[9px] font-bold text-brand-navy-950">
                  {cart.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-brand-navy-800 text-white border border-white/10"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-24 left-4 right-4 glass-panel rounded-[20px] animate-fade-in border border-white/10 z-50 overflow-hidden shadow-2xl">
          <div className="px-3 pt-3 pb-4 space-y-1 text-right">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentView(link.id);
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`block w-full text-right px-4 py-3 rounded-lg text-base font-semibold ${
                  currentView === link.id
                    ? "bg-brand-gold-500/10 text-brand-gold-400 border-r-4 border-brand-gold-400"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <div className="pt-4 border-t border-white/10 px-4 space-y-2">
              <button
                onClick={() => {
                  setCurrentView("admin");
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-white/5 text-white border border-white/10 font-bold text-sm"
              >
                <LayoutDashboard className="w-4 h-4 text-brand-gold-400" />
                <span>لوحة تحكم المدير</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView("cart");
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl gold-gradient-bg text-brand-navy-950 font-bold text-sm"
              >
                <Compass className="w-4 h-4" />
                <span>أرسل طلب عاجل ومراجعة العربة</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
