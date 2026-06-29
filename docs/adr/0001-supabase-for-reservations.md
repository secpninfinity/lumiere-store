# Reservations require a backend; use Supabase

Soft-hold Reservations must be visible across all visitors (a Cat held by one customer shows as ติดจอง to everyone) and must expire on a server clock — neither is possible with the current per-browser `localStorage`. We therefore need server-side persistence, and chose **Supabase** (managed Postgres + auto-generated API + auth, generous free tier) because it integrates cleanly with Next.js on Vercel and keeps the operational burden low for a solo maintainer.

## Consequences

- The Cat catalogue moves from the hardcoded `lib/products.js` into a `cats` table, so Availability status can change at runtime.
- Reservations (and, later, VIP leads) move from `localStorage` into Supabase tables.
