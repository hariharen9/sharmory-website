import { useState } from "react";
import { Reveal, SectionHead, MaskLine } from "./primitives";

const HITTERS = [
  {
    n: "01",
    cmd: "gacp",
    args: "'fix: drop dead branch'",
    tag: "GIT",
    domain: "Git Workflow",
    desc: "Stage changes, commit with message, and push to origin/main with automatic branch safety checks.",
    badge: "AUTOMATION",
  },
  {
    n: "02",
    cmd: "dockernuke",
    args: "-a",
    tag: "DOCKER",
    domain: "Containers",
    desc: "Force stop hanging containers and reclaim gigabytes of orphaned volume and build cache.",
    badge: "CLEANUP",
  },
  {
    n: "03",
    cmd: "killport",
    args: "3000",
    tag: "NET",
    domain: "Networking",
    desc: "Locate whatever process is squatting on a localhost port and SIGTERM/SIGKILL it cleanly in one step.",
    badge: "TRIAGE",
  },
  {
    n: "04",
    cmd: "mkcd",
    args: "src/api/v2",
    tag: "FILES",
    domain: "Filesystem",
    desc: "mkdir -p + cd in a single move. Never type separate directory creation and cd commands again.",
    badge: "NAVIGATION",
  },
  {
    n: "05",
    cmd: "k8sctx",
    args: "prod-eu",
    tag: "K8S",
    domain: "Kubernetes",
    desc: "Fuzzy-switch Kubernetes cluster context and namespace without the multi-flag kubectl ceremony.",
    badge: "DEVOPS",
  },
  {
    n: "06",
    cmd: "gitundo",
    args: "",
    tag: "GIT",
    domain: "Git Safety",
    desc: "Undo the last commit immediately while keeping all modified files safely staged in your index.",
    badge: "SAFETY",
  },
  {
    n: "07",
    cmd: "certcheck",
    args: "sharmory.dev",
    tag: "TLS",
    domain: "Security & TLS",
    desc: "Audit SSL/TLS certificate expiry date, issuer, and SANs in seconds without cryptic openssl syntax.",
    badge: "INSPECTION",
  },
  {
    n: "08",
    cmd: "apihit",
    args: "https://api.internal/health",
    tag: "NET",
    domain: "API Diagnostics",
    desc: "Send HTTP requests with formatted JSON output, status codes, and accurate DNS + TLS timing breakdowns.",
    badge: "BENCHMARK",
  },
  {
    n: "09",
    cmd: "branchclean",
    args: "",
    tag: "GIT",
    domain: "Repository Hygiene",
    desc: "Identify and delete all local branches already merged into main, then prune stale tracking remotes.",
    badge: "HYGIENE",
  },
];

export function Featured() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (cmd: string) => {
    void navigator.clipboard?.writeText(cmd);
    setCopiedCmd(cmd);
    window.setTimeout(() => setCopiedCmd(null), 1400);
  };

  return (
    <section id="featured" className="relative border-b border-hairline bg-background">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          index="04"
          title="FIELD TESTED / THE HEAVY HITTERS"
          note="9 battle-proven daily drivers"
        />

        <div className="pt-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h3 className="display text-[clamp(2rem,5vw,3.75rem)]">
                <MaskLine>NINE WEAPONS.</MaskLine>
                <MaskLine delay={0.06}>
                  <span className="text-signal">INSTANT LEVERAGE.</span>
                </MaskLine>
              </h3>
              <Reveal delay={0.12}>
                <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground">
                  The utilities developers run hundreds of times every single week.
                  No flags to memorize, no interactive menu friction — just fast verbs.
                </p>
              </Reveal>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              CLICK ANY CARD TO COPY
            </span>
          </div>

          {/* 9-Card Heavy Hitters Grid (3x3) */}
          <div className="mt-12 grid border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {HITTERS.map((h, i) => (
              <Reveal key={h.cmd} delay={i * 0.05} className="h-full">
                <div
                  onClick={() => handleCopy(`${h.cmd} ${h.args}`.trim())}
                  className="group relative flex h-full cursor-pointer flex-col justify-between bg-background p-6 transition-all hover:bg-card/70 sm:p-8"
                >
                  <div>
                    {/* Top Row: Index + Tag Badge */}
                    <div className="flex items-center justify-between border-b border-hairline pb-3">
                      <span className="font-mono text-xs font-bold text-signal">[{h.n}]</span>
                      <div className="flex items-center gap-2">
                        <span className="border border-hairline px-2 py-0.5 font-mono text-[9px] tracking-wider text-muted-foreground uppercase">
                          {h.tag}
                        </span>
                        <span className="label text-[9px] text-signal/80">
                          {h.badge}
                        </span>
                      </div>
                    </div>

                    {/* Command Display */}
                    <div className="mt-6 flex items-baseline justify-between">
                      <div className="font-mono text-2xl font-bold text-foreground transition-colors group-hover:text-signal sm:text-3xl">
                        <span className="mr-2 text-signal">$</span>
                        {h.cmd}
                      </div>
                      {copiedCmd === `${h.cmd} ${h.args}`.trim() && (
                        <span className="font-mono text-[10px] font-bold text-phosphor">
                          ✓ COPIED
                        </span>
                      )}
                    </div>

                    {h.args ? (
                      <div className="mt-1 font-mono text-xs text-muted-foreground/70">
                        {h.args}
                      </div>
                    ) : null}

                    {/* Description */}
                    <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {h.desc}
                    </p>
                  </div>

                  {/* Bottom Domain Line */}
                  <div className="mt-8 flex items-center justify-between border-t border-hairline pt-3 font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
                    <span>{h.domain}</span>
                    <span className="text-signal opacity-0 transition-opacity group-hover:opacity-100">
                      COPY COMMAND →
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
