# Shipment Tracker — Last-Mile Delivery Platform

A bilingual (English/Arabic) shipment tracking platform built with Next.js App Router, targeting the UAE logistics market. Public customers can track shipments in real time; dispatchers manage status updates through an authenticated admin dashboard.

**Live demo:** [add your Vercel URL here]
**Repo:** https://github.com/shipra1502/capstone-store

## Features

- **Public tracking** — enter a tracking ID, see live status and delivery photo on completion
- **Bilingual, RTL-aware** — full English/Arabic support with proper right-to-left layout for Arabic
- **Dispatcher dashboard** — authenticated admin view with independently-streaming widgets (active deliveries, delayed shipments, driver load)
- **Manual + automated status updates** — dispatchers update status via a form; a simulated carrier webhook can also push status updates directly, mimicking a real courier partner integration
- **SEO-ready** — per-shipment dynamic metadata, optimized images

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS
- next-intl (internationalization)
- Auth.js (NextAuth) — credentials-based auth
- Node's built-in `crypto` for HMAC webhook signature verification

## Architecture Decisions

- **JWT-based sessions over database sessions** — chosen because auth checks run in Next.js Middleware, which executes on the Edge runtime and can't perform full database queries. JWT verification is a pure cryptographic check, no DB round-trip needed. The tradeoff: sessions can't be instantly revoked before expiry, which a database-backed session could do.

- **ISR + `revalidatePath` over full rebuilds** — the tracking page is cached, but a dispatcher's status update (or a carrier webhook) explicitly invalidates that specific cached page, so customers see fresh data without a full site rebuild.

- **HMAC signature verification on the carrier webhook** — proves an incoming status-update request genuinely came from a trusted carrier system, not a spoofed request. The raw request body is hashed with a shared secret and compared against a signature header, following the same pattern real providers (Stripe, GitHub) use.

- **Middleware handles two concerns in one file** — locale detection/redirection (`next-intl`) and admin route protection (`Auth.js`) are combined into a single `middleware.ts`, since Next.js only supports one Middleware entry point per app.

- **`[locale]` segment wraps the entire route tree** — rather than retrofitting i18n later, routing was structured around locale from the start, since restructuring an existing route tree around a new top-level segment is significantly more disruptive than building it in from day one.

## Known Limitations (honest, by design)

- **Shipment data is stored in a local JSON file, not a real database.** During development, an in-memory store caused a real bug: Next.js's dev server runs Route Handlers and page renders in separate worker processes, so a plain in-memory object wasn't actually shared between them — an update from the webhook silently never reached the page. Switching to disk-based storage fixed this locally, but **a serverless platform like Vercel doesn't guarantee persistent writable disk either** — a production version of this app would use a real database (Postgres via Supabase/Neon) instead.
- Driver/order data on the dashboard is mocked with artificial delays to demonstrate Suspense streaming, not backed by real records.
- The carrier webhook is simulated (custom HMAC scheme) rather than integrated with a real courier API, since no such sandbox was available for this project — but follows the same verification pattern real providers use.

## Running Locally

\`\`\`bash
npm install
npm run dev
\`\`\`

Requires a `.env.local` with:
\`\`\`
AUTH_SECRET=
CARRIER_WEBHOOK_SECRET=
\`\`\`

Test dispatcher login: `dispatcher@test.com` / `1234`
