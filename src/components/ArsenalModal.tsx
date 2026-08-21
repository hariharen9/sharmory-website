import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CATEGORIES,
  TOTAL_TOOLS,
  type ArmouryTool,
  type ArmouryCategory,
} from "@/lib/armoury";
import {
  SiGit,
  SiDocker,
  SiKubernetes,
  SiVite,
  SiGo,
  SiNodedotjs,
  SiPython,
  SiRuby,
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
  FiDatabase,
  FiKey,
  FiCode,
  FiX,
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiMaximize2,
  FiFilter,
  FiLayers,
  FiCpu,
  FiExternalLink,
} from "react-icons/fi";
import { FaWindows } from "react-icons/fa6";
import { VscTerminalPowershell } from "react-icons/vsc";

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  files: <FiFolder />,
  git: <SiGit />,
  docker: <SiDocker />,
  k8s: <SiKubernetes />,
  vite: <SiVite />,
  go: <SiGo />,
  node: <SiNodedotjs />,
  python: <SiPython />,
  languages: <FiCode />,
  databases: <FiDatabase />,
  net: <FiGlobe />,
  security: <FiShield />,
  system: <FiActivity />,
  env: <FiKey />,
  prod: <FiZap />,
  jenkins: <SiJenkins />,
  meta: <FiTerminal />,
};

interface ArsenalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialToolName?: string | null;
  initialCategoryId?: string | null;
}

