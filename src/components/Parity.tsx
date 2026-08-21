import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Reveal, SectionHead, MaskLine } from "./primitives";
import { SiApple, SiLinux, SiGnubash } from "react-icons/si";
import { FaWindows } from "react-icons/fa6";
import { VscTerminalPowershell } from "react-icons/vsc";
import { FiLayers, FiCheckCircle, FiZap } from "react-icons/fi";

interface ParityScenario {
  id: string;
  label: string;
  tag: string;
  zsh: {
    prompt: string;
    cmd: string;
    output: { text: string; kind: "cmd" | "out" | "ok" | "warn" }[];
  };
  bash: {
    prompt: string;
    cmd: string;
    output: { text: string; kind: "cmd" | "out" | "ok" | "warn" }[];
  };
  pwsh: {
    prompt: string;
    cmd: string;
    output: { text: string; kind: "cmd" | "out" | "ok" | "warn" }[];
  };
}

const SCENARIOS: ParityScenario[] = [
  {
    id: "killport",
    label: "PORT SQUATTER",
    tag: "TRIAGE",
    zsh: {
      prompt: "~/workspace/api (main)",
      cmd: "killport 3000",
      output: [
        { text: "🔄 Found process (PID: 41288) using port 3000.", kind: "out" },
        { text: "⏳ Terminating...", kind: "out" },
        { text: "✅ Port 3000 is now free.", kind: "ok" },
      ],
    },
    bash: {
      prompt: "~/workspace/api (main)",
      cmd: "killport 3000",
      output: [
        { text: "🔄 Found process (PID: 41289) using port 3000.", kind: "out" },
        { text: "⏳ Sending SIGTERM...", kind: "out" },
        { text: "✅ Port 3000 is now free.", kind: "ok" },
      ],
    },
    pwsh: {
      prompt: "C:\\Workspace\\api [main]",
      cmd: "killport 3000",
      output: [
        { text: "🔄 Found process (PID: 18924) using port 3000.", kind: "out" },
        { text: "⏳ Terminating (Stop-Process)...", kind: "out" },
        { text: "✅ Port 3000 is now free.", kind: "ok" },
      ],
    },
  },
  {
    id: "gacp",
    label: "SAFE SHIP",
    tag: "GIT",
    zsh: {
      prompt: "~/workspace/sharmory (feat/parity)",
      cmd: "gacp 'feat: add bash parity'",
      output: [
        { text: "staged: 4 modified files, 1 untracked", kind: "out" },
        { text: "[feat/parity c82d910] feat: add bash parity", kind: "ok" },
        { text: "✓ pushed → origin/feat/parity (0 conflicts)", kind: "ok" },
      ],
    },
    bash: {
      prompt: "~/workspace/sharmory (feat/parity)",
      cmd: "gacp 'feat: add bash parity'",
      output: [
        { text: "staged: 4 modified files, 1 untracked", kind: "out" },
        { text: "[feat/parity c82d910] feat: add bash parity", kind: "ok" },
        { text: "✓ pushed → origin/feat/parity (0 conflicts)", kind: "ok" },
      ],
    },
    pwsh: {
      prompt: "C:\\Workspace\\sharmory [feat/parity]",
      cmd: "gacp 'feat: add bash parity'",
      output: [
        { text: "staged: 4 modified files, 1 untracked", kind: "out" },
        { text: "[feat/parity c82d910] feat: add bash parity", kind: "ok" },
        { text: "✓ pushed → origin/feat/parity (0 conflicts)", kind: "ok" },
      ],
    },
  },
  {
    id: "certcheck",
    label: "TLS AUDIT",
    tag: "SECURITY",
    zsh: {
      prompt: "~/workspace/infra",
      cmd: "certcheck sharmory.dev",
      output: [
        { text: "Expires: Nov 02 14:22:10 2026 GMT", kind: "out" },
        { text: "Issuer: Let's Encrypt Authority X3", kind: "out" },
        { text: "✓ Days remaining: 76 days (HEALTHY)", kind: "ok" },
      ],
    },
    bash: {
      prompt: "~/workspace/infra",
      cmd: "certcheck sharmory.dev",
      output: [
        { text: "Expires: Nov 02 14:22:10 2026 GMT", kind: "out" },
        { text: "Issuer: Let's Encrypt Authority X3", kind: "out" },
        { text: "✓ Days remaining: 76 days (HEALTHY)", kind: "ok" },
      ],
    },
    pwsh: {
      prompt: "C:\\Workspace\\infra",
      cmd: "certcheck sharmory.dev",
      output: [
        { text: "Expires: Nov 02 14:22:10 2026 GMT", kind: "out" },
        { text: "Issuer: Let's Encrypt Authority X3", kind: "out" },
        { text: "✓ Days remaining: 76 days (HEALTHY)", kind: "ok" },
      ],
    },
  },
  {
    id: "branchclean",
    label: "BRANCH ROT",
    tag: "GIT CLEANUP",
    zsh: {
      prompt: "~/workspace/repo (main)",
      cmd: "branchclean",
      output: [
        { text: "Evaluating merged branches against origin/main...", kind: "out" },
        { text: "  - fix/auth-token (merged)", kind: "warn" },
        { text: "  - chore/deps-upgrade (merged)", kind: "warn" },
        { text: "✓ Deleted 8 stale local branches", kind: "ok" },
      ],
    },
    bash: {
      prompt: "~/workspace/repo (main)",
      cmd: "branchclean",
      output: [
        { text: "Evaluating merged branches against origin/main...", kind: "out" },
        { text: "  - fix/auth-token (merged)", kind: "warn" },
        { text: "  - chore/deps-upgrade (merged)", kind: "warn" },
        { text: "✓ Deleted 8 stale local branches", kind: "ok" },
      ],
    },
    pwsh: {
      prompt: "C:\\Workspace\\repo [main]",
      cmd: "branchclean",
      output: [
        { text: "Evaluating merged branches against origin/main...", kind: "out" },
        { text: "  - fix/auth-token (merged)", kind: "warn" },
        { text: "  - chore/deps-upgrade (merged)", kind: "warn" },
        { text: "✓ Deleted 8 stale local branches", kind: "ok" },
      ],
    },
  },
  {
    id: "dockernuke",
    label: "DOCKER TRIAGE",
    tag: "CONTAINERS",
    zsh: {
      prompt: "~/workspace/services",
      cmd: "dockernuke api-gateway",
      output: [
        { text: "Stopping container 'api-gateway'...", kind: "out" },
        { text: "Removing container + orphan mounts...", kind: "out" },
        { text: "✓ Removed container api-gateway (PID freed)", kind: "ok" },
      ],
    },
    bash: {
      prompt: "~/workspace/services",
      cmd: "dockernuke api-gateway",
      output: [
        { text: "Stopping container 'api-gateway'...", kind: "out" },
        { text: "Removing container + orphan mounts...", kind: "out" },
        { text: "✓ Removed container api-gateway (PID freed)", kind: "ok" },
      ],
    },
    pwsh: {
      prompt: "C:\\Workspace\\services",
      cmd: "dockernuke api-gateway",
      output: [
        { text: "Stopping container 'api-gateway'...", kind: "out" },
        { text: "Removing container + orphan mounts...", kind: "out" },
        { text: "✓ Removed container api-gateway (PID freed)", kind: "ok" },
      ],
    },
  },
];

