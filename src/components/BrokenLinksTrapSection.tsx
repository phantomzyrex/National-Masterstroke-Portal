import React from 'react';
import { HYPERLINK_TRAPS } from '../data/parodyData';
import { HyperlinkTrap, ErrorModalData } from '../types';
import { playDialupScreech, playErrorBuzz } from '../utils/audio';
import { FileArchive, AlertTriangle, Download, ExternalLink, Flame, ShieldX } from 'lucide-react';

interface BrokenLinksTrapSectionProps {
  onTriggerErrorModal: (modalData: ErrorModalData) => void;
}

export const BrokenLinksTrapSection: React.FC<BrokenLinksTrapSectionProps> = ({ onTriggerErrorModal }) => {
  
  const handleTrapClick = (trap: HyperlinkTrap) => {
    // Alternate sound effects
    if (trap.triggerType === 'teleprompter_down' || trap.triggerType === 'bsod') {
      playDialupScreech();
    } else {
      playErrorBuzz();
    }

    onTriggerErrorModal({
      isOpen: true,
      title: `HYPERLINK TRAP TRIGGERED: ${trap.label.slice(0, 32)}...`,
      code: trap.bureaucraticCode,
      gazetteRef: `VIDE CYBER SURVEILLANCE DIRECTIVE 90s-V4`,
      message: trap.trapMessage,
      babuRemarks: `Administrative Notice: You have clicked a hyperlink designated as "Sensitive Rhetoric". Your browser cookies have been dispatched to the Parliamentary Committee on Mood Elevation.`,
      actionText: `Chant Slogans to Exit Loop`,
      secondaryActionText: `Blame Opposition for Broken URL`,
      severity: trap.triggerType === 'bsod' ? 'critical' : 'warning'
    });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 my-6 font-mono">
      {/* 90s Web Directory Window */}
      <div className="win95-box p-1 bg-[#c0c0c0] shadow-xl border-4 border-[#000080]">
        
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] via-[#0000bb] to-[#000080] text-yellow-300 px-3 py-1.5 flex items-center justify-between font-bold text-xs sm:text-sm">
          <div className="flex items-center space-x-2">
            <FileArchive className="w-4 h-4 text-yellow-300" />
            <span className="text-white">
              NATIONAL HYPERLINK ARCHIVES & PUBLIC DOWNLOAD VAULT (NIC-DELHI-004)
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-yellow-200">
            <span className="blink-fast">⚡ 100% DEAD LINKS GUARANTEED</span>
          </div>
        </div>

        {/* Directory Warning */}
        <div className="bg-yellow-300 text-black px-3 py-1 border-b-2 border-black flex items-center justify-between text-xs font-bold">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-700 shrink-0" />
            <span>
              WARNING: DO NOT CLICK ANY HYPERLINK BELOW UNLESS ACCOMPANIED BY A GAZETTED OFFICER ON A ROTARY DIAL TELEPHONE.
            </span>
          </div>
          <span className="text-[10px] hidden md:inline">FILE STATUS: PERPETUALLY BUFFERING</span>
        </div>

        {/* Links Table Layout (Classic 90s HTML Table style) */}
        <div className="p-3 sm:p-5 bg-white text-black overflow-x-auto">
          <table className="w-full border-collapse border-2 border-black text-xs font-mono">
            <thead>
              <tr className="bg-blue-900 text-yellow-300 border-b-2 border-black">
                <th className="border border-black p-2 text-left">ITEM #</th>
                <th className="border border-black p-2 text-left">OFFICIAL RECORD / PROMISE DOCUMENT</th>
                <th className="border border-black p-2 text-left">CATEGORY</th>
                <th className="border border-black p-2 text-center">FILE SIZE</th>
                <th className="border border-black p-2 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {HYPERLINK_TRAPS.map((trap, idx) => (
                <tr 
                  key={trap.id} 
                  className={`hover:bg-yellow-50 transition-colors ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="border border-black p-2 font-bold text-center text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="border border-black p-2">
                    <button
                      onClick={() => handleTrapClick(trap)}
                      className="text-left font-bold text-blue-800 underline hover:text-red-700 visited:text-purple-900 flex items-center space-x-1.5 group cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-red-600 group-hover:animate-bounce shrink-0" />
                      <span>{trap.label}</span>
                      <span className="inline-block bg-red-600 text-white text-[8px] font-black px-1 border border-black blink-fast">
                        HOT!
                      </span>
                    </button>
                  </td>
                  <td className="border border-black p-2 text-gray-800 font-bold">
                    {trap.category}
                  </td>
                  <td className="border border-black p-2 text-center font-bold text-red-700">
                    {trap.size}
                  </td>
                  <td className="border border-black p-2 text-center">
                    <button
                      onClick={() => handleTrapClick(trap)}
                      className="win95-btn px-2 py-1 text-[10px] bg-[#c0c0c0] hover:bg-yellow-300 text-black border border-black font-black"
                    >
                      [ACCESS TRAP]
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 90s Web Rings & Web Badges */}
          <div className="mt-5 pt-4 border-t-2 border-gray-300 flex flex-wrap items-center justify-around gap-4 text-xs font-mono">
            {/* Netscape Badge */}
            <div className="border-2 border-blue-800 bg-blue-950 text-white p-1.5 flex items-center space-x-2 text-[10px] shadow">
              <span className="text-xl">🌐</span>
              <div>
                <div className="font-black text-cyan-300">NETSCAPE NOW 4.0</div>
                <div className="text-gray-300 text-[9px]">BEST EXPERIENCED IN 16-BIT AUDIO</div>
              </div>
            </div>

            {/* IE 5 Badge */}
            <div className="border-2 border-blue-600 bg-blue-100 text-blue-900 p-1.5 flex items-center space-x-2 text-[10px] shadow">
              <span className="text-xl">ⓔ</span>
              <div>
                <div className="font-black text-blue-900">MICROSOFT INTERNET EXPLORER</div>
                <div className="text-gray-600 text-[9px]">ACTIVE-X CORRUPTION ENABLED</div>
              </div>
            </div>

            {/* Notepad Badge */}
            <div className="border-2 border-black bg-yellow-200 text-black p-1.5 flex items-center space-x-2 text-[10px] shadow">
              <span className="text-xl">📝</span>
              <div>
                <div className="font-black text-red-900">MADE WITH NOTEPAD & CHAI</div>
                <div className="text-gray-700 text-[9px]">ZERO CODE LINTING SINCE 1999</div>
              </div>
            </div>

            {/* 56K Modem Badge */}
            <div className="border-2 border-green-800 bg-green-100 text-green-900 p-1.5 flex items-center space-x-2 text-[10px] shadow">
              <span className="text-xl">📞</span>
              <div>
                <div className="font-black text-green-950">56 KBPS DIAL-UP POWERED</div>
                <div className="text-gray-700 text-[9px]">PLEASE DO NOT PICK UP LANDLINE</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="bg-[#c0c0c0] px-3 py-1 border-t-2 border-gray-400 flex justify-between items-center text-[10px] text-gray-700 font-bold">
          <span>HOSTED ON A DUAL-PENTIUM SERVER IN ROOM #304, SHASTRI BHAWAN</span>
          <span className="text-red-700 font-black">ALL BROKEN LINKS REPORTED TO LOCAL CHAIWALLA</span>
        </div>

      </div>
    </section>
  );
};
