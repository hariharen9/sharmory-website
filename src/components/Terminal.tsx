import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export type Line = { kind: "cmd" | "ok" | "out" | "dim"; text: string };

const COLOR: Record<Line["kind"], string> = {
  cmd: "text-foreground",
  ok: "text-phosphor",
  out: "text-muted-foreground",
  dim: "text-muted-foreground/60",
};

/** Types out a scripted terminal session once it scrolls into view. */
export function TerminalBlock({
  lines,
  title = "zsh — sharmory",
  speed = 16,
  className,
}: {
  lines: Line[];
  title?: string;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [partial, setPartial] = useState("");

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(lines.length);
      return;
    }
    let cancelled = false;
    let i = 0;

    const runLine = () => {
      if (cancelled || i >= lines.length) return;
      const line = lines[i]!;
      if (line.kind !== "cmd") {
        setCount(i + 1);
        i += 1;
        window.setTimeout(runLine, 170);
        return;
      }
      let c = 0;
      const tick = () => {
        if (cancelled) return;
        c += 1;
        setPartial(line.text.slice(0, c));
        if (c < line.text.length) {
          window.setTimeout(tick, speed);
        } else {
          setPartial("");
          setCount(i + 1);
          i += 1;
          window.setTimeout(runLine, 260);
        }
      };
      tick();
    };
    const start = window.setTimeout(runLine, 320);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
    };
  }, [inView, lines, reduced, speed]);

  const visible = lines.slice(0, count);
  const typing = count < lines.length && lines[count]?.kind === "cmd";

  return (
    <div
      ref={ref}
      className={`border border-hairline bg-card/70 backdrop-blur-sm ${className ?? ""}`}
    >
      <div className="flex items-center justify-between border-b border-hairline px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 border border-hairline" />
          <span className="h-2 w-2 border border-hairline" />
          <span className="h-2 w-2 border border-signal bg-signal/30" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          {title}
        </span>
        <span className="live-dot h-1.5 w-1.5 rounded-full bg-phosphor" />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed sm:text-[13px]">
        {visible.map((l, i) => (
          <div key={i} className={COLOR[l.kind]}>
            {l.kind === "cmd" ? <span className="mr-2 text-signal">$</span> : null}
            {l.text}
          </div>
        ))}
        {typing ? (
          <div className="text-foreground">
            <span className="mr-2 text-signal">$</span>
            {partial}
            <span className="caret ml-0.5" />
          </div>
        ) : null}
      </pre>
    </div>
  );
}
