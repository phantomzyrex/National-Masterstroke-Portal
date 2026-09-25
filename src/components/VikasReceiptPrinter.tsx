import React, { useState, useRef, useEffect } from 'react';
import { playThermalPrinterSound, playDing, playStampThud } from '../utils/audio';
import { 
  Printer, 
  Receipt, 
  Sparkles, 
  Scissors, 
  Copy, 
  Check, 
  RefreshCw, 
  Flame, 
  AlertCircle,
  FileSpreadsheet,
  ArrowDown
} from 'lucide-react';

interface ReceiptItem {
  id: string;
  category: string;
  description: string;
  qty: string;
  rate: string;
  amount: string;
  remark: string;
}

const MASTER_RECEIPT_ITEMS: ReceiptItem[] = [
  {
    id: '1',
    category: 'SPIRITUAL LIQUIDITY',
    description: 'Direct Benefit of ₹15,00,000 Credited in Aether & Emotions',
    qty: '1,400,000,000 SOULS',
    rate: '₹ 15,00,000.00',
    amount: '₹ 2,100,000,000,000,000.00',
    remark: 'DO NOT CHECK ATM BALANCE'
  },
  {
    id: '2',
    category: 'PR EXCELLENCE',
    description: 'Full-Page Newspaper Advertisements (Selfie with Marigold Garland)',
    qty: '48,500 EDITIONS',
    rate: '₹ 1,840,000.00',
    amount: '₹ 89,240,000,000.00',
    remark: 'MANDATORY ON PAGE 1, 3 & 7'
  },
  {
    id: '3',
    category: 'INFRASTRUCTURE',
    description: 'High-Resolution Bullet Train 3D PowerPoint Slides (2017-2047)',
    qty: '750 SLIDES',
    rate: '₹ 16,000,000.00',
    amount: '₹ 12,000,000,000.00',
    remark: 'SPEED: 420 KM/H IN ANIMATION'
  },
  {
    id: '4',
    category: 'NATIONAL MOOD',
    description: '1,000,000 Metric Units of Pure Unbridled Optimism & Chest Swell',
    qty: '1,000,000 UNITS',
    rate: '₹ 420.69',
    amount: '₹ 420,690,000.00',
    remark: '56-INCH GUARANTEED'
  },
  {
    id: '5',
    category: 'MEDIA AUDITORY',
    description: 'Prime Time Decibel Screaming & Whistleblower Drowning Clamor',
    qty: '12,800 HOURS',
    rate: '₹ 50,000.00',
    amount: '₹ 640,000,000.00',
    remark: 'VOLUME LEVEL: DEFCON 1'
  },
  {
    id: '6',
    category: 'LAUNDERING',
    description: 'Industrial Scented Detergent for Political Alliance Washing Machine',
    qty: '4,200 BARRELS',
    rate: '₹ 45,000.00',
    amount: '₹ 189,000,000.00',
    remark: 'DISSOLVES 74 CBI INVESTIGATIONS'
  },
  {
    id: '7',
    category: 'WEATHER TECH',
    description: 'Cloud Radar Concealment & Rain-Proof Stealth Advisory Fee',
    qty: '1 MONSOON',
    rate: '₹ 999,999,999.00',
    amount: '₹ 999,999,999.00',
    remark: 'RADAR CONFUSED BY WATER VAPOR'
  },
  {
    id: '8',
    category: 'TELEPROMPTER',
    description: 'Dual-Glass Anti-Glare Teleprompter Calibration for Unscripted Monologues',
    qty: '56 SESSIONS',
    rate: '₹ 50,000,000.00',
    amount: '₹ 2,800,000,000.00',
    remark: 'ZERO PRESS CONFERENCES PERMITTED'
  },
  {
    id: '9',
    category: 'STRUCTURAL AUDIT',
    description: 'Gravity-Assisted Bridge Collapse Test (Conducted Without Foreign Help)',
    qty: '4 OVERPASSES',
    rate: '₹ 212,500,000.00',
    amount: '₹ 850,000,000.00',
    remark: 'OFFICIALLY DECLARED ACT OF GOD'
  },
  {
    id: '10',
    category: 'CEREMONIAL',
    description: 'Gold-Plated Scissors & Tricolor Silk Ribbon Re-Tying Budget',
    qty: '14 INAUGURATIONS',
    rate: '₹ 3,500,000.00',
    amount: '₹ 49,000,000.00',
    remark: 'SAME HIGHWAY INAUGURATED 4 TIMES'
  },
  {
    id: '11',
    category: 'AESTHETICS',
    description: 'Morning Peacock Feeding Protocol & Drone Cinematography Fuel',
    qty: '365 SESSIONS',
    rate: '₹ 115,000.00',
    amount: '₹ 41,975,000.00',
    remark: 'FEATHER CONTRAST ENHANCED'
  },
  {
    id: '12',
    category: 'EMPLOYMENT STATS',
    description: 'Sidewalk Pakoda Frying Inclusion in Formal Silicon Valley GDP Metrics',
    qty: '85,000,000 KG',
    rate: '₹ 12.00',
    amount: '₹ 1,020,000,000.00',
    remark: 'ZERO UNEMPLOYMENT ACHIEVED'
  }
];

