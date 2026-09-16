# Task 5: GMB UTM Tracking & Attribution

**Action:** Update the Google Business Profile website link in Google Business Profile Manager.

---

## 1. The URL to Set in GMB:
```text
https://krishnadancefactory.in/salsa-bachata/?utm_source=google&utm_medium=organic&utm_campaign=gbp_listing&utm_content=primary_website_button
```

---

## 2. Why This is Essential for Website Analytics:
* Without this UTM parameter, visitors clicking "Website" on mobile Google Maps have their referrer stripped by mobile Safari / Chrome.
* In GA4, these visitors get recorded as `(direct) / (none)` (which made up 69 sessions / 53 users in your 90-day baseline).
* With this UTM link active, GA4 accurately attributes these sessions to `google / organic` under campaign `gbp_listing`, allowing you to calculate the exact ROI of your local profile.
