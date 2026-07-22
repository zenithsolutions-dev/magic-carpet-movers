"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";

/**
 * Trust / stat counter bar — sits directly under the hero.
 * NOTE: replace these figures with the company's real numbers when available.
 */
type Stat = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  sub: string;
};

const stats: Stat[] = [
  { value: 4.9, decimals: 1, label: "Google rating", sub: "from real customer reviews" },
  { value: 2000, suffix: "+", label: "Moves completed", sub: "homes & offices relocated" },
  { value: 10, suffix: "+", label: "Years moving", sub: "serving Greater Montreal" },
  { value: 100, suffix: "%", label: "Licensed & insured", sub: "your belongings, protected" },
];

export function StatBar() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  // Safety net: never leave the figures stuck at 0 if the observer never fires.
  const [fallback, setFallback] = React.useState(false);
  React.useEffect(() => {
    const t = window.setTimeout(() => setFallback(true), 2600);
    return () => window.clearTimeout(t);
  }, []);
  const run = inView || fallback;

  return (
    <section
      aria-label="Track record"
      className="relative z-10 -mt-px border-y border-border bg-cloud"
    >
      <Container>
        <div
          ref={ref}
          className="grid grid-cols-2 gap-y-8 gap-x-4 py-10 md:grid-cols-4 md:py-12"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center md:border-r md:border-border last:border-r-0 px-2"
            >
              <div className="font-poster text-4xl md:text-5xl text-twilight leading-none tabular-nums">
                <Counter target={s.value} decimals={s.decimals} suffix={s.suffix} run={run} delay={i * 120} />
              </div>
              <div className="mt-2 text-sm font-semibold text-twilight">{s.label}</div>
              <div className="mt-0.5 text-xs text-ink-muted">{s.sub}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Counter({
  target,
  decimals = 0,
  suffix = "",
  run,
  delay = 0,
}: {
  target: number;
  decimals?: number;
  suffix?: string;
  run: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    if (!run) return;
    if (reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const duration = 1400;
    const timer = window.setTimeout(() => {
      const tick = (t: number) => {
        if (!start) start = t;
        const p = Math.min((t - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(target * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
        else setVal(target);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    // Hard guarantee: even if rAF is paused (e.g. background tab), show the
    // final figure rather than leaving it at zero.
    const guarantee = window.setTimeout(() => setVal(target), delay + duration + 400);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(guarantee);
      cancelAnimationFrame(raf);
    };
  }, [run, target, delay, reduce]);

  const display =
    decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();

  return (
    <span>
      {display}
      <span className="text-coral">{suffix}</span>
    </span>
  );
}
