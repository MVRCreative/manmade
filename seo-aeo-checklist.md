# Technical SEO & AEO Checklist

This is the developer's pre-launch checklist for the technical foundations of search and answer-engine visibility. You won't usually own the copy or keyword strategy — that's the client's or a marketer's job — but you do own everything that makes the page *machine-readable*, fast, and properly structured. A great landing page with broken metadata is a page that doesn't exist as far as Google and Claude are concerned.

This list assumes Next.js (App Router) but the principles apply anywhere.

---

## What This Covers

- **SEO** — making the page findable and rankable in traditional search engines (Google, Bing).
- **AEO** — making the page parseable and citeable by answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews, Bing Copilot).
- **Technical hygiene** — the foundational stuff (crawlability, performance, indexing) that affects both.

This is not a copy or content strategy doc. If copy issues come up during your audit, flag them to the client — don't fix them silently.

---

## Per-Page Metadata Checklist

For every page that ships, confirm:

### Title Tag

- [ ] `<title>` is set, unique to this page, and under 60 characters
- [ ] Includes the primary topic of the page near the front
- [ ] Brand name appears (typically at the end, separated by `|` or `—`)
- [ ] Not auto-generated from a filename or slug — the client or designer should sign off on it
- [ ] In Next.js: set via `export const metadata = { title: ... }` in the page or use a `title.template` in the root layout

**Check it:** open the page, look at the browser tab. If it says "Home | Site Name" on every page, you have a bug.

### Meta Description

- [ ] `<meta name="description">` is set, unique to this page, and 140–160 characters
- [ ] Reads as a coherent sentence or two, not a keyword list
- [ ] Describes what's actually on the page (Google will rewrite it if it doesn't match)
- [ ] Includes the primary topic naturally
- [ ] Flagged to the client if missing — don't invent copy yourself, but don't ship a page without one

**Check it:** view source, search for `name="description"`. Confirm it's there and not duplicated from another page.

### Canonical URL

- [ ] `<link rel="canonical">` points to the preferred version of this URL
- [ ] No trailing slash inconsistencies (pick one convention and enforce it site-wide)
- [ ] No query parameters in the canonical unless they're meaningful
- [ ] HTTPS, not HTTP
- [ ] In Next.js: set via `metadata.alternates.canonical`

**Why this matters:** duplicate content from `/page`, `/page/`, `?utm=...`, and `http://` versions can split your ranking signals across four URLs that should be one.

### Open Graph (Social Share)

- [ ] `og:title` set (can match `<title>` or be tuned for social)
- [ ] `og:description` set (can match meta description)
- [ ] `og:image` set — 1200×630px, under 1MB, hosted on the same domain or a fast CDN
- [ ] `og:url` set to the canonical URL
- [ ] `og:type` set (`website` for landing pages, `article` for blog posts)
- [ ] `og:site_name` set

**Check it:** paste the URL into [opengraph.xyz](https://www.opengraph.xyz) or LinkedIn's Post Inspector before launch. If the image is broken or the title is wrong, fix it before the client posts the URL anywhere.

### Twitter / X Card

- [ ] `twitter:card` set to `summary_large_image` for visual landing pages
- [ ] `twitter:title`, `twitter:description`, `twitter:image` set (can mirror OG)
- [ ] If the client has a Twitter handle, include `twitter:site`

### Favicon & Touch Icons

- [ ] `favicon.ico` present at root
- [ ] `apple-touch-icon.png` (180×180) for iOS home screen
- [ ] `manifest.json` referenced if the site is meant to be installable
- [ ] All icons render correctly when the page is added to a phone's home screen

---

## Structured Data (Schema.org / JSON-LD)

This is one of the biggest AEO wins available and one of the most commonly skipped. Answer engines lean heavily on structured data to understand what a page is about and to cite it confidently.

- [ ] At minimum: `Organization` or `WebSite` schema on the homepage
- [ ] `WebPage` schema on every page
- [ ] Use the appropriate type for the content:
  - **Product** for product pages (Mode B book pages especially — `Product` + `Offer` is critical for any product with a price)
  - **SoftwareApplication** for app marketing pages (Mode A — Canon+ would use this)
  - **Article** or **BlogPosting** for editorial content
  - **VideoObject** for any embedded video
  - **BreadcrumbList** for navigable hierarchies
  - **FAQPage** if there's a real FAQ section (don't fake one for the schema)
  - **Review** / **AggregateRating** if there are real reviews on the page
