---
status: done
phase: 00
title: Scaffold
depends-on: []
qa-verified: 2026-04-23
---

# Phase 00 — Scaffold

## Objective
Stand up a Next.js 16 App Router project configured for static export to GitHub Pages, with reference assets in place and specs + phases written.

## Spec references
- [specs/01-architecture.md](../specs/01-architecture.md) — stack, directory layout
- [specs/08-deployment.md](../specs/08-deployment.md) — basePath, workflow shape

---

## Verified current state (as of QA)

### Installed dependencies — [package.json](../../package.json)

```json
"dependencies": {
  "next": "16.2.4",
  "react": "19.2.4",
  "react-dom": "19.2.4"
},
"devDependencies": {
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "16.2.4",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

Scripts: `dev`, `build`, `start`, `lint`. No `test`, `test:e2e`, `typecheck`, or `clean` yet — added in Phases 02, 04, 07.

### Project structure — actual

```
/
├── .github/workflows/deploy.yml    ← workflow stub (build + deploy only)
├── docs/
│   ├── _references/bseai_degree/   ← reference implementation (git-cloned)
│   ├── specs/                      ← 10 spec files + README
│   └── phases/                     ← 9 phase files + README + STATUS
├── public/
│   ├── file.svg                    ← CNA boilerplate (DELETE in Phase 01)
│   ├── globe.svg                   ← CNA boilerplate (DELETE in Phase 01)
│   ├── next.svg                    ← CNA boilerplate (DELETE in Phase 01)
│   ├── vercel.svg                  ← CNA boilerplate (DELETE in Phase 01)
│   ├── window.svg                  ← CNA boilerplate (DELETE in Phase 01)
│   └── images/                     ← 57 files, 9.2 MB, copied from reference project
├── src/app/
│   ├── favicon.ico
│   ├── globals.css                 ← Tailwind-based (REPLACE in Phase 01)
│   ├── layout.tsx                  ← Geist fonts + Tailwind body classes (REPLACE in Phase 01)
│   └── page.tsx                    ← CNA boilerplate, vercel.com links (REPLACE in Phase 01)
├── .gitignore
├── AGENTS.md, CLAUDE.md, README.md
├── eslint.config.mjs               ← flat config, next/core-web-vitals + typescript
├── next-env.d.ts
├── next.config.ts                  ← ready for static export
├── package.json, package-lock.json
├── postcss.config.mjs              ← Tailwind plugin (DELETE in Phase 01)
└── tsconfig.json                   ← strict, target ES2017, "@/*" → "./src/*"
```

### [next.config.ts](../../next.config.ts) — verified correct for Pages

```ts
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};
```

### [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) — current shape

Two jobs only (`build`, `deploy`). Uses `actions/configure-pages@v5` → wires `NEXT_PUBLIC_BASE_PATH` → `npx next build` → `.nojekyll` → `upload-pages-artifact@v3` → `deploy-pages@v4`.

**Missing vs [specs/08-deployment.md](../specs/08-deployment.md):** no `verify` job (lint + unit tests), no `e2e` job. To be added in **Phase 07** after Phases 01–06 provide things to test.

### [tsconfig.json](../../tsconfig.json)

- `strict: true`
- `target: "ES2017"` (consider raising later; fine for v1)
- `moduleResolution: "bundler"`
- `paths: { "@/*": ["./src/*"] }` — matches spec

### [eslint.config.mjs](../../eslint.config.mjs)

Flat config (ESLint 9): `next/core-web-vitals` + `next/typescript` + default ignores (`.next`, `out`, `build`, `next-env.d.ts`). No custom rules yet; `tests/` ignore to be added in Phase 02.

---

## Assets copied from reference

57 files under [public/images/](../../public/images/), ~9.2 MB:
- `public/images/` — `icon.svg`, `README.md`
- `public/images/historical/` — 2 jpgs (Easter 1900/1913)
- `public/images/qr/` — `bseai-discord.svg`
- `public/images/media/modules/generated/` — 26 .webp + 1 .svg (era timeline)
- `public/images/media/modules/portraits/` — 26 .webp (public figures, institutions)

Intentionally **not** copied from reference: `NJIT-Eberhardt-Hall.jpg`, `njit_logo.svg`, `ordo_icon.png`, `studio_ordo_logo.png` — brand-specific.

> **Audit note:** Some generated filenames (`era-*`, `people-institutions-hero`, `lighthill-report`, etc.) are thematic to the reference project. In **Phase 08** we prune anything unused by the final Scrolly content to keep the deploy small.

---

## CNA cruft to delete — Phase 01 checklist seed

This is the exhaustive list of `create-next-app` artifacts still in the tree that Phase 01 must remove:

- **Files:** `postcss.config.mjs`, `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`.
- **`src/app/globals.css`:** delete entire contents (`@import "tailwindcss";`, `:root` vars, `@theme inline {…}`, `@media (prefers-color-scheme: dark)` block, `body` rule) — replace with the token set from [specs/05-design-system.md](../specs/05-design-system.md).
- **`src/app/layout.tsx`:** remove `Geist` + `Geist_Mono` imports, Tailwind body classes (`h-full antialiased`, `min-h-full flex flex-col`), and the placeholder metadata (`"Create Next App"`). Replace with Newsreader + Public Sans + Scrolly metadata.
- **`src/app/page.tsx`:** entire body is boilerplate (vercel.com templates/learn links, `next.svg` / `vercel.svg` `<Image>` tags, Tailwind utility classes). Replace with minimal smoke composition using Phase 01 UI primitives.
- **`package.json`:** `npm uninstall tailwindcss @tailwindcss/postcss`.

Nothing else in the tree is CNA cruft — `favicon.ico`, `next-env.d.ts`, `next.config.ts`, `eslint.config.mjs`, `tsconfig.json` are all kept.

---

## Exit checks (verified)

- [x] `npm run build` succeeds
- [x] `out/` contains `index.html`, `404.html`, `_next/` (confirmed: `out/` regenerated during Phase 00 smoke test)
- [x] `public/images/` populated with 57 files, 9.2 MB
- [x] `docs/specs/` complete (10 spec files + README)
- [x] `docs/phases/` complete (9 phase files + README + STATUS)
- [x] `docs/_references/bseai_degree/` present (reference checkout)
- [x] `.github/workflows/deploy.yml` present (build + deploy jobs)
- [x] `next.config.ts` configured for static export + basePath env

## Known gaps handed to later phases

| Gap | Phase |
|---|---|
| Tailwind removal + token system + fonts + UI primitives | 01 |
| CNA boilerplate in `src/app/page.tsx` and `layout.tsx` | 01 |
| `content/` directory does not exist yet | 02 |
| No unit-test infrastructure (no `vitest`, no `tests/`) | 02 |
| No E2E infrastructure (no `@playwright/test`, no `playwright.config.ts`) | 04 |
| Workflow has no `verify` or `e2e` jobs | 07 |
| `site-config.ts` basePath helper does not exist yet | 01 |
| `tsconfig.json` target `ES2017` could be raised to `ES2020` | optional, later |
| Reference assets not yet pruned against real usage | 08 |

## Completion notes

- Phase 00 is **done and QA-verified on 2026-04-23**.
- Everything Phase 01 needs to know is captured in the *CNA cruft* and *Known gaps* sections above. Start there.
