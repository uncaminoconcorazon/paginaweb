"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Menú desplegable del celular. Se controla con estado de React (no con <details>)
// para que se cierre siempre: al elegir una opción, al cambiar de página, al tocar afuera o con Escape.
export function MenuMovil({ items }: { items: { href: string; label: string }[] }) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const cerrar = () => setAbierto(false);

  // El encabezado se mantiene entre páginas: al cambiar la ruta hay que cerrar el menú.
  useEffect(() => { setAbierto(false); }, [pathname]);

  useEffect(() => {
    if (!abierto) return;
    const afuera = (e: Event) => { if (!ref.current?.contains(e.target as Node)) setAbierto(false); };
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape") setAbierto(false); };
    document.addEventListener("pointerdown", afuera);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", afuera);
      document.removeEventListener("keydown", escape);
    };
  }, [abierto]);

  return (
    <div ref={ref} className="relative xl:hidden">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls="menu-movil"
        aria-label="Menú"
        className="flex min-h-11 cursor-pointer items-center rounded-full px-3 hover:bg-border/60"
      >
        Menú
      </button>
      {abierto && (
        <div id="menu-movil" className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-surface p-2 shadow-lg">
          {items.map((i) => (
            <Link key={i.href} href={i.href} onClick={cerrar} className="block rounded-xl px-3 py-3 hover:bg-border/50">{i.label}</Link>
          ))}
          <Link href="/planes" onClick={cerrar} className="mt-1 block rounded-xl bg-accent px-3 py-3 text-center text-accent-foreground">Sumarme a la membresía</Link>
        </div>
      )}
    </div>
  );
}
