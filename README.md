# FitForTrip

Editorial pre-launch landing page built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. It includes a Supabase-backed waitlist API.

## Run locally

Requires Node.js 22.13+ and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Set `SUPABASE_URL` and `SUPABASE_SECRET_KEY` in `.env.local` for real local signup. With no keys, local development explicitly shows a demo success that stores no email. Production returns an error until Supabase is configured.

## Supabase setup

Create a Supabase project. In its SQL editor, run `supabase/migrations/20260923000000_create_waitlist_signups.sql`. Create a server secret key in **Settings → API Keys**. Put its project URL and secret key into Vercel's project environment variables for Production and Preview. Never add the secret key to a `NEXT_PUBLIC_` variable or commit it.

The `waitlist_signups` table denies browser roles and has no public read policy. The Next.js API route validates and normalizes email addresses, then inserts with the server-only key. Duplicate addresses count as a successful signup without creating another row.

## Deploy

Push this directory to a GitHub repository and import it in Vercel as a Next.js project. Use the default root directory, `npm install`, and `npm run build`. Add the two Supabase environment variables before deploying. Vercel will deploy new commits automatically once the repository is connected.

## Check

```sh
npx tsc --noEmit
npm run build
```

The landing page, signup API, and packing interactions were checked locally. The production Next.js build passes. Images and fonts load from external providers. Product images and prices are illustrative; confirm reuse permission for retailer imagery before a commercial launch.
