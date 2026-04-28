# Scrolly — Specifications

This directory contains the specification for **Scrolly**, a statically-exported Next.js site that teaches *how to build a scrollytelling web experience* by being one.

The site is a companion/teaching reference to the patterns first shipped in the BSEAI Degree pitch site (cloned at [docs/bseai_degree](../docs/bseai_degree)). These specs distill that implementation into a reusable, content-driven kit.

## How to read these specs

Read them in order. Each file is small and focused.

| # | Spec | Purpose |
|---|---|---|
| 00 | [overview.md](./00-overview.md) | Goals, audience, scope, success criteria |
| 01 | [architecture.md](./01-architecture.md) | Tech stack, directory layout, build pipeline |
| 02 | [content-model.md](./02-content-model.md) | Markdown + frontmatter + Zod, routing |
| 03 | [motion-system.md](./03-motion-system.md) | Scrollytelling primitives (the core) |
| 04 | [layouts.md](./04-layouts.md) | `standard` vs `presentation` layout modes |
| 05 | [design-system.md](./05-design-system.md) | CSS tokens, typography, spacing, modules |
| 06 | [visualizations.md](./06-visualizations.md) | Embedding interactive components in markdown |
| 07 | [testing.md](./07-testing.md) | Vitest + Playwright strategy |
| 08 | [deployment.md](./08-deployment.md) | GitHub Pages static export + Actions |
| 09 | [roadmap.md](./09-roadmap.md) | Milestones / delivery order |

## Reference implementation

The project at [docs/bseai_degree](../docs/bseai_degree) is the canonical source for patterns. Where a spec says *"port from reference"*, look there first.

## Assets

Image assets at [public/images/](../public/images) were copied from the reference project and are reusable as placeholders while content is authored.
