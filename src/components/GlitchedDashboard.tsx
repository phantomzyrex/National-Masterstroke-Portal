import React, { useState } from 'react';
import { MASTERSTROKES } from '../data/parodyData';
import { MasterstrokeItem, ErrorModalData } from '../types';
import { playDing, playErrorBuzz, playStampThud } from '../utils/audio';
import { 
  AlertOctagon, 
  CheckCircle2, 
  Flame, 
  HelpCircle, 
  Radio, 
  RefreshCw, 
  Search, 
  ShieldAlert, 
  Zap, 
  TrendingDown, 
  ExternalLink,
  Cpu
} from 'lucide-react';

interface GlitchedDashboardProps {
  onTriggerErrorModal: (modalData: ErrorModalData) => void;
  glitchLevel: number;
}

export const GlitchedDashboard: React.FC<GlitchedDashboardProps> = ({ 
  onTriggerErrorModal,
  glitchLevel 
}) => {
  const [viewMode, setViewMode] = useState<'opposition' | 'propaganda'>('opposition');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [isGlitchedBurst, setIsGlitchedBurst] = useState(false);
  const [randomJitter, setRandomJitter] = useState(0);

  const tags = ['ALL', 'SURGICAL STRIKE', 'ULTIMATE JUMLA', 'POWERPOINT NIRMAAN', 'PAKODA ECONOMICS', 'TELEPROMPTER RAJ', 'EXTORTION SCHEME', 'CHAMAKDAR CHIT'];

  const filteredMasterstrokes = selectedTag === 'ALL' 
    ? MASTERSTROKES 
    : MASTERSTROKES.filter(item => item.tag === selectedTag);

  const handleJitterRhetoric = () => {
    playDing();
    setIsGlitchedBurst(true);
    setRandomJitter(prev => prev + 1);
    setTimeout(() => {
      setIsGlitchedBurst(false);
    }, 1200);
  };

  const handleDemandAudit = (item: MasterstrokeItem) => {
    playErrorBuzz();
    onTriggerErrorModal({
      isOpen: true,
      title: `BUREAUCRATIC AUDIT REJECTED: ${item.title}`,
      code: `ERR-56-CHEST-${Math.floor(1000 + Math.random() * 9000)}`,
      gazetteRef: `VIDE NOTIFICATION NO. JUM/2026/SEC-144`,
      message: `Your citizen audit request regarding "${item.title}" was permanently dismissed under the National Image Protection & Teleprompter Safeguards Act. Asking for delivery metrics when foundation stones were already celebrated with marigold garlands is classified as an unpatriotic mood-dampener.`,
      babuRemarks: `Babu Note: File sent to Shastri Bhawan 3rd floor record room where the light bulb expired during the 1999 Kargil war. No duplicate copy will be provided.`,
      actionText: `Chant Slogans & Accept Progress (134%)`,
      secondaryActionText: `Offer Samosa to Audit Babu`,
      severity: 'critical'
    });
  };

  const handleTriggerEDRaid = () => {
    playErrorBuzz();
    onTriggerErrorModal({
      isOpen: true,
      title: 'CRITICAL ALERT: ENFORCEMENT DIRECTORATE SUMMONS ISSUED',
      code: 'ED-SUMMONS-PMLA-999',
      gazetteRef: 'UNDER SECTION 50 OF PREVENTION OF QUESTIONING MONEY LAUNDERING ACT',
      message: 'You have toggled the "OPPOSITION REALITY AUDIT" mode 3 times in a single session. An automated PMLA ECIR has been registered against your IP address. Please present yourself with 47 years of bank passbooks at 10:00 AM tomorrow.',
      babuRemarks: 'NOTE: If you join the governing alliance before 9:30 AM tomorrow, this summon will convert into a formal invitation for swearing-in as Minister of State.',
      actionText: 'Join Ruling Alliance (Get Washing Machine Pass)',
      secondaryActionText: 'Hide in Remote Resort with MLAs',
      severity: 'washing_machine'
    });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 my-4 font-mono">
      {/* Windows 95 Main Dashboard Window Container */}
      <div className="win95-box p-1 bg-[#c0c0c0] shadow-2xl border-4 border-[#000080]">
        
        {/* Window Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] via-[#0000aa] to-[#000080] text-white px-3 py-1.5 flex items-center justify-between font-bold text-xs sm:text-sm select-none">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span className="tracking-wide">
              C:\GOV_PORTAL\MASTERSTROKE_METER_V4.EXE [SATIRICAL OPPOSITION AUDIT SUITE]
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => { playDing(); }}
              className="win95-btn w-5 h-5 flex items-center justify-center text-black text-xs font-black bg-[#c0c0c0]"
            >
              _
            </button>
            <button 
              onClick={() => { playDing(); }}
              className="win95-btn w-5 h-5 flex items-center justify-center text-black text-xs font-black bg-[#c0c0c0]"
            >
              □
            </button>
            <button 
              onClick={() => { playErrorBuzz(); handleDemandAudit(MASTERSTROKES[0]); }}
              className="win95-btn w-5 h-5 flex items-center justify-center text-red-700 text-xs font-black bg-[#c0c0c0]"
              title="Do not close official portal!"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Inner Content Area */}
        <div className="p-3 sm:p-5 bg-[#dfdfdf]">
          
          {/* Top Control Bar: Mode Toggle & Sarcastic Status */}
          <div className="win95-box p-3 bg-[#e8e8e8] mb-4 flex flex-col md:flex-row items-center justify-between gap-4 border-2 border-black">
            
            {/* View Mode Radio Toggle */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <span className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1">
                <Radio className="w-4 h-4 text-red-600 animate-pulse" /> SELECT VISION MODE:
              </span>
              <div className="flex items-center bg-white p-1 border-2 border-gray-600 shadow-inner">
                <button
                  id="mode-opposition-btn"
                  onClick={() => {
                    setViewMode('opposition');
                    playStampThud();
                  }}
                  className={`px-3 py-1 text-xs font-black uppercase transition-all ${
                    viewMode === 'opposition'
                      ? 'bg-red-700 text-yellow-200 shadow-md border-2 border-black'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🔍 OPPOSITION REALITY AUDIT (UNFILTERED)
                </button>
                <button
                  id="mode-propaganda-btn"
                  onClick={() => {
                    setViewMode('propaganda');
                    playDing();
                  }}
                  className={`px-3 py-1 text-xs font-black uppercase transition-all ${
                    viewMode === 'propaganda'
                      ? 'bg-yellow-400 text-black shadow-md border-2 border-black'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ✨ GOVT PRESS RELEASE MODE (500% VIKAS)
                </button>
              </div>
            </div>

            {/* Quick Sarcastic Actions */}
            <div className="flex items-center gap-2">
              <button
                id="re-jitter-stats-btn"
                onClick={handleJitterRhetoric}
                className="win95-btn px-2.5 py-1.5 text-xs text-blue-900 bg-cyan-200 hover:bg-cyan-300 flex items-center gap-1 border border-black"
                title="Glitch the progress bars with fresh rhetoric"
              >
                <Zap className="w-3.5 h-3.5 text-orange-600" />
                <span>INFLATE STATS (+999%)</span>
              </button>
              <button
                id="summon-ed-raid-btn"
                onClick={handleTriggerEDRaid}
                className="win95-btn px-2.5 py-1.5 text-xs text-white bg-red-800 hover:bg-red-900 flex items-center gap-1 border border-black"
                title="Trigger ED raid on opposing numbers"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
                <span>SUMMON ED RAID ON AUDIT</span>
              </button>
            </div>

          </div>

          {/* Glitched Macro Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            
            {/* Metric 1: 15 Lakh DBT meter */}
            <div className="win95-box p-2.5 bg-white border-2 border-black flex flex-col justify-between">
              <div className="flex justify-between items-start text-black">
                <span className="text-[10px] font-black uppercase text-red-700">₹15 LAKH JAN DHAN DISBURSEMENT</span>
                <span className="text-[9px] bg-red-100 text-red-800 px-1 border border-red-400 font-bold">JUMLA TARIFF</span>
              </div>
              <div className="my-2">
                <div className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-baseline gap-1">
                  <span>₹0.00</span>
                  <span className="text-xs text-gray-500 font-normal">/ ₹15,00,000.00</span>
                </div>
                <div className="text-[10px] text-red-600 font-bold blink-slow">
                  STUCK AT 99.9% BUFFERING (SINCE 2014)
                </div>
              </div>
              {/* Glitched Progress Bar */}
              <div className="w-full bg-gray-300 h-4 border border-black relative overflow-hidden">
                <div 
                  className={`h-full bg-red-600 transition-all duration-300 ${isGlitchedBurst ? 'w-full animate-ping' : 'w-[0.0001%]'}`}
                />
                <span className="absolute inset-0 text-[9px] font-black text-center flex items-center justify-center text-black">
                  {isGlitchedBurst ? 'OVERFLOW ERROR 420' : '0.000000001% CREDITED'}
                </span>
              </div>
            </div>

            {/* Metric 2: Swiss Bank Recovery */}
            <div className="win95-box p-2.5 bg-white border-2 border-black flex flex-col justify-between">
              <div className="flex justify-between items-start text-black">
                <span className="text-[10px] font-black uppercase text-blue-900">SWISS BANK RECOVERY BALANCE</span>
                <span className="text-[9px] bg-yellow-200 text-black px-1 border border-black font-bold">TERMITE AUDIT</span>
              </div>
              <div className="my-2">
                <div className="text-xl sm:text-2xl font-black text-red-600 tracking-tight flex items-baseline gap-1">
                  <span>-₹2,50,000 Cr</span>
                </div>
                <div className="text-[10px] text-blue-900 font-bold">
                  Cost of printing new notes + ATM recalibration
                </div>
              </div>
              <div className="w-full bg-gray-300 h-4 border border-black relative overflow-hidden">
                <div className="h-full bg-orange-600 w-3/4 hazard-stripes-orange" />
                <span className="absolute inset-0 text-[9px] font-black text-center flex items-center justify-center text-yellow-100 drop-shadow">
                  NET NEGATIVE DEFICIT DETECTED
                </span>
              </div>
            </div>

            {/* Metric 3: Press Conference Counter */}
            <div className="win95-box p-2.5 bg-white border-2 border-black flex flex-col justify-between">
              <div className="flex justify-between items-start text-black">
                <span className="text-[10px] font-black uppercase text-purple-900">UNSCRIPTED PRESS QUESTIONS</span>
                <span className="text-[9px] bg-purple-100 text-purple-900 px-1 border border-purple-400 font-bold">10+ YEARS</span>
              </div>
              <div className="my-2">
                <div className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-baseline gap-1">
                  <span>0</span>
                  <span className="text-xs text-gray-500 font-normal">/ 3,740 Days</span>
                </div>
                <div className="text-[10px] text-green-700 font-bold">
                  Mango Ingestion Enquiries: 100% (Sucking vs Slicing)
                </div>
              </div>
              <div className="w-full bg-gray-300 h-4 border border-black relative overflow-hidden">
                <div className="h-full bg-purple-800 w-0" />
                <span className="absolute inset-0 text-[9px] font-black text-center flex items-center justify-center text-black">
                  TELEPROMPTER UPTIME: 100.0%
                </span>
              </div>
            </div>

            {/* Metric 4: Washing Machine Output */}
            <div className="win95-box p-2.5 bg-white border-2 border-black flex flex-col justify-between">
              <div className="flex justify-between items-start text-black">
                <span className="text-[10px] font-black uppercase text-green-900">OPPOSITION CORRUPTION CLEAN CHITS</span>
                <span className="text-[9px] bg-green-200 text-green-900 px-1 border border-green-800 font-bold">TIDE WHITE</span>
              </div>
              <div className="my-2">
                <div className="text-xl sm:text-2xl font-black text-green-700 tracking-tight flex items-baseline gap-1">
                  <span>28 Defectors</span>
                  <span className="text-xs text-gray-500 font-normal">Washed</span>
                </div>
                <div className="text-[10px] text-blue-900 font-bold">
                  CBI Case Closures: 25/25 | New Ministers: 12
                </div>
              </div>
              <div className="w-full bg-gray-300 h-4 border border-black relative overflow-hidden">
                <div className="h-full bg-green-600 w-full animate-pulse" />
                <span className="absolute inset-0 text-[9px] font-black text-center flex items-center justify-center text-white">
                  DETERGENT LEVEL: FULL TANK
                </span>
              </div>
            </div>

          </div>

          {/* Filter Categories Bar */}
          <div className="mb-4 flex items-center gap-1.5 overflow-x-auto pb-2 border-b-2 border-gray-400">
            <span className="text-xs font-black text-black shrink-0 mr-1 flex items-center gap-1">
              <Search className="w-3.5 h-3.5 text-blue-900" /> TOPIC FILTER:
            </span>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  playDing();
                }}
                className={`text-[11px] font-bold px-2 py-0.5 whitespace-nowrap border ${
                  selectedTag === tag
                    ? 'bg-[#000080] text-yellow-300 border-black shadow'
                    : 'bg-white text-black hover:bg-yellow-100 border-gray-500'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Main Masterstroke Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMasterstrokes.map((item, idx) => {
              const displayPercent = viewMode === 'propaganda' 
                ? (item.progressPercent < 50 ? 500 : item.progressPercent * 3 + (randomJitter % 50))
                : item.progressPercent;

              return (
                <div
                  key={item.id}
                  className="win95-box p-3 bg-white border-2 border-black flex flex-col justify-between shadow-md hover:border-red-600 transition-colors"
                >
                  {/* Card Header with Badges */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 border border-black">
                          {item.tag}
                        </span>
                        <span className="text-[10px] text-gray-600 font-bold">
                          {item.year}
                        </span>
                      </div>
                      <span className="text-[10px] bg-yellow-300 text-black px-1.5 py-0.5 font-bold border border-black">
                        #{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-blue-950 uppercase tracking-tight border-b-2 border-gray-300 pb-1 mb-2">
                      {item.title}
                    </h3>

                    {/* Content Comparison View */}
                    {viewMode === 'propaganda' ? (
                      /* Government Propaganda Mode */
                      <div className="bg-amber-50 border-2 border-yellow-500 p-2.5 mb-2 text-xs">
                        <div className="flex items-center gap-1 text-yellow-800 font-black text-[11px] uppercase mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                          <span>OFFICIAL SCRIPTED CLAIM (56-INCH HISTORIC REVOLUTION)</span>
                        </div>
                        <p className="text-gray-900 font-medium leading-relaxed">
                          "{item.officialClaim}"
                        </p>
                      </div>
                    ) : (
                      /* Satirical Opposition Vision Reality Audit */
                      <div className="bg-red-50 border-2 border-red-600 p-2.5 mb-2 text-xs">
                        <div className="flex items-center gap-1 text-red-900 font-black text-[11px] uppercase mb-1">
                          <AlertOctagon className="w-3.5 h-3.5 text-red-700" />
                          <span>OPPOSITION REALITY AUDIT (THE GROUND TRUTH)</span>
                        </div>
                        <p className="text-black font-semibold leading-relaxed">
                          {item.oppositionVision}
                        </p>
                      </div>
                    )}

                    {/* Bureaucratic Status Stamp */}
                    <div className="bg-gray-100 p-1.5 border border-dashed border-gray-500 text-[10px] font-bold text-gray-800 mb-2">
                      <span className="text-red-700 uppercase font-black mr-1">NIC STATUS:</span>
                      <span>{item.bureaucraticStatus}</span>
                    </div>

                    {/* ED Raid Status Warning */}
                    <div className="text-[9px] text-purple-900 font-bold mb-2 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-red-600 shrink-0" />
                      <span>{item.edRaidStatus}</span>
                    </div>
                  </div>

                  {/* Card Bottom: Glitched Progress Bar & Interactive Action */}
                  <div className="pt-2 border-t-2 border-gray-300">
                    <div className="flex justify-between items-center text-[10px] font-bold text-black mb-1">
                      <span>DELIVERY PROGRESS METRIC:</span>
                      <span className={`${viewMode === 'propaganda' ? 'text-green-700' : 'text-red-700'} font-black`}>
                        {viewMode === 'propaganda' ? `${displayPercent.toFixed(1)}% (EXCEEDED)` : item.glitchLabel}
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full bg-gray-200 h-4 border border-black relative overflow-hidden mb-2">
                      <div
                        className={`h-full transition-all duration-500 ${
                          viewMode === 'propaganda'
                            ? 'bg-gradient-to-r from-yellow-400 to-green-500 w-full animate-pulse'
                            : displayPercent > 100
                            ? 'bg-yellow-400 hazard-stripes w-full'
                            : displayPercent < 1
                            ? 'bg-red-600 w-1'
                            : 'bg-orange-500'
                        }`}
                        style={{
                          width: viewMode === 'propaganda' ? '100%' : `${Math.min(100, Math.max(2, displayPercent))}%`
                        }}
                      />
                      <span className="absolute inset-0 text-[9px] font-black flex items-center justify-center text-black drop-shadow-sm">
                        {viewMode === 'propaganda' 
                          ? '100% GUARANTEE VALIDATED BY WHATSAPP UNIVERSITY' 
                          : `${displayPercent}% ACTUAL DELIVERY`}
                      </span>
                    </div>

                    {/* Interactive Button */}
                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleDemandAudit(item)}
                        className="win95-btn px-2 py-1 text-[11px] text-red-900 bg-yellow-200 hover:bg-yellow-300 w-full flex items-center justify-center gap-1 border border-black"
                      >
                        <HelpCircle className="w-3 h-3 text-red-700" />
                        <span>CHALLENGE RHETORIC / DEMAND AUDIT</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Window Status Bar */}
        <div className="bg-[#c0c0c0] px-3 py-1 border-t-2 border-gray-400 flex flex-wrap items-center justify-between text-[10px] text-gray-800 font-bold select-none">
          <div>TOTAL MASTERSTROKES ANALYZED: {MASTERSTROKES.length} | LEAKED EXAM PAPERS: 47</div>
          <div className="text-red-700 font-black blink-slow">
            STATUS: WAITING FOR TELEPROMPTER SCRIPT APPROVAL...
          </div>
        </div>

      </div>
    </section>
  );
};
