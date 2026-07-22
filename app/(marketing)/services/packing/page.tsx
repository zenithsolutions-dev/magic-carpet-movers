import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { PricingFactors, FeatureList } from "@/components/sections/PricingFactors";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { CTABanner } from "@/components/sections/CTABanner";
import { services } from "@/lib/site-config";

const SLUG = "packing";

export const metadata: Metadata = {
  title: "Packing Service",
  description:
    "Full or partial packing with materials included, custom crating for art, and color-coded labels.",
  alternates: { canonical: `/services/${SLUG}` },
};

export default function PackingPage() {
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
