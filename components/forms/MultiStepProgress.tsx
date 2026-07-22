"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";

type Props = {
  current: number;
  total: number;
  labels?: string[];
  className?: string;
};

export function MultiStepProgress({
  current,
  total,
  labels,
  className,
}: Props) {
  const reduce = useReducedMotion();
  const pct = (current / Math.max(total - 1, 1)) * 100;

  return (
    <div
      className={cn("w-full", className)}
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Step ${current + 1} of ${total}`}
    >
      <div className="relative h-2 mb-3">
        <div
          aria-hidden
          className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-px border-t-2 border-dashed border-twilight/15"
        />
        <motion.div
          aria-hidden
          className="absolute left-0 top-1/2 -translate-y-1/2 h-px border-t-2 border-dashed border-coral"
          style={{ width: `calc(${pct}% + 0.5rem)` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          aria-hidden
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-coral"
          animate={{ left: `calc(${pct}% )` }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 120, damping: 18 }
          }
        >
          <svg
            viewBox="0 0 24 24"
            className="size-6 drop-shadow-[0_4px_8px_rgba(30,107,255,0.5)]"
          >
            <defs>
              <linearGradient id="dot-carpet" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1E6BFF" />
                <stop offset="100%" stopColor="#0B4ED8" />
              </linearGradient>
            </defs>
            <ellipse
              cx="12"
              cy="14"
              rx="9"
              ry="3.5"
              fill="url(#dot-carpet)"
              stroke="#0C1A3E"
              strokeWidth="0.5"
            />
            <circle cx="12" cy="13" r="1.4" fill="#E9F0FF" />
          </svg>
        </motion.span>
      </div>

      <div className="flex justify-between text-[11px] uppercase tracking-[0.14em]">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "transition-colors font-medium",
              i <= current ? "text-coral" : "text-ink-muted/60",
            )}
          >
            {labels?.[i] ?? `Step ${i + 1}`}
          </span>
        ))}
      </div>
    </div>
  );
}
