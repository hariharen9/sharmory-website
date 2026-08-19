import { Reveal, SectionHead, MaskLine } from "./primitives";

const CATEGORIES = [
  {
    type: "CATALOGUES",
    examples: "Awesome Shell, Awesome Modern CLI",
    role: "Index hundreds of separate tools",
    flaw: "Endless evaluation, manual assembly, dependency fatigue",
    verdict: "A phonebook, not a loadout",
    highlight: false,
  },
  {
    type: "ECOSYSTEMS",
    examples: "Oh My Zsh, Bash-it, Starship",
    role: "Customize prompt, theme, plugins",
    flaw: "Startup latency tax, plugin manager overhead, config rot",
    verdict: "Heavy framework machinery",
    highlight: false,
  },
  {
    type: "FOCUSED UTILITIES",
    examples: "fzf, ripgrep, bat, eza, zoxide, fd",
    role: "Replace single Unix primitives",
    flaw: "Doesn't solve multi-command developer workflows",
    verdict: "Great tools (Sharmory hooks into them)",
    highlight: false,
  },
  {
    type: "TUI WRAPPERS",
    examples: "lazygit, lazydocker",
    role: "Full-screen interactive dashboards",
    flaw: "Leaves the interactive shell prompt, cannot be piped or scripted",
    verdict: "Separate applications to learn",
    highlight: false,
  },
  {
    type: "SHARMORY",
    examples: "Your Developer's Armoury",
    role: "Collapses everyday 2–5 command sequences into fast verbs",
    flaw: "None. 1 file, 0 dependencies, 2 shells (Zsh + PowerShell)",
    verdict: "Your instant personal loadout",
    highlight: true,
  },
];

export function Landscape() {
  return (
    <section id="landscape" className="relative border-b border-hairline bg-background">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead index="06" title="WHERE IT SITS / LANDSCAPE" note="the positioning matrix" />

        <div className="pt-12">
          <h3 className="display text-[clamp(2rem,5vw,3.75rem)]">
            <MaskLine>NOT A FRAMEWORK.</MaskLine>
            <MaskLine delay={0.06}>
              <span className="text-signal">NOT A CATALOGUE.</span>
            </MaskLine>
          </h3>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
              The developer tooling ecosystem is crowded with great tools, massive framework managers,
              and thousand-item lists. Sharmory is intentionally none of those. It does not replace
              your tools — it glues your daily workflows together at the prompt.
            </p>
          </Reveal>

          {/* Stark Matrix Grid */}
          <div className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.type} delay={i * 0.05} className="h-full">
                <div
                  className={`flex h-full flex-col justify-between p-6 transition-colors ${
                    c.highlight
                      ? "bg-signal/10 ring-1 ring-signal/50"
                      : "bg-background hover:bg-card/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[11px] font-bold tracking-[0.2em] uppercase ${
                          c.highlight ? "text-signal" : "text-muted-foreground"
                        }`}
                      >
                        [{String(i + 1).padStart(2, "0")}] {c.type}
                      </span>
                      {c.highlight ? (
                        <span className="live-dot h-2 w-2 rounded-full bg-signal" />
                      ) : null}
                    </div>

                    <div className="mt-4 font-mono text-xs font-semibold text-foreground">
                      {c.examples}
                    </div>

                    <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
                      {c.role}
                    </p>

                    <div className="mt-4 border-t border-hairline pt-3 font-mono text-[11px] leading-relaxed text-muted-foreground/80">
                      <span className="text-destructive/80">LIMITATION:</span> {c.flaw}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-hairline pt-3 font-mono text-[11px] tracking-[0.14em] uppercase">
                    <span className={c.highlight ? "text-signal font-bold" : "text-muted-foreground"}>
                      → {c.verdict}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Standout Punchline Callout */}
          <Reveal delay={0.25}>
            <div className="mt-12 border border-signal bg-signal/5 p-8 sm:p-10">
              <div className="font-mono text-[11px] tracking-[0.25em] text-signal uppercase">
                THE ONE-LINE SUMMARY
              </div>
              <p className="mt-4 font-mono text-lg leading-relaxed text-foreground sm:text-2xl">
                &ldquo;<span className="text-signal">fzf</span> is a tool.{" "}
                <span className="text-signal">Oh My Zsh</span> is an ecosystem.{" "}
                <span className="text-signal">Awesome CLI</span> is a catalogue.{" "}
                <span className="bg-signal px-2 py-0.5 font-bold text-primary-foreground">
                  Sharmory is your loadout.
                </span>&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
