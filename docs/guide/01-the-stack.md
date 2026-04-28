---
title: The stack
audience: students
last-reviewed: 2026-04-23
---

# The stack

This template uses **Next.js 16** with **React 19** and **TypeScript**, exported as a **static site**. Here is what each of those words means, in plain terms, and why this combination was chosen.

## React, in one paragraph

React is a JavaScript library for building user interfaces out of **components** — small, reusable pieces of UI. A component is just a function that returns some HTML-like markup. You compose big pages by nesting small components.

## JSX, in one paragraph

JSX is HTML-looking syntax that you can write inside JavaScript. It is not actually HTML — it is a shorthand that a build tool converts into regular function calls. When you write:

```jsx
<h1 className="title">Hello, {name}</h1>
```

It gets compiled into roughly:

```js
React.createElement("h1", { className: "title" }, "Hello, ", name);
```

That is the entire mystery of JSX. Tags are function calls. Curly braces `{ }` drop you back into JavaScript so you can insert variables, run expressions, or loop.

Two gotchas:

- Attribute names follow JavaScript, not HTML: `class` &rarr; `className`, `for` &rarr; `htmlFor`.
- Every component must return **one** root element. Wrap siblings in `<div>` or an empty fragment `<>…</>`.

## Next.js, in one paragraph

React on its own gives you components. It does **not** give you routing, a dev server, a build pipeline, page pre-rendering, or sensible file conventions. Next.js is a framework that wraps React and provides those things. You put a file at `src/app/about/page.tsx`, and Next.js makes `/about/` a real route. That convention-over-configuration approach is why we use it.

## Static export, in one paragraph

A Next.js app can run in two modes:

1. **Server mode** — pages are generated on demand by a running Node.js server. Requires a host that runs servers (Vercel, Netlify, your own box).
2. **Static export** — Next.js pre-builds every page into plain HTML files at build time. Requires only a static file host — GitHub Pages works, no server needed.

This template uses static export. That is why `next.config.ts` has `output: "export"` and why there is no backend.

## TypeScript, in one paragraph

TypeScript is JavaScript with type annotations. You write types for your variables and function signatures, and a compiler catches mistakes before the code runs. For a scrollytelling site it mostly helps by warning you when a prop is wrong or a Markdown file is missing a required field.

## Why this combination for your assignment

1. **Static export works on free hosting.** GitHub Pages is free and does not run servers.
2. **File-based routing is the fastest thing to learn.** You want a new page? Add a folder. That is it.
3. **The ecosystem is large.** When you ask an AI "how do I add a sticky scroll animation in Next.js?", there are millions of examples for it to draw on.
4. **Batteries included.** Image handling (`next/image`), font loading (`next/font`), TypeScript, ESLint — all already wired.

## The parts of the repo you will actually touch

| Path | What it is |
|------|------------|
| `src/app/page.tsx` | Your homepage. |
| `src/app/<name>/page.tsx` | Any new page at `/<name>/`. |
| `public/images/` | Your images. Drop files in, reference them as `/images/yourfile.jpg`. |
| `public/images/README.md` | Notes about the images in this template. Keep or replace. |

Do **not** edit unless told to:

- `next.config.ts` — build configuration, including the GitHub Pages base path.
- `.github/workflows/deploy.yml` — the CI that builds and deploys your site.
- `tsconfig.json`, `package.json` — tooling.

## Alternatives you could use, and why we did not

| Option | Why not for this class |
|--------|------------------------|
| Plain HTML + CSS + JS | Fine for small pages; becomes painful around 5+ pages. |
| [Astro](https://astro.build) | Excellent for content-heavy static sites. Smaller ecosystem, fewer AI-training examples. A genuine alternative if you already know it. |
| Gatsby | Older React static framework; losing momentum. |
| Plain React + Vite | Great tooling; you would have to bolt on routing, static export, and Markdown handling yourself. |
| Hugo, Jekyll, 11ty | Fast and simple, but you lose React components — which matter for the **scroll-linked animation** parts of this assignment. |

## Keep reading

- Next: [02-hosting.md](02-hosting.md)
- Next.js docs: <https://nextjs.org/docs>
- React docs: <https://react.dev>
