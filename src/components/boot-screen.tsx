"use client";

import { useEffect, useState } from "react";

const diagnosticLines = [
  "Initializing secure handshake to badger-node-pi4...",
  "Loading interface: wlan0mon (Ralink RT3070)...",
  "Checking packet injection capabilities... ACTIVE.",
  "Retrieving local target databases (DoD scope, corporate VDP)...",
  "Auditing configuration states (GraphQL endpoints, Next.js configs)...",
  "System integrity checks: SECURE.",
  "Access granted. Initializing portfolio core..."
];

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 1. Diagnostics printing timeline
    let lineIdx = 0;
    const printInterval = setInterval(() => {
      if (lineIdx < diagnosticLines.length) {
        setVisibleLines((prev) => [...prev, diagnosticLines[lineIdx]]);
        lineIdx++;
      } else {
        clearInterval(printInterval);
      }
    }, 220);

    // 2. Progress bar loader
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random progress jumps
        const jump = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + jump);
      });
    }, 80);

    return () => {
      clearInterval(printInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100 && visibleLines.length >= diagnosticLines.length) {
      // Small pause at 100% then fade out
      const timeout = setTimeout(() => {
        setIsFading(true);
        // Fully complete after fade transition
        const exitTimeout = setTimeout(() => {
          onComplete();
        }, 700); // matching transition duration
        return () => clearTimeout(exitTimeout);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, visibleLines, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#030406] p-6 font-mono text-[11px] leading-relaxed tracking-wider text-[var(--cream)] transition-all duration-700 ease-in-out md:p-12 ${
        isFading ? "pointer-events-none scale-105 opacity-0 blur-md" : "opacity-100"
      }`}
    >
      {/* CRT Scanline & Screen Noise HUD overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[length:100%_4px] mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,181,109,0.03),transparent_75%)]" />

      {/* Concentric Tech HUD Circles in Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden flex items-center justify-center opacity-[0.03] select-none">
        <div className="absolute w-[90vmin] h-[90vmin] rounded-full border border-dashed border-[var(--gold)] animate-[hud-spin_45s_infinite_linear]" />
        <div className="absolute w-[68vmin] h-[68vmin] rounded-full border border-[var(--gold)] border-double" />
        <div className="absolute w-[46vmin] h-[46vmin] rounded-full border border-dashed border-[var(--gold)] animate-[hud-spin-rev_25s_infinite_linear]" />
        <div className="absolute w-[24vmin] h-[24vmin] rounded-full border border-[var(--gold)]" />
        
        {/* Crosshair sweep grids */}
        <div className="absolute w-[95vmin] h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        <div className="absolute h-[95vmin] w-[1px] bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent" />
      </div>


      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[var(--gold)]/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 animate-ping rounded-full bg-[var(--gold)]" />
          <span className="font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">BADGERSEC SHELL v1.4.0</span>
        </div>
        <div className="text-[10px] text-white/30">
          ADDR: 192.168.1.137 // INTRUDER_LOG: ACTIVE
        </div>
      </div>

      {/* Main Terminal Feed */}
      <div className="my-auto max-w-4xl space-y-3 font-mono md:pl-6">
        {visibleLines.map((line, idx) => (
          <div className="flex items-start gap-3" key={idx}>
            <span className="shrink-0 text-[var(--gold)] select-none">
              {idx === diagnosticLines.length - 1 ? "✓" : "⚡"}
            </span>
            <p className={idx === diagnosticLines.length - 1 ? "text-[var(--gold)] font-semibold" : "text-white/80"}>
              {line}
            </p>
          </div>
        ))}
        {visibleLines.length < diagnosticLines.length && (
          <div className="flex items-center gap-1 pl-6">
            <span className="h-3 w-1.5 animate-pulse bg-[var(--cream)]" />
          </div>
        )}
      </div>

      {/* Bottom Progress Block */}
      <div className="border-t border-[var(--gold)]/10 pt-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em]">
            <span className="text-white/40">Loading Core Suite</span>
            <span className="font-bold text-[var(--gold)]">{progress}%</span>
          </div>
          {/* Custom Golden Bar */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.04] border border-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[rgba(215,181,109,0.4)] to-[var(--gold)] transition-all duration-300 ease-out shadow-[0_0_8px_var(--gold)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
