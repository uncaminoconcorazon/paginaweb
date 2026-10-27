-- Aplicada al proyecto fwpwwoecphsozgqyvbwh. Planes según el documento de la dueña.
-- Precios de lanzamiento tentativos ($27.000 / $40.000, asumidos en ARS): CONFIRMAR antes de cobrar.
update public.plans set
  slug = 'clases-grabadas', name = 'Clases grabadas',
  description = 'Acceso a la biblioteca de prácticas pregrabadas y al contenido de la comunidad.',
  features = '["Prácticas pregrabadas de 20 minutos y de 1 hora","Meditaciones guiadas","Secciones de alimentación y de arte","Programas especiales mensuales"]'::jsonb,
  price_cents = 2700000, currency = 'ARS', billing_interval = 'month', sort_order = 1, is_active = true
where slug = 'camino';

insert into public.plans (slug, name, description, features, price_cents, currency, billing_interval, is_active, sort_order) values
  ('clases-grabadas-en-vivo', 'Clases grabadas + encuentros en vivo',
   'Todo lo del plan Clases grabadas, más una práctica en vivo cada semana.',
   '["Todo lo incluido en Clases grabadas","Encuentro semanal en vivo (queda grabado)","Participación en los encuentros de los programas especiales"]'::jsonb,
   4000000, 'ARS', 'month', true, 2);

update public.plans set is_active = false, sort_order = 3,
  name = 'Camino + Kit (idea, sin activar)'
where slug = 'camino-kit';
