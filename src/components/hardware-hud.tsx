"use client";

import { useEffect, useState, useRef } from "react";

const securityLogs = [
  "[wlan0mon] Sending packet injection frames... SUCCESS",
  "[wlan0mon] Handshake captured from Syfe-BBP-WiFi [WPA2]",
  "[GraphQL] Probing active mutations at cengage-staging-gql...",
  "[GraphQL] Next.js configuration leak audit: COMPLETED",
  "[SQLMap] Injecting UTF-16 bypass payloads on Milady API...",
  "[Katana] Crawled 12 active endpoints under DoD target scope",
  "[subfinder] Discovered 48 subdomains on corporate scope",
  "[httpx] Probing live web servers on corporate asset... SUCCESS",
  "[wlan0mon] Staging deauth flood on target channel 11...",
  "[GraphQL] Testing GraphQL introspection at milady-dev-graphql",
  "[Nuclei] Running systemic disclosure templates on DoD assets"
];

export function HardwareHud() {
  const [cpuTemp, setCpuTemp] = useState(48.2);
  const [ramUsed, setRamUsed] = useState(2.38);
  const [packetRate, setPacketRate] = useState(240);
  const [activeLogs, setActiveLogs] = useState<string[]>(() => [
    securityLogs[0],
    securityLogs[1],
    securityLogs[2]
  ]);
  const logIndexRef = useRef(3);

  useEffect(() => {

    // 1. Ticking CPU Temperature, Memory, and Packet rates
    const telemetryInterval = setInterval(() => {
      setCpuTemp((prev) => {
        const delta = (Math.random() - 0.5) * 0.4;
        return parseFloat((prev + delta).toFixed(1));
      });
      setRamUsed((prev) => {
        const delta = (Math.random() - 0.5) * 0.06;
        return parseFloat(Math.min(3.8, Math.max(1.8, prev + delta)).toFixed(2));
      });
      setPacketRate((prev) => {
        const delta = Math.floor((Math.random() - 0.5) * 40);
        return Math.min(500, Math.max(80, prev + delta));
      });
    }, 1200);

    // 2. Telemetry Log Rolling
    const logInterval = setInterval(() => {
      setActiveLogs((prev) => {
        const nextLog = securityLogs[logIndexRef.current];
        logIndexRef.current = (logIndexRef.current + 1) % securityLogs.length;
        // Keep last 3 logs
        return [...prev.slice(1), nextLog];
      });
    }, 2500);

    return () => {
      clearInterval(telemetryInterval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="glass relative overflow-hidden rounded-[1.5rem] bg-black/40 p-5 border border-white/5 shadow-2xl transition duration-500 hover:border-[var(--gold)]/30 mt-6 max-w-xl">
      {/* HUD Tech Corner Marks */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-[var(--gold)]/30" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-white/10" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-3 w-3 border-l border-b border-white/10" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-r border-b border-[var(--gold)]/30" />

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--gold)] shadow-[0_0_6px_var(--gold)]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--cream)]">NODE: badger-node-pi4</span>
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/40">SYS_TELEMETRY: ACTIVE</span>
      </div>

      {/* Grid of Readouts */}
      <div className="mt-4 grid grid-cols-3 gap-4 border-b border-white/5 pb-4">
        {/* CPU Temp */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[8px] uppercase tracking-wider text-white/30">CPU TEMP</span>
          <span className="font-sans text-lg font-semibold text-[var(--cream)]">{cpuTemp}°C</span>
        </div>
        {/* RAM Usage */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[8px] uppercase tracking-wider text-white/30">MEM LOAD</span>
          <span className="font-sans text-lg font-semibold text-[var(--cream)]">{ramUsed} GB</span>
        </div>
        {/* Interface status */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[8px] uppercase tracking-wider text-white/30">NIC STATE</span>
          <span className="font-mono text-[10px] font-semibold text-[var(--gold)] uppercase leading-5 tracking-widest">wlan0mon</span>
        </div>
      </div>

      {/* Live Intercept Ticker Log */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[8px] uppercase tracking-wider text-white/30">ACTIVE EXPLOIT & SCAN TELEMETRY</span>
          <span className="font-mono text-[8px] text-[var(--gold)]">{packetRate} PKTS/S</span>
        </div>
        <div className="space-y-1.5 rounded-lg bg-black/60 p-3 border border-white/[0.03]">
          {activeLogs.map((log, idx) => (
            <div className="flex items-start gap-2 font-mono text-[9px] text-white/60" key={idx}>
              <span className="text-[var(--gold)] select-none">&gt;&gt;</span>
              <p className="truncate text-white/70">{log}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
