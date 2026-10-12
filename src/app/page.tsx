'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  PlusCircle,
  CheckCircle2,
  ShieldCheck,
  FlaskConical,
  ArrowRight,
  Sliders,
  Phone,
  Mail,
  MapPin,
  Camera,
  Eye,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import UGCProductViewer from '@/components/UGCProductViewer';
import B2BConfigurator, { CustomQuoteConfig } from '@/components/B2BConfigurator';
import FactorySection from '@/components/FactorySection';
import QuoteSection, { QuoteCatalogEntry } from '@/components/QuoteSection';
import TechnicalSheetModal from '@/components/TechnicalSheetModal';
import { PRODUCTS, CATEGORIES, ProductCategory, ProductItem } from '@/data/products';

export default function HomePage() {
  // Hero UGC Product State
  const [heroProductIndex, setHeroProductIndex] = useState(0);
  const [heroHotspots, setHeroHotspots] = useState(true);

  // Catalog UGC Showroom State
  const [selectedCategory, setSelectedCategory] = useState<'Tous' | ProductCategory>('Tous');
  const [activeCatalogProduct, setActiveCatalogProduct] = useState<ProductItem>(PRODUCTS[0]);

  // Modal State for Technical Data Sheet (TDS/FDS)
  const [modalProduct, setModalProduct] = useState<ProductItem | null>(null);

  // B2B Quote Cart State
  const [quoteCatalog, setQuoteCatalog] = useState<QuoteCatalogEntry[]>([
    { product: PRODUCTS[0], pallets: 2 },
    { product: PRODUCTS[1], pallets: 1 },
  ]);
  const [quoteCustom, setQuoteCustom] = useState<CustomQuoteConfig[]>([]);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const heroProduct = PRODUCTS[heroProductIndex];

  const filteredProducts =
    selectedCategory === 'Tous'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAddProductToQuote = (product: ProductItem) => {
    setQuoteCatalog((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, pallets: item.pallets + 1 } : item
        );
      }
      return [...prev, { product, pallets: 1 }];
    });
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 2200);
  };

  const handleUpdateCatalogPallets = (productId: string, delta: number) => {
    setQuoteCatalog((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, pallets: Math.max(0, item.pallets + delta) }
            : item
        )
        .filter((item) => item.pallets > 0)
    );
  };

  const handleRemoveCatalogEntry = (productId: string) => {
    setQuoteCatalog((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleAddCustomToQuote = (customConfig: CustomQuoteConfig) => {
    setQuoteCustom((prev) => [...prev, customConfig]);
  };

  const handleRemoveCustomEntry = (customId: string) => {
    setQuoteCustom((prev) => prev.filter((item) => item.id !== customId));
  };

  const scrollToQuote = () => {
    const el = document.getElementById('devis-b2b');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalQuoteItems =
    quoteCatalog.reduce((sum, i) => sum + i.pallets, 0) +
    quoteCustom.reduce((sum, i) => sum + i.pallets, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#040B14] text-slate-100">
      {/* Sticky Navigation */}
      <Navbar quoteCount={totalQuoteItems} onOpenQuoteSection={scrollToQuote} />

      {/* HERO SECTION WITH AUTHENTIC AMAL UGC PRODUCT SHOWCASE */}
      <section
        id="showroom-ugc"
        className="relative pt-8 pb-20 lg:pt-14 lg:pb-28 overflow-hidden"
      >
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="pointer-events-none absolute top-20 right-10 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[130px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Industrial Brand Positioning */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Manufacture de Détergents & Savonnerie • Certifiée ISO 9001
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08]">
                L’Excellence Industrielle en{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                  Détergence & Savonnerie
                </span>{' '}
                Signée AMAL.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                <strong className="text-white">AMAL Savonnerie & Détergents</strong> conçoit,
                formule et fabrique des lessives enzymatiques concentrées, liquides vaisselle
                ultra-dégraissants, désinfectants normés et savons traditionnels 72% pour la grande
                distribution, l’industrie CHR et les grossistes B2B.
              </p>

              {/* Interactive Product Quick-Switcher with Real UGC Thumbnails */}
              <div className="pt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Découvrez nos produits phares étiquetés AMAL en situation réelle :
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PRODUCTS.slice(0, 4).map((prod, idx) => (
                    <button
                      key={prod.id}
                      onClick={() => setHeroProductIndex(idx)}
                      className={`group rounded-xl border p-1.5 text-left transition flex flex-col ${
                        heroProductIndex === idx
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md shadow-cyan-500/15'
                          : 'bg-[#071324]/80 border-white/10 text-slate-300 hover:border-white/25'
                      }`}
                    >
                      <div className="w-full h-16 rounded-lg overflow-hidden mb-1.5 border border-white/10">
                        <img
                          src={prod.ugcImage}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div className="px-1">
                        <div className="text-[10px] font-mono text-cyan-400 truncate">
                          {prod.badge}
                        </div>
                        <div className="text-xs font-bold text-white truncate">
                          {prod.name.replace('AMAL ', '')}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#catalogue"
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/25 hover:brightness-110 transition"
                >
                  Explorer le Catalogue AMAL Complet
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#configurateur-b2b"
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-[#071324] border border-cyan-500/30 text-cyan-300 font-bold text-sm hover:bg-cyan-500/10 transition"
                >
                  <Sliders className="w-4 h-4" />
                  Studio B2B & Marque Blanche
                </a>
              </div>

              {/* Key Industrial Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                <div>
                  <div className="text-2xl font-black text-white">45 000 T</div>
                  <div className="text-xs text-slate-400">Capacité Annuelle</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-cyan-400">&gt; 95%</div>
                  <div className="text-xs text-slate-400">Biodégradabilité OCDE</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400">14 000/h</div>
                  <div className="text-xs text-slate-400">Cadence Flacons</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-amber-400">ISO 9001</div>
                  <div className="text-xs text-slate-400">& Normes HACCP</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive UGC Photo Showcase */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#081A33] via-[#061224] to-[#040B14] shadow-2xl shadow-cyan-950/50 overflow-hidden relative">
                {/* Top HUD Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 border-b border-white/10 bg-[#040B14]/70 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      {heroProduct.name} — {heroProduct.volume}
                    </span>
                  </div>

                  <button
                    onClick={() => setHeroHotspots(!heroHotspots)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition flex items-center gap-1.5 ${
                      heroHotspots
                        ? 'bg-cyan-400 text-slate-950 border-cyan-300'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {heroHotspots ? 'Points d’Inspection Actifs' : 'Afficher Points d’Inspection'}
                  </button>
                </div>

                {/* Authentic UGC Image Viewport */}
                <div className="relative h-[430px] sm:h-[500px] w-full">
                  <UGCProductViewer
                    imageSrc={heroProduct.ugcImage}
                    productName={heroProduct.name}
                    subtitle={heroProduct.subtitle}
                    volume={heroProduct.volume}
                    badge={heroProduct.badge}
                    ugcContext={heroProduct.ugcContext}
                    ugcHighlight={heroProduct.ugcHighlight}
                    accentColor={heroProduct.labelAccent}
                    ph={heroProduct.specs.ph}
                    activeMatter={heroProduct.specs.activeMatter}
                    showHotspots={heroHotspots}
                  />
                </div>

                {/* Bottom Product Action Bar inside Hero Stage */}
                <div className="p-4 sm:px-6 bg-[#040B14]/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-cyan-300">{heroProduct.subtitle}</div>
                    <div className="text-[11px] text-slate-400">
                      {heroProduct.specs.palletCapacity} • Réf. {heroProduct.code}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setModalProduct(heroProduct)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-slate-200 transition"
                    >
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      Fiche Technique
                    </button>
                    <button
                      onClick={() => handleAddProductToQuote(heroProduct)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 text-xs font-black hover:brightness-110 transition"
                    >
                      {justAddedId === heroProduct.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Palette Ajoutée !
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3.5 h-3.5" />
                          + Devis B2B
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE COMPLET AVEC PHOTOS UGC ÉTIQUETÉES AMAL */}
      <section
        id="catalogue"
        className="py-24 border-t border-white/10 bg-gradient-to-b from-[#040B14] via-[#061121] to-[#040B14]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
                <FlaskConical className="w-3.5 h-3.5" />
                Catalogue Officiel • Visuels Produits Réels Étiquetés AMAL
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Nos Gammes Détergents{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  & Savonnerie AMAL
                </span>
              </h2>
            </div>

            <p className="text-slate-400 max-w-md text-sm">
              Sélectionnez n’importe quel produit étiqueté AMAL pour inspecter son conditionnement
              en haute définition, sa composition chimique et ses données de palettisation.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 border-transparent shadow-lg shadow-cyan-500/20'
                    : 'bg-[#071324] text-slate-300 border-white/10 hover:border-cyan-500/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Master-Detail Split Layout: Left = Sticky UGC Product Inspector, Right = Product Photo Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sticky UGC Product Inspector */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 rounded-3xl border border-cyan-500/30 bg-[#071324] overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#040B14]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block">
                    FICHE D’INSPECTION PRODUIT • {activeCatalogProduct.code}
                  </span>
                  <h3 className="text-base font-black text-white">{activeCatalogProduct.name}</h3>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
                  Étiqueté AMAL
                </span>
              </div>

              <div className="h-[360px] w-full relative">
                <UGCProductViewer
                  imageSrc={activeCatalogProduct.ugcImage}
                  productName={activeCatalogProduct.name}
                  subtitle={activeCatalogProduct.subtitle}
                  volume={activeCatalogProduct.volume}
                  badge={activeCatalogProduct.badge}
                  ugcContext={activeCatalogProduct.ugcContext}
                  ugcHighlight={activeCatalogProduct.ugcHighlight}
                  accentColor={activeCatalogProduct.labelAccent}
                  ph={activeCatalogProduct.specs.ph}
                  activeMatter={activeCatalogProduct.specs.activeMatter}
                  showHotspots={true}
                />
              </div>

              {/* Inspector Specs Summary */}
              <div className="p-5 space-y-4 border-t border-white/10 bg-[#040B14]/70">
                <div>
                  <span className="text-xs font-bold text-cyan-300 block">
                    {activeCatalogProduct.subtitle}
                  </span>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {activeCatalogProduct.shortDesc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#071324] border border-white/10">
                    <span className="text-[10px] text-slate-400 block">pH & Formule</span>
                    <span className="font-bold text-white">{activeCatalogProduct.specs.ph}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#071324] border border-white/10">
                    <span className="text-[10px] text-slate-400 block">Matière Active</span>
                    <span className="font-bold text-emerald-400">
                      {activeCatalogProduct.specs.activeMatter}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#071324] border border-white/10">
                    <span className="text-[10px] text-slate-400 block">Palettisation</span>
                    <span className="font-bold text-cyan-300">
                      {activeCatalogProduct.specs.palletCapacity}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#071324] border border-white/10">
                    <span className="text-[10px] text-slate-400 block">Tarif B2B Indicatif</span>
                    <span className="font-bold text-amber-300">
                      {activeCatalogProduct.unitPriceHT.toFixed(2)} € HT / u.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <button
                    onClick={() => setModalProduct(activeCatalogProduct)}
                    className="flex-1 py-3 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-bold text-white flex items-center justify-center gap-2 transition"
                  >
                    <FileText className="w-4 h-4 text-cyan-400" />
                    Fiche Technique (FDS)
                  </button>
                  <button
                    onClick={() => handleAddProductToQuote(activeCatalogProduct)}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 text-xs font-black flex items-center justify-center gap-2 hover:brightness-110 transition"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Ajouter au Devis
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Product Grid Cards with Authentic AMAL UGC Images */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredProducts.map((product) => {
                const isSelected = activeCatalogProduct.id === product.id;
                const isJustAdded = justAddedId === product.id;
                return (
                  <div
                    key={product.id}
                    onClick={() => setActiveCatalogProduct(product)}
                    className={`group cursor-pointer rounded-2xl border overflow-hidden transition flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-b from-cyan-950/50 to-[#071324] border-cyan-400 shadow-xl shadow-cyan-500/15'
                        : 'bg-[#071324]/85 border-white/10 hover:border-cyan-500/40'
                    }`}
                  >
                    <div>
                      {/* High-Impact UGC Product Image Header */}
                      <div className="relative h-56 w-full overflow-hidden bg-[#040B14]">
                        <img
                          src={product.ugcImage}
                          alt={`${product.name} étiqueté AMAL`}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-transparent to-black/30" />

                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          <span
                            className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-md"
                            style={{ backgroundColor: product.labelAccent }}
                          >
                            {product.badge}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-[#040B14]/85 border border-white/15 backdrop-blur-md text-[10px] font-mono font-bold text-slate-200">
                            {product.code}
                          </span>
                        </div>

                        {isSelected && (
                          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-cyan-400 text-slate-950 text-[10px] font-black uppercase shadow-lg">
                            En Inspection
                          </div>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="p-5 pb-0">
                        <h3 className="text-lg font-black text-white">{product.name}</h3>
                        <p className="text-xs font-semibold text-cyan-300 mt-0.5">
                          {product.subtitle}
                        </p>
                        <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                          {product.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-5 pt-4 mt-4 border-t border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium">{product.volume}</span>
                        <span className="font-bold text-emerald-400">
                          {product.specs.activeMatter}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalProduct(product);
                          }}
                          className="px-3 py-2 rounded-xl bg-[#040B14] border border-white/10 hover:border-white/25 text-xs font-semibold text-slate-300 transition"
                        >
                          FDS / Specs
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddProductToQuote(product);
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                        >
                          {isJustAdded ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              Ajouté au Devis !
                            </>
                          ) : (
                            <>
                              <PlusCircle className="w-3.5 h-3.5" />
                              + 1 Palette au Devis
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE B2B & PACKAGING STUDIO WITH AMAL UGC PHOTOS */}
      <B2BConfigurator onAddCustomToQuote={handleAddCustomToQuote} />

      {/* INDUSTRIAL MANUFACTURING & R&D LABORATORY */}
      <FactorySection />

      {/* B2B QUOTE SIMULATOR & CONTAINER LOAD CALCULATOR */}
      <QuoteSection
        catalogEntries={quoteCatalog}
        customEntries={quoteCustom}
        onUpdateCatalogPallets={handleUpdateCatalogPallets}
        onRemoveCatalogEntry={handleRemoveCatalogEntry}
        onRemoveCustomEntry={handleRemoveCustomEntry}
        onAddQuickProduct={handleAddProductToQuote}
      />

      {/* TECHNICAL DATA SHEET MODAL */}
      <TechnicalSheetModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAddToQuote={handleAddProductToQuote}
      />

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#02060D] py-16 text-sm text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Col 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center text-slate-950 font-black">
                  A
                </div>
                <span className="text-xl font-black text-white">
                  AMAL <span className="text-cyan-400 text-sm font-bold">INDUSTRIE</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complexe industriel spécialisé dans la fabrication de détergents liquides et
                poudres, désinfectants professionnels et savons traditionnels 72% huiles végétales.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                ISO 9001 • ISO 14001 • HACCP
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Gammes de Fabrication AMAL
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#catalogue" className="hover:text-cyan-400 transition">
                    Lessives Liquides Enzymatiques & Poudres
                  </a>
                </li>
                <li>
                  <a href="#catalogue" className="hover:text-cyan-400 transition">
                    Liquides Vaisselle Ultra-Concentrés
                  </a>
                </li>
                <li>
                  <a href="#catalogue" className="hover:text-cyan-400 transition">
                    Détergents Dégraissants Industriels CHR (5L / 20L)
                  </a>
                </li>
                <li>
                  <a href="#catalogue" className="hover:text-cyan-400 transition">
                    Désinfectants Virucides & Eau de Javel 12° Chl
                  </a>
                </li>
                <li>
                  <a href="#catalogue" className="hover:text-cyan-400 transition">
                    Savon de Ménage 72% & Savons Liquides Mains
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Services Industriels B2B
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#configurateur-b2b" className="hover:text-cyan-400 transition">
                    Studio Packaging AMAL & Marque Blanche (MDD)
                  </a>
                </li>
                <li>
                  <a href="#usine-procédé" className="hover:text-cyan-400 transition">
                    Soufflage Flacons PEHD & PET Sur-Mesure
                  </a>
                </li>
                <li>
                  <a href="#usine-procédé" className="hover:text-cyan-400 transition">
                    Formulation Chimique & Laboratoire R&D
                  </a>
                </li>
                <li>
                  <a href="#devis-b2b" className="hover:text-cyan-400 transition">
                    Simulateur Logistique Conteneur 20&apos; & 40&apos; HQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Siège & Usine AMAL
              </h4>
              <ul className="space-y-3 text-xs">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    Zone Industrielle & Portuaire, Dakar — Export Afrique de l’Ouest & International
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>+221 33 842 90 00 / +221 77 500 90 00</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>contact-b2b@amal-detergents.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 AMAL Savonnerie & Détergents. Tous droits réservés.</p>
            <p>Photographies Produits Officielles Étiquetées AMAL • Normes CE 648/2004</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
