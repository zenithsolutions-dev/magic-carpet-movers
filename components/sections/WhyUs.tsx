import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";

const reasons = [
  {
    title: "Licensed & fully insured",
    body: "Every move is covered. Your furniture is protected door to door, and we issue a Certificate of Insurance on request.",
  },
  {
    title: "On-time, uniformed crews",
    body: "We show up when we say we will, in branded shirts, with the padding, dollies, and tools the job actually needs.",
  },
  {
    title: "Careful with every box",
    body: "Disassembly, wrapping, and reassembly done right. We treat your grandmother's dresser like it's our own.",
  },
  {
    title: "Clear, upfront pricing",
    body: "A written estimate before we start — no mystery fees, no surprise charges when the truck is already loaded.",
  },
];

export function WhyUs() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-card">
              <Image
                src="/photos/crew-uniform.jpg"
                alt="Magic Carpet Movers crew carrying boxes into a home"
                width={1200}
                height={800}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* floating proof chip */}
            <div className="absolute -bottom-5 -right-3 md:right-6 rounded-xl bg-twilight text-cloud px-5 py-4 shadow-lift">
              <div className="font-poster text-3xl leading-none text-coral-soft">4.9★</div>
              <div className="mt-1 text-xs text-cloud/80">Rated by Ottawa &amp; Gatineau families</div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="kicker text-coral mb-4">Why Magic Carpet</p>
              <h2 className="font-display text-3xl md:text-4xl text-twilight text-balance">
                Movers you can actually <span className="italic text-coral">rely on.</span>
              </h2>
              <p className="mt-4 text-ink-muted text-pretty max-w-lg">
                Moving is stressful enough. Our job is to make yours feel easy &mdash;
                careful hands, honest prices, and a crew that treats the day like it matters.
              </p>
            </Reveal>

            <StaggerGroup className="mt-8 grid gap-5 sm:grid-cols-2" gap={0.1}>
              {reasons.map((r) => (
                <StaggerItem key={r.title}>
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-coral/12 text-coral">
                      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-twilight leading-snug">{r.title}</h3>
                      <p className="mt-1 text-sm text-ink-muted leading-relaxed text-pretty">{r.body}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
