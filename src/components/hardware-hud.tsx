"use client";

import { useEffect, useState, useRef } from "react";

const securityLogs = [
  "[DataCamp] Code for Nepal #1 // 66-Days Challenge OK",
  "[Research] WordPress SQLite #568: LIKE/GLOB flaw disclosed",
  "[SecOps] Active client security: Manoranjan, aitrialnp secured",
  "[CVE-Triage] Mitigated Node.js Brotli RCE (CVE-2026-111497)",
  "[h1watch] Real-time HackerOne asset & scope watcher armed",
  "[hunt-workspace] Automated recon: subfinder + katana synchronized",
  "[RTSP-NVR] Continuous 24/7 recording // 7-day cloud sync OK",
  "[iforensic] iOS deep sandbox & SQLite keychain: SUCCESS",
  "[aforensic] Android DFIR Dalvik runtime & package audit complete",
  "[Easy-Patra] Automated letter formatting engine: READY",
  "[wlan0mon] Sending packet injection frames... SUCCESS",
  "[wlan0mon] Handshake captured from Syfe-BBP-WiFi [WPA2]",
  "[GraphQL] Probing active mutations at staging-gql...",
  "[GraphQL] Next.js configuration leak audit: COMPLETED",
  "[SQLMap] Injecting UTF-16 bypass payloads on API...",
  "[Katana] Crawled 12 active endpoints under DoD scope",
  "[subfinder] Discovered 48 subdomains on corporate scope",
  "[httpx] Probing live web servers on corporate asset... OK",
  "[wlan0mon] Staging deauth flood on target channel 11...",
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
    <div className="glass relative overflow-hidden rounded-2xl sm:rounded-[1.5rem] bg-black/40 p-4 sm:p-5 border border-white/5 shadow-2xl transition duration-500 hover:border-[var(--gold)]/30 mt-6 w-full max-w-xl min-w-0">
      {/* HUD Tech Corner Marks */}
      <div className="pointer-events-none absolute left-2.5 top-2.5 h-3 w-3 border-l border-t border-[var(--gold)]/30" />
      <div className="pointer-events-none absolute right-2.5 top-2.5 h-3 w-3 border-r border-t border-white/10" />
      <div className="pointer-events-none absolute left-2.5 bottom-2.5 h-3 w-3 border-l border-b border-white/10" />
      <div className="pointer-events-none absolute right-2.5 bottom-2.5 h-3 w-3 border-r border-b border-[var(--gold)]/30" />

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 sm:pb-3">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
          <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[var(--cream)]">NODE: badger-node-pi4</span>
        </div>
        <span className="font-mono text-[7.5px] sm:text-[8px] uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white/40">SYS_TELEMETRY: ACTIVE</span>
      </div>

      {/* Grid of Readouts */}
      <div className="mt-3.5 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-4 border-b border-white/5 pb-3.5 sm:pb-4 items-end min-w-0 w-full">
        {/* CPU Temp */}
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-mono text-[7.5px] sm:text-[8px] uppercase tracking-wider text-white/30 truncate">CPU TEMP</span>
          <div className="h-7 sm:h-8 flex items-center font-sans text-base sm:text-lg font-semibold text-[var(--cream)]">
            {cpuTemp}°C
          </div>
        </div>
        {/* RAM Usage */}
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-mono text-[7.5px] sm:text-[8px] uppercase tracking-wider text-white/30 truncate">MEM LOAD</span>
          <div className="h-7 sm:h-8 flex items-center font-sans text-base sm:text-lg font-semibold text-[var(--cream)]">
            {ramUsed} GB
          </div>
        </div>
        {/* Interface status */}
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-mono text-[7.5px] sm:text-[8px] uppercase tracking-wider text-white/30 truncate">NIC STATE</span>
          <div className="h-7 sm:h-8 flex items-center font-mono text-[9px] sm:text-[10.5px] font-semibold text-[var(--gold)] uppercase tracking-wider truncate">
            wlan0mon
          </div>
        </div>
      </div>

      {/* Live Intercept Ticker Log */}
      <div className="mt-3.5 sm:mt-4 min-w-0 w-full">
        <div className="flex items-center justify-between mb-2 gap-2">
          <span className="font-mono text-[7.5px] sm:text-[8px] uppercase tracking-wider text-white/30 truncate">ACTIVE EXPLOIT &amp; SCAN TELEMETRY</span>
          <span className="font-mono text-[7.5px] sm:text-[8px] text-[var(--gold)] shrink-0">{packetRate} PKTS/S</span>
        </div>
        <div className="space-y-1.5 rounded-lg bg-black/60 p-2.5 sm:p-3 border border-white/[0.03] min-w-0 w-full overflow-hidden">
          {activeLogs.map((log, idx) => (
            <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[8px] sm:text-[9px] text-white/60 min-w-0 w-full h-4 sm:h-4.5 overflow-hidden" key={idx}>
              <span className="text-[var(--gold)] select-none shrink-0">&gt;&gt;</span>
              <p className="min-w-0 flex-1 truncate text-white/70">{log}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
