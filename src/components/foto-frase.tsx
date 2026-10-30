import Image from "next/image";

/** Frase sobre una fotografía a todo el ancho: separador visual entre secciones. */
export function FotoFrase({ src, alt = "", position = "center", children }: { src: string; alt?: string; position?: string; children: React.ReactNode }) {
  return (
    <section className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden px-4 py-24 md:min-h-[560px]">
      <Image src={src} alt={alt} fill sizes="100vw" className="-z-10 object-cover" style={{ objectPosition: position }} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#2b3322]/55" />
      <p className="font-serif max-w-3xl text-center text-3xl italic leading-snug text-[#f6ebd8] md:text-5xl">{children}</p>
    </section>
  );
}
