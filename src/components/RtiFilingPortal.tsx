import React, { useState, useRef } from 'react';
import { 
  playCashRegisterBribeSound, 
  playWooshDodgeSound, 
  playDing, 
  playStampThud 
} from '../utils/audio';
import { ErrorModalData } from '../types';
import { 
  FileText, 
  DollarSign, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  RefreshCw,
  Coins
} from 'lucide-react';

interface RtiFilingPortalProps {
  onTriggerErrorModal: (modalData: ErrorModalData) => void;
}

const RTI_MINISTRIES = [
  {
    id: 'pm_cares',
    name: "Prime Minister's Relief Fund & PM CARES",
    defaultQuery: "Requesting certified audited ledger of foreign corporate donations. Is this a public authority or private emotion?"
  },
  {
    id: 'education',
    name: "Ministry of Education & Delhi University Archives",
    defaultQuery: "Requesting certified photocopy of the 1978 Bachelor of Arts degree certificate in 'Entire Political Science'."
  },
  {
    id: 'election_commission',
    name: "Election Commission of India (Electoral Bonds Cell)",
    defaultQuery: "Requesting donor alpha-numeric serial match-list before Supreme Court forces another sealed envelope submission."
  },
  {
    id: 'finance',
    name: "Ministry of Finance (Demonetization Taskforce)",
    defaultQuery: "Requesting coordinates of nano-GPS chips purportedly embedded inside discontinued pink ₹2,000 currency notes."
  },
  {
    id: 'railways',
    name: "Ministry of Railways (Bullet Train Division)",
    defaultQuery: "Requesting exact physical meterage of operational tracks laid between Ahmedabad and Mumbai since 2017."
  },
  {
    id: 'meteorology',
    name: "Cloud Radar Meteorology Defense Unit",
    defaultQuery: "Requesting algorithmic formulas proving that cumulus clouds prevent military radar detection of fighter jets."
  }
];

const DODGE_TAUNTS = [
  "Babu went for tea break! Submit button relocated to 3rd floor.",
  "File temporarily misplaced under lunch dabba! Catch the button if you can.",
  "Under Secretary is on casual leave due to rainy weather. Button moved!",
  "Red tape resistance detected: ₹0 bribe received, speed dropped by 100%.",
  "Error 404: Transparency not supported on Windows 95 government servers!",
  "Button quarantined! National pride protocol forbids answering this query.",
  "File forwarded to committee that meets every leap year!"
];

