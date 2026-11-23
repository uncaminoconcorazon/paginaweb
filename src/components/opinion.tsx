// Tarjeta de una opinión de Google Maps (5 estrellas, sin nombre).
export function Opinion({ texto }: { texto: string }) {
  return (
    <figure className="flex flex-col rounded-3xl bg-surface p-7">
      <p aria-label="5 estrellas" className="text-lg tracking-widest text-orange">★★★★★</p>
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed">“{texto}”</blockquote>
      <figcaption className="mt-5 text-sm text-muted">Opinión en Google Maps</figcaption>
    </figure>
  );
}
