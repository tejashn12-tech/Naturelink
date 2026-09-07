import React from 'react';
import { ArrowRight, ArrowUpRight, Sparkles, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface HeroSectionProps {
  onOpenQuote: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenQuote,
  onExploreServices,
}) => {
  return (
    <section id="home" className="w-full px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto pt-2 pb-8 sm:pb-12">
      {/* Huge Modernist Brand Title with drop shadow */}
      <div className="w-full select-none overflow-hidden">
        <h1 className="text-[54px] sm:text-[84px] md:text-[110px] lg:text-[142px] font-black tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 leading-[0.88] lowercase drop-shadow-lg">
          {STORE_INFO.displayTitle}
        </h1>
      </div>

      {/* Hero Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mt-6 sm:mt-8">
        {/* Left Column: Headline, subtext, and pill buttons */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium w-fit mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct Nursery & Botanical Logistics in Mysuru</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-white leading-snug tracking-tight drop-shadow-md">
            Curated botanical supply & natural living decor from Karnataka
          </h2>

          <p className="text-sm sm:text-[15px] text-neutral-300 leading-relaxed mt-3 max-w-lg">
            Direct farm procurement, organic extracts, artisanal terracotta, and mature specimen plants delivered across Mysuru, Mandya, and Bengaluru with zero root shock.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-6 sm:mt-8">
            <button
              onClick={onOpenQuote}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold pl-5 pr-2 py-3 rounded-full flex items-center gap-3 transition-all shadow-lg active:scale-95 cursor-pointer group"
            >
              <span>Calculate delivery</span>
              <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </span>
            </button>

            <button
              onClick={onExploreServices}
              className="bg-neutral-900/70 hover:bg-neutral-800 text-white border border-white/20 text-xs sm:text-sm font-semibold px-5 py-3 rounded-full flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <span>All services</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-300" />
            </button>
          </div>

          {/* Reassurance Tags */}
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10 text-xs text-neutral-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Healthy Flora</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Daily Mysuru Routes</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Glass Card */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          <div className="w-full relative rounded-3xl overflow-hidden bg-neutral-900/60 backdrop-blur-xl border border-white/10 p-4 sm:p-6 lg:p-8 flex flex-col justify-end min-h-[300px] sm:min-h-[380px] lg:min-h-[420px] shadow-2xl">
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-full relative flex items-end justify-center">
                <div className="w-full max-w-xl relative flex items-end justify-between gap-2 sm:gap-4">
                  {/* Left Crate Group */}
                  <div className="relative flex flex-col items-start z-10">
                    <div className="bg-[#c29b6f]/90 text-neutral-950 border border-[#a88257] p-2.5 sm:p-3 rounded-lg shadow-md w-28 sm:w-36 text-center transform -rotate-1 relative backdrop-blur-sm">
                      <span className="text-[10px] font-mono tracking-widest text-[#523d24] block uppercase">FRAGILE BOTANICAL</span>
                      <span className="text-xs sm:text-sm font-black tracking-wider block text-neutral-900 uppercase">NATURELINK</span>
                      <div className="mt-1 flex justify-center items-center gap-1 text-[9px] text-[#523d24]">
                        <span>MYSURU</span>
                        <span>•</span>
                        <span>EXP-08</span>
                      </div>
                    </div>

                    <div className="bg-[#b38b5f]/90 text-neutral-950 border border-[#9c754a] p-3 sm:p-4 rounded-lg shadow-lg w-36 sm:w-44 text-center mt-[-6px] relative backdrop-blur-sm">
                      <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#47341e] border-b border-[#9c754a]/40 pb-1 mb-1">
                        <span>ORIGIN: MYSURU</span>
                        <span>KARNATAKA</span>
                      </div>
                      <span className="text-sm sm:text-base font-black tracking-widest block uppercase text-neutral-950">NATURELINK</span>
                      <span className="text-[9px] sm:text-[10px] text-neutral-900 font-medium block">LIVE PLANTS & NATURAL GOODS</span>
                    </div>
                  </div>

                  {/* Right Cargo Container */}
                  <div className="flex-1 relative flex items-end justify-center">
                    <div className="w-full max-w-md bg-neutral-950/80 rounded-xl sm:rounded-2xl border border-white/20 shadow-xl overflow-hidden relative backdrop-blur-md">
                      <div className="bg-neutral-900/90 text-white px-3 sm:px-4 py-2 flex items-center justify-between border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">NATURELINK LOGISTICS</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-neutral-400 font-mono">KA-09 MYSURU</span>
                      </div>

                      <div className="relative h-44 sm:h-56 overflow-hidden flex items-center justify-between p-3 sm:p-4">
                        <img
                          src="https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=900&auto=format&fit=crop"
                          alt="Naturelink live plants cargo"
                          className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        
                        <div className="relative z-10 self-end text-white">
                          <span className="text-xl sm:text-3xl font-black tracking-tight block drop-shadow-sm lowercase">
                            naturelink
                          </span>
                          <p className="text-[11px] sm:text-xs text-neutral-200 font-medium flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-emerald-400" />
                            Mysuru — Karnataka Express Fleet
                          </p>
                        </div>

                        <div className="relative z-10 self-start bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold shadow-sm">
                          Batch #MY-2026
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-300 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                Active Nursery Transit: Mysuru & Bengaluru Belt
              </span>
              <span className="font-mono text-neutral-400">100% Eco-Packed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
