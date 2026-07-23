"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { testimonials, type Testimonial } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

export function TestimonialsCarousel({
  items = testimonials,
}: {
  items?: Testimonial[];
}) {
  const [idx, setIdx] = React.useState(0);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, 6500);
    return () => clearInterval(t);
  }, [items.length, reduce]);

  const current = items[idx];

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grain opacity-40"
      />

      <Container>
        <Reveal className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
            Honest words
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-twilight text-balance">
            What Ottawa <span className="italic text-coral">says about us.</span>
          </h2>
        </Reveal>

        <div className="relative max-w-3xl mx-auto">
          <div className="relative min-h-[260px] md:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={idx}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: current.stars }).map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 16 16"
                      className="size-5 text-coral"
                      fill="currentColor"
                    >
                      <path d="M8 .5l2.3 4.7 5.2.8-3.7 3.6.9 5.1L8 12.3l-4.6 2.4.9-5.1L.6 6l5.2-.8L8 .5z" />
                    </svg>
                  ))}
                </div>
                <blockquote>
                  <p className="font-display text-2xl md:text-3xl text-twilight leading-snug text-balance">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-8 text-sm">
                  <span className="font-semibold text-twilight">{current.name}</span>
                  <span className="mx-2 text-ink-muted">·</span>
                  <span className="text-ink-muted">{current.route}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === idx}
                onClick={() => setIdx(i)}
                className={cn(
                  "transition-all rounded-pill",
                  i === idx
                    ? "h-2 w-8 bg-coral"
                    : "h-2 w-2 bg-twilight/20 hover:bg-twilight/40",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
