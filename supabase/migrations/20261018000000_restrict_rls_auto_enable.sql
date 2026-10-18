-- The dashboard's optional auto-RLS event trigger needs to run on DDL events,
-- but visitors and signed-in users do not need to invoke its definer function.
do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end;
$$;
