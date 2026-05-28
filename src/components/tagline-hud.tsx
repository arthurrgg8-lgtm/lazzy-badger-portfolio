"use client";

import { useState, useRef } from "react";
import { profile } from "@/lib/profile";

const matrixGlyphs = "X0189ABCDEF!@#$%^&*()_+~`<>?:{}[]-=/|";

export function TaglineHud() {
  const text = profile.identity.tagline;
  const [displayText, setDisplayText] = useState(text);
  const animationRef = useRef<number | null>(null);
  const frameRef = useRef(0);

  const startScramble = () => {
    const duration = 15; // Snappy hover scramble (15 frames)
    const chars = text.split("");
    const totalLength = chars.length;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const tick = () => {
      frameRef.current++;
      const currentFrame = frameRef.current;

      const progress = currentFrame / duration;
      const lockedCount = Math.floor(progress * totalLength);

      const nextText = chars
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < lockedCount) {
            return char;
          }
          const randGlyph = matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)];
          return randGlyph;
        })
        .join("");

      setDisplayText(nextText);

      if (currentFrame < duration) {
        animationRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(text);
      }
    };

    frameRef.current = 0;
    animationRef.current = requestAnimationFrame(tick);
  };

  return (
    <div
      className="mb-6 inline-flex items-center gap-3.5 rounded-lg border border-[var(--gold)]/30 bg-[var(--gold)]/5 px-4.5 py-2 font-mono text-[9px] uppercase tracking-[0.38em] text-[var(--gold)] shadow-[0_0_15px_rgba(215,181,109,0.04)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 hover:shadow-[0_0_25px_rgba(215,181,109,0.18)] transition-all duration-300 select-none group cursor-none"
      onMouseEnter={startScramble}
    >
      {/* High-Tech Glowing Brackets */}
      <span className="text-[var(--gold)]/40 group-hover:text-[var(--cream)] transition-colors duration-300 font-sans font-bold select-none">[</span>
      
      {/* Dynamic Telemetry Radar Pulse Dot */}
      <div className="relative flex h-1.5 w-1.5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--gold)] shadow-[0_0_6px_var(--gold)]" />
      </div>

      {/* Scramble Tagline Text */}
      <span className="text-[var(--cream)] font-bold tracking-[0.42em] translate-x-[0.21em]">{displayText}</span>

      <span className="text-[var(--gold)]/40 group-hover:text-[var(--cream)] transition-colors duration-300 font-sans font-bold select-none">]</span>
    </div>
  );
}
