# Shared website tracking

GA4, Microsoft Clarity and Meta Pixel are configured in `/tracking.js`. Edit IDs or loading behavior there instead of copying provider snippets into pages.

Add this line once inside the `<head>` of every new HTML page, before page interaction scripts:

```html
<link rel="stylesheet" href="/privacy.css">
<script src="/tracking.js"></script>
```

The root-relative URL works for all page depths on krishnadancefactory.in. A new page still needs this line; no template/build system has been introduced.

The loader only runs on HTTPS at krishnadancefactory.in or www.krishnadancefactory.in and ignores repeated initialization. Local/staging previews send no events. Existing page JavaScript continues to send GA4 contact-click and scroll events. Meta records PageView only.

The script now provides Accept all, Reject optional and granular analytics/advertising preferences. Add a footer link to `/privacy-policy/` and a `<button type="button" data-cookie-preferences>Cookie preferences</button>` on new pages.

Optional provider scripts are blocked until the corresponding choice is granted. Google Consent Mode v2 and Clarity consent signals reflect the choices. Meta loads only with advertising permission. Pre-consent GA4 events are discarded. Withdrawal clears accessible provider cookies and reloads to stop loaded scripts; other tabs reload when the stored choice changes. Preferences expire after 180 days. The banner also works in local previews, without sending provider events.

Privacy Policy: `/privacy-policy/`. Deployment, real browser provider behavior and Meta Test Events receipt must still be verified after publishing. Consent gating can reduce recorded visits/events compared with the previous unconditional tags.
