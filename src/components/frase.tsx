/** Frase destacada: separador tipográfico entre secciones. */
export function Frase({ children, tone = "surface" }: { children: React.ReactNode; tone?: "surface" | "accent" | "plain" }) {
  const tones = {
    surface: "bg-surface text-foreground",
    accent: "bg-accent text-accent-foreground",
    plain: "bg-background text-foreground",
  } as const;
  return (
    <section className={`${tones[tone]} px-4 py-20 md:py-28`}>
      <p className="font-serif mx-auto max-w-3xl text-center text-3xl italic leading-snug md:text-5xl">{children}</p>
    </section>
  );
}
