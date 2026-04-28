---
title: Prompt Templates — The Control Loop
audience: students
last-reviewed: 2026-04-23
---

# Prompt Templates

Copy-pasteable versions of the seven prompts that make up [the control loop](03-working-with-ai.md#the-control-loop). Fill in the bracketed parts. Run them in order.

> These are starting points, not magic words. Edit freely. The point is the *shape* of the prompt, not the exact wording.

---

## Planning loop (wide → narrow)

### 1. Harvest

> Go look at this codebase and tell me all the good ideas that you can find in the code. Focus on [area: e.g. the layout system / the build pipeline / how content is loaded]. Do not propose changes yet — just list what is already there and what is working.

**Mode:** wide spray. You are making a menu.

### 2. Converge

> Let's discuss these ideas. Rank them by [criterion: e.g. student impact / effort to ship / how much they reinforce the course concepts]. Which two or three should we actually do in this part of the project, and which should we defer? Write the agreed scope as a single paragraph.

**Mode:** narrowing. End with one paragraph you can defend.

### 3. Specify

> Go into `docs/specs/` and create as many specs as you feel we need to cover the scope we just agreed on. Each spec should have: a one-line purpose, a short "what done looks like" section, and any constraints or non-goals. Keep them small — one concern per file.

**Mode:** narrow. Meaning goes into files, not chat.

### 4. Phase

> Review the specs in `docs/specs/` and plan phases in `docs/phases/` so that at the end of this process we will have addressed 100% of the specs we defined. Each phase should: name the specs it covers, list concrete objectives, and define a runnable exit check for each objective. Flag any spec that no phase covers.

**Mode:** narrow. Coverage is an explicit target — gaps here become bugs later.

---

## Execution loop (per phase: before → during → after)

### 5. Pre-flight QA

> QA `docs/phases/NN-name.md` and update it with any relevant information from the current codebase to prepare it for implementation. Check that: file paths still exist, referenced specs still say what the phase claims, dependencies are installed, and the exit checks are actually runnable as written. Report what you changed and why.

**Mode:** narrow, read-only first. Reconcile the plan with reality before executing.

### 6. Implement

> Execute phase `NN-name.md`. Work one objective at a time. Do not touch files outside the phase's stated scope. Do not skip the exit check for an objective before moving to the next. If you hit something the phase did not anticipate, stop and ask.

**Mode:** narrow jet. Thumb pressed down.

### 6a. Tests

Run after (or alongside) each objective in step 6. Testing conventions for this repo: [../specs/07-testing.md](../specs/07-testing.md).

**Unit tests — positive, negative, edge:**

> For the code changed in this objective, write unit tests that cover: (1) the positive case — typical inputs produce the expected output; (2) the negative case — invalid inputs fail loudly and safely; (3) edge cases — empty, zero, unicode, timezones, and any off-by-one boundaries you can identify. Do not test library internals. Place tests under `tests/unit/` mirroring the source path. All tests must pass.

**Integration tests:**

> Write integration tests that exercise the seam between [module A] and [module B] using real (not mocked) implementations where possible. Cover the happy path and one failure mode of the seam. Tests live in `tests/unit/` if they can run in jsdom, otherwise they belong in `tests/browser/`.

**Golden-path e2e (per spec, not per objective):**

> Write or update a Playwright spec at `tests/browser/[flow].spec.ts` that scripts the headline user journey described in `docs/specs/NN-*.md`. It must: load the built static site, perform the flow end-to-end, and assert the user-visible outcome. This test is the golden path — it must never be deleted to make a build pass.

**Mode:** narrow. Tests are code — same rules: reference existing tests, no invention.

### 7. Exit QA

> QA phase `NN-name.md` to ensure that 100% of the phase objectives are met. For each objective, run its exit check and report pass or fail. Run `npm run lint && npm run test && npm run build && npm run test:e2e` and report results. Do not mark the phase complete if any check fails. If a check fails, suggest whether we loop back to step 5 (re-plan), step 6 (keep implementing), or an earlier planning step.

**Mode:** narrow. Pass/fail only. No vibes.

### 7.5. Audit pass

Optional but recommended after any phase with non-trivial logic or new abstractions. Run each lens you need. Output is a **findings list**, not code changes.

**Knuth — algorithms and correctness:**

> Audit the code changed in phase `NN-name.md` through a Knuth lens. For each non-trivial algorithm: state the invariant, check it holds at loop boundaries, verify termination, and flag any premature optimization. List findings as: `[file:line] — observation — suggested disposition (blocker | backlog | wontfix)`. Do not change code.

**Clean Code / Uncle Bob — readability and structure:**

> Audit the code changed in phase `NN-name.md` through a Clean Code lens. Check: names tell the truth, functions do one thing, responsibilities are separated, SOLID is not violated, no dead code, no misleading comments. List findings as: `[file:line] — observation — suggested disposition (blocker | backlog | wontfix)`. Do not change code.

**Gang of Four — patterns:**

> Audit any new abstractions introduced in phase `NN-name.md` through a Gang-of-Four lens. Is a named pattern a good fit (strategy, factory, observer, adapter, decorator)? Am I reaching for a pattern (singleton, abstract factory) where a plain function or module would do? List findings as: `[file:line] — pattern name or "no pattern needed" — reason — suggested disposition`. Do not change code.

**Dispositioning findings:**

> For the audit findings list above, assign every finding a disposition: **blocker** (fix before closing the phase), **backlog** (file as a follow-up phase or `NOTES.md` entry), or **wontfix** (documented trade-off, include a one-line reason). Record the final dispositioned list in the phase file under `## Audit findings`.

**Mode:** wide on reading, narrow on disposition.

---

## Supervision prompts (use anytime)

These are not tied to one loop step. Use them whenever you need to slow the AI down, classify a task, stop a thrash, or close out a change cleanly.

### Trajectory check

> Before editing, inspect the current codebase and report the likely session shape:
> - What files did you read?
> - What did you locate?
> - Can you reproduce or simulate the issue?
> - What do you believe the cause is?
> - What is the smallest safe edit?
>
> Do not edit yet.

**Mode:** narrow. You are enforcing *read → locate → reproduce → explain* before any edit.

### Architecture-layer check

> Classify this task before implementation:
> - content
> - component
> - layout
> - route
> - data
> - build / deploy
> - test
>
> Then explain why the fix belongs there. If more than one layer is involved, name the primary one and list the others as touched.

**Mode:** narrow. Naming the layer prevents the AI from editing in the wrong place.

### Thrash detector

> The last attempt failed. Do not keep editing blindly.
>
> Summarize:
> - what changed
> - what failed
> - what evidence we have (commands run, outputs, test results)
> - whether to loop back to pre-flight QA, tests, implementation, or spec revision
>
> Do not edit again until we agree on the loopback target.

**Mode:** narrow. This is the verbal equivalent of taking the keyboard back.

### Review burden report

> After implementation, report:
> - files changed
> - LOC added / removed
> - tests added
> - commands run (lint / test / build / e2e)
> - what changed from the plan
> - what was deliberately not changed
> - what a human reviewer should inspect first
>
> Keep it under ten lines. If you cannot, explain why this phase is larger than expected.

**Mode:** narrow. Append the output to the phase file under `## Review burden report`.

---

## If step 7 (or 7.5) fails

You do not move on. You loop back:

- **Objective failed but plan was right** → back to step 6.
- **Test is missing or wrong** → back to step 6a, then 6.
- **Audit found a blocker** → back to step 6.
- **Plan no longer matches reality** → back to step 5.
- **Spec itself is wrong** → back to step 3, then 4, then 5.

Write down which loopback you did, and why, in the phase file. That note is how future-you (and future AI sessions) avoid re-learning it.

## Keep reading

- The theory behind these prompts: [03-working-with-ai.md](03-working-with-ai.md)
- Testing matrix and conventions: [../specs/07-testing.md](../specs/07-testing.md)
- Glossary: [05-glossary.md](05-glossary.md)
