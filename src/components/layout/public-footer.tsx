import Image from "next/image";
import Link from "next/link";
import { instagram, publicNav, site } from "@/lib/site";

export function PublicFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-[1fr_auto]">
        <div className="flex items-start gap-3">
          <Image src="/brand/logo.png" alt="" width={44} height={46} />
          <p className="max-w-xs text-sm text-muted">Encontrar tu propio camino. Habitar tu cuerpo. Volver a lo esencial.</p>
        </div>
        <nav aria-label="Pie de página" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {publicNav.map((i) => <Link key={i.href} href={i.href} className="underline-offset-4 hover:underline">{i.label}</Link>)}
          <Link href="/tienda" className="underline-offset-4 hover:underline">Tienda</Link>
          <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">Instagram {instagram.handle}</a>
          <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">Contacto</a>
          <Link href="/ingresar" className="underline-offset-4 hover:underline">Acceso a la membresía</Link>
          <Link href="/desafio" className="underline-offset-4 hover:underline">Acceso al desafío gratuito</Link>
        </nav>
      </div>
      <p className="border-t border-border py-4 text-center text-xs text-muted">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
