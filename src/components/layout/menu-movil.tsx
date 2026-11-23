"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Menú desplegable del celular: se cierra al elegir una opción, al tocar afuera o con Escape.
export function MenuMovil({ items }: { items: { href: string; label: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const cerrar = () => ref.current?.removeAttribute("open");

  // Al cambiar de página, el encabezado se mantiene: hay que cerrar el menú a mano.
  useEffect(cerrar, [pathname]);

  useEffect(() => {
    const afuera = (e: Event) => {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) cerrar();
    };
    const escape = (e: KeyboardEvent) => e.key === "Escape" && cerrar();
    document.addEventListener("pointerdown", afuera);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", afuera);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  return (
    <details ref={ref} className="relative xl:hidden">
      <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-full px-3 hover:bg-border/60" aria-label="Menú">Menú</summary>
      <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-surface p-2 shadow-lg">
        {items.map((i) => (
          <Link key={i.href} href={i.href} onClick={cerrar} className="block rounded-xl px-3 py-3 hover:bg-border/50">{i.label}</Link>
        ))}
        <Link href="/planes" onClick={cerrar} className="mt-1 block rounded-xl bg-accent px-3 py-3 text-center text-accent-foreground">Sumarme a la membresía</Link>
      </div>
    </details>
  );
}
