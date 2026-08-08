import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Reveal } from "@/components/primitives/Reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Three quick questions, one real number. Tell us about your move — we're available 24/7 and come straight back.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(30,107,255,0.16) 0%, transparent 60%), linear-gradient(180deg, #F5F8FF 0%, #E9F0FF 100%)",
        }}
      />
      <Container size="narrow">
        <Reveal className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
            Get a quote
          </p>
          <h1 className="font-display text-4xl md:text-display text-twilight text-balance leading-[1.05]">
            Three questions. <span className="italic text-coral">One real number.</span>
          </h1>
          <p className="mt-5 text-ink-muted text-pretty max-w-lg mx-auto">
            We&apos;re available 24/7 and respond right away. Or call{" "}
            <a
              href={siteConfig.phoneHref}
              className="text-coral font-medium hover:text-coral-deep underline-offset-4 hover:underline"
            >
              {siteConfig.phone}
            </a>{" "}
            and skip the form.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <QuoteForm />
        </Reveal>
      </Container>
    </section>
  );
}
