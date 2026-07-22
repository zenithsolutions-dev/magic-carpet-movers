import { Container } from "@/components/layout/Container";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { services } from "@/lib/site-config";

type Props = {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  showHeader?: boolean;
};

export function ServicesGrid({
  eyebrow = "Our services",
  title = (
    <>
      Everything your move <span className="italic text-coral">needs.</span>
    </>
  ),
  subtitle = "From a single-room apartment to a full house or office — local, long-distance, and across borders.",
  showHeader = true,
}: Props) {
  return (
    <section className="py-24 md:py-32 bg-sand/40">
      <Container>
        {showHeader && (
          <Reveal className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
              {eyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-twilight text-balance">
              {title}
            </h2>
            <p className="mt-4 text-ink-muted text-pretty">{subtitle}</p>
          </Reveal>
        )}

        <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {services.map((s) => (
            <StaggerItem key={s.slug} className="h-full">
              <ServiceCard service={s} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
