import React, { useEffect } from 'react';
import { ErrorModalData } from '../types';
import { playDing, playStampThud } from '../utils/audio';
import { AlertTriangle, ShieldAlert, Sparkles, X, Check, Coffee } from 'lucide-react';

interface RetroDialogModalProps {
  modalData: ErrorModalData;
  onClose: () => void;
}

export const RetroDialogModal: React.FC<RetroDialogModalProps> = ({ modalData, onClose }) => {
  if (!modalData.isOpen) return null;

  const handleAction = (isSecondary?: boolean) => {
    playStampThud();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-[1px] font-mono select-none">
      {/* 90s Dialog Window */}
      <div className="win95-box max-w-lg w-full bg-[#c0c0c0] p-1 shadow-2xl border-4 border-[#000080] animate-in fade-in zoom-in-95 duration-100">
        
        {/* Blue Title Bar */}
        <div className={`px-2 py-1.5 flex items-center justify-between text-white font-bold text-xs sm:text-sm ${
          modalData.severity === 'critical' 
            ? 'bg-gradient-to-r from-red-800 via-red-700 to-red-900'
            : modalData.severity === 'washing_machine'
            ? 'bg-gradient-to-r from-green-800 via-emerald-700 to-green-900'
            : 'bg-gradient-to-r from-[#000080] via-[#0000aa] to-[#000080]'
        }`}>
          <div className="flex items-center space-x-1.5 truncate">
            {modalData.severity === 'critical' ? (
              <ShieldAlert className="w-4 h-4 text-yellow-300 shrink-0" />
            ) : modalData.severity === 'washing_machine' ? (
              <Sparkles className="w-4 h-4 text-yellow-200 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-yellow-300 shrink-0" />
            )}
            <span className="truncate uppercase">{modalData.title}</span>
          </div>

          <button
            onClick={() => { playDing(); onClose(); }}
            className="win95-btn w-5 h-5 flex items-center justify-center text-black text-xs font-black bg-[#c0c0c0] shrink-0"
            title="Close Alert"
          >
            ✕
          </button>
        </div>

        {/* Dialog Body */}
        <div className="p-4 bg-[#dfdfdf] space-y-3 text-xs text-black">
          
          {/* Gazette Reference Header */}
          <div className="bg-yellow-200 border-2 border-black p-1.5 flex items-center justify-between text-[10px] font-black text-red-900">
            <span>OFFICIAL REF: {modalData.code}</span>
            <span>{modalData.gazetteRef}</span>
          </div>

          {/* Icon & Message Layout */}
          <div className="flex items-start space-x-3">
            {/* 90s Warning Icon Box */}
            <div className="w-12 h-12 shrink-0 bg-yellow-400 border-2 border-black p-2 flex items-center justify-center shadow">
              {modalData.severity === 'critical' ? (
                <span className="text-2xl font-black text-red-700">⛔</span>
              ) : modalData.severity === 'washing_machine' ? (
                <span className="text-2xl">🧼</span>
              ) : (
                <span className="text-2xl font-black text-black">⚠️</span>
              )}
            </div>

            {/* Message Text */}
            <div className="space-y-2 flex-1">
              <p className="text-black font-semibold leading-relaxed whitespace-pre-line text-[11px] sm:text-xs">
                {modalData.message}
              </p>
              
              {/* Babu Remarks Note */}
              {modalData.babuRemarks && (
                <div className="bg-white p-2 border border-dashed border-gray-600 text-[10px] text-blue-950 italic">
                  <span className="font-black not-italic text-red-700">DESK BABU REMARKS: </span>
                  {modalData.babuRemarks}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t-2 border-gray-400 flex flex-col sm:flex-row items-center justify-end gap-2">
            {modalData.secondaryActionText && (
              <button
                onClick={() => handleAction(true)}
                className="win95-btn px-3 py-1.5 text-xs text-blue-900 bg-white hover:bg-gray-100 border-2 border-black font-black w-full sm:w-auto"
              >
                {modalData.secondaryActionText}
              </button>
            )}
            <button
              onClick={() => handleAction(false)}
              className="win95-btn px-4 py-1.5 text-xs text-black bg-yellow-300 hover:bg-yellow-400 border-2 border-black font-black w-full sm:w-auto flex items-center justify-center space-x-1"
            >
              <Check className="w-3.5 h-3.5 text-green-800" />
              <span>{modalData.actionText || 'OK & ACCEPT JUMLA'}</span>
            </button>
          </div>

        </div>

        {/* Dialog Bottom Status Strip */}
        <div className="bg-[#c0c0c0] px-2 py-0.5 border-t border-gray-400 text-[9px] text-gray-700 font-bold flex justify-between">
          <span>NIC-DISMISSAL-CODE: 0x56_INCH</span>
          <span>PRESS [ESC] TO FILE GRIEVANCE INTO PAPER SHREDDER</span>
        </div>

      </div>
    </div>
  );
};
