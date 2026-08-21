import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { REPO, SHIPPED } from "@/lib/armoury";
import { Reveal, SectionHead, Counter } from "./primitives";
import {
  SiHomebrew,
  SiNpm,
  SiPypi,
  SiApple,
  SiLinux,
  SiGnubash,
} from "react-icons/si";
import { FaWindows } from "react-icons/fa6";
import { VscTerminalPowershell } from "react-icons/vsc";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const UNIX_CMD =
  "curl -fsSL https://raw.githubusercontent.com/hariharen9/sharmory/main/install.sh | bash";
const WIN_CMD =
  "irm https://raw.githubusercontent.com/hariharen9/sharmory/main/install.ps1 | iex";

const DETECTION_STEPS = [
  { label: "install.sh runs", note: "single curl pipe" },
  { label: "detects $SHELL", note: "zsh / bash / sh" },
  { label: "writes functions file", note: "~/.sharmory/" },
  { label: "wires rc file", note: ".zshrc or .bashrc" },
  { label: "done", note: "< 5 seconds" },
];

const UNIX_TERMINAL_LINES = [
  { kind: "cmd", text: UNIX_CMD },
  { kind: "out", text: "  → Downloading sharmory v2.1.0..." },
  { kind: "out", text: "  → Detected shell: zsh (5.9)" },
  { kind: "ok",  text: "  ✓ Wrote ~/.sharmory/functions.zsh" },
  { kind: "ok",  text: "  ✓ Sourced in ~/.zshrc" },
  { kind: "ok",  text: "  ✓ 142 functions armed. Restart or: source ~/.zshrc" },
];

const WIN_TERMINAL_LINES = [
  { kind: "cmd", text: WIN_CMD },
  { kind: "out", text: "  → Downloading sharmory v2.1.0..." },
  { kind: "ok",  text: "  ✓ Wrote C:\\Users\\You\\.sharmory\\functions.ps1" },
  { kind: "ok",  text: "  ✓ Sourced in $PROFILE" },
  { kind: "ok",  text: "  ✓ 142 functions armed. Restart or: . $PROFILE" },
];

const LIFECYCLE = [
  { n: "01", title: "PIPE IT IN",   body: "One curl (or irm). The script detects your shell, writes the functions file, and wires your rc automatically." },
  { n: "02", title: "SOURCE ONCE", body: "No plugin managers, no lazy-loading hacks, no measurable startup delay. Pure shell functions." },
  { n: "03", title: "STAY CURRENT", body: "Run sharmory-update to pull the latest arsenal in-place. No re-install, no PATH changes." },
  { n: "04", title: "TRUST IT",    body: "100% sandboxed tests mock docker, kubectl, curl and DNS — zero side effects on your machine." },
];

const PKG_MANAGERS = [
  {
    id: "brew",
    name: "Homebrew",
    platform: "macOS / Linux",
    cmd: "brew install hariharen9/tap/sharmory",
    status: "LIVE",
    statusColor: "text-phosphor border-phosphor/50 bg-phosphor/10",
    link: "https://github.com/hariharen9/homebrew-tap",
    icon: <SiHomebrew className="h-4 w-4 text-[#FBB829]" />,
  },
  {
    id: "scoop",
    name: "Scoop",
    platform: "Windows",
    cmd: "scoop bucket add hariharen9 https://github.com/hariharen9/scoop-bucket; scoop install sharmory",
    status: "LIVE",
    statusColor: "text-phosphor border-phosphor/50 bg-phosphor/10",
    link: "https://github.com/hariharen9/scoop-bucket",
    icon: <FaWindows className="h-4 w-4 text-[#43B883]" />,
  },
  {
    id: "npm",
    name: "npm",
    platform: "Node.js",
    cmd: "npm i -g sharmory",
    status: "LIVE",
    statusColor: "text-phosphor border-phosphor/50 bg-phosphor/10",
    link: "https://www.npmjs.com/package/sharmory",
    icon: <SiNpm className="h-4 w-4 text-[#CB3837]" />,
  },
  {
    id: "pypi",
    name: "pip",
    platform: "Python",
    cmd: "pip install sharmory",
    status: "LIVE",
    statusColor: "text-phosphor border-phosphor/50 bg-phosphor/10",
    link: "https://pypi.org/project/sharmory/",
    icon: <SiPypi className="h-4 w-4 text-[#3776AB]" />,
  },
  {
    id: "winget",
    name: "WinGet",
    platform: "Windows",
    cmd: "winget install sharmory",
    status: "SOON",
    statusColor: "text-muted-foreground border-hairline bg-card/20",
    link: REPO,
    icon: <FaWindows className="h-4 w-4 text-[#0078D4]" />,
  },
];

