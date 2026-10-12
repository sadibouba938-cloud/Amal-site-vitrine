'use client';

import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Trash2,
  Plus,
  Minus,
  Send,
  CheckCircle2,
  Truck,
  PackageCheck,
  Building2,
  Globe,
  Sparkles,
} from 'lucide-react';
import { ProductItem, PRODUCTS } from '@/data/products';
import { CustomQuoteConfig } from '@/components/B2BConfigurator';

export interface QuoteCatalogEntry {
  product: ProductItem;
  pallets: number;
}

interface QuoteSectionProps {
  catalogEntries: QuoteCatalogEntry[];
  customEntries: CustomQuoteConfig[];
  onUpdateCatalogPallets: (productId: string, delta: number) => void;
  onRemoveCatalogEntry: (productId: string) => void;
  onRemoveCustomEntry: (customId: string) => void;
  onAddQuickProduct: (product: ProductItem) => void;
}

export default function QuoteSection({
  catalogEntries,
  customEntries,
  onUpdateCatalogPallets,
  onRemoveCatalogEntry,
  onRemoveCustomEntry,
  onAddQuickProduct,
}: QuoteSectionProps) {
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('Dakar, Sénégal');
  const [clientType, setClientType] = useState('Grossiste / Centrale d’Achat');
  const [incoterm, setIncoterm] = useState('EXW Usine / Livraison Régionale');
  const [notes, setNotes] = useState('');
  const [currency, setCurrency] = useState<'EUR' | 'FCFA'>('EUR');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const FCFA_RATE = 655.957;

  const formatMoney = (eurAmount: number) => {
    if (currency === 'EUR') {
      return `${eurAmount.toLocaleString('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })} € HT`;
    }
    const fcfa = Math.round(eurAmount * FCFA_RATE);
    return `${fcfa.toLocaleString('fr-FR')} FCFA HT`;
  };

  // Totals calculation
  const totalCatalogPallets = catalogEntries.reduce((acc, item) => acc + item.pallets, 0);
  const totalCustomPallets = customEntries.reduce((acc, item) => acc + item.pallets, 0);
  const totalPallets = totalCatalogPallets + totalCustomPallets;

  const totalCatalogUnits = catalogEntries.reduce(
    (acc, item) =>
      acc + item.pallets * item.product.cartonsPerPallet * item.product.unitsPerCarton,
    0
  );
  const totalCustomUnits = customEntries.reduce(
    (acc, item) => acc + item.pallets * item.unitsPerPallet,
    0
  );
  const totalUnits = totalCatalogUnits + totalCustomUnits;

  const totalCatalogEUR = catalogEntries.reduce((acc, item) => {
    const units = item.pallets * item.product.cartonsPerPallet * item.product.unitsPerCarton;
    return acc + units * item.product.unitPriceHT;
  }, 0);

  const totalCustomEUR = customEntries.reduce((acc, item) => {
    const units = item.pallets * item.unitsPerPallet;
    return acc + units * item.unitPriceHT;
  }, 0);

  const grandTotalEUR = Math.round(totalCatalogEUR + totalCustomEUR);

  // Container fill calculation (11 pallets = 20ft container, 24 pallets = 40ft container)
  const containerCapacity = totalPallets <= 11 ? 11 : 24;
  const containerLabel =
    totalPallets <= 11 ? 'Conteneur 20 Pieds (11 Palettes)' : 'Conteneur 40 Pieds HQ (24 Palettes)';
  const fillPercent = Math.min(100, Math.round((totalPallets / containerCapacity) * 100));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `AML-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(randomCode);
  };

  return (
    <section id="devis-b2b" className="py-24 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Centrale d’Achat, Distribution & Export B2B
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Simulateur de Devis{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                & Logistique Conteneur
              </span>
            </h2>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-3 self-start lg:self-end bg-[#071324] p-1.5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 pl-3 font-medium">Devise d’affichage :</span>
            <button
              onClick={() => setCurrency('EUR')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                currency === 'EUR'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              EUR (€)
            </button>
            <button
              onClick={() => setCurrency('FCFA')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                currency === 'FCFA'
                  ? 'bg-emerald-400 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              FCFA (XOF)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Selected Pallets & Logistics Meter */}
          <div className="lg:col-span-7 space-y-6">
            {/* Logistics Container Gauge */}
            <div className="p-6 rounded-3xl border border-cyan-500/25 bg-[#071324] shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-bold text-white">
                    Jauge de Chargement Logistique : {containerLabel}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  {totalPallets} / {containerCapacity} Palettes ({fillPercent}%)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#040B14] border border-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-5 pt-4 border-t border-white/10 text-center">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase block">Palettes Totales</span>
                  <span className="text-xl font-black text-white">{totalPallets} Pal.</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase block">Volume Unités</span>
                  <span className="text-xl font-black text-cyan-300">
                    {totalUnits.toLocaleString('fr-FR')} u.
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase block">Total Estimé HT</span>
                  <span className="text-xl font-black text-emerald-400">
                    {formatMoney(grandTotalEUR)}
                  </span>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="rounded-3xl border border-white/10 bg-[#071324] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PackageCheck className="w-5 h-5 text-cyan-400" />
                  Lignes de Commande & Lots Sélectionnés
                </h3>
                {catalogEntries.length === 0 && customEntries.length === 0 && (
                  <span className="text-xs text-amber-300">Aucun lot sélectionné</span>
                )}
              </div>

              {catalogEntries.length === 0 && customEntries.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#040B14] border border-dashed border-white/15 text-center space-y-4">
                  <p className="text-sm text-slate-400">
                    Votre simulateur de devis est vide. Ajoutez rapidement un de nos produits phares
                    ci-dessous ou créez un flacon sur-mesure dans le Configurateur 3D :
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {PRODUCTS.slice(0, 4).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onAddQuickProduct(p)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-cyan-500/25 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Standard Catalog Products */}
                  {catalogEntries.map(({ product, pallets }) => {
                    const unitsPerPallet = product.cartonsPerPallet * product.unitsPerCarton;
                    const lineTotalEUR = Math.round(pallets * unitsPerPallet * product.unitPriceHT);
                    return (
                      <div
                        key={product.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#040B14] border border-white/10"
                      >
                        <div className="flex items-start gap-3.5">
                          <img
                            src={product.ugcImage}
                            alt={product.name}
                            className="w-16 h-16 rounded-xl object-cover border border-white/15 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{product.name}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                                {product.code}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">
                              {product.volume} • {unitsPerPallet} unités / palette
                            </p>
                            <span className="text-xs font-bold text-emerald-400 mt-1 block">
                              {formatMoney(lineTotalEUR)} ({pallets * unitsPerPallet} unités)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => onUpdateCatalogPallets(product.id, -1)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                            title="Retirer 1 palette"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold min-w-[78px] text-center">
                            {pallets} Pal.
                          </span>
                          <button
                            onClick={() => onUpdateCatalogPallets(product.id, 1)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                            title="Ajouter 1 palette"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onRemoveCatalogEntry(product.id)}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 ml-1"
                            title="Supprimer la ligne"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Custom 3D Configurator Products */}
                  {customEntries.map((c) => {
                    const lineTotalEUR = Math.round(c.pallets * c.unitsPerPallet * c.unitPriceHT);
                    return (
                      <div
                        key={c.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-[#040B14] border border-cyan-500/30"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-cyan-400 text-slate-950 text-[10px] font-black uppercase">
                              Sur-Mesure 3D MDD
                            </span>
                            <span className="text-sm font-bold text-white">
                              Marque « {c.brandName} » — {c.productTitle}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300">
                            {c.shapeLabel} • {c.formulaName}
                          </p>
                          <span className="text-xs font-bold text-cyan-300 block">
                            {c.pallets} Palettes ({c.pallets * c.unitsPerPallet} unités) —{' '}
                            {formatMoney(lineTotalEUR)}
                          </span>
                        </div>

                        <button
                          onClick={() => onRemoveCustomEntry(c.id)}
                          className="self-end sm:self-center p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                          title="Supprimer cette configuration"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Official B2B Quote Submission Form */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-[#071324] p-6 sm:p-8 shadow-2xl">
              {submittedRef ? (
                <div className="py-8 text-center space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-mono font-bold">
                      DOSSIER B2B N° {submittedRef}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-3">
                      Demande de Devis Transmise !
                    </h3>
                    <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                      Merci <strong>{contactName || 'Cher Partenaire'}</strong> ({company || 'Société B2B'}).
                      Notre Direction Commerciale & Laboratoire AMAL vous adresse votre cotation
                      proforma détaillée sous <strong>4 heures ouvrées</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#040B14] border border-white/10 text-left text-xs space-y-1.5 text-slate-300">
                    <div>
                      • <strong>Volume total :</strong> {totalPallets} Palettes ({totalUnits.toLocaleString('fr-FR')} unités)
                    </div>
                    <div>
                      • <strong>Estimation HT :</strong> {formatMoney(grandTotalEUR)}
                    </div>
                    <div>
                      • <strong>Destination :</strong> {destination} ({incoterm})
                    </div>
                    <div>
                      • <strong>Profil :</strong> {clientType}
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmittedRef(null)}
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition"
                  >
                    Modifier ou Soumettre une Nouvelle Demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-xl font-black text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-cyan-400" />
                      Recevoir Votre Cotation Proforma
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Réponse rapide sous 4h avec fiches techniques, FDS et plan de chargement.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Société / Enseigne *
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Ex: Groupe Distribution SA"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B14] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Nom & Fonction *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Ex: M. Diop - Dir. Achats"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B14] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Professionnel *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="achats@entreprise.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B14] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Téléphone / WhatsApp Pro *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+221 77 000 00 00"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B14] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Profil d’Acheteur
                      </label>
                      <select
                        value={clientType}
                        onChange={(e) => setClientType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B14] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                      >
                        <option>Grossiste / Centrale d’Achat</option>
                        <option>Grande Distribution (Supermarchés)</option>
                        <option>Hôtellerie, Restauration & Collectivités (CHR)</option>
                        <option>Marque Blanche / Distributeur Export</option>
                        <option>Industrie & Blanchisserie Pro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Ville & Pays de Livraison *
                      </label>
                      <input
                        type="text"
                        required
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Ex: Dakar, Abidjan, Casablanca..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B14] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Mode Logistique / Incoterm
                    </label>
                    <select
                      value={incoterm}
                      onChange={(e) => setIncoterm(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#040B14] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                    >
                      <option>EXW Usine / Livraison Camion Complet</option>
                      <option>FOB Port de Dakar (Conteneur 20&apos; / 40&apos;)</option>
                      <option>CIF Port de Destination (Export International)</option>
                      <option>Contrat Cadre Annuel Multi-Livraisons</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Précisions Techniques (Cahier des charges, parfum, échantillons...)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Précisez vos besoins en échantillons laboratoire, délais souhaités ou personnalisation..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#040B14] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 hover:brightness-110 transition"
                  >
                    <Send className="w-4 h-4" />
                    Valider & Obtenir le Devis Proforma ({totalPallets} Palettes)
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
