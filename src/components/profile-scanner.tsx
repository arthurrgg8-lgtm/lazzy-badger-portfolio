"use client";

import Image from "next/image";
import { profile } from "@/lib/profile";

export function ProfileScanner() {
  return (
    <div className="relative mx-auto w-full max-w-[320px] xs:max-w-[380px] md:max-w-[460px] lg:mr-0 group">
      {/* Subtle border glow */}
      <div className="absolute -inset-2 rounded-[2.5rem] bg-[rgba(215,181,109,0.12)] blur-lg opacity-60 group-hover:opacity-80 transition duration-500" />
      
      {/* Main Glass Frame */}
      <div className="glass relative aspect-square w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_24px_90px_rgba(0,0,0,0.4)]">
        
        {/* Profile Image */}
        <Image
          alt="Anudit Khatri profile portrait"
          className="object-cover grayscale-[10%] contrast-105 select-none group-hover:scale-[1.02] transition duration-700"
          fill
          priority
          sizes="(max-width: 768px) 92vw, 460px"
          src="/assets/lazzy.jpeg"
        />

        {/* Minimal Tech Corner Marks */}
        <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-[var(--gold)]/40" />
        <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-[var(--gold)]/40" />
        <div className="pointer-events-none absolute left-3 bottom-3 h-3 w-3 border-l border-b border-[var(--gold)]/40" />
        <div className="pointer-events-none absolute right-3 bottom-3 h-3 w-3 border-r border-b border-[var(--gold)]/40" />

        {/* Clean Tech Overlay Metrics */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between font-mono text-[9px] text-[var(--cream)]/60 pointer-events-none z-20 select-none">
          {/* Top Row */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>NODE_ACTIVE</span>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/5 flex items-center gap-1">
              <span>STATUS:</span>
              <span className="text-[var(--gold)] font-bold">VERIFIED</span>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between items-end">
            <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/5">
              <span>SECURITY_OPERATIONS</span>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/5">
              <span>CORE_NODE</span>
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
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--gold)] font-mono">{profile.identity.tagline}</p>
          <h2 className="text-4xl font-semibold text-[var(--cream)] font-display">{profile.identity.name}</h2>
          <p className="text-lg font-medium text-white/60">{profile.identity.short_bio}</p>
        </div>
      </div>

    </div>
  );
}
