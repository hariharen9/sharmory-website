import { useEffect, useState } from "react";

export interface ColorTheme {
  id: string;
  name: string;
  tag: "DARK" | "LIGHT";
  accentName: string;
  dot: string;
  vars: Record<string, string>;
}

export const THEMES: ColorTheme[] = [
  {
    id: "amber-dark",
    name: "SIGNAL AMBER",
    tag: "DARK",
    accentName: "Amber / Gold",
    dot: "#FFB224",
    vars: {
      "--background": "oklch(0.145 0.004 100)",
      "--foreground": "oklch(0.955 0.004 100)",
      "--card": "oklch(0.185 0.005 100)",
      "--card-foreground": "oklch(0.955 0.004 100)",
      "--popover": "oklch(0.185 0.005 100)",
      "--popover-foreground": "oklch(0.955 0.004 100)",
      "--primary": "oklch(0.79 0.176 62)",
      "--primary-foreground": "oklch(0.16 0.02 60)",
      "--secondary": "oklch(0.24 0.005 100)",
      "--secondary-foreground": "oklch(0.955 0.004 100)",
      "--muted": "oklch(0.22 0.004 100)",
      "--muted-foreground": "oklch(0.65 0.006 100)",
      "--accent": "oklch(0.79 0.176 62)",
      "--accent-foreground": "oklch(0.16 0.02 60)",
      "--signal": "oklch(0.79 0.176 62)",
      "--phosphor": "oklch(0.84 0.17 152)",
      "--destructive": "oklch(0.63 0.22 27)",
      "--destructive-foreground": "oklch(0.98 0 0)",
      "--border": "oklch(0.3 0.005 100)",
      "--hairline": "oklch(0.26 0.004 100)",
      "--input": "oklch(0.3 0.005 100)",
      "--ring": "oklch(0.79 0.176 62)",
    },
  },
  {
    id: "lime-dark",
    name: "ACID LIME",
    tag: "DARK",
    accentName: "Neon Chartreuse",
    dot: "#D8FF38",
    vars: {
      "--background": "oklch(0.14 0.004 100)",
      "--foreground": "oklch(0.96 0.004 100)",
      "--card": "oklch(0.175 0.005 100)",
      "--card-foreground": "oklch(0.96 0.004 100)",
      "--popover": "oklch(0.175 0.005 100)",
      "--popover-foreground": "oklch(0.96 0.004 100)",
      "--primary": "oklch(0.92 0.22 125)",
      "--primary-foreground": "oklch(0.16 0.02 125)",
      "--secondary": "oklch(0.23 0.005 100)",
      "--secondary-foreground": "oklch(0.96 0.004 100)",
      "--muted": "oklch(0.21 0.004 100)",
      "--muted-foreground": "oklch(0.65 0.006 100)",
      "--accent": "oklch(0.92 0.22 125)",
      "--accent-foreground": "oklch(0.16 0.02 125)",
      "--signal": "oklch(0.92 0.22 125)",
      "--phosphor": "oklch(0.92 0.22 125)",
      "--destructive": "oklch(0.63 0.22 27)",
      "--destructive-foreground": "oklch(0.98 0 0)",
      "--border": "oklch(0.29 0.005 100)",
      "--hairline": "oklch(0.25 0.004 100)",
      "--input": "oklch(0.29 0.005 100)",
      "--ring": "oklch(0.92 0.22 125)",
    },
  },
  {
    id: "cyan-dark",
    name: "CYBER CYAN",
    tag: "DARK",
    accentName: "Ice Cyan",
    dot: "#00F0FF",
    vars: {
      "--background": "oklch(0.135 0.008 240)",
      "--foreground": "oklch(0.96 0.005 240)",
      "--card": "oklch(0.175 0.01 240)",
      "--card-foreground": "oklch(0.96 0.005 240)",
      "--popover": "oklch(0.175 0.01 240)",
      "--popover-foreground": "oklch(0.96 0.005 240)",
      "--primary": "oklch(0.86 0.17 210)",
      "--primary-foreground": "oklch(0.15 0.03 210)",
      "--secondary": "oklch(0.23 0.01 240)",
      "--secondary-foreground": "oklch(0.96 0.005 240)",
      "--muted": "oklch(0.21 0.008 240)",
      "--muted-foreground": "oklch(0.65 0.01 240)",
      "--accent": "oklch(0.86 0.17 210)",
      "--accent-foreground": "oklch(0.15 0.03 210)",
      "--signal": "oklch(0.86 0.17 210)",
      "--phosphor": "oklch(0.86 0.17 210)",
      "--destructive": "oklch(0.63 0.22 27)",
      "--destructive-foreground": "oklch(0.98 0 0)",
      "--border": "oklch(0.29 0.01 240)",
      "--hairline": "oklch(0.25 0.01 240)",
      "--input": "oklch(0.29 0.01 240)",
      "--ring": "oklch(0.86 0.17 210)",
    },
  },
  {
    id: "orange-dark",
    name: "SAFETY ORANGE",
    tag: "DARK",
    accentName: "Industrial Orange",
    dot: "#FF5500",
    vars: {
      "--background": "oklch(0.145 0.004 60)",
      "--foreground": "oklch(0.96 0.004 60)",
      "--card": "oklch(0.185 0.005 60)",
      "--card-foreground": "oklch(0.96 0.004 60)",
      "--popover": "oklch(0.185 0.005 60)",
      "--popover-foreground": "oklch(0.96 0.004 60)",
      "--primary": "oklch(0.68 0.24 40)",
      "--primary-foreground": "oklch(0.98 0.01 40)",
      "--secondary": "oklch(0.24 0.005 60)",
      "--secondary-foreground": "oklch(0.96 0.004 60)",
      "--muted": "oklch(0.22 0.004 60)",
      "--muted-foreground": "oklch(0.65 0.006 60)",
      "--accent": "oklch(0.68 0.24 40)",
      "--accent-foreground": "oklch(0.98 0.01 40)",
      "--signal": "oklch(0.68 0.24 40)",
      "--phosphor": "oklch(0.84 0.17 152)",
      "--destructive": "oklch(0.63 0.22 27)",
      "--destructive-foreground": "oklch(0.98 0 0)",
      "--border": "oklch(0.3 0.005 60)",
      "--hairline": "oklch(0.26 0.004 60)",
      "--input": "oklch(0.3 0.005 60)",
      "--ring": "oklch(0.68 0.24 40)",
    },
  },
  {
    id: "violet-dark",
    name: "ULTRAVIOLET",
    tag: "DARK",
    accentName: "Neon Violet",
    dot: "#B066FF",
    vars: {
      "--background": "oklch(0.135 0.01 290)",
      "--foreground": "oklch(0.96 0.005 290)",
      "--card": "oklch(0.175 0.015 290)",
      "--card-foreground": "oklch(0.96 0.005 290)",
      "--popover": "oklch(0.175 0.015 290)",
      "--popover-foreground": "oklch(0.96 0.005 290)",
      "--primary": "oklch(0.74 0.24 295)",
      "--primary-foreground": "oklch(0.98 0 0)",
      "--secondary": "oklch(0.23 0.015 290)",
      "--secondary-foreground": "oklch(0.96 0.005 290)",
      "--muted": "oklch(0.21 0.01 290)",
      "--muted-foreground": "oklch(0.65 0.01 290)",
      "--accent": "oklch(0.74 0.24 295)",
      "--accent-foreground": "oklch(0.98 0 0)",
      "--signal": "oklch(0.74 0.24 295)",
      "--phosphor": "oklch(0.84 0.17 152)",
      "--destructive": "oklch(0.63 0.22 27)",
      "--destructive-foreground": "oklch(0.98 0 0)",
      "--border": "oklch(0.29 0.015 290)",
      "--hairline": "oklch(0.26 0.015 290)",
      "--input": "oklch(0.29 0.015 290)",
      "--ring": "oklch(0.74 0.24 295)",
    },
  },
  {
    id: "emerald-dark",
    name: "PHOSPHOR MATRIX",
    tag: "DARK",
    accentName: "CRT Green",
    dot: "#3BF586",
    vars: {
      "--background": "oklch(0.13 0.008 150)",
      "--foreground": "oklch(0.96 0.005 150)",
      "--card": "oklch(0.17 0.01 150)",
      "--card-foreground": "oklch(0.96 0.005 150)",
      "--popover": "oklch(0.17 0.01 150)",
      "--popover-foreground": "oklch(0.96 0.005 150)",
      "--primary": "oklch(0.86 0.22 150)",
      "--primary-foreground": "oklch(0.15 0.04 150)",
      "--secondary": "oklch(0.23 0.01 150)",
      "--secondary-foreground": "oklch(0.96 0.005 150)",
      "--muted": "oklch(0.21 0.008 150)",
      "--muted-foreground": "oklch(0.65 0.01 150)",
      "--accent": "oklch(0.86 0.22 150)",
      "--accent-foreground": "oklch(0.15 0.04 150)",
      "--signal": "oklch(0.86 0.22 150)",
      "--phosphor": "oklch(0.86 0.22 150)",
      "--destructive": "oklch(0.63 0.22 27)",
      "--destructive-foreground": "oklch(0.98 0 0)",
      "--border": "oklch(0.29 0.01 150)",
      "--hairline": "oklch(0.25 0.01 150)",
      "--input": "oklch(0.29 0.01 150)",
      "--ring": "oklch(0.86 0.22 150)",
    },
  },
  {
    id: "paper-light",
    name: "TECHNICAL PARCHMENT",
    tag: "LIGHT",
    accentName: "Burnt Orange",
    dot: "#E65100",
    vars: {
      "--background": "oklch(0.975 0.005 85)",
      "--foreground": "oklch(0.15 0.005 85)",
      "--card": "oklch(0.935 0.007 85)",
      "--card-foreground": "oklch(0.15 0.005 85)",
      "--popover": "oklch(0.935 0.007 85)",
      "--popover-foreground": "oklch(0.15 0.005 85)",
      "--primary": "oklch(0.58 0.22 45)",
      "--primary-foreground": "oklch(0.99 0 0)",
      "--secondary": "oklch(0.90 0.008 85)",
      "--secondary-foreground": "oklch(0.15 0.005 85)",
      "--muted": "oklch(0.91 0.007 85)",
      "--muted-foreground": "oklch(0.42 0.008 85)",
      "--accent": "oklch(0.58 0.22 45)",
      "--accent-foreground": "oklch(0.99 0 0)",
      "--signal": "oklch(0.58 0.22 45)",
      "--phosphor": "oklch(0.52 0.18 145)",
      "--destructive": "oklch(0.55 0.22 25)",
      "--destructive-foreground": "oklch(0.99 0 0)",
      "--border": "oklch(0.78 0.008 85)",
      "--hairline": "oklch(0.85 0.007 85)",
      "--input": "oklch(0.78 0.008 85)",
      "--ring": "oklch(0.58 0.22 45)",
    },
  },
  {
    id: "blueprint-light",
    name: "TECHNICAL BLUEPRINT",
    tag: "LIGHT",
    accentName: "Cobalt Blue",
    dot: "#0052FF",
    vars: {
      "--background": "oklch(0.985 0.002 240)",
      "--foreground": "oklch(0.14 0.006 240)",
      "--card": "oklch(0.94 0.005 240)",
      "--card-foreground": "oklch(0.14 0.006 240)",
      "--popover": "oklch(0.94 0.005 240)",
      "--popover-foreground": "oklch(0.14 0.006 240)",
      "--primary": "oklch(0.52 0.23 260)",
      "--primary-foreground": "oklch(0.99 0 0)",
      "--secondary": "oklch(0.90 0.006 240)",
      "--secondary-foreground": "oklch(0.14 0.006 240)",
      "--muted": "oklch(0.91 0.005 240)",
      "--muted-foreground": "oklch(0.42 0.008 240)",
      "--accent": "oklch(0.52 0.23 260)",
      "--accent-foreground": "oklch(0.99 0 0)",
      "--signal": "oklch(0.52 0.23 260)",
      "--phosphor": "oklch(0.52 0.18 145)",
      "--destructive": "oklch(0.55 0.22 25)",
      "--destructive-foreground": "oklch(0.99 0 0)",
      "--border": "oklch(0.8 0.006 240)",
      "--hairline": "oklch(0.86 0.005 240)",
      "--input": "oklch(0.8 0.006 240)",
      "--ring": "oklch(0.52 0.23 260)",
    },
  },
  {
    id: "mono-light",
    name: "STARK MONOCHROME",
    tag: "LIGHT",
    accentName: "Charcoal Ink",
    dot: "#181818",
    vars: {
      "--background": "oklch(0.99 0 0)",
      "--foreground": "oklch(0.12 0 0)",
      "--card": "oklch(0.95 0 0)",
      "--card-foreground": "oklch(0.12 0 0)",
      "--popover": "oklch(0.95 0 0)",
      "--popover-foreground": "oklch(0.12 0 0)",
      "--primary": "oklch(0.18 0 0)",
      "--primary-foreground": "oklch(0.99 0 0)",
      "--secondary": "oklch(0.92 0 0)",
      "--secondary-foreground": "oklch(0.12 0 0)",
      "--muted": "oklch(0.92 0 0)",
      "--muted-foreground": "oklch(0.44 0 0)",
      "--accent": "oklch(0.18 0 0)",
      "--accent-foreground": "oklch(0.99 0 0)",
      "--signal": "oklch(0.18 0 0)",
      "--phosphor": "oklch(0.48 0.16 145)",
      "--destructive": "oklch(0.55 0.22 25)",
      "--destructive-foreground": "oklch(0.99 0 0)",
      "--border": "oklch(0.78 0 0)",
      "--hairline": "oklch(0.86 0 0)",
      "--input": "oklch(0.78 0 0)",
      "--ring": "oklch(0.18 0 0)",
    },
  },
];

const STORAGE_KEY = "sharmory-color-theme";

export function applyTheme(theme: ColorTheme) {
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
  root.setAttribute("data-theme", theme.id);
  if (theme.tag === "DARK") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
  }
}

export function useTheme() {
  const [themeId, setThemeId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && THEMES.some((t) => t.id === saved)) {
        return saved;
      }
    }
    return "amber-dark";
  });

  const currentTheme: ColorTheme = THEMES.find((t) => t.id === themeId) ?? THEMES[0]!;

  useEffect(() => {
    applyTheme(currentTheme);
    try {
      localStorage.setItem(STORAGE_KEY, currentTheme.id);
    } catch {
      // ignore
    }
  }, [currentTheme]);

  const setTheme = (id: string) => {
    if (THEMES.some((t) => t.id === id)) {
      setThemeId(id);
    }
  };

  const cycleTheme = () => {
    const currentIndex = THEMES.findIndex((t) => t.id === themeId);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex] ?? THEMES[0]!;
    setThemeId(nextTheme.id);
  };

  return {
    themeId,
    currentTheme,
    setTheme,
    cycleTheme,
    themes: THEMES,
  };
}
