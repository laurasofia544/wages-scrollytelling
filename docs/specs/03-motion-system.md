# 03 — Motion system (the core)

This is the most important spec. The motion system is what makes Scrolly a scrollytelling site.

## Mental model

Two animation strategies exist. Which one runs is decided by **React context**, not by the author:

| Mode | Trigger | Use |
|---|---|---|
| **Viewport mode** | `IntersectionObserver` (`useInView`) — element enters the viewport | Standard long-scroll articles |
| **Slide mode** | `scrollYProgress` from a parent `useScroll` — scrubbed by scroll position | Presentation slides (sticky-stage pattern) |

The **same component** (`Reveal`, `DriftMedia`, `SceneCard`) picks the right mode at render time by calling `useSlideContext()`. If a `scrollYProgress` MotionValue is in context, it runs in slide mode; otherwise viewport mode.

Authors never opt in manually. The layout sets up context; components react.

## Library choice

**framer-motion only.** Hooks used:

- `useInView(ref, { margin, amount })` — viewport detection
- `useScroll({ target, offset })` — per-section progress
- `useTransform(motionValue, inputRange, outputRange, { clamp })` — map progress to animation values
- `useSpring(motionValue, springConfig)` — smooth out jitter
- `useReducedMotion()` — honor OS setting
- `<motion.div style={{...}}>` for MotionValue-driven styles
- `<motion.div animate={...} transition={...}>` for viewport-mode transitions

No GSAP, no react-scrollama, no custom scroll listeners.

## Slide context

```ts
// src/components/motion/SlideContext.tsx
import { createContext, useContext } from "react";
import type { MotionValue } from "framer-motion";

export interface SlideContextValue {
  scrollYProgress: MotionValue<number>;
}

export const SlideContext = createContext<SlideContextValue | null>(null);
export const useSlideContext = () => useContext(SlideContext);
```

## `PresentationSlide` — the sticky-stage primitive

```tsx
// src/components/motion/PresentationSlide.tsx
"use client";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import { SlideContext } from "./SlideContext";

export function PresentationSlide({
  children,
  index,
  hasBackground = false,
  backgroundColor,
}: {
  children: React.ReactNode;
  index: number;
  hasBackground?: boolean;
  backgroundColor?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  // 170vh for content slides, 200vh for full-bleed backgrounds.
  // The extra height gives the sticky stage room to animate.
  const slideHeight = hasBackground ? "200vh" : "170vh";

  // offset ["start end", "end end"]:
  //   start end → progress = 0 when section top reaches viewport bottom
  //   end end   → progress = 1 when section bottom reaches viewport bottom
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  return (
    <SlideContext.Provider value={{ scrollYProgress }}>
      <section
        ref={ref}
        style={{
          height: slideHeight,
          position: "relative",
          zIndex: index,
          backgroundColor,
        }}
      >
        <div
          className="presentation-slide__stage"
          style={{ position: "sticky", top: 0, height: "100vh" }}
        >
          {children}
        </div>
      </section>
    </SlideContext.Provider>
  );
}
```

That's the whole trick. Native CSS `position: sticky` + `useScroll` does the heavy lifting.

## `Reveal` — dual-mode fade/translate

```tsx
// src/components/motion/Reveal.tsx
"use client";
import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useSlideContext } from "./SlideContext";

type Direction = "up" | "down" | "left" | "right" | "none";
type Sequence = "standard" | "delayed";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  sequence?: Sequence;
  className?: string;
}

export function Reveal(props: RevealProps) {
  const slide = useSlideContext();
  return slide?.scrollYProgress ? (
    <SlideReveal {...props} scrollYProgress={slide.scrollYProgress} />
  ) : (
    <ViewportReveal {...props} />
  );
}

function ViewportReveal({
  children, delay = 0, direction = "up", className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "0px 0px -12% 0px", amount: 0.2 });

  const [x, y] = offsets(direction);
  const hidden = { opacity: 0, x, y };
  const shown  = { opacity: 1, x: 0, y: 0 };

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={hidden}
        animate={inView || reduced ? shown : hidden}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function SlideReveal({
  children, delay = 0, direction = "up", sequence = "standard", className = "",
  scrollYProgress,
}: RevealProps & { scrollYProgress: MotionValue<number> }) {
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const start = sequence === "delayed" ? 0.5 + delay * 0.1 : Math.min(delay * 0.5, 0.5);
  const end   = sequence === "delayed" ? 0.9 : 0.8;

  const [xDist, yDist] = offsets(direction);
  const opacity = useTransform(smooth, [start, end], [0, 1], { clamp: true });
  const x       = useTransform(smooth, [start, end], [xDist, 0], { clamp: true });
  const y       = useTransform(smooth, [start, end], [yDist, 0], { clamp: true });

  return (
    <div className={className}>
      <motion.div style={{ opacity, x, y }}>{children}</motion.div>
    </div>
  );
}

function offsets(dir: Direction): [number, number] {
  if (dir === "left")  return [-40, 0];
  if (dir === "right") return [ 40, 0];
  if (dir === "up")    return [  0, 30];
  if (dir === "down")  return [  0,-30];
  return [0, 0];
}
```

## `LayeredRevealGroup` — staggered children

```tsx
export function LayeredRevealGroup({
  children, direction = "up", sequence = "standard", stagger = 0.08, className,
}: {
  children: React.ReactNode;
  direction?: Direction;
  sequence?: Sequence;
  stagger?: number;
  className?: string;
}) {
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <div className={className}>
      {items.map((child, i) => (
        <Reveal key={i} delay={i * stagger} direction={direction} sequence={sequence}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
```

## `DriftMedia` — subtle parallax on images

Same dual-mode shape as `Reveal`. In viewport mode, image drifts 18–28px and scales from 1.04–1.08 → 1 on enter. In slide mode, drift/scale are driven by `scrollYProgress`.

Variants: `intensity: "soft" | "medium"` (numbers above).

## `SceneCard` — scale + opacity container

Wraps an arbitrary block. Three presets:

| Variant | yStart | scaleStart |
|---|---|---|
| `"section"` | 34 | 0.965 |
| `"emphasis"` | 22 | 0.98 |
| `"cta"` | 28 | 0.975 |

Both modes go 0 → target; same pattern as `Reveal`.

## `ParallaxBackground` — layered background image

Given a `src`, renders an absolutely-positioned image whose `y` translates in response to scroll (`useScroll` on window). Intended for hero sections in `standard` layout.

## `PresentationProgress` — scroll indicator

A fixed-position horizontal bar (top of viewport) whose `scaleX` maps to overall `document` scroll via `useScroll()` without a target. Hidden on `standard` pages.

## Accessibility contract

Every motion component must:

1. Call `useReducedMotion()` and, when true, return an **instant** final state — no transition, no transform.
2. Never trap keyboard focus based on scroll position. Tab order follows DOM order.
3. Never convey information **only** via animation. Text must be readable at rest.

## What authors see

Authors do **not** import these components in markdown. They're wired in via the layout components and the MDX renderer. Authors write markdown; the system chooses `ViewportReveal` vs `SlideReveal`.

Power users can drop a `<Reveal>`-like MDX component (exposed by name in the component map) if they need fine control.

## Performance guardrails

- Animate `opacity` and `transform` only. Never animate `top`/`left`/`width`/`height`.
- Prefer CSS `position: sticky` over JS scroll listeners.
- `useSpring` is applied once per slide, not per child.
- Images in `DriftMedia` use `loading="lazy"` and explicit dimensions.
