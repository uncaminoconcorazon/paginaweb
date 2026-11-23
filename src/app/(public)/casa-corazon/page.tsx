import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Fila } from "@/components/fila";
import { FotoFrase } from "@/components/foto-frase";
import { instagram, opinionesGoogle, whatsapp } from "@/lib/site";
import { abonos, abonosNota, acuerdos, acuerdosCierre, acuerdosIntro, avisosAbonos, claseSuelta, grilla, grillaIntro } from "@/content/casa-corazon";

export const metadata: Metadata = {
  title: "Clases presenciales en Casa Corazón",
  description: "Casa Corazón es mi espacio de yoga en Tapiales. Clases presenciales en grupos reducidos. Una casa para volver al cuerpo, un espacio para encontrarnos.",
};

const eyebrow = "text-[11px] uppercase tracking-[0.28em] text-muted";

const galeria = [
  ["clase", "Clase en grupo reducido"], ["perro", "Perro boca abajo sobre la colchoneta"], ["estiramiento", "Estiramiento grupal con cintas"], ["flexion", "Flexión hacia adelante con tacos"],
  ["equilibrio", "Postura de equilibrio en la sala"], ["manos", "Manos en oración junto a un taco"], ["bloques", "Tacos de madera y colchonetas"], ["almohadones", "Bolsters y almohadones sobre las colchonetas"],
] as const;

const pilares = [
  ["Grupos reducidos", "Para acompañar de cerca a cada persona."],
  ["Clases semipersonalizadas", "Propuestas que respetan tus posibilidades."],
  ["Venís como sos", "No hace falta llegar sabiendo, pudiendo ni demostrando nada."],
];

const Chips = ({ items }: { items: string[] }) => (
  <ul className="mt-5 flex flex-wrap gap-2 text-sm">
    {items.map((c) => <li key={c} className="rounded-full border border-foreground/30 px-4 py-2">{c}</li>)}
  </ul>
);

