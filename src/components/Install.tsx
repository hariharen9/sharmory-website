import { useState } from "react";
import { REPO, SHIPPED } from "@/lib/armoury";
import { Reveal, SectionHead, Counter, MaskLine } from "./primitives";

const STEPS = [
  {
    n: "01",
    title: "PIPE IT IN",
    body: "One curl (or irm) writes the file and wires your rc / $PROFILE. Nothing else on your system is touched.",
  },
  {
    n: "02",
    title: "SOURCE ONCE",
    body: "A single source. Zero plugin managers, zero lazy-loading hacks, and no measurable startup delay.",
  },
  {
    n: "03",
    title: "STAY CURRENT",
    body: "Run sharmory-update anytime to pull the latest arsenal in place across both shells.",
  },
  {
    n: "04",
    title: "TRUST IT",
    body: "100% sandboxed test suite mocks docker, kubectl, curl and DNS — zero side effects on your host machine.",
  },
];

const SNIPPETS = [
  {
    id: "zsh",
    sigil: "⌘",
    badge: "RECOMMENDED · ZERO-DEP",
    os: "macOS / Linux / WSL",
    shell: "ZSH",
    prompt: "$",
    cmd: "curl -fsSL https://raw.githubusercontent.com/hariharen9/sharmory/main/install.sh | bash",
    note: "Writes ~/.sharmory/functions.zsh and safely wires your .zshrc",
  },
  {
    id: "pwsh",
    sigil: "⊞",
    badge: "RECOMMENDED · ZERO-DEP",
    os: "Windows 10 / 11 / Server",
    shell: "POWERSHELL 5.1+ / 7+",
    prompt: "PS>",
    cmd: "irm https://raw.githubusercontent.com/hariharen9/sharmory/main/install.ps1 | iex",
    note: "Writes ~/.sharmory/functions.ps1 and wires your $PROFILE",
  },
];

const ACTIVE_MANAGERS = [
  {
    id: "brew",
    name: "Homebrew",
    platform: "macOS / Linux",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#FBB829]">
        <path d="M19 6h-1V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-1h1a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3zm-3 12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4h12v14zm4-3a1 1 0 0 1-1 1h-1V8h1a1 1 0 0 1 1 1v6z" />
        <path d="M6 7h8v2H6zm0 3h8v2H6zm0 3h6v2H6z" opacity="0.6" />
      </svg>
    ),
    cmd: "brew install hariharen9/tap/sharmory",
    status: "LIVE (SHA MATCH)",
    link: "https://github.com/hariharen9/homebrew-tap",
    linkText: "hariharen9/tap",
  },
  {
    id: "scoop",
    name: "Scoop",
    platform: "Windows",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#43B883]">
        <path d="M4 19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a6 6 0 0 0-6-6h-4a6 6 0 0 0-6 6v10z" fill="currentColor" fillOpacity="0.25" />
        <path d="M9 3v4" />
        <path d="M15 3v4" />
        <path d="M4 11h16" />
      </svg>
    ),
    cmd: "scoop bucket add hariharen9 https://github.com/hariharen9/scoop-bucket; scoop install sharmory",
    status: "LIVE (JSON VALID)",
    link: "https://github.com/hariharen9/scoop-bucket",
    linkText: "hariharen9/scoop-bucket",
  },
  {
    id: "npm",
    name: "npm",
    platform: "Node.js / Global",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#CB3837]">
        <path d="M1.5 1.5v21h21V1.5H1.5zm16.5 16.5h-3v-9h-3v9H4.5V6h13.5v12z" />
      </svg>
    ),
    cmd: "npm i -g sharmory",
    status: "LIVE v0.1.0",
    link: "https://www.npmjs.com/package/sharmory",
    linkText: "npmjs.com/package/sharmory",
  },
  {
    id: "pypi",
    name: "PyPI / pip",
    platform: "Python / Global",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#3776AB]">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" fillOpacity="0.2" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    cmd: "pip install sharmory",
    status: "LIVE v0.1.0",
    link: "https://pypi.org/project/sharmory/",
    linkText: "pypi.org/project/sharmory",
  },
];

const PLANNED_MANAGERS = [
  { name: "WinGet", cmd: "winget install sharmory", status: "PLANNED" },
  { name: "Cargo", cmd: "cargo install sharmory", status: "PLANNED" },
];

