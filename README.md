# FitForTrip

FitForTrip is a trip wardrobe planner. The public homepage introduces the product and collects optional update signups. The `/app` route lets anyone create an email account and save multi-stop trips, wardrobe pieces, outfit plans, packing progress, and a style and moodboard outfit for each trip day. It also searches for similar clothing pieces at Myntra, AJIO, Nykaa Fashion, Zara, and H&M India.

## Run locally

Requires Node.js 22.13+ and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

The waitlist needs `SUPABASE_URL` and the server-only `SUPABASE_SECRET_KEY`. The app uses the project's public Supabase URL and publishable key; these can be overridden with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Never put the server secret in a `NEXT_PUBLIC_` variable or commit it.

## Shopping links

The Shop tab shows each trip day and opens ordinary retailer searches for every piece in its chosen outfit. FitForTrip does not use commission, tracking, or affiliate links. Search results are not verified product matches; retailer inventory and pricing can change.

## Supabase

Apply both SQL files in `supabase/migrations/` to the project. The waitlist table is server-only. The `trips` table has row-level security so signed-in users can only read and change their own trips. Enable email signup and set both the Supabase Site URL and an allowed redirect URL to `https://fitfortrip.vercel.app/app` so confirmation links return to the app.

## Deploy and check

The GitHub repository is connected to Vercel. A commit to `main` triggers a deployment. Keep the Supabase server URL and secret key in Vercel Production environment variables.

```sh
npx tsc --noEmit
npm run build
```

Outfit suggestions are a starting point based on the user's entered closet and destination. Destination tips are general guidance, not live weather forecasts. The Inspiration tab shows a visual board for every trip day, with three distinct original FitForTrip photos and clothing lists in each of the Easy, Polished, and Evening moods. It can fill unstyled days with varied looks while preserving existing choices. The tab also shows an attributed, official Pinterest board widget for the selected destination; it does not scrape or copy Pinterest images. Users select a look for each trip day, save the trip, then use the Shop tab to search retailers for similar clothing pieces. Edited outfit pieces feed the shopping links, and filling missing closet outfits preserves existing edits and packing progress. Prices and imagery on the landing page are illustrative. Live retailer catalogs and exact image-based product matching would need approved commerce data integrations before a broader commercial launch.
