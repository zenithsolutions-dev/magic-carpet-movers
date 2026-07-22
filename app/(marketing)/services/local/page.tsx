import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { PricingFactors, FeatureList } from "@/components/sections/PricingFactors";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { CTABanner } from "@/components/sections/CTABanner";
import { services } from "@/lib/site-config";

const SLUG = "local";

export const metadata: Metadata = {
  title: "Local Movers",
  description:
    "City-to-city moves with hourly crews, no minimums after 2hr, and free disassembly + reassembly.",
  alternates: { canonical: `/services/${SLUG}` },
};

export default function LocalPage() {
  const service = services.find((s) => s.slug === SLUG);
  if (!service) notFound();
  return (
    <>
      <ServiceHero service={service} />
      <FeatureList service={service} />
      <PricingFactors service={service} />
      <TestimonialsCarousel />
      <CTABanner />
    </>
  );
}
