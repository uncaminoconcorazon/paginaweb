# Arquitectura (Fase 1 + fundaciones de Fase 2)

## Diagnóstico inicial
- Repo vacío (sin commits). Nada que reutilizar ni preservar.
- Vercel: equipo `kidsclubcafes-projects`, **ningún proyecto** vinculado a este repo.
- Supabase: solo existen `kidsclubcafe-contratos` y `kidsclub-staging-multitenant`; ninguno parece de esta plataforma. No se tocaron.

## Stack (justificado)
Next.js 15 (App Router, TS) + Tailwind 4 + Supabase (`@supabase/ssr`) + Zod. Elegido por encajar con Vercel/Supabase, SSR/SEO para páginas públicas y Server Actions/Route Handlers para lógica de confianza.

## Grupos de rutas
| Grupo | Rutas | Acceso |
|---|---|---|
| `(public)` + `/` | `/`, `/planes`, `/recursos`, `/tienda` | Público |
| `(auth)` | `/ingresar`, `/registro`, `/recuperar` | Público |
| `(member)` | `/inicio`, `/perfil`, `/membresia` (sesión); `/clases`, `/en-vivo`, `/calendario`, `/comunidad`, `/audio` (membresía activa o staff) | Sesión |
| `admin` | `/admin/*` | instructor/moderador/admin |

## Seguridad en capas
1. Middleware: refresca sesión y exige login en rutas privadas (falla cerrado si Supabase no está configurado).
2. Servidor (`lib/auth/session.ts`): `requireViewer/requireMember/requireStaff` validan contra la base.
3. RLS en Postgres: suscripciones y pagos son de **solo lectura** para el usuario; las escrituras solo las hace el service role (webhooks del proveedor de pagos). Los roles no pueden auto-escalarse (trigger `protect_profile_role`).
`?next=` se sanea (`lib/auth/redirect.ts`). Cierre de sesión por POST. Reset de contraseña no revela si el email existe.

## Roles
`visitante` (sin sesión) · `user` (registrado) · **miembro activo** (derivado de `subscriptions` vía `has_active_membership`) · `instructor` · `moderator` · `admin` (`profiles.role`).

## Modelo de datos
Implementado: `profiles`, `plans`, `subscriptions`, `payments`, `site_settings`.
Siguiente (por fase): contenido (clases, audio, instructores), eventos/reservas/lista de espera, comunidad/moderación, tienda (productos, variantes, carritos, órdenes, cupones), favoritos/historial, notificaciones. Cada módulo = una migración propia + RLS.

## Pagos
Sin proveedor asumido. Las tablas llevan `provider`/`provider_*_id`; el webhook futuro escribirá con service role. Ningún botón de pago simula funcionar.

## Estado de identidad
Colores/tipografía/copy son **provisorios** (`globals.css`, `lib/site.ts`, `content/home.ts`).
