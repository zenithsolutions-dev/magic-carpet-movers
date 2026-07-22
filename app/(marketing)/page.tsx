import { Hero } from "@/components/sections/Hero";
import { StatBar } from "@/components/sections/StatBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ThreeWishes } from "@/components/sections/ThreeWishes";
import { WhyUs } from "@/components/sections/WhyUs";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { QuoteTeaser } from "@/components/sections/QuoteTeaser";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatBar />
      <ServicesGrid />
      <ThreeWishes />
      <WhyUs />
      <ServiceAreas />
      <QuoteTeaser />
      <TestimonialsCarousel />
      <FAQ />
      <CTABanner />
    </>
  );
}
