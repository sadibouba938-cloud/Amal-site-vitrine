'use client';

import React, { useState } from 'react';
import {
  Sliders,
  CheckCircle2,
  PlusCircle,
  Palette,
  FlaskConical,
  Box,
  Eye,
} from 'lucide-react';
import UGCProductViewer from '@/components/UGCProductViewer';
import { PackagingShape } from '@/data/products';

export interface CustomQuoteConfig {
  id: string;
  brandName: string;
  productTitle: string;
  formulaName: string;
  shape: PackagingShape;
  shapeLabel: string;
  volumeText: string;
  bottleColor: string;
  capColor: string;
  liquidColor: string;
  pallets: number;
  unitsPerPallet: number;
  unitPriceHT: number;
}

interface B2BConfiguratorProps {
  onAddCustomToQuote: (config: CustomQuoteConfig) => void;
}

const SHAPE_OPTIONS: {
  shape: PackagingShape;
  label: string;
  volume: string;
  unitsPerPallet: number;
  baseUnitCost: number;
  ugcImage: string;
  ugcContext: string;
  ugcHighlight: string;
}[] = [
  {
    shape: 'detergent_bottle',
    label: 'Flacon Lessive Ergonomique 3L',
    volume: '3 Litres (60 Lavages)',
    unitsPerPallet: 192,
    baseUnitCost: 4.5,
    ugcImage: 'images/products/amal-oxypower-3l.jpg',
    ugcContext: 'Visuel UGC • Flacon Lessive 3L Étiqueté AMAL',
    ugcHighlight: 'Étiquette frontale haute adhérence AMAL OxyPower 3L',
  },
  {
    shape: 'dish_bottle',
    label: 'Flacon Liquide Vaisselle 1L',
    volume: '1 Litre Concentré',
    unitsPerPallet: 720,
    baseUnitCost: 1.75,
    ugcImage: 'images/products/amal-citronzyme-1l.jpg',
    ugcContext: 'Visuel UGC • Flacon PET Cristal 1L Étiqueté AMAL',
    ugcHighlight: 'Étiquette résistante à l’humidité AMAL CitronZyme 1L',
  },
  {
    shape: 'industrial_jerrycan',
    label: 'Bidon Industriel Empilable 5L',
    volume: '5 Litres Pro B2B',
    unitsPerPallet: 128,
    baseUnitCost: 8.2,
    ugcImage: 'images/products/amal-proclean-hd-5l.jpg',
    ugcContext: 'Visuel UGC • Bidon PEHD 5L Étiqueté AMAL ProClean HD',
    ugcHighlight: 'Étiquette grand format normée HACCP & pictogrammes ISO',
  },
  {
    shape: 'trigger_spray',
    label: 'Flacon Pistolet Spray 750ml',
    volume: '750 ml Pulvérisateur',
    unitsPerPallet: 600,
    baseUnitCost: 2.1,
    ugcImage: 'images/products/amal-cristalspray-750.jpg',
    ugcContext: 'Visuel UGC • Spray 750ml Étiqueté AMAL CristalSpray',
    ugcHighlight: 'Étiquette ergonomique cintrée AMAL Multi-Surfaces',
  },
  {
    shape: 'bleach_bottle',
    label: 'Flacon Javel Sécurité 2.5L',
    volume: '2,5 Litres (12° Chl)',
    unitsPerPallet: 270,
    baseUnitCost: 1.9,
    ugcImage: 'images/products/amal-chloreactif-25l.jpg',
    ugcContext: 'Visuel UGC • Flacon Sécurité 2.5L Étiqueté AMAL ChloreActif',
    ugcHighlight: 'Étiquette traitée anti-chlore et bouchon certifié ISO 8317',
  },
  {
    shape: 'soap_bar',
    label: 'Pain de Savon Estampillé 400g',
    volume: '400g Pur Végétal 72%',
    unitsPerPallet: 2000,
    baseUnitCost: 0.85,
    ugcImage: 'images/products/amal-marseille-400g.jpg',
    ugcContext: 'Visuel UGC • Pain de Savon 400g Gravé & Bague AMAL',
    ugcHighlight: 'Frappe en relief AMAL 72% Extra Pur + bague kraft dorée',
  },
  {
    shape: 'pump_bottle',
    label: 'Flacon Pompe Savon Crème 500ml',
    volume: '500 ml Pompe Doseuse',
    unitsPerPallet: 768,
    baseUnitCost: 1.6,
    ugcImage: 'images/products/amal-dermasoft-500ml.jpg',
    ugcContext: 'Visuel UGC • Flacon Pompe 500ml Étiqueté AMAL DermaSoft',
    ugcHighlight: 'Étiquette cosmétique minimaliste AMAL DermaSoft',
  },
  {
    shape: 'powder_bucket',
    label: 'Seau Lessive Poudre Atomisée 10kg',
    volume: 'Seau Pro 10 kg',
    unitsPerPallet: 48,
    baseUnitCost: 15.4,
    ugcImage: 'images/products/amal-oxyblanc-10kg.jpg',
    ugcContext: 'Visuel UGC • Seau 10kg Étiqueté AMAL OxyBlanc Pro',
    ugcHighlight: 'Impression IML panoramique 360° haute résistance AMAL',
  },
];

