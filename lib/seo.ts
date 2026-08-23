import { faqs, siteConfig } from "@/lib/site-config";

/**
 * schema.org MovingCompany, sourced entirely from siteConfig so content
 * edits propagate automatically.
 *
 * Deliberately omitted:
 *  - sameAs: the social URLs in siteConfig are placeholders. // TODO add
 *    sameAs (real social profiles + the Google Business Profile URL) once
 *    the client supplies real links.
 *  - aggregateRating / review: the figures on the site are not verified.
 *    Unverifiable rating markup risks a manual action — add only when real
 *    review data exists.
 */
export function buildMovingCompanySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneHref.replace(/^tel:/, ""),
    email: siteConfig.email,
    // Mobile business: region only, no street address (matches the site).
    address: {
      "@type": "PostalAddress",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: siteConfig.serviceCities.map((name) => ({
      "@type": "City",
      name,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };
}

/** schema.org FAQPage from the site's FAQ content. */
export function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
