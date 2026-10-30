import type { Metadata } from "next";
import Image from "next/image";
import { challenge } from "@/content/home";
import { LeadForm } from "./lead-form";

export const metadata: Metadata = {
  title: "Desafío gratuito: 15 días para volver a vos",
  description: "Quince días. Quince minutos por día. Un pequeño espacio para vos. 100 % gratuito.",
};

export default function Desafio() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted">{challenge.eyebrow}</p>
          <h1 className="mt-3 text-5xl md:text-6xl">{challenge.title}</h1>
          <div className="mt-8 space-y-4 text-lg text-muted">
            {[challenge.text[0], challenge.text[3], challenge.text[4]].map((t) => <p key={t}>{t}</p>)}
          </div>
          <p className="font-serif mt-8 text-3xl italic">{challenge.closing}</p>
        </div>
        <div className="md:sticky md:top-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src="/brand/casa/brazos.webp" alt="Práctica de yoga con los brazos en alto en Casa Corazón" fill sizes="(min-width: 768px) 440px, 100vw" className="object-cover" />
          </div>
          <div className="mt-6 rounded-3xl bg-surface p-6">
            <h2 className="text-2xl">¿Cómo funciona?</h2>
            <ul className="mt-3 space-y-1 text-sm">
              {challenge.how.map((c) => <li key={c} className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-olive" />{c}</li>)}
            </ul>
            <div className="mt-6"><LeadForm /></div>
            <p className="mt-3 text-xs text-muted">Usamos tu correo solo para enviarte las indicaciones del desafío y avisarte de la comunidad.</p>
          </div>
        </div>
      </section>
    </>
  );
}
