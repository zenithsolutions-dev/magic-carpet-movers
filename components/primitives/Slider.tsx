"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  label: string;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
  marks?: string[];
  className?: string;
};

export function Slider({
  label,
  name,
  min = 1,
  max = 5,
  step = 1,
  value,
  onChange,
  marks,
  className,
}: Props) {
  const id = React.useId();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-twilight">
          {label}
        </label>
        <span className="text-sm font-display text-coral">
          {marks?.[value - min] ?? value}
        </span>
      </div>
      <div className="relative">
        <div className="h-2 rounded-pill bg-border-soft" />
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 rounded-pill bg-coral"
          style={{ width: `${pct}%` }}
        />
        <input
          id={id}
          name={name}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
        <div
          aria-hidden
          className="absolute top-1/2 -translate-y-1/2 size-5 rounded-pill bg-cloud border-2 border-coral shadow-card transition-all"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>
      {marks && (
        <div className="flex justify-between text-[10px] uppercase tracking-wider text-ink-muted">
          {marks.map((m, i) => (
            <span key={i} className={cn(i === value - min && "text-coral font-semibold")}>
              {m}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
