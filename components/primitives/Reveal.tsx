"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { fadeUp, stagger } from "@/lib/utils/motion-presets";
import { cn } from "@/lib/utils/cn";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "ul" | "li" | "article" | "header";
  once?: boolean;
  variants?: Variants;
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  once = true,
  variants = fadeUp,
}: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) {
    const Plain = as as keyof React.JSX.IntrinsicElements;
    return React.createElement(Plain, { className }, children);
  }

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}

export function StaggerGroup({
  children,
  className,
  gap = 0.08,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ul" | "section";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) {
    const Plain = as as keyof React.JSX.IntrinsicElements;
    return React.createElement(Plain, { className }, children);
  }

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger(gap)}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag className={cn(className)} variants={fadeUp}>
      {children}
    </Tag>
  );
}
