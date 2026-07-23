import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { siteConfig } from "@/lib/site-config";

export function ServiceAreas() {
  return (
    <section className="relative overflow-hidden py-24 md:py-28 gradient-twilight text-cloud">
      <div aria-hidden className="absolute inset-0 bg-speedlines opacity-30" />
      <Container>
        <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="kicker text-coral-soft mb-4">Service area</p>
            <h2 className="font-display text-3xl md:text-4xl text-balance">
              Proudly serving <span className="italic text-coral-soft">Ottawa-Gatineau.</span>
            </h2>
            <p className="mt-4 text-cloud/75 text-pretty max-w-md">
              Both sides of the river &mdash; Ottawa, Gatineau, and everywhere in
              between &mdash; plus long-distance across Canada and international
              shipping when you&rsquo;re headed further.
            </p>
            <a
              href={siteConfig.phoneHref}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-coral-soft hover:text-cloud transition-colors"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M3 4c0 5 4 9 9 9l1-2.5-2.5-1L9.5 11C8 10.5 5.5 8 5 6.5l1.5-1L5.5 3 3 4z" strokeLinejoin="round" />
              </svg>
              Not sure if we cover you? Call {siteConfig.phone}
            </a>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <ul className="flex flex-wrap gap-2.5">
              {siteConfig.serviceCities.map((city) => (
                <li
                  key={city}
                  className="rounded-pill border border-cloud/15 bg-cloud/5 px-4 py-2 text-sm text-cloud/90 backdrop-blur transition-colors hover:border-coral-soft/50 hover:text-cloud"
                >
                  {city}
                </li>
              ))}
              <li className="rounded-pill bg-coral px-4 py-2 text-sm font-semibold text-cloud">
                Canada-wide + International
              </li>
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
