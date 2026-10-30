import Image from "next/image";
import Link from "next/link";
import { getViewer } from "@/lib/auth/session";
import { publicNav, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";

export async function PublicHeader() {
  const viewer = await getViewer();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name}, inicio`}>
          <Image src="/brand/logo.png" alt="" width={36} height={38} priority />
          <span className="hidden text-[11px] uppercase tracking-[0.28em] sm:block">{site.name}</span>
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-1 text-sm">
          {publicNav.map((i) => (
            <Link key={i.href} href={i.href} className="hidden rounded-full px-3 py-2 hover:bg-border/60 xl:block">{i.label}</Link>
          ))}
          <Link href={viewer ? "/inicio" : "/ingresar"} className="rounded-full px-3 py-2 hover:bg-border/60">
            {viewer ? "Mi espacio" : "Ingresar"}
          </Link>
          <span className="hidden md:block"><ButtonLink href="/planes">Sumarme a la membresía</ButtonLink></span>
          <details className="relative xl:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-full px-3 hover:bg-border/60" aria-label="Menú">Menú</summary>
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-surface p-2 shadow-lg">
              {publicNav.map((i) => (
                <Link key={i.href} href={i.href} className="block rounded-xl px-3 py-3 hover:bg-border/50">{i.label}</Link>
              ))}
              <Link href="/planes" className="mt-1 block rounded-xl bg-accent px-3 py-3 text-center text-accent-foreground">Sumarme a la membresía</Link>
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
