# Cornerstone Site Services

Marketing site for **Cornerstone Site Services** — pressure washing, exterior soft-wash and mobile auto detailing across Los Angeles & Orange County. *One call. Everything handled.*

**Stack:** Next.js 16 (App Router, static-first) · Tailwind CSS v4 · TypeScript

## Features

- **Photo quote flow** — customers upload up to 5 photos (drag & drop, previews), pick services and a plan, and submit. Requests hit `/api/quote`.
- **Time-slot booking** — 12-day rolling calendar (Sundays closed) with 5 daily windows; requested slot is included in the quote request and confirmed by text.
- **Subscription positioning** — one-time deep clean vs. Estate Care Plan vs. Auto Care Membership.
- **SEO** — per-page metadata, `LocalBusiness` + `FAQPage` JSON-LD, sitemap, robots, semantic headings, service-area content, dedicated `/pressure-washing` and `/auto-detailing` landing pages.
- **Design** — brand palette drawn from the logo (cream / terracotta / espresso), Playfair Display + Inter, scroll-reveal motion, Ken Burns hero, draggable before/after sliders, marquee trust strip. Honors `prefers-reduced-motion`.

## Develop

```bash
npm install
npm run dev
```

## Environment variables (all optional)

Copy `.env.example` to `.env.local`. Without email config, quote requests are logged to the server console (view with `vercel logs` in production).

| Var | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Enables emailing quote requests via Resend |
| `QUOTE_INBOX_EMAIL` | Where quote requests are sent |
| `QUOTE_FROM_EMAIL` | Verified Resend sender address |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL once a custom domain is attached |

## Deploy

Deployed on Vercel. `vercel --prod` from the repo root.

Photos are from Unsplash (free license). Before/after sliders are labeled as illustrative — replace with real job photos as they come in (`public/images`).
