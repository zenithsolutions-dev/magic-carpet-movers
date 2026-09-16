"use client";

import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

/**
 * Post-submit confirmation for the quote form. Built from the client's own
 * design: confirmation, three reassurance points, the Instagram 10%-off offer,
 * and a call / WhatsApp line.
 */

const points = [
  {
    title: "Hourly pricing",
    body: "You only pay for the time your move actually takes. Simple and transparent.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
  },
  {
    title: "Save time + save money",
    body: "Have boxes packed, furniture cleared, the elevator booked, and parking free for the crew.",
    icon: (
      <>
        <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z" />
        <path d="M3 12.5 12 17l9-4.5M3 16.5 12 21l9-4.5" />
      </>
    ),
  },
  {
    title: "No surprises",
    body: "Clear pricing before we start. No hidden fees, no last-minute changes.",
    icon: (
      <>
        <path d="M12 3l7 3v6c0 4.2-2.9 7.7-7 9-4.1-1.3-7-4.8-7-9V6l7-3Z" />
        <path d="M9 12l2.2 2.2L15.5 10" />
      </>
    ),
  },
];

export function QuoteSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-xl bg-cloud border border-border-soft shadow-card"
    >
      <div className="p-6 sm:p-10 md:p-12 text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-coral text-cloud">
          <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h2 className="font-display text-3xl md:text-4xl text-twilight text-balance">
          Request received.{" "}
          <span className="italic text-coral">Let&rsquo;s get you moving.</span>
        </h2>
        <p className="mt-4 text-ink-muted text-pretty max-w-md mx-auto">
          We&rsquo;ve got your moving details. Our team will review them and send
          you a personalized estimate shortly.
        </p>

        {/* three reassurance points */}
        <div className="mt-10 grid gap-7 sm:grid-cols-3 sm:gap-6 text-left">
          {points.map((p) => (
            <div key={p.title}>
              <span className="mb-3 inline-flex size-10 items-center justify-center rounded-md bg-sand text-coral">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {p.icon}
                </svg>
              </span>
              <h3 className="font-display text-base text-twilight">{p.title}</h3>
              <p className="mt-1 text-sm text-ink-muted leading-relaxed text-pretty">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Instagram offer */}
        <div className="mt-10 rounded-lg border border-coral/25 bg-sand-soft p-6 sm:p-7">
          <p className="kicker text-coral">Unlock 10% off your move</p>
          <p className="mt-3 text-twilight font-medium text-pretty">
            Book through our Instagram page and get 10% off your moving service.
          </p>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-12 items-center justify-center gap-2.5 rounded-pill gradient-sunset px-7 text-sm font-semibold text-cloud shadow-soft transition-opacity hover:opacity-90"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
            </svg>
            Claim my 10% off
          </a>
          <p className="mt-3 text-xs text-ink-muted">
            {siteConfig.social.instagramHandle}
          </p>
        </div>

        {/* call / WhatsApp */}
        <div className="mt-8">
          <p className="kicker text-ink-muted">Questions?</p>
          <p className="mt-2 text-sm text-ink-muted">
            Call or text us anytime &mdash; we&rsquo;re available 24/7.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-pill border border-twilight/20 px-6 text-sm font-semibold text-twilight transition-colors hover:bg-sand"
            >
              <svg viewBox="0 0 16 16" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M3 4c0 5 4 9 9 9l1-2.5-2.5-1L9.5 11C8 10.5 5.5 8 5 6.5l1.5-1L5.5 3 3 4z" strokeLinejoin="round" />
              </svg>
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-pill border border-success/40 bg-success/10 px-6 text-sm font-semibold text-success transition-colors hover:bg-success/20"
            >
              <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="currentColor">
                <path d="M12.04 2.01a9.9 9.9 0 0 0-8.4 15.1L2 22.5l5.6-1.47a9.9 9.9 0 1 0 4.44-19.02Zm0 1.8a8.1 8.1 0 1 1-4.1 15.08l-.32-.19-3.1.81.83-3.03-.2-.33A8.1 8.1 0 0 1 12.04 3.81Z" />
                <path d="M9.3 7.3c-.2-.44-.4-.45-.6-.46h-.5c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.14s.92 2.48 1.05 2.65c.13.17 1.78 2.85 4.4 3.88 2.18.86 2.49.69 2.94.65.45-.04 1.45-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.17-.47-.29-.25-.12-1.45-.72-1.68-.8-.22-.09-.39-.13-.55.12-.16.26-.63.82-.77.98-.14.17-.28.19-.53.07-.25-.13-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.26-.02-.4.1-.52.12-.12.29-.31.43-.47.14-.16.19-.27.28-.45.1-.17.05-.33-.02-.45-.06-.12-.55-1.33-.75-1.82Z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* brand strip */}
      <div className="gradient-twilight px-6 py-4 text-center">
        <p className="font-display text-sm uppercase tracking-[0.18em] text-cloud">
          {siteConfig.name}
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-cloud/60">
          Ottawa &bull; Gatineau &bull; Canada-wide
        </p>
      </div>
    </motion.div>
  );
}
