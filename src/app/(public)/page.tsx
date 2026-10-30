import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Cinta } from "@/components/cinta";
import { FotoFrase } from "@/components/foto-frase";
import { PlanCards } from "@/components/plan-cards";
import { castanedaShort, challenge, cinta, homeHero as h, invitationShort, phrases, tiles, wish } from "@/content/home";

const eyebrow = "text-[11px] uppercase tracking-[0.28em] text-muted";

export default function Home() {
  return (
    <>
      {/* Portada: qué es, dicho con claridad */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2 md:py-20">
        <div className="order-2 md:order-1">
          <p className={eyebrow}>{h.eyebrow}</p>
          <h1 className="mt-4 text-5xl leading-[1.05] sm:text-7xl">{h.question}</h1>
          <p className="font-serif mt-5 text-2xl italic text-muted">{h.tagline}</p>
          <p className="mt-6 max-w-md text-lg">{h.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={h.primaryCta.href}>{h.primaryCta.label}</ButtonLink>
            <ButtonLink href={h.secondaryCta.href} variant="secondary">{h.secondaryCta.label}</ButtonLink>
          </div>
        </div>
        <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[2rem] md:order-2">
          <Image src="/brand/milu/retrato.webp" alt="Milu respirando con la mano sobre el rostro durante una práctica" fill priority sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
      </section>

      <Cinta items={cinta} />

      {/* Cita (extracto) */}
      <section className="bg-surface px-4 py-16 md:py-24">
        <figure className="mx-auto max-w-3xl">
          <blockquote className="font-serif space-y-3 border-l-2 border-mauve pl-6 text-2xl italic leading-relaxed md:text-3xl">
            {castanedaShort.text.map((t) => <p key={t}>{t}</p>)}
          </blockquote>
          <figcaption className="mt-5 pl-6 text-sm text-muted">— {castanedaShort.author}</figcaption>
        </figure>
      </section>

      {/* Invitación (breve) */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <div className="space-y-4 text-lg text-muted">
          {invitationShort.map((t) => <p key={t}>{t}</p>)}
        </div>
        <p className="font-serif mt-8 text-3xl leading-snug md:text-4xl">{wish}</p>
      </section>

      <FotoFrase src="/brand/casa/meditacion.webp" position="center 55%" alt="Meditación grupal en Casa Corazón">{phrases[0]}</FotoFrase>

      {/* Sobre mí */}
      <section className="bg-surface px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src="/brand/milu/pose.webp" alt="Milu practicando una postura de equilibrio con una cinta" fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
          </div>
          <div>
            <p className={eyebrow}>Sobre mí</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Holi, soy Milu.</h2>
            <p className="mt-5 text-lg text-muted">Profesora de yoga y artista. Comparto el yoga junto al arte, la escritura y la alimentación, para llevarlo a la vida cotidiana.</p>
            <div className="mt-6"><ButtonLink href="/sobre-mi" variant="secondary">Conocer mi historia</ButtonLink></div>
          </div>
        </div>
      </section>

      {/* La membresía, en fotos */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className={eyebrow}>La membresía</p>
        <h2 className="mt-3 max-w-3xl text-4xl md:text-5xl">Una membresía de yoga online para practicar a tu manera.</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">Elegí tu ritmo. Encontrá tu práctica. Compartí el camino.</p>
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
          {tiles.map((t) => (
            <li key={t.title} className="relative isolate flex aspect-[3/4] items-end overflow-hidden rounded-3xl bg-olive p-4 md:aspect-[4/5] md:p-6">
              {t.img && <Image src={t.img} alt="" fill sizes="(min-width: 768px) 33vw, 50vw" className="-z-10 object-cover" style={{ objectPosition: t.pos }} />}
              <div aria-hidden className={`absolute inset-0 -z-10 ${t.img ? "bg-gradient-to-t from-[#2b3322]/85 via-[#2b3322]/10 to-transparent" : "bg-orange/90"}`} />
              <div className={t.img ? "text-[#f6ebd8]" : "text-foreground"}>
                <h3 className="text-2xl md:text-3xl">{t.title}</h3>
                <p className="mt-1 text-sm opacity-90">{t.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8"><ButtonLink href="/planes" variant="secondary">Ver todo lo que incluye</ButtonLink></div>
      </section>

      {/* Planes */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
        <p className={eyebrow}>Planes</p>
        <h2 className="mt-3 max-w-xl text-4xl md:text-5xl">Tu camino puede empezar hoy.</h2>
        <div className="mt-10"><PlanCards /></div>
      </section>

      <FotoFrase src="/brand/casa/patio.webp" position="center 45%" alt="El patio de Casa Corazón">{phrases[3]}</FotoFrase>

      {/* Casa Corazón */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr]">
          {["sala", "cuenco", "almohadones"].map((n, i) => (
            <div key={n} className={`relative aspect-[3/4] overflow-hidden rounded-3xl ${i === 1 ? "md:translate-y-8" : ""}`}>
              <Image src={`/brand/casa/${n}.webp`} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-16 max-w-2xl">
          <p className={eyebrow}>Tapiales, Buenos Aires</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Casa Corazón</h2>
          <p className="font-serif mt-3 text-2xl italic">Una casa para volver al cuerpo. Un espacio para encontrarnos.</p>
          <div className="mt-6"><ButtonLink href="/casa-corazon" variant="secondary">Quiero conocer Casa Corazón</ButtonLink></div>
        </div>
      </section>

      {/* Desafío gratuito */}
      <section className="relative isolate overflow-hidden px-4 py-20 text-[#f6ebd8] md:py-28">
        <Image src="/brand/casa/brazos.webp" alt="" fill sizes="100vw" className="-z-10 object-cover" style={{ objectPosition: "center 25%" }} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[#2b3322]/75" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] opacity-80">{challenge.eyebrow}</p>
          <h2 className="mt-3 text-4xl md:text-6xl">{challenge.title}</h2>
          <ul className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            {challenge.how.map((c) => <li key={c} className="rounded-full border border-[#f6ebd8]/50 px-4 py-2">{c}</li>)}
          </ul>
          <p className="font-serif mt-8 text-2xl italic md:text-3xl">{challenge.closing}</p>
          <div className="mt-8"><a href="/desafio" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f6ebd8] px-6 text-sm font-medium text-[#2b3322]">{challenge.cta}</a></div>
        </div>
      </section>

      <FotoFrase src="/brand/casa/almohadones.webp" position="center 60%" alt="Bolsters y almohadones sobre las colchonetas">{phrases[12]}</FotoFrase>
    </>
  );
}