export function Parity() {
  const [activeScenario, setActiveScenario] = useState<string>("killport");
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const reduced = useReducedMotion();

  // Auto-cycle through scenarios every 6 seconds unless user manually interacts
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveScenario((current) => {
        const idx = SCENARIOS.findIndex((s) => s.id === current);
        return SCENARIOS[(idx + 1) % SCENARIOS.length]!.id;
      });
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = SCENARIOS.find((s) => s.id === activeScenario) ?? SCENARIOS[0]!;

  return (
    <section id="parity" className="relative border-b border-hairline bg-background">
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 sm:py-28">
        <SectionHead
          index="03"
          title="TRIPLE-SHELL PARITY"
          note="windows 11 + macos + linux"
        />

        {/* Section Header Narrative */}
        <div className="grid gap-8 pt-12 lg:grid-cols-12 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <div className="mb-3 inline-flex items-center gap-2 border border-signal/40 bg-signal/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-signal uppercase">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-signal" />
              THE CROSS-PLATFORM MOAT
            </div>

            <h3 className="display text-[clamp(2.1rem,5.5vw,4.2rem)] leading-[0.94]">
              <MaskLine>95% OF SHELL TOOLS</MaskLine>
              <MaskLine delay={0.06}>
                <span>BREAK ON </span>
                <span className="text-signal">WINDOWS.</span>
              </MaskLine>
              <MaskLine delay={0.12}>
                <span className="text-muted-foreground">SHARMORY DOESN&apos;T.</span>
              </MaskLine>
            </h3>
          </div>

          <div className="lg:col-span-4 font-mono text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              Most developer dotfiles and shell libraries abandon Windows or force you into a slow,
              isolated WSL container.
            </p>
            <p className="mt-3">
              Sharmory delivers <strong className="text-foreground font-semibold">100% muscle-memory parity</strong> across{" "}
              <strong className="text-signal">all three shells</strong>. The exact same commands, flags,
              and ergonomics work natively on macOS/Linux (Zsh), Linux/CI servers (Bash), and Windows
              11 workstations (PowerShell) — no rewrites, no context switching.
            </p>
          </div>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {SCENARIOS.map((scenario) => {
              const isSelected = scenario.id === activeScenario;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveScenario(scenario.id);
                  }}
                  className={`flex items-center gap-2 border px-3 py-2 font-mono text-[11px] tracking-wider transition-all ${
                    isSelected
                      ? "border-signal bg-signal text-primary-foreground font-bold shadow-sm"
                      : "border-hairline bg-card/40 text-muted-foreground hover:border-signal hover:text-foreground"
                  }`}
                >
                  <span className="opacity-70">[{scenario.tag}]</span>
                  <span>{scenario.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsAutoPlaying((v) => !v)}
            className="font-mono text-[10px] tracking-widest text-muted-foreground hover:text-signal transition-colors uppercase flex items-center gap-1.5"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isAutoPlaying ? "bg-phosphor live-dot" : "bg-muted-foreground"}`} />
            {isAutoPlaying ? "AUTOPLAY: ON" : "AUTOPLAY: PAUSED"}
          </button>
        </div>

        {/* Three-Terminal Showdown: ZSH · BASH · PWSH */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* macOS / Linux Zsh Frame */}
          <div className="flex flex-col border border-hairline bg-card/80 shadow-2xl backdrop-blur-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-hairline bg-card px-4 py-2.5 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56]/80 border border-[#E0443E]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]/80 border border-[#DEA123]" />
                <span className="h-3 w-3 rounded-full bg-[#27C93F]/80 border border-[#1AAB29]" />
                <span className="ml-2 font-semibold text-foreground/90 flex items-center gap-1.5">
                  <SiApple className="text-signal text-xs" />
                  <span>macOS / Linux · zsh</span>
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground/70">~/.sharmory/functions.zsh</span>
            </div>
            <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed flex-1 flex flex-col justify-between min-h-[210px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  {...(reduced ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.2 } })}
                  className="space-y-2.5"
                >
                  <div className="text-muted-foreground/80 text-[11px]">{current.zsh.prompt}</div>
                  <div className="flex items-center gap-2 font-bold text-foreground">
                    <span className="text-signal font-bold">$</span>
                    <span className="text-foreground">{current.zsh.cmd}</span>
                    <span className="caret ml-1 inline-block" />
                  </div>
                  <div className="mt-3 space-y-1.5 pt-2 border-t border-hairline/40">
                    {current.zsh.output.map((line, idx) => (
                      <div key={idx} className={line.kind === "ok" ? "text-phosphor font-medium" : line.kind === "warn" ? "text-signal" : "text-muted-foreground"}>
                        {line.text}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex items-center justify-between border-t border-hairline/60 pt-3 text-[10px] text-muted-foreground uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-phosphor" />
                  POSIX / ZSH NATIVE
                </span>
                <span>EXECUTION: &lt;2ms</span>
              </div>
            </div>
          </div>

          {/* Linux / CI Bash Frame */}
          <div className="flex flex-col border border-signal/30 bg-card/80 shadow-2xl backdrop-blur-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-signal/30 bg-signal/5 px-4 py-2.5 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56]/80 border border-[#E0443E]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]/80 border border-[#DEA123]" />
                <span className="h-3 w-3 rounded-full bg-[#27C93F]/80 border border-[#1AAB29]" />
                <span className="ml-2 font-semibold text-signal flex items-center gap-1.5">
                  <SiGnubash className="text-xs" />
                  <span>Linux / CI · bash 4.0+</span>
                </span>
              </div>
              <span className="text-[10px] text-signal/60">~/.sharmory/functions.bash</span>
            </div>
            <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed flex-1 flex flex-col justify-between min-h-[210px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  {...(reduced ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.2 } })}
                  className="space-y-2.5"
                >
                  <div className="text-muted-foreground/80 text-[11px]">{current.bash.prompt}</div>
                  <div className="flex items-center gap-2 font-bold text-foreground">
                    <span className="text-signal font-bold">$</span>
                    <span className="text-foreground">{current.bash.cmd}</span>
                    <span className="caret ml-1 inline-block" />
                  </div>
                  <div className="mt-3 space-y-1.5 pt-2 border-t border-hairline/40">
                    {current.bash.output.map((line, idx) => (
                      <div key={idx} className={line.kind === "ok" ? "text-phosphor font-medium" : line.kind === "warn" ? "text-signal" : "text-muted-foreground"}>
                        {line.text}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex items-center justify-between border-t border-signal/30 pt-3 text-[10px] text-signal/80 uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal live-dot" />
                  BASH 4.0+ / POSIX NATIVE
                </span>
                <span>EXECUTION: &lt;2ms</span>
              </div>
            </div>
          </div>

          {/* Windows 11 PowerShell Frame */}
          <div className="flex flex-col border border-hairline bg-card/80 shadow-2xl backdrop-blur-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-hairline bg-card px-4 py-2.5 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <FaWindows className="text-signal text-xs" />
                <span className="font-semibold text-foreground/90 flex items-center gap-1.5">
                  Windows 11 · PowerShell 7.4+ / 5.1
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground/70 text-xs">
                <span>—</span>
                <span>□</span>
                <span>✕</span>
              </div>
            </div>
            <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed flex-1 flex flex-col justify-between min-h-[210px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  {...(reduced ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.2 } })}
                  className="space-y-2.5"
                >
                  <div className="text-muted-foreground/80 text-[11px]">{current.pwsh.prompt}</div>
                  <div className="flex items-center gap-2 font-bold text-foreground">
                    <span className="text-signal font-bold">PS&gt;</span>
                    <span className="text-foreground">{current.pwsh.cmd}</span>
                    <span className="caret ml-1 inline-block" />
                  </div>
                  <div className="mt-3 space-y-1.5 pt-2 border-t border-hairline/40">
                    {current.pwsh.output.map((line, idx) => (
                      <div key={idx} className={line.kind === "ok" ? "text-phosphor font-medium" : line.kind === "warn" ? "text-signal" : "text-muted-foreground"}>
                        {line.text}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex items-center justify-between border-t border-hairline/60 pt-3 text-[10px] text-muted-foreground uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-phosphor" />
                  NATIVE POWERSHELL / ZERO WSL
                </span>
                <span>EXECUTION: &lt;2ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Cross-Platform Superiority */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0.05}>
            <div className="border border-hairline bg-card/30 p-5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="display text-3xl sm:text-4xl text-signal">100%</div>
                  <FiLayers className="text-lg text-signal/70" />
                </div>
                <div className="font-mono text-xs font-bold uppercase mt-2 text-foreground">
                  Identical Muscle Memory
                </div>
                <p className="mt-2 font-mono text-xs text-muted-foreground leading-relaxed">
                  Switching between your work MacBook and home Windows PC? You never have to switch CLI syntaxes or alias names again.
                </p>
              </div>
              <div className="mt-4 font-mono text-[9.5px] text-signal uppercase tracking-wider">
                NO CONTEXT SWITCHING
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-hairline bg-card/30 p-5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="display text-3xl sm:text-4xl text-signal">0 WSL</div>
                  <FaWindows className="text-lg text-signal/70" />
                </div>
                <div className="font-mono text-xs font-bold uppercase mt-2 text-foreground">
                  Native Windows Speed
                </div>
                <p className="mt-2 font-mono text-xs text-muted-foreground leading-relaxed">
                  Runs directly in Windows Terminal, Command Prompt, or VS Code PowerShell without spinning up a heavy VM or Linux subsystem.
                </p>
              </div>
              <div className="mt-4 font-mono text-[9.5px] text-signal uppercase tracking-wider">
                PURE POWERSHELL ENGINE
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="border border-hairline bg-card/30 p-5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="display text-3xl sm:text-4xl text-signal">142/142</div>
                  <FiCheckCircle className="text-lg text-signal/70" />
                </div>
                <div className="font-mono text-xs font-bold uppercase mt-2 text-foreground">
                  Full Feature Parity
                </div>
                <p className="mt-2 font-mono text-xs text-muted-foreground leading-relaxed">
                  Every single function has been ported to all three shells with matching error handling, flags, and exit codes.
                </p>
              </div>
              <div className="mt-4 font-mono text-[9.5px] text-signal uppercase tracking-wider">
                CI-VALIDATED · 3 SHELLS
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="border border-hairline bg-card/30 p-5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="display text-3xl sm:text-4xl text-signal">0ms</div>
                  <FiZap className="text-lg text-signal/70" />
                </div>
                <div className="font-mono text-xs font-bold uppercase mt-2 text-foreground">
                  Startup Tax
                </div>
                <p className="mt-2 font-mono text-xs text-muted-foreground leading-relaxed">
                  Zero external plugin frameworks, zero node/python wrappers on boot, zero bloated subshells slowing down your terminal open time.
                </p>
              </div>
              <div className="mt-4 font-mono text-[9.5px] text-signal uppercase tracking-wider">
                INSTANT PROMPT READY
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
