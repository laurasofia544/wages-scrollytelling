---
title: Reference projects as context packs
audience: students
last-reviewed: 2026-04-23
---

# Reference projects as context packs

One of the highest-leverage things you can do when building with AI is to **stop asking it to invent** and **start asking it to port**. The tool for that is a *reference project* — a real, working codebase you point the AI at when you say "do something like this."

This file explains how to do that deliberately, including how to use **this template and its live parent site** as your first context pack, and how to build your own as you go.

## The two example sites

This template was built by harvesting patterns from a larger scrollytelling site:

- **Parent project (repo):** <https://github.com/kaw393939/bseai_degree>
- **Parent project (live):** <https://kaw393939.github.io/bseai_degree/>
- **This template (repo):** <https://github.com/kaw393939/scrollytelling_spec_driven>
- **This template (live):** <https://kaw393939.github.io/scrollytelling_spec_driven/>

The parent site has the full working implementation of things like sticky scenes, scroll-scrubbed reveals, presentation-mode slides, and a Markdown-driven content pipeline. The template you are reading distills *the process for building that kind of site*, with the parent left intact as a ground-truth reference to port from.

You can use the parent site the same way. Open it in a browser, read the code on GitHub, and when you want to add something similar to your own site, point your AI pair at the specific file you want to port from.

## What is a "context pack"

Informally, a **context pack** is a curated bundle of real artefacts that give an AI concrete ground to stand on when it writes code for you. A good context pack contains some mix of:

- **Working source files.** The actual `.tsx`, `.ts`, `.css` that already solve the problem.
- **A short description of what it is and why it exists.** One paragraph per concern.
- **The decision trail.** Why this pattern and not another.
- **A mapping from "what I want" to "files to read."** "To add a sticky scene, read `components/motion/PresentationSlide.tsx` and `lib/hooks/useScrollProgress.ts`."

In this repo, the context pack lives under `docs/_references/` (when present) plus the specs and phases. The live site you are porting from is a context pack too — you can read it with a browser, with `git clone`, or by loading files into your AI session one at a time.

## Why this saves tokens and improves quality

**Token savings, concretely.** An AI that has to invent an answer hedges: it tries multiple approaches, re-derives first principles, produces boilerplate around the part you cared about. An AI handed a reference file does one thing — rewrite that file to fit your context — and stops. In practice this is the difference between a multi-turn conversation full of course-correction and a single prompt that lands.

**Quality improvement, concretely.** The thing an AI is worst at — knowing the shape of an API or library it has not seen recently — is exactly what a reference file supplies for free. The AI reads `useScroll` being used in the reference five seconds before it writes `useScroll` in your code. There is no room for it to invent `useScrollAnimation` or a fantasy import.

**Reusability, concretely.** A context pack you build for one project can be reused for the next. Once you have a clean sticky-scene reference, you never have to derive sticky scenes again. The scarce resource in your future self's work is not "can I figure this out" — you can — it is "can I get back to it quickly without re-deriving it." A context pack is that shortcut, paid forward.

## How to harvest a context pack from an existing site

This is the workflow you would use right now to take ideas from `bseai_degree` (or any other working site you admire) and turn them into specs and phases you can implement in your own project.

### 1. Identify the pattern you want

Browse the live site. Find one thing — *one* — you want to copy. Write it down in one sentence. Example:

> *"I want the pinned hero section where a headline fades in and an image scales up as you scroll past it."*

### 2. Locate the actual files

Open the repo on GitHub and find the implementation. You are looking for the smallest set of files that contains the pattern. For the example above, in the parent site that is roughly:

- `components/motion/Reveal.tsx`
- `components/motion/PresentationSlide.tsx` (or similar)
- The CSS file that defines sticky containers
- One page that uses the pattern end-to-end

You do not need the whole repo. You need the two to six files that *are* the pattern.

### 3. Summarise what the pattern does and why

In a file in your own project — say, `docs/_references/notes/sticky-hero.md` — write:

