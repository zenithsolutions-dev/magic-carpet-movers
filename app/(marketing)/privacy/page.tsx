import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Magic Carpet collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="py-12 md:py-20">
      <Container size="narrow">
        <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
          Legal
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-twilight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Last updated: April 30, 2026
        </p>

        <div className="prose prose-lg mt-10 text-ink-muted leading-relaxed space-y-6">
          <Section title="What we collect">
            When you request a quote or contact us, we collect the name, email,
            phone number, ZIP codes, move date, and any notes you provide. Our
            host also records standard server logs (IP, user-agent, timestamps)
            for security and debugging.
          </Section>
          <Section title="How we use it">
            We use the information you submit to respond to your quote or
            inquiry, schedule your move, and follow up afterward. We do not
            sell your personal information to anyone.
          </Section>
          <Section title="How we share it">
            We share data only with vendors that operate the site (e.g. our
            email provider) under their own privacy terms, and when required by
            law.
          </Section>
          <Section title="Cookies">
            This site uses essential cookies for navigation. We do not run
            third-party advertising trackers.
          </Section>
          <Section title="Your rights">
            You can ask us what we have on file, correct it, or delete it.
            Email{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-coral underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>{" "}
            and we&apos;ll respond within 30 days.
          </Section>
          <Section title="Contact">
            Questions about this policy go to{" "}
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