export const RtiFilingPortal: React.FC<RtiFilingPortalProps> = ({ onTriggerErrorModal }) => {
  const [applicantName, setApplicantName] = useState('Aam Aadmi (Perplexed Citizen)');
  const [selectedMinistry, setSelectedMinistry] = useState(RTI_MINISTRIES[0].id);
  const [queryText, setQueryText] = useState(RTI_MINISTRIES[0].defaultQuery);
  const [citizenAffidavit, setCitizenAffidavit] = useState(true);
  const [captchaAnswer, setCaptchaAnswer] = useState('0');

  // Dodge state
  const [dodgeOffset, setDodgeOffset] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [tauntIndex, setTauntIndex] = useState(0);

  // Digital bribe state
  const [bribePaid, setBribePaid] = useState(false);
  const [bribeCount, setBribeCount] = useState(0);
  const [bribeAnimation, setBribeAnimation] = useState(false);

  const arenaRef = useRef<HTMLDivElement>(null);

  // Handle Dodge when user tries to hover or touch the elusive submit button
  const handleButtonDodge = () => {
    if (bribePaid) return; // Unlocked after paying bribe!

    playWooshDodgeSound();

    const newCount = dodgeCount + 1;
    setDodgeCount(newCount);
    setTauntIndex((prev) => (prev + 1) % DODGE_TAUNTS.length);

    // Calculate dynamic random offset within container bounds
    const maxRangeX = 140;
    const maxRangeY = 60;
    const randomX = (Math.random() - 0.5) * (maxRangeX * 2);
    const randomY = (Math.random() - 0.5) * (maxRangeY * 2);

    setDodgeOffset({ x: randomX, y: randomY });
  };

  // Pay Digital Bribe to unlock submit functionality
  const handlePayBribe = () => {
    playCashRegisterBribeSound();
    setBribePaid(true);
    setBribeCount((c) => c + 1);
    setBribeAnimation(true);
    setDodgeOffset({ x: 0, y: 0 }); // Center the button back!

    setTimeout(() => {
      setBribeAnimation(false);
      playDing();
    }, 1200);
  };

  // Reset bribe for demo / repeat fun
  const handleResetPortal = () => {
    playDing();
    setBribePaid(false);
    setDodgeCount(0);
    setDodgeOffset({ x: 0, y: 0 });
  };

  // Preset query selector
  const handleMinistryChange = (id: string) => {
    setSelectedMinistry(id);
    const found = RTI_MINISTRIES.find((m) => m.id === id);
    if (found) {
      setQueryText(found.defaultQuery);
    }
    playDing();
  };

  // Submit RTI
  const handleSubmitRti = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bribePaid) {
      handleButtonDodge();
      return;
    }

    playStampThud();

    onTriggerErrorModal({
      isOpen: true,
      title: 'RTI PETITION ARBITRARILY DISMISSED UNDER SECTION 8(1)(A)',
      code: 'RTI-REJECT-OFFICIAL-SECRETS-56',
      gazetteRef: 'NATIONAL SOVEREIGNTY (DISCLOSURE SUPPRESSION) ORDER 2026',
      message: `Your Right to Information petition addressed to the "${
        RTI_MINISTRIES.find((m) => m.id === selectedMinistry)?.name
      }" has been dismissed with extreme prejudice. Our central registry reports that the requested records were stored in a damp basement and accidentally digested by government-certified white ants. Furthermore, your ₹500 digital speed bribe has been assimilated into the Ministry Tea & Samosa Contingency Fund and is strictly non-refundable.`,
      babuRemarks: 'Babu Closing Note: Citizens experiencing acute curiosity are advised to tune into state television for uncritical reassurance.',
      actionText: 'Accept Arbitrary Dismissal & Praise Secrecy',
      secondaryActionText: 'File 1st Appeal to Same Babu',
      severity: 'critical'
    });
  };

  return (
    <section 
      id="rti-filing-portal-section"
      className="w-full max-w-5xl mx-auto px-2 sm:px-4 my-8 font-mono select-none"
    >
      <div className="win95-box p-1 bg-[#c0c0c0] border-2 border-black shadow-2xl">
        
        {/* Title Bar */}
        <div className="bg-[#000080] text-white px-3 py-1.5 flex items-center justify-between font-bold text-xs">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-yellow-300" />
            <span>RTI ONLINE PORTAL 1996 (CENTRAL BUREAUCRATIC OBFUSCATION SUITE)</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px]">
            <span className={`px-1 border border-white font-black ${bribePaid ? 'bg-green-700 text-yellow-200' : 'bg-red-700 text-white'}`}>
              {bribePaid ? 'BRIBE VERIFIED ✓' : 'TRANSPARENCY: LOCKED'}
            </span>
          </div>
        </div>

        {/* Portal Subheader */}
        <div className="p-3 sm:p-4 bg-[#dfdfdf] border-b-2 border-gray-400 text-xs text-black">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-red-900 uppercase">
                  CITIZEN INFORMATION EXTRACTION TERMINAL
                </span>
                <span className="bg-yellow-300 text-black px-1.5 py-0.2 text-[9px] font-black border border-black">
                  SUCCESS RATE: 0.001%
                </span>
              </div>
              <p className="text-[11px] text-gray-700 font-sans mt-0.5">
                Under the Right to Information Act (as amended to prevent uncomfortable disclosures), citizens may petition for information that has already been classified as top secret.
              </p>
            </div>

            {/* Bribe Status Indicator */}
            <div className="win95-box-inset p-2 bg-white flex items-center space-x-2 shrink-0">
              {bribePaid ? (
                <Unlock className="w-4 h-4 text-green-600 shrink-0" />
              ) : (
                <Lock className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <div className="text-[10px] leading-tight">
                <div className="font-black">FILE SPEED STATUS:</div>
                <div className={bribePaid ? 'text-green-700 font-bold' : 'text-red-700 font-bold'}>
                  {bribePaid ? 'GREASED (UNLOCKED)' : 'STALLED IN RED TAPE'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmitRti} className="p-3 sm:p-5 bg-[#dfdfdf] space-y-4 text-xs text-black">
          
          {/* Top Warning Banner */}
          <div className="bg-amber-100 border-2 border-amber-600 p-2.5 flex items-start space-x-2 text-[11px] text-amber-950 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span>MANDATORY STATUTORY CAUTION: </span>
              <span className="font-normal font-sans text-gray-800">
                Attempting to submit an RTI without adequate administrative grease may cause the submit button to enter perpetual dodging mode. The Ministry accepts zero liability for repetitive mouse displacement injuries.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Applicant Name */}
            <div>
              <label className="font-bold block mb-1">
                1. CITIZEN PETITIONER NAME:
              </label>
              <input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="win95-box-inset w-full px-2 py-1.5 bg-white font-mono text-xs focus:outline-none"
                placeholder="Citizen Name"
              />
              <span className="text-[10px] text-gray-600">
                (Names matching intelligence watchlists will be routed to special scrutiny)
              </span>
            </div>

            {/* Target Ministry Selection */}
            <div>
              <label className="font-bold block mb-1">
                2. TARGET MINISTRY TO QUERY:
              </label>
              <select
                value={selectedMinistry}
                onChange={(e) => handleMinistryChange(e.target.value)}
                className="win95-box-inset w-full px-2 py-1.5 bg-white font-mono text-xs focus:outline-none"
              >
                {RTI_MINISTRIES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <span className="text-[10px] text-gray-600">
                Select from verified un-auditable governmental departments
              </span>
            </div>
          </div>

          {/* Specific Information Requested Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold">
                3. SPECIFIC INFORMATION SOLICITED (MAX 500 CHARACTERS OF POLITENESS):
              </label>
              <button
                type="button"
                onClick={() => {
                  const m = RTI_MINISTRIES.find((x) => x.id === selectedMinistry);
                  if (m) setQueryText(m.defaultQuery);
                  playDing();
                }}
                className="text-[10px] text-blue-800 underline hover:text-blue-950 font-bold"
              >
                [AUTO-FILL UNCOMFORTABLE QUERY]
              </button>
            </div>
            <textarea
              rows={3}
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              className="win95-box-inset w-full p-2 bg-white font-mono text-xs focus:outline-none resize-none leading-relaxed"
              placeholder="State your question with maximum deference..."
            />
          </div>

          {/* Affidavit & Captcha Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2 bg-gray-200 border border-gray-400">
            {/* Affidavit Checkbox */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="rti-affidavit"
                checked={citizenAffidavit}
                onChange={(e) => setCitizenAffidavit(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="rti-affidavit" className="text-[10px] text-gray-800 leading-snug cursor-pointer">
                <strong>CITIZEN OATH:</strong> I hereby declare that receiving this information will not induce distress, cynicism, or anti-national cognitive dissonance in my daily routine.
              </label>
            </div>

            {/* Captcha */}
            <div className="flex items-center space-x-2 text-[10px]">
              <div className="bg-yellow-200 border border-black p-1 font-mono font-bold text-red-950 text-center shrink-0">
                CAPTCHA: 0 Press Conferences + 0 Unscripted Interviews = ?
              </div>
              <input
                type="text"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                className="win95-box-inset w-12 px-1 py-1 text-center font-bold bg-white"
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* DIGITAL BRIBE EXPRESS CHECKOUT DESK */}
          {/* ========================================================= */}
          <div className={`p-3 border-2 transition-all duration-300 relative overflow-hidden ${
            bribePaid 
              ? 'bg-green-100 border-green-600' 
              : 'bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 border-amber-600 shadow-md'
          }`}>
            
            {/* Animated Bribe Acceptance Flash */}
            {bribeAnimation && (
              <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center z-10 animate-pulse">
                <span className="bg-green-800 text-yellow-200 px-3 py-1 font-black text-sm border-2 border-white shadow-xl rotate-[-2deg]">
                  💰 ₹500 SPEED MONEY CONFIRMED! FILE FAST-TRACKED! 💰
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center shrink-0 shadow-inner ${
                  bribePaid ? 'bg-green-600 text-white' : 'bg-amber-400 text-black animate-bounce'
                }`}>
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-black text-xs uppercase text-red-900">
                      UNDER-THE-TABLE SPEED MONEY PROTOCOL
                    </span>
                    {bribePaid ? (
                      <span className="bg-green-700 text-white text-[9px] font-black px-1.5 py-0.2 uppercase">
                        PAID ({bribeCount}x)
                      </span>
                    ) : (
                      <span className="bg-red-700 text-yellow-200 text-[9px] font-black px-1.5 py-0.2 uppercase blink-fast">
                        REQUIRED TO UNLOCK SUBMIT
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-700 font-sans mt-0.5 leading-tight">
                    {bribePaid 
                      ? 'Administrative gears have been adequately lubricated with ₹500 digital tea money. Submit button is locked and stable!' 
                      : 'File is trapped under desk leg. Pay symbolic digital bribe to stop the submit button from moving around your screen.'}
                  </p>
                </div>
              </div>

              {/* Bribe Button */}
              <div className="flex items-center gap-2 shrink-0">
                {!bribePaid ? (
                  <button
                    type="button"
                    id="pay-digital-bribe-btn"
                    onClick={handlePayBribe}
                    className="win95-btn px-4 py-2.5 bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-black text-xs flex items-center space-x-1.5 border-2 border-black shadow-[3px_3px_0px_#000] active:scale-95 cursor-pointer animate-pulse"
                    title="Click to pay digital speed bribe and freeze the fleeing submit button!"
                  >
                    <DollarSign className="w-4 h-4 text-yellow-300" />
                    <span>PAY ₹500 SPEED BRIBE</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-green-900 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-green-700" />
                      GREASED
                    </span>
                    <button
                      type="button"
                      onClick={handleResetPortal}
                      className="win95-btn px-2 py-1 text-[10px] bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold"
                      title="Reset and make button dodge again"
                    >
                      [RELOCK BUTTON]
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* THE DODGING / FLEEING SUBMIT BUTTON ARENA */}
          {/* ========================================================= */}
          <div 
            ref={arenaRef}
            className="win95-box-inset p-4 bg-[#c8c8c8] border-2 border-gray-600 relative min-h-[140px] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Taunt Bar */}
            <div className="text-center mb-3">
              <div className="text-[11px] font-black text-red-900 font-mono flex items-center justify-center gap-1">
                <span>DODGE COUNTER: {dodgeCount} ESCAPES</span>
                {dodgeCount > 0 && !bribePaid && (
                  <span className="text-orange-700 text-[10px]">
                    (TAUNT: "{DODGE_TAUNTS[tauntIndex]}")
                  </span>
                )}
              </div>
              {!bribePaid && dodgeCount >= 2 && (
                <div className="text-[10px] text-blue-900 font-bold animate-pulse mt-0.5">
                  👉 HINT: The babu won't let you click this button until you click "PAY ₹500 SPEED BRIBE" above!
                </div>
              )}
            </div>

            {/* The Submit Button (Dodges cursor until bribe is paid) */}
            <div
              className="transition-transform duration-150 ease-out"
              style={{
                transform: `translate(${dodgeOffset.x}px, ${dodgeOffset.y}px)`,
              }}
            >
              <button
                id="submit-rti-button"
                type="submit"
                onMouseEnter={handleButtonDodge}
                onTouchStart={handleButtonDodge}
                onClick={(e) => {
                  if (!bribePaid) {
                    e.preventDefault();
                    handleButtonDodge();
                  }
                }}
                className={`win95-btn px-6 py-3 font-black text-xs sm:text-sm border-2 border-black flex items-center space-x-2 transition-all cursor-pointer ${
                  bribePaid
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-400 hover:bg-yellow-300 text-red-950 shadow-[4px_4px_0px_#000] ring-2 ring-green-600'
                    : 'bg-red-700 hover:bg-red-600 text-white shadow-[3px_3px_0px_#000]'
                }`}
                title={
                  bribePaid 
                    ? "Bribe paid! Click to submit RTI for instant rejection!" 
                    : "Hovering or clicking will cause this button to dodge!"
                }
              >
                {bribePaid ? (
                  <>
                    <Send className="w-4 h-4 text-green-900" />
                    <span className="tracking-wide">
                      SUBMIT RTI (SPEED PASS ACTIVATED)
                    </span>
                    <Sparkles className="w-4 h-4 text-orange-700" />
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-yellow-300" />
                    <span className="tracking-wide">
                      SUBMIT RTI PETITION [CATCH ME IF YOU CAN]
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Status Footer inside Arena */}
            <div className="mt-3 text-[9px] text-gray-600 font-mono text-center">
              SUBMIT BUTTON ACCELERATION: {bribePaid ? '0.00 M/S (ANCHORED)' : `${Math.min(99, dodgeCount * 14 + 10)} KM/H (EVADING CITIZEN)`}
            </div>
          </div>

        </form>

        {/* Status Bar */}
        <div className="p-2 bg-[#c0c0c0] border-t border-gray-400 flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-700 font-bold gap-1">
          <div>
            RTI DISCLOSURE ACCORD 2005 (SUPERSEDED BY 56-INCH CONVENIENCE EDICT)
          </div>
          <div className="text-blue-900">
            SPEED MONEY ENCRYPTION: 100% SECURE (POCKET TRANSFER)
          </div>
        </div>

      </div>
    </section>
  );
};
