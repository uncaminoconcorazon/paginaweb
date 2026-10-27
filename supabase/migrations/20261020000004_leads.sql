-- Aplicada al proyecto fwpwwoecphsozgqyvbwh. Captación del embudo (desafío gratuito).
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null check (char_length(email) between 5 and 254),
  full_name text check (full_name is null or char_length(full_name) <= 120),
  source text not null check (source in ('desafio')),
  created_at timestamptz not null default now(),
  unique (email, source)
);
alter table public.leads enable row level security;

-- El público solo puede inscribirse; solo el admin puede leer.
create policy leads_insert_public on public.leads for insert to anon, authenticated
  with check (true);
create policy leads_select_admin on public.leads for select to authenticated
  using (public.is_admin());
