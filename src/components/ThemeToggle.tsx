import { useState, useRef, useEffect } from "react";
import { useTheme, THEMES } from "@/lib/theme";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { currentTheme, themeId, setTheme, cycleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentIndex = THEMES.findIndex((t) => t.id === themeId);

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <div className="flex items-center border border-hairline bg-card/60 transition-colors hover:border-signal">
        {/* Main Cycle Button */}
        <button
          type="button"
          onClick={cycleTheme}
          title={`Current: ${currentTheme.name} (${currentTheme.tag}). Click to cycle themes.`}
          aria-label="Cycle color theme"
          className="group flex items-center gap-2 px-2.5 py-1 font-mono text-[11px] tracking-[0.16em] text-foreground uppercase transition-all"
        >
          <span
            className="h-2 w-2 rounded-full ring-1 ring-white/20 transition-transform group-hover:scale-125"
            style={{ backgroundColor: currentTheme.dot }}
          />
          {!compact && (
            <span className="hidden sm:inline font-semibold text-muted-foreground group-hover:text-foreground">
              {currentTheme.name}
            </span>
          )}
          <span className="text-[9px] text-muted-foreground/80 font-mono">
            {currentIndex + 1}/{THEMES.length}
          </span>
          <span className="text-signal transition-transform group-hover:rotate-180">⇄</span>
        </button>

        {/* Dropdown open trigger */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen((v) => !v)}
          }
          aria-label="Open theme palette selector"
          className="border-l border-hairline px-1.5 py-1 text-[10px] text-muted-foreground hover:text-signal hover:bg-signal/10 transition-colors"
        >
          ▾
        </button>
      </div>

      {/* Palette Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 border border-hairline bg-popover/95 p-2 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-hairline pb-1.5 px-1 font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
            <span>SELECT SCHEME</span>
            <span className="text-[8px] text-signal font-semibold">9 PALETTES</span>
          </div>

          <div className="mt-1.5 flex flex-col gap-1 max-h-72 overflow-y-auto">
            {THEMES.map((theme, idx) => {
              const isSelected = theme.id === themeId;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    setTheme(theme.id);
                    setDropdownOpen(false);
                  }}
                  className={`flex items-center justify-between px-2 py-1.5 font-mono text-[10.5px] tracking-wider text-left transition-all ${
                    isSelected
                      ? "border border-signal bg-signal/15 text-foreground font-bold"
                      : "border border-transparent hover:bg-card hover:border-hairline text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0 ring-1 ring-black/20"
                      style={{ backgroundColor: theme.dot }}
                    />
                    <span className="truncate">{theme.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-[8.5px]">
                    <span
                      className={`px-1 py-0.2 rounded-xs border text-[8px] ${
                        theme.tag === "DARK"
                          ? "border-hairline text-muted-foreground"
                          : "border-signal text-signal font-bold"
                      }`}
                    >
                      {theme.tag}
                    </span>
                    <span className="text-muted-foreground/60">{idx + 1}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
