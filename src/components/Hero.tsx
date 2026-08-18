import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { REPO, SHIPPED } from "@/lib/armoury";
import { MagneticLink } from "./primitives";
import { TerminalBlock, type Line } from "./Terminal";

const BOOT: Line[] = [
  { kind: "cmd", text: "source ~/.sharmory/functions.zsh" },
  { kind: "ok", text: "  ✓ 98 functions armed  ·  0 plugins  ·  0 frameworks" },
  { kind: "cmd", text: "killport 3000" },
  { kind: "out", text: "  pid 41288 (node) → SIGTERM → released :3000" },
  { kind: "cmd", text: "gacp 'fix: drop the dead branch'" },
  { kind: "ok", text: "  ✓ staged  ✓ committed  ✓ pushed → origin/main" },
  { kind: "cmd", text: "certcheck sharmory.dev" },
  { kind: "out", text: "  expires 2026-11-02  ·  76 days remaining" },
  { kind: "dim", text: "  ready." },
];

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
  const yType = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yPanel = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        setPointer({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
      }}
      className="relative overflow-hidden border-b border-hairline pt-14"
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

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* metadata rail */}
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-hairline py-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          <span>MIT · SINGLE FILE · NO DEPENDENCIES</span>
          <span className="hidden sm:inline">ZSH / POWERSHELL 5.1+ / CORE 7+</span>
          <span className="flex items-center gap-2">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-phosphor" />
            SYS/UTC <Coords />
          </span>
        </div>

        <div className="grid gap-10 py-14 lg:grid-cols-12 lg:gap-8 lg:py-24">
          <motion.div
            className="lg:col-span-7"
            {...(reduced ? {} : { style: { y: yType, opacity: fade } })}
          >
            <div className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-signal">
              <span className="h-px w-10 bg-signal" />
              THE DEVELOPER&apos;S ARMOURY
            </div>

            <h1 className="display text-[clamp(3rem,11vw,9.5rem)]">
              {["SHARP", "SHELL", "ARMOURY"].map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    className={`block ${i === 2 ? "text-signal" : ""}`}
                    {...(reduced
                      ? {}
                      : {
                          initial: { y: "110%" },
                          animate: { y: "0%" },
                          transition: {
                            duration: 1,
                            delay: 0.1 + i * 0.09,
                            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                          },
                        })}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-8 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground sm:text-base"
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.7, delay: 0.5 },
                  })}
            >
              {SHIPPED} Zsh &amp; PowerShell functions for git, docker, k8s, Go, Node,
              Python, networking, crypto and process work —{" "}
              <span className="text-foreground">
                one file, sourced into your shell in eight seconds.
              </span>{" "}
              No plugin manager. No framework. No startup tax.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 0.6, delay: 0.7 },
                  })}
            >
              <MagneticLink
                href="#install"
                className="group inline-flex items-center gap-3 bg-signal px-6 py-3.5 font-mono text-xs tracking-[0.22em] text-primary-foreground uppercase transition-shadow hover:shadow-[0_0_0_3px_var(--color-signal)]/30"
              >
                ARM THE SHELL
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </MagneticLink>
              <MagneticLink
                href={REPO}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border border-hairline px-6 py-3.5 font-mono text-xs tracking-[0.22em] uppercase transition-colors hover:border-signal hover:text-signal"
              >
                SOURCE ON GITHUB ↗
              </MagneticLink>
            </motion.div>

            <div className="mt-12 grid max-w-lg grid-cols-3 border-t border-hairline pt-5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              <div>
                <div className="display text-2xl text-foreground">{SHIPPED}</div>
                functions
              </div>
              <div>
                <div className="display text-2xl text-foreground">2</div>
                shells
              </div>
              <div>
                <div className="display text-2xl text-foreground">0</div>
                dependencies
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            {...(reduced ? {} : { style: { y: yPanel } })}
          >
            <div className="relative">
              <span className="absolute -top-3 -left-3 hidden h-16 w-16 border-t border-l border-signal/60 lg:block" />
              <TerminalBlock lines={BOOT} title="zsh — ~/.sharmory" />
              <div className="mt-3 grid grid-cols-2 gap-3 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                <div className="border border-hairline px-3 py-2">
                  BUILD <span className="float-right text-foreground">stable</span>
                </div>
                <div className="border border-hairline px-3 py-2">
                  TESTS <span className="float-right text-phosphor">100% sandboxed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
