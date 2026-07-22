import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { PricingFactors, FeatureList } from "@/components/sections/PricingFactors";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { CTABanner } from "@/components/sections/CTABanner";
import { services } from "@/lib/site-config";

const SLUG = "commercial";

export const metadata: Metadata = {
  title: "Commercial Movers",
  description:
    "Office, retail, and lab moves with after-hours crews, COIs to your building, and IT-aware handling.",
  alternates: { canonical: `/services/${SLUG}` },
};

export default function CommercialPage() {
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
