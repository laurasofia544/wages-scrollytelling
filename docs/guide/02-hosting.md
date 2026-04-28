---
title: Hosting
audience: students
last-reviewed: 2026-04-23
---

# Hosting

This assignment deploys to **GitHub Pages**. Here is why, plus the landscape of alternatives you will encounter in real jobs.

## The short answer

Push to `main`, wait ~2 minutes, your site is live at:

```
https://<your-github-username>.github.io/<your-repo-name>/
```

The workflow at [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) handles the build, applies the correct base path, and uploads the static files. You do not run anything; GitHub does.

The one-time setup in **your** fork:

1. **Settings &rarr; Pages &rarr; Build and deployment &rarr; Source &rarr; GitHub Actions.**
2. Push any commit to `main`. First deploy takes a few minutes.

## Landscape

| Option | Free tier | Best for | Pain points |
|--------|-----------|----------|-------------|
| **GitHub Pages** *(this class)* | Generous | Static sites, student work, portfolios, docs | Requires `basePath` configuration for project sites; no server-side code |
| **Vercel** | Generous | Next.js with server features (SSR/ISR), preview deploys per pull request | Separate account; commercial product with paid tiers |
| **Netlify** | Generous | Static + serverless functions, forms, redirects | Similar to Vercel; another account to manage |
| **Cloudflare Pages** | Very generous | Static + edge functions, global CDN | Slightly different conventions; smaller ecosystem of examples |
| **Your own server** (VPS, etc.) | Not free | Full control, any runtime | You maintain the OS, certificates, updates, security |

## Why GitHub Pages for this class specifically

1. **You already have a GitHub account.** No new signup, no credit card, no email verification.
2. **Nothing to leak.** No API keys, no database credentials, no deploy tokens to accidentally commit.
3. **It forces the right lessons.** Static export, base paths, the limits of pre-rendered sites — these are real production concerns you will hit anywhere. Better to learn them now.
4. **It is public by default.** Your work has a permanent URL you can put on a resume.

## What GitHub Pages cannot do

Know these so you do not design your assignment around something that will not work:

- **No server-side code.** No database queries, no API routes, no form submissions that hit a backend *on your site*. (You can still POST to a third-party service.)
- **No environment secrets at runtime.** Secrets you set in GitHub exist at build time only.
- **No custom authentication.** Every visitor is anonymous.
- **No server-side rendering.** Every page is pre-built at deploy time.

If you need any of those things, Vercel or Netlify is the answer — not GitHub Pages.

## Vercel vs GitHub Pages for Next.js specifically

Vercel is made by the same company as Next.js, and Next.js's most advanced features (SSR, ISR, middleware, image optimisation) are designed to run on Vercel's infrastructure. GitHub Pages cannot run those features; it only serves static files. That is why this template uses `output: "export"` and `images: { unoptimized: true }`.

If you are building a real commercial Next.js product, Vercel is the default and you should probably use it. For a teaching assignment, GitHub Pages is the right fit.

## Custom domains

If you own a domain (e.g. `yourname.com`), you can point it at your GitHub Pages site:

1. **Settings &rarr; Pages &rarr; Custom domain.**
2. Add a `CNAME` record with your DNS provider pointing to `<your-username>.github.io`.
3. GitHub handles HTTPS automatically.

Not required for the assignment.

## Keep reading

- Next (most important): [03-working-with-ai.md](03-working-with-ai.md)
- GitHub Pages docs: <https://docs.github.com/en/pages>
