# Photo Hero Design

## Goal

Add a new photo-led hero above the current animated homepage hero. The existing hero and all sections below it remain unchanged.

## Approved Layout

- Use `56.jpg` as a full-bleed background image in a viewport-height section.
- Render the image with `object-fit: cover` and a black overlay that leaves the photo at approximately 30% visual opacity.
- Keep the navigation above the new hero.
- Place the copy on the right side on desktop, vertically centered within the hero.
- Move the copy to a centered, lower position on mobile so the dancers remain visible.
- Keep the current animated `Where Passion Meets Rhythm` hero immediately below the new section.

## Content

- Eyebrow: `Krishna Dance Factory`
- Heading: `Dance Beyond Every Beat`
- Body: `Discover Bachata, Bollywood and partner dance experiences created to build confidence, connection and unforgettable movement.`
- CTA: `Explore Classes`, linking to `/classes`

## Visual Details

- White display typography with the existing coral accent for the CTA.
- No card behind the copy.
- Constrain desktop copy width to keep line lengths readable.
- Preserve a clear first-viewport brand signal and maintain sufficient contrast over the photograph.

## Implementation

- Add the supplied image to the existing `images` directory.
- Add a small new photo-hero component in the compiled homepage bundle and render it before the existing hero component.
- Add isolated responsive styles in the existing brand override stylesheet.
- Add cache-busting query values in `index.html` for the changed assets.

## Verification

- Confirm the new hero is first on direct homepage load.
- Confirm the old animated hero appears directly below it and still animates.
- Check desktop and 390px mobile viewports for text placement, clipping, overlap and horizontal overflow.
- Confirm the image loads, CTA reaches the classes route, and no relevant console errors appear.
