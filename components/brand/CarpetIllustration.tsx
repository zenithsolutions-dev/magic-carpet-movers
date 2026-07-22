"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";

type Props = {
  className?: string;
  variant?: "hero" | "compact";
};

/**
 * Stylized magic carpet with stacked moving boxes, Persian-rug detailing,
 * sparkle trail, and a soft glow. Shapes are sized inside a 600×420 viewBox.
 */
export function CarpetIllustration({ className, variant = "hero" }: Props) {
  const reduce = useReducedMotion();
  const float = reduce ? undefined : { y: [0, -10, 0], rotate: [-0.6, 0.8, -0.6] };

  return (
    <motion.svg
      viewBox="0 0 600 420"
      className={cn("w-full h-auto", className)}
      role="img"
      aria-label="A magic carpet carrying stacked moving boxes through a starry sky"
      animate={float}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        {/* main carpet gradient — twilight w/ coral highlight */}
        <linearGradient id="carpet-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E6BFF" />
          <stop offset="40%" stopColor="#0B4ED8" />
          <stop offset="100%" stopColor="#0C1A3E" />
        </linearGradient>
        {/* underside (when curl shows) */}
        <linearGradient id="carpet-underside" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0C1A3E" />
          <stop offset="100%" stopColor="#060F27" />
        </linearGradient>
        {/* coral border stripe */}
        <linearGradient id="carpet-border" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5590FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#E9F0FF" stopOpacity="1" />
          <stop offset="100%" stopColor="#5590FF" stopOpacity="0" />
        </linearGradient>
        {/* glow underneath */}
        <radialGradient id="carpet-glow" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="#1E6BFF" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#1E6BFF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1E6BFF" stopOpacity="0" />
        </radialGradient>
        {/* cardboard boxes */}
        <linearGradient id="box-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E5C29A" />
          <stop offset="100%" stopColor="#B68957" />
        </linearGradient>
        <linearGradient id="box-front-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D7AF82" />
          <stop offset="100%" stopColor="#A47A4B" />
        </linearGradient>
        <linearGradient id="box-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9C7140" />
          <stop offset="100%" stopColor="#C49568" />
        </linearGradient>
        {/* shadow blur */}
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* glow underneath */}
      <ellipse cx="310" cy="370" rx="240" ry="32" fill="url(#carpet-glow)" />

      {/* drifting shadow */}
      <motion.ellipse
        cx="310"
        cy="380"
        rx="200"
        ry="12"
        fill="#0C1A3E"
        opacity="0.18"
        filter="url(#soft-shadow)"
        animate={
          reduce ? undefined : { rx: [200, 178, 200], opacity: [0.18, 0.1, 0.18] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* sparkle / dust trail behind (left side) */}
      {variant === "hero" &&
        [
          { x: 60, y: 280, r: 2.2, d: 0 },
          { x: 30, y: 300, r: 1.4, d: 0.6 },
          { x: 90, y: 260, r: 1.8, d: 1.2 },
          { x: 12, y: 340, r: 1.2, d: 1.8 },
          { x: 110, y: 320, r: 2, d: 2.4 },
          { x: 50, y: 360, r: 1.5, d: 0.3 },
        ].map((s, i) => (
          <motion.circle
            key={`trail-${i}`}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#5590FF"
            animate={
              reduce
                ? undefined
                : {
                    opacity: [0, 0.85, 0],
                    cx: [s.x, s.x - 30, s.x - 60],
                  }
            }
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeOut",
              delay: s.d,
            }}
          />
        ))}

      {/* === Carpet === */}
      {/* tassels left */}
      <g>
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.line
            key={`tl-${i}`}
            x1={92 + i * 3}
            y1={282 + Math.sin(i) * 2}
            x2={68 + i * 2.5}
            y2={322 + (i % 2) * 5}
            stroke="#0C1A3E"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={
              reduce
                ? undefined
                : { x2: [68 + i * 2.5, 64 + i * 2.5, 68 + i * 2.5] }
            }
            transition={{
              duration: 3 + (i % 3) * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </g>
      {/* tassels right */}
      <g>
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.line
            key={`tr-${i}`}
            x1={508 - i * 3}
            y1={282 + Math.sin(i + 2) * 2}
            x2={532 - i * 2.5}
            y2={322 + (i % 2) * 5}
            stroke="#0C1A3E"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={
              reduce
                ? undefined
                : { x2: [532 - i * 2.5, 536 - i * 2.5, 532 - i * 2.5] }
            }
            transition={{
              duration: 3 + (i % 3) * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1 + 0.4,
            }}
          />
        ))}
      </g>

      {/* carpet body — flowing wave */}
      <motion.path
        d="M 90,280
           C 200,235 410,310 510,275
           L 528,318
           C 420,355 200,288 72,330 Z"
        fill="url(#carpet-body)"
        animate={
          reduce
            ? undefined
            : {
                d: [
                  "M 90,280 C 200,235 410,310 510,275 L 528,318 C 420,355 200,288 72,330 Z",
                  "M 90,284 C 200,246 410,300 510,272 L 528,318 C 420,360 200,283 72,332 Z",
                  "M 90,280 C 200,235 410,310 510,275 L 528,318 C 420,355 200,288 72,330 Z",
                ],
              }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* underside curl on right edge */}
      <path
        d="M 510,275 Q 540,270 528,318 Z"
        fill="url(#carpet-underside)"
        opacity="0.85"
      />

      {/* top stripe highlight */}
      <path
        d="M 90,280 C 200,235 410,310 510,275"
        fill="none"
        stroke="url(#carpet-border)"
        strokeWidth="2.5"
      />

      {/* persian-rug medallion (center) */}
      <g opacity="0.92">
        <ellipse
          cx="300"
          cy="287"
          rx="36"
          ry="9"
          fill="#0C1A3E"
          opacity="0.45"
        />
        <ellipse
          cx="300"
          cy="287"
          rx="28"
          ry="6.5"
          fill="none"
          stroke="#E9F0FF"
          strokeWidth="0.8"
        />
        <path
          d="M 285,287 L 300,281 L 315,287 L 300,293 Z"
          fill="#E9F0FF"
        />
        <circle cx="300" cy="287" r="1.6" fill="#1E6BFF" />
      </g>

      {/* small repeating diamonds along the carpet */}
      {[180, 220, 260, 340, 380, 420].map((x, i) => (
        <g key={`diamond-${x}`} opacity="0.85">
          <motion.path
            d={`M ${x},${282 + Math.sin(i) * 1.5} l 5,7 l -5,6 l -5,-6 z`}
            fill="#E9F0FF"
            animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
          />
        </g>
      ))}

      {/* corner ornaments */}
      <g opacity="0.7" fill="#E9F0FF">
        <circle cx="120" cy="295" r="1.4" />
        <circle cx="135" cy="290" r="1.4" />
        <circle cx="465" cy="290" r="1.4" />
        <circle cx="480" cy="295" r="1.4" />
      </g>

      {/* === Stacked moving boxes === */}
      {/* shadow under boxes */}
      <ellipse cx="320" cy="278" rx="120" ry="6" fill="#0C1A3E" opacity="0.25" />

      {/* Box 1 — bottom, largest. Centered around x=300, y=232 */}
      <g>
        {/* side face */}
        <path
          d="M 364,232 L 384,222 L 384,272 L 364,282 Z"
          fill="url(#box-side)"
        />
        {/* front face */}
        <rect
          x="232"
          y="232"
          width="132"
          height="50"
          fill="url(#box-front)"
          stroke="#7C5530"
          strokeWidth="0.6"
        />
        {/* top edge */}
        <path
          d="M 232,232 L 252,222 L 384,222 L 364,232 Z"
          fill="#E8C99A"
          stroke="#7C5530"
          strokeWidth="0.6"
        />
        {/* tape stripe across the top */}
        <rect x="232" y="246" width="132" height="6" fill="#E9F0FF" opacity="0.7" />
        {/* center fold line on top */}
        <line
          x1="298"
          y1="222"
          x2="298"
          y2="232"
          stroke="#7C5530"
          strokeWidth="0.8"
        />
        {/* small label rectangle */}
        <rect
          x="248"
          y="258"
          width="36"
          height="14"
          fill="#F5F8FF"
          stroke="#7C5530"
          strokeWidth="0.4"
          rx="1"
        />
        <line x1="252" y1="263" x2="280" y2="263" stroke="#9C7140" strokeWidth="0.5" />
        <line x1="252" y1="266" x2="278" y2="266" stroke="#9C7140" strokeWidth="0.5" />
        <line x1="252" y1="269" x2="274" y2="269" stroke="#9C7140" strokeWidth="0.5" />
      </g>

      {/* Box 2 — middle. Slightly offset, smaller. */}
      <g>
        {/* side */}
        <path
          d="M 332,182 L 350,172 L 350,222 L 332,222 Z"
          fill="url(#box-side)"
        />
        {/* front */}
        <rect
          x="244"
          y="182"
          width="88"
          height="40"
          fill="url(#box-front-dark)"
          stroke="#7C5530"
          strokeWidth="0.6"
        />
        {/* top */}
        <path
          d="M 244,182 L 262,172 L 350,172 L 332,182 Z"
          fill="#D7AF82"
          stroke="#7C5530"
          strokeWidth="0.6"
        />
        {/* tape */}
        <rect x="244" y="194" width="88" height="5" fill="#E9F0FF" opacity="0.65" />
        {/* "FRAGILE" stamp suggestion */}
        <rect
          x="282"
          y="204"
          width="40"
          height="12"
          fill="none"
          stroke="#1E6BFF"
          strokeWidth="0.8"
          rx="1"
          opacity="0.85"
        />
        <text
          x="302"
          y="213"
          fontSize="6.5"
          fontFamily="var(--font-anton), 'Arial Narrow', sans-serif"
          fontStyle="normal"
          fill="#1E6BFF"
          textAnchor="middle"
          opacity="0.95"
        >
          FRAGILE
        </text>
      </g>

      {/* Box 3 — top, smallest. */}
      <g>
        {/* side */}
        <path
          d="M 308,142 L 322,134 L 322,172 L 308,172 Z"
          fill="url(#box-side)"
        />
        {/* front */}
        <rect
          x="252"
          y="142"
          width="56"
          height="30"
          fill="url(#box-front)"
          stroke="#7C5530"
          strokeWidth="0.6"
        />
        {/* top */}
        <path
          d="M 252,142 L 266,134 L 322,134 L 308,142 Z"
          fill="#E8C99A"
          stroke="#7C5530"
          strokeWidth="0.6"
        />
        {/* twine wrap */}
        <line
          x1="280"
          y1="142"
          x2="280"
          y2="172"
          stroke="#7C5530"
          strokeWidth="0.7"
        />
        <line
          x1="280"
          y1="134"
          x2="280"
          y2="142"
          stroke="#7C5530"
          strokeWidth="0.7"
        />
        {/* small bow */}
        <path
          d="M 276,140 Q 280,134 284,140 Q 280,142 276,140 Z"
          fill="#1E6BFF"
        />
      </g>

      {/* === Sparkle stars (around the scene) === */}
      {variant === "hero" &&
        [
          { x: 110, y: 80, r: 1.8, d: 0, c: "#1E6BFF" },
          { x: 480, y: 60, r: 2.4, d: 1.2, c: "#5590FF" },
          { x: 380, y: 120, r: 1.4, d: 0.6, c: "#0C1A3E" },
          { x: 220, y: 50, r: 2, d: 1.8, c: "#1E6BFF" },
          { x: 540, y: 150, r: 1.2, d: 0.4, c: "#5590FF" },
          { x: 76, y: 160, r: 1.6, d: 1.5, c: "#0C1A3E" },
          { x: 560, y: 230, r: 1.5, d: 2.2, c: "#1E6BFF" },
        ].map((s, i) => (
          <motion.g
            key={`sp-${i}`}
            animate={
              reduce ? undefined : { opacity: [0.2, 1, 0.2], scale: [0.7, 1.3, 0.7] }
            }
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.d,
            }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          >
            {/* 4-point sparkle */}
            <path
              d={`M ${s.x},${s.y - s.r * 2.5}
                  L ${s.x + s.r * 0.6},${s.y - s.r * 0.6}
                  L ${s.x + s.r * 2.5},${s.y}
                  L ${s.x + s.r * 0.6},${s.y + s.r * 0.6}
                  L ${s.x},${s.y + s.r * 2.5}
                  L ${s.x - s.r * 0.6},${s.y + s.r * 0.6}
                  L ${s.x - s.r * 2.5},${s.y}
                  L ${s.x - s.r * 0.6},${s.y - s.r * 0.6} Z`}
              fill={s.c}
              opacity="0.85"
            />
          </motion.g>
        ))}

      {/* moon-ish curve up top */}
      {variant === "hero" && (
        <g opacity="0.55">
          <circle cx="490" cy="100" r="22" fill="#E9F0FF" />
          <circle cx="498" cy="96" r="22" fill="#F5F8FF" />
        </g>
      )}
    </motion.svg>
  );
}
