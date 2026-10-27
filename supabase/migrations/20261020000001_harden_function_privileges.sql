-- Aplicada al proyecto fwpwwoecphsozgqyvbwh. Cierra helpers SECURITY DEFINER no necesarios vía RPC.
-- is_admin queda accesible para anon porque lo usan las políticas RLS de plans/site_settings.
revoke execute on function public.current_app_role() from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.protect_profile_role() from public, anon, authenticated;
revoke execute on function public.is_staff() from public, anon;
revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.is_staff() to authenticated;

create or replace function public.has_active_membership(uid uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select (uid = (select auth.uid()) or public.is_admin()) and exists (
    select 1 from public.subscriptions s
    where s.user_id = uid
      and s.status in ('active', 'trialing')
      and (s.current_period_end is null or s.current_period_end > now())
  )
$$;
