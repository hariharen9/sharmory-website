import { CATEGORIES, REPO, SHIPPED } from "@/lib/armoury";
import { MagneticLink, MaskLine, Ticker } from "./primitives";

const NAMES = CATEGORIES.flatMap((c) => c.tools.map((t) => t.name));

export function Closing() {
  return (
    <>
      <Ticker items={NAMES.slice(0, 26)} />

      <section className="relative overflow-hidden border-b border-hairline">
        <div
          aria-hidden
          className="grid-field pointer-events-none absolute inset-0 opacity-40"
        />
        <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-36">
          <h2 className="display text-[clamp(2.75rem,12vw,10rem)]">
            <MaskLine>PICK UP</MaskLine>
            <MaskLine delay={0.07}>
              THE <span className="text-signal">TOOLS.</span>
            </MaskLine>
          </h2>
          <div className="mt-12 flex flex-col gap-6 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md font-mono text-sm text-muted-foreground">
              {SHIPPED} functions, MIT licensed, one file. Take the whole armoury or
              steal the three you like — it&apos;s plain shell either way.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticLink
                href="#install"
                className="group inline-flex items-center gap-3 bg-signal px-7 py-4 font-mono text-xs tracking-[0.22em] text-primary-foreground uppercase"
              >
                INSTALL NOW
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
                READ THE SOURCE ↗
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          <span>SHARMORY · THE DEVELOPER&apos;S ARMOURY</span>
          <div className="flex flex-wrap gap-6">
            <a href={REPO} target="_blank" rel="noreferrer" className="link-underline">
              GITHUB
            </a>
            <a
              href={`${REPO}#categories`}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              DOCS
            </a>
            <a
              href={`${REPO}/blob/main/LICENSE`}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              MIT
            </a>
          </div>
          <span>BUILT FOR TERMINALS, NOT DASHBOARDS</span>
        </div>
      </footer>
    </>
  );
}
