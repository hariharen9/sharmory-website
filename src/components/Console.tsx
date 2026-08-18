import { useState } from "react";
import { Reveal, SectionHead } from "./primitives";
import { TerminalBlock, type Line } from "./Terminal";

const SCENES: { id: string; label: string; caption: string; lines: Line[] }[] = [
  {
    id: "triage",
    label: "PORT TRIAGE",
    caption: "Something is holding :5432 hostage.",
    lines: [
      { kind: "cmd", text: "portwho 5432" },
      { kind: "out", text: "  postgres   pid 8123   LISTEN   127.0.0.1:5432" },
      { kind: "cmd", text: "killport 5432" },
      { kind: "out", text: "  → SIGTERM 8123 … no exit after 2s" },
      { kind: "ok", text: "  ✓ SIGKILL 8123 · :5432 released" },
    ],
  },
  {
    id: "git",
    label: "BRANCH HYGIENE",
    caption: "Fourteen dead branches. One command.",
    lines: [
      { kind: "cmd", text: "branchage" },
      { kind: "out", text: "  feat/parser        2 hours ago" },
      { kind: "out", text: "  fix/retry-budget   6 weeks ago" },
      { kind: "cmd", text: "branchclean" },
      { kind: "out", text: "  merged into main: 14 branches" },
      { kind: "ok", text: "  ✓ deleted 14 · pruned 9 stale remotes" },
    ],
  },
  {
    id: "k8s",
    label: "CLUSTER DIVE",
    caption: "Context, namespace, pod, logs — all fuzzy.",
    lines: [
      { kind: "cmd", text: "k8sctx" },
      { kind: "out", text: "  ctx prod-eu-1  ›  ns payments" },
      { kind: "cmd", text: "ktop" },
      { kind: "out", text: "  ledger-7f9c   940m   1.8Gi   ▲" },
      { kind: "cmd", text: "klogs" },
      { kind: "ok", text: "  ✓ streaming ledger-7f9c … ctrl-c to detach" },
    ],
  },
  {
    id: "net",
    label: "API PROBE",
    caption: "Status, timing and pretty JSON in one hit.",
    lines: [
      { kind: "cmd", text: "apihit https://api.internal/v2/health" },
      { kind: "out", text: '  { "status": "degraded", "region": "eu-west-1" }' },
      { kind: "out", text: "  200 OK · dns 12ms · tls 41ms · total 218ms" },
      { kind: "cmd", text: "httpstatus https://api.internal/v2/orders" },
      { kind: "ok", text: "  429 — Too Many Requests (back off, you)" },
    ],
  },
];

export function Console() {
  const [i, setI] = useState(0);
  const scene = SCENES[i]!;

  return (
    <section id="console" className="relative overflow-hidden border-b border-hairline">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-[30rem] w-[30rem] rounded-full bg-phosphor/6 blur-[130px]"
      />
      <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead index="04" title="LIVE CONSOLE" note="scripted sessions" />

        <div className="grid gap-10 pt-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="max-w-sm font-mono text-sm leading-relaxed text-muted-foreground">
                Four real situations from an ordinary Tuesday. Pick one and watch what the
                shell does when it&apos;s properly armed.
              </p>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-2 lg:flex-col lg:items-start">
              {SCENES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-pressed={idx === i}
                  className={`border px-4 py-2.5 font-mono text-[11px] tracking-[0.2em] transition-colors ${
                    idx === i
                      ? "border-signal bg-signal text-primary-foreground"
                      : "border-hairline text-muted-foreground hover:border-signal hover:text-signal"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="mt-8 max-w-sm border-l border-signal pl-4 font-mono text-xs text-muted-foreground">
              {scene.caption}
            </p>
          </div>

          <div className="lg:col-span-8">
            <TerminalBlock
              key={scene.id}
              lines={scene.lines}
              title={`session — ${scene.label.toLowerCase()}`}
              className="min-h-[18rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
