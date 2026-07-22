"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";

type Item = { id?: string; q: string; a: string };

export function Accordion({
  items,
  className,
}: {
  items: Item[];
  className?: string;
}) {
  const [open, setOpen] = React.useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const headingId = `acc-h-${i}`;
        const panelId = `acc-p-${i}`;
        return (
          <li
            key={i}
            className={cn(
              "rounded-lg border bg-cloud transition-colors",
              isOpen ? "border-coral/40 shadow-soft" : "border-border-soft",
            )}
          >
            <h3>
              <button
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >
                <span className="font-display text-lg text-twilight">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "flex size-8 items-center justify-center rounded-pill transition-all",
                    isOpen ? "bg-coral text-cloud rotate-45" : "bg-sand text-twilight",
                  )}
                >
                  <svg viewBox="0 0 16 16" className="size-4">
                    <path
                      d="M8 3v10M3 8h10"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-ink-muted leading-relaxed text-pretty">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
