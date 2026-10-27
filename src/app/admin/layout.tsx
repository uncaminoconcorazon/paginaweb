import Link from "next/link";
import { requireStaff } from "@/lib/auth/session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const v = await requireStaff();
  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <header className="mb-8 flex items-center justify-between border-b border-border pb-4">
        <p className="font-semibold">Administración <span className="ml-2 text-xs font-normal text-muted">{v.role}</span></p>
        <Link href="/inicio" className="text-sm underline">Volver al espacio de miembro</Link>
      </header>
      {children}
    </div>
  );
}
