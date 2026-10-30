import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Frase } from "@/components/frase";
import { PlanCards } from "@/components/plan-cards";
import { castanedaQuote, challenge, homeHero as h, invitation, membership, phrases, wish } from "@/content/home";

const eyebrow = "text-[11px] uppercase tracking-[0.28em] text-muted";

export default function Home() {
  return (
    <>
      {/* Portada: la pregunta */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2 md:py-20">
        <div className="order-2 md:order-1">
          <p className={eyebrow}>Un camino con corazón</p>
          <h1 className="mt-4 text-5xl leading-[1.05] sm:text-7xl">{h.question}</h1>
          <p className="font-serif mt-5 text-2xl italic text-muted">{h.tagline}</p>
          <p className="mt-6 max-w-md text-lg text-muted">{h.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={h.primaryCta.href}>{h.primaryCta.label}</ButtonLink>
            <ButtonLink href={h.secondaryCta.href} variant="secondary">{h.secondaryCta.label}</ButtonLink>
          </div>
        </div>
        <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[2rem] md:order-2">
          <Image src="/brand/milu/retrato.webp" alt="Milu respirando con la mano sobre el rostro durante una práctica" fill priority sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
      </section>

      {/* Cita de Castaneda */}
      <section className="bg-surface px-4 py-20 md:py-28">
        <figure className="mx-auto max-w-3xl">
          <blockquote className="font-serif space-y-4 border-l-2 border-mauve pl-6 text-2xl italic leading-relaxed md:text-3xl">
            {castanedaQuote.text.map((t) => <p key={t}>{t}</p>)}
          </blockquote>
          <figcaption className="mt-6 pl-6 text-sm text-muted">— {castanedaQuote.author}</figcaption>
        </figure>
      </section>

      {/* La invitación */}
      <section className="mx-auto max-w-3xl px-4 py-20 md:py-28">
        <div className="space-y-5 text-lg text-muted">
          {invitation.map((t) => <p key={t}>{t}</p>)}
        </div>
        <p className="font-serif mt-10 text-3xl leading-snug md:text-4xl">{wish}</p>
        <p className="mt-6 text-lg">Bienvenidx a Un camino con corazón.</p>
      </section>

      <Frase tone="accent">{phrases[0]}</Frase>

      {/* Sobre mí */}
      <section className="bg-surface px-4 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src="/brand/milu/pose.webp" alt="Milu practicando una postura de equilibrio con una cinta" fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
          </div>
          <div>
            <p className={eyebrow}>Sobre mí</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Holi, soy Milu.</h2>
            <p className="mt-5 text-lg text-muted">Soy profesora de yoga, artista y una eterna curiosa de las formas que encontramos para expresarnos, conocernos y habitar este mundo.</p>
            <p className="font-serif mt-5 border-l-2 border-mauve pl-5 text-2xl italic">Me gusta pensar que estamos acá para aprender a escucharnos, descubrir qué nos hace bien y encontrar nuestro propio camino del corazón.</p>
            <div className="mt-6"><ButtonLink href="/sobre-mi" variant="secondary">Conocer mi historia</ButtonLink></div>
          </div>
        </div>
      </section>

      {/* La membresía */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <p className={eyebrow}>La membresía</p>
        <h2 className="mt-3 max-w-3xl text-4xl md:text-5xl">{membership.title}</h2>
        <div className="mt-6 max-w-2xl space-y-3 text-muted">
          {membership.intro.map((t) => <p key={t}>{t}</p>)}
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {membership.includes.map((i) => (
            <li key={i.title} className="rounded-3xl bg-surface p-6">
              <span className="text-sm text-muted">{i.letter}</span>
              <h3 className="mt-2 text-2xl">{i.title}</h3>
              <p className="mt-2 text-sm text-muted">{i.text}</p>
            </li>
          ))}
        </ul>
        <p className="font-serif mt-10 text-2xl italic">{membership.closing}</p>
        <div className="mt-6"><ButtonLink href="/planes">Conocé la membresía</ButtonLink></div>
      </section>

      {/* Planes */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <p className={eyebrow}>Planes de membresía</p>
        <h2 className="mt-3 max-w-xl text-4xl md:text-5xl">Tu camino puede empezar hoy.</h2>
        <p className="mt-3 max-w-xl text-muted">No hay una opción mejor que otra. Se trata de elegir la que mejor acompañe tu momento y tu manera de practicar.</p>
        <div className="mt-10"><PlanCards /></div>
      </section>

      <Frase tone="plain">{phrases[3]}</Frase>

      {/* Casa Corazón */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className={eyebrow}>Tapiales, Buenos Aires</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Casa Corazón</h2>
            <p className="font-serif mt-4 text-2xl italic">Una casa para volver al cuerpo. Un espacio para encontrarnos.</p>
            <p className="mt-4 text-muted">Mi espacio de yoga: un lugar íntimo, creado y cuidado con mucho amor, donde cada encuentro es una invitación a bajar el ritmo, escuchar el cuerpo y regalarnos un momento de presencia.</p>
            <div className="mt-6"><ButtonLink href="/casa-corazon" variant="secondary">Quiero conocer Casa Corazón</ButtonLink></div>
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

      <Frase tone="surface">{phrases[5]}</Frase>

      {/* Desafío gratuito: puerta de entrada */}
      <section className="bg-accent px-4 py-20 text-accent-foreground md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] opacity-80">{challenge.eyebrow}</p>
            <h2 className="mt-3 text-4xl md:text-5xl">{challenge.title}</h2>
            <p className="mt-5 max-w-xl text-lg opacity-90">{challenge.text[0]}</p>
            <p className="mt-3 max-w-xl opacity-90">{challenge.text[1]}</p>
            <ul className="mt-6 flex flex-wrap gap-2 text-sm">
              {challenge.how.map((c) => <li key={c} className="rounded-full border border-accent-foreground/40 px-4 py-2">{c}</li>)}
            </ul>
            <p className="font-serif mt-8 text-2xl italic">{challenge.closing}</p>
            <div className="mt-6"><a href="/desafio" className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent-foreground px-6 text-sm font-medium text-accent">{challenge.cta}</a></div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem]">
            <Image src="/brand/casa/brazos.webp" alt="Práctica de yoga con los brazos en alto" fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <Frase tone="surface">{phrases[12]}</Frase>
    </>
  );
}
