import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/primitives/Reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Magic Carpet. Phone, email, hours, and a quick note form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="relative py-12 md:py-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 100% 0%, rgba(30,107,255,0.10) 0%, transparent 60%), linear-gradient(180deg, #F5F8FF 0%, #E9F0FF 100%)",
        }}
      />
      <Container>
        <Reveal className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
            Contact
          </p>
          <h1 className="font-display text-4xl md:text-display text-twilight text-balance leading-[1.05]">
            Say hi. <span className="italic text-coral">We&apos;ll lift off.</span>
          </h1>
          <p className="mt-5 text-lg text-ink-muted text-pretty max-w-xl mx-auto">
            Booking a move? Use the quote form and we&apos;ll come straight back
            with a real number. Anything else, send a note here and a real person
            will write back &mdash; we&apos;re available 24/7.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5 order-2 lg:order-1" delay={0.1}>
            <div className="flex flex-col gap-6">
              <ContactBlock
                eyebrow="Call"
                title={
                  <a
                    href={siteConfig.phoneHref}
                    className="text-coral hover:text-coral-deep transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                }
                body="Open 24 hours a day, 7 days a week. We answer on the second ring."
              />
              <ContactBlock
                eyebrow="Email"
                title={
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-twilight hover:text-coral transition-colors break-all"
                  >
                    {siteConfig.email}
                  </a>
                }
                body="We reply anytime, day or night."
              />
              <ContactBlock
                eyebrow="Service area"
                title={
                  <span className="text-twilight">
                    {siteConfig.serviceArea.label}
                  </span>
                }
                body={`${siteConfig.serviceArea.region} — we come to you, no depot visit needed.`}
              />
              <div className="rounded-xl overflow-hidden border border-border-soft bg-cloud">
                {/* The map itself is a link: a transparent overlay catches the
                    click and opens Google Maps at the same query. This also
                    stops the iframe from hijacking scroll/pan gestures. */}
                <div className="relative">
                  <iframe
                    title={`${siteConfig.name} service area`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&t=m&z=10&output=embed&iwloc=near`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block w-full h-64 border-0"
                  />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${siteConfig.name} service area in Google Maps`}
                    className="absolute inset-0 cursor-pointer"
                  />
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 px-5 py-3 text-sm text-twilight hover:bg-sand transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <svg viewBox="0 0 16 16" className="size-4 text-coral" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 3h7v7M13 3L4 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <Reveal delay={0.05}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactBlock({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
}) {
  return (
    <div className="border-l-2 border-coral pl-5">
      <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-coral mb-1">
        {eyebrow}
      </div>
      <div className="font-display text-xl md:text-2xl">{title}</div>
      <p className="mt-1 text-sm text-ink-muted leading-relaxed">{body}</p>
    </div>
  );
}
