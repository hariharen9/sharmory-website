import { Reveal, SectionHead, MaskLine } from "./primitives";

const TIMELINE = [
  {
    year: "2024",
    tag: "THE SCRATCHPAD",
    title: "A single dirty .zshrc file",
    desc: "Started as a handful of quick aliases and functions (mkcd, killport, gacp, gitundo) written late at night to stop retyping the same 3-command sequences.",
    commands: ["mkcd", "killport", "gacp", "gitundo"],
    badge: "v0.1 / PERSONAL",
  },
  {
    year: "2025",
    tag: "THE HARDENING",
    title: "Error guards, fallbacks, and sprawl",
    desc: "Grew to 40+ utilities across Docker, Kubernetes, TLS, and language runtimes. Every command was refactored to check dependencies, provide polite Usage: hints, and fail gracefully without crashing the shell.",
    commands: ["dockernuke", "k8sctx", "certcheck", "apihit"],
    badge: "v0.6 / SANDBOXED",
  },
  {
    year: "2026",
    tag: "DUAL-SHELL PARITY",
    title: "Packaged into a single zero-dependency file",
    desc: "Ported every single function to Windows PowerShell with 1:1 behavioral parity. Sandboxed tests were added to mock Docker, Kubernetes, and network calls so nothing on the host is touched.",
    commands: ["sharmory.zsh", "sharmory.ps1", "100% tests"],
    badge: "v1.0 / MIT OPEN SOURCE",
  },
];

export function Origin() {
  return (
    <section id="origin" className="relative border-b border-hairline">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead index="02" title="FIELD NOTES / ORIGIN" note="2024 — PRESENT" />

        <div className="grid gap-12 pt-12 lg:grid-cols-12 lg:gap-16">
          {/* Left column / Narrative */}
          <div className="lg:col-span-5">
            <h3 className="display text-[clamp(2rem,5vw,3.75rem)]">
              <MaskLine>BORN IN A</MaskLine>
              <MaskLine delay={0.06}>
                <span className="text-signal">DIRTY .ZSHRC,</span>
              </MaskLine>
              <MaskLine delay={0.12}>HARDENED DAILY.</MaskLine>
            </h3>

            <Reveal delay={0.15}>
              <p className="mt-8 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
                Sharmory wasn&apos;t designed in an afternoon or brainstormed as a SaaS.
                It was born one function at a time out of raw developer friction.
              </p>
              <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
                I tried the big plugin ecosystems, framework managers, and 500-tool catalogues.
                They either bogged down shell startup times, introduced brittle dependencies,
                or expected you to memorize an entirely new TUI.
              </p>
              <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
                I wanted something simpler:{" "}
                <span className="text-foreground">
                  an opinionated personal loadout of sharp, reliable commands
                </span>{" "}
                that I could source on any new machine in seconds and get straight to work.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 border border-hairline bg-card/40 p-5 font-mono text-xs text-muted-foreground">
                <div className="flex items-center justify-between border-b border-hairline pb-3">
                  <span className="label text-signal">CORE PHILOSOPHY</span>
                  <span>0 MS STARTUP TAX</span>
                </div>
                <p className="mt-3 leading-relaxed">
                  &ldquo;If a tool takes more than 10ms to load or needs a 20-page manual,
                  it belongs in a separate binary — not your interactive shell.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right column / Timeline */}
          <div className="lg:col-span-7">
            <div className="border-t border-hairline">
              {TIMELINE.map((t, idx) => (
                <Reveal key={t.year} delay={idx * 0.08}>
                  <div className="group border-b border-hairline py-8 transition-colors hover:bg-card/40">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="display text-3xl text-signal sm:text-4xl">
                          {t.year}
                        </span>
                        <span className="label text-muted-foreground">/ {t.tag}</span>
                      </div>
                      <span className="border border-hairline px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                        {t.badge}
                      </span>
                    </div>

                    <h4 className="mt-4 font-mono text-base font-semibold text-foreground sm:text-lg">
                      {t.title}
                    </h4>

                    <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {t.desc}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground/60 uppercase">
                        KEY ADDITIONS:
                      </span>
                      {t.commands.map((cmd) => (
                        <code
                          key={cmd}
                          className="border border-hairline bg-secondary/50 px-2 py-0.5 font-mono text-xs text-foreground transition-colors group-hover:border-signal/50"
                        >
                          {cmd}
                        </code>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
