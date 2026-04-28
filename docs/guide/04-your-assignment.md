---
title: Your assignment
audience: students
last-reviewed: 2026-04-23
---

# Your assignment — the brief

Think of this file as a **technology brief** handed to you on day one of a junior engineering job. It is a short, concrete set of requirements. What you are actually being taught — how to work with an AI pair on a real project — is not in the brief. It is in [03-working-with-ai.md](03-working-with-ai.md), which you should read *after* you have shipped a first version of the brief.

## Goal

Ship a personal scrollytelling web page at your own GitHub Pages URL, built from this template.

## Setup

1. **Fork** this repo on GitHub (top-right, *Fork*). If "Use this template" is enabled, that works too.
2. Clone your fork locally:
   ```bash
   git clone git@github.com:<your-username>/<your-repo>.git
   cd <your-repo>
   npm install
   npm run dev          # http://localhost:3000
   ```
3. Turn on Pages in your fork:
   **Settings &rarr; Pages &rarr; Build and deployment &rarr; Source &rarr; GitHub Actions.**
4. Push a commit to `main`. Watch the **Actions** tab; when it finishes green, your site is live at
   `https://<your-username>.github.io/<your-repo>/`.

## Workflow

For each piece of work:

1. **Decide scope.** What exactly are you building this session? One page? One section? Write it down in one sentence.
2. **Decide the exit check.** How will you know it is done? ("Build passes" is not enough — see [03-working-with-ai.md](03-working-with-ai.md).)
3. **Build it.** By hand, with AI help, or both. When using an AI, give it the scope and the exit check up front.
4. **Run the check.** If it fails, fix, repeat.
5. **Commit and push.** Your site redeploys automatically.

If you get stuck, the order to consult is:

1. Your own notes / the phase you are working on
2. The relevant spec in [`../specs/`](../specs/)
3. The reference project in `docs/_references/` (if present in your fork)
4. The AI pair, with the above in hand
5. Your instructor

## Using the template's features

- **Images.** Drop files into `public/images/`. Reference them in code or Markdown as `/images/yourfile.jpg`. They will appear automatically on the `/images/` page of your site.
- **New pages.** Create `src/app/<route>/page.tsx`. The file exports a default React component; whatever it returns is what visitors see at `/<route>/`.
- **Homepage.** Edit `src/app/page.tsx`.

## What makes a good submission

A good submission demonstrates, at minimum:

| Criterion | What to aim for |
|-----------|-----------------|
| **Deployed** | Site is live at a real GitHub Pages URL you can share. |
| **Original content** | The topic and writing are yours, not the template's placeholder text. |
| **Scrollytelling element** | At least one scroll-linked effect — a sticky panel that reveals, a parallax image, a scene that swaps as you scroll. Does not have to be elaborate. |
| **Images used intentionally** | At least one image you added yourself, referenced correctly, visible on the page *and* listed on `/images/`. |
| **Clean commit history** | Commits have real messages. No `wip`, `asdf`, or `final-FINAL-v2`. |
| **README updated** | Your README has your live site URL and your name. See "How to submit" below. |
| **`PROCESS.md` submitted** | A short file in your fork that shows *how* you worked, not just what you shipped. See below. |

## `PROCESS.md` — grading the payload, not just the vehicle

Anyone can ship a deployed page. The point of this assignment is to practise directing an AI pair on something bigger than a chat window. So alongside your site, commit a file at the top of your fork called **`PROCESS.md`** containing three sections:

1. **One feature, the prompts you used.** Pick one feature you built with AI help. Paste the actual prompts (or a faithful summary if the chat was long), in the order you sent them. No editing for flattery. If the first three prompts were bad, show them.
2. **Exit checks — pass and fail.** For that same feature, list the exit checks you defined up front and mark each as pass or fail. If any failed, say what you did about it.
3. **Failure-mode reflection.** From [03-working-with-ai.md](03-working-with-ai.md), the four failure modes are: *short memory, invents when unsure, does more than you asked, cannot tell you it is lost.* Which one did you actually hit during this project? Describe the moment in one paragraph. What did you change?

Length target: one page. There is no rubric for "good process" — writing it down honestly is the grade. A `PROCESS.md` that admits to mistakes is worth more than one that pretends everything was smooth.

Stretch goals:

- Multiple scroll-linked scenes.
- Custom fonts or a deliberate type system.
- Working through the phases in [`../phases/`](../phases/) to build out the full content pipeline.
- A custom domain.

## How to submit

Edit the README at the **top of your fork** and add this near the top:

```markdown
## My submission

- Live site: https://<your-username>.github.io/<your-repo>/
- Author: <your name>
- Topic: <one sentence>
```

Then send your instructor:

1. The link to your **repository** on GitHub.
2. The link to your **live site** on GitHub Pages.

That is the submission.

## Honesty about AI use

You are expected to use AI assistance. That is part of what this assignment is teaching. You are **not** expected to pretend you did not.

If an AI wrote a component for you, fine — but you are responsible for understanding what it wrote. Your instructor may ask you to walk through any file in your repo and explain it. If you cannot, that is the problem to fix, not the AI use itself.

A short `NOTES.md` at the root of your repo listing the non-trivial things the AI helped with — "AI wrote the initial version of the sticky header component; I rewrote the CSS" — is good practice and shows judgement.

## Keep reading

- Glossary of any term you hit that is unfamiliar: [05-glossary.md](05-glossary.md).
