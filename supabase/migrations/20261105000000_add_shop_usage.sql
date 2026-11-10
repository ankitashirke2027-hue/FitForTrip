create table if not exists public.shop_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null,
  count smallint not null check (count between 1 and 20),
  primary key (user_id, day)
);

alter table public.shop_usage enable row level security;
revoke all on table public.shop_usage from public, anon, authenticated;
grant all on table public.shop_usage to service_role;

create or replace function public.consume_shop_search(p_user_id uuid)
returns smallint
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_count smallint;
begin
  if p_user_id is null then
    raise exception 'A user ID is required';
  end if;

  insert into public.shop_usage as current_usage (user_id, day, count)
  values (p_user_id, (now() at time zone 'UTC')::date, 1)
  on conflict (user_id, day) do update
    set count = current_usage.count + 1
    where current_usage.count < 20
  returning current_usage.count into v_count;

  return v_count;
end;
$$;

revoke all on function public.consume_shop_search(uuid) from public, anon, authenticated;
grant execute on function public.consume_shop_search(uuid) to service_role;

comment on table public.shop_usage is 'UTC daily product-search counts. Read and updated only by the server-side service role.';
comment on function public.consume_shop_search(uuid) is 'Atomically consumes one of a user’s 20 product searches for the current UTC day; returns NULL when the daily limit is reached.';
