import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Cinta } from "@/components/cinta";
import { FotoFrase } from "@/components/foto-frase";
import { PlanCards } from "@/components/plan-cards";
import { cinta, faqs, membership, phrases } from "@/content/home";

const fotos: Record<string, [string, string]> = {
  A: ["/brand/casa/brazos.webp", "center 30%"], B: ["/brand/milu/pose.webp", "center 40%"], C: ["/brand/casa/meditacion.webp", "center 60%"],
  E: ["/brand/milu/cuaderno.webp", "center"], F: ["/brand/milu/manos.webp", "center 40%"], G: ["/brand/casa/patio.webp", "center 50%"],
};

export const metadata: Metadata = {
  title: "La membresía",
  description: "Yoga, meditación, alimentación consciente, escritura creativa y comunidad. Elegí tu ritmo, encontrá tu práctica, compartí el camino.",
};

const eyebrow = "text-[11px] uppercase tracking-[0.28em] text-muted";

export default function PlanesPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <p className={eyebrow}>La membresía</p>
        <h1 className="mt-3 text-5xl md:text-6xl">Una membresía de yoga online</h1>
        <p className="mt-6 max-w-2xl text-lg">Clases de yoga grabadas, meditaciones, alimentación consciente, escritura creativa y una comunidad. Con la opción de sumar un encuentro en vivo por semana conmigo.</p>
        <p className="font-serif mt-6 text-3xl italic">{membership.title}</p>
      </section>

      <Cinta items={cinta} />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="text-4xl">¿Qué incluye?</h2>
        <div className="mt-10 space-y-16">
          {membership.includes.map((i, idx) => {
            const foto = fotos[i.letter];
            return (
              <article key={i.title} className={`grid items-center gap-8 ${foto ? "md:grid-cols-2" : ""}`}>
                {foto && (
                  <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl ${idx % 2 ? "md:order-2" : ""}`}>
                    <Image src={foto[0]} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" style={{ objectPosition: foto[1] }} />
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted">{i.letter}</p>
                  <h3 className="mt-1 text-3xl md:text-4xl">{i.title}</h3>
                  <p className="font-serif mt-2 text-xl italic text-muted">{i.text}</p>
                  <details className="group mt-4">
                    <summary className="cursor-pointer list-none text-sm underline underline-offset-4">Leer más</summary>
                    <div className="mt-4 space-y-4">
                      {i.detail.map(([t, d]) => (
                        <div key={t + d}>
                          {t && <h4 className="font-medium">{t}</h4>}
                          <p className="text-muted">{d}</p>
                        </div>
                      ))}
                      {i.letter === "G" && (
                        <ul className="grid gap-1 text-sm sm:grid-cols-2">
                          {membership.themes.map((t) => <li key={t} className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-olive" />{t}</li>)}
                        </ul>
                      )}
                    </div>
                  </details>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-surface px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src="/brand/milu/grupo.webp" alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" style={{ objectPosition: "center 60%" }} />
          </div>
          <div>
            <p className={eyebrow}>Comunidad de WhatsApp</p>
            <h2 className="mt-3 text-3xl md:text-4xl">{membership.whatsapp.title}</h2>
            <p className="mt-4 text-muted">{membership.whatsapp.text[0]}</p>
          </div>
        </div>
      </section>

      <section id="planes" className="mx-auto max-w-5xl px-4 py-20">
        <p className={eyebrow}>Planes de membresía</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Dos opciones, un mismo camino</h2>
        <p className="mt-3 max-w-2xl text-muted">Ambas incluyen todos los contenidos de la plataforma. La diferencia es que una suma encuentros semanales en vivo conmigo.</p>
        <div className="mt-10"><PlanCards /></div>
        <p className="mt-10 max-w-2xl text-muted">No hay una opción mejor que otra. Se trata de elegir la que mejor acompañe tu momento y tu manera de practicar. Los encuentros en vivo son por Zoom y quedan grabados.</p>
      </section>

      <section className="bg-surface px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl">Tu camino puede empezar hoy.</h2>
          <p className="mt-4 text-muted">Las inscripciones están abiertas todo el mes. Cada suscripción dura 30 días y se renueva mensualmente. Los pagos se realizarán mediante Mercado Pago.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20">
        <h2 className="text-4xl">Preguntas frecuentes</h2>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg">{q}<span aria-hidden className="text-muted transition-transform group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-muted">{a}</p>
            </details>
          ))}
        </div>
        <div className="mt-10"><ButtonLink href="/desafio" variant="secondary">Empezá con el desafío gratuito</ButtonLink></div>
      </section>

      <FotoFrase src="/brand/casa/patio.webp" position="center 45%">{phrases[7]}</FotoFrase>
    </>
  );
}
