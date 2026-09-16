# Task 4: Mobile CRO & Sticky CTA Polish

**Audit Finding:** 82.8% of GMB users and 90%+ of ad traffic access KDF on mobile devices. Fast, friction-free actions are critical to prevent bounces.

---

## 1. Sticky Bottom Action Bar Verification
Ensure that on screens `< 900px`, the sticky bar remains fixed at the bottom of the viewport with zero z-index conflicts.

### Standard CSS Rule (Check in style.css or inline `<style>`):
```css
.sticky-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 60;
}
.sticky-cta a {
  flex: 1;
  text-align: center;
  padding: 16px 10px;
  font-weight: 800;
  font-size: 1rem;
  text-decoration: none;
}
.sticky-cta .call {
  background: var(--gold, #d4a942);
  color: #1a1400;
}
.sticky-cta .wa {
  background: #25d366;
  color: #06300f;
}
@media (min-width: 900px) {
  .sticky-cta { display: none; }
}
```

---

## 2. Cumulative Layout Shift (CLS) Prevention
Ensure every logo and hero image has explicit width and height attributes in HTML to avoid layout jumping on mobile:
```html
<img src="kdf-logo.png" alt="Krishna Dance Factory logo" width="44" height="44" />
```

---

## 3. High-Converting WhatsApp Prefills

Ensure WhatsApp links on both landing pages use pre-filled messages:

* **Salsa / Bachata:**
  ```text
  https://wa.me/919599353649?text=Hi%20Krishna!%20I%20want%20to%20check%20availability%20for%20a%20free%20Salsa%2FBachata%20trial%20in%20a%20weekend%20batch%20at%20Sector%2053.
  ```

* **Kids Dance Classes:**
  ```text
  https://wa.me/919599353649?text=Hi%20Krishna!%20I%20want%20to%20book%20a%20FREE%20Saturday%20trial%20kids%20dance%20class%20for%20my%20child.%20Child%27s%20age:%20___
  ```
