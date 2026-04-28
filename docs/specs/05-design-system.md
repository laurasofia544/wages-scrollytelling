# 05 — Design system

Minimal, token-driven, CSS Modules. No utility-CSS framework.

## Decisions

- **No Tailwind.** Remove `tailwindcss`, `@tailwindcss/postcss`, and the `@import "tailwindcss"` line from `globals.css` during the design-system task.
- **No CSS-in-JS.** No styled-components, no Emotion.
- **CSS Modules** per component (`Foo.module.css` co-located with `Foo.tsx`).
- **Design tokens** live as CSS custom properties in `src/app/globals.css`.
- **Fluid everything.** Type scales with `clamp()`; spacing uses a 24px baseline.

## Tokens (globals.css)

```css
:root {
  /* Color */
  --page-background: #f5f1ea;
  --surface:         #fffdf9;
  --surface-ink:     #1f1a16;
  --text:            #1f1a16;
  --text-muted:      #5a4f45;
  --accent:          #8d4e2f;
  --accent-strong:   #6f391e;
  --rule:            rgba(31, 26, 22, 0.12);

  /* Typography — golden ratio scale */
  --phi: 1.618;
  --fluid-min-px: 16;
  --fluid-max-px: 20;
  --fluid-scaler: calc(
    var(--fluid-min-px) * 1px
    + (var(--fluid-max-px) - var(--fluid-min-px)) * ((100vw - 360px) / (1280 - 360))
  );
  --text-base: clamp(16px, var(--fluid-scaler), 20px);
  --text-h3:   calc(var(--text-base) * var(--phi));
  --text-h2:   calc(var(--text-h3)   * var(--phi));
  --text-h1:   calc(var(--text-h2)   * var(--phi));
  --text-small: calc(var(--text-base) / var(--phi));

  /* Algorithmic weight decay: bigger = lighter */
  --wght-base: 450;
  --wght-h3:   calc(var(--wght-base) / var(--phi));
  --wght-h2:   calc(var(--wght-h3)   / var(--phi));
  --wght-h1:   calc(var(--wght-h2)   / 1.3);

  /* Spacing — 24px baseline */
  --baseline: 24px;
  --space-0_5x: calc(var(--baseline) * 0.5);
  --space-1x:   var(--baseline);
  --space-2x:   calc(var(--baseline) * 2);
  --space-3x:   calc(var(--baseline) * 3);
  --space-4x:   calc(var(--baseline) * 4);
  --space-5x:   calc(var(--baseline) * 5);

  /* Slide typography (presentation layout) */
  --slide-display:  clamp(2.2rem, 3.8vw, 4rem);
  --slide-eyebrow:  clamp(0.9rem, 1vw, 1.05rem);
  --slide-body:     clamp(1rem, 1.25vw, 1.2rem);
  --slide-line:     1.45;
  --slide-measure:  60ch;

  /* Cream alpha ramp (for glass UI on dark) */
  --cream-12: rgba(255, 248, 239, 0.12);
  --cream-22: rgba(255, 248, 239, 0.22);
  --cream-48: rgba(255, 248, 239, 0.48);
  --cream-72: rgba(255, 248, 239, 0.72);
  --cream-96: rgba(255, 248, 239, 0.96);

  /* Ink alpha ramp (for glass UI on light) */
  --ink-08: rgba(31, 26, 22, 0.08);
  --ink-16: rgba(31, 26, 22, 0.16);
  --ink-32: rgba(31, 26, 22, 0.32);
  --ink-64: rgba(31, 26, 22, 0.64);

  /* Shadows */
  --shadow-sm: 0 12px 30px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 24px 60px rgba(0, 0, 0, 0.45);

  /* Motion */
  --ease-brand: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-quick:  180ms;
  --dur-base:   380ms;
  --dur-slow:   700ms;

  /* Z-index scale */
  --z-base: 0;
  --z-sticky: 10;
  --z-overlay: 50;
  --z-modal: 100;
}

@media (prefers-reduced-motion: reduce) {
  :root { --dur-quick: 0ms; --dur-base: 0ms; --dur-slow: 0ms; }
}

html, body { background: var(--page-background); color: var(--text); }
body { font-size: var(--text-base); line-height: 1.55; }
```

## Typography

- **Display/headings:** Newsreader (serif), loaded as `--font-display` via `next/font/google`.
- **Body:** Public Sans (sans-serif), loaded as `--font-sans`.
- `display: "swap"` on both.

Loaded in `src/app/layout.tsx`:

```tsx
import { Public_Sans, Newsreader } from "next/font/google";
const sans    = Public_Sans({ subsets: ["latin"], variable: "--font-sans",    display: "swap" });
const display = Newsreader({  subsets: ["latin"], variable: "--font-display", display: "swap" });
// <body className={`${sans.variable} ${display.variable}`}>
```

`globals.css`:

```css
body    { font-family: var(--font-sans), system-ui, sans-serif; }
h1,h2,h3,h4 { font-family: var(--font-display), Georgia, serif; }
```

## Component primitives

`src/components/ui/`:

- `Heading` — `level: 1|2|3|4`, renders the correct tag and applies the corresponding `--text-h*` / `--wght-h*` tokens.
- `Text` — `variant: "body" | "muted" | "eyebrow" | "small"`.
- `ContextualLink` — internal (`next/link`) vs external (`<a target=_blank>`) auto-switch; adds basePath for internal links.
- `CallToActionGroup` — layout wrapper for 1–3 CTA buttons.

Each has its own `.module.css`. No className props for layout — consumers wrap in their own container.

## Layout CSS modules

- `StandardLayout.module.css` — hero grid, reading-column max-width, sticky ToC.
- `PresentationLayout.module.css` — progress bar, footer gate, split-slide grid.

Naming: **BEM-like** inside modules (`.root`, `.hero`, `.hero__copy`, `.hero--dense`). CSS Modules scope the class names; BEM is only for readability.

## Imagery

- Prefer `.webp` at ≤ 1600px wide, ≤ 500KB.
- Hero images: 16:9 or 21:9.
- Portrait images: 3:4.
- All `<img>` inside motion components must have explicit `width`/`height`.

## Icons

SVG only, inline via React components in `src/components/ui/icons/`. No icon font.

## Accessibility tokens

- Minimum body contrast: 7:1 against `--page-background`.
- Focus ring: `outline: 2px solid var(--accent); outline-offset: 2px;` on all interactive elements. Never `outline: none` without replacing.
- Touch target ≥ 44×44px.
