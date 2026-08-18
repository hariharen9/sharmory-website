import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { REPO, SHIPPED } from "@/lib/armoury";
import { MagneticLink } from "./primitives";
import { TerminalBlock, type Line } from "./Terminal";

type ShellMode = "zsh" | "pwsh";

const ZSH_SCRIPTS: Record<string, { label: string; lines: Line[] }> = {
  boot: {
    label: "boot",
    lines: [
      { kind: "cmd", text: "source ~/.sharmory/functions.zsh" },
      { kind: "ok", text: "  ✓ 98 functions armed  ·  0 plugins  ·  0ms startup tax" },
      { kind: "cmd", text: "killport 3000" },
      { kind: "out", text: "  pid 41288 (node) → SIGTERM → released :3000" },
      { kind: "cmd", text: "gacp 'fix: drop the dead branch'" },
      { kind: "ok", text: "  ✓ staged  ✓ committed (7f91c2a)  ✓ pushed → origin/main" },
    ],
  },
  gacp: {
    label: "gacp",
    lines: [
      { kind: "cmd", text: "gacp 'refactor: simplify container healthcheck'" },
      { kind: "out", text: "  staged: 3 modified files" },
      { kind: "ok", text: "  [main c82d910] refactor: simplify container healthcheck" },
      { kind: "ok", text: "  ✓ pushed to origin/main (verified zero conflicts)" },
    ],
  },
  killport: {
    label: "killport",
    lines: [
      { kind: "cmd", text: "killport 8080" },
      { kind: "out", text: "  identified: PID 67120 (java) listening on 0.0.0.0:8080" },
      { kind: "ok", text: "  ✓ SIGTERM dispatched · port :8080 is now free" },
    ],
  },
  dockernuke: {
    label: "dockernuke",
    lines: [
      { kind: "cmd", text: "dockernuke -a" },
      { kind: "out", text: "  stopping 4 dangling containers..." },
      { kind: "ok", text: "  ✓ purged 4 containers · reclaimed 1.84 GB volume cache" },
    ],
  },
  gitundo: {
    label: "gitundo",
    lines: [
      { kind: "cmd", text: "gitundo" },
      { kind: "out", text: "  HEAD~1 (commit 9e4f21a) undone" },
      { kind: "ok", text: "  ✓ 4 files kept staged in index (ready to re-commit)" },
    ],
  },
  k8sctx: {
    label: "k8sctx",
    lines: [
      { kind: "cmd", text: "k8sctx" },
      { kind: "out", text: "  current: minikube › ns: default" },
      { kind: "ok", text: "  ✓ switched to: prod-eu-central-1 › ns: payments-v2" },
    ],
  },
  certcheck: {
    label: "certcheck",
    lines: [
      { kind: "cmd", text: "certcheck sharmory.dev" },
      { kind: "out", text: "  issuer: Let's Encrypt · SANs: sharmory.dev, *.sharmory.dev" },
      { kind: "ok", text: "  ✓ valid until 2026-11-02 (76 days remaining)" },
    ],
  },
  mkcd: {
    label: "mkcd",
    lines: [
      { kind: "cmd", text: "mkcd src/services/auth/oauth2" },
      { kind: "ok", text: "  ✓ created directory tree: src/services/auth/oauth2" },
      { kind: "out", text: "  ✓ switched working directory -> ~/sharmory/src/services/auth/oauth2" },
    ],
  },
  apihit: {
    label: "apihit",
    lines: [
      { kind: "cmd", text: "apihit https://api.internal/health" },
      { kind: "out", text: '  { "status": "healthy", "uptime_sec": 842910, "v": "1.4.0" }' },
      { kind: "ok", text: "  ✓ 200 OK · DNS 14ms · TLS 38ms · total 112ms" },
    ],
  },
  branchclean: {
    label: "branchclean",
    lines: [
      { kind: "cmd", text: "branchclean" },
      { kind: "out", text: "  evaluating merged branches against origin/main..." },
      { kind: "ok", text: "  ✓ deleted 14 merged local branches · pruned 9 stale remotes" },
    ],
  },
};

