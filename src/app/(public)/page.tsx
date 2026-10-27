import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { PlanCards } from "@/components/plan-cards";
import { homeHero as h, inside, needs, pillars } from "@/content/home";

const eyebrow = "text-[11px] uppercase tracking-[0.28em] text-muted";

export default function Home() {
  return (
    <>
      {/* 1 · La necesidad: lo primero que ve la persona */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2 md:py-20">
        <div className="order-2 md:order-1">
          <p className={eyebrow}>Un camino con corazón</p>
          <h1 className="mt-4 text-5xl leading-[1.05] sm:text-6xl">{h.title}</h1>
          <p className="mt-6 max-w-md text-lg text-muted">{h.subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={h.primaryCta.href}>{h.primaryCta.label}</ButtonLink>
            <ButtonLink href={h.secondaryCta.href} variant="secondary">{h.secondaryCta.label}</ButtonLink>
          </div>
        </div>
        <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[2rem] md:order-2">
          <Image src="/brand/milu/retrato.webp" alt="Milu respirando con la mano sobre el rostro durante una práctica" fill priority sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
      </section>

      {/* 2 · Comprensión: "esto habla de algo que estoy viviendo" */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className={eyebrow}>Quizás te suene</p>
          <h2 className="mt-3 max-w-2xl text-4xl">Algo de esto puede ser parte de tu día</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {needs.map((n, i) => (
              <li key={n.title} className="rounded-3xl border border-border bg-background p-6">
                <span className="text-sm text-muted">0{i + 1}</span>
                <h3 className="mt-3 text-xl">{n.title}</h3>
                <p className="mt-2 text-sm text-muted">{n.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-xl text-lg">Para todo eso hay lugar acá, a tu ritmo y sin apuro.</p>
        </div>
      </section>

      {/* 3 · Solución */}
      <section id="experiencia" className="mx-auto max-w-6xl px-4 py-20">
        <p className={eyebrow}>La propuesta</p>
        <h2 className="mt-3 max-w-2xl text-4xl">Yoga bajado a la tierra</h2>
        <p className="mt-4 max-w-2xl text-muted">No es solo movernos. De a poco, a través de las clases, de ejercicios puntuales de escritura, de meditaciones, recetas y consejos, llevamos la filosofía del yoga a la práctica diaria de tu vida.</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <li key={p.title} className="rounded-3xl bg-surface p-6">
              <span aria-hidden className={`block h-3 w-3 rounded-full ${p.color}`} />
              <h3 className="mt-4 text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 · Qué hay adentro */}
      <section className="bg-accent py-20 text-accent-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] opacity-80">Adentro de la comunidad</p>
            <h2 className="mt-3 text-4xl">Todo en un mismo lugar</h2>
            <p className="mt-4 max-w-sm opacity-90">Material que se renueva y propuestas nuevas cada mes, para que siempre haya algo para sumar a tu práctica.</p>
          </div>
          <ul className="space-y-3">
            {inside.map((t) => (
              <li key={t} className="flex gap-3 border-b border-accent-foreground/20 pb-3 text-[15px]">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />{t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 · Casa Corazón */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className={eyebrow}>El espacio</p>
            <h2 className="mt-3 text-4xl">Casa Corazón</h2>
            <p className="mt-4 text-muted">Un lugar de luz natural y madera, pensado para practicar con calma y encontrarnos.</p>
            <div className="mt-6"><ButtonLink href="/casa-corazon" variant="secondary">Conocer la casa</ButtonLink></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["almohadones", "meditacion", "cuenco"].map((n, i) => (
              <div key={n} className={`relative aspect-[3/4] overflow-hidden rounded-2xl ${i === 1 ? "translate-y-6" : ""}`}>
                <Image src={`/brand/casa/${n}.webp`} alt="" fill sizes="(min-width: 768px) 25vw, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Quién acompaña */}
      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[1fr_1.2fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src="/brand/milu/pose.webp" alt="Milu practicando una postura de equilibrio con una cinta" fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
          </div>
          <div>
            <p className={eyebrow}>Quién te acompaña</p>
            <h2 className="mt-3 text-4xl">Milu</h2>
            <blockquote className="mt-5 border-l-2 border-mauve pl-5 text-lg leading-relaxed">
              Quiero que las personas sientan paz al entrar, que se sientan contenidas e identificadas. Compartir desde mi experiencia y formación las herramientas que considero medicina: el yoga, la alimentación, la naturaleza y el arte, para construir un mundo interno más habitable y sincero.
            </blockquote>
            <div className="mt-6"><ButtonLink href="/sobre-mi" variant="secondary">Conocer más sobre mí</ButtonLink></div>
          </div>
        </div>
      </section>

      {/* 7 · Puerta de entrada gratuita */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className={eyebrow}>Para empezar sin compromiso</p>
        <h2 className="mt-3 text-4xl">15 días de yoga, gratis</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">Un desafío para encontrarte con tu cuerpo un ratito cada día, con meditaciones que te acompañan. Dejanos tu correo y te avisamos.</p>
        <div className="mt-7 flex justify-center"><ButtonLink href="/desafio">Sumarme al desafío</ButtonLink></div>
      </section>

      {/* 8 · Oferta */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <p className={eyebrow}>Membresía</p>
        <h2 className="mt-3 max-w-xl text-4xl">Elegí cómo acompañarte</h2>
        <div className="mt-10"><PlanCards /></div>
      </section>
    </>
  );
}
