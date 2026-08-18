import { CATEGORIES, REPO, SHIPPED } from "@/lib/armoury";
import { MagneticLink, MaskLine, Ticker, Reveal } from "./primitives";

const NAMES = CATEGORIES.flatMap((c) => c.tools.map((t) => t.name));

export function Closing() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Infinite Command Stream Ticker */}
      <Ticker items={NAMES.slice(0, 30)} />

      {/* Climax Section */}
      <section className="relative overflow-hidden border-b border-hairline bg-background py-24 sm:py-36">
        {/* Giant Stroke Watermark with Neon Pulsating Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <span className="watermark-neon font-mono text-[clamp(6rem,24vw,24rem)] font-black tracking-tighter text-transparent select-none [-webkit-text-stroke:2px_var(--color-signal)]">
            SHARMORY
          </span>
        </div>

        {/* Interactive Grid & Glow */}
        <div
          aria-hidden
          className="grid-field pointer-events-none absolute inset-0 opacity-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[32rem] w-[32rem] rounded-full bg-signal/5 blur-[140px]"
        />

        {/* Technical Corner Crosshairs */}
        <div aria-hidden className="pointer-events-none absolute top-6 left-8 font-mono text-sm text-signal/40">
          +
        </div>
        <div aria-hidden className="pointer-events-none absolute top-6 right-8 font-mono text-sm text-signal/40">
          +
        </div>
        <div aria-hidden className="pointer-events-none absolute bottom-6 left-8 font-mono text-sm text-signal/40">
          +
        </div>
        <div aria-hidden className="pointer-events-none absolute bottom-6 right-8 font-mono text-sm text-signal/40">
          +
        </div>

        <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-signal uppercase">
            <span className="h-px w-8 bg-signal" />
            THE COMMAND LINE IS YOURS
          </div>

          <h2 className="display mt-6 text-[clamp(3.25rem,13vw,11rem)]">
            <MaskLine>ARM</MaskLine>
            <MaskLine delay={0.08}>
              <span className="text-signal">YOURSELF.</span>
            </MaskLine>
          </h2>

          <div className="mt-12 flex flex-col gap-8 border-t border-hairline pt-8 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <p className="max-w-lg font-mono text-sm leading-relaxed text-muted-foreground sm:text-base">
                {SHIPPED} functions. 0 dependencies. Single-file distribution for Zsh &amp; PowerShell.
                Take the whole armoury or copy the three you need — it&apos;s plain shell either way.
              </p>
              <div className="mt-4 flex items-center gap-3 font-mono text-xs text-muted-foreground">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-phosphor" />
                <span>OPEN SOURCE · MIT LICENSED · BUILT FOR THE TERMINAL</span>
              </div>
            </Reveal>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticLink
                href="#install"
                className="group inline-flex items-center gap-3 bg-signal px-7 py-4 font-mono text-xs tracking-[0.22em] text-primary-foreground uppercase transition-shadow hover:shadow-[0_0_0_3px_var(--color-signal)]/30"
              >
                LOAD THE ARMOURY
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </MagneticLink>
              <MagneticLink
                href={REPO}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border border-hairline px-7 py-4 font-mono text-xs tracking-[0.22em] uppercase transition-colors hover:border-signal hover:text-signal"
              >
                VIEW ON GITHUB ↗
              </MagneticLink>
              <button
                type="button"
                onClick={scrollToTop}
                className="group inline-flex items-center gap-2 border border-hairline px-5 py-4 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:border-signal hover:text-foreground"
                title="Scroll back to top"
              >
                TOP
                <span className="transition-transform duration-300 group-hover:-translate-y-1 text-signal">
                  ↑
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Technical Footer */}
      <footer className="border-t border-hairline bg-background/50">
        <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-y-4 font-mono text-[10.5px] tracking-[0.18em] text-muted-foreground uppercase">
            <div className="flex items-center gap-3">
              <span className="grid h-5 w-5 place-items-center border border-signal text-[10px] text-signal">
                S
              </span>
              <span>SHARMORY © {new Date().getFullYear()}</span>
              <span className="hidden sm:inline text-hairline">|</span>
              <span className="hidden sm:inline text-muted-foreground/70">
                BUILT FOR PEOPLE WHO LIVE IN TERMINALS
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href={REPO}
                target="_blank"
                rel="noreferrer"
                className="link-underline hover:text-signal transition-colors"
              >
                GITHUB ↗
              </a>
              <a
                href={`${REPO}#categories`}
                target="_blank"
                rel="noreferrer"
                className="link-underline hover:text-signal transition-colors"
              >
                DOCUMENTATION
              </a>
              <a
                href={`${REPO}/blob/main/LICENSE`}
                target="_blank"
                rel="noreferrer"
                className="link-underline hover:text-signal transition-colors"
              >
                MIT LICENSE
              </a>
              <button
                type="button"
                onClick={scrollToTop}
                className="link-underline text-signal hover:underline"
              >
                BACK TO TOP ↑
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
