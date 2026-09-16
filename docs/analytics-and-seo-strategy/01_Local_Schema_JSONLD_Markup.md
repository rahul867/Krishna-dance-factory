# Task 1: Website Local Schema Markup (JSON-LD)

**Files to Modify:**
- `index.html`
- `salsa-bachata/index.html`
- `kids-dance-classes/index.html`

**Location:** Inside the `<head> ... </head>` tag of each file.

---

## Code to Insert:

```html
<!-- Local SEO Schema for Google Knowledge Graph & 3-Pack Sync -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "DanceSchool",
  "@id": "https://krishnadancefactory.in/#danceschool",
  "name": "Krishna Dance Factory",
  "alternateName": ["KDF Dance Studio Gurgaon", "Krishna Dance Academy"],
  "url": "https://krishnadancefactory.in/",
  "telephone": "+919599353649",
  "email": "krishnachoreographer@gmail.com",
  "priceRange": "₹₹",
  "image": "https://krishnadancefactory.in/kdf_logo_red.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "DLF Exclusive Floors, D4/4, Club Dr, Phase 5, Sector 53",
    "addressLocality": "Gurugram",
    "addressRegion": "Haryana",
    "postalCode": "122009",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.4357,
    "longitude": 77.0982
  },
  "hasMap": "https://maps.google.com/maps?cid=18175839460244014133",
  "areaServed": [
    { "@type": "Place", "name": "Sector 53, Gurugram" },
    { "@type": "Place", "name": "DLF Phase 5" },
    { "@type": "Place", "name": "Golf Course Road" },
    { "@type": "City", "name": "Gurgaon" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "15",
    "bestRating": "5"
  },
  "sameAs": [
    "https://www.instagram.com/krishnachoreographer",
    "https://maps.google.com/maps?cid=18175839460244014133"
  ]
}
</script>
```

---

## Verification:
After committing and pushing, test URLs with [Google Rich Results Test](https://search.google.com/test/rich-results) to verify `DanceSchool` schema is valid without errors.
