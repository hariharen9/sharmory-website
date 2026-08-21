import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  animate,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* ---------- scroll progress rail ---------- */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-signal"
    />
  );
}

/* ---------- reveal ---------- */

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const on = reduced || inView;
  return (
    <motion.div
      ref={ref}
      className={className}
      {...(reduced
        ? {}
        : {
            initial: { opacity: 0, y },
            animate: on ? { opacity: 1, y: 0 } : { opacity: 0, y },
          })}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- masked line reveal for big type ---------- */

export function MaskLine({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <span ref={ref} className={cn("block overflow-hidden", className)}>
      <motion.span
        className="block"
        {...(reduced
          ? {}
          : { initial: { y: "110%" }, animate: { y: inView ? "0%" : "110%" } })}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ---------- magnetic button ---------- */

type MagneticProps = ComponentPropsWithoutRef<"a"> & { strength?: number };

export function MagneticLink({
  strength = 14,
  className,
  children,
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18 });
  const y = useSpring(my, { stiffness: 220, damping: 18 });

  return (
    <motion.a
      ref={ref}
      {...(reduced ? {} : { style: { x, y } })}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
        my.set(((e.clientY - r.top) / r.height - 0.5) * strength);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className={className}
      {...(rest as object)}
    >
      {children}
    </motion.a>
  );
}

/* ---------- number counter ---------- */

export function Counter({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(to);
      return;
    }
    const c = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, to, reduced]);

  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}

/* ---------- section header ---------- */

export function SectionHead({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-4">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-signal">[{index}]</span>
        <h2 className="display text-2xl sm:text-3xl">{title}</h2>
      </div>
      {note ? <span className="label">{note}</span> : null}
    </div>
  );
}

/* ---------- ticker ---------- */

export type TickerItem =
  | string
  | {
      label: string;
      icon?: ReactNode;
      color?: string;
    };

export function Ticker({ items }: { items: (string | TickerItem)[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-hairline bg-card/40 py-3">
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
        {row.map((item, i) => {
          const isObj = typeof item === "object" && item !== null;
          const label = isObj ? item.label : item;
          const icon = isObj ? item.icon : null;
          const color = isObj ? item.color : undefined;

          return (
            <span
              key={i}
              className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase"
            >
              {icon && (
                <span className="text-sm shrink-0" style={{ color: color || "inherit" }}>
                  {icon}
                </span>
              )}
              <span>{label}</span>
              <span className="text-signal/50 ml-5 select-none">◆</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- parallax wrapper ---------- */

export function Parallax({
  children,
  amount = 60,
  className,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <div ref={ref} className={className}>
      <motion.div {...(reduced ? {} : { style: { y } })}>{children}</motion.div>
    </div>
  );
}
