'use client';

import React from 'react';
import {
  X,
  ShieldCheck,
  FlaskConical,
  Package,
  CheckCircle2,
  Printer,
  PlusCircle,
} from 'lucide-react';
import { ProductItem } from '@/data/products';

interface TechnicalSheetModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToQuote: (product: ProductItem) => void;
}

export default function TechnicalSheetModal({
  product,
  onClose,
  onAddToQuote,
}: TechnicalSheetModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/30 bg-[#071324] text-white shadow-2xl shadow-cyan-500/15">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#071324]/95 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
                RÉF: {product.code}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Fiche Technique Laboratoire & Sécurité (TDS / FDS)
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">{product.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Product UGC Photo + Description */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 items-center">
            <div className="sm:col-span-5 rounded-xl overflow-hidden border border-white/10 aspect-[4/3]">
              <img
                src={product.ugcImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-7 space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-bold">
                {product.badge} • {product.volume}
              </span>
              <p className="text-sm text-cyan-300 font-semibold">{product.subtitle}</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Physico-Chemical Specs Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-cyan-400" />
              Paramètres Physico-Chimiques (Contrôle Laboratoire AMAL)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#040B14] border border-white/10">
                <span className="text-[11px] text-slate-400 block">Potentiel Hydrogène (pH)</span>
                <span className="text-sm font-bold text-cyan-300 mt-1 block">
                  {product.specs.ph}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#040B14] border border-white/10">
                <span className="text-[11px] text-slate-400 block">Viscosité / Densité</span>
                <span className="text-sm font-bold text-white mt-1 block">
                  {product.specs.viscosity}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#040B14] border border-white/10">
                <span className="text-[11px] text-slate-400 block">Concentration Active</span>
                <span className="text-sm font-bold text-emerald-400 mt-1 block">
                  {product.specs.activeMatter}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#040B14] border border-white/10">
                <span className="text-[11px] text-slate-400 block">Biodégradabilité</span>
                <span className="text-sm font-bold text-emerald-300 mt-1 block">
                  {product.specs.biodegradability}
                </span>
              </div>
            </div>
          </div>

          {/* Formulation & Active Ingredients */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Architecture Moléculaire & Composants Actifs
            </h4>
            <div className="space-y-2.5">
              {product.specs.ingredients.map((ing, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#040B14] border border-white/10 gap-2"
                >
                  <div>
                    <div className="text-sm font-bold text-white">{ing.name}</div>
                    <div className="text-xs text-slate-400">{ing.role}</div>
                  </div>
                  <span className="self-start sm:self-center px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono font-bold">
                    {ing.percentage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics & Palletization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#040B14] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                <Package className="w-4 h-4" />
                Données Logistiques & Palettisation
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• Conditionnement : {product.specs.packagingUnit}</li>
                <li>• Capacité Palette : {product.specs.palletCapacity}</li>
                <li>• Unités par Carton : {product.unitsPerCarton} unités</li>
                <li>• Cartons par Palette : {product.cartonsPerPallet} cartons</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#040B14] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
                Homologations & Conformité
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.specs.certifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-white/10 bg-[#040B14]">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-slate-300 hover:bg-white/5 text-xs font-semibold transition"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            Imprimer / Exporter PDF Fiche Technique
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                onAddToQuote(product);
                onClose();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:brightness-110 transition"
            >
              <PlusCircle className="w-4 h-4" />
              Ajouter au Devis B2B ({product.cartonsPerPallet} cartons / palette)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
