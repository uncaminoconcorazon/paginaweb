# Supabase

Migraciones reproducibles en `migrations/`. Aplicar con `supabase db push` contra el proyecto
**confirmado** para esta plataforma (ver `docs/PENDIENTES.md`). No existen datos ficticios.
El primer admin se asigna manualmente: `update public.profiles set role='admin' where id='<uuid>';`
(ejecutado con service role / SQL editor).
