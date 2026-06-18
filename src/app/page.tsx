"use client";

import { useState } from "react";
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
import { useEffect } from "react";
import { TaglineHud } from "@/components/tagline-hud";

const navItems = ["about", "projects", "gallery", "contact"];

const projectDiagnostics: Record<string, { host: string; port: number; class: string }> = {
  "Prahari-Link (प्रहरी-Link)": { host: "127.0.0.1", port: 3001, class: "LORA_MESH" },
  "MR Tour Service": { host: "manoranjan.com.np", port: 443, class: "LIVE_SYS" },
  "Ar. Anushka Khatri Portfolio": { host: "anushkakhatri.com.np", port: 443, class: "LIVE_SYS" },
  "Himalayan Mastiff Nepal": { host: "bhoteykukur.com.np", port: 8080, class: "DEV_PORT" },
  "Lazzybiointel-v6.2-PRO": { host: "127.0.0.1", port: 9090, class: "LOCAL_CORE" },
  "Deepfake-Analyzer": { host: "127.0.0.1", port: 8000, class: "LOCAL_CORE" },
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

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);
  const [startScramble, setStartScramble] = useState(false);
  const [ping, setPing] = useState(24);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <>
      {!isBooted && (
        <BootScreen
          onComplete={() => {
            setIsBooted(true);
            setStartScramble(true);
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

      <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-2xl">
        <nav className="section-shell flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link className="group flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.34em] text-[var(--cream)]" href="#top">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[var(--gold)]/30">
                <Image alt="Lazzy Badger Logo" className="object-cover" fill sizes="32px" src="/assets/lazzy.jpeg" />
              </div>
              <span className="translate-x-[0.17em]">
                Lazzy<span className="text-[var(--gold)]">Badger</span>
              </span>
            </Link>
            <div className="hidden items-center gap-4 border-l border-white/10 pl-6 md:flex">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--gold)] shadow-[0_0_8px_var(--gold)]" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">System: Online</span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <span className="font-mono text-[9px] text-[var(--gold)] tracking-wider">LATENCY: {ping}ms</span>
            </div>
          </div>
          <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.26em] text-white/58 md:flex">
            {navItems.map((item) => (
              <NavLink className="transition hover:text-[var(--gold)]" href={`#${item}`} key={item} text={item} />
            ))}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-[var(--cream)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition duration-300 md:hidden z-40 focus:outline-none"
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
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-20 flex flex-col justify-center items-center bg-black/95 backdrop-blur-3xl md:hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-105"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,181,109,0.06),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent top-1/4" />
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent bottom-1/4" />

        <nav className="flex flex-col items-center gap-8 text-lg font-bold uppercase tracking-[0.3em] text-[var(--cream)]">
          {navItems.map((item) => (
            <NavLink
              className="transition-all duration-300 hover:text-[var(--gold)] hover:scale-115 active:text-[var(--gold)] py-2 block text-center"
              href={`#${item}`}
              key={item}
              text={item}
              onClick={() => setMobileMenuOpen(false)}
            />
          ))}
        </nav>
        <div className="absolute bottom-10 text-[9px] font-mono tracking-widest text-white/30 select-none">
          SECURE_MENU // ACCESS_GRANTED
        </div>
      </div>

      <section className="section-shell relative z-10 grid items-center gap-8 pb-12 pt-20 md:pb-20 md:pt-28 lg:grid-cols-[1.1fr_0.9fr] min-h-[calc(100vh-4rem)]" id="top">
        <div className="flex flex-col justify-center">
          <Reveal>
            <TaglineHud />
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-4xl xs:text-5xl sm:text-7xl lg:text-9xl font-bold leading-[0.95] md:leading-[0.86] tracking-[-0.06em] text-gradient">
              <ScrambleText text={profile.identity.brand_name} trigger={startScramble} />
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 sm:mt-7 max-w-2xl text-sm sm:text-lg leading-6 sm:leading-8 text-white/68 sm:text-xl">
              {profile.about.persona}
            </p>
          </Reveal>
          <Reveal delay={0.20}>
            <HardwareHud />
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-6 sm:mt-10 flex flex-col gap-3 sm:flex-row">
              <Link className="rounded-full bg-[var(--cream)] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.22em] text-black transition hover:bg-[var(--gold)]" href="#projects">
                view systems
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="flex justify-center items-center mt-6 lg:mt-0">
          <ProfileScanner />
        </Reveal>
      </section>

      <section className="section-shell relative z-10 py-24" id="about">
        <Reveal>
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.36em] text-[var(--gold)]">about</p>
              <h2 className="font-display mt-3 max-w-3xl text-3xl sm:text-5xl md:text-7xl leading-tight md:leading-none tracking-[-0.04em]">
                Built around curiosity, automation, and local-first systems.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/56">A personal technical portfolio focused on {profile.website_structure.target_audience}.</p>
          </div>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="glass h-full rounded-[2rem] p-7 relative overflow-hidden bg-black/20">
              <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[var(--gold)]/40 via-transparent to-transparent" />
              <div className="absolute left-0 top-0 h-4 w-4 border-l border-t border-[var(--gold)]/40" />
              <div className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-white/10" />
              <p className="text-base leading-8 text-white/70">{profile.about.full_description}</p>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal delay={index * 0.04} key={pillar}>
                <div className="glass group relative overflow-hidden rounded-[2rem] p-6 transition duration-500 hover:-translate-y-2 hover:border-[rgba(215,181,109,0.45)] bg-black/20" data-tilt-card>
                  <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/20 to-transparent" />
                  <div className="absolute left-0 top-0 h-3.5 w-3.5 border-l border-t border-[var(--gold)]" />
                  <div className="absolute right-0 top-0 h-3.5 w-3.5 border-r border-t border-white/5 group-hover:border-[var(--gold)]/30 transition-colors" />
                  
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/30">CORE MODULE // 0{index + 1}</span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[var(--gold)] group-hover:animate-pulse">Active</span>
                  </div>
                  
                  <h3 className="mt-6 text-xl font-semibold text-[var(--cream)] font-display tracking-wide group-hover:text-[var(--gold)] transition-colors">{pillar}</h3>
                  
                  <div className="mt-6 flex items-center justify-between font-mono text-[8px] text-white/20">
                    <span>SEC_CLASS: LEVEL_4</span>
                    <span>SYS_STATUS: OK</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell relative z-10 py-24">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <SkillCluster title="Languages" values={profile.skills_and_tools.languages} />
            <SkillCluster title="Bug Bounty Stack" values={profile.skills_and_tools.bug_bounty_tools} />
            <SkillCluster title="MCP + AI Infra" values={profile.skills_and_tools.mcp_infrastructure} />
            <SkillCluster title="Tools + Systems" values={profile.skills_and_tools.tools} />
            <SkillCluster title="Traits" values={profile.skills_and_tools.core_traits} />
            <SkillCluster title="Certifications" values={profile.skills_and_tools.certifications} />
          </div>
        </Reveal>
      </section>

      <section className="section-shell relative z-10 py-24" id="projects">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.36em] text-[var(--gold)]">projects</p>
          <h2 className="font-display mt-3 text-3xl sm:text-5xl md:text-7xl tracking-[-0.04em]">Systems with teeth.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6">
          {profile.projects.map((project, index) => {
            const diag = projectDiagnostics[project.name] || { host: "unknown", port: 80, class: "TARGET" };
            return (
              <Reveal delay={index * 0.05} key={project.name}>
                <article 
                  className={`glass group relative grid gap-6 rounded-[2rem] p-5 sm:p-8 transition-all duration-500 md:grid-cols-[0.16fr_1fr_0.2fr] md:items-center overflow-hidden bg-black/20 ${
                    project.highlighted 
                      ? "border-[rgba(215,181,109,0.38)] shadow-[0_0_35px_rgba(215,181,109,0.12)] hover:border-[var(--gold)] hover:shadow-[0_0_45px_rgba(215,181,109,0.22)] bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-[rgba(215,181,109,0.05)]" 
                      : "border-white/5 hover:border-[rgba(215,181,109,0.48)] hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]"
                  }`}
                  data-tilt-card
                >
                  {/* Visual HUD Crop Marks (Teeth corners) */}
                  <div className="pointer-events-none absolute -left-px -top-px h-3.5 w-3.5 border-l border-t border-[var(--gold)]/30 group-hover:border-[var(--gold)] transition-colors duration-500" />
                  <div className="pointer-events-none absolute -right-px -top-px h-3.5 w-3.5 border-r border-t border-[var(--gold)]/30 group-hover:border-[var(--gold)] transition-colors duration-500" />
                  <div className="pointer-events-none absolute -left-px -bottom-px h-3.5 w-3.5 border-l border-b border-[var(--gold)]/30 group-hover:border-[var(--gold)] transition-colors duration-500" />
                  <div className="pointer-events-none absolute -right-px -bottom-px h-3.5 w-3.5 border-r border-b border-[var(--gold)]/30 group-hover:border-[var(--gold)] transition-colors duration-500" />

                  {/* Golden corner glow for highlighted cards */}
                  {project.highlighted && (
                    <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-[var(--gold)]/6 blur-2xl pointer-events-none rounded-full" />
                  )}

                  {/* Absolute overlay link to open live site if URL exists */}
                  {project.url && (
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="absolute inset-0 z-10 rounded-[2rem]" 
                      title={`Open ${project.name} live site`}
                    />
                  )}

                  <div className="flex flex-col">
                    <span className="font-display text-5xl text-white/12 transition duration-500 group-hover:text-[var(--gold)]/40">{String(index + 1).padStart(2, "0")}</span>
                    <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">{diag.class}</span>
                  </div>

                  <div>
                    {/* Technical Diagnostics Info bar */}
                    <div className="flex items-center gap-3 font-mono text-[8px] text-white/30 mb-2 select-none">
                      <span>IP: {diag.host}</span>
                      <span>{"//"}</span>
                      <span className="text-[var(--gold)]">PORT: {diag.port}</span>
                      <span>{"//"}</span>
                      <span>STATUS: ACTIVE</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-semibold transition group-hover:text-[var(--cream)]">
                        <ScrambleText text={project.name} trigger={startScramble} />
                      </h3>
                      {project.status ? (
                        <span className={`rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.24em] font-semibold font-mono flex items-center gap-1.5 border transition-all duration-500 ${
                          project.status === "Delivered & Live"
                            ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.1)]"
                            : project.status === "In Development"
                            ? "border-[var(--gold)]/40 bg-[rgba(215,181,109,0.06)] text-[var(--gold)] shadow-[0_0_10px_rgba(215,181,109,0.1)]"
                            : "border-blue-400/30 bg-blue-400/5 text-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.1)]"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            project.status === "Delivered & Live"
                              ? "bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]"
                              : project.status === "In Development"
                              ? "bg-[var(--gold)] animate-pulse shadow-[0_0_6px_rgba(215,181,109,0.6)]"
                              : "bg-blue-400 animate-pulse shadow-[0_0_6px_rgba(96,165,250,0.6)]"
                          }`} />
                          {project.status}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 max-w-3xl leading-7 text-white/60 transition group-hover:text-white/80">{project.description}</p>
                    
                    {project.stack && (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span 
                            key={tech} 
                            className="rounded border border-white/5 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/40 transition-colors duration-300 group-hover:border-[var(--gold)]/15 group-hover:text-white/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex md:justify-end">
                    {project.url ? (
                      <span className="text-sm uppercase tracking-[0.22em] text-[var(--gold)] font-bold transition duration-300 group-hover:text-white flex items-center gap-1">
                        live site <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                      </span>
                    ) : project.repository ? (
                      <Link className="relative z-20 text-sm uppercase tracking-[0.22em] text-[var(--gold)] transition hover:text-white" href={`https://${project.repository}`}>
                        repo
                      </Link>
                    ) : (
                      <span className="text-sm uppercase tracking-[0.22em] text-white/28 font-mono">private</span>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 md:min-h-screen overflow-hidden py-24" id="gallery">
        <div className="section-shell mb-12">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.36em] text-[var(--gold)] font-mono">gallery // field_intel</p>
            <h2 className="font-display mt-3 max-w-3xl text-3xl sm:text-5xl md:text-7xl tracking-[-0.04em]">MEMORIES</h2>
          </Reveal>
        </div>
        <div className="w-full overflow-x-auto md:overflow-visible scrollbar-none" data-gallery-section>
          <div className="flex w-max gap-5 pl-[max(16px,calc((100vw-1180px)/2))] pr-8 pb-6 will-change-transform" data-gallery-track>
            {gallery.map((item, index) => {
              const coords = galleryIntel[item.label] || "LAT: 27.7172° N // LNG: 85.3240° E";
              return (
                <Reveal className="w-[78vw] shrink-0 sm:w-[360px] lg:w-[420px]" delay={index * 0.05} key={item.src}>
                  <div className="glass group relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/5 hover:border-[var(--gold)]/35 transition duration-500 bg-black/20">
                    <Image alt={item.alt} className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width: 640px) 78vw, 420px" src={item.src} />
                    
                    {/* Forensic target crops */}
                    <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-[var(--gold)]/30" />
                    <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-r border-b border-[var(--gold)]/30" />

                    {/* Corner telemetry overlays */}
                    <div className="absolute top-4 left-4 p-1.5 bg-black/60 backdrop-blur-md rounded border border-white/5 font-mono text-[7px] text-white/40 pointer-events-none">
                      <span>{coords}</span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/45 to-transparent p-6">
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30 mb-1">INTEL_LOG // 0{index + 1}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">{item.label}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell relative z-10 pb-28 pt-16" id="contact">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2.75rem] p-8 md:p-16 bg-black/20">
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[var(--gold)]/40 via-transparent to-transparent" />
            <div className="absolute left-0 top-0 h-4 w-4 border-l border-t border-[var(--gold)]/40" />
            <div className="absolute right-0 top-0 h-4 w-4 border-r border-t border-white/10" />
            <div className="absolute left-0 bottom-0 h-4 w-4 border-l border-b border-white/10" />
            <div className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[var(--gold)]/40" />

            <div className="flex flex-col gap-12">
              <div className="relative">
                {/* Terminal prompt watermarks in bg */}
                <div className="absolute -top-10 right-0 font-mono text-[8px] text-white/5 select-none hidden md:block space-y-1">
                  <p>badger@sec-shell:~$ ping -c 3 google.com</p>
                  <p>badger@sec-shell:~$ initiate secure_handshake --port 8443</p>
                  <p>STATUS: ESTABLISHED // CHANNEL: SECURE</p>
                </div>

                <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold)] font-mono">connect // secure_handshake</p>
                <h2 className="font-display mt-6 text-5xl leading-[1.1] tracking-[-0.03em] md:text-7xl">
                  Build less by hand.<br />Build more with systems.<br />
                  <span className="text-[var(--gold)]/80">Else if</span> Build your own System.
                </h2>
              </div>
              <div className="flex flex-wrap gap-5">
                <SocialIcon href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.socials.email}`} icon={<MailIcon />} />
                <SocialIcon href={`https://wa.me/${profile.socials.whatsapp}`} icon={<WhatsAppIcon />} />
                <SocialIcon href={`https://github.com/${profile.socials.github}`} icon={<GithubIcon />} />
                <SocialIcon href={`https://instagram.com/${profile.socials.instagram}`} icon={<InstagramIcon />} />
                <SocialIcon href={`https://facebook.com/${profile.socials.facebook}`} icon={<FacebookIcon />} />
                <SocialIcon href={`https://www.youtube.com/${profile.socials.youtube}`} icon={<YouTubeIcon />} />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
    </>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      className="group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-500 hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 hover:shadow-[0_0_20px_rgba(215,181,109,0.2)]" 
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="text-white/60 transition-all duration-500 group-hover:scale-110 group-hover:text-[var(--gold)]">
        {icon}
      </div>
      <div className="absolute inset-0 -z-10 rounded-2xl bg-[var(--gold)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />
    </a>
  );
}

function SkillCluster({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="glass relative p-6 rounded-[1.5rem] bg-black/25 border border-white/5 transition-all duration-300 hover:border-[var(--gold)]/20 shadow-lg">
      <div className="absolute left-0 top-0 h-3 w-3 border-l border-t border-[var(--gold)]/40" />
      <div className="absolute right-0 bottom-0 h-3 w-3 border-r border-b border-white/10" />
      
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 select-none">
        <h3 className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--gold)]">{title}</h3>
        <span className="font-mono text-[7px] text-white/20 select-none">DB_CLUSTER_READY</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {values.map((value) => (
          <span 
            className="rounded border border-white/5 bg-white/[0.02] px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/50 transition-all duration-300 hover:border-[var(--gold)]/35 hover:text-[var(--gold)] hover:bg-[var(--gold)]/5 hover:scale-[1.03] select-none" 
            key={value}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
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
