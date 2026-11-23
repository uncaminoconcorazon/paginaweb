import Image from "next/image";
import Link from "next/link";
import { getViewer } from "@/lib/auth/session";
import { publicNav, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { MenuMovil } from "@/components/layout/menu-movil";

export async function PublicHeader() {
  const viewer = await getViewer();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name}, inicio`}>
          <Image src="/brand/logo.png" alt="" width={36} height={38} priority />
          <span className="hidden text-[11px] uppercase tracking-[0.28em] whitespace-nowrap sm:block">{site.name}</span>
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-1 text-sm">
          {publicNav.map((i) => (
            <Link key={i.href} href={i.href} className="hidden whitespace-nowrap rounded-full px-2.5 py-2 hover:bg-border/60 xl:block">{i.label}</Link>
          ))}
          <Link href={viewer ? "/inicio" : "/ingresar"} className="rounded-full px-3 py-2 hover:bg-border/60">
            {viewer ? "Mi espacio" : "Ingresar"}
          </Link>
          <span className="hidden whitespace-nowrap md:block"><ButtonLink href="/planes">Sumarme a la membresía</ButtonLink></span>
          <MenuMovil items={publicNav} />
        </nav>
      </div>
    </header>
  );
}
