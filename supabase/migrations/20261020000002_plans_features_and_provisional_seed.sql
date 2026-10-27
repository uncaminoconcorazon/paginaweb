-- Aplicada al proyecto fwpwwoecphsozgqyvbwh.
-- Dos planes PROVISORIOS (sin precio): nombres, contenidos y kit a definir por la dueña.
alter table public.plans add column features jsonb not null default '[]'::jsonb;

insert into public.plans (slug, name, description, features, is_active, sort_order) values
  ('camino', 'Camino (provisorio)',
   'Clases grabadas y encuentros presenciales en Casa Corazón.',
   '["Acceso a la biblioteca de clases grabadas","Encuentros presenciales en Casa Corazón","Comunidad de miembros"]'::jsonb, true, 1),
  ('camino-kit', 'Camino + Kit (provisorio)',
   'Todo lo del plan Camino, más un kit de yoga.',
   '["Todo lo incluido en Camino","Kit de yoga: bolster, mat y almohadilla de semillas (a definir)"]'::jsonb, true, 2);
