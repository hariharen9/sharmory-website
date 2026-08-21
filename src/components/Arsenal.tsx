import { useState, useMemo, useRef, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CATEGORIES,
  SHIPPED,
  TOTAL_TOOLS,
  type ArmouryTool,
} from "@/lib/armoury";
import { Reveal, SectionHead } from "./primitives";
import { ArsenalModal, CATEGORY_ICONS } from "./ArsenalModal";
import {
  FiSearch,
  FiTerminal,
  FiCopy,
  FiCheck,
  FiMaximize2,
  FiGrid,
  FiList,
  FiStar,
  FiLayers,
  FiArrowRight,
  FiFilter,
  FiZap,
} from "react-icons/fi";

type ViewMode = "loadouts" | "alpha" | "table" | "featured";

const HEAVY_HITTERS_NAMES = [
  "killport",
  "gacp",
  "gitundo",
  "mkvite",
  "cronadd",
  "dockernuke",
  "k8sctx",
  "certcheck",
  "ipinfo",
  "envsync",
  "pgc",
  "b64e",
  "mkcd",
  "up",
  "branchclean",
  "dclean",
  "apihit",
  "jwtdecode",
  "vitedev",
  "cronhuman",
  "dbforward",
  "sharmory",
];

export function Arsenal() {
  const [activeCatId, setActiveCatId] = useState(CATEGORIES[0]!.id);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("loadouts");
  const [depFilter, setDepFilter] = useState<string>("all");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [selectedAlphaLetter, setSelectedAlphaLetter] = useState<string>("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalToolName, setModalToolName] = useState<string | null>(null);
  const [modalCatId, setModalCatId] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  // Keyboard shortcut '/' or '⌘K' / 'Ctrl+K' to focus search or open modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsModalOpen(true);
      } else if (e.key === "/" && document.activeElement !== searchInputRef.current && !isModalOpen) {
        e.preventDefault();
        searchInputRef.current?.focus();
        document.getElementById("arsenal")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Flatten all tools
  const allTools = useMemo(() => {
    return CATEGORIES.flatMap((c) =>
      c.tools.map((t) => ({
        ...t,
        categoryName: c.name,
        categoryIndex: c.index,
        categoryId: c.id,
      }))
    );
  }, []);

  // Filtered tools based on active search & depFilter
  const filteredTools = useMemo(() => {
    return allTools.filter((t) => {
      // Dependency Filter
      if (depFilter === "zero-dep" && t.deps) return false;
      if (depFilter !== "all" && depFilter !== "zero-dep" && t.deps !== depFilter) return false;

      // Query
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const mName = t.name.toLowerCase().includes(q);
        const mDesc = t.desc.toLowerCase().includes(q);
        const mUsage = t.usage.toLowerCase().includes(q);
        const mCat = t.categoryName.toLowerCase().includes(q);
        const mTags = t.tags?.some((tag) => tag.toLowerCase().includes(q));
        return mName || mDesc || mUsage || mCat || mTags;
      }

      return true;
    });
  }, [allTools, depFilter, query]);

  // Alphabetical Groups
  const alphabetList = useMemo(() => {
    const letters = new Set<string>();
    filteredTools.forEach((t) => {
      if (t.name && t.name.length > 0) {
        letters.add(t.name[0]!.toUpperCase());
      }
    });
    return Array.from(letters).sort();
  }, [filteredTools]);

  const alphaTools = useMemo(() => {
    const sorted = [...filteredTools].sort((a, b) => a.name.localeCompare(b.name));
    if (selectedAlphaLetter === "ALL") return sorted;
    return sorted.filter((t) => (t.name?.[0]?.toUpperCase() || "") === selectedAlphaLetter);
  }, [filteredTools, selectedAlphaLetter]);

  // Featured / Heavy Hitters
  const heavyHitters = useMemo(() => {
    return allTools.filter((t) => HEAVY_HITTERS_NAMES.includes(t.name));
  }, [allTools]);

  // Active Category in Loadouts View
  const activeCat = useMemo(() => {
    return CATEGORIES.find((c) => c.id === activeCatId) || CATEGORIES[0]!;
  }, [activeCatId]);

  const activeCatFilteredTools = useMemo(() => {
    return activeCat.tools.filter((t) => {
      if (depFilter === "zero-dep" && t.deps) return false;
      if (depFilter !== "all" && depFilter !== "zero-dep" && t.deps !== depFilter) return false;
      return true;
    });
  }, [activeCat, depFilter]);

  const handleCopy = (cmd: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    void navigator.clipboard?.writeText(cmd);
    setCopiedCmd(cmd);
    window.setTimeout(() => setCopiedCmd(null), 1400);
  };

  const openInspector = (toolName: string, catId?: string) => {
    setModalToolName(toolName);
    if (catId) setModalCatId(catId);
    setIsModalOpen(true);
  };

  return (
    <section id="arsenal" className="relative w-full max-w-full overflow-hidden border-b border-hairline bg-background">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-40 h-[40rem] w-[40rem] rounded-full bg-signal/5 blur-[160px]"
      />

      <div className="mx-auto max-w-[1600px] min-w-0 px-4 py-16 sm:px-8 sm:py-28">
        {/* Core highlight spotlight badge */}
        <div className="mb-4 inline-flex items-center gap-2 border border-signal/50 bg-signal/10 px-3 py-1 font-mono text-[10px] sm:text-[10.5px] font-bold tracking-[0.22em] text-signal uppercase shadow-[0_0_20px_color-mix(in_oklab,var(--color-signal)_20%,transparent)]">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-signal" />
          <span>★ CORE COMMAND REPOSITORY · 242 FUNCTIONS · 100% TRIPLE-SHELL PARITY</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-hairline/70 pb-6">
          <div>
            <SectionHead
              index="04"
              title="THE ARSENAL"
              note={`${TOTAL_TOOLS} FUNCTIONS · ${CATEGORIES.length} LOADOUTS · 3 SHELLS`}
            />
            <p className="mt-3 max-w-2xl font-mono text-xs sm:text-sm text-muted-foreground leading-relaxed">
              The heart of Sharmory. Every function is zero-overhead, strictly sandboxed, and
              instantly sourced across Zsh, Bash, and PowerShell. Click any card to inspect syntax, test terminal outputs, or copy verbs.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center justify-center gap-2.5 border-2 border-signal/80 bg-signal/10 px-6 py-3.5 font-mono text-xs font-bold tracking-[0.18em] text-signal uppercase transition-all hover:bg-signal hover:text-primary-foreground hover:shadow-[0_0_35px_color-mix(in_oklab,var(--color-signal)_30%,transparent)] shrink-0"
          >
            <FiMaximize2 className="text-sm transition-transform group-hover:scale-110" />
            <span>FULLSCREEN COMMAND EXPLORER</span>
            <kbd className="hidden sm:inline-block border border-signal/40 group-hover:border-primary-foreground/40 px-1.5 py-0.5 text-[9.5px]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* ── INTERACTIVE TOOLBAR ── */}
        <div className="mt-10 border border-hairline bg-card/40 p-3 sm:p-4 space-y-3">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 flex items-center bg-background/80 border border-hairline focus-within:border-signal transition-colors px-3 py-2.5">
              <FiSearch className="text-muted-foreground text-sm mr-2.5 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search 242 functions by verb or description... (press '/' to focus)"
                className="w-full bg-transparent font-mono text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="font-mono text-[10px] tracking-widest text-muted-foreground hover:text-foreground shrink-0 uppercase"
                >
                  CLEAR
                </button>
              ) : (
                <kbd className="hidden border border-hairline px-2 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
                  /
                </kbd>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="grid grid-cols-2 sm:flex items-center gap-1 border border-hairline bg-background/40 p-1 font-mono text-[10.5px]">
              <button
                type="button"
                onClick={() => setViewMode("loadouts")}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 tracking-wider uppercase transition-colors ${
                  viewMode === "loadouts" && !query
                    ? "bg-signal text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FiLayers className="text-xs" />
                <span>LOADOUTS</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("alpha")}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 tracking-wider uppercase transition-colors ${
                  viewMode === "alpha" && !query
                    ? "bg-signal text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>A–Z DIRECTORY</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 tracking-wider uppercase transition-colors ${
                  viewMode === "table" && !query
                    ? "bg-signal text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FiList className="text-xs" />
                <span>CHEATSHEET</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("featured")}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 tracking-wider uppercase transition-colors ${
                  viewMode === "featured" && !query
                    ? "bg-signal text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FiZap className="text-xs text-signal" />
                <span>TOP HITS</span>
              </button>
            </div>
          </div>

          {/* Secondary Quick Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-hairline/60">
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
              <span className="text-muted-foreground/60 mr-1 uppercase flex items-center gap-1">
                <FiFilter className="text-[10px]" /> DEPS:
              </span>
              {[
                { id: "all", label: "ALL" },
                { id: "zero-dep", label: "⚡ ZERO-DEP ONLY" },
                { id: "fzf", label: "fzf" },
                { id: "jq", label: "jq" },
                { id: "eza", label: "eza" },
                { id: "entr", label: "entr" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setDepFilter(filter.id)}
                  className={`px-2 py-1 uppercase border transition-colors ${
                    depFilter === filter.id
                      ? "bg-signal text-primary-foreground border-signal font-bold"
                      : "border-hairline bg-background/30 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="font-mono text-[10.5px] text-muted-foreground">
              SHOWING <span className="text-signal font-bold">{query ? filteredTools.length : TOTAL_TOOLS}</span> OF{" "}
              <span>{TOTAL_TOOLS} FUNCTIONS</span>
            </div>
          </div>
        </div>

        {/* ── CONTENT AREA ── */}
        {query ? (
          /* ── 1. GLOBAL SEARCH RESULTS VIEW ── */
          <div className="mt-8 border border-hairline bg-background">
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3 sm:px-6 sm:py-4 bg-card/20">
              <span className="font-mono text-xs text-foreground font-semibold">
                SEARCH MATCHES FOR &ldquo;<span className="text-signal">{query}</span>&rdquo; ({filteredTools.length})
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                CLICK ANY CARD TO INSPECT & TEST
              </span>
            </div>

            {filteredTools.length === 0 ? (
              <div className="p-12 text-center font-mono text-xs sm:text-sm text-muted-foreground">
                No functions matching &ldquo;{query}&rdquo; found. Try searching for &lsquo;git&rsquo;, &lsquo;docker&rsquo;, &lsquo;port&rsquo;, or &lsquo;cron&rsquo;.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:gap-px sm:bg-hairline">
                {filteredTools.map((t) => (
                  <div
                    key={t.name}
                    onClick={() => openInspector(t.name, t.categoryId)}
                    className="group cursor-pointer bg-background p-4 sm:p-5 transition-all hover:bg-card/60"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-signal text-sm">
                          {CATEGORY_ICONS[t.categoryId] || <FiTerminal />}
                        </span>
                        <div className="font-mono text-sm sm:text-base font-bold text-foreground group-hover:text-signal transition-colors">
                          <span className="text-signal mr-1">$</span>
                          {t.name}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {t.deps && (
                          <span className="border border-hairline bg-card/50 px-1.5 py-0.5 font-mono text-[8.5px] text-muted-foreground">
                            {t.deps}
                          </span>
                        )}
                        <span className="label text-[9px]">[{t.categoryIndex}]</span>
                      </div>
                    </div>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {t.desc}
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t border-hairline/40 pt-2 font-mono text-[9.5px]">
                      <code className="text-muted-foreground/70 truncate mr-2">
                        {t.usage}
                      </code>
                      <button
                        type="button"
                        onClick={(e) => handleCopy(t.usage || t.name, e)}
                        className="text-signal font-bold uppercase hover:underline shrink-0"
                      >
                        {copiedCmd === (t.usage || t.name) ? "✓ COPIED" : "COPY"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : viewMode === "loadouts" ? (
          /* ── 2. LOADOUTS / CATEGORIES VIEW ── */
          <div className="mt-8 grid w-full min-w-0 lg:grid-cols-12">
            {/* Category Rack (Sidebar on desktop, grid on mobile) */}
            <div className="w-full min-w-0 lg:col-span-4 lg:border-r lg:border-hairline">
              <div className="mb-2 font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase lg:hidden">
                SELECT LOADOUT:
              </div>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col gap-1 pb-4 lg:pb-0 border-b border-hairline lg:border-b-0 w-full min-w-0 lg:sticky lg:top-20">
                {CATEGORIES.map((c) => {
                  const on = c.id === activeCatId;
                  const icon = CATEGORY_ICONS[c.id] || <FiTerminal />;
                  return (
                    <li key={c.id} className="w-full min-w-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveCatId(c.id);
                        }}
                        aria-pressed={on}
                        className={`group flex items-center justify-between border lg:border-0 lg:border-b border-hairline px-2.5 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3.5 text-left transition-all w-full min-w-0 ${
                          on
                            ? "bg-signal text-primary-foreground font-bold shadow-sm"
                            : "bg-card/30 lg:bg-transparent hover:bg-card/60"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate min-w-0 flex-1">
                          <span
                            className={`text-sm shrink-0 ${
                              on ? "text-primary-foreground" : "text-signal"
                            }`}
                          >
                            {icon}
                          </span>
                          <span className="font-mono text-[11px] sm:text-xs uppercase truncate">
                            {c.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <span
                            className={`font-mono text-[9.5px] tabular-nums ${
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

            {/* Loadout Command Cards with stable min-height */}
            <div className="w-full min-w-0 lg:col-span-8 min-h-[480px]">
              <motion.div
                key={activeCat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="h-full w-full min-w-0 lg:pl-6"
              >
                {/* Category Header */}
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-hairline pb-4 pt-4 lg:pt-0">
                  <div>
                    <div className="label mb-1 text-signal flex items-center gap-2">
                      <span className="text-sm">{CATEGORY_ICONS[activeCat.id]}</span>
                      <span>LOADOUT [{activeCat.index}] · {activeCat.name}</span>
                    </div>
                    <p className="max-w-xl font-mono text-xs sm:text-sm text-muted-foreground">
                      {activeCat.blurb}
                    </p>
                  </div>
                  <span
                    className="hidden sm:block display text-5xl text-hairline select-none lg:text-6xl"
                    aria-hidden
                  >
                    {activeCat.index}
                  </span>
                </div>

                {/* Commands Grid */}
                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  {activeCatFilteredTools.map((t, idx) => (
                    <div
                      key={t.name}
                      onClick={() => openInspector(t.name, activeCat.id)}
                      className="group cursor-pointer border border-hairline bg-card/30 p-4 transition-all hover:border-signal hover:bg-card/70 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] text-muted-foreground/60 tabular-nums">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="font-mono text-sm font-bold text-foreground group-hover:text-signal transition-colors">
                              <span className="text-signal mr-1">$</span>
                              {t.name}
                            </span>
                          </div>
                          {t.deps && (
                            <span className="border border-hairline bg-background/50 px-1.5 py-0.2 font-mono text-[8.5px] text-muted-foreground">
                              {t.deps}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground line-clamp-2">
                          {t.desc}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-hairline/40 pt-2 font-mono text-[9.5px]">
                        <code className="text-muted-foreground/80 truncate mr-2">
                          {t.usage}
                        </code>
                        <button
                          type="button"
                          onClick={(e) => handleCopy(t.usage || t.name, e)}
                          className="text-signal font-bold uppercase hover:underline shrink-0"
                        >
                          {copiedCmd === (t.usage || t.name) ? "✓ COPIED" : "COPY"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        ) : viewMode === "alpha" ? (
          /* ── 3. ALPHABETICAL A-Z VIEW ── */
          <div className="mt-8 space-y-6">
            {/* Letter Bar */}
            <div className="flex flex-wrap items-center gap-1.5 border border-hairline bg-card/30 p-2.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => setSelectedAlphaLetter("ALL")}
                className={`px-2.5 py-1 uppercase font-bold border transition-colors ${
                  selectedAlphaLetter === "ALL"
                    ? "bg-signal text-primary-foreground border-signal"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                ALL ({filteredTools.length})
              </button>
              {alphabetList.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setSelectedAlphaLetter(letter)}
                  className={`px-2 py-1 font-bold border transition-colors ${
                    selectedAlphaLetter === letter
                      ? "bg-signal text-primary-foreground border-signal"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Alphabetical Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {alphaTools.map((t) => (
                <div
                  key={t.name}
                  onClick={() => openInspector(t.name, t.categoryId)}
                  className="group cursor-pointer border border-hairline bg-card/30 p-4 transition-all hover:border-signal hover:bg-card/70 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-signal text-sm">
                          {CATEGORY_ICONS[t.categoryId] || <FiTerminal />}
                        </span>
                        <span className="font-mono text-sm font-bold text-foreground group-hover:text-signal transition-colors">
                          <span className="text-signal mr-1">$</span>
                          {t.name}
                        </span>
                      </div>
                      <span className="label text-[9px]">[{t.categoryIndex}]</span>
                    </div>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {t.desc}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-hairline/40 pt-2 font-mono text-[9.5px]">
                    <code className="text-muted-foreground/70 truncate mr-2">
                      {t.usage}
                    </code>
                    <button
                      type="button"
                      onClick={(e) => handleCopy(t.usage || t.name, e)}
                      className="text-signal font-bold uppercase hover:underline shrink-0"
                    >
                      {copiedCmd === (t.usage || t.name) ? "✓ COPIED" : "COPY"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : viewMode === "table" ? (
          /* ── 4. HIGH-DENSITY CHEAT SHEET TABLE VIEW ── */
          <div className="mt-8 border border-hairline bg-background overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-hairline bg-card/60 text-[10px] tracking-wider text-signal uppercase">
                <tr>
                  <th className="py-3 px-4">FUNCTION</th>
                  <th className="py-3 px-4">LOADOUT</th>
                  <th className="py-3 px-4">SYNTAX / USAGE</th>
                  <th className="py-3 px-4">DESCRIPTION</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline/50">
                {filteredTools.map((t) => (
                  <tr
                    key={t.name}
                    onClick={() => openInspector(t.name, t.categoryId)}
                    className="hover:bg-card/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-foreground">
                      <span className="text-signal mr-1">$</span>
                      {t.name}
                    </td>
                    <td className="py-3 px-4 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <span className="text-xs">{CATEGORY_ICONS[t.categoryId]}</span>
                        <span>{t.categoryName}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-foreground/90">
                      <code>{t.usage}</code>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground max-w-md">
                      {t.desc}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => handleCopy(t.usage || t.name, e)}
                        className="border border-hairline bg-card/40 px-2.5 py-1 text-[10px] font-bold text-signal hover:bg-signal hover:text-primary-foreground uppercase transition-all"
                      >
                        {copiedCmd === (t.usage || t.name) ? "✓" : "COPY"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* ── 5. HEAVY HITTERS / TOP HITS VIEW ── */
          <div className="mt-8">
            <div className="mb-4 font-mono text-xs text-muted-foreground flex items-center gap-2">
              <FiZap className="text-signal text-sm" />
              <span>THE 22 MOST FREQUENTLY INVOKED POWER TOOLS IN SHARMORY:</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {heavyHitters.map((t) => (
                <div
                  key={t.name}
                  onClick={() => openInspector(t.name, t.categoryId)}
                  className="group cursor-pointer border-2 border-hairline bg-card/40 p-5 transition-all hover:border-signal hover:bg-card/80 hover:shadow-[0_0_25px_color-mix(in_oklab,var(--color-signal)_10%,transparent)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-signal text-base">
                          {CATEGORY_ICONS[t.categoryId] || <FiTerminal />}
                        </span>
                        <span className="font-mono text-base font-bold text-foreground group-hover:text-signal transition-colors">
                          <span className="text-signal mr-1">$</span>
                          {t.name}
                        </span>
                      </div>
                      <span className="border border-signal/30 bg-signal/10 px-1.5 py-0.5 font-mono text-[8.5px] font-bold text-signal uppercase">
                        TOP HIT
                      </span>
                    </div>
                    <p className="mt-2.5 font-mono text-xs leading-relaxed text-foreground/80">
                      {t.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-hairline/60 pt-3 font-mono text-[10px]">
                    <code className="text-muted-foreground truncate mr-2 font-semibold">
                      {t.usage}
                    </code>
                    <button
                      type="button"
                      onClick={(e) => handleCopy(t.usage || t.name, e)}
                      className="bg-signal/20 px-2 py-1 font-bold text-signal hover:bg-signal hover:text-primary-foreground uppercase transition-all shrink-0"
                    >
                      {copiedCmd === (t.usage || t.name) ? "✓ COPIED" : "COPY"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── FULLSCREEN COMMAND INSPECTOR MODAL ── */}
      <ArsenalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialToolName={modalToolName}
        initialCategoryId={modalCatId}
      />
    </section>
  );
}
