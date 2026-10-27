import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Soy Milu. Comparto el yoga, la alimentación, la naturaleza y el arte como herramientas para habitar un mundo interno más sincero.",
};

const eyebrow = "text-[11px] uppercase tracking-[0.28em] text-muted";

const herramientas = [
  { title: "Yoga", text: "Movimiento y respiración, en clases cortas o largas, para practicar a tu ritmo.", color: "bg-olive" },
  { title: "Alimentación", text: "Recetas y consejos simples para nutrirte con calma.", color: "bg-orange" },
  { title: "Arte", text: "Escritura, poesía y expresión corporal para poner en palabras y en movimiento lo que sentís.", color: "bg-mauve" },
  { title: "Naturaleza", text: "Volver a la tierra, a sus ritmos y a la presencia en lo cotidiano.", color: "bg-accent" },
];

export default function SobreMi() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2 md:py-20">
        <div className="order-2 md:order-1">
          <p className={eyebrow}>Sobre mí</p>
          <h1 className="mt-4 text-5xl leading-[1.05] sm:text-6xl">Soy Milu</h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            Acompaño con yoga, y también con otras herramientas que para mí son medicina. Mi deseo es que al llegar sientas paz, y que te sientas contenida e identificada.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/planes">Conocer la comunidad</ButtonLink>
            <ButtonLink href="/casa-corazon" variant="secondary">Conocer Casa Corazón</ButtonLink>
          </div>
        </div>
        <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[2rem] md:order-2">
          <Image src="/brand/milu/pose.webp" alt="Milu practicando una postura de equilibrio con una cinta" fill priority sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className={eyebrow}>Lo que me hace particular</p>
            <h2 className="mt-3 text-4xl">Yoga bajado a la tierra</h2>
          </div>
          <div className="space-y-4 text-muted">
            <p>Para mí, practicar no es solo movernos. Es ir bajando, de a poco, la filosofía del yoga a la vida de todos los días.</p>
            <p>Por eso, además de las clases, comparto ejercicios puntuales de escritura, meditaciones, recetas y consejos, para que la práctica se apoye en tu rutina real y encuentre un lugar en ella.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className={eyebrow}>Mis herramientas</p>
        <h2 className="mt-3 max-w-2xl text-4xl">Cuatro formas de volver a vos</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {herramientas.map((h) => (
            <li key={h.title} className="rounded-3xl bg-surface p-6">
              <span aria-hidden className={`block h-3 w-3 rounded-full ${h.color}`} />
              <h3 className="mt-4 text-xl">{h.title}</h3>
              <p className="mt-2 text-sm text-muted">{h.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[1.2fr_1fr]">
          <blockquote className="border-l-2 border-mauve pl-5 text-lg leading-relaxed">
            Quiero que las personas sientan paz al entrar, que se sientan contenidas e identificadas. Compartir desde mi experiencia y formación las herramientas que considero medicina, para construir un mundo interno más habitable y sincero.
          </blockquote>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src="/brand/milu/retrato.webp" alt="Milu respirando con la mano sobre el rostro durante una práctica" fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className={eyebrow}>Para empezar sin compromiso</p>
        <h2 className="mt-3 text-4xl">Practiquemos juntas</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">Podés empezar con 15 días de yoga, gratis, y ver cómo te sienta.</p>
        <div className="mt-7 flex justify-center"><ButtonLink href="/desafio">Sumarme al desafío</ButtonLink></div>
      </section>
    </>
  );
}
