# Design System Document: The Kinetic Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Living Manuscript"**

This design system rejects the sterile, symmetrical "SaaS-look" in favor of a high-octane, graphic-novel-inspired digital experience. It is designed to feel like a high-end portfolio printed on heavy-stock paper, infused with the kinetic energy of Japanese manga. We move beyond simple "anime themes" by focusing on the tension between clean editorial space and aggressive, hand-drawn ink work.

The system utilizes intentional asymmetry and "broken" layouts to guide the eye, mimicking the way a reader navigates a manga page. We replace traditional digital polish with raw, expressive textures—screentones, ink bleeds, and sharp, angular containers.

## 2. Colors & Textures
The palette is rooted in a brutalist monochrome base, punctuated by a singular, high-voltage accent: `primary` (#ba0029).

### Tone & Intent
- **Primary (#ba0029):** The "Blood Ink." Used exclusively for call-to-actions, focus states, and key narrative emphasis.
- **Surface Hierarchy:** We utilize `surface` (#f9f9f9) for the primary "paper" background. Depth is created by nesting `surface-container` tiers to simulate overlapping paper panels.
- **The "No-Line" Exception:** Unlike standard systems, we *do* use borders, but they are never "1px solid." Borders must use the `on-surface` (#1a1c1c) token and represent "Ink Strokes"—variable in weight and purposefully heavy.

### Signature Textures (The Manga DNA)
- **Screentone Overlays:** Use a halftone dot pattern (CSS radial gradients or SVG patterns) on `surface-container-high` elements to create depth without using drop shadows.
- **Ink Bleed:** When transitioning between major sections, use an asymmetrical "ink splash" or jagged panel edge instead of a straight horizontal line.
- **Glassmorphism:** Reserved for "HUD" elements (navigation/modals). Use `surface` at 80% opacity with a heavy `backdrop-filter: blur(12px)` to maintain legibility over chaotic panel layouts.

## 3. Typography
The typographic strategy balances "The Voice" (Headings) with "The Content" (Body).

### The Scale
- **Display (Space Grotesk, 3.5rem - 2.25rem):** These are your "Sound Effects." Headlines should be set with tight tracking (-0.05em) and often placed at slight angles (±1-2 degrees) to break the horizontal grid.
- **Headline (Space Grotesk, 2rem - 1.5rem):** High-contrast, energetic, and commanding. Use `uppercase` for `headline-lg` to reinforce the graphic novel aesthetic.
- **Title & Body (Manrope, 1.375rem - 0.875rem):** The "Dialogue." Manrope provides a clean, neutral counter-balance to the aggressive headings, ensuring long-form case studies remain readable.
- **Label (Inter, 0.75rem):** Technical metadata. Set in `inter` for maximum precision at small sizes.

## 4. Elevation & Depth
Traditional drop shadows are strictly prohibited. We define depth through **Graphic Layering.**

- **The Layering Principle:** Stack `surface-container-lowest` cards atop `surface-container-low` sections. To signify "lift," use a **Hard Offset Shadow**: a solid block of `secondary_container` offset by 4px or 8px, mimicking a misregistered print effect.
- **Paneling:** Every container should be treated as a manga panel. Use the `0px` roundedness scale—corners must be sharp and lethal.
- **The "Ghost Border":** For interactive elements that aren't currently focused, use `outline-variant` at 20% opacity. Upon hover, snap to a 3px solid `on-surface` "Ink Stroke."

## 5. Components

### Buttons
- **Primary:** Background `primary`, text `on-primary`. Styling: 2px solid `on-surface` border with a 4px hard-offset "shadow" in `on-surface`. On hover, the button shifts -2px, -2px to "cover" the shadow.
- **Secondary:** Background `surface`, text `on-surface`. 2px solid `on-surface` border.
- **Tertiary:** No border. `Space Grotesk` uppercase text with a `primary` underline that expands on hover.

### Panels (Cards)
- Forbid standard shadows. Panels use `surface-container-lowest`.
- **The Panel Break:** Images inside cards should occasionally "break" the container boundary, overlapping the border to create a 3D effect common in manga action sequences.

### Input Fields
- Underline-only style using `outline` token. 
- On focus, the line transforms into a 3px thick `primary` stroke. 
- Labels use `label-md` and are placed *inside* the stroke area, mimicking margin notes.

### Chips
- Sharp-edged rectangles. Background `secondary_container`. 
- Use a halftone pattern background for "Selected" states to make them feel "filled in" with ink.

### Action Ticker (Custom Component)
- A scrolling marquee of text (using `label-md`) at the top or bottom of the screen, providing a "News Feed" or "System Status" feel, common in cyberpunk anime interfaces.

## 6. Do's and Don'ts

### Do
- **Embrace Asymmetry:** Align the left side of a container to the grid, but let the right side bleed off-screen or end prematurely.
- **Use High Contrast:** Stick to the #f9f9f9 and #1a1c1c relationship. If a layout feels "grey," it is failing.
- **Animate "Snappy":** Transitions should be instant or use "Step" timing functions (e.g., `steps(4)`) to mimic frame-by-frame animation rather than smooth, floaty eases.

### Don't
- **No Border Radii:** The `0px` rule is absolute. Rounded corners break the "ink on paper" illusion.
- **No Standard Gradients:** Avoid "web 2.0" soft gradients. If you need a transition, use a halftone pattern or a hard-edge color split.
- **No Centered Layouts:** Avoid perfectly centered "hero" sections. Offset your text to the left or right and fill the negative space with a large-scale graphic or screentone block.