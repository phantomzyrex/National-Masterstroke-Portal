import React from 'react';
import { HardHat, Flame, Construction, Sparkles, RefreshCw } from 'lucide-react';

interface UnderConstructionBannerProps {
  onBoostClick: () => void;
}

export const UnderConstructionBanner: React.FC<UnderConstructionBannerProps> = ({ onBoostClick }) => {
  return (
    <div className="w-full my-3 px-2 sm:px-4">
      {/* Top Hazard Border */}
      <div className="h-3 w-full hazard-stripes border-y-2 border-black" />

      {/* Retro 90s Construction Box */}
      <div className="win95-box p-3 sm:p-4 bg-[#c0c0c0] text-black">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Animated Pickaxe Construction Icon */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="relative w-14 h-14 bg-yellow-400 border-2 border-black p-2 flex items-center justify-center shadow-lg">
              <Construction className="w-10 h-10 text-black animate-bounce" />
              <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] font-black px-1 border border-black blink-fast">
                WIP!
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <HardHat className="w-4 h-4 text-orange-600" />
                <span className="font-black text-red-700 uppercase tracking-wider text-xs sm:text-sm">
                  ATTENTION CITIZEN: VIKAS IS CURRENTLY UNDER CONSTRUCTION
                </span>
              </div>
              <p className="text-xs text-blue-950 font-bold max-w-xl">
                Foundation stone laid in 2014. File forwarded to 19 inter-departmental empowered committees. 
                Expected delivery target: <span className="text-red-600 underline font-black">2047 (Subject to election rally dates & weather forecast)</span>.
              </p>
            </div>
          </div>

          {/* Sarcastic Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="emergency-boost-vikas-btn"
              onClick={onBoostClick}
              className="win95-btn px-3 py-2 bg-yellow-300 hover:bg-yellow-400 text-black flex items-center gap-1.5 text-xs font-black shadow-md border-2 border-black"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>BOOST VIKAS SPEED (+50% RHETORIC)</span>
            </button>
            <div className="bg-red-600 text-yellow-200 text-xs px-2 py-1 font-black flex items-center gap-1 border border-black shadow">
              <Flame className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span className="blink-fast">HOT! 100% UNEMPLOYMENT FREE PROMISES</span>
            </div>
          </div>

        </div>

        {/* 90s Flashing Sub-marquee */}
        <div className="mt-2 pt-2 border-t-2 border-gray-400 flex flex-wrap items-center justify-between text-[11px] font-bold text-blue-900 gap-2">
          <div className="flex items-center gap-1 text-red-600">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            <span>EXCAVATION DEPTH: -2.5 LAKH CRORES</span>
          </div>
          <div className="bg-yellow-200 px-2 py-0.5 border border-black text-black">
            POWERED BY: NIC SERVER CLUSTER (RUNNING WINDOWS 95 ON A 56K DIALUP MODEM)
          </div>
          <div className="text-green-800">
            ALL DISPUTES SUBJECT TO JURISDICTION OF TELEPROMPTER SCREEN ONLY
          </div>
        </div>
      </div>

      {/* Bottom Hazard Border */}
      <div className="h-3 w-full hazard-stripes border-y-2 border-black" />
    </div>
  );
};
