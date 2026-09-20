import React, { useState } from 'react';
import { ErrorModalData } from '../types';
import { ABSURD_CIRCULARS } from '../data/parodyData';
import { playDing, playErrorBuzz, playStampThud, playCleanChitJingle } from '../utils/audio';
import { 
  FileText, 
  HelpCircle, 
  Send, 
  Sparkles, 
  RotateCw, 
  ShieldCheck, 
  AlertTriangle, 
  Flame, 
  CheckSquare, 
  Square,
  FileCheck2
} from 'lucide-react';

interface AbsurdWorkflowSimulatorProps {
  onTriggerErrorModal: (modalData: ErrorModalData) => void;
}

export const AbsurdWorkflowSimulator: React.FC<AbsurdWorkflowSimulatorProps> = ({ onTriggerErrorModal }) => {
  // 15 Lakh Form States
  const [applicantName, setApplicantName] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [bangedThali, setBangedThali] = useState(false);
  const [claimReason, setClaimReason] = useState('vegetables');
  const [selectedCaptcha, setSelectedCaptcha] = useState<number[]>([]);
  const [submitBtnOffset, setSubmitBtnOffset] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);

  // Washing Machine States
  const [corruptLeader, setCorruptLeader] = useState('irrigation_scam');
  const [isWashing, setIsWashing] = useState(false);
  const [washingCompleted, setWashingCompleted] = useState(false);

  // Circular Generator States
  const [activeCircularIndex, setActiveCircularIndex] = useState(0);

  const captchaOptions = [
    { id: 1, label: 'Mango Slicing Demonstration', isRealPC: false },
    { id: 2, label: 'Peacock Grain Feeding Protocol', isRealPC: false },
    { id: 3, label: 'Cloud Radar Concealment Chart', isRealPC: false },
    { id: 4, label: 'Teleprompter Calibration Screen', isRealPC: false },
    { id: 5, label: '18-Hour Work Selfie in Safari Suit', isRealPC: false },
    { id: 6, label: 'Unscripted Press Question On Economy', isRealPC: true }
  ];

  const handleToggleCaptcha = (id: number) => {
    playDing();
    if (selectedCaptcha.includes(id)) {
      setSelectedCaptcha(selectedCaptcha.filter(item => item !== id));
    } else {
      setSelectedCaptcha([...selectedCaptcha, id]);
    }
  };

  const handleDodgingSubmitHover = () => {
    if (dodgeCount < 3) {
      // Scurry button away to mock bureaucracy making forms impossible to click
      const randomX = (Math.random() - 0.5) * 160;
      const randomY = (Math.random() - 0.5) * 60;
      setSubmitBtnOffset({ x: randomX, y: randomY });
      setDodgeCount(prev => prev + 1);
      playDing();
    }
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playErrorBuzz();

    if (!applicantName.trim() || !aadhaarNumber.trim()) {
      onTriggerErrorModal({
        isOpen: true,
        title: 'APPLICATION INCOMPLETE: MANDATORY GENEALOGY MISSING',
        code: 'ERR-400-BABU-INCOMPLETE',
        gazetteRef: 'UNDER SECTION 42(A) OF CITIZEN GRIEVANCE STIFLING ACT',
        message: 'Applicant failed to supply complete 12-digit Aadhaar and genealogy tracing back to 1947. You are hereby directed to present 16 self-attested photocopies in green ink before the Tehsildar who is currently on study leave in Mauritius.',
        babuRemarks: 'Babu Remark: Application discarded in wastebasket near water cooler.',
        actionText: 'Stand in 8-Hour Line Again',
        severity: 'warning'
      });
      return;
    }

    if (selectedCaptcha.includes(6)) {
      onTriggerErrorModal({
        isOpen: true,
        title: 'FATAL CAPTCHA ERROR: PROHIBITED CONCEPT DETECTED',
        code: 'ERR-CAPTCHA-ILLEGAL-QUESTION',
        gazetteRef: 'CIRCULAR-NIC/PRESS/DENIAL/2026',
        message: 'You selected "Unscripted Press Question On Economy". No unscripted press conference has occurred in this jurisdiction in over 3,740 days. Selecting this option is classified as spreading synthetic hallucinations. Your Jan Dhan account balance has been debited ₹500 for server CPU cooling fees.',
        babuRemarks: 'Babu Remark: File locked with password known only to retired joint secretary.',
        actionText: 'Acknowledge Teleprompter Supremacy',
        secondaryActionText: 'Re-attempt with Mango option',
        severity: 'critical'
      });
      return;
    }

    // Default Bureaucratic Rejection
    onTriggerErrorModal({
      isOpen: true,
      title: '₹15 LAKH APPLICATION REJECTED: SAMOSA RECESS CLAUSE',
      code: 'ERR-420-GAZETTE-REV-9B',
      gazetteRef: 'VIDE NOTIFICATION NO. F.No. 420/IT-JUM/2016',
      message: `Dear ${applicantName}, your application for direct debit of ₹15,00,000 was duly scrutinized by the National Committee on Chunavi Jumlas. Rejection grounds: 1. Reason "${claimReason}" is non-compliant with 56-inch pride metrics. 2. The Desk Officer was on a post-lunch samosa tea break from 1:00 PM to 4:45 PM. 3. Thali banging frequency must be verified by acoustic spectroscopy.`,
      babuRemarks: 'Official Disposal: Amount of ₹15 Lakh has been re-allocated to advertise the inauguration of the ₹15 Lakh Disbursement Portal.',
      actionText: 'Accept Jumla as Poetic Metaphor',
      secondaryActionText: 'File Appeal in Supreme Court (28 Year Waitlist)',
      severity: 'critical'
    });
  };

  const handleRunWashingMachine = () => {
    playStampThud();
    setIsWashing(true);
    setWashingCompleted(false);

    setTimeout(() => {
      setIsWashing(false);
      setWashingCompleted(true);
      playCleanChitJingle();
      onTriggerErrorModal({
        isOpen: true,
        title: 'CLEAN CHIT SANCTIONED: PURITY LEVEL 99.9% TIDE WHITE',
        code: 'ED-CBI-CLEAN-CHIT-100',
        gazetteRef: 'SPECIAL ORDINANCE ON CONVENIENT POLITICAL ALLIANCES 2026',
        message: 'The accused leader has successfully completed the 3-minute washing cycle by wearing the official ruling party scarf on prime time television. All 14 CBI investigations, 9 ED property attachments, and 4 Income Tax search warrants have dissolved into fragrant rosewater bubbles.',
        babuRemarks: 'Immediate Action: Leader sworn in as Cabinet Minister in charge of Anti-Corruption Enforcement.',
        actionText: 'Celebrate Historic Moral Victory',
        secondaryActionText: 'Download Clean Chit Certificate (Gold Border)',
        severity: 'washing_machine'
      });
    }, 2200);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 my-6 font-mono">
      {/* 90s Double Windows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* WINDOW 1: The ₹15 Lakh DBT Grievance Redressal Form */}
        <div className="win95-box p-1 bg-[#c0c0c0] shadow-xl border-2 border-black flex flex-col justify-between">
          
          {/* Header Bar */}
          <div className="bg-[#000080] text-white px-3 py-1.5 flex items-center justify-between font-bold text-xs">
            <div className="flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-yellow-300" />
              <span>FORM 420-A: CLAIM FOR ₹15,00,000 JAN DHAN CREDIT</span>
            </div>
            <span className="text-[10px] bg-red-600 px-1 border border-white font-black">
              MANDATORY
            </span>
          </div>

          {/* Form Content */}
          <form onSubmit={handleClaimSubmit} className="p-3 sm:p-4 bg-[#dfdfdf] flex-1 flex flex-col justify-between text-xs text-black">
            
            <div className="space-y-3">
              <div className="bg-yellow-100 border border-black p-2 text-[11px] text-red-950 font-bold">
                NOTICE: Applying for this promised amount without prior written authorization from the PMO may result in immediate audit of your tea consumption expenses.
              </div>

              {/* Name Field */}
              <div>
                <label className="font-bold block mb-1">
                  1. FULL LEGAL NAME (AS RECORDED IN 1952 VOTER ARCHIVES):
                </label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g., Aam Aadmi (Common Taxpayer)"
                  className="win95-box-inset w-full px-2 py-1.5 text-black bg-white font-mono text-xs focus:outline-none"
                  required
                />
              </div>

              {/* Aadhaar Field */}
              <div>
                <label className="font-bold block mb-1">
                  2. 12-DIGIT AADHAAR ID (LINKED TO SOUL & BIOMETRIC IRIS):
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="XXXX-XXXX-XXXX"
                  className="win95-box-inset w-full px-2 py-1.5 text-black bg-white font-mono text-xs focus:outline-none"
                  required
                />
              </div>

              {/* Thali Banging Affidavit Checkbox */}
              <div className="bg-white p-2 border border-gray-500">
                <label 
                  onClick={() => { setBangedThali(!bangedThali); playDing(); }}
                  className="flex items-start space-x-2 cursor-pointer select-none"
                >
                  <div className="mt-0.5 text-blue-900">
                    {bangedThali ? <CheckSquare className="w-4 h-4 text-green-700" /> : <Square className="w-4 h-4 text-gray-500" />}
                  </div>
                  <span className="text-[11px] font-bold text-gray-900 leading-tight">
                    I solemnly swear on non-judicial stamp paper that I clanged metal thalis and blew conch shells on 22nd March 2020 at 5:00 PM for COVID eradication.
                  </span>
                </label>
              </div>

              {/* Claim Reason Select */}
              <div>
                <label className="font-bold block mb-1">
                  3. SELECT JUSTIFICATION FOR ASKING GOVERNMENT FOR MONEY:
                </label>
                <select
                  value={claimReason}
                  onChange={(e) => { setClaimReason(e.target.value); playDing(); }}
                  className="win95-box-inset w-full px-2 py-1 text-black bg-white text-xs font-mono focus:outline-none"
                >
                  <option value="vegetables">Need money to buy vegetables & cylinder (Automatic Disqualification)</option>
                  <option value="adani_shares">Desire to purchase green energy airport bonds (VIP Priority Track)</option>
                  <option value="pakoda_startup">Opening roadside pakoda frying enterprise (Eligible for ₹5 token subsidy)</option>
                  <option value="swiss_bank_greed">I believed the 2014 campaign speech literally (Classified as Sedition)</option>
                </select>
              </div>

              {/* Bureaucratic Captcha Trap */}
              <div className="border-2 border-dashed border-red-600 bg-red-50 p-2">
                <div className="font-black text-red-900 text-[11px] mb-1 flex items-center justify-between">
                  <span>NIC CAPTCHA: IDENTIFY UNSCRIPTED PRESS CONFERENCES</span>
                  <span className="text-[9px] bg-red-600 text-white px-1 font-bold">REQUIRED</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  {captchaOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => handleToggleCaptcha(opt.id)}
                      className={`p-1.5 text-left border font-bold flex items-center space-x-1 transition-colors ${
                        selectedCaptcha.includes(opt.id)
                          ? 'bg-[#000080] text-yellow-300 border-black shadow'
                          : 'bg-white text-black hover:bg-yellow-100 border-gray-400'
                      }`}
                    >
                      <span className="text-xs">
                        {selectedCaptcha.includes(opt.id) ? '☑' : '☐'}
                      </span>
                      <span className="truncate">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Runaway Submit Button */}
            <div className="mt-4 pt-3 border-t-2 border-gray-400 flex items-center justify-between relative min-h-[50px]">
              <span className="text-[10px] text-gray-700 font-bold">
                STAMP CHARGE: ₹100.00
              </span>
              
              <div
                style={{
                  transform: `translate(${submitBtnOffset.x}px, ${submitBtnOffset.y}px)`,
                  transition: 'transform 0.15s ease-out'
                }}
                onMouseEnter={handleDodgingSubmitHover}
              >
                <button
                  type="submit"
                  id="claim-15-lakh-submit-btn"
                  className="win95-btn px-4 py-2 bg-green-700 text-yellow-200 font-black text-xs flex items-center space-x-1.5 border-2 border-black hover:bg-green-600 shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SUBMIT CLAIM FOR ₹15 LAKH</span>
                </button>
              </div>
            </div>

          </form>

          {/* Window Footer Status */}
          <div className="bg-[#c0c0c0] px-2 py-1 border-t border-gray-400 text-[10px] text-gray-700 font-bold">
            Average Wait Time: 78 Years, 4 Months, 12 Days
          </div>
        </div>


        {/* WINDOW 2: The Ruling Alliance Washing Machine & Absurd Circulars */}
        <div className="space-y-6">
          
          {/* Washing Machine Module */}
          <div className="win95-box p-1 bg-[#c0c0c0] shadow-xl border-2 border-black">
            
            {/* Title Bar */}
            <div className="bg-[#000080] text-white px-3 py-1.5 flex items-center justify-between font-bold text-xs">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>POLITICAL WASHING MACHINE 3000 (CLEAN CHIT ENGINE)</span>
              </div>
              <span className="text-[10px] bg-green-600 text-white px-1 border border-white font-black">
                100% SUCCESS
              </span>
            </div>

            {/* Inner Simulator */}
            <div className="p-3 sm:p-4 bg-[#dfdfdf] text-xs text-black space-y-3">
              <p className="text-gray-900 font-bold text-[11px]">
                Accused of a ₹70,000 Crore irrigation scam or mining fraud? Insert opposition leader into the state-of-the-art Parliamentary Detergent Cycle!
              </p>

              {/* Target Leader Select */}
              <div>
                <label className="font-bold block mb-1">
                  SELECT ACCUSED OPPOSITION SCAMMER:
                </label>
                <select
                  value={corruptLeader}
                  onChange={(e) => { setCorruptLeader(e.target.value); playDing(); }}
                  className="win95-box-inset w-full px-2 py-1.5 text-black bg-white font-mono text-xs focus:outline-none"
                >
                  <option value="irrigation_scam">Leader A: ₹70,000 Crore Irrigation Dam Scheme (CBI/ED FIR pending)</option>
                  <option value="cooperative_bank">Leader B: Cooperative Bank Embezzlement (Summons sent yesterday)</option>
                  <option value="mining_kingpin">Leader C: Illegal Iron Ore Extraction Baron (Lookout circular active)</option>
                  <option value="sugar_mill_syndicate">Leader D: Subsidized Sugar Mill Default Syndicate</option>
                </select>
              </div>

              {/* Washing Animation Bay */}
              <div className="win95-box-inset p-3 bg-gradient-to-b from-blue-900 to-indigo-950 text-white text-center border-2 border-gray-600 relative overflow-hidden">
                {isWashing ? (
                  <div className="py-4 space-y-2">
                    <RotateCw className="w-10 h-10 text-cyan-300 animate-spin mx-auto" />
                    <div className="font-black text-yellow-300 tracking-widest blink-fast text-sm">
                      DETERGENT RINSE IN PROGRESS...
                    </div>
                    <div className="text-[10px] text-cyan-200">
                      Dissolving 42 CBI folders | Transferring saffron scarf | Drafting clean chit
                    </div>
                  </div>
                ) : washingCompleted ? (
                  <div className="py-2 space-y-1 bg-green-900/60 p-2 border border-green-400">
                    <FileCheck2 className="w-8 h-8 text-green-300 mx-auto" />
                    <div className="font-black text-green-200 text-xs">
                      WASH CYCLE COMPLETE: PURITY 100%
                    </div>
                    <div className="text-[10px] text-yellow-200 font-bold">
                      Designation: Deputy Chief Minister & Chairman of Anti-Corruption Vigilance
                    </div>
                  </div>
                ) : (
                  <div className="py-3 text-gray-300 text-[11px] space-y-1">
                    <div>STATUS: READY FOR DEFECTING LEADER INSERTION</div>
                    <div className="text-yellow-400 font-bold">
                      Takes only 3 seconds to wash away 20 years of economic offenses!
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                id="run-washing-machine-btn"
                disabled={isWashing}
                onClick={handleRunWashingMachine}
                className="win95-btn w-full py-2 bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 text-black font-black text-xs border-2 border-black flex items-center justify-center space-x-2 shadow-md hover:bg-yellow-400"
              >
                <RotateCw className={`w-4 h-4 ${isWashing ? 'animate-spin' : ''}`} />
                <span>{isWashing ? 'PURGING CHARGES...' : 'CROSS OVER & WASH CLEAN (INSTANT AMNESTY)'}</span>
              </button>

            </div>
          </div>


          {/* Absurd Official Gazette Circular Module */}
          <div className="win95-box p-1 bg-[#c0c0c0] shadow-xl border-2 border-black">
            
            {/* Title Bar */}
            <div className="bg-[#000080] text-white px-3 py-1.5 flex items-center justify-between font-bold text-xs">
              <div className="flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-yellow-300" />
                <span>OFFICIAL GAZETTE PARODY NOTIFICATIONS</span>
              </div>
              <button
                onClick={() => {
                  setActiveCircularIndex((prev) => (prev + 1) % ABSURD_CIRCULARS.length);
                  playStampThud();
                }}
                className="win95-btn px-1.5 py-0.5 text-[9px] bg-yellow-300 text-black font-black"
                title="Next circular"
              >
                NEXT CIRCULAR ➔
              </button>
            </div>

            {/* Circular Content */}
            <div className="p-3 bg-amber-50 text-black font-serif text-xs border border-gray-400 relative">
              <div className="border-b border-black pb-1 mb-2 flex justify-between items-center text-[10px] font-sans font-bold">
                <span>{ABSURD_CIRCULARS[activeCircularIndex].number}</span>
                <span>DATE: {ABSURD_CIRCULARS[activeCircularIndex].date}</span>
              </div>
              <div className="font-bold text-red-900 mb-1.5 font-sans uppercase text-[11px]">
                SUB: {ABSURD_CIRCULARS[activeCircularIndex].subject}
              </div>
              <p className="text-gray-800 leading-relaxed text-[11px] mb-3 italic">
                "{ABSURD_CIRCULARS[activeCircularIndex].body}"
              </p>
              <div className="flex justify-between items-end pt-1 border-t border-dashed border-gray-400 font-sans text-[10px]">
                <span className="text-green-800 font-bold">SEAL: [CONFIDENTIAL JUMALYA]</span>
                <span className="font-bold text-gray-700 text-right">
                  Sd/-<br />
                  {ABSURD_CIRCULARS[activeCircularIndex].signatory}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
