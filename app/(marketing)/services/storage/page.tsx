import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { PricingFactors, FeatureList } from "@/components/sections/PricingFactors";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { CTABanner } from "@/components/sections/CTABanner";
import { services } from "@/lib/site-config";

const SLUG = "storage";

export const metadata: Metadata = {
  title: "Storage",
  description:
    "Climate-controlled vaulted storage. Month-to-month, inventory photos on intake, direct delivery on exit.",
  alternates: { canonical: `/services/${SLUG}` },
};

export default function StoragePage() {
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
