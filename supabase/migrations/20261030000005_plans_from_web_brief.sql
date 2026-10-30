-- Aplicada al proyecto Supabase hzarfbsxkpdvsafbpjst. Planes y precios confirmados por Milu en el documento
-- "PROYECTO WEB: UN CAMINO CON CORAZÓN": Esencial $40.000 ARS/mes y Con encuentros en vivo $50.000 ARS/mes.
update public.plans set
  slug = 'esencial', name = 'Membresía esencial',
  description = 'Tu espacio para practicar, explorar y volver a vos a tu propio ritmo.',
  features = '["Acceso a todas las prácticas grabadas de Vinyasa, Hatha, yoga suave y restaurativo","Clases de aproximadamente 20 y 60 minutos","Meditaciones guiadas","Recetarios y contenidos de alimentación consciente","Propuestas de escritura creativa y exploración artística","Biblioteca de textos y lecturas","Programas especiales mensuales","Acceso al grupo de WhatsApp de la comunidad"]'::jsonb,
  price_cents = 4000000, currency = 'ARS', billing_interval = 'month', sort_order = 1, is_active = true
where slug = 'clases-grabadas';

update public.plans set
  slug = 'con-encuentros-en-vivo', name = 'Membresía con encuentros en vivo',
  description = 'Todo lo que ofrece la membresía esencial, más un encuentro semanal para practicar juntxs.',
  features = '["Acceso a todas las prácticas grabadas de yoga","Clases de aproximadamente 20 y 60 minutos","Una práctica semanal en vivo conmigo por Zoom","Acceso a las grabaciones de las prácticas en vivo","Meditaciones guiadas","Recetarios y contenidos de alimentación consciente","Propuestas de escritura creativa y exploración artística","Biblioteca de textos y lecturas","Programas especiales mensuales","Acceso al grupo de WhatsApp de la comunidad"]'::jsonb,
  price_cents = 5000000, currency = 'ARS', billing_interval = 'month', sort_order = 2, is_active = true
where slug = 'clases-grabadas-en-vivo';