function CopyRow({
  sigil,
  badge,
  os,
  shell,
  prompt,
  cmd,
  note,
}: {
  sigil: string;
  badge: string;
  os: string;
  shell: string;
  prompt: string;
  cmd: string;
  note: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      onClick={() => {
        void navigator.clipboard?.writeText(cmd);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }}
      className="group relative cursor-pointer border-2 border-signal/40 bg-card/75 p-0 transition-all duration-300 hover:border-signal hover:bg-card/95 hover:shadow-[0_0_35px_color-mix(in_oklab,var(--color-signal)_14%,transparent)]"
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline/80 bg-card/60 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm">
          <span className="grid h-6 w-6 place-items-center bg-signal/15 text-sm font-bold text-signal border border-signal/30">
            {sigil}
          </span>
          <span className="font-bold text-foreground tracking-wide">{os}</span>
          <span className="font-mono text-[10.5px] text-signal font-semibold px-2 py-0.5 border border-signal/30 bg-signal/10">
            [{shell}]
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline font-mono text-[9.5px] font-semibold text-phosphor tracking-wider">
            {badge}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              void navigator.clipboard?.writeText(cmd);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1800);
            }}
            className="flex items-center gap-1.5 bg-signal px-3.5 py-1.5 font-mono text-[11px] font-bold tracking-[0.16em] text-primary-foreground uppercase shadow-sm transition-all hover:opacity-90 active:scale-95"
          >
            {copied ? (
              <>
                <span>✓</span>
                <span>COPIED</span>
              </>
            ) : (
              <>
                <span>⎘</span>
                <span>COPY COMMAND</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Display Box */}
      <div className="overflow-x-auto p-4 sm:p-5 bg-background/50">
        <code className="block font-mono text-xs leading-relaxed whitespace-pre font-semibold text-foreground sm:text-[13.5px]">
          <span className="mr-2.5 font-bold text-signal select-none">{prompt}</span>
          <span className="selection:bg-signal selection:text-primary-foreground">{cmd}</span>
        </code>
      </div>

      {/* Micro Info Footer */}
      <div className="flex items-center justify-between border-t border-hairline/60 px-4 py-2 text-[10px] text-muted-foreground font-mono bg-card/30">
        <span className="truncate">{note}</span>
        <span className="text-signal/80 hidden sm:inline shrink-0 uppercase tracking-widest text-[9px]">
          CLICK CARD TO COPY
        </span>
      </div>
    </div>
  );
}

