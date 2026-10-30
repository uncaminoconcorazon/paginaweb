import Image from "next/image";

/** Fila foto + texto breve. `invertir` pone la foto del lado derecho en escritorio. */
export function Fila({ src, alt = "", position = "center", invertir = false, tone = "plain", children }: { src: string; alt?: string; position?: string; invertir?: boolean; tone?: "plain" | "surface"; children: React.ReactNode }) {
  return (
    <section className={`${tone === "surface" ? "bg-surface" : ""} px-4 py-16 md:py-24`}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] ${invertir ? "md:order-2" : ""}`}>
          <Image src={src} alt={alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" style={{ objectPosition: position }} />
        </div>
        <div className={invertir ? "md:order-1" : ""}>{children}</div>
      </div>
    </section>
  );
}
