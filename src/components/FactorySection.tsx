'use client';

import React, { useState } from 'react';
import {
  FlaskConical,
  Factory,
  Box,
  Cpu,
  ShieldCheck,
  Award,
  Activity,
  Droplets,
  Recycle,
  Globe2,
  CheckCircle2,
} from 'lucide-react';
import { MANUFACTURING_STEPS } from '@/data/products';

const ICONS_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical,
  Factory,
  Box,
  Cpu,
  ShieldCheck,
};

export default function FactorySection() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const currentStep = MANUFACTURING_STEPS[activeStepIdx];

  return (
    <section
      id="usine-procédé"
      className="py-24 relative border-t border-white/10 bg-gradient-to-b from-[#040B14] via-[#061325] to-[#040B14]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Factory className="w-3.5 h-3.5" />
            Complexe Industriel Intégré & Laboratoire R&D AMAL
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            De la Molécule Détergente au{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Conditionnement Étiqueté AMAL
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            L’unité industrielle AMAL maîtrise l’intégralité de la chaîne de valeur : synthèse et
            saponification, soufflage de flacons PEHD/PET in-situ et lignes d’embouteillage haute
            cadence certifiées ISO 9001 & ISO 14001.
          </p>
        </div>

        {/* Interactive 5-Step Industrial Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {MANUFACTURING_STEPS.map((st, idx) => {
              const IconComp = ICONS_MAP[st.iconName] || Factory;
              const isActive = activeStepIdx === idx;
              return (
                <button
                  key={st.step}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition flex items-start gap-4 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/15 to-emerald-500/10 border-cyan-400 shadow-lg shadow-cyan-500/10'
                      : 'bg-[#071324]/70 border-white/10 hover:border-white/25'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-black text-sm ${
                      isActive
                        ? 'bg-cyan-400 text-slate-950'
                        : 'bg-white/5 text-cyan-400 border border-white/10'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        ÉTAPE {st.step}
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                        {st.metric}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{st.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{st.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Telemetry & Authentic AMAL Lab/Factory Photo */}
          <div className="lg:col-span-7 rounded-3xl border border-cyan-500/25 bg-[#071324] overflow-hidden shadow-2xl">
            {/* Real Photo of AMAL Factory & Quality Lab */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src="images/products/amal-factory-lab.jpg"
                alt="Laboratoire Contrôle Qualité et Cuves Inox AMAL"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-[#071324]/30 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-[#040B14]/85 border border-cyan-400/40 backdrop-blur-md text-xs font-bold text-cyan-300 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Unité de Production & Laboratoire AMAL
              </div>
              <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block">
                    SUPERVISION INDUSTRIELLE • UNITÉ AMAL #{currentStep.step}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                    {currentStep.title}
                  </h3>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  {currentStep.temp}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-4">
              {/* Interactive Process Schematic Diagram */}
              <div className="p-5 rounded-2xl bg-[#040B14] border border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                      Cadence & Capacité
                    </span>
                    <span className="text-base font-black text-cyan-300 mt-1 block">
                      {currentStep.metric}
                    </span>
                    <div className="w-full h-1.5 bg-white/10 rounded-full mt-2.5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${75 + activeStepIdx * 5}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                      Contrôle Automatisé
                    </span>
                    <span className="text-base font-black text-white mt-1 block">
                      Cuves Inox AMAL
                    </span>
                    <span className="text-xs text-emerald-400 mt-1.5 block font-medium">
                      ✓ Dosage Gravimétrique Continu
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                      Traçabilité Lot
                    </span>
                    <span className="text-base font-black text-amber-300 mt-1 block">
                      ISO 9001 : 2015
                    </span>
                    <span className="text-xs text-slate-400 mt-1.5 block">
                      Échantillothèque 36 mois
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-5">
                  {currentStep.description}
                </p>

                <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Zéro rejet liquide non traité (Station NEP interne)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Conformité FDS & Réglementation Détergents CE 648/2004</span>
                  </div>
                </div>
              </div>

              {/* 4 Pillars of AMAL Quality */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <Droplets className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <div className="text-xs font-black text-white">Eau Osmosée</div>
                  <div className="text-[10px] text-slate-400">Pureté Microbiologique</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <Recycle className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <div className="text-xs font-black text-white">&gt; 95% Bio</div>
                  <div className="text-[10px] text-slate-400">Tensioactifs Biodégradables</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <Award className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-xs font-black text-white">72% Végétal</div>
                  <div className="text-[10px] text-slate-400">Maître Savonnier AMAL</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <Globe2 className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                  <div className="text-xs font-black text-white">Export B2B</div>
                  <div className="text-[10px] text-slate-400">Conteneurs 20&apos; & 40&apos; HQ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
