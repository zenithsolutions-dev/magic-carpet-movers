import { Container } from "@/components/layout/Container";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Reveal } from "@/components/primitives/Reveal";

export function QuoteSection() {
  return (
    <section id="quote" className="relative py-24 md:py-32 scroll-mt-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(30,107,255,0.16) 0%, transparent 60%), linear-gradient(180deg, #F5F8FF 0%, #E9F0FF 100%)",
        }}
      />
      <Container>
        <Reveal className="max-w-3xl mx-auto text-center mb-12">
          <p className="kicker text-coral mb-4">Free quote</p>
          <h2 className="font-display text-3xl md:text-4xl text-twilight text-balance">
            Three questions. <span className="italic text-coral">One real number.</span>
          </h2>
          <p className="mt-4 text-lg text-ink-muted text-pretty max-w-xl mx-auto">
            Tell us the route, the size, and the date &mdash; we&rsquo;re
            available 24/7 and come straight back with a clear, no-obligation
            estimate.
          </p>
        </Reveal>
        <div className="max-w-2xl mx-auto">
          <Reveal delay={0.05}>
            <QuoteForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
