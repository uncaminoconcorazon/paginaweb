"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memberNav, site } from "@/lib/site";

export function MemberShell({ name, isStaff, children }: { name: string; isStaff: boolean; children: React.ReactNode }) {
  const path = usePathname();
  const items = isStaff ? [...memberNav, { href: "/admin", label: "Administración" }] : memberNav;
  return (
    <div className="min-h-dvh pb-20 md:pb-0 md:pl-56">
      {/* Escritorio: barra lateral */}
      <aside className="fixed inset-y-0 left-0 hidden w-56 flex-col border-r border-border bg-surface p-4 md:flex">
        <Link href="/" className="mb-6 font-semibold">{site.name}</Link>
        <nav aria-label="Miembro" className="flex flex-1 flex-col gap-1 text-sm">
          {items.map((i) => (
            <Link key={i.href} href={i.href} aria-current={path.startsWith(i.href) ? "page" : undefined}
              className="rounded-lg px-3 py-2 hover:bg-border/50 aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground">{i.label}</Link>
          ))}
        </nav>
        <div className="text-xs text-muted">
          <p className="truncate">{name}</p>
          <Link href="/perfil" className="underline">Perfil</Link> · <form action="/auth/salir" method="post" className="inline"><button className="underline">Salir</button></form>
        </div>
      </aside>
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      {/* Móvil: navegación inferior pensada para pulgar */}
      <nav aria-label="Miembro" className="fixed inset-x-0 bottom-0 flex justify-around border-t border-border bg-surface md:hidden">
        {memberNav.slice(0, 5).map((i) => (
          <Link key={i.href} href={i.href} aria-current={path.startsWith(i.href) ? "page" : undefined}
            className="flex min-h-14 flex-1 items-center justify-center px-1 text-xs aria-[current=page]:font-semibold aria-[current=page]:text-accent">{i.label}</Link>
        ))}
      </nav>
    </div>
  );
}
