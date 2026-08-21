import { useState, useMemo, useRef, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CATEGORIES, SHIPPED, TOTAL_TOOLS } from "@/lib/armoury";
import { Reveal, SectionHead } from "./primitives";
import {
  SiGit,
  SiDocker,
  SiKubernetes,
  SiGo,
  SiNodedotjs,
  SiPython,
  SiJenkins,
} from "react-icons/si";
import {
  FiFolder,
  FiGlobe,
  FiShield,
  FiActivity,
  FiZap,
  FiTerminal,
  FiSearch,
} from "react-icons/fi";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  files: <FiFolder />,
  git: <SiGit />,
  docker: <SiDocker />,
  k8s: <SiKubernetes />,
  go: <SiGo />,
  node: <SiNodedotjs />,
  python: <SiPython />,
  net: <FiGlobe />,
  security: <FiShield />,
  system: <FiActivity />,
  prod: <FiZap />,
  jenkins: <SiJenkins />,
  meta: <FiTerminal />,
};

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
    <section id="arsenal" className="relative w-full max-w-full overflow-hidden border-b border-hairline bg-background">
      <div className="mx-auto max-w-[1600px] min-w-0 px-4 py-16 sm:px-8 sm:py-28">
        <SectionHead
          index="04"
          title="THE ARSENAL"
          note={`${TOTAL_TOOLS} of ${SHIPPED} catalogued · ${CATEGORIES.length} loadouts`}
        />

        {/* Search / Filter Bar */}
        <div className="mt-8 w-full min-w-0 border border-hairline bg-card/40 p-2.5 sm:p-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2.5 px-1 sm:px-2 min-w-0">
              <FiSearch className="text-sm text-signal shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="filter by verb or description... (press '/' to focus)"
                className="w-full min-w-0 bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none sm:text-sm"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="font-mono text-[10px] tracking-widest text-muted-foreground hover:text-foreground shrink-0"
                >
                  CLEAR
                </button>
              ) : (
                <kbd className="hidden border border-hairline px-2 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
                  /
                </kbd>
              )}
            </div>
            {searchResults !== null && (
              <div className="border-t border-hairline pt-2 font-mono text-[10.5px] sm:text-[11px] text-signal sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4 shrink-0">
                {searchResults.length} MATCH{searchResults.length === 1 ? "" : "ES"} FOUND
              </div>
            )}
          </div>
        </div>

        {searchResults !== null ? (
          /* Search Results View */
          <div className="mt-6 w-full min-w-0 border border-hairline bg-background">
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3 sm:px-6 sm:py-4">
              <span className="label text-[10px] sm:text-xs">
                SEARCH: &ldquo;{query}&rdquo;
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-muted-foreground">
                CLICK COMMAND TO COPY
              </span>
            </div>
            {searchResults.length === 0 ? (
              <div className="p-10 text-center font-mono text-xs sm:text-sm text-muted-foreground">
                No commands matching &ldquo;{query}&rdquo; found. Try searching for &lsquo;git&rsquo;, &lsquo;docker&rsquo;, or &lsquo;port&rsquo;.
              </div>
            ) : (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((t) => (
                  <li
                    key={t.name}
                    onClick={() => handleCopy(t.name)}
                    className="group cursor-pointer border-b border-hairline p-4 transition-colors hover:bg-card/60 sm:border-r sm:p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-base font-bold text-foreground transition-colors group-hover:text-signal">
                        <span className="text-signal">$</span>
                        {t.name}
                      </div>
                      <div className="flex items-center gap-2">
                        {copiedCmd === t.name ? (
                          <span className="font-mono text-[10px] font-bold text-phosphor">
                            ✓ COPIED
                          </span>
                        ) : (
                          <span className="label text-[9px]">[{t.categoryIndex}]</span>
                        )}
                      </div>
                    </div>
                    <p className="mt-1.5 font-mono text-xs leading-relaxed text-muted-foreground">
                      {t.desc}
                    </p>
                    <div className="mt-2.5 font-mono text-[9.5px] text-muted-foreground/60 uppercase">
                      LOADOUT: {t.categoryName}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          /* Default Loadout View */
          <div className="mt-6 grid w-full min-w-0 lg:grid-cols-12">
            {/* Category Rack (Grid on mobile, vertical list on desktop — ZERO horizontal overflow) */}
            <div className="w-full min-w-0 lg:col-span-4 lg:border-r lg:border-hairline">
              <div className="mb-2 font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase lg:hidden">
                SELECT LOADOUT:
              </div>
              <ul className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col gap-1.5 pb-4 lg:pb-0 border-b border-hairline lg:border-b-0 w-full min-w-0">
                {CATEGORIES.map((c) => {
                  const on = c.id === active;
                  return (
                    <li key={c.id} className="w-full min-w-0">
                      <button
                        type="button"
                        onClick={() => setActive(c.id)}
                        aria-pressed={on}
                        className={`group flex items-center justify-between border lg:border-0 lg:border-b border-hairline px-2.5 py-2 sm:px-3 sm:py-2.5 lg:px-1 lg:py-5 text-left transition-all w-full min-w-0 lg:pr-6 ${
                          on
                            ? "bg-signal font-bold text-primary-foreground shadow-sm"
                            : "bg-card/30 lg:bg-transparent hover:bg-card/60"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate min-w-0 flex-1">
                          <span
                            className={`text-sm shrink-0 ${
                              on ? "text-primary-foreground" : "text-signal"
                            }`}
                          >
                            {CATEGORY_ICONS[c.id] || <FiTerminal />}
                          </span>
                          <span className="font-mono text-[10.5px] sm:text-xs lg:display lg:text-lg uppercase truncate">
                            {c.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-2">
                          <span
                            className={`font-mono text-[9px] sm:text-[11px] tabular-nums ${
                              on ? "text-primary-foreground/90 font-bold" : "text-muted-foreground"
                            }`}
                          >
                            {String(c.tools.length).padStart(2, "0")}
                          </span>
                          <span
                            className={`hidden lg:inline-block transition-transform duration-300 ${
                              on ? "translate-x-0" : "-translate-x-2 opacity-0"
                            }`}
                            aria-hidden
                          >
                            →
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Loadout Command List */}
            <div className="w-full min-w-0 lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={cat.id}
                  {...(reduced
                    ? {}
                    : {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -6 },
                        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
                      })}
                  className="h-full w-full min-w-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-hairline px-0 py-4 sm:py-6 lg:px-8">
                    <div>
                      <div className="label mb-1 text-signal flex items-center gap-2">
                        <span className="text-sm">{CATEGORY_ICONS[cat.id]}</span>
                        <span>LOADOUT / {cat.index} · {cat.name}</span>
                      </div>
                      <p className="max-w-xl font-mono text-xs sm:text-sm text-muted-foreground">
                        {cat.blurb}
                      </p>
                    </div>
                    <span
                      className="hidden sm:block display text-5xl text-hairline select-none lg:text-7xl"
                      aria-hidden
                    >
                      {cat.index}
                    </span>
                  </div>

                  <ul className="grid sm:grid-cols-2 lg:px-8 w-full min-w-0">
                    {cat.tools.map((t, i) => (
                      <li
                        key={t.name}
                        onClick={() => handleCopy(t.name)}
                        className="group cursor-pointer border-b border-hairline py-3.5 sm:py-4 sm:odd:pr-6 sm:even:border-l sm:even:pl-6 transition-colors hover:bg-card/40 min-w-0"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 sm:gap-3 truncate min-w-0">
                            <span className="font-mono text-[9.5px] sm:text-[10px] text-muted-foreground/60 tabular-nums shrink-0">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="font-mono text-sm sm:text-base font-bold text-foreground transition-colors group-hover:text-signal truncate">
                              <span className="mr-1 text-signal">$</span>
                              {t.name}
                            </div>
                          </div>
                          {copiedCmd === t.name ? (
                            <span className="font-mono text-[10px] font-bold text-phosphor shrink-0">
                              ✓ COPIED
                            </span>
                          ) : (
                            <span className="font-mono text-[9px] text-muted-foreground/40 group-hover:text-signal uppercase shrink-0">
                              COPY
                            </span>
                          )}
                        </div>
                        <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground break-words">
                          {t.desc}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <Reveal>
                    <p className="px-0 py-5 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] text-muted-foreground uppercase lg:px-8">
                      fzf / jq / eza / entr are optional — every function falls back or fails politely.
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