const BOTTLE_COLORS = [
  { name: 'Bleu Nuit AMAL', hex: '#0B2847' },
  { name: 'PET Cristal Clair', hex: '#E0F7FA' },
  { name: 'Blanc Pur PEHD', hex: '#F8FAFC' },
  { name: 'Anthracite Industriel', hex: '#1E293B' },
  { name: 'Émeraude Bio', hex: '#065F46' },
  { name: 'Ocre Savon Naturel', hex: '#D4A359' },
];

const CAP_COLORS = [
  { name: 'Cyan Actif', hex: '#00E5FF' },
  { name: 'Vert Émeraude', hex: '#10B981' },
  { name: 'Or Industriel', hex: '#F59E0B' },
  { name: 'Bleu Cobalt', hex: '#0284C7' },
  { name: 'Rouge Sécurité', hex: '#EF4444' },
  { name: 'Blanc Pur', hex: '#FFFFFF' },
];

const LIQUID_FORMULAS = [
  {
    name: 'Oxygène & 5 Enzymes (Bleu Cyan)',
    liquidHex: '#00B4D8',
    accentHex: '#00E5FF',
    badge: '5 ENZYMES ACTIVES',
  },
  {
    name: 'Citron Vert Ultra-Dégraissant (Émeraude)',
    liquidHex: '#10B981',
    accentHex: '#10B981',
    badge: 'ULTRA DÉGRAISSANT',
  },
  {
    name: 'Alcalin Surpuissant HACCP (Ambre Or)',
    liquidHex: '#F59E0B',
    accentHex: '#F59E0B',
    badge: 'NORME PRO HACCP',
  },
  {
    name: 'Fraîcheur Menthe & Eucalyptus (Cristal)',
    liquidHex: '#38BDF8',
    accentHex: '#0284C7',
    badge: 'BACTÉRICIDE 99.9%',
  },
];

