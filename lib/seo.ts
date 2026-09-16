import { faqs, siteConfig } from "@/lib/site-config";

/**
 * schema.org MovingCompany, sourced entirely from siteConfig so content
 * edits propagate automatically.
 *
 * sameAs points at the client's verified Instagram profile and Google
 * Business Profile, which is how Google ties this site to that listing.
 *
 * Deliberately omitted:
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
    sameAs: [siteConfig.social.instagram, siteConfig.social.google],
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
