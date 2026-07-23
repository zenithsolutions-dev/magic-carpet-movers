"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/site-config";

/**
 * Full-bleed hero: real operational photography with a video slot ready.
 * Drop a file at /public/hero.mp4 (a short, muted, looping clip of the crew /
 * a truck) and it plays automatically over the poster image — no code change.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [date, setDate] = React.useState("");

  function submitQuote(e: React.FormEvent) {
    e.preventDefault();
    // One-page flow: hand the values to the quote section and scroll to it.
    window.dispatchEvent(
      new CustomEvent("mcm:prefill", { detail: { from, to, date } }),
    );
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  }

  const fade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative isolate overflow-hidden -mt-16 md:-mt-20">
      {/* ── background media: video (if present) over poster photo ── */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        poster="/photos/hero-crew.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* navy brand overlay for legible white text */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(105deg, rgba(6,15,39,0.92) 0%, rgba(12,26,62,0.82) 42%, rgba(12,26,62,0.45) 100%), linear-gradient(0deg, rgba(6,15,39,0.55) 0%, transparent 45%)",
        }}
      />
      {/* subtle speed-lines echo of the logo */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-speedlines opacity-40" />

      <Container>
        <div className="grid items-center gap-10 py-24 md:py-28 lg:grid-cols-12 lg:gap-8 lg:py-32">
          {/* ── copy ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="lg:col-span-7 xl:col-span-7 text-cloud"
          >
            <motion.div
              variants={fade}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-pill bg-cloud/10 backdrop-blur px-4 py-1.5 border border-cloud/20 mb-6"
            >
              <span className="flex text-coral-soft">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
                    <path d="M8 .5l2.3 4.7 5.2.8-3.7 3.6.9 5.1L8 12.3l-4.6 2.4.9-5.1L.6 6l5.2-.8L8 .5z" />
                  </svg>
                ))}
              </span>
              <span className="text-xs font-medium tracking-wide text-cloud/90">
                4.9 rating · Ottawa-Gatineau&rsquo;s trusted movers
              </span>
            </motion.div>

            <motion.h1
              variants={fade}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-poster uppercase text-display leading-[0.9] text-balance"
            >
              Moving day,
              <br />
              <span className="text-coral-soft">made effortless.</span>
            </motion.h1>

            <motion.p
              variants={fade}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-lg md:text-xl text-cloud/80 leading-relaxed text-pretty"
            >
              Local &amp; long-distance moving, packing, furniture assembly, and
              Canada-wide + international shipping. Licensed, insured, and careful
              with every box &mdash; we move it like it&rsquo;s magic.
            </motion.p>

            <motion.div
              variants={fade}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Button href="#quote" variant="primary" size="lg">
                Get a free quote
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-pill border border-cloud/30 bg-cloud/5 px-8 text-lg font-medium text-cloud backdrop-blur transition-colors hover:bg-cloud/15"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M3 4c0 5 4 9 9 9l1-2.5-2.5-1L9.5 11C8 10.5 5.5 8 5 6.5l1.5-1L5.5 3 3 4z" strokeLinejoin="round" />
                </svg>
                {siteConfig.phone}
              </a>
            </motion.div>

            <motion.p
              variants={fade}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-sm text-cloud/60"
            >
              Free, no-obligation estimate · Same-week availability · Fully insured
            </motion.p>
          </motion.div>

          {/* ── inline quick-quote card ── */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="lg:col-span-5 xl:col-span-5"
          >
            <form
              onSubmit={submitQuote}
              className="rounded-2xl bg-cloud/95 backdrop-blur-md p-6 md:p-7 shadow-lift border border-cloud/40"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="kicker text-coral">Instant estimate</span>
              </div>
              <h2 className="font-display text-2xl text-twilight mb-5">
                Where are you moving?
              </h2>

              <div className="flex flex-col gap-3">
                <QField label="Moving from" htmlFor="q-from">
                  <input
                    id="q-from"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Current city or postal code"
                    className="w-full bg-transparent outline-none text-twilight placeholder:text-ink-muted/60"
                  />
                </QField>
                <QField label="Moving to" htmlFor="q-to">
                  <input
                    id="q-to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Destination city or postal code"
                    className="w-full bg-transparent outline-none text-twilight placeholder:text-ink-muted/60"
                  />
                </QField>
                <QField label="Ideal move date" htmlFor="q-date">
                  <input
                    id="q-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent outline-none text-twilight"
                  />
                </QField>
              </div>

              <Button variant="primary" size="lg" className="mt-5 w-full" type="submit">
                Get my free quote
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
              <p className="mt-3 text-center text-xs text-ink-muted">
                Takes under a minute · We reply within the hour
              </p>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function QField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block rounded-lg border border-border bg-sand-soft/60 px-4 py-2.5 focus-within:border-coral focus-within:ring-2 focus-within:ring-coral/20 transition-colors"
    >
      <span className="block text-[0.7rem] uppercase tracking-[0.12em] text-ink-muted font-semibold">
        {label}
      </span>
      {children}
    </label>
  );
}
