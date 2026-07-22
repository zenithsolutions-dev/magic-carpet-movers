import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { Reveal } from "@/components/primitives/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Local, long-distance, commercial, packing, and storage — five services, one smooth ride.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndexPage() {
  return (
    <>
      <section className="pt-12 pb-12 md:pt-20 md:pb-16">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-coral font-semibold mb-4">
              Services
            </p>
            <h1 className="font-display text-4xl md:text-display text-twilight text-balance leading-[1.05]">
              Five flavors. <span className="italic text-coral">One promise:</span>{" "}
              your stuff lands gently.
            </h1>
            <p className="mt-6 text-lg text-ink-muted text-pretty max-w-2xl">
              Whether it&apos;s a studio across town or a fully-built office across
              the country, we sized our services around what people actually
              need — not what fits a sales script.
            </p>
          </Reveal>
        </Container>
      </section>

      <ServicesGrid showHeader={false} />
      <CTABanner />
    </>
  );
}
