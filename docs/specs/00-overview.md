# 00 — Overview

## What we are building

**Scrolly** is a static website that teaches web authors how to build scrollytelling experiences. It is simultaneously:

1. A **tutorial** — long-form pages explain concepts (sticky slides, scroll-linked animation, content schemas, deploying to GitHub Pages).
2. A **live demo** — every concept is illustrated by the page itself using the same primitives it describes.
3. A **starter kit** — readers can clone the repo and have a working content-driven scrollytelling site.

Target audience: intermediate front-end developers comfortable with React and TypeScript who want a batteries-included approach to long-form narrative web content.

## Non-goals

- Not a CMS. Content is files in the repo.
- Not a general animation library. Motion primitives are opinionated and narrow.
- Not server-rendered. Output is static HTML for GitHub Pages.
- Not a design framework. Styling is CSS Modules + custom properties, intentionally small.

## Guiding principles

1. **Content is Markdown.** Authors write `.md` files with YAML frontmatter. No JSX in content.
2. **One primitive, two modes.** Motion components work both on standard scroll pages (viewport triggers) and on presentation slides (scroll-linked), chosen automatically via React context.
3. **Native browser over libraries.** CSS `position: sticky` + IntersectionObserver + framer-motion cover the full surface area. No GSAP, no react-scrollama.
4. **Accessibility is baseline.** `prefers-reduced-motion` is honored by every motion primitive; keyboard navigation works.
5. **Build-time validation.** Frontmatter is Zod-validated; invalid content fails the build, not the browser.
6. **Static export only.** No runtime server. Output goes to `out/` and ships to GitHub Pages.

## Scope (v1)

Included:
- Two layouts: `standard` (long-scroll article) and `presentation` (sticky-slide deck).
- Content pipeline: Markdown + YAML frontmatter, Zod schema, dynamic routing, `generateStaticParams`.
- Motion primitives: `Reveal`, `LayeredRevealGroup`, `DriftMedia`, `SceneCard`, `ParallaxBackground`, `PresentationSlide`, `PresentationProgress`.
- Design tokens + CSS Modules.
- Visualization hook: fenced code blocks with a language tag render React components.
- Unit tests (Vitest) for parsers/repo/schema; E2E (Playwright) for scroll behavior.
- GitHub Pages deploy via Actions.

Deferred to later:
- Search / full-text indexing.
- Comment system.
- Dark mode.
- Multi-language content.

## Success criteria

- `npm run build` produces a static `out/` with zero runtime errors.
- A new author can add a page by dropping a single `.md` file under `content/pages/` and see it live after push.
- Scroll animations run at 60fps on a mid-range laptop; drop silently to static under reduced-motion.
- A Playwright test confirms presentation-mode slides advance via scroll.
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95 on homepage.

## Relationship to the reference project

Patterns are ported from [docs/bseai_degree](../docs/bseai_degree). Where the reference is coupled to its domain (e.g. `BloomsTaxonomy.tsx`), we **generalize**, not copy, to keep Scrolly topic-neutral.
