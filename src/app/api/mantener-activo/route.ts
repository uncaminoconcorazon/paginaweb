import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Consulta mínima a la base para que el plan gratuito de Supabase no pause el proyecto por inactividad.
 * La llama un cron de Vercel (ver vercel.json). Solo lee un dato público.
 */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.json({ ok: false }, { status: 503 });

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("site_settings").select("key").eq("is_public", true).limit(1);
  return NextResponse.json({ ok: !error }, { status: error ? 502 : 200 });
}
