import { useState } from "react";
import { REPO } from "@/lib/armoury";
import { Reveal, SectionHead, Counter } from "./primitives";

const STEPS = [
  {
    n: "01",
    title: "PIPE IT IN",
    body: "One curl (or irm) writes the file and wires your rc / $PROFILE. Nothing else is touched.",
  },
  {
    n: "02",
    title: "SOURCE ONCE",
    body: "A single source. No plugin manager, no lazy-loading tricks, no measurable startup cost.",
  },
  {
    n: "03",
    title: "STAY CURRENT",
    body: "sharmory-update pulls the latest armoury in place, on either shell.",
  },
  {
    n: "04",
    title: "TRUST IT",
    body: "Sandboxed self-tests mock docker, kubectl, curl and dns — nothing on your machine is harmed.",
  },
];

const SNIPPETS = [
  { id: "zsh", label: "MACOS / LINUX / WSL", cmd: "curl -fsSL https://raw.githubusercontent.com/hariharen9/sharmory/main/install.sh | bash" },
  { id: "pwsh", label: "WINDOWS POWERSHELL", cmd: "irm https://raw.githubusercontent.com/hariharen9/sharmory/main/install.ps1 | iex" },
];

function CopyRow({ label, cmd }: { label: string; cmd: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="group border border-hairline transition-colors hover:border-signal">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-2">
        <span className="label">{label}</span>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard?.writeText(cmd);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          }}
          className="font-mono text-[10px] tracking-[0.2em] text-signal uppercase"
        >
          {copied ? "✓ COPIED" : "COPY"}
        </button>
      </div>
      <div className="overflow-x-auto px-4 py-4">
        <code className="font-mono text-xs leading-relaxed whitespace-pre sm:text-[13px]">
          <span className="mr-2 text-signal">$</span>
          {cmd}
        </code>
      </div>
    </div>
  );
}

export function Install() {
  return (
    <section id="install" className="relative border-b border-hairline">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead index="06" title="ARM YOUR SHELL" note="≈ 8 seconds" />

        <div className="grid gap-12 pt-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <div className="space-y-4">
              {SNIPPETS.map((s) => (
                <Reveal key={s.id}>
                  <CopyRow label={s.label} cmd={s.cmd} />
                </Reveal>
              ))}
              <Reveal delay={0.1}>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
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
            </div>
          </div>

          <div className="lg:col-span-5">
            <ol className="border-t border-hairline">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.05}>
                  <li className="group flex gap-5 border-b border-hairline py-5">
                    <span className="display text-2xl text-hairline transition-colors group-hover:text-signal">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-mono text-xs tracking-[0.22em]">{s.title}</h3>
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

        {/* proof strip */}
        <div className="mt-20 grid border-y border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: 98, s: "", k: "FUNCTIONS SHIPPED" },
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
