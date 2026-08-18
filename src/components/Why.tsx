import { Reveal, SectionHead, MaskLine } from "./primitives";

const FRICTION = [
  {
    n: "01",
    bad: "lsof -ti tcp:3000 | xargs kill -9",
    good: "killport 3000",
    note: "port squatter",
  },
  {
    n: "02",
    bad: "git add -A && git commit -m … && git push origin HEAD",
    good: "gacp 'msg'",
    note: "ship a fix",
  },
  {
    n: "03",
    bad: "openssl s_client -connect d:443 | openssl x509 -noout -dates",
    good: "certcheck d",
    note: "cert expiry",
  },
  {
    n: "04",
    bad: "git branch --merged main | grep -v '\\*' | xargs -n1 git branch -d",
    good: "branchclean",
    note: "branch rot",
  },
];

export function Why() {
  return (
    <section id="why" className="relative border-b border-hairline">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead index="01" title="WHY THIS EXISTS" note="friction log" />

        <div className="grid gap-12 pt-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h3 className="display text-[clamp(2rem,5vw,3.75rem)]">
              <MaskLine>YOU HAVE</MaskLine>
              <MaskLine delay={0.06}>RETYPED THAT</MaskLine>
              <MaskLine delay={0.12}>
                <span className="text-signal">4,000 TIMES</span>
              </MaskLine>
            </h3>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
                Every developer accumulates the same pile of half-remembered incantations —
                scattered across aliases, gists, and Slack messages to yourself. Sharmory
                collects them, hardens them, and gives them names you can actually recall at
                2 a.m.
              </p>
              <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
                Every function checks its optional dependency and degrades gracefully instead
                of exploding. Every one prints a{" "}
                <span className="text-foreground">Usage:</span> line when you get the args
                wrong.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="border-t border-hairline">
              {FRICTION.map((f, i) => (
                <Reveal key={f.n} delay={i * 0.06}>
                  <li className="group grid grid-cols-[auto_1fr] gap-x-5 border-b border-hairline py-6 transition-colors hover:bg-card/50 sm:grid-cols-[auto_1fr_auto]">
                    <span className="font-mono text-xs text-signal">{f.n}</span>
                    <div className="min-w-0">
                      <code className="block truncate font-mono text-xs text-muted-foreground/70 line-through decoration-destructive/70">
                        {f.bad}
                      </code>
                      <code className="mt-2 block font-mono text-lg text-foreground transition-transform duration-300 group-hover:translate-x-1 sm:text-xl">
                        <span className="mr-2 text-signal">$</span>
                        {f.good}
                      </code>
                    </div>
                    <span className="label col-start-2 mt-3 sm:col-start-3 sm:mt-0 sm:self-center">
                      {f.note}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
