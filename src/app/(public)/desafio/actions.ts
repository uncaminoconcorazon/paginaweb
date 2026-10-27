"use server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type LeadState = { error?: string; ok?: string } | undefined;

const schema = z.object({
  fullName: z.string().trim().max(120).optional(),
  email: z.string().trim().toLowerCase().pipe(z.email("Revisá tu email")),
});

export async function joinChallenge(_: LeadState, form: FormData): Promise<LeadState> {
  if (String(form.get("website") ?? "") !== "") return { ok: "¡Listo! Te vamos a avisar." }; // honeypot
  const parsed = schema.safeParse({ fullName: form.get("fullName") || undefined, email: form.get("email") });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("leads").upsert(
    { email: parsed.data.email, full_name: parsed.data.fullName ?? null, source: "desafio" },
    { onConflict: "email,source", ignoreDuplicates: true },
  );
  if (error) return { error: "No pudimos anotarte. Probá de nuevo en un momento." };
  return { ok: "¡Listo! Te vamos a avisar apenas empiece el desafío." };
}
