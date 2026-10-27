import { redirect } from "next/navigation";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { AppRole } from "./roles";
import { can } from "./roles";

export type Viewer = {
  id: string;
  email: string | undefined;
  fullName: string | null;
  role: AppRole;
  isMember: boolean;
};

/** Usuario autenticado + rol + estado de membresía, validado contra la base (RLS aplica). */
export const getViewer = cache(async (): Promise<Viewer | null> => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return null;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: profile }, { data: isMember }] = await Promise.all([
    supabase.from("profiles").select("full_name, role").eq("id", user.id).single(),
    supabase.rpc("has_active_membership", { uid: user.id }),
  ]);

  return {
    id: user.id,
    email: user.email,
    fullName: profile?.full_name ?? null,
    role: (profile?.role as AppRole) ?? "user",
    isMember: Boolean(isMember),
  };
});

export async function requireViewer(): Promise<Viewer> {
  const viewer = await getViewer();
  if (!viewer) redirect("/ingresar");
  return viewer;
}

export async function requireMember(): Promise<Viewer> {
  const viewer = await requireViewer();
  if (!viewer.isMember && !can.accessAdmin(viewer.role)) redirect("/planes?acceso=membresia");
  return viewer;
}

export async function requireStaff(): Promise<Viewer> {
  const viewer = await requireViewer();
  if (!can.accessAdmin(viewer.role)) redirect("/inicio");
  return viewer;
}
