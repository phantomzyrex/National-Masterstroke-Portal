import React, { useState, useEffect } from 'react';
import { playInaugurationFanfare, playDing, playStampThud } from '../utils/audio';
import { 
  Scissors, 
  Sparkles, 
  RefreshCw, 
  Award, 
  CheckCircle2, 
  Flame, 
  X,
  Camera
} from 'lucide-react';

interface ConfettiPiece {
  id: number;
  x: number; // percentage (0-100)
  y: number; // initial vertical offset
  speed: number;
  size: number;
  color: string;
  char?: string;
  rotation: number;
  rotationSpeed: number;
  drift: number;
}

const DIGITAL_INDIA_CHARS = [
  '₹', '💾', '🌺', '☕', '🇮🇳', '15L', '56"', '420', 'NIC', 'VIKAS', '01', 'MODEM', 'AURA'
];

const CONFETTI_COLORS = [
  '#FF9933', // Saffron
  '#FFFFFF', // White
  '#138808', // India Green
  '#000080', // Navy Ashoka
  '#FFD700', // Gold
  '#FF0055', // Neon Pink
  '#00FFFF', // Cyber Cyan
  '#FFFF00', // Neon Yellow
];

interface InaugurationOverlayProps {
  onInaugurated?: () => void;
}

export const InaugurationOverlay: React.FC<InaugurationOverlayProps> = ({ onInaugurated }) => {
  const [isCut, setIsCut] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [showPlaque, setShowPlaque] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inaugurationCount, setInaugurationCount] = useState(1);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [cameraFlash, setCameraFlash] = useState(false);

  // Generate 75 pixelated "Digital India" confetti particles on ribbon cut
  const triggerConfettiShower = () => {
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 85; i++) {
      const isChar = Math.random() > 0.45;
      pieces.push({
        id: i,
        x: Math.random() * 100,
        y: -(Math.random() * 20 + 5),
        speed: 2.2 + Math.random() * 4.5,
        size: isChar ? 12 + Math.random() * 10 : 8 + Math.random() * 10,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        char: isChar ? DIGITAL_INDIA_CHARS[Math.floor(Math.random() * DIGITAL_INDIA_CHARS.length)] : undefined,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        drift: (Math.random() - 0.5) * 1.8,
      });
    }
    setConfetti(pieces);

    // Stop confetti generation after 7 seconds
    setTimeout(() => {
      setConfetti([]);
    }, 8500);
  };

  // Animate confetti falling
  useEffect(() => {
    if (confetti.length === 0) return;

    const interval = setInterval(() => {
      setConfetti((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y + p.speed,
            x: Math.max(0, Math.min(100, p.x + p.drift)),
            rotation: p.rotation + p.rotationSpeed,
          }))
          .filter((p) => p.y < 110)
      );
    }, 45);

    return () => clearInterval(interval);
  }, [confetti]);

  const handleCutRibbon = () => {
    if (isCutting || isCut) return;
    setIsCutting(true);

    // Play snip and fanfare
    playInaugurationFanfare();

    // Trigger visual camera flash
    setCameraFlash(true);
    setTimeout(() => setCameraFlash(false), 200);

    setTimeout(() => {
      setIsCut(true);
      setIsCutting(false);
      setShowPlaque(true);
      triggerConfettiShower();
      if (onInaugurated) onInaugurated();
    }, 400);
  };

  const handleReInaugurate = () => {
    playDing();
    setIsCut(false);
    setShowPlaque(false);
    setIsMinimized(false);
    setInaugurationCount((prev) => prev + 1);
  };

  const handleSnapPhoto = () => {
    playStampThud();
    setCameraFlash(true);
    setTimeout(() => setCameraFlash(false), 180);
    triggerConfettiShower();
  };

  return (
    <>
      {/* Visual Camera Flash Effect on Inauguration */}
      {cameraFlash && (
        <div className="fixed inset-0 bg-white z-[9999] pointer-events-none opacity-90 animate-out fade-out duration-300" />
      )}

      {/* Falling Pixelated "Digital India" Confetti Particles */}
      {confetti.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
          {confetti.map((p) => (
            <div
              key={p.id}
              className="absolute select-none font-mono font-black"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: `rotate(${p.rotation}deg)`,
                color: p.color,
                fontSize: `${p.size}px`,
                textShadow: '1px 1px 0px #000000',
              }}
            >
              {p.char ? (
                <span className="inline-block px-0.5 bg-black/40 border border-yellow-300/60 rounded-xs">
                  {p.char}
                </span>
              ) : (
                <div
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size * 0.75}px`,
                    backgroundColor: p.color,
                    border: '1px solid #000',
                    boxShadow: '1px 1px 0px #000',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* TOP INAUGURATION RIBBON OR DEDICATION PLAQUE */}
      {!isMinimized && (
        <div className="relative z-50 w-full font-mono text-xs select-none">
          
          {/* STATE A: UNCUT CEREMONIAL RIBBON */}
          {!isCut && (
            <div 
              id="ceremonial-ribbon-bar"
              className="relative w-full bg-black text-white border-b-4 border-yellow-400 shadow-2xl overflow-hidden group"
            >
              {/* Saffron, White, Green Tricolor Silk Ribbons */}
              <div className="h-2 w-full bg-[#FF9933]" />
              <div className="h-2 w-full bg-white flex items-center justify-around overflow-hidden">
                <span className="text-[7px] text-[#000080] font-black">☸ ☸ ☸ ☸ ☸ ☸ ☸ ☸ ☸ ☸ ☸ ☸ ☸ ☸ ☸ ☸</span>
              </div>
              <div className="h-2 w-full bg-[#138808]" />

              {/* Main Ceremonial Banner Body */}
              <div className="bg-gradient-to-r from-red-900 via-red-800 to-amber-900 px-3 py-2 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2 border-y-2 border-yellow-300">
                
                {/* Left Marigold Garland & Label */}
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-xl sm:text-2xl animate-pulse">🌺</span>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="bg-yellow-400 text-black px-1.5 py-0.2 text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                        PHASE {inaugurationCount} PRE-INAUGURATION
                      </span>
                      <span className="text-yellow-300 text-[10px] font-bold blink-fast">
                        [CEREMONIAL RIBBON INTACT]
                      </span>
                    </div>
                    <div className="text-[11px] sm:text-xs font-black text-yellow-100 uppercase tracking-tight mt-0.5">
                      VIRTUAL DEDICATION OF PORTAL BY DIGITAL REMOTE CONTROL
                    </div>
                  </div>
                </div>

                {/* Center Ceremonial Gold Scissors Button */}
                <button
                  id="cut-ribbon-btn"
                  onClick={handleCutRibbon}
                  disabled={isCutting}
                  className={`relative px-4 sm:px-6 py-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 text-red-950 font-black text-xs sm:text-sm border-2 border-black shadow-[4px_4px_0px_#000000] hover:bg-yellow-200 active:scale-95 transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
                    isCutting ? 'opacity-50' : 'animate-bounce'
                  }`}
                  title="Click to cut the ceremonial ribbon and shower Digital India confetti!"
                >
                  <Scissors className={`w-5 h-5 text-red-900 ${isCutting ? 'rotate-90' : '-rotate-45'}`} />
                  <span className="tracking-wider uppercase">
                    {isCutting ? 'SNIPPING RIBBON...' : '✂️ CUT CEREMONIAL RIBBON'}
                  </span>
                  <Sparkles className="w-4 h-4 text-orange-700 animate-spin" />
                </button>

                {/* Right VIP Protocol Notice */}
                <div className="hidden md:flex items-center space-x-2 text-[10px] text-yellow-200 shrink-0">
                  <div className="text-right leading-tight">
                    <span className="text-white font-bold block">CHIEF GUEST: 2D MODI AVATAR</span>
                    <span className="text-yellow-400 font-mono">Tender Sanction: ₹42,069 Cr</span>
                  </div>
                  <span className="text-xl">🌺</span>
                </div>
              </div>

              {/* Bottom Golden Fringe Tassels */}
              <div className="h-1.5 w-full bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-500 flex justify-between px-1">
                {Array.from({ length: 40 }).map((_, idx) => (
                  <span key={idx} className="text-[8px] text-yellow-800 leading-none">▼</span>
                ))}
              </div>
            </div>
          )}

          {/* STATE B: CUT RIBBON WITH DEDICATION FOUNDATION STONE PLAQUE */}
          {isCut && showPlaque && (
            <div 
              id="foundation-stone-plaque"
              className="w-full bg-[#1c1c1c] text-yellow-200 border-b-4 border-yellow-500 shadow-2xl p-3 sm:p-4 animate-in slide-in-from-top-4 duration-500"
            >
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Granite Plaque Emblem & Inscription */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-yellow-400 bg-gradient-to-b from-orange-600 to-amber-700 flex flex-col items-center justify-center p-1 text-center shrink-0 shadow-inner">
                    <span className="text-lg sm:text-xl">🏛️</span>
                    <span className="text-[7px] text-yellow-100 font-black leading-none uppercase">DEDICATED</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-green-700 text-white text-[9px] font-black px-2 py-0.5 border border-yellow-300 uppercase flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-yellow-300" />
                        RIBBON CUT SUCCESSFULLY (PHASE {inaugurationCount})
                      </span>
                      <span className="text-yellow-400 text-[10px] font-mono">
                        REF: GAZETTE-INAUG-2026-X
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider mt-1">
                      THIS SATIRICAL PORTAL HAS BEEN DEDICATED TO THE NATION BY VIRTUAL REMOTE CONTROL
                    </h3>

                    <p className="text-[10px] sm:text-[11px] text-gray-300 font-sans mt-0.5 leading-snug">
                      Solemnly unveiled in the presence of 1.4 Billion taxpayers, opposition walkouts, and the 2D Modi Avatar live telemetry feed.
                    </p>
                  </div>
                </div>

                {/* Plaque Action Controls */}
                <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                  {/* Photo-op flash button */}
                  <button
                    onClick={handleSnapPhoto}
                    className="win95-btn px-2.5 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs flex items-center space-x-1"
                    title="Trigger press flash & confetti shower"
                  >
                    <Camera className="w-3.5 h-3.5 text-red-900" />
                    <span>PRESS PHOTO-OP</span>
                  </button>

                  {/* Re-inaugurate button (parodying multiple inaugurations) */}
                  <button
                    id="re-inaugurate-btn"
                    onClick={handleReInaugurate}
                    className="win95-btn px-2.5 py-1.5 bg-blue-800 hover:bg-blue-700 text-yellow-200 font-black text-xs flex items-center space-x-1 border border-yellow-400"
                    title="Government projects are inaugurated 4-5 times! Re-tie the ribbon for Phase 15!"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-yellow-300" />
                    <span>RE-INAUGURATE (PHASE {inaugurationCount + 1})</span>
                  </button>

                  {/* Minimize Plaque button */}
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="win95-btn px-2 py-1.5 bg-gray-800 hover:bg-red-800 text-white font-bold text-xs"
                    title="Minimize dedication plaque"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* MINIMIZED INAUGURATION BADGE (IN CASE USER MINIMIZES PLAQUE) */}
      {isMinimized && (
        <div className="fixed top-0 right-1/2 translate-x-1/2 z-50 bg-black/90 text-yellow-300 border-2 border-yellow-400 px-3 py-1 font-mono text-[10px] font-black shadow-lg flex items-center space-x-2">
          <span className="text-green-400">✓ VIRTUAL RIBBON CUT (PHASE {inaugurationCount})</span>
          <button
            onClick={() => setIsMinimized(false)}
            className="text-yellow-400 underline hover:text-white"
          >
            [VIEW PLAQUE / RE-INAUGURATE]
          </button>
        </div>
      )}
    </>
  );
};
