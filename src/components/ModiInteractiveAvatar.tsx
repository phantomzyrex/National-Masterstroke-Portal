import React, { useState, useEffect, useRef } from 'react';
import { 
  playDing, 
  playStampThud, 
  playCleanChitJingle, 
  playDialupScreech 
} from '../utils/audio';
import { nightmareAnthem } from '../utils/nightmareAnthem';
import { 
  Sparkles, 
  MessageSquare, 
  Send, 
  Volume2, 
  X, 
  ChevronRight, 
  Flame, 
  Award, 
  RefreshCw,
  Camera,
  HeartHandshake
} from 'lucide-react';

export interface ModiAvatarPose {
  id: string;
  name: string;
  badge: string;
  imageUrl: string;
  moodTag: string;
  bgGradient: string;
}

const MODI_POSES: ModiAvatarPose[] = [
  {
    id: 'visionary',
    name: 'Official 2025 Visionary',
    badge: 'VIKSIT 2047 READY',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/The_official_portrait_of_Shri_Narendra_Modi%2C_the_Prime_Minister_of_the_Republic_of_India.jpg',
    moodTag: 'Statuesque & Direct Eye Contact',
    bgGradient: 'from-amber-500 via-orange-600 to-yellow-500'
  },
  {
    id: 'greeting',
    name: 'Warm Digital Namaste',
    badge: '100% BHAKTI AURA',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Official_Photograph_of_Prime_Minister_Narendra_Modi_Portrait_%28crop%29.png',
    moodTag: 'Welcoming & Benevolent Hand Gesture',
    bgGradient: 'from-orange-500 via-yellow-400 to-green-600'
  },
  {
    id: 'rally_orator',
    name: '56-Inch Stole Orator',
    badge: 'UNSCRIPTED DECIBELS',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Official_portrait_of_the_Prime_Minister_Narendra_Modi%2C_November_2020_%28cropped%29.jpg',
    moodTag: 'High-Impact Teleprompter Mastery',
    bgGradient: 'from-red-600 via-amber-600 to-yellow-400'
  },
  {
    id: 'governance',
    name: 'Cabinet Chief Architect',
    badge: 'CABINET SUPREME',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Official_portrait_of_Narendra_Modi_2022.jpg',
    moodTag: 'Calculated Micro-Management Pose',
    bgGradient: 'from-blue-700 via-indigo-800 to-purple-900'
  }
];

const PRESET_QUESTIONS = [
  "Where is my ₹15,00,000 direct benefit?",
  "Why is the rupee falling against the dollar?",
  "Can you give my uncle a 100% clean chit?",
  "How to frying pakodas count as GDP growth?",
  "Can I get a front-page newspaper advertisement?"
];

const CANNED_REPLIES: Record<string, string> = {
  "15 lakh": "Mitron! The ₹15,00,000 has already been deposited in your spiritual balance. Checking your bank ATM directly is an outdated foreign conspiracy to doubt 5-trillion economy momentum!",
  "rupee": "Bhaiyo aur Behno! Understand the chronology: The Rupee is NOT falling. The US Dollar is desperately climbing higher because it cannot handle India's 56-inch economic velocity!",
  "clean chit": "Send your uncle's application to our Shastri Bhawan Political Washing Machine. Once he waves the saffron towel on stage, all ED notices instantly transform into lifetime governance awards!",
  "pakoda": "Frying crisp pakodas on the sidewalk builds organic self-reliance, high-protein domestic demand, and 56-inch wrist strength! It is formally codified in Chapter 4 of Viksit Bharat 2047!",
  "advertisement": "Your photo with marigold garland has been forwarded to 48 national dailies. Tomorrow morning, citizens will read your headline before drinking morning chai!"
};

interface Message {
  sender: 'modi' | 'user';
  text: string;
  timestamp: string;
}

