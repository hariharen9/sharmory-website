import { useEffect, useState } from "react";
import { REPO } from "@/lib/armoury";
import { MagneticLink } from "./primitives";

const LINKS = [
  { href: "#why", label: "WHY" },
  { href: "#origin", label: "ORIGIN" },
  { href: "#arsenal", label: "ARSENAL" },
  { href: "#featured", label: "FEATURED" },
  { href: "#landscape", label: "LANDSCAPE" },
  { href: "#install", label: "INSTALL" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

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
          <span className="grid h-6 w-6 place-items-center border border-signal font-mono text-[11px] text-signal transition-colors group-hover:bg-signal group-hover:text-primary-foreground">
            S
          </span>
          <span className="font-mono text-sm tracking-[0.28em]">SHARMORY</span>
          <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline">
            v1.x
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline font-mono text-[11px] tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <MagneticLink
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="border border-signal px-4 py-1.5 font-mono text-[11px] tracking-[0.22em] text-signal transition-colors hover:bg-signal hover:text-primary-foreground"
          >
            GITHUB ↗
          </MagneticLink>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="border border-hairline px-3 py-1.5 font-mono text-[11px] tracking-[0.2em] md:hidden"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-hairline bg-background md:hidden">
          {[...LINKS, { href: REPO, label: "GITHUB ↗" }].map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-hairline px-5 py-4 font-mono text-xs tracking-[0.22em]"
            >
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
