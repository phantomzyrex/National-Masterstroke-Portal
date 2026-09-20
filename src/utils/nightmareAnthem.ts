// Nightmarish 8-bit Low-Quality Chiptune Patriotic Anthem Engine
// Synthesizes a haunted, low-bitrate, periodic-glitching version of the national melody
// using pure Web Audio API (zero external assets, 100% reliable offline/online)

export type CorruptionLevel = 'mild' | 'cursed' | 'demonic';

export interface AnthemEventState {
  isPlaying: boolean;
  currentNote: string;
  isGlitching: boolean;
  glitchDescription: string;
  noteIndex: number;
  totalNotes: number;
  loopCount: number;
  meterValues: number[];
}

type Listener = (state: AnthemEventState) => void;

// Musical note frequencies (Hz)
const NOTE_FREQS: Record<string, number> = {
  'C3': 130.81,
  'D3': 146.83,
  'E3': 164.81,
  'F3': 174.61,
  'G3': 196.00,
  'A3': 220.00,
  'B3': 246.94,
  'C4': 261.63,
  'Cs4': 277.18,
  'D4': 293.66,
  'Ds4': 311.13,
  'E4': 329.63,
  'F4': 349.23,
  'Fs4': 369.99,
  'G4': 392.00,
  'Gs4': 415.30,
  'A4': 440.00,
  'As4': 466.16,
  'B4': 493.88,
  'C5': 523.25,
  'Cs5': 554.37,
  'D5': 587.33,
  'Ds5': 622.25,
  'E5': 659.25,
  'F5': 698.46,
  'REST': 0,
};

// Recognizable patriotic anthem notes with duration in quarter-beat units (1 = 180ms at ~132 BPM)
interface ScoreNote {
  note: string;
  beats: number;
  bass?: string;
  wordSnippet?: string;
}

