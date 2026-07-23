"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";

const beats = [
  {
    k: "01",
    title: "One used Dodge Grand Caravan",
    body:
      "No fleet. No warehouse. No years of experience. Just one van, a dream, and the belief that if we treated people the right way, they would remember us.",
  },
  {
    k: "02",
    title: "A $5 toolkit and a 4-hour bed",
    body:
      "Our first furniture tool cost five dollars. That first bed took nearly two hours to take apart — and two more to put back together. Everyone starts somewhere.",
  },
  {
    k: "03",
    title: "Professionals, one customer at a time",
    body:
      "Every move taught us something. Every mistake became a lesson. We learned to pack homes safely, wrap furniture properly, and protect memories — not just furniture.",
  },
  {
    k: "04",
    title: "Built by people, not advertising",
    body:
      "Customers who recommended us to friends. Families who called again years later. Neighbours who believed in us first — and, above all, the grace of God. That is what built this company.",
  },
];

export function OurStory() {
  return (
    <section id="story" className="relative overflow-hidden py-24 md:py-32 bg-grain">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* sticky intro + logo */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <p className="kicker text-coral mb-4">Our story</p>
              <h2 className="font-display text-3xl md:text-4xl text-twilight text-balance">
                It started with one van <span className="italic text-coral">and a $5 toolkit.</span>
              </h2>
              <p className="mt-4 text-ink-muted text-pretty">
                No matter how much we grow, we&rsquo;ll never forget the little
                Dodge Grand Caravan that carried not only furniture&hellip; but
                the beginning of a dream.
              </p>
            </Reveal>

            <Reveal className="mt-8">
              <div className="overflow-hidden rounded-2xl shadow-card ring-1 ring-border">
                <Image
                  src="/logo-full.jpg"
                  alt="Magic Carpet Movers — we move it like it's magic"
                  width={1254}
                  height={912}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </Reveal>
          </div>

          {/* story beats */}
          <div className="lg:col-span-7">
            <StaggerGroup className="flex flex-col gap-6" gap={0.12}>
              {beats.map((b) => (
                <StaggerItem key={b.k}>
                  <div className="flex gap-5 rounded-xl bg-cloud border border-border-soft p-6 md:p-7 shadow-soft">
                    <span className="font-poster text-4xl leading-none text-coral/80 select-none">
                      {b.k}
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-twilight">{b.title}</h3>
                      <p className="mt-2 text-ink-muted leading-relaxed text-pretty">{b.body}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal className="mt-8">
              <blockquote className="rounded-xl gradient-twilight text-cloud p-7 md:p-8 shadow-card">
                <p className="font-display text-xl md:text-2xl leading-snug text-balance">
                  &ldquo;You&rsquo;re not hiring a company that claims to know
                  everything. You&rsquo;re choosing a team that respects your
                  home, protects your belongings, and works every day to earn
                  your trust.&rdquo;
                </p>
                <footer className="mt-4 text-sm text-cloud/70">
                  One move. One family. One customer at a time. &mdash; Thank
                  you for becoming part of our story.
                </footer>
              </blockquote>
            </Reveal>

            <FullStory />
          </div>
        </div>
      </Container>
    </section>
  );
}

function FullStory() {
  const [open, setOpen] = React.useState(false);
  const reduce = useReducedMotion();
  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 text-sm font-semibold text-coral hover:text-coral-deep transition-colors"
      >
        {open ? "Hide the full story" : "Read the full story"}
        <svg
          viewBox="0 0 16 16"
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-xl bg-cloud border border-border-soft p-6 md:p-8 shadow-soft text-ink-muted leading-relaxed space-y-4 text-pretty">
              <p>Every company has a starting point. Ours didn&rsquo;t begin with a fleet of trucks, a warehouse, or years of experience. It began with one used Dodge Grand Caravan, a dream, and the belief that if we treated people the right way, they would remember us.</p>
              <p>When we accepted our very first moving job, we had almost no experience. Our first furniture tool cost just $5. We thought taking apart a bed would be simple. Instead&hellip; it took us nearly two hours to disassemble it &mdash; and another two hours to put it back together.</p>
              <p>Looking back today, we smile. Because everyone starts somewhere. We weren&rsquo;t born professionals. We became professionals one customer at a time. Every move taught us something new. Every mistake became a lesson. Every challenge made us better.</p>
              <p>We learned how to pack homes safely. How to wrap furniture properly. How to protect memories &mdash; not just furniture. How to disassemble and reassemble furniture with confidence. How to move families across the city&hellip; and across provinces. How to plan local moves, long-distance moves, apartment moves, house moves, office moves, and everything in between.</p>
              <p>Little by little, the Dodge Grand Caravan became larger trucks. One customer became many. One moving job became hundreds. And every person who trusted us helped build the company we are today.</p>
              <p>The truth is, Magic Carpet Movers wasn&rsquo;t built by advertising. It was built by people. By customers who recommended us to their friends. By families who called us again years later. By neighbours who believed in us before anyone else did. Most importantly, it was built by the grace of God &mdash; without His blessings, none of this would have been possible.</p>
              <p>We are still learning. We still believe there is always a better way to serve our customers. We still listen. We still improve. And we still remember exactly where we started.</p>
              <p>Because no matter how much we grow, we&rsquo;ll never forget the first customer who trusted us. We&rsquo;ll never forget the first bed we struggled to assemble. We&rsquo;ll never forget the little Dodge Grand Caravan that carried not only furniture&hellip; but the beginning of a dream.</p>
              <p>Today, when you choose Magic Carpet Movers, you&rsquo;re not hiring a company that claims to know everything. You&rsquo;re choosing a team that respects your home, protects your belongings, values your trust, and works every day to earn it.</p>
              <p className="font-semibold text-twilight">And we&rsquo;re grateful that our story continues &mdash; one move, one family, one customer at a time. Thank you for becoming part of our story.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
