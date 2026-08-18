import { useState, useMemo, useRef, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CATEGORIES, SHIPPED, TOTAL_TOOLS } from "@/lib/armoury";
import { Reveal, SectionHead } from "./primitives";

export function Arsenal() {
  const [active, setActive] = useState(CATEGORIES[0]!.id);
  const [query, setQuery] = useState("");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
        document.getElementById("arsenal")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const cat = CATEGORIES.find((c) => c.id === active)!;

  // Flattened search results when query is active
  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase().trim();
    return CATEGORIES.flatMap((c) =>
      c.tools
        .filter((t) => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q))
        .map((t) => ({ ...t, categoryName: c.name, categoryIndex: c.index }))
    );
  }, [query]);

  const handleCopy = (cmd: string) => {
    void navigator.clipboard?.writeText(cmd);
    setCopiedCmd(cmd);
    window.setTimeout(() => setCopiedCmd(null), 1400);
  };

  return (
    <section id="arsenal" className="relative border-b border-hairline">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          index="03"
          title="THE ARSENAL"
          note={`${TOTAL_TOOLS} of ${SHIPPED} catalogued · ${CATEGORIES.length} loadouts`}
        />

        {/* Search Bar / Filter Bar */}
        <div className="mt-8 flex flex-col gap-4 border border-hairline bg-card/30 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3 px-2">
            <span className="font-mono text-sm text-signal">/</span>
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="filter arsenal by verb or description... (press '/' to focus)"
              className="w-full bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none sm:text-sm"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="font-mono text-[10px] tracking-widest text-muted-foreground hover:text-foreground"
              >
                CLEAR [ESC]
              </button>
            ) : (
              <kbd className="hidden border border-hairline px-2 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
                /
              </kbd>
            )}
          </div>
          {searchResults !== null && (
            <div className="border-t border-hairline pt-2 font-mono text-[11px] text-signal sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4">
              {searchResults.length} MATCH{searchResults.length === 1 ? "" : "ES"} FOUND
            </div>
          )}
        </div>

        {searchResults !== null ? (
          /* Search Results View */
          <div className="mt-6 border border-hairline bg-background">
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <span className="label">SEARCH RESULTS FOR &ldquo;{query}&rdquo;</span>
              <span className="font-mono text-xs text-muted-foreground">
                CLICK COMMAND TO COPY
              </span>
            </div>
            {searchResults.length === 0 ? (
              <div className="p-12 text-center font-mono text-sm text-muted-foreground">
                No commands matching &ldquo;{query}&rdquo; found. Try searching for &lsquo;git&rsquo;, &lsquo;docker&rsquo;, or &lsquo;port&rsquo;.
              </div>
            ) : (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((t, i) => (
                  <li
                    key={t.name}
                    className="group border-b border-hairline p-5 transition-colors hover:bg-card/50 sm:border-r"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleCopy(t.name)}
                        className="flex items-center gap-2 font-mono text-base font-bold text-foreground transition-colors hover:text-signal"
                      >
                        <span className="text-signal">$</span>
                        {t.name}
                        {copiedCmd === t.name && (
                          <span className="text-[10px] font-normal text-phosphor">✓ COPIED</span>
                        )}
                      </button>
                      <span className="label text-[10px]">[{t.categoryIndex}]</span>
                    </div>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
                      {t.desc}
                    </p>
                    <div className="mt-3 font-mono text-[10px] text-muted-foreground/60">
                      LOADOUT: {t.categoryName}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          /* Default Loadout View */
          <div className="mt-6 grid lg:grid-cols-12">
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
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="flex items-baseline gap-3">
                            <span className="font-mono text-[10px] text-muted-foreground/60 tabular-nums">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(t.name)}
                              className="font-mono text-base text-foreground transition-colors group-hover:text-signal hover:underline"
                              title="Click to copy command"
                            >
                              {t.name}
                            </button>
                          </div>
                          {copiedCmd === t.name && (
                            <span className="font-mono text-[10px] text-phosphor">✓ COPIED</span>
                          )}
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
        )}
      </div>
    </section>
  );
}
