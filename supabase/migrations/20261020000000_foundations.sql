-- Fase 2 · Fundaciones: perfiles, roles, planes, suscripciones, pagos, ajustes.
-- Migración aditiva. Aplicada al proyecto Supabase hzarfbsxkpdvsafbpjst (un-camino-con-corazon-web).

create type public.app_role as enum ('user', 'instructor', 'moderator', 'admin');
create type public.billing_interval as enum ('month', 'year');
create type public.subscription_status as enum
  ('incomplete', 'trialing', 'active', 'past_due', 'canceled', 'expired');
create type public.payment_status as enum ('pending', 'succeeded', 'failed', 'refunded');

create function public.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end $$;

-- Perfiles ---------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  role public.app_role not null default 'user',
  timezone text,
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Helpers de autorización (security definer: evitan recursión de RLS) -----
create function public.current_app_role() returns public.app_role
language sql stable security definer set search_path = '' as $$
  select role from public.profiles where id = (select auth.uid())
$$;

create function public.is_staff() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce(public.current_app_role() in ('instructor', 'moderator', 'admin'), false)
$$;

create function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce(public.current_app_role() = 'admin', false)
$$;

-- Plans & suscripciones ----------------------------------------------------
-- Sin precios cargados: price_cents/currency son null hasta que la dueña los confirme.
create table public.plans (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  price_cents integer check (price_cents is null or price_cents >= 0),
  currency text check (currency is null or char_length(currency) = 3),
  billing_interval public.billing_interval,
  is_active boolean not null default false,
  sort_order integer not null default 0,
  provider text,
  provider_price_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger plans_updated_at before update on public.plans
  for each row execute function public.set_updated_at();

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  plan_id uuid not null references public.plans (id),
  status public.subscription_status not null default 'incomplete',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  provider text,
  provider_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_subscription_id)
);
create index subscriptions_user_idx on public.subscriptions (user_id, status);
create index subscriptions_plan_idx on public.subscriptions (plan_id);
create trigger subscriptions_updated_at before update on public.subscriptions
  for each row execute function public.set_updated_at();

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete restrict,
  subscription_id uuid references public.subscriptions (id) on delete set null,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null check (char_length(currency) = 3),
  status public.payment_status not null default 'pending',
  provider text,
  provider_payment_id text,
  created_at timestamptz not null default now(),
  unique (provider, provider_payment_id)
);
create index payments_user_idx on public.payments (user_id, created_at desc);
create index payments_subscription_idx on public.payments (subscription_id);

-- Membresía activa (única fuente de verdad para acceso pago) ----------------
create function public.has_active_membership(uid uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.subscriptions s
    where s.user_id = uid
      and s.status in ('active', 'trialing')
      and (s.current_period_end is null or s.current_period_end > now())
  )
$$;
revoke execute on function public.has_active_membership(uuid) from public, anon;
grant execute on function public.has_active_membership(uuid) to authenticated;

-- Ajustes del sitio ---------------------------------------------------------
create table public.site_settings (
  key text primary key,
  value jsonb not null,
  is_public boolean not null default false,
  updated_at timestamptz not null default now()
);
insert into public.site_settings (key, value, is_public)
values ('primary_timezone', '"UTC"', true); -- PROVISIONAL: la dueña define la zona principal.

-- Alta automática de perfil --------------------------------------------------
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, nullif(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Nadie, salvo admin o service role, puede cambiar roles. ---------------------
create function public.protect_profile_role() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.role is distinct from old.role
     and (select auth.uid()) is not null
     and not public.is_admin() then
    raise exception 'No autorizado a modificar el rol';
  end if;
  return new;
end $$;
create trigger profiles_protect_role before update on public.profiles
  for each row execute function public.protect_profile_role();

-- RLS ------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;
alter table public.site_settings enable row level security;

create policy profiles_select on public.profiles for select to authenticated
  using (id = (select auth.uid()) or public.is_staff());
create policy profiles_update_own on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy profiles_update_admin on public.profiles for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy plans_select_public on public.plans for select to anon, authenticated
  using (is_active or public.is_admin());
create policy plans_admin_write on public.plans for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Suscripciones y pagos: lectura propia o admin; escritura SOLO service role (webhooks).
create policy subscriptions_select on public.subscriptions for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());
create policy payments_select on public.payments for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());

create policy settings_select_public on public.site_settings for select to anon, authenticated
  using (is_public or public.is_admin());
create policy settings_admin_write on public.site_settings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