export function ArsenalModal({
  isOpen,
  onClose,
  initialToolName,
  initialCategoryId,
}: ArsenalModalProps) {
  const [selectedCatId, setSelectedCatId] = useState<string | "all">(
    initialCategoryId || "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedToolName, setSelectedToolName] = useState<string>(
    initialToolName || "gacp"
  );
  const [depFilter, setDepFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "category" | "short">("name");
  const [shellTab, setShellTab] = useState<"unix" | "pwsh">("unix");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync initial selections when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialToolName) {
        setSelectedToolName(initialToolName);
      }
      if (initialCategoryId) {
        setSelectedCatId(initialCategoryId);
      }
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, initialToolName, initialCategoryId]);

  // Flattened tools with category metadata
  const allTools = useMemo(() => {
    return CATEGORIES.flatMap((c) =>
      c.tools.map((t) => ({
        ...t,
        category: c,
      }))
    );
  }, []);

  // Filtered and sorted tools
  const filteredTools = useMemo(() => {
    return allTools
      .filter((item) => {
        // Category match
        if (selectedCatId !== "all" && item.category.id !== selectedCatId) {
          return false;
        }
        // Dependency filter
        if (depFilter === "zero-dep" && item.deps) {
          return false;
        }
        if (depFilter !== "all" && depFilter !== "zero-dep" && item.deps !== depFilter) {
          return false;
        }
        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = item.name.toLowerCase().includes(q);
          const matchDesc = item.desc.toLowerCase().includes(q);
          const matchUsage = item.usage.toLowerCase().includes(q);
          const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
          const matchCat = item.category.name.toLowerCase().includes(q);
          return matchName || matchDesc || matchUsage || matchTags || matchCat;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === "category") {
          return (
            a.category.index.localeCompare(b.category.index) ||
            a.name.localeCompare(b.name)
          );
        }
        if (sortBy === "short") {
          return a.name.length - b.name.length;
        }
        return 0;
      });
  }, [allTools, selectedCatId, depFilter, searchQuery, sortBy]);

  // Currently selected tool item
  const selectedTool = useMemo(() => {
    return (
      allTools.find((t) => t.name === selectedToolName) ||
      filteredTools[0] ||
      allTools[0]
    );
  }, [allTools, selectedToolName, filteredTools]);

  const handleCopy = (text: string, id: string) => {
    void navigator.clipboard?.writeText(text);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1600);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown" || (e.ctrlKey && e.key === "j")) {
        // Next tool
        e.preventDefault();
        const currentIndex = filteredTools.findIndex(
          (t) => t.name === selectedTool?.name
        );
        const next = filteredTools[currentIndex + 1];
        if (currentIndex < filteredTools.length - 1 && next) {
          setSelectedToolName(next.name);
        }
      } else if (e.key === "ArrowUp" || (e.ctrlKey && e.key === "k")) {
        // Prev tool
        e.preventDefault();
        const currentIndex = filteredTools.findIndex(
          (t) => t.name === selectedTool?.name
        );
        const prev = filteredTools[currentIndex - 1];
        if (currentIndex > 0 && prev) {
          setSelectedToolName(prev.name);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredTools, selectedTool, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-background/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative flex flex-col w-full h-full max-w-7xl max-h-[96vh] border border-hairline bg-[#0c0c0c] text-foreground shadow-2xl overflow-hidden"
        >
          {/* ── TOP NAV BAR ── */}
          <div className="flex items-center justify-between border-b border-hairline bg-card/60 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="live-dot h-2 w-2 rounded-full bg-signal" />
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-signal uppercase">
                  SHARMORY COMMAND HUD
                </span>
              </div>
              <span className="hidden sm:inline-block font-mono text-[10px] text-muted-foreground border border-hairline px-2 py-0.5">
                {TOTAL_TOOLS} FUNCTIONS · 17 LOADOUTS
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground/60 mr-2">
                <kbd className="border border-hairline px-1.5 py-0.5 rounded-xs">↑</kbd>
                <kbd className="border border-hairline px-1.5 py-0.5 rounded-xs">↓</kbd> navigate ·
                <kbd className="border border-hairline px-1.5 py-0.5 rounded-xs">ESC</kbd> close
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center h-8 w-8 rounded-xs border border-hairline hover:border-signal hover:text-signal transition-colors text-muted-foreground"
                aria-label="Close modal"
              >
                <FiX className="text-base" />
              </button>
            </div>
          </div>

          {/* ── SEARCH & GLOBAL FILTER STRIP ── */}
          <div className="border-b border-hairline bg-card/20 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1 flex items-center bg-background/80 border border-hairline focus-within:border-signal transition-colors px-3 py-2">
                <FiSearch className="text-muted-foreground text-sm mr-2.5 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 242 functions by verb, flag, keyword, or tag... (e.g. port, docker, pr, jwt)"
                  className="w-full bg-transparent font-mono text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="font-mono text-[10px] text-muted-foreground hover:text-foreground shrink-0 uppercase tracking-wider ml-2"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* Quick Dependency Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: "all", label: "ALL" },
                  { id: "zero-dep", label: "ZERO-DEP" },
                  { id: "fzf", label: "fzf" },
                  { id: "jq", label: "jq" },
                  { id: "eza", label: "eza" },
                  { id: "entr", label: "entr" },
                ].map((dep) => (
                  <button
                    key={dep.id}
                    type="button"
                    onClick={() => setDepFilter(dep.id)}
                    className={`px-2.5 py-1.5 font-mono text-[10px] tracking-wider uppercase border transition-colors whitespace-nowrap ${
                      depFilter === dep.id
                        ? "bg-signal text-primary-foreground border-signal font-bold"
                        : "border-hairline text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                    }`}
                  >
                    {dep.label}
                  </button>
                ))}
              </div>

              {/* Sort Switcher */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-[10px] text-muted-foreground/60 uppercase hidden lg:inline">
                  SORT:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-background border border-hairline px-2.5 py-1.5 font-mono text-[10px] tracking-wider uppercase text-foreground focus:outline-none focus:border-signal cursor-pointer"
                >
                  <option value="name">Alphabetical (A-Z)</option>
                  <option value="category">By Loadout Index</option>
                  <option value="short">Shortest Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── MAIN 3-COLUMN WORKSPACE ── */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0 overflow-hidden">
            {/* 1. LEFT COLUMN: CATEGORIES (col-span-3) */}
            <div className="hidden md:flex md:col-span-3 flex-col border-r border-hairline bg-card/10 overflow-y-auto">
              <div className="p-3 border-b border-hairline/60 flex items-center justify-between font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
                <span>LOADOUT CATEGORIES</span>
                <span className="text-signal">{CATEGORIES.length}</span>
              </div>
              <div className="p-2 space-y-1">
                {/* All loadouts option */}
                <button
                  type="button"
                  onClick={() => setSelectedCatId("all")}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left font-mono text-xs transition-colors border ${
                    selectedCatId === "all"
                      ? "bg-signal text-primary-foreground border-signal font-bold shadow-sm"
                      : "border-transparent text-muted-foreground hover:bg-card/40 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FiLayers className="text-sm shrink-0" />
                    <span className="truncate">ALL LOADOUTS</span>
                  </div>
                  <span
                    className={`text-[10px] tabular-nums ${
                      selectedCatId === "all" ? "text-primary-foreground font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {TOTAL_TOOLS}
                  </span>
                </button>

                {/* Individual Categories */}
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCatId === cat.id;
                  const icon = CATEGORY_ICONS[cat.id] || <FiTerminal />;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCatId(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left font-mono text-xs transition-colors border ${
                        isSelected
                          ? "bg-signal text-primary-foreground border-signal font-bold shadow-sm"
                          : "border-transparent text-muted-foreground hover:bg-card/40 hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-sm shrink-0">{icon}</span>
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <span
                        className={`text-[10px] tabular-nums shrink-0 ml-2 ${
                          isSelected ? "text-primary-foreground font-bold" : "text-muted-foreground"
                        }`}
                      >
                        {String(cat.tools.length).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. CENTER COLUMN: TOOL RESULTS LIST (col-span-4 or 5) */}
            <div className="md:col-span-4 lg:col-span-4 flex flex-col border-r border-hairline bg-background min-h-0 overflow-hidden">
              <div className="p-3 border-b border-hairline/60 flex items-center justify-between font-mono text-[10px] text-muted-foreground tracking-wider uppercase bg-card/20">
                <span>
                  {filteredTools.length} {filteredTools.length === 1 ? "FUNCTION" : "FUNCTIONS"} MATCHED
                </span>
                {searchQuery && (
                  <span className="text-signal font-semibold">QUERY: &ldquo;{searchQuery}&rdquo;</span>
                )}
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-hairline/40">
                {filteredTools.length === 0 ? (
                  <div className="p-8 text-center font-mono text-xs text-muted-foreground">
                    <p>No functions found matching your query.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCatId("all");
                        setDepFilter("all");
                      }}
                      className="mt-3 text-signal font-semibold underline uppercase text-[10px]"
                    >
                      Reset all filters
                    </button>
                  </div>
                ) : (
                  filteredTools.map((t) => {
                    const isSelected = selectedTool?.name === t.name;
                    return (
                      <div
                        key={t.name}
                        onClick={() => setSelectedToolName(t.name)}
                        className={`p-3 cursor-pointer transition-all ${
                          isSelected
                            ? "bg-signal/15 border-l-2 border-l-signal pl-2.5"
                            : "hover:bg-card/40 hover:pl-3.5"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-foreground">
                            <span className="text-signal">$</span>
                            <span className={isSelected ? "text-signal" : ""}>{t.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {t.deps && (
                              <span className="border border-hairline bg-card/40 px-1.5 py-0.2 font-mono text-[8.5px] text-muted-foreground">
                                {t.deps}
                              </span>
                            )}
                            <span className="font-mono text-[9px] text-muted-foreground/60">
                              [{t.category.index}]
                            </span>
                          </div>
                        </div>
                        <p className="mt-1 font-mono text-[11px] text-muted-foreground line-clamp-1">
                          {t.desc}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* 3. RIGHT COLUMN: DEEP INSPECTOR & SANDBOX (col-span-5) */}
            <div className="hidden md:flex md:col-span-5 lg:col-span-5 flex-col bg-[#090909] overflow-y-auto p-5 space-y-5">
              {selectedTool ? (
                <>
                  {/* Header & Copy Button */}
                  <div className="border border-hairline bg-card/30 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-signal text-base">
                            {CATEGORY_ICONS[selectedTool.category.id] || <FiTerminal />}
                          </span>
                          <span className="font-mono text-[10px] font-bold tracking-widest text-signal uppercase">
                            LOADOUT [{selectedTool.category.index}] · {selectedTool.category.name}
                          </span>
                        </div>
                        <h3 className="display text-3xl text-foreground mt-1 flex items-center gap-2">
                          <span className="text-signal">$</span>
                          <span>{selectedTool.name}</span>
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(selectedTool.usage || selectedTool.name, `cmd-${selectedTool.name}`)
                        }
                        className="flex items-center gap-1.5 bg-signal px-3.5 py-2 font-mono text-[10.5px] font-bold tracking-wider text-primary-foreground uppercase hover:opacity-90 transition-opacity shrink-0"
                      >
                        {copiedId === `cmd-${selectedTool.name}` ? (
                          <>
                            <FiCheck className="text-xs" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <FiCopy className="text-xs" />
                            <span>COPY VERB</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="mt-3 font-mono text-xs leading-relaxed text-foreground/90 border-t border-hairline/60 pt-3">
                      {selectedTool.desc}
                    </p>
                  </div>

                  {/* Syntax & Usage */}
                  <div className="border border-hairline bg-card/20 p-4 space-y-2">
                    <div className="font-mono text-[10px] font-bold tracking-widest text-signal uppercase">
                      SYNTAX & USAGE
                    </div>
                    <div className="bg-background/80 border border-hairline p-3 font-mono text-xs text-foreground font-semibold flex items-center justify-between">
                      <code>
                        <span className="text-signal select-none mr-2">$</span>
                        {selectedTool.usage}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedTool.usage, `usage-${selectedTool.name}`)}
                        className="text-muted-foreground hover:text-signal font-mono text-[9.5px] uppercase"
                      >
                        {copiedId === `usage-${selectedTool.name}` ? "✓ COPIED" : "COPY"}
                      </button>
                    </div>
                  </div>

                  {/* Shell Sandbox / Interactive Preview */}
                  <div className="border border-hairline bg-[#050505] overflow-hidden">
                    <div className="flex items-center justify-between border-b border-hairline bg-card/40 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setShellTab("unix")}
                          className={`flex items-center gap-1 px-2 py-0.5 font-mono text-[9px] uppercase border transition-colors ${
                            shellTab === "unix"
                              ? "bg-signal text-primary-foreground font-bold border-signal"
                              : "border-hairline text-muted-foreground"
                          }`}
                        >
                          <SiGit className="text-[10px]" />
                          <span>Zsh / Bash</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setShellTab("pwsh")}
                          className={`flex items-center gap-1 px-2 py-0.5 font-mono text-[9px] uppercase border transition-colors ${
                            shellTab === "pwsh"
                              ? "bg-signal text-primary-foreground font-bold border-signal"
                              : "border-hairline text-muted-foreground"
                          }`}
                        >
                          <VscTerminalPowershell className="text-[10px]" />
                          <span>PowerShell</span>
                        </button>
                      </div>
                      <span className="font-mono text-[9px] text-phosphor tracking-wider">
                        100% PARITY
                      </span>
                    </div>

                    <div className="p-3.5 font-mono text-xs space-y-1.5 leading-relaxed bg-[#050505]">
                      <div className="text-foreground font-semibold">
                        <span className="text-signal mr-2 select-none">
                          {shellTab === "pwsh" ? "PS>" : "$"}
                        </span>
                        <span>{selectedTool.example || selectedTool.usage}</span>
                      </div>
                      {selectedTool.output?.map((line, idx) => (
                        <div
                          key={idx}
                          className={
                            line.kind === "ok"
                              ? "text-phosphor"
                              : line.kind === "warn"
                              ? "text-signal font-semibold"
                              : "text-muted-foreground"
                          }
                        >
                          {line.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements & Dependencies */}
                  <div className="border border-hairline bg-card/20 p-4">
                    <div className="font-mono text-[10px] font-bold tracking-widest text-signal uppercase mb-2">
                      DEPENDENCIES & INTEGRATION
                    </div>
                    {selectedTool.deps ? (
                      <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                        <span className="border border-signal/40 bg-signal/10 text-signal font-semibold px-2 py-0.5">
                          OPTIONAL: {selectedTool.deps}
                        </span>
                        <span>
                          Falls back to standard numbered menu if {selectedTool.deps} is missing.
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 font-mono text-xs text-phosphor">
                        <span className="border border-phosphor/40 bg-phosphor/10 px-2 py-0.5 font-semibold">
                          ZERO DEPENDENCIES
                        </span>
                        <span className="text-muted-foreground">
                          Pure shell builtin — runs anywhere with zero external CLI requirements.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Related Tools */}
                  {selectedTool.related && selectedTool.related.length > 0 && (
                    <div className="border border-hairline bg-card/20 p-4">
                      <div className="font-mono text-[10px] font-bold tracking-widest text-signal uppercase mb-2.5">
                        COMPLEMENTARY & RELATED COMMANDS
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedTool.related.map((relName) => (
                          <button
                            key={relName}
                            type="button"
                            onClick={() => setSelectedToolName(relName)}
                            className="flex items-center gap-1.5 border border-hairline bg-background/60 px-2.5 py-1 font-mono text-[10.5px] text-foreground hover:border-signal hover:text-signal transition-colors group"
                          >
                            <span className="text-signal select-none">$</span>
                            <span className="font-bold">{relName}</span>
                            <FiArrowRight className="text-[10px] text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>

          {/* ── BOTTOM STATUS BAR ── */}
          <div className="border-t border-hairline bg-card/60 px-4 py-2 flex flex-wrap items-center justify-between font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
            <div className="flex items-center gap-3">
              <span>ACTIVE: <code className="text-signal font-bold">{selectedTool?.name}</code></span>
              <span className="hidden sm:inline text-hairline">|</span>
              <span className="hidden sm:inline">100% PARITY ACROSS ZSH · BASH · POWERSHELL</span>
            </div>
            <div className="flex items-center gap-3">
              <span>PRESS <kbd className="border border-hairline px-1 py-0.2">ESC</kbd> TO RETURN</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
