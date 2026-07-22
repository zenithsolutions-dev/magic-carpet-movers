import { Container } from "@/components/layout/Container";
import { Accordion } from "@/components/primitives/Accordion";
import { Reveal } from "@/components/primitives/Reveal";
import { faqs } from "@/lib/site-config";

export function FAQ() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
              You asked
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-twilight text-balance">
              Frequently asked <span className="italic text-coral">questions.</span>
            </h2>
            <p className="mt-4 text-ink-muted text-pretty">
              The questions we get most. If yours isn&apos;t here, our line picks
              up on the second ring.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
