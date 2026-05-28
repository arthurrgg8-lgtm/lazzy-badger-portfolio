"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { profile } from "@/lib/profile";

export function ProfileScanner() {
  const [matchRate, setMatchRate] = useState(98.65);

  useEffect(() => {
    const matchInterval = setInterval(() => {
      setMatchRate((prev) => {
        const delta = (Math.random() - 0.5) * 0.08;
        return parseFloat(Math.min(99.99, Math.max(97.5, prev + delta)).toFixed(2));
      });
    }, 1500);

    return () => clearInterval(matchInterval);
  }, []);

  // Facial coordinate nodes mapping key landmarks on the centered portrait photo
  const landmarks = [
    { left: "44%", top: "38%", delay: "0.1s" }, // Left Eye
    { left: "56%", top: "38%", delay: "0.2s" }, // Right Eye
    { left: "50%", top: "46%", delay: "0.4s" }, // Nose Tip
    { left: "46%", top: "54%", delay: "0.6s" }, // Left Mouth Corner
    { left: "54%", top: "54%", delay: "0.5s" }, // Right Mouth Corner
    { left: "50%", top: "62%", delay: "0.8s" }, // Chin
    { left: "37%", top: "48%", delay: "0.3s" }, // Left Cheekbone
    { left: "63%", top: "48%", delay: "0.7s" }  // Right Cheekbone
  ];

  return (
    <div className="relative mx-auto w-full max-w-[460px] lg:mr-0 group">
      {/* Dynamic Golden Aura back glow */}
      <div className="absolute -inset-5 rounded-[2.5rem] bg-[conic-gradient(from_140deg,transparent,rgba(215,181,109,0.45),rgba(8,35,70,0.65),transparent)] blur-xl opacity-90 group-hover:opacity-100 transition duration-500" />
      
      {/* Main Glass Frame */}
      <div className="glass relative aspect-square w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_24px_90px_rgba(0,0,0,0.4)]">
        
        {/* Profile Image */}
        <Image
          alt="Anudit Khatri profile portrait"
          className="object-cover grayscale-[15%] contrast-110 select-none group-hover:scale-[1.02] transition duration-700"
          fill
          priority
          sizes="(max-width: 768px) 92vw, 460px"
          src="/assets/lazzy.jpeg"
        />

        {/* 1. Golden Laser Scanner Sweep */}
        <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent shadow-[0_0_12px_var(--gold)] animate-[scanner-sweep_5s_infinite_ease-in-out] pointer-events-none z-20" />

        {/* 2. Target Crosshair HUD */}
        <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-dashed border-[var(--gold)]/25 animate-[hud-spin_20s_infinite_linear] pointer-events-none z-10 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full border border-[var(--gold)]/10" />
          <div className="absolute w-2 h-0.5 bg-[var(--gold)]/60 left-0" />
          <div className="absolute w-2 h-0.5 bg-[var(--gold)]/60 right-0" />
          <div className="absolute w-0.5 h-2 bg-[var(--gold)]/60 top-0" />
          <div className="absolute w-0.5 h-2 bg-[var(--gold)]/60 bottom-0" />
        </div>

        {/* 3. Biometric Landmark Blinking Coordinates */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {landmarks.map((dot, idx) => (
            <div
              key={idx}
              className="absolute w-1.5 h-1.5 rounded-full bg-[var(--gold)] shadow-[0_0_6px_var(--gold)] animate-[blink-dot_1.8s_infinite_ease-in-out]"
              style={{
                left: dot.left,
                top: dot.top,
                animationDelay: dot.delay
              }}
            />
          ))}
        </div>

        {/* 4. Digital Tech Overlay Metrics (Corner HUDs) */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between font-mono text-[9px] text-[var(--cream)]/60 pointer-events-none z-20 select-none">
          {/* Top Row */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SCANNER_ACTIVE</span>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/5 flex items-center gap-1">
              <span>MATCH:</span>
              <span className="text-[var(--gold)] font-bold">{matchRate}%</span>
            </div>
          </div>

          {/* Center Coordinates overlay */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-1 bg-black/40 backdrop-blur-sm p-1.5 rounded border border-white/5 text-[7px] text-white/40">
            <span>X: 24.184</span>
            <span>Y: 85.390</span>
            <span>Z: 0.082</span>
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between items-end">
            <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/5">
              <span>DOB: [REDACTED]</span>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/5">
              <span>SEC_REQS: SECURE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info Card Footer below image */}
      <div className="relative mt-8 pl-6">
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/20 to-transparent" />
        <div className="absolute -left-1 -top-1 h-2 w-2 border-l border-t border-[var(--gold)]" />
        <div className="absolute -left-1 bottom-0 h-2 w-2 border-b border-l border-[var(--gold)]" />
        
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--gold)] font-mono">biometric profile</p>
          <h2 className="text-4xl font-semibold text-[var(--cream)] font-display">{profile.identity.name}</h2>
          <p className="text-lg font-medium text-white/60">{profile.identity.short_bio}</p>
        </div>
      </div>

      {/* Isolated CSS Animations styling */}
      <style jsx global>{`
        @keyframes scanner-sweep {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        @keyframes hud-spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes blink-dot {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