const PWSH_SCRIPTS: Record<string, { label: string; lines: Line[] }> = {
  boot: {
    label: "boot",
    lines: [
      { kind: "cmd", text: ". $PROFILE" },
      { kind: "ok", text: "  ✓ 98 Sharmory functions armed (PowerShell 7.4+)" },
      { kind: "cmd", text: "killport 5432" },
      { kind: "out", text: "  PID 12904 (postgres.exe) terminated" },
      { kind: "cmd", text: "k8sctx prod-cluster" },
      { kind: "ok", text: "  ✓ Switched context to 'prod-cluster' (namespace: default)" },
    ],
  },
  gacp: {
    label: "gacp",
    lines: [
      { kind: "cmd", text: "gacp 'docs: add powershell 7.4 quickstart'" },
      { kind: "out", text: "  git add -A; git commit -m 'docs:...'; git push" },
      { kind: "ok", text: "  ✓ Committed & pushed to origin/main successfully" },
    ],
  },
  killport: {
    label: "killport",
    lines: [
      { kind: "cmd", text: "killport 3000" },
      { kind: "out", text: "  Found process on :3000 -> node.exe (PID 8420)" },
      { kind: "ok", text: "  ✓ Stop-Process -Id 8420 -Force -> :3000 released" },
    ],
  },
  dockernuke: {
    label: "dockernuke",
    lines: [
      { kind: "cmd", text: "dockernuke" },
      { kind: "out", text: "  docker stop $(docker ps -aq); docker rm $(docker ps -aq)" },
      { kind: "ok", text: "  ✓ Local containers purged and cleaned" },
    ],
  },
  gitundo: {
    label: "gitundo",
    lines: [
      { kind: "cmd", text: "gitundo" },
      { kind: "out", text: "  git reset --soft HEAD~1" },
      { kind: "ok", text: "  ✓ Last commit rolled back, changes preserved in stage" },
    ],
  },
  k8sctx: {
    label: "k8sctx",
    lines: [
      { kind: "cmd", text: "k8sctx staging-east" },
      { kind: "out", text: "  kubectl config use-context staging-east" },
      { kind: "ok", text: "  ✓ Active context: staging-east" },
    ],
  },
  certcheck: {
    label: "certcheck",
    lines: [
      { kind: "cmd", text: "certcheck api.sharmory.dev" },
      { kind: "out", text: "  Validating TLS handshake on port 443..." },
      { kind: "ok", text: "  ✓ Certificate valid until 2026-11-02" },
    ],
  },
  mkcd: {
    label: "mkcd",
    lines: [
      { kind: "cmd", text: "mkcd App/Controllers/Auth" },
      { kind: "out", text: "  New-Item -ItemType Directory -Path App/Controllers/Auth -Force" },
      { kind: "ok", text: "  ✓ Set-Location App/Controllers/Auth" },
    ],
  },
  apihit: {
    label: "apihit",
    lines: [
      { kind: "cmd", text: "apihit https://api.internal/v1/metrics" },
      { kind: "out", text: '  { "cpu_pct": 14.2, "mem_mb": 412, "healthy": true }' },
      { kind: "ok", text: "  ✓ Invoke-RestMethod completed in 84ms" },
    ],
  },
  branchclean: {
    label: "branchclean",
    lines: [
      { kind: "cmd", text: "branchclean" },
      { kind: "out", text: "  Finding branches merged into main..." },
      { kind: "ok", text: "  ✓ Deleted 8 stale local branches" },
    ],
  },
};

