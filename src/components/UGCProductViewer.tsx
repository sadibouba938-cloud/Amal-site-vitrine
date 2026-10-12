'use client';

import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Sparkles, ShieldCheck, CheckCircle2, Eye } from 'lucide-react';

interface UGCProductViewerProps {
  imageSrc: string;
  productName: string;
  subtitle: string;
  volume: string;
  badge: string;
  ugcContext: string;
  ugcHighlight: string;
  accentColor: string;
  ph?: string;
  activeMatter?: string;
  showHotspots?: boolean;
  customBrandOverlay?: {
    brandName: string;
    productTitle: string;
    formulaName: string;
    accentHex: string;
  };
  className?: string;
}

export default function UGCProductViewer({
  imageSrc,
  productName,
  subtitle,
  volume,
  badge,
  ugcContext,
  ugcHighlight,
  accentColor,
  ph,
  activeMatter,
  showHotspots = true,
  customBrandOverlay,
  className = '',
}: UGCProductViewerProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activePin, setActivePin] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -yPct * 7,
      y: xPct * 7,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const hotspots = [
    {
      id: 1,
      top: '18%',
      left: '50%',
      title: 'Système de Dosage & Sécurité AMAL',
      desc: 'Bouchon doseur anti-goutte, pompe verrouillable ou bague inviolable certifiée.',
    },
    {
      id: 2,
      top: '54%',
      left: '49%',
      title: 'Étiquetage Officiel AMAL Haute Résistance',
      desc: ugcHighlight,
    },
    {
      id: 3,
      top: '76%',
      left: '53%',
      title: 'Formule Concentrée & Emballage Recyclable',
      desc: `${activeMatter || 'Haute concentration active'} • Plasturgie PEHD/PET 100% recyclable.`,
    },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full overflow-hidden select-none group ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Main Tilted UGC Photo Card */}
      <div
        className="relative w-full h-full transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isZoomed ? 1.24 : 1.02})`,
        }}
      >
        <img
          src={imageSrc}
          alt={`${productName} - Photo UGC officielle étiquetée AMAL`}
          className="w-full h-full object-cover object-center transition-all duration-500"
        />

        {/* Subtle Vignette Gradient for HUD Readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040B14]/90 via-transparent to-[#040B14]/40" />

        {/* Interactive Inspection Hotspots on the AMAL Product */}
        {showHotspots &&
          hotspots.map((pin) => {
            const isOpen = activePin === pin.id;
            return (
              <div
                key={pin.id}
                style={{ top: pin.top, left: pin.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  type="button"
                  onClick={() => setActivePin(isOpen ? null : pin.id)}
                  className="relative flex items-center justify-center w-7 h-7 rounded-full bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/50 hover:scale-110 transition"
                  title={pin.title}
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-65" />
                  <span className="relative">{pin.id}</span>
                </button>

                {isOpen && (
                  <div className="mt-2 w-60 -ml-24 p-3 rounded-xl bg-[#040B14]/95 border border-cyan-400/50 text-left shadow-2xl backdrop-blur-md">
                    <div className="text-xs font-bold text-cyan-300">{pin.title}</div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-snug">{pin.desc}</p>
                  </div>
                )}
              </div>
            );
          })}

        {/* Optional Custom Brand / MDD Live Tag Overlay */}
        {customBrandOverlay && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-[86%] max-w-sm p-3.5 rounded-2xl bg-[#040B14]/90 border-2 backdrop-blur-md shadow-2xl text-center"
            style={{ borderColor: customBrandOverlay.accentHex }}
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300">
              APERÇU ÉTIQUETTE PERSONNALISÉE B2B
            </div>
            <div className="text-lg font-black text-white tracking-tight mt-0.5">
              {customBrandOverlay.brandName || 'AMAL PRO'} — {customBrandOverlay.productTitle}
            </div>
            <div className="text-[11px] text-slate-300 truncate">
              {customBrandOverlay.formulaName} • {volume}
            </div>
          </div>
        )}
      </div>

      {/* Top Left Authentic UGC Verification Pill */}
      <div className="absolute top-3.5 left-3.5 z-20 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#040B14]/85 border border-cyan-400/40 backdrop-blur-md text-xs font-bold text-white shadow-lg">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          Photo Produit UGC • Étiqueté AMAL
        </span>
        <span
          className="px-2.5 py-1 rounded-xl text-[11px] font-black uppercase text-slate-950 shadow-md"
          style={{ backgroundColor: accentColor }}
        >
          {badge}
        </span>
      </div>

      {/* Top Right Controls (Zoom HD & Lab Specs) */}
      <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2">
        {ph && (
          <div className="hidden sm:block px-3 py-1.5 rounded-xl bg-[#040B14]/85 border border-white/15 backdrop-blur-md text-right">
            <span className="text-[10px] font-mono text-cyan-300 block">pH {ph}</span>
            {activeMatter && (
              <span className="text-[11px] font-bold text-emerald-400 block">{activeMatter}</span>
            )}
          </div>
        )}
        <button
          type="button"
          onClick={() => setIsZoomed(!isZoomed)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#040B14]/85 hover:bg-cyan-500 hover:text-slate-950 text-white border border-white/20 backdrop-blur-md text-xs font-bold transition shadow-lg"
          title="Zoomer sur l'étiquette AMAL"
        >
          {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          <span>{isZoomed ? 'Réduire' : 'Zoom Étiquette'}</span>
        </button>
      </div>

      {/* Bottom Context Bar */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-[#040B14]/85 border border-white/15 backdrop-blur-md">
        <div className="flex items-center gap-2 min-w-0">
          <Eye className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-xs font-semibold text-slate-200 truncate">{ugcContext}</span>
        </div>
        <span className="text-[11px] font-mono font-bold text-cyan-300">{volume}</span>
      </div>
    </div>
  );
}
