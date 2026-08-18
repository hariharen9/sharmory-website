import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export type Line = { kind: "cmd" | "ok" | "out" | "dim"; text: string };

const COLOR: Record<Line["kind"], string> = {
  cmd: "text-foreground",
  ok: "text-phosphor",
  out: "text-muted-foreground",
  dim: "text-muted-foreground/60",
};

/** Types out a scripted terminal session with replay, tab headers, and shell prefix support. */
export function TerminalBlock({
  lines,
  title = "zsh — sharmory",
  speed = 14,
  promptPrefix = "$",
  className,
  onReplay,
}: {
  lines: Line[];
  title?: string;
  speed?: number;
  promptPrefix?: string;
  className?: string;
  onReplay?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [partial, setPartial] = useState("");
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(lines.length);
      return;
    }
    setCount(0);
    setPartial("");
    let cancelled = false;
    let i = 0;

    const runLine = () => {
      if (cancelled || i >= lines.length) return;
      const line = lines[i]!;
      if (line.kind !== "cmd") {
        setCount(i + 1);
        i += 1;
        window.setTimeout(runLine, 140);
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
          window.setTimeout(runLine, 220);
        }
      };
      tick();
    };
    const start = window.setTimeout(runLine, 280);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
    };
  }, [inView, lines, reduced, speed, replayKey]);

  const visible = lines.slice(0, count);
  const typing = count < lines.length && lines[count]?.kind === "cmd";

  const handleManualReplay = () => {
    setReplayKey((k) => k + 1);
    if (onReplay) onReplay();
  };

  return (
    <div
      ref={ref}
      className={`w-full max-w-full min-w-0 overflow-hidden border border-hairline bg-card/85 shadow-2xl shadow-signal/5 backdrop-blur-md transition-all ${className ?? ""}`}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-hairline px-2.5 sm:px-3 py-1.5 sm:py-2 min-w-0">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="h-2 w-2 rounded-full border border-hairline bg-secondary/80" />
          <span className="h-2 w-2 rounded-full border border-hairline bg-secondary/80" />
          <span className="h-2 w-2 rounded-full border border-signal/60 bg-signal/30" />
        </div>
        <span className="truncate px-2 font-mono text-[9.5px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.16em] text-muted-foreground uppercase">
          {title}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleManualReplay}
            className="font-mono text-[9px] tracking-wider text-muted-foreground transition-colors hover:text-signal"
            title="Replay terminal session"
          >
            ↺ REPLAY
          </button>
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-phosphor" />
        </div>
      </div>

      {/* Terminal Screen */}
      <pre className="min-h-[155px] sm:min-h-[168px] w-full max-w-full p-3 sm:p-3.5 font-mono text-[11px] leading-relaxed sm:text-[12.5px] whitespace-pre-wrap break-all sm:whitespace-pre sm:break-normal overflow-x-hidden sm:overflow-x-auto">
        {visible.map((l, i) => (
          <div key={i} className={`${COLOR[l.kind]} py-0.5`}>
            {l.kind === "cmd" ? (
              <span className="mr-2 font-bold text-signal">{promptPrefix}</span>
            ) : null}
            {l.text}
          </div>
        ))}
        {typing ? (
          <div className="py-0.5 text-foreground">
            <span className="mr-2 font-bold text-signal">{promptPrefix}</span>
            {partial}
            <span className="caret ml-0.5" />
          </div>
        ) : count >= lines.length ? (
          <div className="pt-1.5 text-muted-foreground/60">
            <span className="mr-2 font-bold text-signal">{promptPrefix}</span>
            <span className="caret" />
          </div>
        ) : null}
      </pre>
    </div>
  );
}
