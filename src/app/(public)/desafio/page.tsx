import type { Metadata } from "next";
import Image from "next/image";
import { LeadForm } from "./lead-form";

export const metadata: Metadata = { title: "Desafío gratis: 15 días de yoga" };

export default function Desafio() {
  return (
    <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 md:grid-cols-2">
      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted">Gratis</p>
        <h1 className="mt-3 text-4xl">15 días de yoga</h1>
        <p className="mt-4 text-muted">Un desafío para volver a tu cuerpo todos los días, acompañado de meditaciones. Dejá tu email y te avisamos apenas empiece, junto con los pasos para sumarte.</p>
        <div className="mt-8 rounded-3xl bg-surface p-6"><LeadForm /></div>
        <p className="mt-3 text-xs text-muted">Usamos tu email solo para avisarte del desafío y de la comunidad.</p>
      </div>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem]">
        <Image src="/brand/casa/brazos.webp" alt="Práctica de yoga con los brazos en alto en Casa Corazón" fill sizes="(min-width: 768px) 440px, 100vw" className="object-cover" />
      </div>
    </section>
  );
}
