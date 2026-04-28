# 01 — Architecture

## Tech stack

| Concern | Choice | Version target |
|---|---|---|
| Framework | Next.js App Router, `output: "export"` | 16.x (already installed) |
| Language | TypeScript (strict) | 5.x |
| UI | React | 19.x |
| Animation | `framer-motion` | ^12 |
| Markdown | `gray-matter` + `next-mdx-remote` + `remark-gfm` | current |
| Validation | `zod` | ^4 |
| Styling | CSS Modules + CSS custom properties | — |
| Charts (optional) | `recharts` | ^3 |
| Unit test | `vitest` + `@testing-library/react` + jsdom | current |
| E2E | `@playwright/test` (Chromium) | current |
| Deploy | GitHub Pages via Actions | — |

> Note: the scaffold was created with `--tailwind`. We **remove Tailwind** in the design-system pass (see [05-design-system.md](./05-design-system.md)) and replace it with CSS Modules + tokens. Tailwind stays in `package.json` only if a v1 task explicitly needs it.

## Directory layout (target)

```
scrolly/
├── specs/                      # this directory
├── content/
│   ├── home.md                 # → /
│   └── pages/
│       └── <slug>.md           # → /<slug>
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: fonts, metadata, <body>
│   │   ├── page.tsx            # Homepage → loads content/home.md
│   │   ├── [...slug]/
│   │   │   └── page.tsx        # Dynamic pages, generateStaticParams
│   │   └── globals.css         # Tokens + resets
│   ├── components/
│   │   ├── motion/             # Reveal, LayeredRevealGroup, DriftMedia,
│   │   │                       # SceneCard, ParallaxBackground,
│   │   │                       # PresentationSlide, PresentationProgress,
│   │   │                       # SlideContext
│   │   ├── layouts/            # PageLayoutFactory, StandardLayout,
│   │   │                       # PresentationLayout (+ .module.css)
│   │   ├── markdown/           # MarkdownRenderer (MDX component map)
│   │   ├── visualization/      # Demo charts / diagrams (generic, topic-neutral)
│   │   └── ui/                 # Heading, Text, CTA, ContextualLink
│   └── lib/
│       ├── content/
│       │   ├── schema.ts       # Zod frontmatter schema
│       │   ├── parser.ts       # splitMarkdownIntoSlides, image directives
│       │   └── repository.ts   # File loader + validation
│       └── site-config.ts      # basePath-aware URL helpers
├── public/
│   └── images/                 # assets (seeded from reference project)
├── tests/
│   ├── unit/                   # vitest
│   └── browser/                # playwright
├── .github/workflows/
│   └── deploy.yml              # build + deploy to Pages
├── next.config.ts
├── playwright.config.ts
├── vitest.config.ts
└── package.json
```

## Data flow

```
content/*.md  ──►  ContentRepository  ──►  Zod schema  ──►  PageData
                                                               │
                                      ┌────────────────────────┘
                                      ▼
                        PageLayoutFactory (by frontmatter.layout)
                            │                       │
                            ▼                       ▼
                      StandardLayout         PresentationLayout
                            │                       │
                            ▼                       ▼
                     MarkdownRenderer ◄── (MDX component map) ──►
                            │
            ┌───────────────┼──────────────────────────────┐
            ▼               ▼                              ▼
     Heading/Text/…   Motion primitives           Visualization components
                     (Reveal, SceneCard, …)       (resolved by ```lang tag)
```

## Build pipeline

```
npm run prebuild   # optional: generate data artifacts into src/lib/data/
npm run build      # next build → out/ (static HTML/CSS/JS)
```

The CI workflow sets `NEXT_PUBLIC_BASE_PATH=/<repo-name>` so asset URLs resolve when Pages serves from a subpath. See [08-deployment.md](./08-deployment.md).

## Path aliases

`tsconfig.json` sets `"@/*": ["./src/*"]`. All imports use `@/components/...`, `@/lib/...`, `@/app/...`.

## External dependencies — acceptable / avoid

Acceptable to add:
- `clsx` (class composition), `zod`, `gray-matter`, `next-mdx-remote`, `remark-gfm`, `framer-motion`, `recharts`, `mermaid`.

Avoid without discussion:
- GSAP, react-scrollama, locomotive-scroll — native + framer-motion is sufficient.
- Tailwind plugins, utility-CSS frameworks — conflicts with the token approach.
- Runtime CMS clients — content is files.