- [ ] JSON-LD embedded as a `<script type="application/ld+json">` in the page head
- [ ] In Next.js: render schema as a script tag inside the page component, or via a dedicated `<JsonLd>` component
- [ ] Validate every page's schema in [Google's Rich Results Test](https://search.google.com/test/rich-results) before launch

**AEO-specific note:** schema is how answer engines decide *what kind of thing* your page is. A page about a book with proper `Product` schema is far more likely to be cited correctly by Claude or ChatGPT when someone asks about that book than the same page with no schema.

---

## Crawlability & Indexing

- [ ] `robots.txt` exists at the root and is correct for the environment
- [ ] Staging environments **block all indexing** (`Disallow: /` + `X-Robots-Tag: noindex` header)
- [ ] Production **allows indexing** of public pages
- [ ] Pages that shouldn't be indexed (thank-you pages, internal tools, gated content) have `<meta name="robots" content="noindex">`
- [ ] `sitemap.xml` exists, lists every public page with `lastmod` dates, and is referenced from `robots.txt`
- [ ] In Next.js App Router: generate `sitemap.ts` and `robots.ts` rather than maintaining static files
- [ ] Sitemap submitted to Google Search Console after launch
- [ ] No accidental `noindex` on production pages (this happens — check it explicitly)

**The single most embarrassing launch bug** is shipping a site with `noindex` left on from staging. Audit this last, before the DNS cuts over.

---

## Performance (Core Web Vitals)

These directly affect ranking. Google has been clear that Core Web Vitals are a ranking factor, and answer engines preferentially cite faster-loading, more stable pages.

- [ ] **LCP (Largest Contentful Paint) < 2.5s** on a throttled mid-range mobile device
- [ ] **CLS (Cumulative Layout Shift) < 0.1** — every image and embed has explicit dimensions
- [ ] **INP (Interaction to Next Paint) < 200ms** — replaces the old FID metric
- [ ] Hero image uses `priority` prop in `next/image` and is in a modern format (AVIF preferred, WebP fallback)
- [ ] Fonts loaded via `next/font` (eliminates FOUT and CLS from font swap)
- [ ] No render-blocking scripts above the fold
- [ ] Third-party scripts (analytics, chat widgets, pixels) loaded with `next/script` and the correct strategy (`afterInteractive` or `lazyOnload`)
- [ ] Lighthouse score 90+ on mobile for Performance, Accessibility, Best Practices, SEO
- [ ] Real-device test on a mid-range Android or iPhone SE, not just DevTools throttling

---

## Accessibility (Affects SEO Too)

Accessibility issues are SEO issues. Screen reader friendly = answer engine friendly.

- [ ] All images have meaningful `alt` text (or empty `alt=""` for purely decorative images — never omit the attribute)
- [ ] Heading hierarchy is logical (`h1` → `h2` → `h3`, no skipping levels, exactly one `h1` per page)
- [ ] Interactive elements are real buttons or links, not styled `<div>`s
- [ ] Color contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text)
- [ ] Focus states are visible and well-designed (the designer cares about this — confirm with them)
- [ ] Form fields have associated `<label>` elements
- [ ] No automatic-play media with sound

---

## Open Graph Image Quality Control

The OG image is the most-seen, least-audited piece of metadata. Get it right.

