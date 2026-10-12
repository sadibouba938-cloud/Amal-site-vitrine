'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  FileSpreadsheet,
  Sliders,
  Factory,
  Camera,
  Menu,
  X,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';

interface NavbarProps {
  quoteCount: number;
  onOpenQuoteSection: () => void;
}

export default function Navbar({ quoteCount, onOpenQuoteSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#showroom-ugc', label: 'Vitrine Produits AMAL', icon: Camera },
    { href: '#catalogue', label: 'Catalogue & Gammes', icon: Sparkles },
    { href: '#configurateur-b2b', label: 'Studio B2B & Étiquetage', icon: Sliders },
    { href: '#usine-procédé', label: 'Usine & Laboratoire R&D', icon: Factory },
    { href: '#devis-b2b', label: 'Simulateur Devis', icon: FileSpreadsheet },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/15 bg-[#040B14]/85 backdrop-blur-xl">
      {/* Top Industrial Info Bar */}
      <div className="hidden lg:block border-b border-white/5 bg-[#02060D] py-1.5 px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Certifié ISO 9001 • ISO 14001 • Normes HACCP & EN 1276
            </span>
            <span>Capacité Industrielle : 45 000 Tonnes / An</span>
            <span>Distribution Grande Surface, Grossistes, CHR & Export</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="tel:+221338429000"
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              Direction Commerciale B2B : +221 33 842 90 00 / Export
            </a>
            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
              Production Active 24/7
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-emerald-500 p-[1.5px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#040B14] rounded-[10px] flex flex-col items-center justify-center">
              <span className="text-lg font-black tracking-tighter bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent leading-none">
                A
              </span>
              <span className="text-[7px] font-bold tracking-widest text-cyan-400 uppercase mt-0.5">
                AMAL
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-300 transition">
                AMAL
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                Industrie
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              Savonnerie & Détergents Haute Performance
            </p>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition"
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQuoteSection}
            className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:brightness-110 transition"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="hidden sm:inline">Devis B2B</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-950 text-cyan-300 text-xs font-extrabold">
              {quoteCount}
            </span>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2.5 rounded-xl border border-white/10 text-slate-200 hover:bg-white/5"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#071324] px-4 py-4 space-y-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5"
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
