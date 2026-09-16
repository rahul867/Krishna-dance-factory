# Task 3: GA4 Click Conversion Tracking Snippet

**Files to Modify:**
- `index.html`
- `salsa-bachata/index.html`
- `kids-dance-classes/index.html`
- `private-classes/index.html`
- `wedding-choreography/index.html`

**Location:** Right before the closing `</body>` tag on each page.

---

## Code to Insert:

```html
<!-- GA4 Conversion Event Tracking: Phone Calls & WhatsApp Clicks -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // 1. Track Click-to-Call Clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(function(callLink) {
      callLink.addEventListener('click', function() {
        if (typeof gtag === 'function') {
          gtag('event', 'phone_call_click', {
            'event_category': 'Leads',
            'event_label': this.getAttribute('href'),
            'page_location': window.location.pathname
          });
        }
      });
    });

    // 2. Track WhatsApp Inquiries
    document.querySelectorAll('a[href*="wa.me"]').forEach(function(waLink) {
      waLink.addEventListener('click', function() {
        if (typeof gtag === 'function') {
          gtag('event', 'whatsapp_chat_click', {
            'event_category': 'Leads',
            'event_label': this.getAttribute('href'),
            'page_location': window.location.pathname
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
2. Go to **Admin** → **Data display** → **Events**.
3. Toggle the **Mark as conversion** switch to ON for:
   * `phone_call_click`
   * `whatsapp_chat_click`
