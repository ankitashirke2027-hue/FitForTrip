import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (!input || typeof input !== 'object' || !('email' in input) || typeof input.email !== 'string') {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const email = input.email.trim().toLowerCase();
  if (email.length > 254 || !emailPattern.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 650));
      return NextResponse.json({ demo: true });
    }
    return NextResponse.json({ error: 'The waitlist is temporarily unavailable. Please try again later.' }, { status: 503 });
  }

  let endpoint: URL;
  try {
    endpoint = new URL('/rest/v1/waitlist_signups?on_conflict=email', url);
    if (endpoint.protocol !== 'https:' || !endpoint.hostname.endsWith('.supabase.co')) throw new Error('Invalid Supabase URL');
  } catch {
    return NextResponse.json({ error: 'The waitlist is temporarily unavailable. Please try again later.' }, { status: 503 });
  }

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        apikey: key,
        'Content-Type': 'application/json',
        Prefer: 'resolution=ignore-duplicates,return=minimal',
      },
      body: JSON.stringify({ email }),
      cache: 'no-store',
    });
    if (!result.ok) throw new Error(`Supabase returned ${result.status}`);
    return NextResponse.json({ demo: false });
  } catch (error) {
    console.error('Waitlist signup failed:', error);
    return NextResponse.json({ error: 'We could not save your email. Please try again.' }, { status: 502 });
  }
}