export default function B2BConfigurator({ onAddCustomToQuote }: B2BConfiguratorProps) {
  const [selectedShapeIdx, setSelectedShapeIdx] = useState(0);
  const [brandName, setBrandName] = useState('AMAL');
  const [productTitle, setProductTitle] = useState('GAMME PRO SUR-MESURE');
  const [selectedBottleIdx, setSelectedBottleIdx] = useState(0);
  const [selectedCapIdx, setSelectedCapIdx] = useState(0);
  const [selectedFormulaIdx, setSelectedFormulaIdx] = useState(0);
  const [pallets, setPallets] = useState(3);
  const [showOverlay, setShowOverlay] = useState(true);
  const [addedToast, setAddedToast] = useState(false);

  const shapeObj = SHAPE_OPTIONS[selectedShapeIdx];
  const bottleObj = BOTTLE_COLORS[selectedBottleIdx];
  const capObj = CAP_COLORS[selectedCapIdx];
  const formulaObj = LIQUID_FORMULAS[selectedFormulaIdx];

  // Volume discount calculation
  const discountRate = pallets >= 10 ? 0.14 : pallets >= 5 ? 0.08 : pallets >= 3 ? 0.04 : 0;
  const finalUnitPrice = +(shapeObj.baseUnitCost * (1 - discountRate)).toFixed(2);
  const totalUnits = pallets * shapeObj.unitsPerPallet;
  const totalEstimatedHT = Math.round(totalUnits * finalUnitPrice);

  const handleAddCustom = () => {
    onAddCustomToQuote({
      id: `custom-${Date.now()}`,
      brandName: brandName || 'AMAL',
      productTitle: productTitle || 'FORMULE SUR-MESURE',
      formulaName: formulaObj.name,
      shape: shapeObj.shape,
      shapeLabel: shapeObj.label,
      volumeText: shapeObj.volume,
      bottleColor: bottleObj.hex,
      capColor: capObj.hex,
      liquidColor: formulaObj.liquidHex,
      pallets,
      unitsPerPallet: shapeObj.unitsPerPallet,
      unitPriceHT: finalUnitPrice,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3500);
  };

  return (
    <section id="configurateur-b2b" className="py-24 relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sliders className="w-3.5 h-3.5" />
              Studio Packaging AMAL & Formulation B2B Sur-Mesure
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Personnalisez Votre Gamme{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                Étiquetée AMAL ou MDD
              </span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-xl text-sm sm:text-base leading-relaxed">
            Sélectionnez votre conditionnement photographié en situation réelle (UGC) avec
            étiquetage officiel AMAL, choisissez votre formule chimique et calculez votre tarif par
            palette en direct.
          </p>
        </div>

        {/* Main Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Authentic UGC Photo Stage */}
          <div className="lg:col-span-7 flex flex-col rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#07162C] to-[#040B14] overflow-hidden shadow-2xl shadow-cyan-950/40 relative">
            {/* Top HUD */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 border-b border-white/10 bg-[#040B14]/70 backdrop-blur-md z-10">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Photo Produit UGC : {shapeObj.label}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowOverlay(!showOverlay)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  showOverlay
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                {showOverlay ? 'Masquer Bandeau Sur-Mesure' : 'Afficher Bandeau Sur-Mesure'}
              </button>
            </div>

            {/* UGC Product Photo Viewer */}
            <div className="relative flex-1 min-h-[440px] sm:min-h-[540px]">
              <UGCProductViewer
                imageSrc={shapeObj.ugcImage}
                productName={shapeObj.label}
                subtitle={formulaObj.name}
                volume={shapeObj.volume}
                badge={formulaObj.badge}
                ugcContext={shapeObj.ugcContext}
                ugcHighlight={shapeObj.ugcHighlight}
                accentColor={formulaObj.accentHex}
                showHotspots={true}
                customBrandOverlay={
                  showOverlay
                    ? {
                        brandName,
                        productTitle,
                        formulaName: formulaObj.name,
                        accentHex: formulaObj.accentHex,
                      }
                    : undefined
                }
              />
            </div>

            {/* Thumbnail Strip of All 8 AMAL UGC Products */}
            <div className="p-3 bg-[#040B14] border-t border-white/10 grid grid-cols-4 sm:grid-cols-8 gap-2">
              {SHAPE_OPTIONS.map((opt, idx) => (
                <button
                  key={opt.shape}
                  type="button"
                  onClick={() => setSelectedShapeIdx(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition ${
                    selectedShapeIdx === idx
                      ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-105'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                  title={opt.label}
                >
                  <img
                    src={opt.ugcImage}
                    alt={opt.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Configuration Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-white/10 bg-[#071324] p-6 sm:p-7 space-y-6">
            {/* Step 1: Packaging Shape */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2.5">
                <Box className="w-4 h-4" />
                1. Conditionnement Étiqueté AMAL
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SHAPE_OPTIONS.map((opt, idx) => (
                  <button
                    key={opt.shape}
                    onClick={() => setSelectedShapeIdx(idx)}
                    className={`text-left px-3 py-2.5 rounded-xl border text-xs font-semibold transition ${
                      selectedShapeIdx === idx
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-sm shadow-cyan-500/20'
                        : 'bg-[#040B14] border-white/10 text-slate-300 hover:border-white/25'
                    }`}
                  >
                    <div className="truncate">{opt.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{opt.volume}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Custom Brand & Label Text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  2. Nom de Marque sur Étiquette
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Ex: AMAL"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B14] border border-white/15 text-white text-sm font-bold focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Mention / Gamme Spéciale
                </label>
                <input
                  type="text"
                  maxLength={24}
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  placeholder="Ex: GAMME PRO"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B14] border border-white/15 text-white text-sm font-bold focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Step 3: Chemical Formula & Active Liquid */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                <FlaskConical className="w-4 h-4" />
                3. Formulation Chimique & Parfum Actif
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {LIQUID_FORMULAS.map((form, idx) => (
                  <button
                    key={form.name}
                    onClick={() => setSelectedFormulaIdx(idx)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-left text-xs font-semibold transition ${
                      selectedFormulaIdx === idx
                        ? 'bg-emerald-500/15 border-emerald-400 text-white'
                        : 'bg-[#040B14] border-white/10 text-slate-300 hover:border-white/25'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/30"
                      style={{ backgroundColor: form.liquidHex }}
                    />
                    <span className="truncate">{form.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Colors (Bottle & Cap) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  <Palette className="w-3.5 h-3.5 text-cyan-400" />
                  Teinte Flacon (Cahier des charges)
                </label>
                <div className="flex flex-wrap gap-2">
                  {BOTTLE_COLORS.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedBottleIdx(idx)}
                      title={c.name}
                      className={`w-8 h-8 rounded-xl border-2 transition transform ${
                        selectedBottleIdx === idx
                          ? 'border-cyan-400 scale-110 ring-2 ring-cyan-400/30'
                          : 'border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">{bottleObj.name}</span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Couleur Bouchon / Pistolet
                </label>
                <div className="flex flex-wrap gap-2">
                  {CAP_COLORS.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedCapIdx(idx)}
                      title={c.name}
                      className={`w-8 h-8 rounded-xl border-2 transition transform ${
                        selectedCapIdx === idx
                          ? 'border-cyan-400 scale-110 ring-2 ring-cyan-400/30'
                          : 'border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">{capObj.name}</span>
              </div>
            </div>

            {/* Step 5: Pallet Quantity & Price Summary */}
            <div className="p-4 rounded-2xl bg-[#040B14] border border-cyan-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Volume de Production : <strong className="text-cyan-300">{pallets} Palettes</strong>
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {totalUnits.toLocaleString('fr-FR')} unités totales
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={pallets}
                onChange={(e) => setPallets(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div>
                  <span className="text-[11px] text-slate-400 block">Coût Unitaire Estimé HT</span>
                  <span className="text-lg font-black text-white">
                    {finalUnitPrice.toFixed(2)} €{' '}
                    <span className="text-xs font-normal text-slate-400">/ unité</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Total Lot Estimé HT</span>
                  <span className="text-xl font-black text-cyan-300">
                    {totalEstimatedHT.toLocaleString('fr-FR')} €
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAddCustom}
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 hover:brightness-110 transition"
            >
              {addedToast ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Lot Ajouté au Devis B2B !
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" />
                  Ajouter ce Lot au Devis ({pallets} Palettes)
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
