import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Escribe una marca de tiempo en la base (función `keepalive`) para que el plan gratuito de Supabase
 * no pause el proyecto por inactividad. Una simple lectura no alcanzó: el proyecto se pausó igual.
 * La llama un cron de Vercel (ver vercel.json). No expone ni recibe datos.
 */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.json({ ok: false }, { status: 503 });

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.rpc("keepalive");
  return NextResponse.json({ ok: !error }, { status: error ? 502 : 200 });
}
