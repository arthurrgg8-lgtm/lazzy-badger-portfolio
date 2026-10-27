"use client";

import { useEffect, useState } from "react";

class CyberSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscSub: OscillatorNode | null = null;
  private oscHarmonic: OscillatorNode | null = null;
  private oscThird: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private isRunning = false;
  private listeners = new Set<(running: boolean) => void>();

  public subscribe(fn: (running: boolean) => void) {
    this.listeners.add(fn);
    fn(this.isRunning);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.isRunning);
      } catch {}
    });
  }

  public init() {
    if (this.ctx) return;
    const AudioCtx =
      typeof window !== "undefined"
        ? window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        : null;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
  }

  public async start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      try {
        await Promise.race([
          this.ctx.resume(),
          new Promise((_, reject) => setTimeout(() => reject(new Error("AudioContext resume timeout")), 250))
        ]);
      } catch {
        return;
      }
    }
    if (this.isRunning) return;

    try {
      const t = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, t);
      // Gentle 1.8s atmospheric fade-in
      this.masterGain.gain.linearRampToValueAtTime(0.08, t + 1.8);
      this.masterGain.connect(this.ctx.destination);

      // Lowpass Filter for warm, dark cinematic feel
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(240, t);
      this.filter.Q.setValueAtTime(3.2, t);
      this.filter.connect(this.masterGain);

      // LFO for slow breathing filter modulation
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.09, t); // ~11 second gentle breath
      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(75, t);
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filter.frequency);
      this.lfo.start();

      // Sub Drone (55Hz / A1)
      this.oscSub = this.ctx.createOscillator();
      this.oscSub.type = "sine";
      this.oscSub.frequency.setValueAtTime(55, t);
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.45, t);
      this.oscSub.connect(subGain);
      subGain.connect(this.filter);
      this.oscSub.start();

      // Harmonic Drone (110.2Hz / A2 slightly detuned)
      this.oscHarmonic = this.ctx.createOscillator();
      this.oscHarmonic.type = "triangle";
      this.oscHarmonic.frequency.setValueAtTime(110.3, t);
      const harmGain = this.ctx.createGain();
      harmGain.gain.setValueAtTime(0.3, t);
      this.oscHarmonic.connect(harmGain);
      harmGain.connect(this.filter);
      this.oscHarmonic.start();

      // Atmospheric fifth (164.8Hz / E3)
      this.oscThird = this.ctx.createOscillator();
      this.oscThird.type = "sine";
      this.oscThird.frequency.setValueAtTime(164.8, t);
      const thirdGain = this.ctx.createGain();
      thirdGain.gain.setValueAtTime(0.18, t);
      this.oscThird.connect(thirdGain);
      thirdGain.connect(this.filter);
      this.oscThird.start();

      this.isRunning = true;
      this.notify();
    } catch (e) {
      console.warn("Audio start prevented:", e);
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain || !this.isRunning) return;
    try {
      const t = this.ctx.currentTime;
      this.masterGain.gain.linearRampToValueAtTime(0.0001, t + 0.6);
      setTimeout(() => {
        try {
          this.oscSub?.stop();
          this.oscHarmonic?.stop();
          this.oscThird?.stop();
          this.lfo?.stop();
          this.oscSub?.disconnect();
          this.oscHarmonic?.disconnect();
          this.oscThird?.disconnect();
          this.lfo?.disconnect();
          this.lfoGain?.disconnect();
          this.filter?.disconnect();
          this.masterGain?.disconnect();
        } catch {}
        this.isRunning = false;
        this.notify();
      }, 650);
    } catch {}
  }

  public playBlip(freq = 880) {
    if (!this.ctx || !this.isRunning) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, t + 0.04);
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.06);
    } catch {}
  }

  public get running() {
    return this.isRunning;
  }
}

export const cyberSound =
  typeof window !== "undefined"
    ? new CyberSoundEngine()
    : ({
        subscribe: () => () => {},
        start: async () => {},
        stop: () => {},
        playBlip: () => {},
        running: false,
      } as unknown as CyberSoundEngine);

export function SoundController({ className = "" }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!cyberSound?.subscribe) return;
    const unsubscribe = cyberSound.subscribe(setIsPlaying);
    return unsubscribe;
  }, []);

  const toggleSound = async () => {
    if (isPlaying) {
      cyberSound.stop();
    } else {
      await cyberSound.start();
      cyberSound.playBlip(960);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSound}
      title={isPlaying ? "Mute ambient audio" : "Play ambient cyberpunk soundtrack"}
      aria-label={isPlaying ? "Mute ambient audio" : "Play ambient cyberpunk soundtrack"}
      className={`group relative flex items-center gap-1.5 sm:gap-2 rounded-full border px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono text-[8.5px] sm:text-[9.5px] transition-all duration-300 cursor-pointer select-none whitespace-nowrap shrink-0 active:scale-95 ${
        isPlaying
          ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)] shadow-[0_0_15px_rgba(215,181,109,0.3)]"
          : "border-white/10 bg-white/[0.03] text-white/50 hover:border-[var(--gold)]/40 hover:text-white"
      } ${className}`}
    >
      {/* Equalizer animation bars */}
      <div className="flex items-end gap-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0">
        <span
          className={`w-0.5 rounded-full transition-all duration-300 ${
            isPlaying ? "bg-[var(--gold)] animate-[hud-eq-1_0.8s_ease-in-out_infinite]" : "h-1 bg-white/30"
          }`}
        />
        <span
          className={`w-0.5 rounded-full transition-all duration-300 ${
            isPlaying ? "bg-[var(--gold)] animate-[hud-eq-2_0.6s_ease-in-out_infinite]" : "h-2 bg-white/30"
          }`}
        />
        <span
          className={`w-0.5 rounded-full transition-all duration-300 ${
            isPlaying ? "bg-[var(--gold)] animate-[hud-eq-3_0.9s_ease-in-out_infinite]" : "h-1.5 bg-white/30"
          }`}
        />
        <span
          className={`w-0.5 rounded-full transition-all duration-300 ${
            isPlaying ? "bg-[var(--gold)] animate-[hud-eq-4_0.7s_ease-in-out_infinite]" : "h-1 bg-white/30"
          }`}
        />
      </div>

      <span className="font-semibold uppercase tracking-wider">
        {isPlaying ? "AUDIO: ACTIVE" : "AUDIO: OFF"}
      </span>

      {isPlaying && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold)] opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--gold)]" />
        </span>
      )}
    </button>
  );
}
