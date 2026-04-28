---
status: pending
phase: 08
title: Content authoring pass
depends-on: [07]
---

# Phase 08 — Content authoring pass

## Objective
With the kit hardened, write the actual teaching content. Each page teaches one concept and references the matching spec and phase file.

## Spec references
- [specs/00-overview.md](../specs/00-overview.md) — voice and scope
- [specs/09-roadmap.md](../specs/09-roadmap.md) §"Milestone 8"

## Reference code
No component code is ported in this phase. Reference the reference project's **prose style and structure** if useful, but all content must be original to Scrolly and topic-neutral (scrollytelling itself, not AI/education).

## Pages to write

| Slug | Layout | Teaches | Anchors |
|---|---|---|---|
| `home.md` | standard | What Scrolly is; "read the series" | Hero + `StatGrid` + CTA group |
| `what-is-scrollytelling.md` | standard | Definition, history, examples, when to use | `Timeline` + `ScrollDemo` |
| `sticky-slides.md` (expand) | presentation | The sticky-stage pattern | `CodeSample` of `PresentationSlide`, `bg`, `split`, `split-reverse` variants |
| `dual-mode-reveals.md` | standard | How `SlideContext` chooses `Viewport` vs `Slide` mode | `CodeSample`, inline `ScrollDemo`, `Mermaid` flowchart |
| `writing-content.md` | standard | Authoring markdown + frontmatter + viz tags | `CodeSample` of sample frontmatter |
| `deploying-to-pages.md` | standard | How the Actions workflow works, `basePath` | `CodeSample` of workflow YAML; link to the workflow file |

Each page:
- Has SEO frontmatter.
- Has 3–5 H2 sections.
- Cross-links to the related spec file in `/docs/specs/` and the phase file in `/docs/phases/` via `<ContextualLink>`.
- Uses at least one visualization tag.

## Steps

1. **Draft `home.md`.** 200–350 words, hero image from `public/images/media/modules/generated/` (pick a visually abstract one; avoid any with visible AI/education branding).
2. **Write each page in the order above.** Commit per page.
3. **Navigation.** Update `SiteHeader` / `SiteFooter` nav lists to include the new pages. Order matches the table above.
4. **Homepage listing.** Render a card grid of all published pages on `home.md` using a simple new component `PageCardGrid` (driven by `getAllPages()` sorted by `frontmatter.order`). Counts as a 1-component addition, not a new spec.
5. **Images.** Audit `public/images/` and delete anything not used by the final content to keep the deploy small.
6. **SEO.** Each page has unique `seo.title` and `seo.description`. Add `<meta name="description">` handling in `generateMetadata()` for `[...slug]/page.tsx`.
7. **Proofread + a11y pass.** Run an automated a11y check (e.g. `axe` via Playwright) on each page in E2E; fix violations.

## Files created / modified

- `content/home.md`, `content/pages/*.md` (six pages)
- `src/components/ui/PageCardGrid.tsx` + `.module.css`
- `src/components/site-header.tsx`, `site-footer.tsx` — updated nav
- `src/app/[...slug]/page.tsx`, `src/app/page.tsx` — `generateMetadata`
- `public/images/` — pruned
- `tests/browser/a11y.spec.ts` — per-page axe run

## Exit checks
- [ ] All six pages build and deploy
- [ ] Each page passes axe with zero critical/serious violations
- [ ] `PageCardGrid` on homepage links to every page
- [ ] No orphan assets: every file in `public/images/` is referenced at least once
- [ ] Lighthouse still ≥ 90 / 95 / 95 / 95 on home + two deepest pages

## Completion notes

<!-- Filled in after execution -->
