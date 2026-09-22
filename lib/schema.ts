import { Offer, MentorProfile } from "./types";

export function generateStructuredData(offer: Offer, mentor: MentorProfile) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://mentoringandroid.dev/#mentor",
        name: mentor.name,
        jobTitle: mentor.title,
        description: mentor.bio,
        sameAs: [mentor.linkedInUrl, mentor.githubUrl],
      },
      {
        "@type": "Service",
        "@id": "https://mentoringandroid.dev/#service",
        name: offer.title,
        description: offer.subtitle,
        provider: {
          "@id": "https://mentoringandroid.dev/#mentor",
        },
        offers: {
          "@type": "Offer",
          price: offer.currentPrice,
          priceCurrency: offer.currency,
          availability: "https://schema.org/InStock",
          url: "https://mentoringandroid.dev/book",
          validFrom: "2026-01-01",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Mentorship Deliverables",
          itemListElement: offer.inclusions.map((inc, i) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: inc,
            },
            position: i + 1,
          })),
        },
      },
    ],
  };
}
