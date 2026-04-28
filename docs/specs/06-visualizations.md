# 06 — Visualizations in markdown

Authors need to drop interactive diagrams/charts into a page without writing JSX. We do it with **fenced code blocks whose language tag names a component**.

## The pattern

```markdown
Before the chart.

​```stat-grid
Value | Label
------|------
85%   | Engagement
3.2s  | Avg dwell
​```

After the chart.
```

The MDX renderer intercepts `<code className="language-stat-grid">`, parses the body, and renders `<StatGrid rows={…} />` in its place.

## Renderer wiring

```tsx
// src/components/markdown/MarkdownRenderer.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { StatGrid } from "@/components/visualization/StatGrid";
import { ScrollDemo } from "@/components/visualization/ScrollDemo";
// ...more

const components = {
  h1: Heading.bind(null, { level: 1 }),
  h2: Heading.bind(null, { level: 2 }),
  a: ContextualLink,
  pre: ({ children }) => children, // let code handle framing
  code: ({ className, children }) => {
    const lang = className?.replace("language-", "");
    switch (lang) {
      case "stat-grid":  return <StatGrid source={String(children)} />;
      case "scroll-demo": return <ScrollDemo source={String(children)} />;
      case "mermaid":    return <Mermaid source={String(children)} />;
      default: return <code className={className}>{children}</code>;
    }
  },
};

export function MarkdownRenderer({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
```

## Visualization component contract

Every viz component must:

1. Accept a single `source: string` prop (the raw code-block body) **or** a typed props object parsed from that source.
2. Parse its own source string deterministically; on parse failure, render a visible error card (not silent).
3. Be server-renderable (no `window`/`document` at module scope). If browser-only (e.g. Mermaid), wrap in `"use client"` and `useEffect`.
4. Expose explicit `width`/`height` (or `aspect-ratio`) so layout doesn't jump.
5. Degrade to a static fallback when `prefers-reduced-motion: reduce`.

## v1 built-in visualizations (topic-neutral)

These demonstrate the *technique* of scrollytelling; they do **not** copy the domain-specific ones from the reference project.

| Tag | Component | Purpose |
|---|---|---|
| `stat-grid` | `StatGrid` | 2–6 key stats in a responsive grid |
| `scroll-demo` | `ScrollDemo` | Miniature inline scrollytelling example (self-contained scroll area) |
| `timeline` | `Timeline` | Vertical or horizontal time axis with labeled events |
| `progress-bar` | `ProgressBar` | Animated bar tied to page scroll |
| `mermaid` | `Mermaid` | Render a Mermaid diagram from source |
| `code-sample` | `CodeSample` | Syntax-highlighted code block with title/caption |

Anything beyond this list should earn a new spec entry, not quietly ship.

## StatGrid example

Author input:

````markdown
```stat-grid
1M+ | Monthly readers
60fps | Target scroll rate
~9.2MB | Asset budget
```
````

Parser: split on newlines, split each line on `|`, trim. Render as:

```html
<ul class="stat-grid">
  <li><span class="value">1M+</span><span class="label">Monthly readers</span></li>
  ...
</ul>
```

## ScrollDemo example

The most meta one. Given a declarative source:

```yaml
steps:
  - at: 0.0
    label: "Start here"
    graphic: circle
  - at: 0.5
    label: "Halfway"
    graphic: square
  - at: 1.0
    label: "Done"
    graphic: triangle
height: 300vh
```

`ScrollDemo` renders a miniature sticky-stage inside the article and animates between graphics using the same `useScroll`/`useTransform` primitives described in [03-motion-system.md](./03-motion-system.md). The entire component is ≤ 200 lines and is itself a teaching artifact — readers inspect the source.

## Safety

- Parse with `zod` wherever structure matters.
- Never `eval` or `new Function` user source.
- Mermaid diagrams run client-side; sanitize via `mermaid.initialize({ securityLevel: "strict" })`.

## What NOT to do

- Do not invent a new markdown directive syntax (`:::`). Stick to fenced code blocks.
- Do not auto-register components by filename. Whitelist each tag in `MarkdownRenderer`.
- Do not allow raw HTML as a fallback for visualizations. If a component fails, show an error card.