export default function CasaCorazon() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <p className={eyebrow}>Clases presenciales · Tapiales, Buenos Aires</p>
        <h1 className="mt-3 text-6xl md:text-7xl">Casa Corazón</h1>
        <p className="font-serif mt-4 text-3xl italic">Una casa para volver al cuerpo. Un espacio para encontrarnos.</p>
        <p className="mt-6 text-lg text-muted">Casa Corazón es mi espacio de yoga en Tapiales. Un lugar íntimo, creado y cuidado con mucho amor, donde cada encuentro es una invitación a bajar el ritmo, escuchar el cuerpo y regalarnos un momento de presencia.</p>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-3 md:grid-cols-3">
          {[["puerta", "Entrada de Casa Corazón"], ["sala", "La sala con bolsters y tacos de madera"], ["patio", "El patio de la casa"]].map(([n, alt], i) => (
            <div key={n} className={`relative aspect-[3/4] overflow-hidden rounded-3xl ${i === 1 ? "md:translate-y-8" : ""}`}>
              <Image src={`/brand/casa/${n}.webp`} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Tres ideas en tarjetas, no en un bloque de texto */}
      <section className="mx-auto max-w-6xl px-4 pb-4 pt-28">
        <ul className="grid gap-4 md:grid-cols-3">
          {pilares.map(([t, d], i) => (
            <li key={t} className={`rounded-3xl p-7 ${i === 1 ? "bg-accent text-accent-foreground" : "bg-surface"}`}>
              <span className="text-sm opacity-70">0{i + 1}</span>
              <h2 className="mt-3 text-3xl">{t}</h2>
              <p className="mt-2 text-sm opacity-90">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <Fila src="/brand/casa/almohadones.webp" position="center 60%" alt="Bolsters y almohadones sobre las colchonetas">
        <p className={eyebrow}>Los elementos</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Apoyos para cada cuerpo.</h2>
        <p className="mt-4 text-lg text-muted">Explorar las posturas con comodidad y adaptar la práctica a cada persona.</p>
        <Chips items={["Tacos", "Bolsters", "Cinturones"]} />
      </Fila>

      <Fila src="/brand/casa/perro.webp" position="center 40%" alt="Perro boca abajo sobre la colchoneta" invertir tone="surface">
        <p className={eyebrow}>Las propuestas</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Fuerza, movilidad, estabilidad y conciencia corporal.</h2>
        <Chips items={["Hatha Yoga", "Yoga suave", "Yoga terapéutico", "Y otras propuestas"]} />
      </Fila>

      <FotoFrase src="/brand/casa/manos.webp" position="center 40%" alt="Manos en oración junto a un taco de madera">No creo en una única forma correcta de practicar yoga.</FotoFrase>

      <section className="px-4 py-24 text-center">
        <p className="font-serif mx-auto max-w-3xl text-4xl leading-tight md:text-6xl">Cada cuerpo tiene su historia,<br />sus tiempos<br />y sus necesidades.</p>
      </section>

      {/* Galería prolija: grilla pareja, mismas proporciones */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {galeria.map(([n, alt]) => (
            <li key={n} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src={`/brand/casa/${n}.webp`} alt={alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </section>

      {/* Grilla de clases */}
      <section id="grilla" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-24">
        <p className={eyebrow}>Grilla de clases</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Horarios en Casa Corazón</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">{grillaIntro}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {grilla.map(({ dia, clases }) => (
            <article key={dia} className="rounded-3xl bg-surface p-7">
              <h3 className="font-serif text-3xl">{dia}</h3>
              <ul className="mt-4 divide-y divide-border">
                {clases.map((c) => (
                  <li key={c.hora + c.nombre} className="flex items-center gap-3 py-3">
                    <span className="w-16 shrink-0 font-medium text-accent">{c.hora}<span className="ml-0.5 text-[11px] uppercase">hs</span></span>
                    <span>{c.nombre}</span>
                    {c.nuevo && <span className="ml-auto shrink-0 rounded-full bg-mauve px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em]">Nuevo</span>}
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <article className="flex flex-col justify-between rounded-3xl bg-accent p-7 text-accent-foreground">
            <div>
              <h3 className="font-serif text-3xl">Grupos reducidos</h3>
              <p className="mt-3 opacity-90">Máximo 5 personas. Las clases requieren reserva previa.</p>
            </div>
            <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center self-start rounded-full border border-accent-foreground/50 px-6 text-sm font-medium transition-colors hover:bg-accent-foreground/10">Reservar por WhatsApp</a>
          </article>
        </div>
      </section>

      {/* Abonos */}
      <section id="abonos" className="scroll-mt-20 bg-surface px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <p className={eyebrow}>Abonos</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Abonos mensuales</h2>
          <p className="mt-4 text-lg text-muted">{abonosNota}</p>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {abonos.map((a) => (
              <li key={a.veces} className="rounded-3xl bg-background p-7">
                <p className="text-6xl font-medium text-mauve">{a.veces}</p>
                <p className="mt-1 text-lg">{a.frecuencia}</p>
                <p className="mt-5 text-3xl font-medium">{a.precio}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 rounded-3xl border border-mauve p-7">
            <div>
              <p className={eyebrow}>Clase suelta</p>
              <p className="mt-2 text-lg">{claseSuelta.etiqueta}</p>
            </div>
            <p className="text-3xl font-medium">{claseSuelta.precio}</p>
          </div>
          <ul className="mt-8 space-y-2 text-muted">
            {avisosAbonos.map((t) => <li key={t} className="flex gap-3"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-mauve" />{t}</li>)}
          </ul>
        </div>
      </section>

      {/* Acuerdos del espacio */}
      <section id="acuerdos" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24">
        <p className={eyebrow}>Acuerdos del espacio</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Cuidar este espacio entre todos</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">{acuerdosIntro}</p>
        <ol className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {acuerdos.map((a, i) => (
            <li key={a.titulo} className="flex gap-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-mauve font-medium">{i + 1}</span>
              <div>
                <h3 className="font-sans text-sm font-medium uppercase tracking-[0.14em] text-accent">{a.titulo}</h3>
                {a.texto.map((p) => <p key={p} className="mt-2">{p}</p>)}
              </div>
            </li>
          ))}
        </ol>
        <p className="font-serif mt-12 max-w-3xl text-2xl italic text-accent md:text-3xl">{acuerdosCierre}</p>
      </section>

      <section className="bg-surface px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl">Ubicación</h2>
          <p className="mt-3 text-lg">Humahuaca 377, Tapiales, Buenos Aires.</p>
          <p className="mt-3 text-sm text-muted">Para reservar tu lugar o hacer consultas, escribime por WhatsApp ({whatsapp.numero}) o por Instagram.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="https://www.google.com/maps/search/?api=1&query=Humahuaca+377+Tapiales">Cómo llegar</ButtonLink>
            <ButtonLink href={whatsapp.href} variant="secondary">Escribime por WhatsApp</ButtonLink>
            <ButtonLink href={instagram.href} variant="secondary">Instagram</ButtonLink>
            <ButtonLink href={opinionesGoogle.href} variant="secondary">Ver opiniones en Google</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
