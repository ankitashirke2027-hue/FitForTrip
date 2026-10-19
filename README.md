# FitForTrip

FitForTrip is a trip wardrobe planner. The public homepage introduces the product and collects optional update signups. The `/app` route lets anyone create an email account and save multi-stop trips, selected looks, packing progress, and a moodboard look for each trip day. It also searches for similar clothing pieces at Myntra, AJIO, Nykaa Fashion, Zara, and H&M India.

## Run locally

Requires Node.js 22.13+ and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

The waitlist needs `SUPABASE_URL` and the server-only `SUPABASE_SECRET_KEY`. The app uses the project's public Supabase URL and publishable key; these can be overridden with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Never put the server secret in a `NEXT_PUBLIC_` variable or commit it.

## Shopping links

The Shop tab shows each trip day and opens ordinary retailer searches for every piece in its chosen outfit. It also links to Google Shopping for the selected outfit piece. To display product cards inside the app, add a private `SERPAPI_API_KEY` environment variable in Vercel Production and redeploy. The server verifies the signed-in user, derives the query from the chosen look, and calls SerpApi's Google Shopping endpoint. Without the key, the app hides its in-app search button and keeps the Google Shopping and retailer links available. Never put this key in a `NEXT_PUBLIC_` variable or commit it.

FitForTrip does not use commission, tracking, or affiliate links. Product search uses the outfit's text description; it is not a visual match to the Pinterest image. Retailer inventory and pricing can change. Each in-app product search may use one SerpApi search credit.

## Supabase

Apply both SQL files in `supabase/migrations/` to the project. The waitlist table is server-only. The `trips` table has row-level security so signed-in users can only read and change their own trips. Enable email signup and set both the Supabase Site URL and an allowed redirect URL to `https://fitfortrip.vercel.app/app` so confirmation links return to the app.

## Deploy and check

The GitHub repository is connected to Vercel. A commit to `main` triggers a deployment. Keep the Supabase server URL and secret key, plus optional SerpApi key, in Vercel Production environment variables.

```sh
npx tsc --noEmit
npm run build
```

Outfit suggestions come from the destination moodboard and the user's chosen looks. Destination tips are general guidance, not live weather forecasts. The Inspiration tab shows four curated Pinterest Pin embeds for each of the Easy, Polished, and Evening moods in every supported destination. The official Pinterest widget displays the original image and attribution; FitForTrip does not scrape, copy, or proxy Pin images. Pin availability depends on Pinterest and the Pin creator. Filling missing days preserves existing choices. Prices and imagery on the landing page are illustrative.
