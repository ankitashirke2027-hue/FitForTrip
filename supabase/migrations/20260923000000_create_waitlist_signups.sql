create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),
  constraint waitlist_email_length check (char_length(email) between 3 and 254),
  constraint waitlist_email_lowercase check (email = lower(email))
);

alter table public.waitlist_signups enable row level security;

revoke all on table public.waitlist_signups from anon, authenticated;
grant insert on table public.waitlist_signups to service_role;

comment on table public.waitlist_signups is 'FitForTrip pre-launch email waitlist. Inserted by the server only.';
