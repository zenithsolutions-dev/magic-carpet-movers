import { Container } from "@/components/layout/Container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import type { Service } from "@/lib/site-config";

export function PricingFactors({ service }: { service: Service }) {
  return (
    <section className="py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
              What shapes the price
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-twilight text-balance">
              Honest, upfront <span className="italic text-coral">pricing.</span>
            </h2>
            <p className="mt-4 text-ink-muted text-pretty">
              Every quote breaks down the levers below so you know exactly what
              you&apos;re paying for — and what you can adjust.
            </p>
          </Reveal>

          <StaggerGroup
            as="ul"
            className="lg:col-span-8 grid gap-4 md:grid-cols-2"
          >
            {service.pricingFactors.map((f, i) => (
              <StaggerItem
                key={f.label}
                as="li"
                className="rounded-xl bg-cloud border border-border-soft p-6"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display italic text-2xl text-coral leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl text-twilight">
                    {f.label}
                  </h3>
                </div>
                <p className="text-ink-muted text-sm leading-relaxed text-pretty">
                  {f.body}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}

export function FeatureList({ service }: { service: Service }) {
  return (
    <section className="py-20 bg-sand/40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          <Reveal className="lg:col-span-5">
            <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
              What&apos;s included
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-twilight text-balance">
              What&rsquo;s <span className="italic text-coral">always included</span>{" "}
              as standard.
            </h2>
            <p className="mt-4 text-ink-muted text-pretty">
              Every {service.title.toLowerCase()} ships with all of the
              following — no upcharges, no asterisks.
            </p>
          </Reveal>

          <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {service.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 rounded-lg bg-cloud border border-border-soft p-4"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-pill bg-coral/15 text-coral mt-0.5">
                  <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm text-twilight font-medium leading-relaxed pt-0.5">
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
