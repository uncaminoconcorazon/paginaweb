/** Estado explícito de módulo aún no construido: nunca simula funcionalidad. */
export function ModulePlaceholder({ title, phase, needs }: { title: string; phase: string; needs: string[] }) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">En construcción · {phase}</p>
      <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
      <p className="mt-4 text-muted">Este módulo todavía no está disponible. Lo que falta definir:</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
        {needs.map((n) => <li key={n}>{n}</li>)}
      </ul>
    </section>
  );
}
