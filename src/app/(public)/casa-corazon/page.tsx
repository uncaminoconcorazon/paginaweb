import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Fila } from "@/components/fila";
import { FotoFrase } from "@/components/foto-frase";
import { instagram } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clases presenciales en Casa Corazón",
  description: "Casa Corazón es mi espacio de yoga en Tapiales. Clases presenciales en grupos reducidos. Una casa para volver al cuerpo, un espacio para encontrarnos.",
};

const eyebrow = "text-[11px] uppercase tracking-[0.28em] text-muted";

const galeria = [
  ["clase", "Clase en grupo reducido"], ["perro", "Perro boca abajo sobre la colchoneta"], ["estiramiento", "Estiramiento grupal con cintas"], ["flexion", "Flexión hacia adelante con tacos"],
  ["equilibrio", "Postura de equilibrio en la sala"], ["manos", "Manos en oración junto a un taco"], ["bloques", "Tacos de madera y colchonetas"], ["almohadones", "Bolsters y almohadones sobre las colchonetas"],
] as const;

const pilares = [
  ["Grupos reducidos", "Para acompañar de cerca a cada persona."],
  ["Clases semipersonalizadas", "Propuestas que respetan tus posibilidades."],
  ["Venís como sos", "No hace falta llegar sabiendo, pudiendo ni demostrando nada."],
];

const Chips = ({ items }: { items: string[] }) => (
  <ul className="mt-5 flex flex-wrap gap-2 text-sm">
    {items.map((c) => <li key={c} className="rounded-full border border-foreground/30 px-4 py-2">{c}</li>)}
  </ul>
);

export default function CasaCorazon() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <p className={eyebrow}>Clases presenciales · Tapiales, Buenos Aires</p>
        <h1 className="mt-3 text-6xl md:text-7xl">Casa Corazón</h1>
        <p className="font-serif mt-4 text-3xl italic">Una casa para volver al cuerpo. Un espacio para encontrarnos.</p>
        <p className="mt-6 text-lg text-muted">Casa Corazón es mi espacio de yoga en Tapiales. Un lugar íntimo, creado y cuidado con mucho amor, donde cada encuentro es una invitación a bajar el ritmo, escuchar el cuerpo y regalarnos un momento de presencia.</p>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-3 md:grid-cols-3">
          {[["puerta", "Entrada de Casa Corazón"], ["sala", "La sala con bolsters y tacos de madera"], ["patio", "El patio de la casa"]].map(([n, alt], i) => (
            <div key={n} className={`relative aspect-[3/4] overflow-hidden rounded-3xl ${i === 1 ? "md:translate-y-8" : ""}`}>
              <Image src={`/brand/casa/${n}.webp`} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Tres ideas en tarjetas, no en un bloque de texto */}
      <section className="mx-auto max-w-6xl px-4 pb-4 pt-28">
        <ul className="grid gap-4 md:grid-cols-3">
          {pilares.map(([t, d], i) => (
            <li key={t} className={`rounded-3xl p-7 ${i === 1 ? "bg-accent text-accent-foreground" : "bg-surface"}`}>
              <span className="text-sm opacity-70">0{i + 1}</span>
              <h2 className="mt-3 text-3xl">{t}</h2>
              <p className="mt-2 text-sm opacity-90">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <Fila src="/brand/casa/almohadones.webp" position="center 60%" alt="Bolsters y almohadones sobre las colchonetas">
        <p className={eyebrow}>Los elementos</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Apoyos para cada cuerpo.</h2>
        <p className="mt-4 text-lg text-muted">Explorar las posturas con comodidad y adaptar la práctica a cada persona.</p>
        <Chips items={["Tacos", "Bolsters", "Cinturones"]} />
      </Fila>

      <Fila src="/brand/casa/perro.webp" position="center 40%" alt="Perro boca abajo sobre la colchoneta" invertir tone="surface">
        <p className={eyebrow}>Las propuestas</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Fuerza, movilidad, estabilidad y conciencia corporal.</h2>
        <Chips items={["Hatha Yoga", "Yoga suave", "Yoga terapéutico", "Y otras propuestas"]} />
      </Fila>

      <FotoFrase src="/brand/casa/manos.webp" position="center 40%" alt="Manos en oración junto a un taco de madera">No creo en una única forma correcta de practicar yoga.</FotoFrase>

      <section className="px-4 py-24 text-center">
        <p className="font-serif mx-auto max-w-3xl text-4xl leading-tight md:text-6xl">Cada cuerpo tiene su historia,<br />sus tiempos<br />y sus necesidades.</p>
      </section>

      {/* Galería prolija: grilla pareja, mismas proporciones */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {galeria.map(([n, alt]) => (
            <li key={n} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src={`/brand/casa/${n}.webp`} alt={alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl">Ubicación</h2>
          <p className="mt-3 text-lg">Humahuaca 377, Tapiales, Buenos Aires.</p>
          <p className="mt-3 text-sm text-muted">Los días y horarios de los encuentros presenciales los vamos a compartir muy pronto. Para consultas, escribime por Instagram.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="https://www.google.com/maps/search/?api=1&query=Humahuaca+377+Tapiales">Cómo llegar</ButtonLink>
            <ButtonLink href={instagram.href} variant="secondary">Escribime por Instagram</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
