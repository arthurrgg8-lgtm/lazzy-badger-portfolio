"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AmbientStage } from "@/components/ambient-stage";
import { Reveal } from "@/components/reveal";
import { ScrollOrchestrator } from "@/components/scroll-orchestrator";
import { gallery, pillars, profile } from "@/lib/profile";
import { BootScreen } from "@/components/boot-screen";
import { ScrambleText } from "@/components/scramble-text";
import { HardwareHud } from "@/components/hardware-hud";
import { ProfileScanner } from "@/components/profile-scanner";
import { NavLink } from "@/components/nav-link";
import { faqs } from "@/lib/schema";
import { SoundController, cyberSound } from "@/components/cyber-audio";

const navItems = ["about", "certifications", "projects", "gallery", "faq", "contact"];

const projectDiagnostics: Record<string, { host: string; port: number; class: string }> = {
  "Bolts Army Official Platform Security Audit (Code Runners Technologies)": { host: "api.boltsarmy.com", port: 443, class: "CLIENT_AUDIT" },
  "WordPress / SQLite Pattern Translation Research (Issue #568)": { host: "github.com", port: 443, class: "BUG_HUNT" },
  "Active Client Security & Infrastructure Hardening": { host: "client-edge", port: 443, class: "SEC_OPS" },
  "h1watch & hunt-workspace": { host: "127.0.0.1", port: 9100, class: "RECON_CORE" },
  "iforensic & aforensic (Mobile DFIR)": { host: "forensic-box", port: 5037, class: "MOBILE_DFIR" },
  "Easy Patra (इजि-पत्र)": { host: "127.0.0.1", port: 3005, class: "DOC_AUTO" },
  "Prahari-Link (प्रहरी-Link)": { host: "127.0.0.1", port: 3001, class: "LORA_MESH" },
  "AI Trial Nepal (aitrialnp.com)": { host: "aitrialnp.com", port: 443, class: "LIVE_SYS" },
  "MR Tour Service": { host: "manoranjan.com.np", port: 443, class: "LIVE_SYS" },
  "Ar. Anushka Khatri Portfolio": { host: "anushkakhatri.com.np", port: 443, class: "LIVE_SYS" },
  "Himalayan Mastiff Nepal": { host: "bhoteykukur.com.np", port: 8080, class: "DEV_PORT" },
  "VastuVision AI": { host: "vastuvision-beta.vercel.app", port: 443, class: "AI_VISION" },
  "Lazzybiointel-v6.2-PRO": { host: "127.0.0.1", port: 9090, class: "LOCAL_CORE" },
  "Deepfake-Analyzer": { host: "127.0.0.1", port: 8000, class: "LOCAL_CORE" },
  "Autonomous RTSP Camera & 7-Day Cloud NVR": { host: "192.168.1.150", port: 554, class: "RTSP_NVR" },
  "Hardware-Driven Network & Motion Sensing Node": { host: "192.168.1.137", port: 22, class: "NODE_SSH" },
  "Cafe Billing System": { host: "192.168.1.104", port: 3000, class: "DEV_PORT" },
  "Confidential Project I": { host: "10.0.0.82", port: 8443, class: "SEC_TUNNEL" },
  "Confidential Project II": { host: "10.0.0.95", port: 8000, class: "SEC_TUNNEL" }
};

const galleryIntel: Record<string, string> = {
  "Night ride": "LAT: 27.7172° N // LNG: 85.3240° E",
  "ZONTES350 T": "LAT: 27.6815° N // LNG: 85.3182° E",
  "NATURE": "LAT: 27.8105° N // LNG: 85.2917° E",
  "PANCHPOKHARI": "LAT: 28.0264° N // LNG: 85.7104° E",
  "CHILLINN": "LAT: 27.7028° N // LNG: 85.3195° E",
  "PILOT BABA ASHRAM RUNNING": "LAT: 27.6384° N // LNG: 85.4290° E",
  "SQUAD": "LAT: 27.7408° N // LNG: 85.3325° E",
  "COLLEGE SQUAD": "LAT: 27.6890° N // LNG: 85.3204° E"
};

const securityProofs: Record<
  "github" | "linkedin" | "wordpress",
  {
    src: string;
    alt: string;
    target: string;
    tag: string;
    assessor: string;
    client: string;
    actionLabel: string;
    actionUrl: string;
  }
