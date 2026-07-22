"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";

const steps = [
  {
    n: "01",
    title: "Get your quote",
    body:
      "Tell us where you’re moving, when, and roughly what’s coming. We reply with a clear, no-obligation estimate within the hour.",
    icon: "wish",
  },
  {
    n: "02",
    title: "Book your date",
    body:
      "Lock in your move day. We confirm the crew size, truck, and a written plan so there are no surprises.",
    icon: "pack",
  },
  {
    n: "03",
    title: "We pack & load",
    body:
      "Our uniformed crew arrives on time with padding and materials, wraps your furniture, and loads with care.",
    icon: "ride",
  },
  {
    n: "04",
    title: "We deliver & set up",
    body:
      "We transport, unload, reassemble the beds and furniture, and don’t leave until you’re settled in.",
    icon: "ride",
  },
] as const;

export function ThreeWishes() {
  const reduce = useReducedMotion();
  return (
    <section className="py-24 md:py-32 relative">
      <Container>
        <Reveal className="text-center mb-14 md:mb-20">
          <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
            How it works
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-twilight text-balance">
            Your move in <span className="italic text-coral">four simple steps.</span>
          </h2>
        </Reveal>

        <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" gap={0.12}>
          {steps.map((s, i) => (
            <StaggerItem
              key={s.n}
              className="group relative"
            >
              <motion.div
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full rounded-xl bg-cloud border border-border-soft p-7 md:p-8 shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-display italic text-4xl text-coral leading-none">
                    {s.n}
                  </span>
                  <div className="flex-1 h-px bg-border-soft" />
                </div>
                <h3 className="font-display text-2xl text-twilight mb-3">
                  {s.title}
                </h3>
                <p className="text-ink-muted leading-relaxed text-pretty">
                  {s.body}
                </p>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden md:flex absolute top-1/2 -right-3 size-6 -translate-y-1/2 items-center justify-center rounded-full bg-cloud border border-border-soft text-coral"
                  >
                    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
