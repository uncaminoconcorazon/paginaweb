import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Frase } from "@/components/frase";
import { PlanCards } from "@/components/plan-cards";
import { faqs, membership, phrases } from "@/content/home";

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
        <h1 className="mt-3 text-5xl md:text-6xl">{membership.title}</h1>
        <div className="mt-8 space-y-4 text-lg text-muted">
          {membership.intro.map((t) => <p key={t}>{t}</p>)}
        </div>
        <p className="font-serif mt-8 text-3xl italic">{membership.closing}</p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="text-4xl">¿Qué incluye?</h2>
        <div className="mt-10 space-y-12">
          {membership.includes.map((i) => (
            <article key={i.title}>
              <p className="text-sm text-muted">{i.letter}</p>
              <h3 className="mt-1 text-3xl">{i.title}</h3>
              <p className="font-serif mt-2 text-xl italic text-muted">{i.text}</p>
              <div className="mt-4 space-y-4">
                {i.detail.map(([t, d]) => (
                  <div key={t + d}>
                    {t && <h4 className="font-medium">{t}</h4>}
                    <p className="text-muted">{d}</p>
                  </div>
                ))}
              </div>
              {i.letter === "G" && (
                <ul className="mt-5 grid gap-1 text-sm sm:grid-cols-2">
                  {membership.themes.map((t) => <li key={t} className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-olive" />{t}</li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <p className={eyebrow}>Comunidad de WhatsApp</p>
          <h2 className="mt-3 text-4xl">{membership.whatsapp.title}</h2>
          <div className="mt-6 space-y-4 text-muted">
            {membership.whatsapp.text.map((t) => <p key={t}>{t}</p>)}
          </div>
        </div>
      </section>

      <section id="planes" className="mx-auto max-w-5xl px-4 py-20">
        <p className={eyebrow}>Planes de membresía</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Dos opciones, un mismo camino</h2>
        <p className="mt-3 max-w-2xl text-muted">Ambas incluyen todos los contenidos de la plataforma. La diferencia es que una suma encuentros semanales en vivo conmigo.</p>
        <div className="mt-10"><PlanCards /></div>
        <div className="mt-12 max-w-2xl space-y-3 text-muted">
          <h3 className="text-2xl text-foreground">Diferencia entre los planes</h3>
          <p>La membresía esencial te permite explorar todos los contenidos a tu ritmo.</p>
          <p>La membresía con encuentros en vivo suma una práctica semanal compartida conmigo por Zoom, que también queda grabada.</p>
          <p>Ambas modalidades incluyen los mismos contenidos, programas mensuales y acceso a la comunidad.</p>
          <p>No hay una opción mejor que otra. Se trata de elegir la que mejor acompañe tu momento y tu manera de practicar.</p>
        </div>
      </section>

      <section className="bg-surface px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl">Tu camino puede empezar hoy.</h2>
          <div className="mt-5 space-y-3 text-muted">
            <p>Las inscripciones a Un camino con corazón están abiertas durante todo el mes. No necesitás esperar a una fecha determinada para comenzar.</p>
            <p>Cada suscripción tiene una duración de 30 días desde el momento de la inscripción y se renueva mensualmente. Los pagos se realizarán mediante Mercado Pago.</p>
          </div>
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

      <Frase tone="accent">{phrases[7]}</Frase>
    </>
  );
}
