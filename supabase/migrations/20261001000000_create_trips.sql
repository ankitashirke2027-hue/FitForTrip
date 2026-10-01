create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists trips_user_updated_idx on public.trips(user_id, updated_at desc);
alter table public.trips enable row level security;
grant select, insert, update, delete on public.trips to authenticated;

create policy "Owners read trips" on public.trips for select to authenticated using ((select auth.uid()) = user_id);
create policy "Owners create trips" on public.trips for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Owners update trips" on public.trips for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Owners delete trips" on public.trips for delete to authenticated using ((select auth.uid()) = user_id);
