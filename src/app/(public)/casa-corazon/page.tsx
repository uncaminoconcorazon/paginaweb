import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Casa Corazón",
  description: "Casa Corazón, la sala de yoga en Tapiales: luz natural, madera y calma para practicar.",
};

const fotos = [
  ["puerta", "Entrada de Casa Corazón"], ["almohadones", "Bolsters y almohadones sobre las colchonetas"], ["brazos", "Práctica de yoga con los brazos en alto"],
  ["meditacion", "Meditación grupal"], ["cuenco", "Cuenco tibetano"], ["bolster", "Bolster y velas en la sala"],
  ["sala", "La sala con ladrillos de yoga"], ["patio", "El patio de la casa"],
] as const;

export default function CasaCorazon() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-[11px] uppercase tracking-[0.28em] text-muted">El espacio</p>
      <h1 className="mt-3 text-5xl">Casa Corazón</h1>
      <p className="mt-4 max-w-xl text-muted">Un lugar cálido, de luz natural y madera, donde la práctica se vuelve encuentro.</p>
      <div className="mt-10 columns-2 gap-3 md:columns-3 [&>div]:mb-3">
        {fotos.map(([n, alt]) => (
          <div key={n} className="relative break-inside-avoid overflow-hidden rounded-2xl">
            <Image src={`/brand/casa/${n}.webp`} alt={alt} width={1064} height={1600} sizes="(min-width: 768px) 33vw, 50vw" className="h-auto w-full" />
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-3xl bg-surface p-8">
        <h2 className="text-2xl">Encuentros presenciales</h2>
        <p className="mt-2 text-sm">Humahuaca 377, Tapiales</p>
        <p className="mt-2 max-w-xl text-sm text-muted">Los días y horarios de los encuentros los vamos a compartir muy pronto. Mientras tanto, podés empezar con el desafío gratuito.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href="https://www.google.com/maps/search/?api=1&query=Humahuaca+377+Tapiales">Cómo llegar</ButtonLink>
          <ButtonLink href="/desafio" variant="secondary">Empezar con el desafío gratis</ButtonLink>
        </div>
      </div>
    </section>
  );
}