- [ ] Image is 1200×630px (the modern standard)
- [ ] Under 1MB (ideally under 300KB)
- [ ] Readable at thumbnail size (text isn't too small)
- [ ] Brand-consistent with the rest of the site
- [ ] Doesn't bleed important content to the edges (some platforms crop)
- [ ] Tested on actual LinkedIn, Twitter/X, Slack, iMessage, and Facebook preview — they all render slightly differently

**Tip:** for sites with many pages, consider dynamic OG image generation with `@vercel/og` so each page gets a tailored image without manual design work per page.

---

## AEO-Specific Considerations

Answer engines work differently from traditional search. They pull content into a synthesized answer rather than just linking to it. To increase the odds of being cited:

- [ ] **Clear, factual page content.** Answer engines prefer pages where the key claims are stated cleanly. If the page is all marketing speak with no substantive content, it won't get cited. (This is a copy issue — flag to the client.)
- [ ] **Headings that mirror real user questions.** "What is X?" "How does X work?" type subheads get picked up more often than clever brand-voice headings.
- [ ] **Structured data is non-negotiable.** AEO leans on schema even more than SEO does.
- [ ] **Author and organization information.** Schema for `author`, `publisher`, `organization` increases citation confidence. Answer engines want to attribute claims to identifiable entities.
- [ ] **Fast, accessible, mobile-friendly pages.** Same technical foundations as SEO, but doubly important since AI crawlers are often more aggressive about timeouts.
- [ ] **Don't gate content unnecessarily.** If a page is behind a login or aggressive popup, answer engines can't read it.
- [ ] **Consider an `llms.txt` file.** This is an emerging convention (similar to `robots.txt`) for instructing LLMs about your site. Not yet broadly required, but easy to add and forward-compatible. See [llmstxt.org](https://llmstxt.org).

---

## Pre-Launch Audit (Do This Before DNS Cutover)

Run this every time, on the production URL, before the site goes public:

1. [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) — every page type
2. [ ] [Google PageSpeed Insights](https://pagespeed.web.dev) — every page type, mobile + desktop
3. [ ] [OpenGraph.xyz](https://www.opengraph.xyz) — homepage and a representative interior page
4. [ ] [Sitemap validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html) — confirm the sitemap is well-formed
5. [ ] Manually view-source on the homepage and a key landing page — confirm title, description, canonical, OG tags, and JSON-LD are all present and correct
6. [ ] `curl -I` the production URL — confirm `X-Robots-Tag` is not set to `noindex`
7. [ ] Search `site:yourdomain.com` in Google after launch (give it a few days) — confirm pages are getting indexed

---

## Things to Flag to the Client (Not Fix Yourself)

You're the technical owner, not the content owner. When you spot any of these, raise them — don't paper over them:

- Missing or generic meta descriptions
- A `<title>` that's the same across multiple pages
- An OG image that looks broken or off-brand
- Page copy that's so thin no answer engine would cite it
- Missing alt text on imagery (you can write *technical* alt text for decorative images, but content imagery needs human-written alt text)
- Misleading or stuffed headings
- Old/stale dates on pages claiming to be current

A short, clear "before launch, the client should sign off on the following" list at the end of the project saves a lot of back-and-forth.

---

## Per-Project Audit Template

Drop this into the project's `PROJECT.md` as part of the Stage 5 polish checklist:

```
## SEO/AEO Pre-Launch Audit

- [ ] Every page has a unique <title> under 60 chars
- [ ] Every page has a meta description 140-160 chars
- [ ] Every page has a canonical URL
- [ ] Open Graph tags set with valid 1200×630 image
- [ ] JSON-LD schema present and validated for every page type
- [ ] robots.txt and sitemap.xml correct for production
- [ ] No stray noindex tags from staging
- [ ] Lighthouse 90+ on mobile for all key pages
- [ ] LCP < 2.5s, CLS < 0.1, INP < 200ms on real device
- [ ] All images optimized, lazy-loaded, with alt text
- [ ] Heading hierarchy clean and logical
- [ ] Google Search Console verified and sitemap submitted
- [ ] llms.txt considered (optional but recommended)
- [ ] Client signed off on titles, descriptions, OG copy
```

---

## File Reference

This document lives alongside:

- `README.md` — project kickoff and staged workflow
- `designer-bio.md` — designer persona
- `developer-profile.md` — developer persona

SEO/AEO work belongs primarily in **Stage 5** (polish) of the kickoff process, but a few items — meta tags, schema scaffolding, sitemap generation — should be set up early enough that they're not an afterthought. Add the boilerplate during Stage 1 so it grows with the site, not after it.