/* ─────────────────────────────────────────────
   MINI COMPONENTS
───────────────────────────────────────────── */
function MiniTerminal({
  lines,
  prompt,
  title,
}: {
  lines: { kind: string; text: string }[];
  prompt: string;
  title: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div className="overflow-hidden border border-hairline bg-[#0a0a0a] font-mono text-xs leading-relaxed">
      {/* chrome bar */}
      <div className="flex items-center justify-between border-b border-hairline/60 bg-card/60 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]/80" />
        </div>
        <span className="text-[10px] text-muted-foreground/60 tracking-wider">{title}</span>
        <span className="text-[10px] text-phosphor/60">●</span>
      </div>
      {/* output */}
      <div className="space-y-1.5 p-4">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, x: -4 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: i * 0.18, duration: 0.3 },
                })}
            className={
              line.kind === "cmd"
                ? "flex items-start gap-2"
                : line.kind === "ok"
                ? "text-phosphor"
                : "text-muted-foreground/70"
            }
          >
            {line.kind === "cmd" && (
              <span className="shrink-0 font-bold text-signal select-none">{prompt}</span>
            )}
            <span
              className={
                line.kind === "cmd"
                  ? "text-foreground font-semibold break-all"
                  : undefined
              }
            >
              {line.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CopyButton({ cmd, label = "COPY" }: { cmd: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(cmd);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }}
      className="flex shrink-0 items-center gap-1.5 bg-signal px-4 py-2 font-mono text-[11px] font-bold tracking-[0.16em] text-primary-foreground uppercase transition-all hover:opacity-90 active:scale-95"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            ✓ COPIED
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            ⎘ {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function PkgCard({
  name,
  platform,
  icon,
  cmd,
  status,
  statusColor,
  link,
}: (typeof PKG_MANAGERS)[number]) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      onClick={() => {
        void navigator.clipboard?.writeText(cmd);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
      className="group cursor-pointer border border-hairline bg-card/30 p-4 transition-all hover:border-signal/60 hover:bg-card/60"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-foreground">
          <span className="shrink-0">{icon}</span>
          <span>{name}</span>
          <span className="text-[9.5px] font-normal text-muted-foreground/60">({platform})</span>
        </div>
        <span className={`border px-1.5 py-0.5 font-mono text-[8.5px] font-bold ${statusColor}`}>
          {copied ? "✓ COPIED" : status}
        </span>
      </div>
      <div className="mt-2.5 flex items-center gap-2 overflow-hidden bg-background/40 px-2.5 py-1.5 border border-hairline/40">
        <code className="truncate font-mono text-[11px] text-foreground/80 group-hover:text-signal font-semibold">
          <span className="text-signal mr-1.5 select-none">$</span>
          {cmd}
        </code>
        <span className="ml-auto shrink-0 font-mono text-[9px] text-muted-foreground/50 group-hover:text-signal uppercase font-bold">
          {copied ? "COPIED" : "COPY"}
        </span>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="mt-1.5 flex items-center gap-1 font-mono text-[9.5px] text-signal/70 hover:text-signal hover:underline"
      >
        <span>view registry ↗</span>
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export function Install() {
  const [activeTab, setActiveTab] = useState<"unix" | "win">("unix");

  return (
    <section id="install" className="relative border-b border-hairline bg-background overflow-hidden">

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-signal/5 blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead index="07" title="ARM YOUR SHELL" note="≈ 5 seconds" />

        {/* ── HERO HEADLINE ── */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="mb-3 inline-flex items-center gap-2 border border-signal/30 bg-signal/8 px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] text-signal uppercase">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-signal" />
              ZERO-DEP · SELF-CONTAINED
            </div>
            <h3 className="display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95]">
              <span className="block">ONE CURL.</span>
              <span className="block text-signal">ANY SHELL.</span>
              <span className="block text-muted-foreground/70 text-[0.75em]">ARMED IN 5s.</span>
            </h3>
            <p className="mt-6 font-mono text-sm leading-relaxed text-muted-foreground max-w-sm">
              The installer detects whether you're on Zsh or Bash automatically &mdash; no flags, no questions.
              One command covers macOS, Linux, WSL, and CI. Windows gets its own native PowerShell installer.
            </p>

            {/* Smart detection flow */}
            <Reveal delay={0.1}>
              <div className="mt-8 border border-hairline bg-card/30 p-4">
                <div className="mb-3 font-mono text-[9.5px] tracking-[0.22em] text-signal uppercase">
                  HOW INSTALL.SH DETECTS YOUR SHELL
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {DETECTION_STEPS.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-1.5">
                      <div className="group flex flex-col items-center">
                        <div className="border border-hairline bg-background/60 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-foreground group-hover:border-signal/50 group-hover:text-signal transition-colors">
                          {step.label}
                        </div>
                        <div className="mt-0.5 font-mono text-[8.5px] text-muted-foreground/60">
                          {step.note}
                        </div>
                      </div>
                      {i < DETECTION_STEPS.length - 1 && (
                        <span className="text-signal/40 text-xs font-mono mb-4">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── PLATFORM CARDS ── */}
          <div className="lg:col-span-7 space-y-3">
            {/* Tab selector */}
            <div className="grid grid-cols-2 border border-hairline bg-card/20 p-1 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => setActiveTab("unix")}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 text-center tracking-wider uppercase transition-all ${
                  activeTab === "unix"
                    ? "bg-signal text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <SiApple className="text-xs" />
                <SiLinux className="text-xs" />
                <SiGnubash className="text-xs" />
                <span>macOS · Linux · WSL</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("win")}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 text-center tracking-wider uppercase transition-all ${
                  activeTab === "win"
                    ? "bg-signal text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FaWindows className="text-xs" />
                <VscTerminalPowershell className="text-xs" />
                <span>Windows · PowerShell</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "unix" ? (
                <motion.div
                  key="unix"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {/* Big command display */}
                  <div className="border-2 border-signal/50 bg-card/60 hover:border-signal transition-colors duration-300 hover:shadow-[0_0_40px_color-mix(in_oklab,var(--color-signal)_12%,transparent)]">
                    <div className="flex items-center justify-between border-b border-hairline/60 bg-card/60 px-4 py-2.5">
                      <div className="flex items-center gap-2.5 font-mono text-[10px]">
                        <span className="live-dot h-1.5 w-1.5 rounded-full bg-signal" />
                        <span className="text-signal font-bold tracking-widest uppercase">Unix / POSIX</span>
                        <span className="border border-signal/30 bg-signal/10 px-2 py-0.5 text-signal font-semibold">AUTO-DETECTS ZSH · BASH</span>
                      </div>
                      <span className="font-mono text-[9.5px] text-phosphor tracking-wider">ZERO-DEP</span>
                    </div>
                    <div className="overflow-x-auto p-5 bg-background/40">
                      <code className="block font-mono text-sm leading-relaxed text-foreground font-semibold whitespace-pre sm:text-[13.5px]">
                        <span className="text-signal mr-2 font-bold select-none">$</span>
                        <span className="selection:bg-signal selection:text-primary-foreground">{UNIX_CMD}</span>
                      </code>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline/60 bg-card/30 px-4 py-2.5">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        Writes <code className="text-signal">~/.sharmory/functions.zsh</code> or <code className="text-signal">functions.bash</code> based on your active shell
                      </span>
                      <CopyButton cmd={UNIX_CMD} />
                    </div>
                  </div>

                  {/* Terminal simulation */}
                  <MiniTerminal
                    lines={UNIX_TERMINAL_LINES}
                    prompt="$"
                    title="zsh — install output"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="win"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {/* Big command display */}
                  <div className="border-2 border-signal/50 bg-card/60 hover:border-signal transition-colors duration-300 hover:shadow-[0_0_40px_color-mix(in_oklab,var(--color-signal)_12%,transparent)]">
                    <div className="flex items-center justify-between border-b border-hairline/60 bg-card/60 px-4 py-2.5">
                      <div className="flex items-center gap-2.5 font-mono text-[10px]">
                        <span className="text-signal font-bold text-sm">⊞</span>
                        <span className="text-signal font-bold tracking-widest uppercase">Windows</span>
                        <span className="border border-signal/30 bg-signal/10 px-2 py-0.5 text-signal font-semibold">POWERSHELL 5.1+ / 7+</span>
                      </div>
                      <span className="font-mono text-[9.5px] text-phosphor tracking-wider">NATIVE</span>
                    </div>
                    <div className="overflow-x-auto p-5 bg-background/40">
                      <code className="block font-mono text-sm leading-relaxed text-foreground font-semibold whitespace-pre sm:text-[13.5px]">
                        <span className="text-signal mr-2 font-bold select-none">PS&gt;</span>
                        <span className="selection:bg-signal selection:text-primary-foreground">{WIN_CMD}</span>
                      </code>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline/60 bg-card/30 px-4 py-2.5">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        Writes <code className="text-signal">~/.sharmory/functions.ps1</code> and wires your <code className="text-signal">$PROFILE</code>. No WSL required.
                      </span>
                      <CopyButton cmd={WIN_CMD} />
                    </div>
                  </div>

                  {/* Terminal simulation */}
                  <MiniTerminal
                    lines={WIN_TERMINAL_LINES}
                    prompt="PS>"
                    title="pwsh — install output"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Utility links */}
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-1 font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="text-signal">→</span> update: <code className="text-foreground">sharmory-update</code>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-signal">→</span> uninstall: <code className="text-foreground">uninstall.sh / .ps1</code>
                </span>
                <a
                  href={REPO}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-signal hover:underline"
                >
                  manual setup ↗
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── 4-STEP LIFECYCLE ── */}
        <Reveal delay={0.1}>
          <div className="mt-16 grid border-t border-hairline sm:grid-cols-2 lg:grid-cols-4">
            {LIFECYCLE.map((s, i) => (
              <div
                key={s.n}
                className={`group flex gap-4 py-7 px-5 transition-colors hover:bg-card/40 ${
                  i > 0 ? "border-t border-hairline sm:border-t-0 sm:border-l" : ""
                } ${i === 2 ? "lg:border-l" : ""}`}
              >
                <span className="display text-3xl text-hairline transition-colors group-hover:text-signal leading-none pt-0.5">
                  {s.n}
                </span>
                <div>
                  <div className="font-mono text-[10.5px] font-bold tracking-[0.22em] text-foreground uppercase">
                    {s.title}
                  </div>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── PACKAGE MANAGERS ── */}
        <Reveal delay={0.15}>
          <div className="mt-10 border border-hairline bg-card/20 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-signal uppercase">
                  Package Managers
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">/ native distribution</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="border border-phosphor/40 bg-phosphor/10 px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-phosphor">
                  4 LIVE
                </span>
                <span className="border border-hairline px-2 py-0.5 font-mono text-[9px] text-muted-foreground">
                  1 SOON
                </span>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {PKG_MANAGERS.map((m) => (
                <PkgCard key={m.id} {...m} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── METRICS BAR ── */}
        <div className="mt-12 grid border-y border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: SHIPPED, s: "", k: "FUNCTIONS SHIPPED" },
            { v: 100, s: "%", k: "SANDBOXED TEST COVERAGE" },
            { v: 3, s: "", k: "SHELLS, ONE API" },
            { v: 0, s: "", k: "RUNTIME DEPENDENCIES" },
          ].map((m, i) => (
            <div
              key={m.k}
              className={`px-5 py-10 ${i > 0 ? "border-t border-hairline sm:border-t-0 sm:border-l" : ""} ${
                i === 2 ? "lg:border-l" : ""
              }`}
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
