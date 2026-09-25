import React, { useState } from 'react';
import { HeaderMarquee } from './components/HeaderMarquee';
import { UnderConstructionBanner } from './components/UnderConstructionBanner';
import { GlitchedDashboard } from './components/GlitchedDashboard';
import { AbsurdWorkflowSimulator } from './components/AbsurdWorkflowSimulator';
import { BrokenLinksTrapSection } from './components/BrokenLinksTrapSection';
import { RetroDialogModal } from './components/RetroDialogModal';
import { FooterCredits } from './components/FooterCredits';
import { HiddenAnthemPlayer } from './components/HiddenAnthemPlayer';
import { ModiInteractiveAvatar } from './components/ModiInteractiveAvatar';
import { InaugurationOverlay } from './components/InaugurationOverlay';
import { VikasReceiptPrinter } from './components/VikasReceiptPrinter';
import { RtiFilingPortal } from './components/RtiFilingPortal';
import { ErrorModalData } from './types';
import { playDing, playErrorBuzz, playDialupScreech } from './utils/audio';
import { EyeOff, AlertOctagon, RefreshCw, FileSpreadsheet } from 'lucide-react';

export default function App() {
  const [modalData, setModalData] = useState<ErrorModalData>({
    isOpen: false,
    title: '',
    code: '',
    gazetteRef: '',
    message: '',
    babuRemarks: '',
    actionText: '',
    severity: 'warning'
  });

  const [glitchCount, setGlitchCount] = useState(0);
  const [isBossPanicMode, setIsBossPanicMode] = useState(false);

  const handleOpenErrorModal = (data: ErrorModalData) => {
    setModalData(data);
  };

  const handleCloseModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };

  const handleGlobalBoostVikas = () => {
    setGlitchCount((prev) => prev + 1);
    playDialupScreech();
    handleOpenErrorModal({
      isOpen: true,
      title: 'VIKAS ACCELERATOR OVERHEATED: SPEECH LENGTH +45 MINS',
      code: 'ERR-56-OVERFLOW-9999',
      gazetteRef: 'UNDER REVISED TELEPROMPTER DIRECTIVE 2026',
      message: 'You pressed the "BOOST VIKAS SPEED" button. The server attempts to generate 2 Crore jobs in 3 seconds, resulting in a stack overflow on the Shastri Bhawan dial-up modem. The national growth rate has been temporarily adjusted to 420.69% in PowerPoint.',
      babuRemarks: 'Babu Action: Please bang plates and wait for notification in tomorrow morning newspaper front-page advertisement.',
      actionText: 'Hail the Statistical Masterstroke',
      secondaryActionText: 'Request More Marigold Garlands',
      severity: 'critical'
    });
  };

  // 90s Boss / ED Panic Key: Hides portal and shows fake ancient Excel sheet!
  const togglePanicMode = () => {
    playDing();
    setIsBossPanicMode(!isBossPanicMode);
  };

  return (
    <div className="min-h-screen bg-[#000080] text-yellow-300 font-mono flex flex-col selection:bg-fuchsia-600 selection:text-white relative">
      
      {/* 90s Boss Panic Screen Overlay (In case ED or CBI raids your screen!) */}
      {isBossPanicMode ? (
        <div className="fixed inset-0 z-50 bg-white text-black p-6 font-sans select-none overflow-auto">
          <div className="max-w-4xl mx-auto border-2 border-gray-400 p-4 shadow-xl">
            <div className="flex justify-between items-center bg-[#107c41] text-white p-2 mb-4 font-bold text-sm">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-5 h-5" />
                <span>Microsoft Excel 97 - [SAMOSA_PROCUREMENT_EXPENSES_1998.XLS]</span>
              </div>
              <button
                onClick={togglePanicMode}
                className="bg-red-700 hover:bg-red-800 text-white px-2 py-0.5 text-xs font-bold border border-white"
              >
                RETURN TO PARODY PORTAL ➔
              </button>
            </div>
            
            <p className="text-xs text-gray-600 mb-2">
              (OFFICIAL AUDIT MODE: You activated the Panic Hide Button. Showing innocuous office samosa inventory to prevent ED scrutiny.)
            </p>

            <table className="w-full border-collapse border border-gray-300 text-xs text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-1.5">Item Code</th>
                  <th className="border border-gray-300 p-1.5">Description</th>
                  <th className="border border-gray-300 p-1.5">Quantity</th>
                  <th className="border border-gray-300 p-1.5">Cost (₹)</th>
                  <th className="border border-gray-300 p-1.5">Auditor Remark</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1.5">SAM-001</td>
                  <td className="border border-gray-300 p-1.5">Aloo Samosa (Standard Crispy)</td>
                  <td className="border border-gray-300 p-1.5">4,820 pcs</td>
                  <td className="border border-gray-300 p-1.5">₹48,200.00</td>
                  <td className="border border-gray-300 p-1.5 text-green-700">Fully consumed during lunch breaks</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1.5">CHT-002</td>
                  <td className="border border-gray-300 p-1.5">Sweet Tamarind & Mint Chutney</td>
                  <td className="border border-gray-300 p-1.5">950 Liters</td>
                  <td className="border border-gray-300 p-1.5">₹19,000.00</td>
                  <td className="border border-gray-300 p-1.5 text-green-700">Exempt from GST circular</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1.5">GAR-003</td>
                  <td className="border border-gray-300 p-1.5">Fresh Marigold Garlands for Foundation Stones</td>
                  <td className="border border-gray-300 p-1.5">14,200 kgs</td>
                  <td className="border border-gray-300 p-1.5">₹7,10,000.00</td>
                  <td className="border border-gray-300 p-1.5 text-blue-800">Inauguration photo-ops sanctioned</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1.5">TEL-004</td>
                  <td className="border border-gray-300 p-1.5">Teleprompter Screen Glass Polish</td>
                  <td className="border border-gray-300 p-1.5">12 Cans</td>
                  <td className="border border-gray-300 p-1.5">₹36,000.00</td>
                  <td className="border border-gray-300 p-1.5 text-purple-700">Zero smudge tolerance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {/* Interactive Virtual Inauguration Ribbon & Digital India Confetti Shower */}
      <InaugurationOverlay 
        onInaugurated={() => {
          handleOpenErrorModal({
            isOpen: true,
            title: 'CEREMONIAL INAUGURATION SANCTIONED: TENDER EXPENSE PASSED',
            code: 'NIC-INAUG-PHASE-14-CEREMONY',
            gazetteRef: 'NATIONAL PROTOCOL FOR VIRTUAL RIBBON CUTTING VIA FIBER OPTIC CABLE 2026',
            message: 'Congratulations! You have officially cut the ceremonial silk ribbon on the National Masterstroke Portal. A symbolic grant of ₹42,069 Crores has been allocated for tea, samosas, and 48-page full-color supplement spreads in tomorrow\'s newspapers.',
            babuRemarks: 'Babu Directive: Ribbon pieces collected for recycling in Phase 15 Re-Inauguration next month.',
            actionText: 'Stand at Attention & Collect Samosa',
            secondaryActionText: 'Salute 56-Inch Digital Bandwidth',
            severity: 'success'
          });
        }}
      />

      {/* Retro 90s Header Marquee */}
      <HeaderMarquee 
        onGlitchTrigger={() => setGlitchCount((c) => c + 1)}
        glitchCount={glitchCount}
      />

      {/* Under Construction Banner with Pickaxe */}
      <UnderConstructionBanner onBoostClick={handleGlobalBoostVikas} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 space-y-6">
        
        {/* Core Glitched Dashboard: Opposition Vision Report Cards */}
        <GlitchedDashboard 
          onTriggerErrorModal={handleOpenErrorModal}
          glitchLevel={glitchCount}
        />

        {/* Absurd Workflow Simulator: 15 Lakh Form + Political Washing Machine + Gazette Circulars */}
        <AbsurdWorkflowSimulator 
          onTriggerErrorModal={handleOpenErrorModal}
        />

        {/* 90s Thermal POS Vikas Receipt Printer: Itemized Imaginary Spending */}
        <VikasReceiptPrinter />

        {/* File an RTI Form with Dodging Submit Button & Digital Bribe Speed Money */}
        <RtiFilingPortal 
          onTriggerErrorModal={handleOpenErrorModal}
        />

        {/* Broken Hyperlinks Trap Section: Directory of Dead Government Links */}
        <BrokenLinksTrapSection 
          onTriggerErrorModal={handleOpenErrorModal}
        />

      </main>

      {/* Retro 90s Footer with Stat Satire & NIC Disclaimer */}
      <FooterCredits />

      {/* Retro Dialog Modal for Overly Formal Nonsensical Errors */}
      <RetroDialogModal 
        modalData={modalData}
        onClose={handleCloseModal}
      />

      {/* Hidden 8-Bit Nightmarish Patriotic Anthem Player */}
      <HiddenAnthemPlayer 
        onOpenErrorModal={(title, message) => {
          handleOpenErrorModal({
            isOpen: true,
            title,
            code: 'SOUNDBLASTER-MIDI-DEMONIC-66A',
            gazetteRef: 'NIC AUDITORY SANCTITY CIRCULAR 1998',
            message,
            babuRemarks: 'Babu directive: Maintain 100% standing posture while listening to 8-bit chip audio.',
            actionText: 'Salute 8-Bit Chiptune',
            severity: 'critical'
          });
        }}
      />

      {/* Interactive 2D Modi Avatar Companion with Real-Time Dialogue & Mood Expressions */}
      <ModiInteractiveAvatar />

      {/* Floating 90s Panic Button (Bottom Right) */}
      <div className="fixed bottom-3 right-3 z-40">
        <button
          onClick={togglePanicMode}
          className="win95-btn px-3 py-2 bg-red-700 hover:bg-red-800 text-yellow-200 text-xs font-black flex items-center space-x-1.5 border-2 border-black shadow-2xl animate-pulse"
          title="Click if a ruling party representative or ED inspector looks over your shoulder!"
        >
          <EyeOff className="w-4 h-4 text-yellow-300" />
          <span className="hidden sm:inline">PANIC BUTTON: HIDE FROM ED RAID</span>
          <span className="sm:hidden">PANIC (HIDE)</span>
        </button>
      </div>

    </div>
  );
}