```markdown
# Sticky hero (ported from bseai_degree)

**Source:** https://github.com/kaw393939/bseai_degree/blob/main/…
**What it does:** …
**Key files:** …
**Why this design (not another):** …
```

Three paragraphs max. This is the decision trail future-you will thank you for.

### 4. Turn the pattern into a spec

Write a short `docs/specs/NN-sticky-hero.md` that describes *what* you want — not the code, just the behaviour. "A section at the top of a page whose foreground text fades in as the user scrolls; the section pins to the viewport for roughly 1.5× its height."

The spec should be a couple of paragraphs, readable without opening the reference files. The reference is how you will *implement* it; the spec is what the implementation needs to satisfy.

### 5. Turn the spec into a phase

Write a `docs/phases/NN-sticky-hero.md` with:

- **Objective** — one sentence.
- **Reference code to port** — a table of reference paths &rarr; target paths.
- **Steps** — the ordered checklist.
- **Files created / modified** — the explicit list.
- **Exit checks** — concrete commands or observable states.

### 6. Implement

Now, and only now, ask the AI to do the work. Give it the phase file, the spec, and the reference files. The prompt is short, because the context pack is doing the heavy lifting:

> "Implement phase NN. Read the phase file first, then the referenced spec, then the reference files it lists. Port the pattern into the target paths. Run the exit checks."

That is the narrow jet from the [garden-hose model](03-working-with-ai.md). The wide spray happened in steps 1–4 when you were exploring; by step 6 the thumb is down.

## Running your own "harvest and port" loop

The same loop works for any future project. You accumulate context packs the way a woodworker accumulates jigs: each new project adds one or two, and the twentieth project starts with nineteen things you no longer have to re-derive.

A realistic sequence over a semester or a year:

1. **Project A.** You build something and keep the code clean enough to read. That's it.
2. **Project B.** When you want a pattern from A, you do the six-step harvest above. The result is a spec + phase + reference note in B. Project A is untouched.
3. **Project C.** You harvest from both A and B. If a pattern is showing up in every project, promote it to a shared "scaffold" repo you `git clone` as the starting point.
4. **Project D onward.** You start from the scaffold. New patterns flow in; old ones are already there. Specs and phases are the paper trail that make it safe.

This is the same thing professional teams do with internal component libraries and design systems, minus the committee and the versioning overhead.

## How this makes your work reusable

Three specific levels of reuse, in increasing order of polish.

| Level | What it looks like | How to get there |
|-------|-------------------|------------------|
| **1. Readable code** | You can open a year-old repo and follow it. | Clean commit history, meaningful file names, short functions. |
| **2. Harvestable code** | You can point a future AI at it and say "port this." | Pattern is contained in a small set of files; there is a one-paragraph note explaining the decision; the files are named for what they do. |
| **3. A context pack** | A bundle of specs + phases + reference files that walks a future collaborator (human or AI) from zero to working. | The structure this repo uses: `docs/specs/`, `docs/phases/`, a `docs/_references/` pointer to the source, a guide like this one. |

Aim for level 2 on every project. Level 3 on the one or two projects per year that contain patterns you genuinely plan to reuse.

## A small caution

A reference project is a tool, not a crutch. Two failure modes to avoid:

- **Cargo-culting the reference.** Porting a pattern you do not understand, because the reference used it. Always read enough of the reference to know *why* it did what it did before you copy it. One paragraph of "why" in your harvest note forces you to check.
- **Stale references.** A reference locked to last year's Next.js will confidently lead you into last year's APIs. When you port, re-read the current docs for anything version-sensitive (build config, deployment, new hooks) and trust the docs over the reference for those.

## Keep reading

- The mental model this complements: [03-working-with-ai.md](03-working-with-ai.md)
- The assignment workflow this feeds into: [04-your-assignment.md](04-your-assignment.md)
- Parent project: <https://github.com/kaw393939/bseai_degree>
- Parent live: <https://kaw393939.github.io/bseai_degree/>
