import { useEffect, useState } from "react";
import { REPO } from "@/lib/armoury";
import { useSharmoryVersion } from "@/lib/useVersion";
import { MagneticLink } from "./primitives";
import { ThemeToggle } from "./ThemeToggle";
import { SiGithub } from "react-icons/si";

const LINKS = [
  { href: "#why", label: "WHY" },
  { href: "#origin", label: "ORIGIN" },
  { href: "#parity", label: "PARITY" },
  { href: "#arsenal", label: "ARSENAL" },
  { href: "#landscape", label: "LANDSCAPE" },
  { href: "#install", label: "INSTALL" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { version } = useSharmoryVersion();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-hairline bg-background/85 backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <img
            src="/apple-touch-icon.png"
            alt="Sharmory Logo"
            className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-105"
            width={32}
            height={32}
          />
          <span className="font-mono text-sm tracking-[0.28em]">SHARMORY</span>
          <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline">
            {version}
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline font-mono text-[11px] tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
          <MagneticLink
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-signal px-3.5 py-1.5 font-mono text-[11px] tracking-[0.22em] text-signal transition-colors hover:bg-signal hover:text-primary-foreground"
          >
            <SiGithub className="text-xs" />
            <span>GITHUB ↗</span>
          </MagneticLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle compact />
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="border border-hairline px-3 py-1.5 font-mono text-[11px] tracking-[0.2em]"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-hairline bg-background md:hidden">
          <div className="flex items-center justify-between border-b border-hairline px-5 py-3 font-mono text-xs">
            <span className="text-muted-foreground">COLOR SCHEME</span>
            <ThemeToggle />
          </div>
          {[...LINKS, { href: REPO, label: "GITHUB ↗", isGithub: true }].map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 border-b border-hairline px-5 py-4 font-mono text-xs tracking-[0.22em]"
            >
              {"isGithub" in l && <SiGithub className="text-signal text-sm" />}
              <span>{l.label}</span>
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
