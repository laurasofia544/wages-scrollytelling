---
status: pending
phase: 03
title: Standard layout + markdown renderer
depends-on: [02]
---

# Phase 03 — Standard layout + markdown renderer

## Objective
Render real markdown through the design system. Ship `StandardLayout`, `MarkdownRenderer` (no visualizations yet), `PageLayoutFactory`, and site chrome.

## Spec references
- [specs/04-layouts.md](../specs/04-layouts.md) §`StandardLayout`
- [specs/06-visualizations.md](../specs/06-visualizations.md) §"Renderer wiring" — adopt the shape of the component map but include **only** the non-viz entries (headings, links, lists, paragraphs, code for inline). Viz tags land in Phase 06.

## Reference code to port

| Reference | Purpose | Target |
|---|---|---|
| `docs/_references/bseai_degree/components/layouts/PageLayoutFactory.tsx` | Layout dispatcher | `src/components/layouts/PageLayoutFactory.tsx` |
| `docs/_references/bseai_degree/components/layouts/StandardLayout.tsx` + `.module.css` | Hero + reading column + sticky ToC | `src/components/layouts/StandardLayout.tsx` + `.module.css` |
| `docs/_references/bseai_degree/components/markdown/MarkdownRenderer.tsx` | MDX component map | `src/components/markdown/MarkdownRenderer.tsx` (viz dispatches commented out / deferred) |
| `docs/_references/bseai_degree/components/page-shell.tsx` | Page outer shell | `src/components/page-shell.tsx` (if useful) |
| `docs/_references/bseai_degree/components/site-header.tsx`, `site-footer.tsx` | Chrome | `src/components/site-header.tsx`, `src/components/site-footer.tsx` |
| `docs/_references/bseai_degree/tests/unit/markdown-renderer.test.tsx` | Renderer tests | `tests/unit/markdown-renderer.test.tsx` |

## Steps

1. **Factory.** Port `PageLayoutFactory`. Keep only `standard` and `presentation` cases. Presentation branch can return `null` or a "coming in Phase 05" placeholder; wire it up fully in Phase 05.
2. **`StandardLayout`.**
   - Hero: grid with `heroImage` (optional) on one side, title + summary on the other.
   - Reading column: max-width from `--slide-measure` or a dedicated `--measure` token (add to globals if missing). Center-aligned.
   - Sticky ToC: right-side nav at ≥ 1100px; hidden below. Generate from H2s in the rendered body. Use `IntersectionObserver` to highlight the active section (port reference pattern if present; otherwise a simple `useEffect`).
3. **`MarkdownRenderer`.**
   - Uses `next-mdx-remote/rsc` with `remarkGfm`.
   - Component map: `h1..h4` → `Heading`, `a` → `ContextualLink`, `p` → `Text`, `ul`/`ol`/`li` → styled defaults (module CSS), `code` inline → styled `<code>`, `pre` → `children` passthrough (viz dispatch lands in Phase 06).
   - **Do not** wrap children in motion primitives yet. Phase 04 adds that.
4. **Site chrome.**
   - `SiteHeader` — brand mark + minimal nav linking to `/getting-started` and `/sticky-slides`. Sticky/top with backdrop blur on scroll (CSS only — no JS).
   - `SiteFooter` — three column blocks: nav repeat, "Built with" credits, link to the source repo and `/docs/specs/`.
5. **Wire into routes.** Replace the placeholder bodies of `src/app/page.tsx` and `src/app/[...slug]/page.tsx` with:
   ```tsx
   const page = await repo.getPageBySlug(slug);
   return <PageLayoutFactory page={page} />;
   ```
6. **Flesh out `content/pages/getting-started.md`** with real H2s and paragraphs so the ToC has something to show.
7. **Unit tests.** Renderer tests: heading mapping, link branching, basePath-awareness on internal links.

## Files created / modified

- `src/components/layouts/PageLayoutFactory.tsx`
- `src/components/layouts/StandardLayout.tsx` + `.module.css`
- `src/components/layouts/PresentationLayout.tsx` (stub — filled in Phase 05)
- `src/components/markdown/MarkdownRenderer.tsx` + `.module.css`
- `src/components/site-header.tsx` + `.module.css`
- `src/components/site-footer.tsx` + `.module.css`
- `src/app/page.tsx`, `src/app/[...slug]/page.tsx` — use factory
- `tests/unit/markdown-renderer.test.tsx`

## Exit checks
- [ ] `npm run build` succeeds; `out/getting-started/index.html` has semantic headings wrapped in `<h1>`/`<h2>` via `Heading`, not raw MDX output
- [ ] Homepage shows hero + summary + body with proper typography
- [ ] ToC shows at viewport width ≥ 1100px and hides below
- [ ] Internal link `/getting-started` rendered via `next/link` (inspect DOM: should be `<a href="/getting-started/">` with basePath applied when `NEXT_PUBLIC_BASE_PATH` is set)
- [ ] `npm run test` passes

## Completion notes

<!-- Filled in after execution -->
