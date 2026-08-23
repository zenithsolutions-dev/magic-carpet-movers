import { Hero } from "@/components/sections/Hero";
import { StatBar } from "@/components/sections/StatBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ThreeWishes } from "@/components/sections/ThreeWishes";
import { WhyUs } from "@/components/sections/WhyUs";
import { OurStory } from "@/components/sections/OurStory";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { FAQ } from "@/components/sections/FAQ";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqSchema } from "@/lib/seo";

/**
 * One-page layout: every section lives here and the nav scrolls between
 * anchors. Old routes (/services/*, /about, /contact, /quote) stay live for
 * SEO and existing links, but the primary navigation is in-page.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={buildFaqSchema()} />
      <Hero />
      <StatBar />
      <div id="services" className="scroll-mt-24">
        <ServicesGrid />
      </div>
      <div id="process" className="scroll-mt-24">
        <ThreeWishes />
      </div>
      <div id="why" className="scroll-mt-24">
        <WhyUs />
      </div>
      <OurStory />
      <div id="areas" className="scroll-mt-24">
        <ServiceAreas />
      </div>
      <QuoteSection />
      <div id="reviews" className="scroll-mt-24">
        <TestimonialsCarousel />
      </div>
      <div id="faq" className="scroll-mt-24">
        <FAQ />
      </div>
      <ContactSection />
    </>
  );
}
