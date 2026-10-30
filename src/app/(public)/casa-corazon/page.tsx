import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Frase } from "@/components/frase";
import { phrases } from "@/content/home";
import { instagram } from "@/lib/site";

export const metadata: Metadata = {
  title: "Casa Corazón",
  description: "Casa Corazón es mi espacio de yoga en Tapiales. Una casa para volver al cuerpo. Un espacio para encontrarnos.",
};

const fotos = [
  ["puerta", "Entrada de Casa Corazón"], ["almohadones", "Bolsters y almohadones sobre las colchonetas"], ["brazos", "Práctica de yoga con los brazos en alto"],
  ["meditacion", "Meditación grupal"], ["cuenco", "Cuenco tibetano"], ["bolster", "Bolster y velas en la sala"],
  ["sala", "La sala con ladrillos de yoga"], ["patio", "El patio de la casa"],
] as const;

const text = [
  "Me gusta pensar este espacio como una pequeña pausa dentro de la vida cotidiana. Un lugar donde no hace falta llegar sabiendo, pudiendo ni demostrando nada.",
  "Solo venir como sos.",
  "Las clases son semipersonalizadas, en grupos reducidos, para poder acompañar de cerca los procesos de cada persona, atender sus necesidades y ofrecer propuestas que respeten sus posibilidades.",
  "Trabajamos con elementos de yoga, como tacos, bolsters y cinturones, que nos permiten explorar las posturas con mayor comodidad, encontrar apoyos y adaptar la práctica a diferentes cuerpos y experiencias.",
  "A través del Hatha Yoga, el yoga suave, el yoga terapéutico y otras propuestas, buscamos desarrollar fuerza, movilidad, estabilidad y conciencia corporal, sin perder de vista algo fundamental: cada cuerpo tiene su historia, sus tiempos y sus necesidades.",
  "No creo en una única forma correcta de practicar yoga. Creo en la posibilidad de construir una práctica que tenga sentido para cada persona, que pueda acompañarla en el momento que está atravesando y que le ofrezca herramientas para sentirse mejor en su vida cotidiana.",
  "Casa Corazón es ese lugar donde podemos explorar, equivocarnos, aprender, descansar y volver a empezar.",
  "Un espacio para practicar yoga, sí. Pero también para aprender a escucharnos con un poquito más de paciencia y amabilidad.",
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
        <div className="columns-2 gap-3 md:columns-3 [&>div]:mb-3">
          {fotos.map(([n, alt]) => (
            <div key={n} className="relative break-inside-avoid overflow-hidden rounded-2xl">
              <Image src={`/brand/casa/${n}.webp`} alt={alt} width={1064} height={1600} sizes="(min-width: 768px) 33vw, 50vw" className="h-auto w-full" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-5 px-4 py-20 text-lg text-muted">
        {text.map((t) => <p key={t}>{t}</p>)}
        <p className="font-serif text-3xl italic text-foreground">Porque cuando hacemos espacio para escucharnos, algo empieza a cambiar.</p>
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

      <Frase tone="plain">{phrases[2]}</Frase>
    </>
  );
}
