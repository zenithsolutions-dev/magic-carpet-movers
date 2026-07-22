import type { Variants, Transition } from "motion/react";

export const easeOutSoft: Transition["ease"] = [0.22, 1, 0.36, 1];
export const easeInOutSoft: Transition["ease"] = [0.65, 0, 0.35, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutSoft },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOutSoft },
  },
};

export const stagger = (gap = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: gap, delayChildren: 0.05 },
  },
});

export const liftHover = {
  rest: { y: 0 },
  hover: {
    y: -6,
    transition: { duration: 0.25, ease: easeOutSoft },
  },
};

export const carpetFloat: Variants = {
  rest: { y: 0, rotate: 0 },
  float: {
    y: [0, -6, 0],
    rotate: [-0.5, 0.5, -0.5],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const cloudDrift: Variants = {
  rest: { x: 0 },
  drift: {
    x: [-12, 12, -12],
    transition: {
      duration: 14,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOutSoft },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: easeInOutSoft },
  },
};