> = {
  github: {
    src: "/assets/research/boltsarmy-security-audit-github.png",
    alt: "Bolts Army Official Website Security Audit Report #4 on GitHub by LazZy",
    target: "AUDIT_ISSUE // Code-Runners-Nepal/Bolts-Army-Official-Website_Backend #4",
    tag: "WHITE-BOX SOURCE CODE REVIEW + PRODUCTION AUDIT",
    assessor: "LazZy (arthurrgg8-lgtm)",
    client: "Code Runners Technologies Pvt. Ltd.",
    actionLabel: "TARGET DOMAIN ↗",
    actionUrl: "https://www.boltsarmy.com"
  },
  linkedin: {
    src: "/assets/research/boltsarmy-security-audit-linkedin.png",
    alt: "Anudit Khatri LinkedIn Public Security Assessment Announcement for Bolts Army",
    target: "PUBLIC_DISCLOSURE // LinkedIn: Anudit Khatri // Bolts Army Assessment",
    tag: "OWASP TOP 10 (2021) // CLIENT ENGAGEMENT BRIEFING",
    assessor: "Anudit Khatri (Cyber Security Researcher)",
    client: "Code Runners Technologies Pvt. Ltd.",
    actionLabel: "LIVE SYSTEM ↗",
    actionUrl: "https://www.boltsarmy.com"
  },
  wordpress: {
    src: "/assets/research/wordpress-sqlite-issue-568.png",
    alt: "WordPress SQLite Database Integration Issue #568 Disclosure by arthurrgg8-lgtm",
    target: "UPSTREAM // WordPress/sqlite-database-integration #568",
    tag: "SQL-TO-GLOB QUERY TRANSLATION FLAW",
    assessor: "arthurrgg8-lgtm (LazZy)",
    client: "WordPress Core Community",
    actionLabel: "GITHUB_ADVISORY ↗",
    actionUrl: "https://github.com/WordPress/sqlite-database-integration/issues/568"
  }
};

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);
  const [startScramble, setStartScramble] = useState(false);
  const [ping, setPing] = useState(24);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [certCategory, setCertCategory] = useState<"ALL" | "AI" | "Cloud" | "DevTools">("ALL");
  const [certViewMode, setCertViewMode] = useState<"grid" | "seals">("grid");
  const [activeCertHover, setActiveCertHover] = useState<string | null>(null);
  const [datacampProofTab, setDatacampProofTab] = useState<"activity" | "leaderboard">("activity");
  const [securityProofTab, setSecurityProofTab] = useState<"github" | "linkedin" | "wordpress">("github");
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeGalleryModal, setActiveGalleryModal] = useState<(typeof gallery)[0] | null>(null);

  const filteredCerts = certCategory === "ALL"
    ? profile.certifications_detail
    : profile.certifications_detail.filter((c: { category: string }) => c.category === certCategory);

  useEffect(() => {
    if (activeGalleryModal) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setActiveGalleryModal(null);
          cyberSound.playBlip(720);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else if (!mobileMenuOpen) {
      document.body.style.overflow = "";
    }
  }, [activeGalleryModal, mobileMenuOpen]);

  useEffect(() => {
    if (!isBooted) return;
    const pingInterval = setInterval(() => {
      setPing((prev) => {
        const delta = Math.floor((Math.random() - 0.5) * 6);
        return Math.min(45, Math.max(12, prev + delta));
      });
    }, 2000);
    return () => clearInterval(pingInterval);
  }, [isBooted]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Compulsory Audio Activation: Ensure ambient audio plays on any first user interaction
  useEffect(() => {
    const unlockAudio = async () => {
      if (!cyberSound?.running) {
        try {
          await cyberSound.start();
        } catch {}
      }
    };
    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);
    // Universal failsafe: ensure site is never permanently hidden under any browser condition
    const failsafeTimer = setTimeout(() => {
      setIsBooted(true);
      setStartScramble(true);
    }, 3200);

    return () => {
      clearTimeout(failsafeTimer);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  return (
    <>
      {!isBooted && (
        <BootScreen
          onComplete={() => {
            setIsBooted(true);
            setStartScramble(true);
            try {
              cyberSound.start().then(() => {
                cyberSound.playBlip(980);
              }).catch(() => {});
            } catch {}
          }}
        />
      )}
      <main
        className={`relative isolate min-h-screen overflow-hidden transition-all duration-[1200ms] ease-out ${
          isBooted ? "opacity-100 filter-none" : "opacity-0 blur-md pointer-events-none"
        }`}
      >
      <AmbientStage />
      <ScrollOrchestrator />
      <div className="noise" />

      {/* Site-wide Concentric HUD Backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden flex items-center justify-center opacity-[0.02] select-none">
        <div className="absolute w-[110vmin] h-[110vmin] rounded-full border border-dashed border-[var(--gold)] animate-[hud-spin_65s_infinite_linear]" />
        <div className="absolute w-[80vmin] h-[80vmin] rounded-full border border-[var(--gold)] border-double" />
        <div className="absolute w-[50vmin] h-[50vmin] rounded-full border border-dashed border-[var(--gold)] animate-[hud-spin-rev_40s_infinite_linear]" />
        <div className="absolute w-[20vmin] h-[20vmin] rounded-full border border-[var(--gold)]" />
        
        {/* Fine Axis Lines */}
        <div className="absolute w-[120vmin] h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        <div className="absolute h-[120vmin] w-[1px] bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-2xl">
        <nav className="section-shell flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 xl:gap-6 shrink-0">
            <Link className="group flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] sm:tracking-[0.32em] text-[var(--cream)] whitespace-nowrap shrink-0" href="#top">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[var(--gold)]/30 shrink-0">
                <Image alt="Lazzy Badger Logo" className="object-cover" fill sizes="32px" src="/assets/lazzy.jpeg" />
              </div>
              <span className="translate-x-[0.1em]">
                Lazzy<span className="text-[var(--gold)]">Badger</span>
              </span>
            </Link>
            <div className="hidden items-center gap-3 xl:gap-4 border-l border-white/10 pl-4 xl:pl-6 lg:flex whitespace-nowrap shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                <span className="text-[10px] uppercase tracking-[0.16em] text-white/40 whitespace-nowrap">System: Online</span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <span className="font-mono text-[9px] text-[var(--gold)] tracking-wider whitespace-nowrap">LATENCY: {ping}ms</span>
              <div className="h-3 w-px bg-white/10" />
              <SoundController />
            </div>
          </div>
          <div className="hidden items-center gap-5 xl:gap-8 text-xs uppercase tracking-[0.2em] xl:tracking-[0.26em] text-white/58 lg:flex whitespace-nowrap shrink-0">
            {navItems.map((item) => (
              <NavLink className="transition hover:text-[var(--gold)]" href={`#${item}`} key={item} text={item} />
            ))}
          </div>

          {/* Mobile / Tablet Sound & Menu Trigger Group */}
          <div className="flex items-center gap-2 lg:hidden">
            <SoundController />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[var(--cream)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition duration-300 z-50 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-black/95 backdrop-blur-3xl lg:hidden transition-all duration-500 ease-in-out p-6 pt-24 pb-8 overflow-y-auto ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-105"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,181,109,0.06),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent top-1/4" />
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent bottom-1/4" />

        <nav className="my-auto flex flex-col items-center gap-5 text-base sm:text-lg font-bold uppercase tracking-[0.25em] text-[var(--cream)]">
          {navItems.map((item) => (
            <NavLink
              className="transition-all duration-300 hover:text-[var(--gold)] active:text-[var(--gold)] py-1.5 block text-center"
              href={`#${item}`}
              key={item}
              text={item}
              onClick={() => setMobileMenuOpen(false)}
            />
          ))}
        </nav>

        <div className="border-t border-white/10 pt-4 flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[var(--gold)]">
            <a href={`mailto:${profile.socials.email}`} className="hover:underline flex items-center gap-1">
              <span>EMAIL</span> ↗
            </a>
            <span className="text-white/20">•</span>
            <a href={`https://wa.me/${profile.socials.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1 text-emerald-400">
              <span>WHATSAPP</span> ↗
            </a>
            <span className="text-white/20">•</span>
            <a href={`https://github.com/${profile.socials.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1 text-white/60">
              <span>GITHUB</span> ↗
            </a>
          </div>
          <div className="text-[9px] font-mono tracking-widest text-white/35 select-none">
            SECURE_MENU // ACCESS_GRANTED // PING: {ping}MS
          </div>
        </div>
      </div>

      <section className="section-shell relative z-10 grid items-start lg:items-center gap-8 lg:gap-12 pb-12 pt-20 sm:pt-28 md:pt-32 lg:grid-cols-[1.15fr_0.85fr] min-h-[calc(100vh-4rem)] scroll-mt-24" id="top">
        <Reveal delay={0.04} className="flex flex-col justify-center min-w-0 w-full">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2.5 sm:mb-3 max-w-full">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse shrink-0" />
            <span className="font-mono text-[8px] xs:text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.14em] sm:tracking-[0.22em] text-[var(--gold)] break-words leading-tight">
              SYSTEM_ARCHITECT // IOT_BUILDER // CYBERSECURITY_RESEARCHER
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.98] sm:leading-[0.9] md:leading-[0.86] tracking-[-0.04em] text-gradient">
            <span className="sr-only">Anudit Khatri (Lazzy Badger) — Cybersecurity Researcher, AI Systems Architect &amp; Fullstack Developer</span>
            <ScrambleText text={profile.identity.brand_name} trigger={startScramble} />
          </h1>
          <p className="mt-3.5 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-white/70">
            {profile.about.persona}
          </p>
          <HardwareHud />
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link className="rounded-full bg-[var(--cream)] px-7 py-3.5 sm:py-4 text-center text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:bg-[var(--gold)] hover:shadow-[0_0_25px_rgba(215,181,109,0.3)]" href="#projects">
              view systems
            </Link>
            <Link className="rounded-full glass px-7 py-3.5 sm:py-4 text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[var(--cream)] transition hover:text-[var(--gold)] hover:border-[var(--gold)]/40 hover:bg-white/[0.04]" href="#contact">
              secure dispatch
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="flex justify-center items-center mt-6 lg:mt-0 w-full">
          <ProfileScanner />
        </Reveal>
      </section>

      <section className="section-shell relative z-10 py-16 sm:py-24 scroll-mt-20" id="about">
        <Reveal>
          <div className="mb-8 sm:mb-12 flex flex-col justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.36em] text-[var(--gold)] font-mono">about // architecture</p>
              <h2 className="font-display mt-2 sm:mt-3 max-w-3xl text-3xl sm:text-5xl md:text-6xl tracking-[-0.04em]">
                Built around curiosity, automation, and local-first systems.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 sm:leading-7 text-white/60">A personal technical portfolio focused on {profile.website_structure.target_audience}.</p>
          </div>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="h-full">
            <div className="glass h-full rounded-2xl sm:rounded-3xl p-5 sm:p-7 relative overflow-hidden bg-black/20 flex flex-col justify-between border border-white/10 hover:border-[var(--gold)]/30 transition-all duration-300">
              <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-[var(--gold)]/40" />
              <div className="pointer-events-none absolute right-3 bottom-3 h-3 w-3 border-r border-b border-white/10" />
              <p className="text-sm sm:text-base leading-7 sm:leading-8 text-white/70 whitespace-pre-line">{profile.about.full_description}</p>

              {/* Operative Ethos Callout Box */}
              <div className="mt-5 rounded-xl border border-[var(--gold)]/25 bg-gradient-to-r from-[rgba(215,181,109,0.08)] via-black/40 to-transparent p-3.5 sm:p-4">
                <div className="flex items-center gap-2 mb-1.5 font-mono text-[8.5px] uppercase tracking-widest text-[var(--gold)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                  <span>OPERATIVE ETHOS // EXPLORATION HORIZON</span>
                </div>
                <p className="font-display italic text-xs sm:text-[13px] text-[var(--cream)] leading-relaxed">
                  &ldquo;IT is an ocean, filled with infinite knowledge, and my mission is to explore every current and fathom of it. My mind naturally deconstructs algorithms, software, and hardware architectures with intuitive ease—allowing me to engineer, secure, and master systems across every domain.&rdquo;
                </p>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
            {pillars.map((pillar, index) => {
              const isActive = activePillar === pillar;
              return (
                <Reveal delay={index * 0.04} key={pillar} className="h-full">
                  <button
                    type="button"
                    onClick={() => {
                      setActivePillar(isActive ? null : pillar);
                      cyberSound.playBlip(isActive ? 760 : 1080);
                    }}
                    className={`glass group relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 w-full text-left h-full flex flex-col justify-between cursor-pointer select-none bg-black/20 ${
                      isActive
                        ? "border-[var(--gold)] bg-[var(--gold)]/[0.08] shadow-[0_0_25px_rgba(215,181,109,0.22)] -translate-y-1"
                        : "border-white/10 hover:-translate-y-1 hover:border-[rgba(215,181,109,0.45)] hover:bg-black/30 active:scale-[0.98]"
                    }`}
                    data-tilt-card
                  >
                    <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-[var(--gold)]" />
                    <div className={`pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t transition-colors ${
                      isActive ? "border-[var(--gold)]" : "border-white/10 group-hover:border-[var(--gold)]/40"
                    }`} />
                    
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">CORE MODULE // 0{index + 1}</span>
                      <span className={`font-mono text-[8px] uppercase tracking-[0.15em] flex items-center gap-1 ${
                        isActive ? "text-emerald-400 font-bold" : "text-[var(--gold)] group-hover:animate-pulse"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-400 animate-ping" : "bg-[var(--gold)]"}`} />
                        {isActive ? "DIAGNOSTIC ENGAGED" : "Active"}
                      </span>
                    </div>
                    
                    <div className="my-4">
                      <h3 className={`text-lg sm:text-xl font-semibold font-display tracking-wide transition-colors ${
                        isActive ? "text-[var(--gold)]" : "text-[var(--cream)] group-hover:text-[var(--gold)]"
                      }`}>
                        {pillar}
                      </h3>
                      {isActive && (
                        <p className="mt-2 text-xs font-mono text-white/70 leading-relaxed border-t border-[var(--gold)]/20 pt-2">
                          NODE ARMED // RUNTIME TELEMETRY SYNCHRONIZED // LATENCY SUB-25MS
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between font-mono text-[8px] text-white/30 border-t border-white/5 pt-2">
                      <span>SEC_CLASS: LEVEL_4</span>
                      <span className={isActive ? "text-[var(--gold)] font-semibold" : ""}>
                        {isActive ? "TAP TO DISARM" : "TAP TO PROBE"}
                      </span>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Research & Client Security Operations Section */}
      <section className="section-shell relative z-10 py-12">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[rgba(215,181,109,0.35)] p-5 sm:p-8 lg:p-10 bg-gradient-to-br from-white/[0.04] via-black/40 to-[rgba(215,181,109,0.04)] shadow-[0_0_40px_rgba(215,181,109,0.08)]">
            {/* HUD Corner Accents */}
            <div className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l-2 border-t-2 border-[var(--gold)]" />
            <div className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 border-r-2 border-t-2 border-[var(--gold)]" />
            <div className="pointer-events-none absolute left-3 bottom-3 h-3.5 w-3.5 border-l-2 border-b-2 border-[var(--gold)]" />
            <div className="pointer-events-none absolute right-3 bottom-3 h-3.5 w-3.5 border-r-2 border-b-2 border-[var(--gold)]" />

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 sm:pb-6 mb-6 sm:mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--gold)]">INTELLIGENCE BRIEFING // SECURITY AUDITS &amp; UPSTREAM RESEARCH</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[var(--cream)] tracking-tight">
                  Recent Works: Client Security Audits &amp; Upstream Research
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[8.5px] sm:text-[9px]">
                <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-amber-300 uppercase tracking-wider sm:tracking-widest font-semibold flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>Recent: Bolts Army (Oct 2026)</span>
                </span>
                <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-emerald-400 uppercase tracking-wider sm:tracking-widest font-semibold">
                  Client Perimeter: 100% Audited
                </span>
                <span className="rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-3 py-1 text-[var(--gold)] uppercase tracking-wider sm:tracking-widest font-semibold">
                  Upstream Research: Disclosed
                </span>
              </div>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
              <div className="space-y-4 sm:space-y-5">
                {/* 01 // Recent Client Security Audit */}
                <div className="rounded-xl sm:rounded-2xl border border-[rgba(215,181,109,0.32)] bg-gradient-to-br from-[rgba(215,181,109,0.06)] via-black/45 to-transparent p-4 sm:p-6 relative shadow-[0_0_25px_rgba(215,181,109,0.06)]">
                  <div className="flex flex-wrap items-center justify-between gap-1.5 font-mono text-[8.5px] sm:text-[9px] text-white/40 mb-2.5 border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                      <span className="text-[var(--gold)] uppercase tracking-wider font-semibold">01 // RECENT CLIENT SECURITY AUDIT (OCT 27, 2026)</span>
                    </div>
                    <span className="rounded bg-[var(--gold)]/10 px-2 py-0.5 text-[8px] text-[var(--gold)] border border-[var(--gold)]/30 font-semibold uppercase">COMPLETED &amp; DELIVERED</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-[var(--cream)] mb-1.5 font-display">
                    Bolts Army Official Platform (Code Runners Technologies Pvt. Ltd.)
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-white/70 mb-3.5">
                    Conducted a comprehensive white-box source code review (Next.js/Node.js frontend &amp; backend API) paired with non-invasive live production checks on <span className="text-white font-mono text-[11px]">boltsarmy.com</span> and <span className="text-white font-mono text-[11px]">api.boltsarmy.com</span>. Benchmarked against the <span className="text-white font-semibold">OWASP Top 10 (2021)</span>. Confirmed robust core defenses (0 critical vulnerabilities, secure bcrypt hashing, HttpOnly session cookies, strict CORS allowlist, and fail-closed startup). Identified 2 High (unpatched third-party library DoS &amp; auth-layer controls) and 4 Medium issues (rate limiting, CSRF defense, missing security headers) paired with an actionable remediation roadmap.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[8px] sm:text-[9px]">
                    <button
                      type="button"
                      onClick={() => {
                        setSecurityProofTab("github");
                        cyberSound.playBlip(1080);
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors ${
                        securityProofTab === "github"
                          ? "border-[var(--gold)] bg-[var(--gold)]/20 text-[var(--gold)] font-bold shadow-[0_0_12px_rgba(215,181,109,0.2)]"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-[var(--gold)]/40 hover:text-[var(--gold)]"
                      }`}
                    >
                      <span>⚡ View GitHub Report Proof</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSecurityProofTab("linkedin");
                        cyberSound.playBlip(1140);
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors ${
                        securityProofTab === "linkedin"
                          ? "border-[var(--gold)] bg-[var(--gold)]/20 text-[var(--gold)] font-bold shadow-[0_0_12px_rgba(215,181,109,0.2)]"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-[var(--gold)]/40 hover:text-[var(--gold)]"
                      }`}
                    >
                      <span>📢 View Client Announcement</span>
                    </button>
                    <a
                      href="https://www.boltsarmy.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[var(--gold)] hover:text-white transition-colors ml-auto uppercase tracking-wider"
                    >
                      <span>Visit Platform</span>
                      <span className="text-xs">↗</span>
                    </a>
                  </div>
                </div>

                {/* 02 // Production Client Defense */}
                <div className="rounded-xl sm:rounded-2xl border border-white/5 bg-black/40 p-4 sm:p-5 relative">
                  <div className="flex items-center justify-between font-mono text-[8.5px] sm:text-[9px] text-white/40 mb-2 border-b border-white/5 pb-2">
                    <span className="text-[var(--gold)] uppercase tracking-wider">02 // PRODUCTION CLIENT DEFENSE</span>
                    <span>RUNTIME_HARDENING</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-[var(--cream)] mb-1.5 font-display">
                    Hands-on Client Infrastructure &amp; Zero-Day Mitigation
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-white/65">
                    Proactive participation in client security across production environments (<span className="text-white font-medium">Manoranjan Ramjham</span>, <span className="text-white font-medium">AI Trial Nepal</span>, <span className="text-white font-medium">Ar. Anushka Khatri</span>). Rapid triage of zero-day runtime disclosures—including the recent Node.js Brotli RCE (<span className="text-[var(--gold)] font-mono text-xs">CVE-2026-111497</span> / Node2Shell) and Next.js 16.4.3 security patches—maintaining a verified zero-vulnerability audit standard.
                  </p>
                </div>

                {/* 03 // Upstream Security Research */}
                <div className="rounded-xl sm:rounded-2xl border border-white/5 bg-black/40 p-4 sm:p-5 relative">
                  <div className="flex items-center justify-between font-mono text-[8.5px] sm:text-[9px] text-white/40 mb-2 border-b border-white/5 pb-2">
                    <span className="text-[var(--gold)] uppercase tracking-wider">03 // UPSTREAM SECURITY RESEARCH</span>
                    <span>PARSER_DIFFERENTIALS</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-[var(--cream)] mb-1.5 font-display">
                    WordPress SQLite Core Query Translation Flaw (Issue #568)
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-white/65 mb-3">
                    Deep architectural bug hunting in <code className="text-[var(--gold)] text-xs">WordPress/sqlite-database-integration</code>. Identified a subtle SQL-to-GLOB query mis-translation flaw where unescaped <code className="text-white">[</code> characters turn into SQLite character-class brackets, producing silent false-positive and false-negative row mismatches against MySQL <code className="text-white">LIKE</code>.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[8px] sm:text-[9px]">
                    <button
                      type="button"
                      onClick={() => {
                        setSecurityProofTab("wordpress");
                        cyberSound.playBlip(980);
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors ${
                        securityProofTab === "wordpress"
                          ? "border-[var(--gold)] bg-[var(--gold)]/20 text-[var(--gold)] font-bold"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-[var(--gold)]/40 hover:text-[var(--gold)]"
                      }`}
                    >
                      <span>🐛 View Issue #568 Proof</span>
                    </button>
                    <a
                      href="https://github.com/WordPress/sqlite-database-integration/issues/568"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[var(--gold)] hover:text-white transition-colors ml-auto uppercase tracking-wider"
                    >
                      <span>GitHub Issue #568</span>
                      <span className="text-xs">↗</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Research & Audit Multi-Proof Interactive Terminal Frame */}
              <div className="group relative rounded-xl sm:rounded-2xl border border-white/10 bg-black/60 p-2.5 sm:p-4 overflow-hidden shadow-2xl transition-all duration-500 hover:border-[var(--gold)]/50">
                {/* Proof Switcher Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/70 rounded-lg sm:rounded-xl border border-white/10 mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSecurityProofTab("github");
                      cyberSound.playBlip(1080);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[8px] sm:text-[8.5px] uppercase tracking-wider transition-all duration-300 ${
                      securityProofTab === "github"
                        ? "bg-[var(--gold)] text-black font-bold shadow-[0_0_15px_rgba(215,181,109,0.3)]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    <span>01 // GitHub Audit #4</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSecurityProofTab("linkedin");
                      cyberSound.playBlip(1140);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[8px] sm:text-[8.5px] uppercase tracking-wider transition-all duration-300 ${
                      securityProofTab === "linkedin"
                        ? "bg-[var(--gold)] text-black font-bold shadow-[0_0_15px_rgba(215,181,109,0.3)]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    <span>02 // Client Disclosure</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSecurityProofTab("wordpress");
                      cyberSound.playBlip(980);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[8px] sm:text-[8.5px] uppercase tracking-wider transition-all duration-300 ${
                      securityProofTab === "wordpress"
                        ? "bg-[var(--gold)] text-black font-bold shadow-[0_0_15px_rgba(215,181,109,0.3)]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    <span>03 // WP Core SQLite #568</span>
                  </button>
                </div>

                {/* HUD Banner Header */}
                <div className="mb-2 flex items-center justify-between gap-1.5 rounded bg-black/85 px-2.5 py-1 font-mono text-[7.5px] sm:text-[8px] text-[var(--gold)] backdrop-blur-md border border-white/10 truncate">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0 animate-pulse" />
                    <span className="truncate max-w-[280px] sm:max-w-none">{securityProofs[securityProofTab].target}</span>
                  </div>
                  <span className="text-white/30 hidden sm:inline truncate">{securityProofs[securityProofTab].tag}</span>
                </div>

                {/* Screenshot Display Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg sm:rounded-xl border border-white/5 bg-black/40">
                  <Image
                    key={securityProofs[securityProofTab].src}
                    src={securityProofs[securityProofTab].src}
                    alt={securityProofs[securityProofTab].alt}
                    fill
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 550px"
                    priority={securityProofTab === "github"}
                  />
                </div>

                {/* Footer Telemetry & External Link */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 sm:px-2 font-mono text-[7.5px] sm:text-[8px] text-white/50">
                  <span>{securityProofs[securityProofTab].assessor}</span>
                  <a
                    href={securityProofs[securityProofTab].actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--gold)] hover:underline flex items-center gap-1"
                  >
                    {securityProofs[securityProofTab].actionLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell relative z-10 py-16 sm:py-24">
        <Reveal>
          <div className="mb-8 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.36em] text-[var(--gold)] font-mono">arsenal // technical_matrix</p>
            <h2 className="font-display mt-2 sm:mt-3 text-3xl sm:text-5xl md:text-6xl tracking-[-0.04em]">Core Capabilities.</h2>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Languages", values: profile.skills_and_tools.languages },
            { title: "Bug Bounty Stack", values: profile.skills_and_tools.bug_bounty_tools },
            { title: "MCP + AI Infra", values: profile.skills_and_tools.mcp_infrastructure },
            { title: "Tools + Systems", values: profile.skills_and_tools.tools },
            { title: "Traits", values: profile.skills_and_tools.core_traits },
            { title: "Certifications", values: profile.skills_and_tools.certifications },
          ].map((cluster, idx) => (
            <Reveal delay={idx * 0.04} key={cluster.title} className="h-full">
              <SkillCluster
                title={cluster.title}
                values={cluster.values}
                activeSkill={activeSkill}
                onSelectSkill={(skill) => {
                  setActiveSkill(activeSkill === skill ? null : skill);
                  cyberSound.playBlip(1160);
                }}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell relative z-10 py-16 sm:py-24 scroll-mt-20" id="certifications" aria-labelledby="certifications-heading">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.36em] text-[var(--gold)] font-mono">certifications // verified_credentials</p>
          <h2 id="certifications-heading" className="font-display mt-2 sm:mt-3 text-3xl sm:text-5xl md:text-6xl tracking-[-0.04em]">Proof of work.</h2>
          <p className="sr-only">
            Anudit Khatri (LazZy Badger) holds #1 All-Time Leaderboard ranking on Code for Nepal / DataCamp, completed the 66-Days Challenge, and holds {profile.certifications_detail.length} verified technical certifications from DataCamp covering Artificial Intelligence, Cloud Infrastructure (AWS and Microsoft Azure), and Developer Tools:
            {profile.certifications_detail.map((c) => `${c.name} (${c.category}, by ${c.issuer})`).join(", ")}.
          </p>
        </Reveal>

        {/* Code for Nepal / DataCamp #1 Leaderboard Showcase */}
        <Reveal delay={0.06}>
          <div className="mt-8 sm:mt-10 mb-8 sm:mb-10 glass relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[rgba(215,181,109,0.38)] p-4 sm:p-7 lg:p-8 bg-gradient-to-br from-white/[0.04] via-black/40 to-[rgba(215,181,109,0.06)] shadow-[0_0_40px_rgba(215,181,109,0.12)]">
            {/* HUD Corner Accents */}
            <div className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l-2 border-t-2 border-[var(--gold)]" />
            <div className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 border-r-2 border-t-2 border-[var(--gold)]" />
            <div className="pointer-events-none absolute left-3 bottom-3 h-3.5 w-3.5 border-l-2 border-b-2 border-[var(--gold)]" />
            <div className="pointer-events-none absolute right-3 bottom-3 h-3.5 w-3.5 border-r-2 border-b-2 border-[var(--gold)]" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-white/10 pb-4 sm:pb-6 mb-5 sm:mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--gold)]">HALL OF FAME // COMPETITIVE RANKINGS &amp; PLATFORM TELEMETRY</span>
                </div>
                <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold font-display text-[var(--cream)] tracking-tight">
                  DataCamp / Code for Nepal #1 Leaderboard &amp; 179+ Courses Verified
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[8px] sm:text-[9px]">
                <span className="rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-3 py-1 text-[var(--gold)] uppercase tracking-wider sm:tracking-widest font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(215,181,109,0.2)]">
                  <span>🏆</span> #1 All-Time Rank
                </span>
                <span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-sky-400 uppercase tracking-wider sm:tracking-widest font-semibold flex items-center gap-1.5">
                  <span>⚡</span> 179 Courses
                </span>
                <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-emerald-400 uppercase tracking-wider sm:tracking-widest font-semibold flex items-center gap-1.5">
                  <span>🎓</span> 66-Days Completer
                </span>
              </div>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="space-y-4 sm:space-y-5">
                <p className="text-sm sm:text-base leading-relaxed text-white/70">
                  Secured the <span className="text-[var(--gold)] font-bold">#1 All-Time Leaderboard position</span> in the prestigious <span className="text-white font-semibold">Code for Nepal × DataCamp</span> community initiative and completed the rigorous <span className="text-white font-semibold">66-Days Continuous Learning Challenge</span>. Conquered over <span className="text-[var(--gold)] font-semibold">179 verified technical courses</span>, <span className="text-white font-semibold">120 DataLab engineering projects</span>, and <span className="text-white font-semibold">7 career tracks</span> across artificial intelligence, cloud architectures, and developer tooling.
                </p>

                {/* Verified Platform Telemetry Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {[
                    { label: "Courses Completed", value: "179", color: "text-[var(--gold)]", border: "border-[var(--gold)]/30" },
                    { label: "DataLab Projects", value: "120", color: "text-sky-400", border: "border-sky-400/30" },
                    { label: "Tracks Completed", value: "7", color: "text-emerald-400", border: "border-emerald-400/30" },
                    { label: "Certifications", value: "11+", color: "text-purple-400", border: "border-purple-400/30" },
                  ].map((stat) => (
                    <div key={stat.label} className={`rounded-xl border ${stat.border} bg-black/40 p-2 sm:p-2.5 text-center transition-all duration-300 hover:border-[var(--gold)]/60 hover:scale-[1.03]`}>
                      <div className={`font-display text-lg sm:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="font-mono text-[7px] sm:text-[7.5px] uppercase tracking-wider text-white/50 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Accreditation Stack */}
                <div className="rounded-xl sm:rounded-2xl border border-white/5 bg-black/40 p-3.5 sm:p-4">
                  <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider sm:tracking-widest text-[var(--gold)] block mb-2 font-semibold">
                    VERIFIED ASSOCIATE ACCREDITATIONS
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {[
                      "AI Engineer for Developers Associate",
                      "Python Data Associate",
                      "Data Scientist Associate",
                      "Data Engineer Associate",
                      "AI Engineer for Data Scientists Associate",
                      "Data Analyst Associate",
                    ].map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 px-2.5 py-0.5 text-[8.5px] sm:text-[9px] font-mono text-[var(--cream)] flex items-center gap-1.5 transition-all hover:border-[var(--gold)]/50"
                      >
                        <span className="text-[var(--gold)] text-xs">🏅</span>
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dual-Verification Showcase Screenshot Switcher */}
              <div className="space-y-2">
                {/* Proof Switcher Tabs */}
                <div className="flex items-center gap-1.5 font-mono text-[8px] sm:text-[8.5px]">
                  <button
                    type="button"
                    onClick={() => {
                      setDatacampProofTab("activity");
                      cyberSound.playBlip(920);
                    }}
                    className={`px-3 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                      datacampProofTab === "activity"
                        ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)] font-bold shadow-[0_0_12px_rgba(215,181,109,0.25)]"
                        : "border-white/10 bg-black/40 text-white/50 hover:text-white"
                    }`}
                  >
                    <span>⚡</span> 179 Courses Activity
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDatacampProofTab("leaderboard");
                      cyberSound.playBlip(920);
                    }}
                    className={`px-3 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                      datacampProofTab === "leaderboard"
                        ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)] font-bold shadow-[0_0_12px_rgba(215,181,109,0.25)]"
                        : "border-white/10 bg-black/40 text-white/50 hover:text-white"
                    }`}
                  >
                    <span>🏆</span> #1 All-Time Rank
                  </button>
                </div>

                <div className="group relative rounded-xl sm:rounded-2xl border border-white/10 bg-black/60 p-2 sm:p-3 overflow-hidden shadow-2xl transition-all duration-500 hover:border-[var(--gold)]/50">
                  <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20 flex items-center gap-1.5 sm:gap-2 rounded bg-black/85 px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[7.5px] sm:text-[8px] text-[var(--gold)] backdrop-blur-md border border-white/10 max-w-[calc(100%-1.25rem)] truncate">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                    <span className="truncate">
                      {datacampProofTab === "activity"
                        ? "DATACAMP // ACTIVITY TELEMETRY // 179 COURSES • 120 PROJECTS"
                        : "DATACAMP // LIVE LEADERBOARD VERIFICATION // #1 RANK"}
                    </span>
                  </div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg sm:rounded-xl">
                    <Image
                      src={
                        datacampProofTab === "activity"
                          ? "/assets/research/datacamp-activity-metrics.png"
                          : "/assets/research/datacamp-leaderboard-66days.png"
                      }
                      alt={
                        datacampProofTab === "activity"
                          ? "DataCamp Verified Activity Metrics - 179 Courses, 120 Projects, 7 Tracks by LazZy Badger"
                          : "DataCamp Code for Nepal All Time #1 Leaderboard and 66 Days Challenge Completer - LazZy Badger"
                      }
                      fill
                      className="object-cover object-top transition duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 550px"
                    />
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 px-1 font-mono text-[7.5px] sm:text-[8px] text-white/40">
                    <span>
                      {datacampProofTab === "activity"
                        ? "STATUS: 179 COMPLETED • 44 IN PROGRESS"
                        : "HANDLE: LazZy Badger"}
                    </span>
                    <span className="text-[var(--gold)]">
                      {datacampProofTab === "activity"
                        ? "PLATFORM: DATACAMP ACTIVE"
                        : "RANK: #1 ALL-TIME LEADERBOARD"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Certifications Navigation & View Controller */}
        <Reveal delay={0.08}>
          <div className="mt-8 sm:mt-10 mb-5 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {[
                { id: "ALL", label: "All Credentials", count: profile.certifications_detail.length },
                { id: "AI", label: "AI & Agents", count: 8 },
                { id: "Cloud", label: "Cloud & Infra", count: 7 },
                { id: "DevTools", label: "Developer Tools", count: 5 },
              ].map((tab) => {
                const active = certCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setCertCategory(tab.id as typeof certCategory);
                      cyberSound.playBlip(900);
                    }}
                    className={`px-3 py-1.5 rounded-full font-mono text-[10.5px] sm:text-xs transition-all duration-300 flex items-center gap-1.5 cursor-pointer border active:scale-95 select-none ${
                      active
                        ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)] shadow-[0_0_15px_rgba(215,181,109,0.2)] font-semibold"
                        : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[9px] font-semibold ${
                        active ? "bg-[var(--gold)] text-black font-bold" : "bg-white/10 text-white/50"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Switcher: Cards vs Small Circle Seals */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-white/40 hidden md:inline">LAYOUT:</span>
              <div className="flex items-center p-0.5 rounded-xl border border-white/10 bg-black/40">
                <button
                  type="button"
                  onClick={() => {
                    setCertViewMode("grid");
                    cyberSound.playBlip(1020);
                  }}
                  aria-label="Cards view"
                  className={`px-2.5 py-1 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    certViewMode === "grid"
                      ? "bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/40 shadow-[0_0_10px_rgba(215,181,109,0.15)] font-semibold"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCertViewMode("seals");
                    cyberSound.playBlip(1020);
                  }}
                  aria-label="Circles view"
                  className={`px-2.5 py-1 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    certViewMode === "seals"
                      ? "bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/40 shadow-[0_0_10px_rgba(215,181,109,0.15)] font-semibold"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                  <span>Circles</span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {certViewMode === "grid" ? (
          <div className="grid gap-2 sm:gap-2.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCerts.map((cert: { name: string; issuer: string; file: string; category: string }, index: number) => {
              const theme = getCertTheme(cert.category);
              return (
                <Reveal delay={Math.min(index * 0.02, 0.25)} key={cert.name}>
                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-3 py-2.5 hover:border-[var(--gold)]/60 hover:bg-white/[0.03] hover:shadow-[0_0_20px_rgba(215,181,109,0.12)] transition-all duration-300 min-w-0"
                  >
                    {/* Small Circle Badge */}
                    <div
                      className={`relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-105 shadow-sm ${theme.border} ${theme.bg} ${theme.text} ring-1 ${theme.ring}`}
                    >
                      <CertCategoryIcon category={cert.category} className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                      <span className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-black ${theme.dot}`} />
                    </div>

                    {/* Meta info */}
                    <div className="min-w-0 flex-1">
                      <h4
                        className="text-xs sm:text-[13px] font-semibold text-[var(--cream)] truncate group-hover:text-[var(--gold)] transition-colors leading-tight"
                        title={cert.name}
                      >
                        {cert.name}
                      </h4>
                      <div className="mt-0.5 flex items-center gap-1.5 font-mono text-[8.5px] sm:text-[9px] text-white/40 truncate">
                        <span className="truncate">{cert.issuer}</span>
                        <span className="text-white/20">•</span>
                        <span className={theme.text}>{cert.category}</span>
                      </div>
                    </div>

                    {/* Small Circle Link Button */}
                    <div className="h-7 w-7 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-[10px] text-white/40 group-hover:border-[var(--gold)]/50 group-hover:text-[var(--gold)] group-hover:bg-[var(--gold)]/10 transition-all shrink-0">
                      <span>↗</span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        ) : (
          /* Circles View: Pure small circular seals matrix with interactive live HUD ticker */
          <div className="space-y-4">
            <div className="glass rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-6">
              <div className="flex flex-wrap gap-2.5 sm:gap-3.5 justify-center sm:justify-start">
                {filteredCerts.map((cert: { name: string; issuer: string; file: string; category: string }) => {
                  const theme = getCertTheme(cert.category);
                  const isHovered = activeCertHover === cert.name;
                  return (
                    <a
                      key={cert.name}
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setActiveCertHover(cert.name)}
                      onMouseLeave={() => setActiveCertHover(null)}
                      onFocus={() => setActiveCertHover(cert.name)}
                      onBlur={() => setActiveCertHover(null)}
                      title={`${cert.name} (${cert.issuer} // ${cert.category}) - Click to view PDF`}
                      className={`group relative flex flex-col items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full border transition-all duration-300 hover:scale-110 active:scale-95 shadow-md cursor-pointer ${
                        theme.border
                      } ${theme.bg} ${theme.text} ring-2 ${theme.ring} ${
                        isHovered ? `border-[var(--gold)] ${theme.glow} scale-110` : ""
                      }`}
                    >
                      <CertCategoryIcon category={cert.category} className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
                      <span className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-black ${theme.dot}`} />
                      <span className="sr-only">{cert.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* HUD Telemetry Ticker for Circles View */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2 font-mono text-[9px] sm:text-[10px]">
                <div className="flex items-center gap-2 min-w-0 flex-1 truncate">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse shrink-0" />
                  {activeCertHover ? (
                    <span className="text-[var(--cream)] truncate">
                      <span className="text-[var(--gold)] font-bold">INSPECTING:</span> {activeCertHover}
                    </span>
                  ) : (
                    <span className="text-white/40 truncate">
                      HOVER OR TAP ANY CIRCULAR SEAL TO INSPECT CREDENTIAL // CLICK TO OPEN VERIFIED PDF
                    </span>
                  )}
                </div>
                <div className="text-white/40 shrink-0 font-mono text-[8.5px]">
                  {filteredCerts.length} OF 20 ACTIVE
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="section-shell relative z-10 py-16 sm:py-24 scroll-mt-20" id="projects">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.36em] text-[var(--gold)] font-mono">projects // systems_index</p>
          <h2 className="font-display mt-2 sm:mt-3 text-3xl sm:text-5xl md:text-6xl tracking-[-0.04em]">Systems with teeth.</h2>
        </Reveal>

        {/* Custom Tooling & Forensic Engineering Showcase */}
        <Reveal delay={0.06}>
          <div className="mt-8 sm:mt-10 mb-8 sm:mb-12 glass relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[rgba(215,181,109,0.38)] p-4 sm:p-7 lg:p-10 bg-gradient-to-br from-white/[0.04] via-black/40 to-[rgba(215,181,109,0.06)] shadow-[0_0_40px_rgba(215,181,109,0.12)]">
            {/* HUD Corner Accents */}
            <div className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l-2 border-t-2 border-[var(--gold)]" />
            <div className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 border-r-2 border-t-2 border-[var(--gold)]" />
            <div className="pointer-events-none absolute left-3 bottom-3 h-3.5 w-3.5 border-l-2 border-b-2 border-[var(--gold)]" />
            <div className="pointer-events-none absolute right-3 bottom-3 h-3.5 w-3.5 border-r-2 border-b-2 border-[var(--gold)]" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-white/10 pb-4 sm:pb-6 mb-5 sm:mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  <span className="font-mono text-[8.5px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--gold)]">CUSTOM TOOLING ARSENAL // OFFENSIVE &amp; DFIR</span>
                </div>
                <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold font-display text-[var(--cream)] tracking-tight">
                  High-Velocity Bug Hunting, Mobile DFIR &amp; Civic Automation
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[8px] sm:text-[9px]">
                <span className="rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[var(--gold)] uppercase tracking-wider sm:tracking-widest font-semibold flex items-center gap-1.5">
                  <span>⚡</span> Fast Recon
                </span>
                <span className="rounded-full border border-blue-400/40 bg-blue-400/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-blue-400 uppercase tracking-wider sm:tracking-widest font-semibold flex items-center gap-1.5">
                  <span>📱</span> Mobile DFIR
                </span>
                <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-emerald-400 uppercase tracking-wider sm:tracking-widest font-semibold flex items-center gap-1.5">
                  <span>📄</span> Civic Auto
                </span>
              </div>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="space-y-3.5 sm:space-y-4">
                <div className="rounded-xl sm:rounded-2xl border border-white/5 bg-black/40 p-3.5 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-1.5 font-mono text-[8px] text-white/40 mb-1.5 sm:mb-2">
                    <span className="text-[var(--gold)] uppercase tracking-wider font-semibold">01 // H1WATCH &amp; HUNT-WORKSPACE</span>
                    <span className="text-white/30 truncate">ATTACK_SURFACE_MONITORING</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-[var(--cream)] mb-1 font-display">
                    Real-time HackerOne Scope Watcher &amp; Rapid Alerting
                  </h4>
                  <p className="text-xs leading-relaxed text-white/70">
                    Engineered for high-velocity offensive security. Continuously monitors the HackerOne ecosystem for new programs and scope expansions, pushing instant Telegram alerts for immediate first-mover advantage. Seamlessly backed by <span className="text-white font-mono text-[11px]">hunt-workspace</span> to orchestrate subfinder, katana, and custom payload sweeps.
                  </p>
                </div>

                <div className="rounded-xl sm:rounded-2xl border border-white/5 bg-black/40 p-3.5 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-1.5 font-mono text-[8px] text-white/40 mb-1.5 sm:mb-2">
                    <span className="text-blue-400 uppercase tracking-wider font-semibold">02 // IFORENSIC &amp; AFORENSIC</span>
                    <span className="text-white/30 truncate">ENTERPRISE_MOBILE_DFIR</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-[var(--cream)] mb-1 font-display">
                    Full-Fledged Deep Mobile Forensics (iOS &amp; Android)
                  </h4>
                  <p className="text-xs leading-relaxed text-white/70">
                    Enterprise-grade Digital Forensics and Incident Response (DFIR) tooling suites. Automates low-level artifact carving, decrypted sandbox forensics, SQLite database extractions, iOS keychain/plist inspection, and Android Dalvik memory triage for red-team auditing and mobile investigations.
                  </p>
                </div>

                <div className="rounded-xl sm:rounded-2xl border border-white/5 bg-black/40 p-3.5 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-1.5 font-mono text-[8px] text-white/40 mb-1.5 sm:mb-2">
                    <span className="text-emerald-400 uppercase tracking-wider font-semibold">03 // EASY PATRA (इजि-पत्र)</span>
                    <span className="text-white/30 truncate">CLERICAL_WORKFLOW_REDUCTION</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-[var(--cream)] mb-1 font-display">
                    Automated Administrative Letter Formatting &amp; Print Engine
                  </h4>
                  <p className="text-xs leading-relaxed text-white/70">
                    Designed to eliminate repetitive manual clerical drafting across Nepali corporate and governmental correspondence. Formats standardized, high-fidelity administrative letters with instant print and PDF generation, dramatically reducing human error and turnaround time.
                  </p>
                </div>
              </div>

              {/* Verified Tooling Screenshot Showcase */}
              <div className="group relative rounded-xl sm:rounded-2xl border border-white/10 bg-black/60 p-2 sm:p-3 overflow-hidden shadow-2xl transition-all duration-500 hover:border-[var(--gold)]/50">
                <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20 flex items-center gap-1.5 sm:gap-2 rounded bg-black/85 px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[7.5px] sm:text-[8px] text-[var(--gold)] backdrop-blur-md border border-white/10 max-w-[calc(100%-1.25rem)] truncate">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                  <span className="truncate">GITHUB: arthurrgg8-lgtm // TOOLING REPOSITORIES</span>
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg sm:rounded-xl">
                  <Image
                    src="/assets/research/github-tooling-repos.png"
                    alt="Active GitHub Repositories for h1watch, easy-patra, iforensic and aforensic by arthurrgg8-lgtm"
                    fill
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 550px"
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 sm:px-2 font-mono text-[7.5px] sm:text-[8px] text-white/40">
                  <span>AUTHOR: arthurrgg8-lgtm (LazZy)</span>
                  <a
                    href="https://github.com/arthurrgg8-lgtm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--gold)] hover:underline flex items-center gap-1"
                  >
                    GITHUB PROFILE ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 sm:mt-12 grid gap-3.5 sm:gap-6">
          {profile.projects.map((project, index) => {
            const diag = projectDiagnostics[project.name] || { host: "127.0.0.1", port: 443, class: "CORE_SYS" };
            const projectTarget = project.url || (project.repository ? `https://${project.repository}` : undefined);
            return (
              <Reveal delay={Math.min(index * 0.03, 0.3)} key={project.name}>
                <article 
                  className={`glass group relative flex flex-col md:grid md:grid-cols-[70px_1fr_auto] md:items-center gap-3.5 sm:gap-6 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-8 transition-all duration-500 overflow-hidden bg-black/20 ${
                    project.highlighted 
                      ? "border-[rgba(215,181,109,0.38)] shadow-[0_0_35px_rgba(215,181,109,0.12)] hover:border-[var(--gold)] hover:shadow-[0_0_45px_rgba(215,181,109,0.22)] bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-[rgba(215,181,109,0.05)]" 
                      : "border-white/5 hover:border-[rgba(215,181,109,0.48)] hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]"
                  }`}
                  data-tilt-card
                >
                  {/* Visual HUD Crop Marks */}
                  <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-[var(--gold)]/30 group-hover:border-[var(--gold)] transition-colors duration-500" />
                  <div className="pointer-events-none absolute right-3 bottom-3 h-3 w-3 border-r border-b border-[var(--gold)]/30 group-hover:border-[var(--gold)] transition-colors duration-500" />

                  {/* Golden corner glow for highlighted cards */}
                  {project.highlighted && (
                    <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-[var(--gold)]/6 blur-2xl pointer-events-none rounded-full" />
                  )}

                  {/* Absolute overlay link to open project target if it exists */}
                  {projectTarget && (
                    <a 
                      href={projectTarget} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="absolute inset-0 z-10 rounded-2xl sm:rounded-3xl" 
                      title={`Open ${project.name} ${projectTarget.includes("github.com") ? "repository" : "live site"}`}
                      aria-label={`Open ${project.name} ${projectTarget.includes("github.com") ? "repository" : "live site"}`}
                    />
                  )}

                  {/* Mobile Header Row */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5 md:hidden">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-display text-2xl text-[var(--gold)] font-bold shrink-0">{String(index + 1).padStart(2, "0")}</span>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-white/35 truncate">{"//"} {diag.class}</span>
                    </div>
                    {project.status && (
                      <span className={`rounded-full px-2.5 py-0.5 text-[8.5px] uppercase tracking-wider font-semibold font-mono flex items-center gap-1 border shrink-0 ${
                        project.status === "Live"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : project.status === "Audited"
                          ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                          : project.status === "In Development" || project.status === "2nd Place"
                          ? "border-[var(--gold)]/40 bg-[rgba(215,181,109,0.1)] text-[var(--gold)]"
                          : "border-blue-400/30 bg-blue-400/10 text-blue-400"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          project.status === "Live"
                            ? "bg-emerald-400"
                            : project.status === "Audited"
                            ? "bg-amber-300"
                            : project.status === "In Development" || project.status === "2nd Place"
                            ? "bg-[var(--gold)]"
                            : "bg-blue-400"
                        }`} />
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Desktop Index Column */}
                  <div className="hidden md:flex flex-col">
                    <span className="font-display text-4xl lg:text-5xl text-white/15 transition duration-500 group-hover:text-[var(--gold)]/40">{String(index + 1).padStart(2, "0")}</span>
                    <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">{diag.class}</span>
                  </div>

                  <div className="min-w-0">
                    {/* Technical Diagnostics Info bar */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[8px] text-white/35 mb-2 select-none">
                      <span className="truncate max-w-[180px] sm:max-w-none">IP: {diag.host}</span>
                      <span className="text-white/20">{"//"}</span>
                      <span className="text-[var(--gold)] shrink-0">PORT: {diag.port}</span>
                      <span className="text-white/20">{"//"}</span>
                      <span className="shrink-0">ACTIVE</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <h3 className="text-base sm:text-xl md:text-2xl font-semibold break-words transition group-hover:text-[var(--cream)] leading-snug">
                        {project.name}
                      </h3>
                      {project.status ? (
                        <span className={`hidden md:inline-flex rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-semibold font-mono items-center gap-1.5 border transition-all duration-300 ${
                          project.status === "Live"
                            ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
                            : project.status === "Audited"
                            ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                            : project.status === "In Development" || project.status === "2nd Place"
                            ? "border-[var(--gold)]/40 bg-[rgba(215,181,109,0.06)] text-[var(--gold)]"
                            : "border-blue-400/30 bg-blue-400/5 text-blue-400"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            project.status === "Live"
                              ? "bg-emerald-400"
                              : project.status === "Audited"
                              ? "bg-amber-300"
                              : project.status === "In Development" || project.status === "2nd Place"
                              ? "bg-[var(--gold)]"
                              : "bg-blue-400"
                          }`} />
                          {project.status}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 sm:mt-2.5 max-w-3xl text-xs sm:text-sm leading-relaxed text-white/60 transition group-hover:text-white/80">{project.description}</p>
                    
                    {project.stack && (
                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-1.5">
                        {project.stack.map((tech) => (
                          <span 
                            key={tech} 
                            className="rounded border border-white/5 bg-white/[0.02] px-2 py-0.5 sm:px-2.5 sm:py-0.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-white/40 transition-colors duration-300 group-hover:border-[var(--gold)]/15 group-hover:text-white/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Action Footer */}
                  <div className="mt-3 md:mt-0 flex items-center justify-between md:justify-end border-t border-white/5 pt-2.5 md:border-t-0 md:pt-0">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-white/35 md:hidden flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-[var(--gold)]/60" />
                      {projectTarget ? (projectTarget.includes("github.com") ? "SOURCE CODE" : "LIVE SYSTEM") : "INTERNAL SYSTEM"}
                    </span>
                    {projectTarget ? (
                      <span className="text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[var(--gold)] font-bold transition duration-300 group-hover:text-white flex items-center gap-1 shrink-0">
                        {projectTarget.includes("github.com") ? "view repository" : "visit live system"} <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                      </span>
                    ) : (
                      <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/28 font-mono">internal system</span>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 overflow-hidden py-16 sm:py-24 scroll-mt-20" id="gallery">
        <div className="section-shell mb-8 sm:mb-12">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.36em] text-[var(--gold)] font-mono">gallery // field_intel</p>
                <h2 className="font-display mt-2 sm:mt-3 max-w-3xl text-3xl sm:text-5xl md:text-6xl tracking-[-0.04em]">MEMORIES</h2>
              </div>
              <p className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-widest text-white/40 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                <span>Swipe horizontally</span>
                <span className="text-xs">→</span>
              </p>
            </div>
          </Reveal>
        </div>
        <div className="w-full overflow-x-auto md:overflow-visible scrollbar-none snap-x snap-mandatory pb-6" data-gallery-section>
          <div className="flex w-max gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 will-change-transform" data-gallery-track>
            {gallery.map((item, index) => {
              const coords = galleryIntel[item.label] || "LAT: 27.7172° N // LNG: 85.3240° E";
              return (
                <div className="w-[82vw] xs:w-[75vw] sm:w-[340px] lg:w-[400px] shrink-0 snap-center sm:snap-start" key={item.src}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveGalleryModal(item);
                      cyberSound.playBlip(1040);
                    }}
                    className="glass group relative aspect-[3/4] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 hover:border-[var(--gold)]/50 transition-all duration-500 bg-black/20 cursor-pointer block text-left active:scale-[0.98]"
                  >
                    <Image alt={item.alt} className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width: 640px) 82vw, 400px" src={item.src} />
                    
                    {/* Forensic target crops */}
                    <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-[var(--gold)]/40" />
                    <div className="pointer-events-none absolute right-3 bottom-3 h-3 w-3 border-r border-b border-[var(--gold)]/40" />

                    {/* Corner telemetry overlays */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 p-1.5 bg-black/70 backdrop-blur-md rounded border border-white/5 font-mono text-[7px] text-white/50 pointer-events-none">
                      <span>{coords}</span>
                    </div>

                    {/* Visual Expand Hint */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 h-7 w-7 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 group-hover:border-[var(--gold)] group-hover:text-[var(--gold)] transition-all">
                      <span className="text-xs">⤢</span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 sm:p-6">
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40 mb-1">INTEL_LOG // 0{index + 1}</p>
                      <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[var(--gold)] font-semibold flex items-center justify-between">
                        <span>{item.label}</span>
                        <span className="text-[10px] font-mono text-white/40 font-normal">TAP TO EXPAND</span>
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical FAQ & Capability Briefing Section */}
      <section className="section-shell relative z-10 py-16 sm:py-24 scroll-mt-20" id="faq" aria-labelledby="faq-heading">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.36em] text-[var(--gold)] font-mono">intelligence // faq_briefing</p>
          <h2 id="faq-heading" className="font-display mt-2 sm:mt-3 text-3xl sm:text-5xl md:text-6xl tracking-[-0.04em]">Technical Briefing.</h2>
          <p className="mt-3 sm:mt-4 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-white/60">
            Frequently referenced inquiries regarding fullstack architecture, systems development, hackathon achievements, and security research with Anudit Khatri.
          </p>
        </Reveal>

        <div className="mt-8 sm:mt-12 space-y-3 sm:space-y-3.5 max-w-4xl">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <Reveal delay={index * 0.04} key={faq.question}>
                <div
                  className={`glass group rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[var(--gold)]/50 bg-black/50 shadow-[0_0_20px_rgba(215,181,109,0.12)]"
                      : "border-white/5 bg-black/30 hover:border-[var(--gold)]/30 hover:bg-black/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setOpenFaq(isOpen ? null : index);
                      cyberSound.playBlip(isOpen ? 780 : 980);
                    }}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <span className="font-mono text-xs text-[var(--gold)] shrink-0 select-none">
                        0{index + 1} {"//"}
                      </span>
                      <h3 className={`text-sm sm:text-base md:text-lg font-semibold font-display tracking-wide transition-colors ${
                        isOpen ? "text-[var(--gold)]" : "text-[var(--cream)] group-hover:text-[var(--gold)]"
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`h-7 w-7 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-xs text-white/60 transition-all duration-300 shrink-0 ${
                        isOpen
                          ? "rotate-180 border-[var(--gold)] text-[var(--gold)] bg-[var(--gold)]/10"
                          : "group-hover:border-white/30"
                      }`}
                    >
                      ↓
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-white/5 mt-1">
                      <p className="text-xs sm:text-sm leading-relaxed text-white/70 pl-7 sm:pl-9 pt-2">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-shell relative z-10 pb-20 sm:pb-28 pt-12 sm:pt-16 scroll-mt-20" id="contact">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 bg-black/20">
            <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-[var(--gold)]/40" />
            <div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-white/10" />
            <div className="pointer-events-none absolute left-3 bottom-3 h-4 w-4 border-l border-b border-white/10" />
            <div className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 border-r border-b border-[var(--gold)]/40" />

            <div className="flex flex-col gap-8 sm:gap-12">
              <div className="relative">
                {/* Terminal prompt watermarks in bg */}
                <div className="absolute -top-10 right-0 font-mono text-[8px] text-white/5 select-none hidden md:block space-y-1">
                  <p>badger@sec-shell:~$ ping -c 3 google.com</p>
                  <p>badger@sec-shell:~$ initiate secure_handshake --port 8443</p>
                  <p>STATUS: ESTABLISHED // CHANNEL: SECURE</p>
                </div>

                <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[var(--gold)] font-mono">connect // secure_handshake</p>
                <h2 className="font-display mt-4 sm:mt-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] sm:leading-[1.1] tracking-[-0.03em]">
                  Build less by hand.<br />Build more with systems.<br />
                  <span className="text-[var(--gold)]/80">Else if</span> Build your own System.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-5">
                <SocialIcon ariaLabel="Email Anudit Khatri via Gmail" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.socials.email}`} icon={<MailIcon />} />
                <SocialIcon ariaLabel="Message Anudit Khatri on WhatsApp" href={`https://wa.me/${profile.socials.whatsapp}`} icon={<WhatsAppIcon />} />
                <SocialIcon ariaLabel="View GitHub Profile of Anudit Khatri (arthurrgg8-lgtm)" href={`https://github.com/${profile.socials.github}`} icon={<GithubIcon />} />
                <SocialIcon ariaLabel="View Instagram Profile" href={`https://instagram.com/${profile.socials.instagram}`} icon={<InstagramIcon />} />
                <SocialIcon ariaLabel="View Facebook Profile" href={`https://facebook.com/${profile.socials.facebook}`} icon={<FacebookIcon />} />
                <SocialIcon ariaLabel="View YouTube Channel" href={`https://www.youtube.com/${profile.socials.youtube}`} icon={<YouTubeIcon />} />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Semantic High-Tech Developer & Systems Footer for SEO & Navigation */}
      <footer className="relative z-10 border-t border-white/10 bg-black/60 pt-12 sm:pt-16 pb-12 backdrop-blur-xl">
        <div className="section-shell">
          <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-10 sm:pb-12 border-b border-white/10">
            {/* Col 1: Developer Bio & Brand */}
            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-7 w-7 overflow-hidden rounded-full border border-[var(--gold)]/40 shrink-0">
                  <Image alt="Anudit Khatri Avatar" className="object-cover" fill sizes="28px" src="/assets/lazzy.jpeg" />
                </div>
                <span className="font-semibold text-sm tracking-[0.25em] text-[var(--cream)] uppercase">
                  Anudit <span className="text-[var(--gold)]">Khatri</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed text-white/60">
                Premier Fullstack Developer, Cybersecurity Researcher, and AI Systems Architect based in Kathmandu, Nepal. Dedicated to mission-critical engineering, local-first autonomy, and edge runtime security.
              </p>
              <div className="flex items-center gap-2 font-mono text-[8.5px] sm:text-[9px] text-[var(--gold)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>AVAILABLE FOR GLOBAL SYSTEMS CONTRACTS</span>
              </div>
            </div>

            {/* Col 2: Core Engineering Capabilities */}
            <div className="space-y-2.5 sm:space-y-3 font-mono text-xs">
              <h4 className="text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[var(--gold)] font-bold">Engineering Stack</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-white/65 text-[11px] sm:text-xs">
                <li>• Next.js App Router &amp; Server Actions</li>
                <li>• High-Performance Rust &amp; Python Systems</li>
                <li>• Local LLM Orchestration &amp; MCP Tooling</li>
                <li>• Edge Runtime Hardening &amp; Pentesting</li>
                <li>• Mobile DFIR &amp; Digital Carving (iOS/Android)</li>
                <li>• LoRa Wireless Telemetry &amp; IoT Meshes</li>
              </ul>
            </div>

            {/* Col 3: Notable Systems & Verified Proof */}
            <div className="space-y-2.5 sm:space-y-3 font-mono text-xs">
              <h4 className="text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[var(--gold)] font-bold">Systems &amp; Honors</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-white/65 text-[11px] sm:text-xs">
                <li>• 🏆 2nd Place: Nepal Police Hackathon 2083</li>
                <li>• 🏆 #1 All-Time: DataCamp × Code for Nepal</li>
                <li>• 🎓 66-Days Continuous Challenge Completer</li>
                <li>• ⚡ Prahari-Link (LoRa Mesh Disaster Bridge)</li>
                <li>• 🔍 WordPress SQLite Core Research (#568)</li>
                <li>• 🛡️ 20 Verified DataCamp AI/Cloud Certs</li>
              </ul>
            </div>

            {/* Col 4: Direct Dispatch & Location */}
            <div className="space-y-2.5 sm:space-y-3 font-mono text-xs">
              <h4 className="text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[var(--gold)] font-bold">Direct Dispatch</h4>
              <p className="text-white/60 text-[11px] leading-relaxed">
                Base: Kathmandu, Bagmati, Nepal (NP)<br />
                Response Latency: &lt; 24h
              </p>
              <div className="space-y-1.5 pt-1">
                <a href={`mailto:${profile.socials.email}`} className="text-[var(--gold)] hover:underline block truncate">
                  {profile.socials.email}
                </a>
                <a href={`https://wa.me/${profile.socials.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline block">
                  +977 9762691579 (WhatsApp)
                </a>
                <a href={`https://github.com/${profile.socials.github}`} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white block">
                  github.com/{profile.socials.github}
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Telemetry Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[9px] sm:text-[10px] text-white/40">
            <div>
              © {new Date().getFullYear()} Anudit Khatri (Lazzy Badger). All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[8.5px] sm:text-[9px] text-white/30 uppercase tracking-wider sm:tracking-widest">
              <span>LAT: 27.7172° N</span>
              <span>{"//"}</span>
              <span>LNG: 85.3240° E</span>
              <span>{"//"}</span>
              <span className="text-[var(--gold)]">SYS_CORE: OPERATIONAL</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Cyber Ambient Audio Controller on All Screens */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <SoundController className="shadow-[0_0_20px_rgba(0,0,0,0.85)] backdrop-blur-xl bg-black/90" />
      </div>

      {/* Interactive Cyber HUD Lightbox Modal */}
      {activeGalleryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-3 sm:p-6 md:p-10 animate-fadeIn"
          onClick={() => {
            setActiveGalleryModal(null);
            cyberSound.playBlip(720);
          }}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] glass rounded-2xl sm:rounded-3xl border border-[var(--gold)]/40 overflow-hidden shadow-[0_0_60px_rgba(215,181,109,0.25)] flex flex-col bg-black/95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-3 sm:py-3.5 bg-black/70 font-mono text-[9px] sm:text-xs">
              <div className="flex items-center gap-2 text-[var(--gold)] min-w-0">
                <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-pulse shrink-0" />
                <span className="font-bold tracking-widest uppercase truncate">FIELD INTEL // {activeGalleryModal.label}</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <span className="text-white/40 hidden md:inline">{galleryIntel[activeGalleryModal.label] || "LAT: 27.7172° N // LNG: 85.3240° E"}</span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveGalleryModal(null);
                    cyberSound.playBlip(720);
                  }}
                  className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/70 hover:border-[var(--gold)] hover:text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all cursor-pointer"
                  aria-label="Close image modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Image Area */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full bg-black/80 flex items-center justify-center overflow-hidden">
              <Image
                src={activeGalleryModal.src}
                alt={activeGalleryModal.alt}
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 95vw, 1000px"
              />
              {/* Reticle Overlay */}
              <div className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-[var(--gold)]" />
              <div className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-[var(--gold)]" />
              <div className="pointer-events-none absolute left-4 bottom-4 h-4 w-4 border-l-2 border-b-2 border-[var(--gold)]" />
              <div className="pointer-events-none absolute right-4 bottom-4 h-4 w-4 border-r-2 border-b-2 border-[var(--gold)]" />
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-white/10 bg-black/70 font-mono text-[8px] sm:text-[9.5px] text-white/50">
              <span className="truncate max-w-[280px] sm:max-w-none">TARGET: {activeGalleryModal.alt}</span>
              <span className="text-[var(--gold)]">ESC OR TAP ✕ TO DISMISS</span>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  );
}

function SocialIcon({ href, icon, ariaLabel }: { href: string; icon: React.ReactNode; ariaLabel: string }) {
  return (
    <a 
      className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 hover:shadow-[0_0_20px_rgba(215,181,109,0.2)] active:scale-95" 
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <div className="text-white/60 transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--gold)]">
        {icon}
      </div>
      <div className="absolute inset-0 -z-10 rounded-xl sm:rounded-2xl bg-[var(--gold)] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20" />
    </a>
  );
}

function SkillCluster({
  title,
  values,
  activeSkill,
  onSelectSkill,
}: {
  title: string;
  values: string[];
  activeSkill: string | null;
  onSelectSkill: (skill: string) => void;
}) {
  return (
    <div className="glass relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-black/25 border border-white/5 transition-all duration-300 hover:border-[var(--gold)]/30 shadow-lg h-full flex flex-col justify-between">
      <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-[var(--gold)]/40" />
      <div className="pointer-events-none absolute right-3 bottom-3 h-3 w-3 border-r border-b border-white/10" />
      
      <div>
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3.5 select-none">
          <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[var(--gold)] font-bold">{title}</h3>
          <span className="font-mono text-[7px] text-white/30 select-none">DB_CLUSTER_READY</span>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {values.map((value) => {
            const isSelected = activeSkill === value;
            return (
              <button
                type="button"
                key={value}
                onClick={() => onSelectSkill(value)}
                className={`rounded border px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                  isSelected
                    ? "border-[var(--gold)] bg-[var(--gold)]/20 text-[var(--gold)] font-bold shadow-[0_0_12px_rgba(215,181,109,0.3)] ring-1 ring-[var(--gold)]/50"
                    : "border-white/5 bg-white/[0.02] text-white/50 hover:border-[var(--gold)]/35 hover:text-[var(--gold)] hover:bg-[var(--gold)]/5"
                }`}
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3.5 pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[7.5px] text-white/30 select-none">
        <span>NODES: {values.length}</span>
        <span className="text-[var(--gold)]/60">TAP SKILL TO HIGHLIGHT</span>
      </div>
    </div>
  );
}

function CertCategoryIcon({ category, className = "h-4 w-4" }: { category: string; className?: string }) {
  if (category === "AI") {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    );
  }
  if (category === "Cloud") {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

function getCertTheme(category: string) {
  if (category === "AI") {
    return {
      border: "border-[var(--gold)]/40",
      bg: "bg-[var(--gold)]/10",
      text: "text-[var(--gold)]",
      ring: "ring-[var(--gold)]/20",
      glow: "shadow-[0_0_15px_rgba(215,181,109,0.25)]",
      dot: "bg-[var(--gold)]",
      badge: "border-[var(--gold)]/30 bg-[var(--gold)]/5 text-[var(--gold)]",
    };
  }
  if (category === "Cloud") {
    return {
      border: "border-sky-400/40",
      bg: "bg-sky-400/10",
      text: "text-sky-400",
      ring: "ring-sky-400/20",
      glow: "shadow-[0_0_15px_rgba(56,189,248,0.25)]",
      dot: "bg-sky-400",
      badge: "border-sky-400/30 bg-sky-400/5 text-sky-400",
    };
  }
  return {
    border: "border-emerald-400/40",
    bg: "bg-emerald-400/10",
    text: "text-emerald-400",
    ring: "ring-emerald-400/20",
    glow: "shadow-[0_0_15px_rgba(52,211,153,0.25)]",
    dot: "bg-emerald-400",
    badge: "border-emerald-400/30 bg-emerald-400/5 text-emerald-400",
  };
}

function MailIcon() {
  return <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function WhatsAppIcon() {
  return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;
}

function GithubIcon() {
  return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;
}

function InstagramIcon() {
  return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.903.332 4.145.627c-.783.304-1.447.712-2.108 1.373C1.376 2.66 0.968 3.324.664 4.107.37 4.865.167 5.738.11 7.016.052 8.297.04 8.705.04 11.964s.012 3.667.07 4.947c.057 1.278.26 2.15.554 2.908.304.783.712 1.447 1.373 2.108.66.66 1.325 1.068 2.108 1.373.758.294 1.63.496 2.908.554 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.278-.057 2.15-.26 2.908-.554.783-.304 1.447-.712 2.108-1.373.66-.66 1.068-1.325 1.373-2.108.294-.758.496-1.63.554-2.908.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.057-1.278-.26-2.15-.554-2.908-.304-.783-.712-1.447-1.373-2.108-.66-.66-1.325-1.068-2.108-1.373-.758-.294-1.63-.496-2.908-.554-1.28-.058-1.688-.07-4.947-.07z"/><path d="M12 5.827a6.137 6.137 0 100 12.274 6.137 6.137 0 000-12.274zm0 10.111a3.974 3.974 0 110-7.948 3.974 3.974 0 010 7.948z"/><path d="M18.385 5.615a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>;
}

function FacebookIcon() {
  return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078v-3.397h3.047V9.43c0-3.007 1.791-4.667 4.53-4.667 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.397h-2.796v8.458C19.612 23.027 24 18.062 24 12.073z"/></svg>;
}

function YouTubeIcon() {
  return <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
}
