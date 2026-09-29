# Task 3: GA4 Click Conversion Tracking Snippet

**Files to Modify:**
- `index.html`
- `salsa-bachata/index.html`
- `kids-dance-classes/index.html`
- `private-classes/index.html`
- `wedding-choreography/index.html`
- `guides/best-salsa-bachata-classes-in-gurgaon/index.html`

**Location:** Right before the closing `</body>` tag on each page.

---

## Existing handlers to update:

Update the click handlers already present on each page; do not insert a duplicate script. Leave `page_location` unset in these event payloads so GA4 supplies the full page URL automatically.

```html
<!-- GA4 Conversion Event Tracking: Phone Calls & WhatsApp Clicks -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // 1. Track Phone Calls (Clean Single Event)
    document.querySelectorAll('a[href^="tel:"]').forEach(function(callLink) {
      callLink.addEventListener('click', function() {
        if (typeof gtag === 'function') {
          gtag('event', 'click_call', {
            'event_category': 'Leads',
            'event_label': this.getAttribute('href')
          });
        }
      });
    });

    // 2. Track WhatsApp Inquiries (Clean Single Event)
    document.querySelectorAll('a[href*="wa.me"]').forEach(function(waLink) {
      waLink.addEventListener('click', function() {
        if (typeof gtag === 'function') {
          gtag('event', 'click_whatsapp', {
            'event_category': 'Leads',
            'event_label': this.getAttribute('href')
          });
        }
      });
    });
  });
</script>
```

---

## Dashboard Steps in GA4 (Property ID: 546125240):
1. Open [analytics.google.com](https://analytics.google.com/).
2. Go to **Admin** → **Data display** → **Events** (or **Key Events**).
3. Toggle the **Mark as key event** switch to ON for:
   * `click_call`
   * `click_whatsapp`
