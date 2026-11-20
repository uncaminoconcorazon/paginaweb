-- Aplicada al proyecto Supabase hzarfbsxkpdvsafbpjst. Escribe una marca de tiempo para mantener activo el
-- proyecto (plan gratuito). La llama el cron de Vercel vía /api/mantener-activo.
create function public.keepalive() returns void
language sql security definer set search_path = '' as $$
  insert into public.site_settings (key, value, is_public)
  values ('last_keepalive', to_jsonb(now()), false)
  on conflict (key) do update set value = excluded.value, updated_at = now();
$$;
revoke execute on function public.keepalive() from public;
grant execute on function public.keepalive() to anon, authenticated;
