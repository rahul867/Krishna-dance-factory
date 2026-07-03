# Photo Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive photo-led hero above the existing animated homepage hero and deploy it to the live custom domain.

**Architecture:** Copy the supplied photograph into the static image directory, add one isolated React function to the compiled bundle, and prepend it to the existing Home component. Keep presentation in the existing brand override stylesheet so the current generated stylesheet and animated hero remain unchanged.

**Tech Stack:** Static React bundle, React Router link component, CSS, GitHub Pages, Cloudflare.

---

### Task 1: Add the hero photograph

**Files:**
- Create: `images/kdf-photo-hero.jpg`

- [ ] **Step 1: Copy the supplied image**

Run:

```powershell
Copy-Item -LiteralPath 'C:\Users\panch\Desktop\New folder\56.jpg' -Destination 'images\kdf-photo-hero.jpg'
```

Expected: `images/kdf-photo-hero.jpg` exists and retains the 4000 x 3000 source dimensions.

- [ ] **Step 2: Verify the asset**

Run:

```powershell
Get-Item images\kdf-photo-hero.jpg
```

Expected: a non-zero file size.

### Task 2: Add the photo hero component

**Files:**
- Modify: `assets/index-kdf-pages-fix.js`

- [ ] **Step 1: Record the pre-change structural assertion**

Run:

```powershell
$t=Get-Content assets\index-kdf-pages-fix.js -Raw
([regex]::Matches($t,'children:\[k\.jsx\(g2')).Count
```

Expected: `1`, proving the Home component currently begins with the animated hero.

- [ ] **Step 2: Add the component before `q2`**

Insert a function that renders:

```javascript
function kdfPhotoHero(){
  return k.jsxs("section",{
    className:"kdf-photo-hero",
    children:[
      k.jsx("img",{src:"./images/kdf-photo-hero.jpg",alt:"Partner dance performance at Krishna Dance Factory",className:"kdf-photo-hero__image"}),
      k.jsx("div",{className:"kdf-photo-hero__overlay"}),
      k.jsxs("div",{className:"kdf-photo-hero__content",children:[
        k.jsx("p",{className:"kdf-photo-hero__eyebrow",children:"Krishna Dance Factory"}),
        k.jsxs("h1",{className:"kdf-photo-hero__title",children:["Dance Beyond",k.jsx("span",{children:"Every Beat"})]}),
        k.jsx("p",{className:"kdf-photo-hero__body",children:"Discover Bachata, Bollywood and partner dance experiences created to build confidence, connection and unforgettable movement."}),
        k.jsx(to,{to:"/classes",className:"kdf-photo-hero__cta",children:"Explore Classes"})
      ]})
    ]
  })
}
```

- [ ] **Step 3: Prepend it to Home**

Change the Home children array from:

```javascript
children:[k.jsx(g2,{...})
```

to:

```javascript
children:[k.jsx(kdfPhotoHero,{}),k.jsx(g2,{...})
```

- [ ] **Step 4: Verify JavaScript syntax and structure**

Run:

```powershell
node --check assets\index-kdf-pages-fix.js
```

Expected: exit code `0`.

### Task 3: Add responsive presentation

**Files:**
- Modify: `assets/kdf-brand.css`
- Modify: `index.html`

- [ ] **Step 1: Add isolated hero styles**

Add CSS for a `100svh` full-bleed section, an absolutely positioned `object-fit: cover` image, a black `rgba(0,0,0,.7)` overlay, and a right-aligned desktop content container. At `max-width: 767px`, move content to the bottom center, use centered text, and constrain padding so no text clips.

- [ ] **Step 2: Update cache-busting values**

Change both changed asset query strings in `index.html` to `v=20260703-photo-hero`.

- [ ] **Step 3: Run static checks**

Run:

```powershell
git diff --check
node --check assets\index-kdf-pages-fix.js
```

Expected: both commands exit `0`.

### Task 4: Verify and deploy

**Files:**
- No additional source files.

- [ ] **Step 1: Verify desktop rendering**

Open `http://127.0.0.1:4173/` at 1280 x 720. Expected: photo hero is first, copy is right-aligned, navigation remains visible, and the old animated hero appears directly below.

- [ ] **Step 2: Verify mobile rendering**

Open the same route at 390 x 844. Expected: copy is centered near the bottom, dancers remain visible, and there is no incoherent overlap.

- [ ] **Step 3: Exercise the CTA**

Click `Explore Classes`. Expected: URL changes to `/classes` and the classes page renders.

- [ ] **Step 4: Check console health**

Expected: no relevant app errors or framework overlay.

- [ ] **Step 5: Commit and deploy**

Run:

```powershell
git add assets/index-kdf-pages-fix.js assets/kdf-brand.css images/kdf-photo-hero.jpg index.html
git commit -m "Add photo hero to homepage"
git push origin main
git push origin main:gh-pages
```

- [ ] **Step 6: Verify production**

Open `https://krishnadancefactory.in/?v=photo-hero`. Expected: the new first hero and supplied photograph render successfully with no relevant console errors.
