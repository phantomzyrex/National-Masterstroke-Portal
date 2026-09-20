import React, { useState, useEffect } from 'react';
import { 
  nightmareAnthem, 
  AnthemEventState, 
  CorruptionLevel 
} from '../utils/nightmareAnthem';
import { 
  Play, 
  Square, 
  Volume2, 
  VolumeX, 
  Zap, 
  Skull, 
  Radio, 
  Minimize2, 
  Maximize2, 
  Disc3,
  AlertTriangle
} from 'lucide-react';

interface HiddenAnthemPlayerProps {
  onOpenErrorModal?: (title: string, message: string) => void;
}

export const HiddenAnthemPlayer: React.FC<HiddenAnthemPlayerProps> = ({ onOpenErrorModal }) => {
  const [anthemState, setAnthemState] = useState<AnthemEventState>({
    isPlaying: false,
    currentNote: 'IDLE',
    isGlitching: false,
    glitchDescription: '',
    noteIndex: 0,
    totalNotes: 60,
    loopCount: 0,
    meterValues: [0, 0, 0, 0, 0, 0, 0, 0]
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [corruption, setCorruption] = useState<CorruptionLevel>('cursed');

  useEffect(() => {
    const unsubscribe = nightmareAnthem.subscribe((state) => {
      setAnthemState(state);
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = () => {
    if (anthemState.isPlaying) {
      nightmareAnthem.stop();
    } else {
      nightmareAnthem.start();
    }
  };

  const handleForceGlitch = () => {
    nightmareAnthem.forceGlitch();
  };

  const handleMuteToggle = () => {
    const nextMute = nightmareAnthem.toggleMute();
    setIsMuted(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    nightmareAnthem.setVolume(val);
  };

  const handleCorruptionChange = (lvl: CorruptionLevel) => {
    setCorruption(lvl);
    nightmareAnthem.setCorruption(lvl);
    if (lvl === 'demonic' && onOpenErrorModal) {
      onOpenErrorModal(
        'DEMONIC PATRIOTIC OVERDRIVE INITIALIZED',
        'You tuned the SoundBlaster 16 card to DEMONIC level. Audio frequency aliasing has breached Section 66A of the IT Act. Babu remarks: "Please listen with hands folded in reverent fear."'
      );
    }
  };

  return (
    <>
      {/* 1. Discreet Stealth Floating Badge (Bottom-Left) */}
      <div className="fixed bottom-3 left-3 z-40 flex items-center space-x-2">
        {/* Stealth Tape Trigger Button */}
        <button
          id="stealth-anthem-btn"
          onClick={() => setIsOpen(!isOpen)}
          className={`win95-btn px-2.5 py-1.5 flex items-center space-x-2 text-xs font-mono font-bold transition-all border-2 ${
            anthemState.isPlaying
              ? 'bg-red-900 text-yellow-300 border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.7)] animate-pulse'
              : 'bg-[#004080] hover:bg-[#002b55] text-cyan-200 border-yellow-400 opacity-85 hover:opacity-100'
          }`}
          title="Classified 8-Bit Patriotic MIDI Subsystem (SoundBlaster 16)"
        >
          <Disc3 className={`w-4 h-4 ${anthemState.isPlaying ? 'animate-spin text-yellow-300' : 'text-cyan-300'}`} />
          
          <div className="flex flex-col text-left leading-none">
            <span className="text-[10px] uppercase font-black tracking-wider flex items-center gap-1">
              {anthemState.isPlaying ? '🔴 8-BIT ANTHEM (LIVE)' : 'CLASSIFIED MIDI'}
            </span>
            <span className="text-[8px] text-gray-300">
              {anthemState.isPlaying ? `${anthemState.currentNote} [LOOP #${anthemState.loopCount + 1}]` : 'NIC_ANTHEM.MID'}
            </span>
          </div>

          <span className="text-[9px] bg-yellow-400 text-black px-1 py-0.5 rounded font-black">
            {isOpen ? '▲' : '▼'}
          </span>
        </button>

        {/* Quick Instant Play/Stop shortcut when minimized */}
        {!isOpen && (
          <button
            onClick={handleTogglePlay}
            className={`win95-btn px-2 py-1 text-xs font-black ${
              anthemState.isPlaying ? 'bg-red-700 text-white' : 'bg-green-700 text-yellow-200'
            }`}
            title={anthemState.isPlaying ? 'Halt Anthem' : 'Play 8-Bit Anthem'}
          >
            {anthemState.isPlaying ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
          </button>
        )}
      </div>

      {/* 2. Expanded Retro 90s WinAmp / SoundBlaster Hidden Player Window */}
      {isOpen && (
        <div 
          id="hidden-anthem-window"
          className="fixed bottom-14 left-2 sm:left-4 z-50 w-[95vw] max-w-sm sm:max-w-md bg-[#c0c0c0] text-black border-2 border-white shadow-[6px_6px_0px_#000000] font-mono text-xs select-none"
        >
          {/* Win95 Classical Title Bar */}
          <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between font-bold text-xs tracking-wider">
            <div className="flex items-center space-x-1.5 truncate">
              <Radio className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              <span className="truncate">NIC_SOUNDBLASTER_JANA_GANA_MANA.EXE (8-BIT)</span>
            </div>
            <div className="flex items-center space-x-1 shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                className="win95-btn px-1.5 py-0.5 bg-[#c0c0c0] text-black hover:bg-gray-300 text-[10px] font-bold"
                title="Minimize player to background"
              >
                <Minimize2 className="w-2.5 h-2.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="win95-btn px-1.5 py-0.5 bg-[#c0c0c0] text-black hover:bg-red-600 hover:text-white text-[10px] font-bold"
                title="Close Window (Audio continues in background)"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-2 space-y-2 bg-[#d4d0c8]">
            
            {/* Green CRT LCD Screen Display */}
            <div className={`p-2 border-2 border-gray-600 shadow-inner rounded-xs transition-colors ${
              anthemState.isGlitching ? 'bg-[#3b0000] text-red-300 border-red-500' : 'bg-[#002200] text-[#33ff33]'
            }`}>
              <div className="flex justify-between items-start border-b border-gray-700 pb-1 mb-1">
                <div className="text-[10px] uppercase font-bold tracking-tight">
                  {anthemState.isPlaying ? '▶ TRANSMITTING 8-BIT PATRIOTIC STREAM' : '⏹ PLAYBACK HALTED'}
                </div>
                <div className="text-[9px] px-1 bg-black text-yellow-300 font-bold border border-gray-600">
                  {corruption.toUpperCase()} MODE
                </div>
              </div>

              {/* Marquee / Current Word / Glitch Alert */}
              <div className="min-h-[38px] flex flex-col justify-center">
                {anthemState.isGlitching ? (
                  <div className="text-red-400 font-black text-xs animate-pulse flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span className="tracking-tight">{anthemState.glitchDescription}</span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black tracking-widest text-lime-300">
                      SYLLABLE: [{anthemState.currentNote}]
                    </span>
                    <span className="text-[10px] text-gray-400">
                      NOTE {anthemState.noteIndex + 1}/{anthemState.totalNotes}
                    </span>
                  </div>
                )}
                
                <div className="text-[9px] text-gray-400 mt-0.5 truncate">
                  SRC: 1998_NIC_SOUNDBLASTER_SAMPLE_HOLD.MID • LOOP #{anthemState.loopCount + 1}
                </div>
              </div>

              {/* 8-Bit Equalizer / VU Meter */}
              <div className="grid grid-cols-8 gap-1 pt-1 border-t border-gray-800 h-8 items-end">
                {anthemState.meterValues.map((val, idx) => {
                  const heightPct = Math.round(val * 100);
                  const isHigh = val > 0.75;
                  const isMed = val > 0.45;
                  return (
                    <div key={idx} className="h-full bg-black flex flex-col justify-end p-0.5 border border-gray-700">
                      <div
                        style={{ height: `${heightPct}%` }}
                        className={`w-full transition-all duration-75 ${
                          anthemState.isGlitching
                            ? 'bg-red-500'
                            : isHigh
                            ? 'bg-red-500'
                            : isMed
                            ? 'bg-yellow-400'
                            : 'bg-green-400'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Transport & Control Buttons */}
            <div className="flex items-center space-x-2 pt-1">
              <button
                id="anthem-play-toggle-btn"
                onClick={handleTogglePlay}
                className={`win95-btn flex-1 py-1.5 px-2 flex items-center justify-center space-x-1 text-xs font-bold ${
                  anthemState.isPlaying ? 'bg-red-700 hover:bg-red-800 text-yellow-200' : 'bg-green-700 hover:bg-green-800 text-white'
                }`}
              >
                {anthemState.isPlaying ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>STOP ANTHEM</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>PLAY 8-BIT ANTHEM</span>
                  </>
                )}
              </button>

              <button
                id="force-glitch-btn"
                onClick={handleForceGlitch}
                disabled={!anthemState.isPlaying}
                className={`win95-btn py-1.5 px-2 flex items-center space-x-1 text-xs font-black ${
                  anthemState.isPlaying 
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-black animate-bounce' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                title="Force immediate tape drag / tritone glitch!"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>GLITCH!</span>
              </button>

              <button
                id="anthem-mute-btn"
                onClick={handleMuteToggle}
                className="win95-btn p-1.5 text-black hover:bg-gray-200"
                title="Mute/Unmute Anthem"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-600" /> : <Volume2 className="w-4 h-4 text-green-700" />}
              </button>
            </div>

            {/* Volume & Corruption Settings */}
            <div className="bg-[#e8e4db] p-1.5 border border-gray-400 space-y-1.5 text-[10px]">
              
              {/* Volume Slider */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-gray-700">CHIP VOL:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-blue-900 cursor-pointer h-2"
                />
                <span className="font-mono w-8 text-right font-bold text-blue-900">{Math.round(volume * 100)}%</span>
              </div>

              {/* Corruption Preset Selector */}
              <div>
                <div className="font-bold text-gray-700 mb-0.5 flex items-center justify-between">
                  <span>NIGHTMARE CORRUPTION LEVEL:</span>
                  <span className="text-[9px] text-red-700 font-bold">
                    {corruption === 'mild' ? 'LOW STATIC' : corruption === 'cursed' ? 'HAUNTED TAPE' : 'HELLISH ALIASING'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => handleCorruptionChange('mild')}
                    className={`win95-btn py-1 text-[9px] font-bold ${
                      corruption === 'mild' ? 'bg-blue-900 text-yellow-300 font-black' : 'bg-gray-200 text-black'
                    }`}
                  >
                    1. MILD
                  </button>
                  <button
                    onClick={() => handleCorruptionChange('cursed')}
                    className={`win95-btn py-1 text-[9px] font-bold ${
                      corruption === 'cursed' ? 'bg-orange-700 text-white font-black' : 'bg-gray-200 text-black'
                    }`}
                  >
                    2. CURSED
                  </button>
                  <button
                    onClick={() => handleCorruptionChange('demonic')}
                    className={`win95-btn py-1 text-[9px] font-bold flex items-center justify-center gap-0.5 ${
                      corruption === 'demonic' ? 'bg-red-800 text-yellow-200 font-black' : 'bg-gray-200 text-black'
                    }`}
                  >
                    <Skull className="w-2.5 h-2.5" /> 3. DEMONIC
                  </button>
                </div>
              </div>

            </div>

            {/* Satirical Babu Audio Certification Notice */}
            <div className="text-[9px] text-gray-600 bg-yellow-100 p-1 border border-yellow-400 leading-tight">
              <strong>STATUTORY CAUTION:</strong> Broadcast under 1998 Telecommunication Rule 42-B. May cause spontaneous urge to stand up at attention in front of microwave.
            </div>

            {/* Minimize / Hide Hint */}
            <div className="text-center pt-0.5">
              <button
                onClick={() => setIsOpen(false)}
                className="text-[9px] text-blue-800 underline hover:text-red-700 font-bold"
              >
                [Hide player deck & keep anthem looping in background]
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
