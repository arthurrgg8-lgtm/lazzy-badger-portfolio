import Image from "next/image";
import Link from "next/link";
import { AmbientStage } from "@/components/ambient-stage";
import { Reveal } from "@/components/reveal";
import { ScrollOrchestrator } from "@/components/scroll-orchestrator";
import { gallery, pillars, profile } from "@/lib/profile";

const navItems = ["about", "projects", "gallery", "contact"];

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <AmbientStage />
      <ScrollOrchestrator />
      <div className="noise" />

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
            <div className="hidden items-center gap-2 border-l border-white/10 pl-6 md:flex">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--gold)] shadow-[0_0_8px_var(--gold)]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">System: Online</span>
            </div>
          </div>
          <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.26em] text-white/58 md:flex">
            {navItems.map((item) => (
              <Link className="transition hover:text-[var(--gold)]" href={`#${item}`} key={item}>
                {item}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <section className="section-shell relative z-10 grid min-h-screen items-center gap-12 pb-20 pt-28 lg:grid-cols-[1.1fr_0.9fr]" id="top">
        <div>
          <Reveal>
            <p className="mb-5 inline-flex rounded-full border border-[rgba(215,181,109,0.28)] bg-[rgba(215,181,109,0.08)] px-4 py-2 text-xs uppercase tracking-[0.32em] text-[var(--gold)]">
              {profile.identity.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-6xl font-bold leading-[0.86] tracking-[-0.06em] text-gradient sm:text-7xl lg:text-9xl">
              {profile.identity.brand_name}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              {profile.about.persona}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link className="rounded-full bg-[var(--cream)] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.22em] text-black transition hover:bg-[var(--gold)]" href="#projects">
                view systems
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <div className="relative mx-auto w-full max-w-[460px] lg:mr-0">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-[conic-gradient(from_140deg,transparent,rgba(215,181,109,0.45),rgba(8,35,70,0.65),transparent)] blur-xl" />
            <div className="glass relative aspect-square w-full overflow-hidden rounded-[2.5rem]">
              <Image alt="Anudit Khatri profile portrait" className="object-cover grayscale-[15%] contrast-110" fill priority sizes="(max-width: 768px) 92vw, 460px" src="/assets/lazzy.jpeg" />
            </div>
            <div className="relative mt-10 pl-6">
              <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/20 to-transparent" />
              <div className="absolute -left-1 -top-1 h-2 w-2 border-l border-t border-[var(--gold)]" />
              <div className="absolute -left-1 bottom-0 h-2 w-2 border-b border-l border-[var(--gold)]" />
              
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--gold)]">identity</p>
                <h2 className="text-4xl font-semibold text-[var(--cream)]">{profile.identity.name}</h2>
                <p className="text-lg font-medium text-white/60">{profile.identity.short_bio}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell relative z-10 py-24" id="about">
        <Reveal>
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.36em] text-[var(--gold)]">about</p>
              <h2 className="font-display mt-3 max-w-3xl text-5xl leading-none tracking-[-0.04em] md:text-7xl">
                Built around curiosity, automation, and local-first systems.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/56">A personal technical portfolio focused on {profile.website_structure.target_audience}.</p>
          </div>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="glass h-full rounded-[2rem] p-7">
              <p className="text-base leading-8 text-white/70">{profile.about.full_description}</p>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal delay={index * 0.04} key={pillar}>
                <div className="glass group relative overflow-hidden rounded-[2rem] p-6 transition duration-500 hover:-translate-y-2 hover:border-[rgba(215,181,109,0.45)]" data-tilt-card>
                  <div className="absolute left-2 top-0 h-full w-[2px] bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/40 to-transparent" />
                  <div className="absolute left-2 top-0 h-3 w-3 border-l-2 border-t-2 border-[var(--gold)]" />
                  
                  <span className="text-xs uppercase tracking-[0.3em] text-white/36">0{index + 1}</span>
                  <h3 className="mt-8 text-2xl font-semibold text-[var(--cream)]">{pillar}</h3>
                  <div className="mt-8 h-px bg-gradient-to-r from-[var(--gold)] to-transparent opacity-60" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell relative z-10 py-24">
        <Reveal>
          <div className="glass rounded-[2.5rem] p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <SkillCluster title="Languages" values={profile.skills_and_tools.languages} />
              <SkillCluster title="Bug Bounty Stack" values={profile.skills_and_tools.bug_bounty_tools} />
              <SkillCluster title="MCP + AI Infra" values={profile.skills_and_tools.mcp_infrastructure} />
              <SkillCluster title="Tools + Systems" values={profile.skills_and_tools.tools} />
              <SkillCluster title="Traits" values={profile.skills_and_tools.core_traits} />
              <SkillCluster title="Certifications" values={profile.skills_and_tools.certifications} />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell relative z-10 py-24" id="projects">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.36em] text-[var(--gold)]">projects</p>
          <h2 className="font-display mt-3 text-5xl tracking-[-0.04em] md:text-7xl">Systems with teeth.</h2>
        </Reveal>
        <div className="mt-12 grid gap-5">
          {profile.projects.map((project, index) => (
            <Reveal delay={index * 0.05} key={project.name}>
              <article 
                className={`glass group relative grid gap-6 rounded-[2rem] p-6 transition-all duration-500 md:grid-cols-[0.22fr_1fr_0.22fr] md:items-center ${
                  project.highlighted 
                    ? "border-[rgba(215,181,109,0.38)] shadow-[0_0_30px_rgba(215,181,109,0.12)] hover:border-[var(--gold)] hover:shadow-[0_0_40px_rgba(215,181,109,0.22)] bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-[rgba(215,181,109,0.04)]" 
                    : "hover:border-[rgba(215,181,109,0.48)]"
                }`}
                data-tilt-card
              >
                {/* Golden corner glow for highlighted cards */}
                {project.highlighted && (
                  <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-[var(--gold)]/8 blur-2xl pointer-events-none rounded-full" />
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

                <span className="font-display text-5xl text-white/18 transition group-hover:text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold transition group-hover:text-[var(--cream)]">{project.name}</h3>
                    {project.status ? (
                      <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.24em] font-semibold flex items-center gap-1.5 ${
                        project.highlighted 
                          ? "border border-[var(--gold)]/50 bg-[rgba(215,181,109,0.12)] text-[var(--gold)] shadow-[0_0_12px_rgba(215,181,109,0.18)]" 
                          : "border border-[rgba(215,181,109,0.24)] text-[var(--gold)]"
                      }`}>
                        {project.highlighted && <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse shadow-[0_0_6px_var(--gold)]" />}
                        {project.status}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 max-w-3xl leading-7 text-white/62 transition group-hover:text-white/80">{project.description}</p>
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
                    <span className="text-sm uppercase tracking-[0.22em] text-white/28">private</span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative z-10 min-h-screen overflow-hidden py-24" data-gallery-section id="gallery">
        <div className="section-shell mb-12">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.36em] text-[var(--gold)]">gallery</p>
            <h2 className="font-display mt-3 max-w-3xl text-5xl tracking-[-0.04em] md:text-7xl">MEMORIES</h2>
          </Reveal>
        </div>
        <div className="flex w-max gap-5 pl-[max(16px,calc((100vw-1180px)/2))] pr-8 will-change-transform" data-gallery-track>
          {gallery.map((item, index) => (
            <Reveal className="w-[78vw] shrink-0 sm:w-[360px] lg:w-[420px]" delay={index * 0.05} key={item.src}>
              <div className="glass group relative aspect-[3/4] overflow-hidden rounded-[2rem]">
                <Image alt={item.alt} className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width: 640px) 78vw, 420px" src={item.src} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/45 to-transparent p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{item.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell relative z-10 pb-28 pt-16" id="contact">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2.75rem] p-8 md:p-16">
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[var(--gold)]/40 via-transparent to-transparent" />
            <div className="absolute left-0 top-0 h-4 w-4 border-l border-t border-[var(--gold)]/40" />
            <div className="absolute right-0 top-0 h-4 w-4 border-r border-t border-white/10" />

            <div className="flex flex-col gap-12">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold)]">connect</p>
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
    <div className="relative pl-6">
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[var(--gold)]/40 via-transparent to-transparent" />
      <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-[var(--gold)]/40" />
      
      <h3 className="mb-5 text-[10px] uppercase tracking-[0.32em] text-[var(--gold)]">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium tracking-wide text-white/60 transition-colors hover:border-[var(--gold)]/30 hover:text-[var(--gold)]" key={value}>
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
