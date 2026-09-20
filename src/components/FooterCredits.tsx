import React from 'react';
import { Mail, PhoneCall, Printer, ShieldAlert, Heart } from 'lucide-react';
import { playDing } from '../utils/audio';

export const FooterCredits: React.FC = () => {
  return (
    <footer className="w-full bg-[#000080] border-t-4 border-yellow-400 text-yellow-300 font-mono py-6 px-3 sm:px-6 select-none mt-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Satirical Official Disclaimer Box */}
        <div className="win95-box p-3 sm:p-4 bg-yellow-100 text-black border-2 border-black text-xs">
          <div className="flex items-center space-x-2 font-black text-red-800 text-xs sm:text-sm uppercase mb-1">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
            <span>STATUTORY SATIRE & DEMOCRATIC PARODY ADVISORY</span>
          </div>
          <p className="text-gray-900 leading-relaxed font-semibold text-[11px] sm:text-xs">
            This digital portal is a comedic, satirical parody dedicated to political accountability and democratic humor. 
            It highlights government promises, demonetization, employment statistics, press freedom, and electoral bonds 
            from the analytical and caustic viewpoint of democratic opposition parties and the overburdened Indian citizen. 
            All characterizations, glitched meters, and bureaucratic forms are crafted under democratic parody standards. 
            No actual 15 lakhs were harmed or credited in the making of this portal.
          </p>
        </div>

        {/* 90s Bureaucratic Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="win95-box p-3 bg-white text-black border border-gray-400">
            <div className="font-black text-blue-900 uppercase mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-red-600" />
              <span>GRIEVANCE REDRESSAL DESK</span>
            </div>
            <p className="text-[11px] text-gray-700">
              Department of Rhetoric & Sloganeering<br />
              Room 404, Shastri Bhawan Basement<br />
              New Delhi – 110001 (Behind Tea Stall)
            </p>
          </div>

          <div className="win95-box p-3 bg-white text-black border border-gray-400">
            <div className="font-black text-blue-900 uppercase mb-1 flex items-center gap-1">
              <Printer className="w-3.5 h-3.5 text-green-700" />
              <span>OFFICIAL PARODY HELPLINE</span>
            </div>
            <p className="text-[11px] text-gray-700">
              Toll-Free Fax: 1800-56-JUMLA<br />
              Teleprompter Sync: 99.98 MHz<br />
              (Lines busy during election rallies)
            </p>
          </div>

          <div className="win95-box p-3 bg-white text-black border border-gray-400">
            <div className="font-black text-blue-900 uppercase mb-1 flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-purple-700" />
              <span>SERVER SPECIFICATIONS</span>
            </div>
            <p className="text-[11px] text-gray-700">
              Intel Pentium II 233 MHz<br />
              64 MB EDO RAM | 2.1 GB SCSI Hard Disk<br />
              OS: Microsoft Windows NT 4.0 Server
            </p>
          </div>

        </div>

        {/* Bottom 90s Copyright Strip */}
        <div className="pt-4 border-t border-blue-700 flex flex-col sm:flex-row items-center justify-between text-[11px] text-yellow-200 gap-2">
          <div>
            © 1999–2047 NATIONAL INFORMATICS CONFUSION (NIC). ALL RIGHTS RESERVED IN POWERPOINT.
          </div>
          <div className="flex items-center space-x-1 text-cyan-300">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for Indian Democratic Satire & Free Speech</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
