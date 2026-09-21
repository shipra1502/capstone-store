# Wasl — Last-Mile Delivery Tracking Platform

A bilingual (English/Arabic) shipment tracking platform built with Next.js App Router, targeting the UAE logistics market. Public customers track shipments in real time via a branded timeline view; dispatchers manage a full shipment lifecycle — create, update status, delete — through an authenticated admin dashboard.

**Live demo:** https://capstone-store-chi.vercel.app
**Repo:** https://github.com/shipra1502/capstone-store

## Features

- **Public tracking** — enter a tracking ID, see a visual timeline (Order Placed → Picked Up → In Transit → Out for Delivery → Delivered), with a delivery photo once completed
- **Bilingual, RTL-aware** — full English/Arabic support, including locale-aware date/time formatting and proper right-to-left layout
- **Dispatcher dashboard** — authenticated admin view with three independently-streaming widgets (active deliveries, delayed shipments, driver load), each linking directly to the relevant shipment
- **Full shipment lifecycle** — dispatchers create new shipments, update status through a guided flow, and delete completed ones (with confirmation)
- **Automated status updates** — a simulated carrier webhook can push status updates directly, verified via HMAC signature, mimicking a real courier partner integration
- **Real-time UX feedback** — loading states on all mutating actions, duplicate-ID detection on create, delete confirmation
- **SEO-ready** — per-shipment dynamic page titles, optimized images with LCP priority hints, a real `robots.txt`

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS
- next-intl (internationalization)
- Auth.js (NextAuth) — credentials-based auth
- Neon (serverless Postgres) via `@neondatabase/serverless`
- Node's built-in `crypto` for HMAC webhook signature verification

## Architecture Decisions

- **JWT-based sessions over database sessions** — auth checks run in Next.js Middleware (Edge runtime, no full DB access). JWT verification is a pure cryptographic check. Middleware only runs the auth check on `/admin` routes — public pages skip it entirely.

- **Migrated from disk-based JSON storage to Neon Postgres after a real production failure.** The original implementation stored shipment data in a local JSON file. This worked in local development but failed on Vercel with `ENOENT: no such file or directory, mkdir '/var/task/data'` — Vercel's serverless functions run from a read-only deployment bundle with no persistent filesystem, and each invocation can run in an entirely separate, disposable environment. Diagnosing this from the actual runtime logs (not just guessing) confirmed the root cause, and the fix was migrating to Neon, a serverless Postgres provider that integrates natively with Vercel. The data-access layer's function signatures stayed identical, so the rest of the app needed zero changes.

- **`ensureTable()` self-provisioning pattern** — the database schema is created on first use rather than requiring a separate migration step, keeping local/demo setup to a single environment variable.

- **HMAC signature verification on the carrier webhook** — proves an incoming status-update request genuinely came from a trusted carrier system, following the same raw-body-signing pattern real providers (Stripe, GitHub) use.

- **Middleware handles two concerns in one file** — locale detection/redirection (`next-intl`) and admin route protection (`Auth.js`) are combined, since Next.js only supports one Middleware entry point per app.

- **`[locale]` segment wraps the entire route tree** — routing was structured around locale from the start rather than retrofitted, since restructuring an existing route tree around a new top-level segment is significantly more disruptive than building it in from day one.

- **Demo credentials via environment variables, not hashed** — a single hardcoded dispatcher account is compared against plain environment variables. This was a deliberate simplification: Next.js's `.env` loader mangles bcrypt hashes (the `$` characters are misinterpreted as variable-interpolation syntax). For a single fixed demo account with no real user database, keeping the value out of version control (via gitignored `.env.local`) addresses the actual risk; a production system with real user accounts would hash stored passwords.

## Known Limitations

- **Single hardcoded dispatcher account** — no real user management or multi-dispatcher support.
- **Driver assignment is free text**, not tied to a real driver roster/entity.
- **No audit trail** on status changes — `last_updated` is overwritten, not logged.
- **No customer notifications** — the tracking page requires the customer to check back; no email/SMS/push on status change.
- **No idempotency protection on the carrier webhook** — a retried delivery from a real carrier would reapply the same update (harmless today, worth hardening before any side effect like billing or notification is added).
- Driver/order aggregate widgets query real data; the carrier webhook is simulated (custom HMAC scheme) rather than integrated with a real courier API, since no such sandbox was available for this project.

## Future Roadmap

1. A real, filterable/paginated shipment list view — the dashboard widgets summarize a handful of shipments well, but don't scale to a real fleet
2. Audit trail on every status change (who, when, from what to what) — needed for dispute resolution and typical logistics compliance
3. Customer notifications (email/SMS/push) on status change
4. Webhook idempotency handling
5. Real driver entities with their own accounts, not a free-text field
6. Multi-dispatcher accounts with role-based access

## Running Locally

\`\`\`bash
npm install
npm run dev
\`\`\`

Requires a `.env.local` with:
\`\`\`
AUTH_SECRET=
CARRIER_WEBHOOK_SECRET=
DISPATCHER_EMAIL=
DISPATCHER_PASSWORD=
POSTGRES_URL=
\`\`\`

Test dispatcher login at `/login` with the credentials set above.

> **Note:** local development requires network access to Neon's Postgres endpoint. Some networks (particularly those without working IPv6 routing) may be unable to resolve Neon's connection host; the live Vercel deployment is unaffected.
