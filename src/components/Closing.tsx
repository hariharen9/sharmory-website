import { CATEGORIES, REPO } from "@/lib/armoury";
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

      {/* Climax Section — Centered Brutalist Composition */}
      <section className="relative flex min-h-[580px] sm:min-h-[660px] flex-col items-center justify-center overflow-hidden border-b border-hairline bg-[#080808] px-5 py-20 text-center sm:px-8 sm:py-28">
        {/* Giant Outlined Watermark spanning past screen edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
        >
          <span className="font-mono text-[clamp(4.2rem,17.5vw,21rem)] font-bold tracking-tight text-transparent whitespace-nowrap leading-none [-webkit-text-stroke:1.2px_#2c2c28] sm:[-webkit-text-stroke:1.4px_rgba(255,255,255,0.12)]">
            SHARMORY
          </span>
        </div>

        {/* Ambient Subtle Center Vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-radial-[circle_at_center,rgba(216,255,56,0.04),transparent_40%]"
        />

        {/* Top Centered Crosshair */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 font-mono text-xl text-[#3a3a36]"
        >
          +
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
          <div className="font-mono text-[11px] tracking-[0.25em] text-[#888882] uppercase">
            THE COMMAND LINE IS YOURS.
          </div>

          <h2 className="display mt-5 text-[clamp(2.75rem,8.5vw,7.25rem)] leading-[0.88]">
            <MaskLine>ARM</MaskLine>
            <MaskLine delay={0.08}>
              <span className="text-signal">YOURSELF.</span>
            </MaskLine>
          </h2>

          <Reveal delay={0.16}>
            <p className="mt-6 font-mono text-xs text-[#787872] sm:text-sm">
              Open source. MIT licensed. Built for the terminal.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <MagneticLink
                href={REPO}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full sm:w-auto justify-center items-center gap-3 bg-signal px-7 py-3.5 font-mono text-xs tracking-[0.16em] font-semibold text-primary-foreground uppercase transition-all hover:shadow-[0_0_25px_rgba(216,255,56,0.2)]"
              >
                VIEW ON GITHUB ↗
              </MagneticLink>
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 border border-[#333330] bg-[#0c0c0b] px-6 py-3.5 font-mono text-xs tracking-[0.16em] text-foreground uppercase transition-all hover:border-[#666] hover:text-signal"
              >
                BACK TO TOP ↑
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modern Technical Footer */}
      <footer className="border-t border-hairline bg-[#080808]">
        <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8">
          {/* Top credits & author bar */}
          <div className="flex flex-wrap items-center justify-between gap-y-3 pb-6 border-b border-hairline/60 font-mono text-[10px] sm:text-[10.5px] tracking-[0.16em] text-muted-foreground uppercase">
            <div className="flex items-center gap-2">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-phosphor" />
              <span>BUILT FOR PEOPLE WHO LIVE IN TERMINALS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground/80">DESIGNED &amp; BUILT BY</span>
              <a
                href="https://hariharen.site"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 border border-hairline bg-card/60 px-2.5 py-1 text-signal font-semibold tracking-wider transition-all hover:border-signal hover:bg-signal hover:text-primary-foreground"
              >
                <span>HARIHAREN</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Bottom links & copyright bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-y-4 font-mono text-[10px] sm:text-[10.5px] tracking-[0.18em] text-muted-foreground uppercase">
            <div className="flex items-center gap-3">
              <span className="grid h-5 w-5 place-items-center border border-signal text-[10px] font-bold text-signal">
                S
              </span>
              <span>SHARMORY © {new Date().getFullYear()}</span>
              <span className="hidden sm:inline text-hairline">|</span>
              <span className="hidden sm:inline text-muted-foreground/70">
                0 DEPENDENCIES · DUAL-SHELL ARSENAL
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
