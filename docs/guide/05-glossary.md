---
title: Glossary
audience: students
last-reviewed: 2026-04-23
---

# Glossary

One-line definitions for terms you will hit in this project. Linked to deeper reading where useful.

## Web / framework terms

- **Component** — a reusable piece of UI, written as a function that returns JSX. See [01-the-stack.md](01-the-stack.md).
- **Props** — the arguments a component receives: `function Button({ label }) { ... }`.
- **JSX** — HTML-looking syntax inside JavaScript. Compiles to function calls.
- **Hydration** — when a server-rendered HTML page wakes up and becomes interactive in the browser.
- **Static export** — a Next.js mode that pre-builds every page to plain HTML. No server needed to run the site.
- **SSR (server-side rendering)** — page HTML is generated on each request by a server.
- **SSG (static site generation)** — page HTML is generated once at build time. Static export is a form of SSG.
- **ISR (incremental static regeneration)** — SSG with scheduled re-builds. Not available on GitHub Pages.
- **basePath** — the URL prefix your site lives under. For a GitHub Pages project site, it is `/<repo-name>`. Next.js applies it automatically when `NEXT_PUBLIC_BASE_PATH` is set.
- **CSS Modules** — per-file scoped CSS. `styles.module.css` becomes a JS object where each class name is unique.
- **Tailwind** — a utility-first CSS framework. Not used in this template (removed deliberately).
- **Markdown** — lightweight text format with `# headings`, `**bold**`, `[links](url)`, etc.
- **Frontmatter** — a YAML block at the top of a Markdown file between `---` lines. Used for metadata like title, date.
- **Zod** — a TypeScript library for validating that data matches a schema. Used to check Markdown frontmatter.

## Deployment terms

- **GitHub Pages** — GitHub's static-site hosting. Free. Serves files from a branch or from GitHub Actions.
- **GitHub Actions** — GitHub's CI system. Runs workflows defined in `.github/workflows/*.yml`.
- **Workflow** — a YAML file describing an automated job. This template's workflow builds and deploys the site on every push to `main`.
- **Vercel** — commercial hosting platform made by the Next.js team. Runs Next.js in full-feature mode.

## Scrollytelling terms

- **Scrollytelling** — a web storytelling technique where scrolling the page drives the narrative: panels stick, images fade, text reveals, etc.
- **Sticky element** — an element that scrolls with the page until it hits an offset, then stays pinned while other content scrolls past it. CSS: `position: sticky; top: 0`.
- **Sticky stage** — a common scrollytelling pattern: a tall section contains a `100vh` sticky inner that is "pinned" while the outer section's scroll progress drives animation.
- **Viewport** — the visible portion of the browser window.
- **IntersectionObserver** — a browser API that tells you when an element enters or leaves the viewport. Underpins most "fade in when I scroll to it" effects.
- **framer-motion** — a React animation library. Provides `motion.div`, `useScroll`, `useTransform`, and similar hooks. Planned for later phases of this template.

## AI-collaboration terms (from this repo's methodology)

- **Spec** — a short, stable document describing *what* a piece of the project should do. Lives in [`../specs/`](../specs/).
- **Phase** — a scoped implementation step with explicit files to change and runnable exit checks. Lives in [`../phases/`](../phases/).
- **Reference** — a real working codebase used as the source of truth to *port from*, so the AI has something concrete instead of having to invent. Lives in `docs/_references/` when present.
- **Exit check** — a runnable command or state that decides whether a task is done. Not a vibe.
- **Completion notes** — what actually happened when a phase was implemented, including deviations from the plan. Written at the bottom of each phase file after execution.

## Where to look things up

- React: <https://react.dev>
- Next.js: <https://nextjs.org/docs>
- MDN (HTML, CSS, JS): <https://developer.mozilla.org>
- TypeScript: <https://www.typescriptlang.org/docs/>
