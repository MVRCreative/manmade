# Project Kickoff

This is the project template for client work. It's a Next.js + Tailwind + GSAP boilerplate paired with two reference documents that define the design and engineering philosophy:

- `designer-bio.md` — the designer's voice, instincts, and dual-mode aesthetic
- `developer-profile.md` — the engineering values and standards that pair with the designer

Both should be loaded as context in Cursor (in `.cursorrules`, project rules, or pasted into the AI panel) before you start building. They're written as personas so the assistant internalizes the *how* and *why* before the *what*.

---

## The Process

Every new project follows the same staged kickoff. Resist the urge to skip ahead. The order matters because each stage de-risks the next one, and shortcuts at the start tend to cost you 3x at the end.

### Stage 1 — Extract the Design System

**Goal:** Update `/design-system` to reflect this specific project's design tokens before any component work begins.

You'll get the design as Figma screenshots, exported frames, or direct Figma MCP access. Either way, the first job is *not* to build — it's to look.

**What to extract:**

1. **Colors.** Pull every distinct color used in the mockups. Backgrounds, text colors, accent colors, hover states if visible, gradient stops, badge colors. Don't guess at hex values — use a color picker on the actual screenshots, or pull them from the Figma file directly.
2. **Typography.** Identify the font family (or families — remember the designer uses two modes). Note every weight in use, every size, the line-heights, the letter-spacing on display type. Confirm whether the font is licensed and how it should be loaded (Google Fonts, Adobe Fonts, self-hosted .woff2, etc.).
3. **Spacing scale.** Eyeball the rhythm of vertical and horizontal spacing. The designer uses generous, consistent spacing — figure out the base unit (likely 4px or 8px) and the scale that gets used most often.
4. **Border radii.** Pills, cards, tiles, buttons — note the distinct radius values.
5. **Shadows.** Usually minimal or absent in Mode A, but Mode B uses a subtle shadow under book covers. Capture what's there.

**What to update:**

- `/design-system` tokens (colors, fonts, spacing, radii, shadows)
- `tailwind.config.ts` extensions that consume those tokens
- Font loading in `app/layout.tsx` (or wherever the root layout lives)
- A quick visual sanity check page (e.g. `/design-system-preview` route) that renders swatches and type specimens so you can confirm the tokens match the mockups before building anything else

**Do not start on layouts in this stage.** Resist it. Get the foundation right first.

### Stage 2 — Verify Fonts Are Loaded Cleanly

Before you build anything visual, confirm the fonts render correctly. This is its own stage because font issues are the easiest to overlook and the most damaging to the final feel of the site.

- Load fonts via `next/font` (preferred) for automatic optimization and zero layout shift.
- Confirm every weight you'll need is loaded — don't load weights you won't use, but don't omit ones you will.
- Check rendering on both modes if the project uses both (sans for Mode A, serif for Mode B).
- Test on iOS Safari — font rendering varies and the designer chose specific weights for a reason.
- Verify no FOUT or FOIT on slow connections.

### Stage 3 — Layout & Composition (No Images)

**Goal:** Build the structural skeleton of every page using placeholder blocks before any real images go in.

This is the stage where Figma MCP becomes most useful. Pull the layout, the spacing, the type hierarchy, the component composition — get all of that right while the page is still cheap to iterate on.

**Why images come later:**

- Client images are typically large files. Loading them early bogs down hot reload, slows your dev loop, and tempts you to optimize prematurely.
- Layout problems are easier to spot without imagery distracting you.
- Composition issues that look fine with a beautiful photo often fall apart with a placeholder — and the placeholder version is the honest one.

**Use placeholder blocks that respect the aspect ratios:**

- Match the aspect ratio of the real image (3:4 for content cards, 16:9 for hero video, square for audiobook covers, etc.). The layout will only behave correctly if the placeholder occupies the same footprint as the real asset.
- Use a neutral fill — a muted gray with the image dimensions labeled on it is plenty.
- A simple `<div>` with `aspect-ratio` CSS is usually all you need. No need to install a placeholder library.

**What to nail in this stage:**

- Section structure and vertical rhythm
- Responsive behavior at every breakpoint
- Type hierarchy and readability
- Component composition (build the `ContentCard`, `Hero`, `ContentRow`, `Testimonial`, etc., with real text and placeholder imagery)
- Interaction states (hover, focus, active)
- Initial GSAP scaffolding for scroll-triggered reveals — even if the animations are placeholder eases, get the orchestration in place

### Stage 4 — Add Imagery Manually

Once the layout is locked, you can drop real images in. This is usually done manually rather than by the AI assistant — the developer points each image to its home, optimizes it if needed, and confirms the composition still works with the real content.

