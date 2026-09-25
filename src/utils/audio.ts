// Synthesized 90s audio effects using native Web Audio API

let audioCtx: AudioContext | null = null;
let isAudioMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleMute(muted?: boolean): boolean {
  if (muted !== undefined) {
    isAudioMuted = muted;
  } else {
    isAudioMuted = !isAudioMuted;
  }
  return isAudioMuted;
}

export function isMuted(): boolean {
  return isAudioMuted;
}

// 90s Windows Ding
export function playDing(): void {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    // Primary chime
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // A5
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.1);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  } catch {
    // ignore audio block
  }
}

// Harsh Bureaucratic Error Buzz (Windows Chord / Critical Stop)
export function playErrorBuzz(): void {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc1.type = 'sawtooth';
    osc2.type = 'square';
    
    osc1.frequency.setValueAtTime(150, now);
    osc2.frequency.setValueAtTime(157, now); // dissonant tritone-ish beat
    
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
  } catch {
    // ignore audio block
  }
}

// Bureaucracy Rubber Stamp THUD
export function playStampThud(): void {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    // Sub punch
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);
    
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  } catch {
    // ignore
  }
}

// 90s Dial-up modem screech snippet (1 second comedic burst)
export function playDialupScreech(): void {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    // Dial tone
    const osc = ctx.createOscillator();
    const mod = ctx.createOscillator();
    const modGain = ctx.createGain();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    mod.type = 'square';
    mod.frequency.setValueAtTime(25, now);
    mod.frequency.linearRampToValueAtTime(80, now + 0.8);
    modGain.gain.setValueAtTime(300, now);
    
    mod.connect(osc.frequency);
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.linearRampToValueAtTime(2400, now + 0.7);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    mod.start(now);
    osc.start(now);
    mod.stop(now + 0.95);
    osc.stop(now + 0.95);
  } catch {
    // ignore
  }
}

// 8-bit Washing Machine / Clean Chit Fanfare
export function playCleanChitJingle(): void {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.1;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    });
  } catch {
    // ignore
  }
}

// Ribbon Cut "Snip" & Ceremonial Inauguration Fanfare
export function playInaugurationFanfare(): void {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Scissor Snip Sound (White noise click + quick filter decay)
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const snipFilter = ctx.createBiquadFilter();
    snipFilter.type = 'highpass';
    snipFilter.frequency.setValueAtTime(2500, now);
    const snipGain = ctx.createGain();
    snipGain.gain.setValueAtTime(0.4, now);
    snipGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    noise.connect(snipFilter);
    snipFilter.connect(snipGain);
    snipGain.connect(ctx.destination);
    noise.start(now);

    // 2. Triumphant Ceremonial Fanfare (Bugle / Brass style arpeggio)
    const fanfareNotes = [
      { f: 392.00, t: 0.10, d: 0.12 },  // G4
      { f: 523.25, t: 0.22, d: 0.12 },  // C5
      { f: 659.25, t: 0.34, d: 0.12 },  // E5
      { f: 783.99, t: 0.46, d: 0.35 },  // G5
      { f: 659.25, t: 0.82, d: 0.12 },  // E5
      { f: 783.99, t: 0.94, d: 0.12 },  // G5
      { f: 1046.50, t: 1.06, d: 0.70 }, // C6 (grand sustained climax)
    ];

    fanfareNotes.forEach((n) => {
      const noteTime = now + n.t;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.f, noteTime);

      // Brass envelope
      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(0.22, noteTime + 0.02);
      gain.gain.setValueAtTime(0.18, noteTime + n.d * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + n.d + 0.05);
    });
  } catch {
    // ignore
  }
}

// 90s Thermal Receipt Dot-Matrix Stepper Sound (Crunchy chk-chk-chk-bzzzz)
export function playThermalPrinterSound(): void {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Series of rapid stepper clicks + motor buzz
    for (let i = 0; i < 7; i++) {
      const stepTime = now + i * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i % 2 === 0 ? 'sawtooth' : 'square';
      osc.frequency.setValueAtTime(320 + (i % 3) * 160, stepTime);
      gain.gain.setValueAtTime(0.14, stepTime);
      gain.gain.exponentialRampToValueAtTime(0.001, stepTime + 0.055);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(stepTime);
      osc.stop(stepTime + 0.06);
    }
  } catch {
    // ignore
  }
}

// Digital Bribe Ka-Ching / Cash Drawer Register Sound
export function playCashRegisterBribeSound(): void {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Cash drawer slide clank (burst)
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);

    // Two bright bell dings (Ka-Ching!)
    // Note 1: E6 (1318.5 Hz)
    const bell1 = ctx.createOscillator();
    const bellGain1 = ctx.createGain();
    bell1.type = 'sine';
    bell1.frequency.setValueAtTime(1318.5, now + 0.04);
    bellGain1.gain.setValueAtTime(0.28, now + 0.04);
    bellGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    bell1.connect(bellGain1);
    bellGain1.connect(ctx.destination);
    bell1.start(now + 0.04);
    bell1.stop(now + 0.45);

    // Note 2: B6 (1975.5 Hz) - higher triumphant bell
    const bell2 = ctx.createOscillator();
    const bellGain2 = ctx.createGain();
    bell2.type = 'sine';
    bell2.frequency.setValueAtTime(1975.5, now + 0.12);
    bellGain2.gain.setValueAtTime(0.35, now + 0.12);
    bellGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    bell2.connect(bellGain2);
    bellGain2.connect(ctx.destination);
    bell2.start(now + 0.12);
    bell2.stop(now + 0.65);
  } catch {
    // ignore
  }
}

// Comical dodge / whoosh sound effect
export function playWooshDodgeSound(): void {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  } catch {
    // ignore
  }
}



