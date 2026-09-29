# Task 1: Website Local Schema Markup (JSON-LD)

**Files to Modify:**
- `index.html`
- `salsa-bachata/index.html`
- `kids-dance-classes/index.html`
- `private-classes/index.html`
- `wedding-choreography/index.html`

**Location:** Inside the `<head> ... </head>` tag of each file.

---

## Existing schema to update:

Update the JSON-LD already present on all five pages, including nested `Service.provider` objects. Do not add a second copy. Preserve the existing `#danceschool` entity ID.

```html
<!-- Local business structured data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
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
  "sameAs": [
    "https://www.instagram.com/krishnachoreographer",
    "https://maps.google.com/maps?cid=18175839460244014133"
  ]
}
</script>
```

---

## Verification:
Parse every JSON-LD block after editing. Check that no `DanceSchool` schema type or business `aggregateRating` remains, while the existing `#danceschool` ID and service providers still refer to the same studio. Check the corrected vocabulary with [Schema Markup Validator](https://validator.schema.org/) and use **Code input** in [Google Rich Results Test](https://search.google.com/test/rich-results) before deployment. A valid schema does not promise rankings, Maps synchronization, or review stars.
