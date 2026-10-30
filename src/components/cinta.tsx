/** Cinta de palabras clave: deja claro de un vistazo qué incluye la membresía. */
export function Cinta({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div aria-label={items.join(", ")} className="overflow-hidden border-y border-border bg-accent py-4 text-accent-foreground">
      <div aria-hidden className="marquee-track">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <li key={`${k}-${i}`} className="flex items-center whitespace-nowrap px-6 text-sm uppercase tracking-[0.22em]">
                {t}<span aria-hidden className="ml-12 h-1.5 w-1.5 rounded-full bg-lime" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
