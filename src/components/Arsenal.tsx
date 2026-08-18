import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CATEGORIES, SHIPPED, TOTAL_TOOLS } from "@/lib/armoury";
import { Reveal, SectionHead } from "./primitives";

export function Arsenal() {
  const [active, setActive] = useState(CATEGORIES[0]!.id);
  const reduced = useReducedMotion();
  const cat = CATEGORIES.find((c) => c.id === active)!;

  return (
    <section id="arsenal" className="relative border-b border-hairline">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          index="02"
          title="THE ARSENAL"
          note={`${TOTAL_TOOLS} of ${SHIPPED} catalogued · ${CATEGORIES.length} loadouts`}
        />

        <div className="grid lg:grid-cols-12">
          {/* rack */}
          <div className="lg:col-span-4 lg:border-r lg:border-hairline">
            <ul>
              {CATEGORIES.map((c) => {
                const on = c.id === active;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => setActive(c.id)}
                      aria-pressed={on}
                      className={`group flex w-full items-center gap-4 border-b border-hairline px-1 py-5 text-left transition-colors lg:pr-6 ${
                        on ? "bg-signal text-primary-foreground" : "hover:bg-card/60"
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] ${on ? "" : "text-signal"}`}
                      >
                        [{c.index}]
                      </span>
                      <span className="display flex-1 text-lg sm:text-xl">{c.name}</span>
                      <span
                        className={`font-mono text-[11px] tabular-nums ${
                          on ? "" : "text-muted-foreground"
                        }`}
                      >
                        {String(c.tools.length).padStart(2, "0")}
                      </span>
                      <span
                        className={`transition-transform duration-300 ${
                          on ? "translate-x-0" : "-translate-x-2 opacity-0"
                        }`}
                        aria-hidden
                      >
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* loadout */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.id}
                {...(reduced
                  ? {}
                  : {
                      initial: { opacity: 0, y: 14 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -8 },
                      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
                    })}
                className="h-full"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline px-0 py-6 lg:px-8">
                  <div>
                    <div className="label mb-2">LOADOUT / {cat.index}</div>
                    <p className="max-w-xl font-mono text-sm text-muted-foreground">
                      {cat.blurb}
                    </p>
                  </div>
                  <span
                    className="display text-6xl text-hairline select-none sm:text-8xl"
                    aria-hidden
                  >
                    {cat.index}
                  </span>
                </div>

                <ul className="grid sm:grid-cols-2 lg:px-8">
                  {cat.tools.map((t, i) => (
                    <li
                      key={t.name}
                      className="group border-b border-hairline py-4 sm:odd:pr-6 sm:even:border-l sm:even:pl-6"
                      style={{ animationDelay: `${i * 20}ms` }}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[10px] text-muted-foreground/60 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <code className="font-mono text-base text-foreground transition-colors group-hover:text-signal">
                          {t.name}
                        </code>
                      </div>
                      <p className="mt-1 pl-8 font-mono text-xs leading-relaxed text-muted-foreground">
                        {t.desc}
                      </p>
                    </li>
                  ))}
                </ul>

                <Reveal>
                  <p className="px-0 py-6 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase lg:px-8">
                    fzf / jq / eza / entr are optional — every function falls back or fails
                    politely.
                  </p>
                </Reveal>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
