"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";

type Props = {
  flip?: boolean;
  className?: string;
  fill?: string;
};

export function CloudDivider({
  flip = false,
  className,
  fill = "var(--color-sand-soft)",
}: Props) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className={cn(
        "relative w-full overflow-hidden leading-[0]",
        flip && "rotate-180",
        className,
      )}
    >
      <motion.svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-[120%] -ml-[10%] h-[80px] md:h-[120px]"
        animate={reduce ? undefined : { x: [-12, 12, -12] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M0,80 C120,40 240,100 360,70 C480,40 600,90 720,70 C840,50 960,100 1080,80 C1200,60 1320,90 1440,60 L1440,120 L0,120 Z"
          fill={fill}
        />
      </motion.svg>
    </div>
  );
}