const PATRIOTIC_SCORE: ScoreNote[] = [
  // "Jana Gana Mana Adhinayaka Jaya He"
  { note: 'C4', beats: 1, bass: 'C3', wordSnippet: 'JA' },
  { note: 'D4', beats: 1, bass: 'C3', wordSnippet: 'NA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'GA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'NA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'MA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'NA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'A' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'DHI' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'NA' },
  { note: 'D4', beats: 1, bass: 'C3', wordSnippet: 'YA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'KA' },
  { note: 'F4', beats: 2.2, bass: 'F3', wordSnippet: 'JA-YA HE' },

  // "Bharata Bhagya Vidhata"
  { note: 'E4', beats: 1, bass: 'G3', wordSnippet: 'BHA' },
  { note: 'E4', beats: 1, bass: 'G3', wordSnippet: 'RA' },
  { note: 'E4', beats: 1, bass: 'G3', wordSnippet: 'TA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'BHA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'GYA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'VI' },
  { note: 'B3', beats: 1, bass: 'G3', wordSnippet: 'DHA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'TA' },
  { note: 'C4', beats: 2.5, bass: 'C3', wordSnippet: '—' },

  // "Punjaba Sindhu Gujarata Maratha"
  { note: 'C4', beats: 1, bass: 'C3', wordSnippet: 'PUN' },
  { note: 'G4', beats: 1, bass: 'C3', wordSnippet: 'JA' },
  { note: 'G4', beats: 1, bass: 'C3', wordSnippet: 'BA' },
  { note: 'G4', beats: 1, bass: 'C3', wordSnippet: 'SIN' },
  { note: 'G4', beats: 1, bass: 'C3', wordSnippet: 'DHU' },
  { note: 'G4', beats: 1, bass: 'C3', wordSnippet: 'GU' },
  { note: 'G4', beats: 1, bass: 'C3', wordSnippet: 'JA' },
  { note: 'Fs4', beats: 1, bass: 'D3', wordSnippet: 'RA' },
  { note: 'A4', beats: 1, bass: 'D3', wordSnippet: 'TA' },
  { note: 'G4', beats: 2, bass: 'G3', wordSnippet: 'MA-RA-THA' },

  // "Dravida Utkala Banga"
  { note: 'F4', beats: 1, bass: 'F3', wordSnippet: 'DRA' },
  { note: 'F4', beats: 1, bass: 'F3', wordSnippet: 'VI' },
  { note: 'F4', beats: 1, bass: 'F3', wordSnippet: 'DA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'UT' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'KA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'LA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'BAN' },
  { note: 'F4', beats: 1, bass: 'G3', wordSnippet: '—' },
  { note: 'E4', beats: 2, bass: 'C3', wordSnippet: 'GA' },

  // "Vindhya Himachala Yamuna Ganga"
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'VIN' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'DHYA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'HI' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'MA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'CHA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'LA' },
  { note: 'G4', beats: 1, bass: 'G3', wordSnippet: 'YA' },
  { note: 'G4', beats: 1, bass: 'G3', wordSnippet: 'MU' },
  { note: 'G4', beats: 1, bass: 'G3', wordSnippet: 'NA' },
  { note: 'F4', beats: 1, bass: 'F3', wordSnippet: 'GAN' },
  { note: 'F4', beats: 2, bass: 'F3', wordSnippet: 'GA' },

  // "Uchchala Jaladhi Taranga"
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'UCH' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'CHA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'LA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'JA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'LA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'DHI' },
  { note: 'B3', beats: 1, bass: 'G3', wordSnippet: 'TA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'RAN' },
  { note: 'C4', beats: 2.2, bass: 'C3', wordSnippet: 'GA' },

  // "Tava Shubha Name Jage"
  { note: 'C4', beats: 1, bass: 'C3', wordSnippet: 'TA' },
  { note: 'D4', beats: 1, bass: 'C3', wordSnippet: 'VA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'SHU' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'BHA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'NA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'ME' },
  { note: 'E4', beats: 1, bass: 'G3', wordSnippet: 'JA' },
  { note: 'F4', beats: 2, bass: 'F3', wordSnippet: 'GE' },

  // "Tava Shubha Ashisha Mage"
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'TA' },
  { note: 'F4', beats: 1, bass: 'F3', wordSnippet: 'VA' },
  { note: 'G4', beats: 1, bass: 'G3', wordSnippet: 'SHU' },
  { note: 'G4', beats: 1, bass: 'G3', wordSnippet: 'BHA' },
  { note: 'G4', beats: 1, bass: 'G3', wordSnippet: 'A' },
  { note: 'F4', beats: 1, bass: 'F3', wordSnippet: 'SHI' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'SHA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'MA' },
  { note: 'F4', beats: 1, bass: 'F3', wordSnippet: '—' },
  { note: 'E4', beats: 2, bass: 'C3', wordSnippet: 'GE' },

  // "Gahe Tava Jaya Gatha"
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'GA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'HE' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'TA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'VA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'JA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'YA' },
  { note: 'B3', beats: 1, bass: 'G3', wordSnippet: 'GA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'THA' },
  { note: 'C4', beats: 2.2, bass: 'C3', wordSnippet: '—' },

  // "Jana Gana Mangala Dayaka Jaya He"
  { note: 'G4', beats: 1, bass: 'G3', wordSnippet: 'JA' },
  { note: 'G4', beats: 1, bass: 'G3', wordSnippet: 'NA' },
  { note: 'G4', beats: 1, bass: 'G3', wordSnippet: 'GA' },
  { note: 'G4', beats: 1, bass: 'G3', wordSnippet: 'NA' },
  { note: 'G4', beats: 1, bass: 'G3', wordSnippet: 'MAN' },
  { note: 'G4', beats: 1, bass: 'G3', wordSnippet: 'GA' },
  { note: 'Fs4', beats: 1, bass: 'D3', wordSnippet: 'LA' },
  { note: 'A4', beats: 1, bass: 'D3', wordSnippet: 'DA' },
  { note: 'G4', beats: 2, bass: 'G3', wordSnippet: 'YA-KA' },

  // "Bharata Bhagya Vidhata"
  { note: 'F4', beats: 1, bass: 'F3', wordSnippet: 'BHA' },
  { note: 'F4', beats: 1, bass: 'F3', wordSnippet: 'RA' },
  { note: 'F4', beats: 1, bass: 'F3', wordSnippet: 'TA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'BHA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'GYA' },
  { note: 'E4', beats: 1, bass: 'C3', wordSnippet: 'VI' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'DHA' },
  { note: 'F4', beats: 1, bass: 'G3', wordSnippet: '—' },
  { note: 'E4', beats: 2, bass: 'C3', wordSnippet: 'TA' },

  // "Jaya He, Jaya He, Jaya He"
  { note: 'B4', beats: 1.3, bass: 'G3', wordSnippet: 'JA' },
  { note: 'B4', beats: 0.7, bass: 'G3', wordSnippet: 'YA' },
  { note: 'C5', beats: 2, bass: 'C4', wordSnippet: 'HE' },

  { note: 'A4', beats: 1.3, bass: 'F3', wordSnippet: 'JA' },
  { note: 'A4', beats: 0.7, bass: 'F3', wordSnippet: 'YA' },
  { note: 'B4', beats: 2, bass: 'G3', wordSnippet: 'HE' },

  { note: 'G4', beats: 1.3, bass: 'C3', wordSnippet: 'JA' },
  { note: 'G4', beats: 0.7, bass: 'C3', wordSnippet: 'YA' },
  { note: 'A4', beats: 2, bass: 'F3', wordSnippet: 'HE' },

  // "Jaya Jaya Jaya Jaya He!"
  { note: 'C4', beats: 1, bass: 'C3', wordSnippet: 'JA' },
  { note: 'C4', beats: 1, bass: 'C3', wordSnippet: 'YA' },
  { note: 'D4', beats: 1, bass: 'D3', wordSnippet: 'JA' },
  { note: 'D4', beats: 1, bass: 'D3', wordSnippet: 'YA' },
  { note: 'E4', beats: 1, bass: 'E3', wordSnippet: 'JA' },
  { note: 'E4', beats: 1, bass: 'E3', wordSnippet: 'YA' },
  { note: 'D4', beats: 1, bass: 'G3', wordSnippet: 'JA' },
  { note: 'E4', beats: 1, bass: 'G3', wordSnippet: 'YA' },
  { note: 'F4', beats: 3, bass: 'C3', wordSnippet: 'HE!!!' },

  // Rest before loop
  { note: 'REST', beats: 3, wordSnippet: '[CORRUPTED TAPE REWIND]' }
];

// 8-bit quantization curve for authentic crusty SoundBlaster 2.0 / NES distortion
function createBitCrusherCurve(samples: number = 256, bits: number = 4): Float32Array<ArrayBuffer> {
  const buffer = new ArrayBuffer(samples * 4);
  const curve = new Float32Array(buffer);
  const step = Math.pow(2, bits);
  for (let i = 0; i < samples; ++i) {
    const x = (i * 2) / samples - 1;
    // Quantize step levels
    curve[i] = Math.round(x * step) / step;
  }
  return curve;
}

class NightmareAnthemPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private volume = 0.45;
  private corruptionLevel: CorruptionLevel = 'cursed';
  private currentNoteIndex = 0;
  private loopCount = 0;
  private nextNoteTimeout: ReturnType<typeof setTimeout> | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private distortionNode: WaveShaperNode | null = null;
  private listeners: Set<Listener> = new Set();
  private isGlitching = false;
  private glitchDescription = '';
  private forcedGlitchNext = false;
  private baseBpm = 138;

  constructor() {
    // Lazy initialized on user action
  }

  private initAudio() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();

    // Master bus
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

    // 8-bit bitcrush waveshaper
    this.distortionNode = this.ctx.createWaveShaper();
    this.distortionNode.curve = createBitCrusherCurve(256, 3); // 3-bit crusty quantization
    this.distortionNode.oversample = 'none';

    this.distortionNode.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    this.notify();
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state: AnthemEventState = {
      isPlaying: this.isPlaying,
      currentNote: PATRIOTIC_SCORE[this.currentNoteIndex]?.wordSnippet || 'IDLE',
      isGlitching: this.isGlitching,
      glitchDescription: this.glitchDescription,
      noteIndex: this.currentNoteIndex,
      totalNotes: PATRIOTIC_SCORE.length,
      loopCount: this.loopCount,
      meterValues: this.generateFakeVUMeter(),
    };
    this.listeners.forEach((fn) => fn(state));
  }

  private generateFakeVUMeter(): number[] {
    if (!this.isPlaying) return [0, 0, 0, 0, 0, 0, 0, 0];
    const base = this.isGlitching ? 0.9 : 0.65;
    return Array.from({ length: 8 }, () => {
      return Math.min(1, Math.max(0.1, base + (Math.random() * 0.4 - 0.2)));
    });
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setCorruption(level: CorruptionLevel) {
    this.corruptionLevel = level;
    if (this.distortionNode) {
      const bits = level === 'mild' ? 5 : level === 'cursed' ? 3 : 2;
      this.distortionNode.curve = createBitCrusherCurve(256, bits);
    }
  }

  public getCorruption(): CorruptionLevel {
    return this.corruptionLevel;
  }

  public forceGlitch() {
    this.forcedGlitchNext = true;
    this.isGlitching = true;
    this.glitchDescription = 'MANUALLY CORRUPTED TAPE BUFFEROVERFLOW';
    this.notify();
  }

  public toggleMute(muted?: boolean) {
    if (muted !== undefined) {
      this.isMuted = muted;
    } else {
      this.isMuted = !this.isMuted;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public isMutedState(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public start() {
    if (this.isPlaying) return;
    this.initAudio();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.startOminousDrone();
    this.playNextStep();
    this.notify();
  }

  public stop() {
    this.isPlaying = false;
    this.isGlitching = false;
    this.glitchDescription = '';
    if (this.nextNoteTimeout) {
      clearTimeout(this.nextNoteTimeout);
      this.nextNoteTimeout = null;
    }
    this.stopOminousDrone();
    this.notify();
  }

  public toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  // Ominous low-frequency undertone drone (haunted government broadcast frequency)
  private startOminousDrone() {
    if (!this.ctx || !this.distortionNode) return;
    try {
      this.stopOminousDrone();
      const now = this.ctx.currentTime;
      this.droneOsc = this.ctx.createOscillator();
      this.droneGain = this.ctx.createGain();

      // Low 58Hz electrical buzz with eerie detune
      this.droneOsc.type = 'sawtooth';
      this.droneOsc.frequency.setValueAtTime(58.27, now); // A#1-ish / 60Hz hum

      // Low-pass filter for muffled haunted room reverb
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);

      this.droneGain.gain.setValueAtTime(0.08, now);

      this.droneOsc.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.distortionNode);
      this.droneOsc.start();
    } catch {
      // Audio block guard
    }
  }

  private stopOminousDrone() {
    try {
      if (this.droneOsc) {
        this.droneOsc.stop();
        this.droneOsc.disconnect();
        this.droneOsc = null;
      }
      if (this.droneGain) {
        this.droneGain.disconnect();
        this.droneGain = null;
      }
    } catch {
      // Ignore
    }
  }

  // Synthesize a single 8-bit chiptune note + bass + noise
  private play8BitNote(freq: number, durationSec: number, bassNote?: string, glitchMode?: string) {
    if (!this.ctx || !this.distortionNode || freq <= 0) return;
    const now = this.ctx.currentTime;

    // 1. Lead 8-bit Chiptune Square Oscillator
    const leadOsc = this.ctx.createOscillator();
    const leadGain = this.ctx.createGain();
    leadOsc.type = 'square';

    let actualFreq = freq;

    // Apply nightmarish pitch glitches
    if (glitchMode === 'detune_down') {
      // Gruesome tape drag: slides down 400 cents
      leadOsc.frequency.setValueAtTime(actualFreq, now);
      leadOsc.frequency.exponentialRampToValueAtTime(Math.max(40, actualFreq * 0.65), now + durationSec);
    } else if (glitchMode === 'tritone_horror') {
      // Replace with discordant augmented 4th / diminished 5th (tritone evil interval)
      actualFreq = actualFreq * 1.4142;
      leadOsc.frequency.setValueAtTime(actualFreq, now);
    } else if (glitchMode === 'tape_wobble') {
      // Rapid vibrato sickness
      leadOsc.frequency.setValueAtTime(actualFreq, now);
      leadOsc.frequency.setValueAtTime(actualFreq * 1.08, now + durationSec * 0.25);
      leadOsc.frequency.setValueAtTime(actualFreq * 0.92, now + durationSec * 0.5);
      leadOsc.frequency.setValueAtTime(actualFreq * 1.05, now + durationSec * 0.75);
    } else {
      // Normal crunchy square
      leadOsc.frequency.setValueAtTime(actualFreq, now);
    }

    // Classic 8-bit gate envelope (sharp rectangular attack, decay)
    const peakVol = 0.22;
    leadGain.gain.setValueAtTime(0.001, now);
    leadGain.gain.linearRampToValueAtTime(peakVol, now + 0.015);
    leadGain.gain.setValueAtTime(peakVol * 0.8, now + durationSec * 0.8);
    leadGain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    leadOsc.connect(leadGain);
    leadGain.connect(this.distortionNode);

    leadOsc.start(now);
    leadOsc.stop(now + durationSec + 0.05);

    // 2. Secondary Triangle Bass channel (NES style)
    if (bassNote && NOTE_FREQS[bassNote]) {
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'triangle';
      const bFreq = NOTE_FREQS[bassNote] || 130.81;

      bassOsc.frequency.setValueAtTime(glitchMode === 'tritone_horror' ? bFreq * 1.25 : bFreq, now);
      bassGain.gain.setValueAtTime(0.24, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + durationSec * 0.9);

      bassOsc.connect(bassGain);
      bassGain.connect(this.distortionNode);

      bassOsc.start(now);
      bassOsc.stop(now + durationSec);
    }

    // 3. Periodic Noise Snare / Dialup Chirp
    if (glitchMode === 'static_burst' || Math.random() < 0.2) {
      this.playChipNoiseBurst(durationSec * 0.25);
    }
  }

  // 8-bit LFSR / White Noise Burst (NES Noise channel)
  private playChipNoiseBurst(dur: number) {
    if (!this.ctx || !this.distortionNode) return;
    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * dur);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Quantized 1-bit noise
        data[i] = Math.random() > 0.5 ? 0.4 : -0.4;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);

      noise.connect(noiseGain);
      noiseGain.connect(this.distortionNode);
      noise.start();
    } catch {
      // Ignore
    }
  }

  private playNextStep() {
    if (!this.isPlaying) return;

    if (this.currentNoteIndex >= PATRIOTIC_SCORE.length) {
      this.currentNoteIndex = 0;
      this.loopCount++;
    }

    const currentScoreItem = PATRIOTIC_SCORE[this.currentNoteIndex];
    const noteName = currentScoreItem.note;
    const baseFreq = NOTE_FREQS[noteName] || 0;

    // Unit beat duration in ms
    let beatDurationMs = (60000 / this.baseBpm) * 0.5; // sixteenth-ish pulse

    // Glitch roll: determine if this note glitches
    let isGlitch = false;
    let glitchType = '';
    const glitchProbability = this.corruptionLevel === 'demonic' ? 0.38 : this.corruptionLevel === 'cursed' ? 0.22 : 0.10;

    if (this.forcedGlitchNext || (Math.random() < glitchProbability && noteName !== 'REST')) {
      isGlitch = true;
      this.forcedGlitchNext = false;
      const glitchChoices = ['detune_down', 'tritone_horror', 'tape_wobble', 'buffer_stutter', 'static_burst'];
      glitchType = glitchChoices[Math.floor(Math.random() * glitchChoices.length)];

      if (glitchType === 'detune_down') {
        this.glitchDescription = '⚠️ TAPE MOTOR DYING (-400 CENTS)';
      } else if (glitchType === 'tritone_horror') {
        this.glitchDescription = '⚠️ CORRUPTED DIABOLUS TRITONE INJECTED';
      } else if (glitchType === 'tape_wobble') {
        this.glitchDescription = '⚠️ CRT SIGNAL WARPING (PITCH FLUTTER)';
      } else if (glitchType === 'buffer_stutter') {
        this.glitchDescription = '⚠️ SOUNDBLASTER DMA STUTTER LOOP';
      } else {
        this.glitchDescription = '⚠️ 28.8K MODEM CRC ERROR STATIC';
      }
    } else {
      this.glitchDescription = '';
    }

    this.isGlitching = isGlitch;

    // Calculate actual duration
    let actualDurationMs = currentScoreItem.beats * beatDurationMs;

    // If buffer stutter glitch: play note rapidly in bursts
    if (isGlitch && glitchType === 'buffer_stutter') {
      const miniDur = 0.055;
      for (let s = 0; s < 4; s++) {
        setTimeout(() => {
          if (this.isPlaying) {
            this.play8BitNote(baseFreq * (s % 2 === 0 ? 1 : 1.18), miniDur, currentScoreItem.bass);
          }
        }, s * 65);
      }
      actualDurationMs = Math.max(actualDurationMs, 300);
    } else if (baseFreq > 0) {
      this.play8BitNote(baseFreq, (actualDurationMs * 0.85) / 1000, currentScoreItem.bass, glitchType);
    }

    this.notify();

    // Advance to next note
    this.nextNoteTimeout = setTimeout(() => {
      this.currentNoteIndex++;
      this.playNextStep();
    }, actualDurationMs);
  }
}

// Singleton audio player instance
export const nightmareAnthem = new NightmareAnthemPlayer();
