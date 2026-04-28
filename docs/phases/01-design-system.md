---
status: pending
phase: 01
title: Design system foundation
depends-on: [00]
---

# Phase 01 — Design system foundation

## Objective
Replace the Tailwind scaffolding with a CSS-Modules + custom-properties design system that mirrors the reference project's token-driven approach. Install the two Google fonts and ship four core UI primitives.

## Spec references
- [specs/05-design-system.md](../specs/05-design-system.md) — full token list and decisions.
- [specs/01-architecture.md](../specs/01-architecture.md) §"External dependencies — acceptable / avoid".

## Reference code to port

Read these **in full** before writing anything:

| Reference | Purpose | Target |
|---|---|---|
| `docs/_references/bseai_degree/app/globals.css` | Token set, fluid type, alpha ramps | `src/app/globals.css` (replace) |
| `docs/_references/bseai_degree/app/layout.tsx` | `next/font/google` wiring (Newsreader + Public Sans) | `src/app/layout.tsx` (adapt — Scrolly metadata) |
| `docs/_references/bseai_degree/components/ui/heading.tsx` | `Heading` primitive | `src/components/ui/heading.tsx` |
| `docs/_references/bseai_degree/components/ui/text.tsx` | `Text` primitive | `src/components/ui/text.tsx` |
| `docs/_references/bseai_degree/components/ui/ContextualLink.tsx` | Smart internal/external link, basePath-aware | `src/components/ui/ContextualLink.tsx` |
| `docs/_references/bseai_degree/components/ui/CallToActionGroup.tsx` | CTA layout wrapper | `src/components/ui/CallToActionGroup.tsx` |
| `docs/_references/bseai_degree/lib/site-config.ts` | `url()` / basePath helper used by `ContextualLink` | `src/lib/site-config.ts` |

## Steps

1. **Remove Tailwind wiring.**
   - Uninstall: `npm uninstall tailwindcss @tailwindcss/postcss`.
   - Delete `postcss.config.mjs`.
   - Delete or empty `src/app/globals.css` of the `@import "tailwindcss"` line and any `@theme` / Tailwind-specific rules.
2. **Install design-system deps.**
   - `npm i clsx` (only dependency the UI primitives need).
3. **Port `site-config.ts`.** Keep only what Scrolly uses: `basePath` read from `process.env.NEXT_PUBLIC_BASE_PATH`, and a `url(path)` helper. Drop domain-specific constants (NJIT, Ordo).
4. **Rewrite `src/app/globals.css`** using the full token block from [specs/05-design-system.md](../specs/05-design-system.md) §Tokens. Use the reference `globals.css` for exact alpha/shadow/ease values; substitute Scrolly-neutral accent colors if the reference's brown/cream palette feels wrong for the topic (decide during execution; the palette in the spec is the default).
5. **Wire fonts in `src/app/layout.tsx`.** Load Newsreader (`--font-display`) and Public Sans (`--font-sans`) from `next/font/google` with `display: "swap"`. Apply both CSS variable classes to `<body>`. Set Scrolly metadata (`title: "Scrolly"`, description, `openGraph`).
6. **Port UI primitives** — `Heading`, `Text`, `ContextualLink`, `CallToActionGroup`. Keep their CSS Modules alongside the `.tsx`. Generalize any domain-specific defaults.
7. **Smoke page.** Replace `src/app/page.tsx` body with a minimal composition:
   - `<Heading level={1}>Scrolly</Heading>`
   - `<Text>Learn scrollytelling by reading a scrollytelling site.</Text>`
   - `<CallToActionGroup>` with one `<ContextualLink href="/getting-started">` (even though the target won't exist until Phase 02 — the link just has to render).
8. **Strip the boilerplate** `src/app/page.module.css` if it exists; it's Tailwind-era cruft.

## Files created / modified

- `src/app/globals.css` — replaced
- `src/app/layout.tsx` — rewrite with fonts + Scrolly metadata
- `src/app/page.tsx` — minimal smoke composition
- `src/app/page.module.css` — delete if present
- `postcss.config.mjs` — delete
- `src/components/ui/heading.tsx` + `.module.css`
- `src/components/ui/text.tsx` + `.module.css`
- `src/components/ui/ContextualLink.tsx` + `.module.css`
- `src/components/ui/CallToActionGroup.tsx` + `.module.css`
- `src/lib/site-config.ts`
- `package.json` — Tailwind deps removed, `clsx` added

## Exit checks
- [ ] `grep -r "tailwind" src/ package.json` returns nothing
- [ ] `npm run build` succeeds
- [ ] `npm run dev` shows homepage with Newsreader H1 and Public Sans body text at the fluid scale (resize the window to confirm `clamp()`)
- [ ] No console errors in browser
- [ ] No unused dependencies: `npx depcheck` reports clean (or only false positives are noted)

## Completion notes

<!-- Fill in after execution:
  - What changed vs the plan
  - Any palette decisions made
  - Follow-ups to fold into later phases
-->
