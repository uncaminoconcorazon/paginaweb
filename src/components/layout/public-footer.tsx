import Image from "next/image";
import Link from "next/link";
import { publicNav, site } from "@/lib/site";

export function PublicFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-[1fr_auto]">
        <div className="flex items-start gap-3">
          <Image src="/brand/logo.png" alt="" width={44} height={46} />
          <p className="max-w-xs text-sm text-muted">Yoga bajado a la tierra: movimiento, respiración, alimentación, arte y comunidad.</p>
        </div>
        <nav aria-label="Pie de página" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {publicNav.map((i) => <Link key={i.href} href={i.href} className="underline-offset-4 hover:underline">{i.label}</Link>)}
          <Link href="/ingresar" className="underline-offset-4 hover:underline">Ingresar</Link>
        </nav>
      </div>
      <p className="border-t border-border py-4 text-center text-xs text-muted">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