export const VikasReceiptPrinter: React.FC = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printedCount, setPrintedCount] = useState(6);
  const [receiptSerial, setReceiptSerial] = useState(42069);
  const [copied, setCopied] = useState(false);
  const [isTorn, setIsTorn] = useState(false);
  const receiptContainerRef = useRef<HTMLDivElement>(null);

  const displayedItems = MASTER_RECEIPT_ITEMS.slice(0, printedCount);

  // Trigger thermal dot-matrix printing sequence
  const handlePrint = (extraCount: number = 2) => {
    setIsTorn(false);
    setIsPrinting(true);
    playThermalPrinterSound();

    // Progressively expand printed length to simulate paper feed
    let current = printedCount;
    const target = Math.min(MASTER_RECEIPT_ITEMS.length, printedCount + extraCount);

    const stepInterval = setInterval(() => {
      if (current < target) {
        current += 1;
        setPrintedCount(current);
        playThermalPrinterSound();
      } else {
        clearInterval(stepInterval);
        setIsPrinting(false);
        playDing();
        setReceiptSerial((prev) => prev + 1);
      }
    }, 450);
  };

  const handlePrintFullRoll = () => {
    setIsTorn(false);
    setIsPrinting(true);
    playThermalPrinterSound();
    setPrintedCount(MASTER_RECEIPT_ITEMS.length);
    setTimeout(() => {
      setIsPrinting(false);
      playDing();
      setReceiptSerial((prev) => prev + 1);
    }, 1200);
  };

  const handleTearReceipt = () => {
    playStampThud();
    setIsTorn(true);
    setTimeout(() => {
      setIsTorn(false);
      setPrintedCount(4);
    }, 3200);
  };

  const handleCopyText = () => {
    const text = displayedItems
      .map(
        (it) =>
          `[${it.category}] ${it.description} | QTY: ${it.qty} | TOTAL: ${it.amount} (${it.remark})`
      )
      .join('\n');
    const fullReceipt = `=== GOVT OF INDIA: VIKAS TAX INVOICE #${receiptSerial} ===\n${text}\nTOTAL: ₹ 2,100,107,249,665,000.00\nJUMLA JAYATE 2047`;
    navigator.clipboard.writeText(fullReceipt);
    setCopied(true);
    playDing();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="vikas-receipt-printer-section"
      className="w-full max-w-5xl mx-auto px-2 sm:px-4 my-8 font-mono select-none"
    >
      {/* 90s POS Machine Housing Header */}
      <div className="win95-box p-1 bg-[#c0c0c0] border-2 border-black shadow-2xl">
        
        {/* Hardware Title Bar */}
        <div className="bg-[#000080] text-white px-3 py-1.5 flex items-center justify-between font-bold text-xs">
          <div className="flex items-center space-x-2">
            <Printer className="w-4 h-4 text-yellow-300" />
            <span>NIC THERMAL POS 9000: REAL-TIME VIKAS EXPENDITURE AUDIT</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px]">
            <span className="flex items-center gap-1 text-green-300">
              <span className={`w-2 h-2 rounded-full ${isPrinting ? 'bg-green-400 animate-ping' : 'bg-green-500'}`} />
              ONLINE
            </span>
            <span className="bg-red-700 text-yellow-200 px-1 border border-white font-black">
              DOT-MATRIX
            </span>
          </div>
        </div>

        {/* POS Control Deck */}
        <div className="p-3 sm:p-4 bg-[#dfdfdf] border-b-2 border-gray-400 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-black">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-red-900 uppercase">
                OFFICIAL REVENUE DISSIPATION PRINTER
              </span>
              <span className="bg-yellow-300 text-black px-1.5 py-0.2 text-[9px] font-black border border-black">
                PAPER ROLL: 100% UNLIMITED
              </span>
            </div>
            <p className="text-[11px] text-gray-700 font-sans mt-0.5">
              Generates mathematically un-auditable thermal receipts of taxpayer revenues converted into pure unscripted optimism.
            </p>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex items-center gap-2 flex-wrap justify-end shrink-0">
            <button
              id="print-more-vikas-btn"
              disabled={isPrinting}
              onClick={() => handlePrint(2)}
              className="win95-btn px-3 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:bg-yellow-300 text-black font-black text-xs flex items-center space-x-1.5 border border-black shadow-md active:scale-95"
              title="Print 2 more absurd government spending lines"
            >
              <Printer className="w-4 h-4 text-red-900" />
              <span>{isPrinting ? 'PRINTING CHK-CHK...' : '🖨️ PRINT FISCAL AUDIT'}</span>
            </button>

            <button
              id="print-full-roll-btn"
              disabled={isPrinting || printedCount === MASTER_RECEIPT_ITEMS.length}
              onClick={handlePrintFullRoll}
              className="win95-btn px-2.5 py-2 bg-blue-800 hover:bg-blue-700 text-yellow-200 font-bold text-xs flex items-center space-x-1 border border-black"
              title="Feed entire jumbo roll of government expenses"
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span>JUMBO ROLL ({MASTER_RECEIPT_ITEMS.length} ITEMS)</span>
            </button>

            <button
              onClick={handleTearReceipt}
              className="win95-btn px-2.5 py-2 bg-[#d0d0d0] hover:bg-red-200 text-red-900 font-black text-xs flex items-center space-x-1 border border-black"
              title="Virtually tear the thermal receipt"
            >
              <Scissors className="w-3.5 h-3.5 text-black" />
              <span>TEAR RECEIPT</span>
            </button>
          </div>
        </div>

        {/* PRINTER PAPER FEED SLOT (Aesthetic Dark Slot) */}
        <div className="bg-[#111111] p-2 border-y-4 border-gray-700 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-48 sm:w-72 h-2 bg-black rounded-full border border-gray-800 shadow-inner" />
          <div className="text-[9px] text-gray-500 font-mono tracking-widest mt-1">
            ▼ THERMAL CASSETTE PAPER EXTRUSION SLOT (EPSON-1996 EMULATION) ▼
          </div>
        </div>

        {/* THERMAL RECEIPT DISPLAY AREA */}
        <div 
          ref={receiptContainerRef}
          className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-8 flex justify-center overflow-x-auto min-h-[350px]"
        >
          {/* THE JAGGED THERMAL RECEIPT SHEET */}
          <div 
            className={`w-full max-w-lg bg-[#fbf9f1] text-[#1a1a1a] shadow-[0px_20px_40px_rgba(0,0,0,0.8)] p-4 sm:p-6 transition-all duration-500 font-mono relative border-x border-[#e3dfd3] ${
              isTorn ? 'translate-y-8 opacity-80 rotate-1' : ''
            }`}
            style={{
              fontFamily: '"Courier New", Courier, monospace',
            }}
          >
            {/* Top Serrated Tear Teeth */}
            <div className="absolute top-0 inset-x-0 h-2 flex justify-between overflow-hidden text-[#c5c1b5] text-[10px] leading-none select-none">
              {Array.from({ length: 45 }).map((_, i) => (
                <span key={i}>▲</span>
              ))}
            </div>

            {/* Receipt Watermark / Ministry Emblem */}
            <div className="text-center pt-2 pb-3 border-b-2 border-dashed border-gray-400 space-y-1">
              <div className="text-xl">☕ 🇮🇳 ☕</div>
              <div className="font-black text-sm tracking-wider uppercase">
                GOVERNMENT OF VIKSIT BHARAT (PARODY)
              </div>
              <div className="text-[10px] font-bold text-gray-700 uppercase tracking-tight">
                MINISTRY OF UNILATERAL EXPENDITURE & OPTIMISM ALLOCATION
              </div>
              <div className="text-[9px] text-gray-600">
                SHASTRI BHAWAN CASH TERMINAL #07 • VAT/GST: 07JUMLA2047Z1
              </div>
              <div className="text-[9px] font-mono bg-gray-200 inline-block px-2 py-0.5 mt-1 border border-gray-400">
                TAX INVOICE: #VK-2026-{receiptSerial} • TIME: 2026-09-20 10:45 AM
              </div>
            </div>

            {/* Taxpayer Meta Section */}
            <div className="py-2 text-[10px] border-b border-dashed border-gray-400 space-y-0.5 text-gray-700">
              <div className="flex justify-between">
                <span>BENEFICIARY:</span>
                <span className="font-bold text-black">AAM AADMI (COMMON CITIZEN)</span>
              </div>
              <div className="flex justify-between">
                <span>AUDIT STATUS:</span>
                <span className="font-bold text-red-800">100% UNQUESTIONED (DISASTER ACT)</span>
              </div>
              <div className="flex justify-between">
                <span>PAYMENT MODE:</span>
                <span className="font-bold text-black">SPIRITUAL TRANSIT (NON-REFUNDABLE)</span>
              </div>
            </div>

            {/* Line Items Table Header */}
            <div className="pt-2 pb-1 text-[10px] font-black border-b-2 border-black flex justify-between uppercase">
              <span className="w-1/2">ITEM / SPENDING DIRECTIVE</span>
              <span className="w-1/4 text-center">QTY</span>
              <span className="w-1/4 text-right">AMOUNT (INR)</span>
            </div>

            {/* Extruded Thermal Line Items */}
            <div className="divide-y divide-gray-300 text-[10.5px] py-1">
              {displayedItems.map((item, idx) => (
                <div key={item.id} className="py-1.5 space-y-0.5">
                  <div className="flex justify-between items-start font-bold">
                    <span className="w-1/2 leading-tight text-black">
                      {idx + 1}. {item.description}
                    </span>
                    <span className="w-1/4 text-center text-[9px] text-gray-700 font-mono">
                      {item.qty}
                    </span>
                    <span className="w-1/4 text-right font-mono font-black text-black">
                      {item.amount}
                    </span>
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-600 font-sans italic">
                    <span className="text-red-900 font-mono font-bold uppercase">
                      [{item.category}]
                    </span>
                    <span>{item.remark}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dot-matrix Paper Feed Indicator while printing */}
            {isPrinting && (
              <div className="py-2 text-center text-xs font-mono font-black text-red-700 blink-fast">
                &gt;&gt;&gt; THERMAL PRINT HEAD ADVANCING: CHK-CHK-BZZZZT &lt;&lt;&lt;
              </div>
            )}

            {/* Financial Calculations & GST Summary */}
            <div className="pt-3 pb-2 border-t-2 border-black space-y-1 text-[10.5px]">
              <div className="flex justify-between text-gray-800">
                <span>SUBTOTAL (NOMINAL OPTIMISM):</span>
                <span className="font-mono">₹ 2,100,107,249,665,000.00</span>
              </div>
              <div className="flex justify-between text-gray-800">
                <span>VIKAS SURCHARGE (GST @ 28%):</span>
                <span className="font-mono">₹ 588,030,029,906,200.00</span>
              </div>
              <div className="flex justify-between text-gray-800">
                <span>TEAS & SAMOSAS PROTOCOL CESS:</span>
                <span className="font-mono">₹ 42,069,000.00</span>
              </div>
              <div className="flex justify-between text-gray-800">
                <span>LESS: OPPOSITION SCRUTINY DEDUCTION:</span>
                <span className="font-mono text-green-700 font-bold">- ₹ 0.00</span>
              </div>
              
              {/* Grand Total */}
              <div className="pt-2 border-t-2 border-dashed border-black flex justify-between font-black text-xs sm:text-sm text-black">
                <span>GRAND TOTAL LEVIED ON NATION:</span>
                <span className="font-mono text-red-900">₹ ∞ (PRICELESS)</span>
              </div>
            </div>

            {/* Authentic Thermal Receipt Barcode & Slogan */}
            <div className="pt-3 pb-2 text-center space-y-1.5 border-t border-dashed border-gray-400">
              
              {/* Fake Pixelated POS Barcode */}
              <div className="flex justify-center space-x-0.5 py-1 tracking-tighter text-black select-none font-mono text-xs">
                <span>||| | | |||| || | || ||||| | ||| |||| | | ||| ||||| | || | |||| |||</span>
              </div>
              <div className="text-[8px] tracking-widest text-gray-600">
                *JUMLA-PAY-2047-56INCH-DIRECT-DEPOSIT*
              </div>

              {/* Satirical Disclaimers */}
              <p className="text-[9px] text-gray-700 leading-tight uppercase font-bold">
                NO REFUNDS OR AUDITS PERMITTED UNDER SECTION 144 OF THE NATIONAL COMPLACENCY CODE.
              </p>
              <div className="text-[9px] text-gray-600">
                THANK YOU FOR VOTING! PLEASE MAINTAIN OPTIMISM UNTIL 2047.
              </div>
            </div>

            {/* Copy / Action Ribbon inside receipt */}
            <div className="pt-2 flex items-center justify-between border-t border-gray-300 text-[10px]">
              <span className="text-gray-500 font-sans">
                {displayedItems.length} of {MASTER_RECEIPT_ITEMS.length} items printed
              </span>
              <button
                onClick={handleCopyText}
                className="hover:underline text-blue-900 font-bold flex items-center gap-1"
                title="Copy receipt breakdown to clipboard"
              >
                {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY INVOICE'}</span>
              </button>
            </div>

            {/* Bottom Serrated Tear Teeth */}
            <div className="absolute bottom-0 inset-x-0 h-2 flex justify-between overflow-hidden text-[#c5c1b5] text-[10px] leading-none select-none">
              {Array.from({ length: 45 }).map((_, i) => (
                <span key={i}>▼</span>
              ))}
            </div>
          </div>
        </div>

        {/* POS Status Bar */}
        <div className="p-2 bg-[#c0c0c0] border-t border-gray-400 flex items-center justify-between text-[10px] text-gray-700 font-bold">
          <div>
            TERMINAL: COM1 (28.8K MODEM) • BUFFER: 100% FAITH BASED
          </div>
          <div className="text-red-900 font-black">
            NOTICE: DISCARDING THIS RECEIPT COUNTS AS SEDITION (1860 CODE)
          </div>
        </div>

      </div>
    </section>
  );
};
