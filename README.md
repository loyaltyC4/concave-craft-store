# Fingerboard Lab

A high-performance, server-rendered storefront for **Fingerboard Lab**: precision
fingerboard trucks, decks, concave molds, wheels, ramps, and complete setups.

Built on Next.js (App Router) with a self-contained static product catalogue and
**Stripe Checkout** for payments. No Shopify subscription required.

## Stack

- **Next.js 15** (App Router, React Server Components, Server Actions)
- **Tailwind CSS 4**
- **Static catalogue** — products/collections live in `data/*.json` (`lib/shopify/static-data.ts`)
- **Cookie-based cart** — `lib/cart.ts` (no database)
- **Stripe Checkout** — `lib/stripe.ts` + `components/cart/actions.ts`

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Purpose |
| --- | --- |
| `SITE_NAME` | Store name shown in title/branding |
| `COMPANY_NAME` | Legal name in the footer copyright |
| `NEXT_PUBLIC_SITE_URL` | Your production URL (canonical/sitemap/Stripe redirects) |
| `STRIPE_SECRET_KEY` | Stripe secret key (use `sk_test_...` until live) |
| `STRIPE_WEBHOOK_SECRET` | Optional — for `/api/stripe/webhook` |

## Running locally

```bash
pnpm install
cp .env.example .env   # then edit values
pnpm dev
```

App runs at [localhost:3000](http://localhost:3000/).

## Updating the catalogue

Edit `data/products.json` and `data/collections.json`. Prices are USD.
Product images are served from Shopify's CDN URLs stored in the data.

## Payments

Checkout builds a Stripe Checkout Session from the cart with regional shipping
tiers (see `lib/stripe.ts`). Orders appear in your Stripe Dashboard; enable
Stripe's automatic customer emails there for receipts.
