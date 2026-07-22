import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Magic Carpet's website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="py-12 md:py-20">
      <Container size="narrow">
        <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
          Legal
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-twilight">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Last updated: April 30, 2026
        </p>

        <div className="mt-10 text-ink-muted leading-relaxed space-y-6">
          <Section title="Using this site">
            By using {siteConfig.name}&apos;s website you agree to these terms.
            Don&apos;t do anything illegal with it, don&apos;t scrape it for
            commercial purposes, and don&apos;t try to break it.
          </Section>
          <Section title="Quotes">
            Quote estimates returned through the form are good-faith based on
            the information you provide. Final pricing is set in your signed
            move agreement, which becomes the binding document. If something on
            your inventory changes, the quote may change.
          </Section>
          <Section title="Cancellations">
            Reschedule once, free, up to 72 hours before your move. Cancellations
            within 72 hours may incur a deposit-equivalent fee. We&apos;ll
            always work with you in good faith on emergencies.
          </Section>
          <Section title="Liability">
            We carry full insurance per our license. Full-value protection
            details are spelled out in your move agreement. Our liability for
            anything beyond what that agreement covers is limited to the amount
            you paid us.
          </Section>
          <Section title="Changes">
            We may update these terms. Material changes will be posted here
            with a new &ldquo;last updated&rdquo; date.
          </Section>
          <Section title="Contact">
            Questions go to{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-coral underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </Section>
          <p className="text-sm italic text-ink-muted/80 pt-6 border-t border-border-soft">
            This is placeholder copy. Have it reviewed by counsel before
            launching.
          </p>
        </div>
      </Container>
    </section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-twilight mb-3">{title}</h2>
      <p className="text-pretty">{children}</p>
    </div>
  );
}
