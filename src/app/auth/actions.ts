"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { safeNext } from "@/lib/auth/redirect";
import { site } from "@/lib/site";

export type FormState = { error?: string; ok?: string } | undefined;

const email = z.string().trim().toLowerCase().pipe(z.email("Email inválido"));
const password = z.string().min(8, "La contraseña debe tener al menos 8 caracteres");

export async function signIn(_: FormState, form: FormData): Promise<FormState> {
  const parsed = z.object({ email, password: z.string().min(1) }).safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: "Email o contraseña incorrectos" };
  redirect(safeNext(String(form.get("next") ?? "")));
}

export async function signUp(_: FormState, form: FormData): Promise<FormState> {
  const parsed = z.object({ fullName: z.string().trim().min(2, "Ingresá tu nombre").max(120), email, password })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: { full_name: parsed.data.fullName }, emailRedirectTo: `${site.url}/auth/callback` },
  });
  if (error) return { error: "No pudimos crear la cuenta. Revisá los datos e intentá de nuevo." };
  if (data.session) redirect("/inicio");
  return { ok: "Te enviamos un email para confirmar tu cuenta." };
}

export async function requestPasswordReset(_: FormState, form: FormData): Promise<FormState> {
  const parsed = email.safeParse(form.get("email"));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(parsed.data, { redirectTo: `${site.url}/auth/callback?next=/perfil` });
  // Respuesta idéntica exista o no la cuenta (no filtra usuarios).
  return { ok: "Si el email existe, vas a recibir un enlace para restablecer tu contraseña." };
}
