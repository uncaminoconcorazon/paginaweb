import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { FotoFrase } from "@/components/foto-frase";
import { instagram } from "@/lib/site";

export const metadata: Metadata = {
  title: "Casa Corazón",
  description: "Casa Corazón es mi espacio de yoga en Tapiales. Una casa para volver al cuerpo. Un espacio para encontrarnos.",
};

const fotos = [
  ["puerta", "Entrada de Casa Corazón"], ["sala", "La sala con bolsters y tacos de madera"], ["patio", "El patio de la casa"],
  ["clase", "Clase en grupo reducido"], ["perro", "Perro boca abajo sobre la colchoneta"], ["meditacion", "Meditación grupal"],
  ["estiramiento", "Estiramiento grupal con cintas"], ["flexion", "Flexión hacia adelante con tacos"], ["equilibrio", "Postura de equilibrio en la sala"],
  ["manos", "Manos en oración junto a un taco"], ["bloques", "Tacos de madera y colchonetas"], ["almohadones", "Bolsters y almohadones sobre las colchonetas"],
] as const;

const text = [
  "Un lugar donde no hace falta llegar sabiendo, pudiendo ni demostrando nada. Solo venir como sos.",
  "Las clases son semipersonalizadas, en grupos reducidos, para acompañar de cerca a cada persona y respetar sus posibilidades.",
  "Trabajamos con elementos de yoga, como tacos, bolsters y cinturones, para explorar las posturas con comodidad y adaptar la práctica a cada cuerpo.",
  "Hatha Yoga, yoga suave, yoga terapéutico y otras propuestas, para desarrollar fuerza, movilidad, estabilidad y conciencia corporal. No creo en una única forma correcta de practicar: cada cuerpo tiene su historia, sus tiempos y sus necesidades.",
];

export default function CasaCorazon() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted">Tapiales, Buenos Aires</p>
        <h1 className="mt-3 text-6xl md:text-7xl">Casa Corazón</h1>
        <p className="font-serif mt-4 text-3xl italic">Una casa para volver al cuerpo. Un espacio para encontrarnos.</p>
        <p className="mt-6 text-lg text-muted">Casa Corazón es mi espacio de yoga en Tapiales. Un lugar íntimo, creado y cuidado con mucho amor, donde cada encuentro es una invitación a bajar el ritmo, escuchar el cuerpo y regalarnos un momento de presencia.</p>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-3 md:grid-cols-3">
          {["puerta", "sala", "patio"].map((n, i) => (
            <div key={n} className={`relative aspect-[3/4] overflow-hidden rounded-3xl ${i === 1 ? "md:translate-y-8" : ""}`}>
              <Image src={`/brand/casa/${n}.webp`} alt={fotos.find((f) => f[0] === n)?.[1] ?? ""} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-5 px-4 py-24 text-lg text-muted">
        {text.map((t) => <p key={t}>{t}</p>)}
      </section>

      <FotoFrase src="/brand/casa/meditacion.webp" position="center 55%" alt="Meditación grupal en Casa Corazón">Porque cuando hacemos espacio para escucharnos, algo empieza a cambiar.</FotoFrase>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="columns-2 gap-3 md:columns-3 [&>div]:mb-3">
          {fotos.filter((f) => !["puerta", "sala", "patio", "meditacion"].includes(f[0])).map(([n, alt]) => (
            <div key={n} className="relative break-inside-avoid overflow-hidden rounded-2xl">
              <Image src={`/brand/casa/${n}.webp`} alt={alt} width={1064} height={1600} sizes="(min-width: 768px) 33vw, 50vw" className="h-auto w-full" />
            </div>
          ))}
        </div>
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
