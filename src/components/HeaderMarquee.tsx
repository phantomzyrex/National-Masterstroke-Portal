import React, { useState, useEffect } from 'react';
import { RETRO_TICKERS } from '../data/parodyData';
import { Volume2, VolumeX, AlertTriangle, ShieldCheck, Flame, Radio, Disc3 } from 'lucide-react';
import { toggleMute, isMuted, playDing } from '../utils/audio';
import { nightmareAnthem } from '../utils/nightmareAnthem';

interface HeaderMarqueeProps {
  onGlitchTrigger: () => void;
  glitchCount: number;
  onOpenAnthemPlayer?: () => void;
}

export const HeaderMarquee: React.FC<HeaderMarqueeProps> = ({ onGlitchTrigger, glitchCount, onOpenAnthemPlayer }) => {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [muted, setMuted] = useState(isMuted());
  const [timeString, setTimeString] = useState('');
  const [visitorCount, setVisitorCount] = useState(420786);
  const [isAnthemPlaying, setIsAnthemPlaying] = useState(false);

  useEffect(() => {
    const unsub = nightmareAnthem.subscribe((state) => {
      setIsAnthemPlaying(state.isPlaying);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    // Ticker rotation
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % RETRO_TICKERS.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Bureaucratic delay clock (shows year 2047 or current time + 47 hours late)
    const timer = setInterval(() => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-IN', {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAudioToggle = () => {
    const nextMuted = toggleMute();
    setMuted(nextMuted);
    if (!nextMuted) {
      playDing();
    }
  };

  const handleCounterClick = () => {
    setVisitorCount((c) => c + 1);
    playDing();
    onGlitchTrigger();
  };

  return (
    <header className="w-full bg-[#000080] border-b-4 border-yellow-400 text-yellow-300 font-mono select-none">
      {/* Top 90s Flashing Marquee Bar */}
      <div className="bg-red-700 text-white font-bold py-1.5 px-2 border-b-2 border-yellow-300 overflow-hidden flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center space-x-2 shrink-0 bg-yellow-400 text-black px-2 py-0.5 font-black uppercase text-xs animate-pulse">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>URGENT NIC ADVISORY:</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap w-full ml-3">
          <div className="animate-marquee-text font-mono text-yellow-200 tracking-wide font-bold">
            {RETRO_TICKERS[tickerIndex]}
          </div>
        </div>
        <div className="shrink-0 ml-2 hidden md:flex items-center space-x-2 text-[10px] text-yellow-200">
          <span>PORTAL VER: 1.0.1998 (PATCH 56)</span>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="max-w-7xl mx-auto p-2 sm:p-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Logo & Emblems */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Parody Emblem with Secret 8-Bit Anthem Trigger */}
            <div 
              onClick={() => {
                nightmareAnthem.toggle();
                if (onOpenAnthemPlayer) onOpenAnthemPlayer();
              }}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-b from-yellow-300 via-orange-400 to-yellow-600 rounded-full border-4 border-yellow-200 flex flex-col items-center justify-center p-1 shadow-2xl relative shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition-transform group"
              title="SECRET AUDIO: Click emblem to toggle 8-bit nightmarish patriotic anthem!"
            >
              <div className="text-[10px] font-black text-blue-900 uppercase tracking-tighter">सत्यमेव</div>
              <div className="text-xl sm:text-2xl">☕</div>
              <div className="text-[9px] font-bold text-red-900 tracking-tighter">JUMLA JAYATE</div>
              <div className="absolute -bottom-2 bg-red-600 text-yellow-100 text-[8px] font-black px-1.5 border border-white flex items-center gap-1">
                {isAnthemPlaying ? <span className="animate-spin">💿</span> : null}
                <span>56-INCH</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-yellow-400 text-black text-[10px] sm:text-xs font-black px-2 py-0.2 border border-black uppercase tracking-wider">
                  OFFICIAL SATIRICAL GRIEVANCE PORTAL
                </span>
                <span className="text-red-400 text-xs font-bold blink-fast flex items-center gap-1">
                  <Flame className="w-3 h-3 text-orange-400" /> 100% UNSCRIPTED FREE ZONE
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-[2px_2px_0px_#ff0000] font-sans uppercase">
                NATIONAL MASTERSTROKE PORTAL
              </h1>
              <p className="text-xs sm:text-sm text-cyan-300 font-mono tracking-tight">
                Ministry of Unilateral Monologues, PowerPoint Nirmaan & Opposition Eye Audits
              </p>
            </div>
          </div>

          {/* 90s Gadgets Box: Sound, Clock, Hit Counter */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 sm:gap-3 text-xs">
            
            {/* Sound Effects Audio Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={handleAudioToggle}
              className="win95-btn px-2 py-1.5 flex items-center space-x-1 text-black bg-[#c0c0c0] hover:bg-yellow-200 transition-colors"
              title="Toggle retro Windows SoundBlaster 16 SFX"
            >
              {muted ? <VolumeX className="w-3.5 h-3.5 text-red-600" /> : <Volume2 className="w-3.5 h-3.5 text-green-700 animate-pulse" />}
              <span className="text-[10px]">SFX: {muted ? 'OFF' : 'ON'}</span>
            </button>

            {/* Hidden / Secret 8-Bit Anthem Trigger */}
            <button
              id="secret-anthem-header-btn"
              onClick={() => {
                nightmareAnthem.toggle();
                if (onOpenAnthemPlayer) onOpenAnthemPlayer();
              }}
              className={`win95-btn px-2 py-1.5 flex items-center space-x-1 font-black text-[10px] transition-all border ${
                isAnthemPlaying
                  ? 'bg-red-800 text-yellow-300 border-yellow-300 animate-pulse'
                  : 'bg-[#d0d0d0] hover:bg-yellow-100 text-black border-gray-600'
              }`}
              title="Hidden 8-Bit Low-Quality Patriotic Anthem MIDI Player"
            >
              <Radio className={`w-3.5 h-3.5 ${isAnthemPlaying ? 'text-yellow-300 animate-bounce' : 'text-blue-900'}`} />
              <span>{isAnthemPlaying ? '🔴 8-BIT ANTHEM (ON)' : '8-BIT ANTHEM [MID]'}</span>
            </button>

            {/* Bureaucratic Clock */}
            <div className="win95-box-inset px-2.5 py-1 text-black bg-white flex flex-col items-center">
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">BUREAUCRATIC DELAY TIME</span>
              <span className="font-mono font-bold text-red-600 text-xs sm:text-sm tracking-widest">
                {timeString || '12:00:00 AM'} <span className="text-[9px] text-blue-700">(+47 YRS)</span>
              </span>
            </div>

            {/* Visitor Counter */}
            <div 
              id="hit-counter-box"
              onClick={handleCounterClick}
              className="win95-box p-1 text-center cursor-pointer hover:border-yellow-400"
              title="Click to inflate patriot visitor stats!"
            >
              <div className="text-[9px] text-blue-900 font-black">HIT COUNTER</div>
              <div className="bg-black text-lime-400 font-mono font-black text-sm px-2 tracking-widest border border-gray-600 shadow-inner">
                {String(visitorCount + glitchCount).padStart(10, '0')}
              </div>
            </div>

          </div>

        </div>

        {/* 90s Netscape & IE4 Warning Ribbon */}
        <div className="mt-2 pt-1 border-t border-blue-800 flex flex-wrap items-center justify-between text-[10px] text-yellow-300/80 gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-950 px-1 border border-cyan-400 text-cyan-300">
              OPTIMIZED FOR NETSCAPE COMMUNICATOR 4.08 & INTERNET EXPLORER 5.0
            </span>
            <span className="hidden sm:inline">RESOLUTION: 800 x 600 @ 256 COLORS</span>
          </div>
          <div className="flex items-center space-x-2 text-lime-300">
            <ShieldCheck className="w-3 h-3 text-lime-400" />
            <span>CERTIFIED ERROR-FREE BY TELEPROMPTER PROTOCOL 2014</span>
          </div>
        </div>
      </div>
    </header>
  );
};