- Use `next/image` for every image. Set explicit dimensions to prevent layout shift.
- Convert large source files to AVIF or WebP before they ever hit the repo.
- Lazy-load anything below the fold.
- Test the page weight after the swap. If LCP regressed, address it before moving on.

This is also the right moment to revisit any layout that was secretly relying on the placeholder behavior. Sometimes a real photo with a different focal point exposes a centering issue, or a real wordmark needs slightly more breathing room than the gray block had.

### Stage 5 — Turn Off the MCP, Finish Manually

At some point — usually once the major layouts are in and the imagery is placed — the Figma MCP becomes overhead rather than help. The remaining work is polish: refining animations, tightening hover states, fixing edge cases at breakpoints, adjusting copy, handling empty states.

**Turn off the MCP when:**

- All major sections are built and roughly match the mockups
- You're making small, surgical adjustments rather than building new layouts
- You're working on motion, interaction, or performance — none of which the MCP helps with
- You're handling states the designer didn't mock (loading, empty, error)

From here, the developer drives. The designer reviews on the preview URL, and feedback rounds happen on the live site rather than the mockup.

---

## Project Kickoff Checklist

Copy this into a fresh `PROJECT.md` or a GitHub issue at the start of each project:

```
## Stage 1 — Design System
- [ ] Colors extracted and added to /design-system
- [ ] Typography (family, weights, sizes) defined
- [ ] Spacing scale confirmed
- [ ] Border radii defined
- [ ] Shadows defined (if any)
- [ ] Tailwind config updated
- [ ] /design-system-preview route renders correctly

## Stage 2 — Fonts
- [ ] Fonts loaded via next/font
- [ ] All required weights present, no extras
- [ ] Tested on iOS Safari
- [ ] No FOUT/FOIT on throttled connection

## Stage 3 — Layout (No Images)
- [ ] Figma MCP connected and pulling layouts
- [ ] Page structures built with placeholder blocks at correct aspect ratios
- [ ] Responsive behavior verified at every breakpoint
- [ ] Reusable components extracted (ContentCard, Hero, ContentRow, etc.)
- [ ] Interaction states (hover, focus, active) defined
- [ ] GSAP scroll-trigger scaffolding in place

## Stage 4 — Imagery
- [ ] Real images added manually
- [ ] All images use next/image with explicit dimensions
- [ ] Large files converted to AVIF/WebP
- [ ] Below-fold images lazy-loaded
- [ ] LCP measured and within target

## Stage 5 — Polish
- [ ] Figma MCP disconnected
- [ ] Animation timing and easing finalized
- [ ] Hover and interaction states refined
- [ ] Empty / loading / error states handled
- [ ] prefers-reduced-motion respected
- [ ] Preview URL shared with designer for review
- [ ] Lighthouse / Core Web Vitals audited on real device
```

---

## Notes on Working with Cursor

When you open a new project in Cursor, the first thing it should know is *which stage you're in*. The personas in `designer-bio.md` and `developer-profile.md` define the values, but the stage defines the immediate priority.

A useful pattern: start every Cursor session by stating the current stage. For example:

> "We're in Stage 3. The design system tokens are already in place. I need you to build out the homepage layout from this Figma frame using placeholder blocks for all imagery — match the aspect ratios but don't pull in any real images yet."

This keeps the assistant from skipping ahead, generating component code before the tokens are ready, or pulling in real assets when you're still iterating on composition.

---

## When Things Go Sideways

A few common failure modes and how to recover:

- **The design system feels off three pages in.** Stop. Don't try to fix it page-by-page. Go back to `/design-system`, correct the tokens, and let the changes propagate. If they don't propagate cleanly, that's a sign you have hardcoded values somewhere that need to be replaced with token references.
- **The layout looks fine with placeholders but breaks with real images.** Usually means a focal point assumption (centered subject) didn't hold. Either adjust the layout, or coordinate with the designer to crop the images differently.
- **You're fighting Cursor on a specific component.** Often a sign the persona files aren't loaded into context. Re-paste them or confirm `.cursorrules` is being read. The personas are doing real work — without them, the assistant drifts toward generic output.
- **A new page type appears mid-project that doesn't match either Mode A or Mode B.** Treat this as a flag to talk to the designer, not to invent a third mode silently. The two-mode discipline is intentional.

---

## File Reference

| File | Purpose |
|---|---|
| `designer-bio.md` | The designer's voice and aesthetic — load as Cursor context |
| `developer-profile.md` | The engineering values that pair with the designer — load as Cursor context |
| `README.md` | This file — the kickoff process and checklist |
| `/design-system` | Project-specific design tokens, updated in Stage 1 |
| `tailwind.config.ts` | Consumes design-system tokens |
| `app/layout.tsx` | Font loading and root layout |
| `PROJECT.md` (per-project) | The active checklist for the current project |
