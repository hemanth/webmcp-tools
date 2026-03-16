```markdown
# Design System Specification: High-End Editorial Leather

## 1. Overview & Creative North Star
**Creative North Star: "The Artisanal Archive"**

This design system rejects the "cookie-cutter" e-commerce grid in favor of a digital experience that feels like a bespoke leather-bound editorial. We aim to replicate the tactile, sensory experience of high-end craftsmanship through **Tonal Layering** and **Intentional Asymmetry**. 

The design breaks the "template" look by treating the screen as a canvas of stacked materials. We utilize expansive white space (breathing room) and overlapping elements to create a sense of depth and curated luxury. This system doesn't just sell products; it archives a legacy.

---

## 2. Colors & Surface Philosophy

Our palette is rooted in the "Artisan’s Workshop"—rich earth tones, tanned hides, and sun-bleached creams.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Layout boundaries must be achieved through:
- **Tonal Shifts:** Transitioning from `surface` (#fff8f6) to `surface-container-low` (#faf2f0).
- **Negative Space:** Using the larger increments of our Spacing Scale (e.g., `16` or `20`) to create "invisible" containment.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper and leather. 
- **Base Layer:** `surface` (#fff8f6) for the overall page background.
- **Structural Sections:** `surface-container` (#f4ecea) for editorial blocks or product descriptions.
- **Interactive Elements:** `surface-container-lowest` (#ffffff) for cards or "floating" UI elements to give them a natural, bright lift against the warmer background.

### Signature Textures & Glassmorphism
To avoid a flat "digital" feel:
- **The Glass Rule:** For floating navigation or overlays, use `surface` with an 85% opacity and a `20px` backdrop blur. This allows the rich product photography to bleed through the UI, softening the experience.
- **The Gradient Soul:** Main CTAs should use a subtle linear gradient from `primary` (#26170c) to `primary-container` (#3d2b1f) to mimic the natural patina and light-catch of finished leather.

---

## 3. Typography: The Editorial Voice

We pair a timeless serif with a modern, architectural sans-serif to bridge the gap between tradition and contemporary luxury.

- **Display & Headlines (`notoSerif`):** Used for brand storytelling and product titles. High-contrast and elegant.
    - *Usage:* `display-lg` (3.5rem) should be used with generous letter-spacing (-0.02em) for hero moments.
- **Body & Labels (`manrope`):** A clean, highly legible sans-serif for technical details and navigation.
    - *Usage:* `body-lg` (1rem) for product descriptions; `label-md` (0.75rem) in all-caps with +0.1em tracking for category tags.

The hierarchy is intentionally dramatic. A large `display-md` headline may sit directly adjacent to a small `body-sm` caption, creating a "boutique" editorial rhythm.

---

## 4. Elevation & Depth

We convey importance through **Tonal Layering** rather than traditional drop shadows.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a "soft lift" that feels organic to the material.
- **Ambient Shadows:** Only use shadows for high-priority floating elements (e.g., Cart Drawer, Modals).
    - **Specs:** `Y: 12px, Blur: 32px, Color: rgba(30, 27, 26, 0.06)`. This tinted shadow mimics natural light hitting a physical surface.
- **The Ghost Border:** If accessibility requires a stroke (e.g., in high-glare environments), use `outline-variant` (#d2c4bc) at 20% opacity. **Never use 100% opaque borders.**

---

## 5. Components

### Buttons
- **Primary:** Background: `primary` (#26170c); Text: `on-primary` (#ffffff). Shape: `md` (0.375rem) roundedness. 
- **Secondary (The "Patina" Button):** Background: `surface-container-highest`; Text: `primary`. On hover, shift to `secondary-container`.
- **Tertiary:** No background. `label-md` typography with a subtle `primary` underline (2px) offset by `0.35rem`.

### Input Fields
- **Styling:** Use "Soft Fill" instead of boxes. Background: `surface-container-high`; Shape: `sm`.
- **States:** On focus, the background remains, but a `primary` 1px "Ghost Border" (20% opacity) appears.

### Cards & Lists
- **The "No-Divider" Rule:** Forbid 1px horizontal lines. Separate list items using `spacing-4` (1.4rem) and subtle background shifts.
- **Tactile Cards:** Product cards should use `surface-container-lowest` with a `lg` (0.5rem) corner radius. Use a `3.5` (1.2rem) padding to give the product imagery space to "breathe."

### Interactive Chips
- **Selection:** Use `primary-fixed` (#fbddca) with `on-primary-fixed` (#28180d) text. The warm tan color signals the "tanned leather" heritage of the brand.

---

## 6. Do’s and Don’ts

### Do
- **Do** use asymmetrical layouts. A product image may be offset from its description to create an editorial feel.
- **Do** utilize the `surface-container` tiers to create hierarchy. The most important content should always be on the "brightest" surface (`surface-container-lowest`).
- **Do** maintain a minimum contrast ratio of 7:1 for all body text to ensure WCAG AAA compliance against the cream backgrounds.

### Don’t
- **Don’t** use pure #000000 black for text. Use `on-surface` (#1e1b1a) to maintain a soft, premium warmth.
- **Don’t** use standard "drop shadows" on buttons. Let the color weight (`primary`) provide the "clickability" signal.
- **Don’t** crowd the layout. If in doubt, increase the spacing to the next tier in the scale (e.g., move from `8` to `10`).

---

## 7. Signature Interaction: The "Material" Hover
Whenever a user hovers over a product or CTA, apply a subtle scale-up (1.02%) and a transition from `surface-container-low` to `surface-container-highest`. This creates a "tactile" feedback loop, as if the user is reaching out and touching the leather.```