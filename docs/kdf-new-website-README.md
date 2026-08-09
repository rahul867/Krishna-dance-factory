# KDF Landing (v2)

Single-file landing page — HTML + Tailwind (CDN) + vanilla JS. No build step, no React.

## Run it

Open `index.html` in a browser, or in VS Code use the **Live Server** extension → Right-click `index.html` → *Open with Live Server*.

## What to change

| What | Where |
|---|---|
| Photos | Every `<img src="https://images.unsplash.com/...">` — drop your own into `images/` and swap the path |
| Colors | `tailwind.config` → `colors` block in `<head>` (`blood` = `#e01a2b`) |
| Fonts | Google Fonts `<link>` + `fontFamily` in the config |
| Class list | `#classes` section — each `<article>` is one card |
| Timetable | `#schedule` — each `.acc` block is one day group |
| Trainers | `#trainers` — three `<article>` cards |
| Testimonials | `quotes` array in the `<script>` at the bottom |
| Phone / email / IG | `#contact` section + the floating WhatsApp link at the bottom |

## Form

The form validates name + 10-digit Indian mobile, then **fakes** a success message. To make it real, uncomment the `fetch` block near the bottom of the script and point it at FormSubmit (or your own endpoint). FormSubmit needs a one-time activation click in the inbox.

## Before going live

1. Replace stock photos with real studio photos, compressed — target under 300KB each.
2. Swap the Tailwind CDN for a compiled stylesheet:
   ```
   npx tailwindcss -i input.css -o styles.css --minify
   ```
   The CDN script prints a console warning in production and adds ~100KB.
3. Add `og:image`, a favicon, and a `sitemap.xml`.