export const ModiInteractiveAvatar: React.FC = () => {
  const [activePoseIndex, setActivePoseIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'modi',
      text: 'Mitron! Welcome to the National Masterstroke Portal. Ask me anything about GDP inflation, washing machine certificates, or 56-inch governance!',
      timestamp: '12:00 PM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [auraBurst, setAuraBurst] = useState(false);
  const [isAnthemActive, setIsAnthemActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activePose = MODI_POSES[activePoseIndex];

  // Listen to 8-bit anthem for rhythmic head-bob aura
  useEffect(() => {
    const unsub = nightmareAnthem.subscribe((state) => {
      setIsAnthemActive(state.isPlaying);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const triggerAvatarSpeech = (text: string) => {
    setIsSpeaking(true);
    playDing();
    setTimeout(() => {
      setIsSpeaking(false);
    }, 2800);
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { sender: 'user', text, timestamp: time };
    
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    playStampThud();
    setIsSpeaking(true);

    // Generate satirical response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = "Bhaiyo aur Behno! Your query has been received by the Ministry of Unilateral Monologues. Please bang utensils at 5:00 PM for 5 minutes to accelerate file clearance!";
      
      for (const [key, val] of Object.entries(CANNED_REPLIES)) {
        if (lower.includes(key)) {
          reply = val;
          break;
        }
      }

      if (lower.includes("vikas") || lower.includes("growth")) {
        reply = "Vikas is running at 420.69% speed! In fact, we just laid foundation stone for 4 new bullet trains inside PowerPoint 2026!";
      } else if (lower.includes("modi") || lower.includes("hello") || lower.includes("hi")) {
        reply = "Namaste, mere pyare deshwasiyo! Keep your teleprompter clean, eat two samosas with mint chutney, and remember: Jumla Jayate!";
      }

      const modiMsg: Message = {
        sender: 'modi',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, modiMsg]);
      playCleanChitJingle();
      triggerAvatarSpeech(reply);

      // Cycle pose on answer
      setActivePoseIndex((prev) => (prev + 1) % MODI_POSES.length);
    }, 650);
  };

  const handleBlessingBurst = () => {
    setAuraBurst(true);
    playCleanChitJingle();
    setTimeout(() => setAuraBurst(false), 2500);
    const blessings = [
      "✨ 56-INCH AURA EMITTED: Your internet bandwidth is now consecrated with Viksit 2047 blessing!",
      "🌺 MARIGOLD SHOWER SANCTIONED: Foundation stone laid for your browser tab!",
      "⚡ TELEPROMPTER OVERDRIVE: Speech length extended by +35 minutes in your honor!"
    ];
    const picked = blessings[Math.floor(Math.random() * blessings.length)];
    setMessages((prev) => [
      ...prev,
      {
        sender: 'modi',
        text: picked,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handlePokeAvatar = () => {
    playDing();
    setActivePoseIndex((prev) => (prev + 1) % MODI_POSES.length);
    const pokes = [
      "Mitron! A direct touch on the 2D avatar triggers 10,000 immediate foundation stone photo-ops!",
      "Bhaiyo aur Behno! Why poke the avatar when you can stand at attention for the 8-bit anthem?",
      "Camera angle adjusted! High-definition teleprompter focused directly on you!"
    ];
    const picked = pokes[Math.floor(Math.random() * pokes.length)];
    setMessages((prev) => [
      ...prev,
      {
        sender: 'modi',
        text: picked,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    if (!isOpen) setIsOpen(true);
  };

  return (
    <>
      {/* 1. Floating Interactive 2D Avatar Badge (Docked Right-Middle) */}
      <div className="fixed right-3 bottom-16 sm:bottom-20 z-40 flex flex-col items-end group select-none">
        
        {/* Animated Speech Bubble Preview when minimized */}
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="mb-2 mr-1 bg-yellow-300 text-black border-2 border-black p-2 rounded-lg shadow-[4px_4px_0px_#000000] text-xs font-mono font-bold max-w-[210px] cursor-pointer hover:bg-yellow-200 transition-all animate-bounce"
            title="Click to interact with 2D Modi Avatar"
          >
            <div className="flex items-center space-x-1 text-[10px] text-red-700 font-black uppercase">
              <Sparkles className="w-3 h-3 text-orange-600 animate-spin" />
              <span>2D AVATAR ONLINE</span>
            </div>
            <p className="line-clamp-2 mt-0.5 leading-snug">
              {isAnthemActive ? "🎵 Bobbing to 8-Bit Anthem!" : "Mitron! Click me to discuss 56-inch Viksit Bharat!"}
            </p>
          </div>
        )}

        {/* 2D Avatar Mascot Circle with Animated Aura */}
        <div className="relative">
          {/* Saffron Aura Glow Ring */}
          <div className={`absolute -inset-1.5 rounded-full bg-gradient-to-r from-orange-500 via-yellow-400 to-green-500 blur-xs transition-all ${
            isSpeaking || isAnthemActive ? 'opacity-100 animate-spin' : 'opacity-70 group-hover:opacity-100'
          }`} />

          {/* Main 2D Avatar Image Button */}
          <button
            id="modi-avatar-mascot-btn"
            onClick={handlePokeAvatar}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-yellow-300 overflow-hidden bg-gradient-to-b ${activePose.bgGradient} shadow-2xl transition-transform transform active:scale-95 group-hover:scale-105 flex items-center justify-center`}
            title="Click 2D Modi Avatar to interact & change pose!"
          >
            <img
              src={activePose.imageUrl}
              alt="Ultra Realistic 2D Modi Avatar"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-top transition-transform duration-300 ${
                isSpeaking ? 'scale-110' : 'scale-100'
              } ${isAnthemActive ? 'animate-pulse' : ''}`}
            />

            {/* Speaking Wave / Sound Ring */}
            {isSpeaking && (
              <span className="absolute inset-0 border-4 border-yellow-300 rounded-full animate-ping pointer-events-none" />
            )}

            {/* 56-Inch Badge Tag */}
            <span className="absolute bottom-0 inset-x-0 bg-red-700/90 text-yellow-200 text-[8px] sm:text-[9px] font-black uppercase tracking-tighter py-0.5 text-center">
              56-INCH
            </span>
          </button>

          {/* Expand / Chat Button Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -top-1 -right-1 bg-yellow-400 hover:bg-yellow-500 text-black p-1 rounded-full border-2 border-black shadow"
            title="Open Interactive Avatar Console"
          >
            {isOpen ? <X className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. Interactive 2D Avatar Speech & Q&A Console */}
      {isOpen && (
        <div 
          id="modi-avatar-dialogue-console"
          className="fixed bottom-20 right-2 sm:right-5 z-50 w-[95vw] max-w-sm sm:max-w-md bg-[#c0c0c0] text-black border-2 border-white shadow-[8px_8px_0px_#000000] font-mono text-xs select-none flex flex-col max-h-[85vh]"
        >
          {/* Win95 Classical Title Bar */}
          <div className="bg-[#800000] text-yellow-300 px-2.5 py-1.5 flex items-center justify-between font-bold text-xs tracking-wider border-b border-black shrink-0">
            <div className="flex items-center space-x-2 truncate">
              <span className="text-base">☕</span>
              <span className="truncate font-black">2D MODI AVATAR: LIVE INTERACTION ENGINE</span>
            </div>
            <div className="flex items-center space-x-1 shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                className="win95-btn px-1.5 py-0.5 bg-[#c0c0c0] text-black hover:bg-red-700 hover:text-white font-bold"
                title="Minimize 2D Avatar"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Avatar Spotlight & Pose Selector Banner */}
          <div className="p-2.5 bg-gradient-to-r from-orange-100 via-amber-50 to-yellow-100 border-b-2 border-gray-400 flex items-center justify-between gap-3 shrink-0">
            
            {/* Main Portrait with 2D Frame */}
            <div className="flex items-center space-x-3">
              <div 
                onClick={handlePokeAvatar}
                className="relative w-14 h-14 rounded-full border-2 border-black overflow-hidden shadow-md shrink-0 cursor-pointer bg-orange-200"
                title="Click to cycle avatar pose!"
              >
                <img
                  src={activePose.imageUrl}
                  alt={activePose.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top hover:scale-110 transition-transform"
                />
                {isSpeaking && (
                  <div className="absolute inset-0 bg-yellow-400/20 animate-pulse" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-black text-xs text-red-800">{activePose.name}</span>
                  <span className="bg-red-600 text-white text-[8px] font-bold px-1 rounded">
                    {activePose.badge}
                  </span>
                </div>
                <div className="text-[10px] text-gray-700 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-ping inline-block" />
                  <span>{activePose.moodTag}</span>
                </div>
              </div>
            </div>

            {/* Quick Pose Switcher Button */}
            <button
              id="switch-pose-btn"
              onClick={() => setActivePoseIndex((prev) => (prev + 1) % MODI_POSES.length)}
              className="win95-btn px-2 py-1 text-[10px] font-bold bg-[#e0e0e0] hover:bg-yellow-200 flex items-center space-x-1 shrink-0"
              title="Switch to next realistic 2D pose"
            >
              <RefreshCw className="w-3 h-3 text-blue-800" />
              <span>POSE ({activePoseIndex + 1}/{MODI_POSES.length})</span>
            </button>
          </div>

          {/* Interactive Aura Blessing Ribbon */}
          {auraBurst && (
            <div className="bg-gradient-to-r from-orange-500 via-yellow-400 to-green-500 text-black font-black text-center py-1 text-[10px] uppercase tracking-wider animate-pulse border-b border-black">
              ✨ 56-INCH MARIGOLD AURA BLESSING TRANSMITTED TO YOUR BROWSER ✨
            </div>
          )}

          {/* Scrollable Conversation Thread */}
          <div className="flex-1 overflow-y-auto p-2.5 space-y-2 bg-[#d4d0c8] min-h-[170px] max-h-[260px]">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center space-x-1 text-[9px] text-gray-600 mb-0.5 px-1">
                  <span className="font-bold">{m.sender === 'modi' ? 'PM 2D AVATAR' : 'CITIZEN'}</span>
                  <span>• {m.timestamp}</span>
                </div>
                <div 
                  className={`p-2 rounded-xs border max-w-[85%] text-xs font-sans ${
                    m.sender === 'user'
                      ? 'bg-blue-900 text-yellow-200 border-black shadow-xs font-mono text-[11px]'
                      : 'bg-white text-black border-gray-600 shadow-sm leading-relaxed'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Satirical Suggestion Chips */}
          <div className="p-1.5 bg-[#e0e0e0] border-t border-gray-400 overflow-x-auto whitespace-nowrap space-x-1 shrink-0 flex items-center">
            <span className="text-[9px] font-black text-gray-600 uppercase mr-1">ASK:</span>
            {PRESET_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="win95-btn px-2 py-0.5 text-[9px] bg-white hover:bg-yellow-200 text-blue-950 font-bold border border-gray-500 rounded-none shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* User Input Form */}
          <div className="p-2 bg-[#c0c0c0] border-t-2 border-white flex items-center space-x-1.5 shrink-0">
            <input
              type="text"
              id="modi-avatar-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask avatar about Vikas, 15 Lakh, Samosas..."
              className="win95-box-inset flex-1 px-2 py-1.5 text-xs bg-white text-black font-sans focus:outline-hidden"
            />

            <button
              id="modi-avatar-send-btn"
              onClick={() => handleSend()}
              className="win95-btn px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white font-bold flex items-center space-x-1 text-xs"
            >
              <span>SEND</span>
              <Send className="w-3 h-3" />
            </button>
          </div>

          {/* Special Action Buttons Footer */}
          <div className="p-1.5 bg-[#b0b0b0] border-t border-gray-500 flex items-center justify-between text-[10px] shrink-0">
            <button
              onClick={handleBlessingBurst}
              className="win95-btn px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-black font-black flex items-center space-x-1"
              title="Emit marigold garland blessing"
            >
              <Sparkles className="w-3 h-3 text-red-700" />
              <span>56-INCH BLESSING</span>
            </button>

            <button
              onClick={() => triggerAvatarSpeech("Mitron! Desh aage badh raha hai!")}
              className="win95-btn px-2 py-1 bg-white hover:bg-yellow-100 text-blue-900 font-bold flex items-center space-x-1"
              title="Play vocal ding"
            >
              <Volume2 className="w-3 h-3 text-green-700" />
              <span>SAY "MITRON!"</span>
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-black underline font-bold"
            >
              [MINIMIZE]
            </button>
          </div>

        </div>
      )}
    </>
  );
};
