import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "We started Magic Carpet because moving felt joyless and adversarial. We're rewriting the script, one move at a time.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    eyebrow: "01",
    title: "Treat the stuff like it matters.",
    body: "Because to someone, it does. The lamp from grandma. The first record you bought. We pad the dent-able and crate the breakable.",
  },
  {
    eyebrow: "02",
    title: "Tell the truth about timing.",
    body: "If we'll be there at 10, we'll be there at 10. If something runs long, you hear it from us first — not when we're already late.",
  },
  {
    eyebrow: "03",
    title: "Same crew, both ends.",
    body: "Long-distance moves go sideways at the warehouse handoff. We don't have a handoff. The crew that loads is the crew that unloads.",
  },
  {
    eyebrow: "04",
    title: "Quote what we'll charge.",
    body: "Binding numbers, line-item-itemized. The estimate is the price. No truck-scale roulette, no surprise stair fees on day-of.",
  },
];

const stats: { n: string; suffix?: string; label: string }[] = [
  { n: "2,000", suffix: "+", label: "Moves completed" },
  { n: "4.9", label: "Avg. rating" },
  { n: "12", label: "Years on the road" },
  { n: "0", label: "Mystery fees" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 30% 0%, rgba(30,107,255,0.16) 0%, transparent 60%), linear-gradient(180deg, #F5F8FF 0%, #E9F0FF 100%)",
          }}
        />
        <Container>
          <Reveal className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
              About us
            </p>
            <h1 className="font-display text-4xl md:text-display text-twilight text-balance leading-[1.05]">
              We started this because moving{" "}
              <span className="italic text-coral">shouldn&apos;t feel like a fight.</span>
            </h1>
            <p className="mt-6 text-lg text-ink-muted text-pretty max-w-2xl leading-relaxed">
              The category is full of dropped boxes, no-shows, and quotes that
              double when the truck rolls up. {siteConfig.name} exists to do the
              opposite — and we&apos;ve been refining that opposite for over a
              decade.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 md:py-20 bg-sand/40">
        <Container>
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem
                key={s.label}
                className="text-center rounded-xl bg-cloud border border-border-soft p-8 overflow-hidden"
              >
                <div className="font-display text-5xl md:text-6xl text-coral leading-none flex items-start justify-center">
                  <span>{s.n}</span>
                  {s.suffix && (
                    <span className="text-3xl md:text-4xl ml-0.5 mt-1">
                      {s.suffix}
                    </span>
                  )}
                </div>
                <div className="mt-3 text-sm uppercase tracking-[0.14em] text-ink-muted font-medium">
                  {s.label}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
                What we believe
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-twilight text-balance">
                Four rules. <span className="italic text-coral">No asterisks.</span>
              </h2>
              <p className="mt-4 text-ink-muted text-pretty">
                Every crew member knows these by heart. They show up in
                hiring, training, and how we say no to things that would
                compromise them.
              </p>
            </Reveal>

            <StaggerGroup
              as="ul"
              className="lg:col-span-8 grid gap-4 md:grid-cols-2"
            >
              {values.map((v) => (
                <StaggerItem
                  key={v.eyebrow}
                  as="li"
                  className="rounded-xl bg-cloud border border-border-soft p-6"
                >
                  <div className="font-display italic text-3xl text-coral leading-none mb-3">
                    {v.eyebrow}
                  </div>
                  <h3 className="font-display text-xl text-twilight mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed text-pretty">
                    {v.body}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24 bg-sand/40">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
              The crew
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-twilight text-balance">
              Real people. <span className="italic text-coral">Real careers.</span>
            </h2>
            <p className="mt-4 text-ink-muted text-pretty">
              Every mover on our team is full-time, background-checked, and
              paid like the skilled professional they are — not a per-job
              contractor. That&apos;s why your couch survives.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Marcus", role: "Crew Lead, est. 2014" },
              { name: "Lena", role: "Long-distance specialist" },
              { name: "Devon", role: "Pack & crate" },
              { name: "Sam", role: "Logistics & dispatch" },
            ].map((c, i) => (
              <div
                key={c.name}
                className="rounded-xl overflow-hidden bg-cloud border border-border-soft"
              >
                <div
                  aria-hidden
                  className="h-48 flex items-center justify-center"
                  style={{
                    background:
                      i % 2
                        ? "linear-gradient(135deg, #1E6BFF 0%, #0B4ED8 100%)"
                        : "linear-gradient(135deg, #0C1A3E 0%, #16305F 100%)",
                  }}
                >
                  <span className="font-display text-5xl text-cloud opacity-90">
                    {c.name[0]}
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-display text-xl text-twilight">
                    {c.name}
                  </div>
                  <div className="mt-1 text-sm text-ink-muted">
                    {c.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        title={
          <>
            Move with us. <span className="italic text-coral">You won&apos;t go back.</span>
          </>
        }
      />
    </>
  );
}