function Coords() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () => setT(new Date().toISOString().slice(11, 19) + "Z");
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t}</span>;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yType = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yPanel = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [shell, setShell] = useState<ShellMode>("zsh");
  const [actionKey, setActionKey] = useState("boot");

  const HEADLINES = [
    { text: "YOUR SHELL.", highlight: false },
    { text: "FULLY ARMED.", highlight: true },
  ];

  const currentScript =
    shell === "zsh"
      ? ZSH_SCRIPTS[actionKey] ?? ZSH_SCRIPTS["boot"]!
      : PWSH_SCRIPTS[actionKey] ?? PWSH_SCRIPTS["boot"]!;

  const promptPrefix = shell === "zsh" ? "$" : "PS>";
  const title =
    shell === "zsh" ? "zsh — ~/.sharmory/functions.zsh" : "pwsh — Microsoft.PowerShell_profile.ps1";

  const commandKeys = Object.keys(shell === "zsh" ? ZSH_SCRIPTS : PWSH_SCRIPTS);

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        setPointer({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
      }}
      className="relative flex min-h-[calc(100vh-3.5rem)] flex-col justify-between overflow-hidden border-b border-hairline pt-14"
    >
      {/* interactive field */}
      <div
        aria-hidden
        className="grid-field pointer-events-none absolute inset-0 opacity-60"
        style={{
          maskImage: `radial-gradient(60rem 40rem at ${pointer.x * 100}% ${pointer.y * 100}%, #000 0%, transparent 78%)`,
          WebkitMaskImage: `radial-gradient(60rem 40rem at ${pointer.x * 100}% ${pointer.y * 100}%, #000 0%, transparent 78%)`,
          transition: "mask-image 220ms linear",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-signal/8 blur-[120px]"
      />

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between px-5 sm:px-8">
        {/* metadata rail */}
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-1.5 border-b border-hairline py-2 font-mono text-[9.5px] tracking-[0.2em] text-muted-foreground uppercase">
          <span className="flex items-center gap-2">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-signal" />
            SHARMORY / DEV TOOLCHAIN · STATUS: ARMED
          </span>
          <span className="hidden sm:inline">v1.0 · ZSH &amp; POWERSHELL 5.1+ / CORE 7+ · MIT</span>
          <span className="flex items-center gap-2">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-phosphor" />
            SYS/UTC <Coords />
          </span>
        </div>

        {/* Hero Grid — Compact & Balanced */}
        <div className="my-auto grid items-center gap-8 py-6 lg:grid-cols-12 lg:gap-10 lg:py-8">
          {/* Left Hero Column */}
          <motion.div
            className="lg:col-span-7"
            {...(reduced ? {} : { style: { y: yType, opacity: fade } })}
          >
            <div className="mb-2.5 flex items-center gap-2.5 font-mono text-[10.5px] tracking-[0.22em] text-signal">
              <span className="h-px w-8 bg-signal" />
              THE DEVELOPER&apos;S ARMOURY
            </div>

            <h1 className="display text-[clamp(2.4rem,5.6vw,5.2rem)] leading-[0.9]">
              {HEADLINES.map((h, i) => (
                <span key={h.text} className="block overflow-hidden">
                  <motion.span
                    className={`block ${h.highlight ? "text-signal" : ""}`}
                    {...(reduced
                      ? {}
                      : {
                          initial: { y: "110%" },
                          animate: { y: "0%" },
                          transition: {
                            duration: 0.9,
                            delay: 0.08 + i * 0.1,
                            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                          },
                        })}
                  >
                    {h.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-3.5 max-w-xl font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm"
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, delay: 0.3 },
                  })}
            >
              A single-file arsenal of sharp, practical utilities for developers who&apos;d rather
              type one command than write ten.{" "}
              <span className="text-foreground">
                {SHIPPED} functions ready to source in eight seconds.
              </span>{" "}
              No plugin manager. No framework. Zero startup tax.
            </motion.p>

            <motion.div
              className="mt-5 flex flex-wrap items-center gap-2.5"
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 0.5, delay: 0.45 },
                  })}
            >
              <MagneticLink
                href="#install"
                className="group inline-flex items-center gap-2.5 bg-signal px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-primary-foreground uppercase transition-shadow hover:shadow-[0_0_0_3px_var(--color-signal)]/30"
              >
                LOAD THE ARMOURY
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </MagneticLink>
              <MagneticLink
                href="#arsenal"
                className="inline-flex items-center gap-2.5 border border-hairline px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-signal hover:text-signal"
              >
                EXPLORE COMMANDS ↓
              </MagneticLink>
              <MagneticLink
                href={REPO}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 border border-hairline px-4 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-signal hover:text-signal"
              >
                GITHUB ↗
              </MagneticLink>
            </motion.div>

            {/* Left Stats Row */}
            <div className="mt-6 grid max-w-md grid-cols-3 border-t border-hairline pt-3 font-mono text-[9.5px] tracking-[0.16em] text-muted-foreground uppercase">
              <div>
                <div className="display text-xl text-foreground sm:text-2xl">{SHIPPED}</div>
                functions
              </div>
              <div>
                <div className="display text-xl text-foreground sm:text-2xl">2</div>
                shells
              </div>
              <div>
                <div className="display text-xl text-foreground sm:text-2xl">0</div>
                dependencies
              </div>
            </div>
          </motion.div>

          {/* Right Hero Column: Interactive Terminal */}
          <motion.div
            className="lg:col-span-5"
            {...(reduced ? {} : { style: { y: yPanel } })}
          >
            <div className="relative">
              <span className="absolute -top-2.5 -left-2.5 hidden h-10 w-10 border-t border-l border-signal/60 lg:block" />

              {/* Shell Selector Bar */}
              <div className="mb-1.5 flex items-center justify-between border border-hairline bg-card/60 px-2.5 py-1 font-mono text-[9.5px]">
                <span className="tracking-[0.16em] text-muted-foreground uppercase">
                  ACTIVE SHELL:
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShell("zsh");
                      setActionKey("boot");
                    }}
                    className={`px-2 py-0.5 tracking-wider uppercase transition-colors ${
                      shell === "zsh"
                        ? "bg-signal font-bold text-primary-foreground"
                        : "border border-hairline text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    ⌘ ZSH / UNIX
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShell("pwsh");
                      setActionKey("boot");
                    }}
                    className={`px-2 py-0.5 tracking-wider uppercase transition-colors ${
                      shell === "pwsh"
                        ? "bg-signal font-bold text-primary-foreground"
                        : "border border-hairline text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    ⊞ POWERSHELL
                  </button>
                </div>
              </div>

              {/* Interactive Terminal Block */}
              <TerminalBlock
                key={`${shell}-${actionKey}`}
                lines={currentScript.lines}
                title={title}
                promptPrefix={promptPrefix}
              />

              {/* Interactive Command Pills Grid */}
              <div className="mt-2 border border-hairline bg-card/40 p-2 font-mono text-[9.5px]">
                <div className="mb-1.5 flex items-center justify-between border-b border-hairline pb-1">
                  <span className="tracking-wider text-muted-foreground/80 uppercase">
                    TRY VERBS IN SHELL:
                  </span>
                  <span className="text-signal">{commandKeys.length} SCENARIOS</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {commandKeys.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setActionKey(k)}
                      className={`border px-1.5 py-0.5 transition-colors ${
                        actionKey === k
                          ? "border-signal bg-signal/20 font-semibold text-signal"
                          : "border-hairline text-muted-foreground hover:border-signal/50 hover:text-foreground"
                      }`}
                    >
                      {k === "boot" ? "reset" : `$ ${k}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status footer metrics */}
              <div className="mt-2 grid grid-cols-3 gap-1.5 font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase">
                <div className="border border-hairline px-2 py-1">
                  STARTUP <span className="float-right text-signal font-bold">0 ms</span>
                </div>
                <div className="border border-hairline px-2 py-1">
                  SANDBOX <span className="float-right text-phosphor font-bold">100%</span>
                </div>
                <div className="border border-hairline px-2 py-1">
                  PLUGINS <span className="float-right text-foreground font-bold">0</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
