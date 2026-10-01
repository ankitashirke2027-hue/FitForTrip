# FitForTrip

FitForTrip is a trip wardrobe planner. The public homepage introduces the product and collects optional update signups. The `/app` route lets anyone create an email account and save multi-stop trips, wardrobe pieces, outfit plans, packing progress, and inspiration links. It also links to Myntra, AJIO, Nykaa Fashion, Zara, and H&M India storefronts.

## Run locally

Requires Node.js 22.13+ and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

The waitlist needs `SUPABASE_URL` and the server-only `SUPABASE_SECRET_KEY`. The app uses the project's public Supabase URL and publishable key; these can be overridden with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Never put the server secret in a `NEXT_PUBLIC_` variable or commit it.

## Shopping and affiliate links

The Shop tab sends visitors through stable `/go/{retailer}` links. Each link opens the ordinary retailer storefront until an approved tracking URL is configured in Vercel. After joining a retailer or affiliate-network program, create a complete HTTPS tracking link in its dashboard and add it as the matching server-side environment variable listed in `.env.example`. Redeploy so Vercel uses the new variable. Do not invent affiliate tags or assume a plain store link earns commission. Keep the shopping disclosure visible when tracked links are active.

Nykaa has an [official affiliate program](https://affiliate.nykaa.com/) that supports Nykaa Fashion links; approval and link generation happen in the account dashboard. Confirm each other retailer's current program, regional eligibility, and terms before adding its tracking URL. Affiliate revenue and conversions are measured in the partner dashboard, not by FitForTrip's trip database.

## Supabase

Apply both SQL files in `supabase/migrations/` to the project. The waitlist table is server-only. The `trips` table has row-level security so signed-in users can only read and change their own trips. Enable email signup and configure the Supabase site/redirect URL for the deployed `/app` route so confirmation links return to the app.

## Deploy and check

The GitHub repository is connected to Vercel. A commit to `main` triggers a deployment. Keep the Supabase server URL and secret key in Vercel Production environment variables.

```sh
npx tsc --noEmit
npm run build
```

Outfit suggestions are a starting point based on the user's entered closet and destination. Destination tips are general guidance, not live weather forecasts. Inspiration links are user-saved URLs rather than a Pinterest API feed. Shopping links open retailer storefronts, not matched products; prices and imagery on the landing page are illustrative. These integrations need additional work before a broader commercial launch.
