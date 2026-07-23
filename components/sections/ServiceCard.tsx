"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ServiceIcon } from "@/components/brand/ServiceIcon";
import type { Service } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

export function ServiceCard({ service }: { service: Service }) {
  const reduce = useReducedMotion();
  const accentBg =
    service.accent === "coral"
      ? "from-coral/15 to-coral/5"
      : "from-twilight/12 to-twilight/4";
  const iconBg =
    service.accent === "coral"
      ? "bg-coral text-cloud"
      : "bg-twilight text-cloud";

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <Link
        href="#quote"
        className="relative flex h-full flex-col overflow-hidden rounded-xl bg-cloud border border-border-soft p-7 shadow-soft transition-all duration-300 group-hover:shadow-lift group-hover:border-coral/30"
      >
        <div
          aria-hidden
          className={cn(
            "absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br opacity-60 transition-all duration-500 group-hover:scale-110 group-hover:opacity-90",
            accentBg,
          )}
        />

        <div className="relative flex items-start justify-between mb-6">
          <div
            className={cn(
              "flex size-12 items-center justify-center rounded-md transition-transform duration-300 group-hover:rotate-[-6deg]",
              iconBg,
            )}
          >
            <ServiceIcon k={service.iconKey} className="size-6" />
          </div>
          <span className="text-xs uppercase tracking-[0.14em] text-ink-muted">
            {service.short}
          </span>
        </div>

        <h3 className="font-display text-2xl text-twilight mb-2 relative">
          {service.title}
        </h3>

        <p className="text-ink-muted text-sm leading-relaxed flex-1 text-pretty relative">
          {service.blurb}
        </p>

        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-coral relative">
          Get a quote
          <svg
            viewBox="0 0 16 16"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
