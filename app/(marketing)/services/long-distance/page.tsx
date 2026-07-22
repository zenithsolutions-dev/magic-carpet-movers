import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { PricingFactors, FeatureList } from "@/components/sections/PricingFactors";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { CTABanner } from "@/components/sections/CTABanner";
import { services } from "@/lib/site-config";

const SLUG = "long-distance";

export const metadata: Metadata = {
  title: "Long-Distance Movers",
  description:
    "Cross-country moves with binding quotes, GPS tracking, full-value protection, and the same crew on both ends.",
  alternates: { canonical: `/services/${SLUG}` },
};

export default function LongDistancePage() {
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
