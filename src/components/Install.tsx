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
    os: "macOS / Linux / WSL",
    shell: "ZSH",
    prompt: "$",
    cmd: "curl -fsSL https://raw.githubusercontent.com/hariharen9/sharmory/main/install.sh | bash",
  },
  {
    id: "pwsh",
    sigil: "⊞",
    os: "Windows 10 / 11 / Server",
    shell: "POWERSHELL 5.1+ / 7+",
    prompt: "PS>",
    cmd: "irm https://raw.githubusercontent.com/hariharen9/sharmory/main/install.ps1 | iex",
  },
];

const UPCOMING_MANAGERS = [
  { name: "Homebrew", cmd: "brew install sharmory", status: "PLANNED" },
  { name: "npm", cmd: "npm i -g sharmory", status: "PLANNED" },
  { name: "pip", cmd: "pip install sharmory", status: "PLANNED" },
  { name: "WinGet", cmd: "winget install sharmory", status: "PLANNED" },
  { name: "Cargo", cmd: "cargo install sharmory", status: "PLANNED" },
];

function CopyRow({
  sigil,
  os,
  shell,
  prompt,
  cmd,
}: {
  sigil: string;
  os: string;
  shell: string;
  prompt: string;
  cmd: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="group border border-hairline bg-card/40 transition-colors hover:border-signal">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-signal">{sigil}</span>
          <span className="font-semibold text-foreground">{os}</span>
          <span className="label text-[10px]">[{shell}]</span>
        </div>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard?.writeText(cmd);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          }}
          className="font-mono text-[10px] tracking-[0.2em] text-signal uppercase hover:underline"
        >
          {copied ? "✓ COPIED" : "COPY"}
        </button>
      </div>
      <div className="overflow-x-auto px-4 py-4">
        <code className="font-mono text-xs leading-relaxed whitespace-pre sm:text-[13px]">
          <span className="mr-2 font-bold text-signal">{prompt}</span>
          {cmd}
        </code>
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
              {SNIPPETS.map((s) => (
                <Reveal key={s.id}>
                  <CopyRow
                    sigil={s.sigil}
                    os={s.os}
                    shell={s.shell}
                    prompt={s.prompt}
                    cmd={s.cmd}
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

              {/* Upcoming Distribution Methods / Package Managers */}
              <Reveal delay={0.18}>
                <div className="mt-8 border border-hairline bg-card/30 p-5 font-mono">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
                    <div className="flex items-center gap-2">
                      <span className="label text-signal">DISTRIBUTION ROADMAP</span>
                      <span className="text-[10px] text-muted-foreground">
                        / ADDITIONAL MANAGERS
                      </span>
                    </div>
                    <span className="border border-hairline px-2 py-0.5 text-[9px] tracking-widest text-muted-foreground uppercase">
                      IN DEVELOPMENT
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Native packages for popular package managers are coming soon. The 1-line script
                    remains the fastest, zero-dependency method:
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {UPCOMING_MANAGERS.map((m) => (
                      <div
                        key={m.name}
                        className="border border-hairline bg-secondary/30 p-2.5 text-xs"
                      >
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span>{m.name}</span>
                          <span className="text-[9px] text-signal/80">{m.status}</span>
                        </div>
                        <code className="mt-1.5 block truncate text-[11px] text-foreground/80">
                          {m.cmd}
                        </code>
                      </div>
                    ))}
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