function ManagerCard({
  name,
  platform,
  icon,
  cmd,
  status,
  link,
  linkText,
}: {
  name: string;
  platform: string;
  icon: React.ReactNode;
  cmd: string;
  status: string;
  link: string;
  linkText: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      onClick={() => {
        void navigator.clipboard?.writeText(cmd);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
      className="group cursor-pointer border border-hairline bg-card/40 p-3.5 transition-all hover:border-signal hover:bg-card/75 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between font-mono text-[11px]">
        <div className="flex items-center gap-2 font-bold text-foreground">
          <span className="shrink-0">{icon}</span>
          <span>{name}</span>
          <span className="text-[9.5px] text-muted-foreground/70 font-normal">({platform})</span>
        </div>
        <span className="border border-phosphor/50 bg-phosphor/10 px-1.5 py-0.5 font-mono text-[8.5px] font-bold text-phosphor">
          {copied ? "✓ COPIED" : status}
        </span>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2 overflow-hidden bg-background/40 p-2 border border-hairline/60">
        <code className="font-mono text-xs text-foreground/90 group-hover:text-signal truncate font-semibold">
          <span className="text-signal mr-1.5">$</span>
          {cmd}
        </code>
        <span className="font-mono text-[9.5px] text-muted-foreground/60 group-hover:text-signal uppercase shrink-0 font-bold">
          {copied ? "COPIED" : "COPY"}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between text-[9.5px] font-mono text-muted-foreground/70 pt-1">
        <span>CHANNEL VERIFIED</span>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-signal hover:underline flex items-center gap-1"
        >
          <span>{linkText}</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  );
}

export function Install() {
  return (
    <section id="install" className="relative border-b border-hairline bg-background">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead index="07" title="ARM YOUR SHELL" note="≈ 8 seconds setup" />

        <div className="pt-12">
          <h3 className="display text-[clamp(2rem,5vw,3.75rem)]">
            <MaskLine>ONE LINE.</MaskLine>
            <MaskLine delay={0.06}>
              <span className="text-signal">TWO WORLDS.</span>
            </MaskLine>
          </h3>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground">
              Your OS doesn&apos;t matter. Same philosophy, same commands, native implementations
              where it matters. Source it once and get back to building.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-12 pt-10 lg:grid-cols-12 lg:gap-16">
          {/* Left: Install Command Snippets + Package Managers */}
          <div className="min-w-0 lg:col-span-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-signal uppercase">
                <span className="flex items-center gap-2">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-signal" />
                  PRIMARY INSTALLATION (FASTEST · ZERO-DEP)
                </span>
                <span className="hidden sm:inline text-muted-foreground/70">≈ 1 SEC SETUP</span>
              </div>

              {SNIPPETS.map((s) => (
                <Reveal key={s.id}>
                  <CopyRow
                    sigil={s.sigil}
                    badge={s.badge}
                    os={s.os}
                    shell={s.shell}
                    prompt={s.prompt}
                    cmd={s.cmd}
                    note={s.note}
                  />
                </Reveal>
              ))}

              {/* Maintenance Utility Links */}
              <Reveal delay={0.1}>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                  <span>UPDATE → sharmory-update</span>
                  <span>UNINSTALL → uninstall.sh / .ps1</span>
                  <a
                    href={REPO}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-signal"
                  >
                    MANUAL SETUP ↗
                  </a>
                </div>
              </Reveal>

              {/* Live Package Managers & Ecosystem */}
              <Reveal delay={0.18}>
                <div className="mt-8 border border-hairline bg-card/30 p-5 font-mono">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
                    <div className="flex items-center gap-2">
                      <span className="label text-signal">PACKAGE MANAGERS</span>
                      <span className="text-[10px] text-muted-foreground">
                        / NATIVE DISTRIBUTION
                      </span>
                    </div>
                    <span className="border border-phosphor/40 bg-phosphor/10 px-2 py-0.5 text-[9px] tracking-widest text-phosphor uppercase font-semibold">
                      4 CHANNELS LIVE
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Install globally via your favorite package manager or language runtime. Click any command to copy:
                  </p>

                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {ACTIVE_MANAGERS.map((m) => (
                      <ManagerCard
                        key={m.name}
                        name={m.name}
                        platform={m.platform}
                        icon={m.icon}
                        cmd={m.cmd}
                        status={m.status}
                        link={m.link}
                        linkText={m.linkText}
                      />
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-hairline/60 flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-muted-foreground">
                    <span className="text-[10px] tracking-wider uppercase">COMING SOON:</span>
                    <div className="flex items-center gap-4">
                      {PLANNED_MANAGERS.map((p) => (
                        <span key={p.name} className="flex items-center gap-1.5 font-mono text-[10px]">
                          <span className="text-muted-foreground/60">{p.name}</span>
                          <span className="border border-hairline px-1 py-0.2 text-[8.5px] text-muted-foreground/80">
                            {p.status}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right: 4-Step Lifecycle */}
          <div className="lg:col-span-5">
            <ol className="border-t border-hairline">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.05}>
                  <li className="group flex gap-5 border-b border-hairline py-5">
                    <span className="display text-2xl text-hairline transition-colors group-hover:text-signal">
                      {s.n}
                    </span>
                    <div>
                      <h4 className="font-mono text-xs font-semibold tracking-[0.22em] text-foreground">
                        {s.title}
                      </h4>
                      <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
                        {s.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        {/* proof metrics strip */}
        <div className="mt-20 grid border-y border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: SHIPPED, s: "", k: "FUNCTIONS SHIPPED" },
            { v: 100, s: "%", k: "SANDBOXED TEST COVERAGE" },
            { v: 2, s: "", k: "SHELLS, ONE API" },
            { v: 0, s: "", k: "RUNTIME DEPENDENCIES" },
          ].map((m, i) => (
            <div
              key={m.k}
              className={`px-4 py-10 ${i > 0 ? "border-t border-hairline sm:border-t-0 sm:border-l" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <div className="display text-[clamp(2.5rem,6vw,4.5rem)] text-signal">
                <Counter to={m.v} suffix={m.s} />
              </div>
              <div className="label mt-2">{m.k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
