# Pendientes y decisiones requeridas

## Producción
- Producción se despliega desde la rama `main` en Vercel (proyecto `uncaminoconcorazon-7c39`). Dominio propio: pendiente de elegir.
- Los cobros reales NO están activos (sin proveedor de pagos).

## Bloqueantes de infraestructura
- [x] Proyecto Supabase `fwpwwoecphsozgqyvbwh` (uncaminoconcorazon): migraciones aplicadas.
- [x] Variables públicas cargadas en Vercel. Falta `SUPABASE_SERVICE_ROLE_KEY` (solo cuando exista el webhook de pagos; cargarla directo en Vercel).
- [x] Proyecto Vercel `uncaminoconcorazon-7c39` vinculado al repo.
- [ ] Configurar en Supabase Auth: Site URL y Redirect URLs (`/auth/callback`), plantillas de email en español.

## Decisiones de negocio
- [ ] País/mercado y proveedor de pagos recurrentes; planes y precios; política de cancelación/reembolso.
- [ ] Zona horaria principal; proveedor de video privado y de transmisión en vivo.
- [ ] Nombre definitivo de marca, manual de marca, fotos, testimonios reales, bio de la instructora, público objetivo.

## Técnico
- [ ] Pruebas automatizadas de flujos de auth (aún no hay suite).
- [ ] Primer admin: asignar manualmente (ver `supabase/README.md`).
- [ ] Hero/copy definitivos tras recibir materiales.

## Contenido para "Sobre mí" (`/sobre-mi`)
- [ ] Formación, años de práctica y recorrido de Milu (hoy la página usa solo lo escrito en su documento del proyecto).
- [ ] Más fotos de Milu si quiere sumar (hay 5 en `public/brand/milu/`: `retrato`, `pose`, `cuaderno`, `manos`, `grupo`).
- [ ] Foto del bolster verde rayado (tienda).
- [ ] Días y horarios de los encuentros presenciales en Casa Corazón (Humahuaca 377, Tapiales).
