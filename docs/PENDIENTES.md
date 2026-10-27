# Pendientes y decisiones requeridas

## Producción
- Producción se despliega desde la rama `main` en Vercel (proyecto `paginaweb`, equipo `un-camino-con-corazon`). Dominio propio: pendiente de elegir.
- Los cobros reales NO están activos. Proveedor elegido: Mercado Pago (integración pendiente).

## Infraestructura (todo en las cuentas de la dueña)
- [x] GitHub: `uncaminoconcorazon/paginaweb`.
- [x] Supabase: proyecto `hzarfbsxkpdvsafbpjst` (un-camino-con-corazon-web, región sa-east-1, plan gratuito): migraciones aplicadas.
- [x] Vercel: proyecto `paginaweb` vinculado al repo, sin protección de acceso (sitio público). Variables públicas de Supabase cargadas.
- [ ] Supabase Auth: Site URL y Redirect URLs (`/auth/callback`), plantillas de email en español.
- [ ] `SUPABASE_SERVICE_ROLE_KEY`: cargar directo en Vercel solo cuando exista el webhook de pagos.
- [ ] Plan gratuito de Supabase: pausa el proyecto tras ~7 días sin actividad; evaluar plan pago antes del lanzamiento.

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
