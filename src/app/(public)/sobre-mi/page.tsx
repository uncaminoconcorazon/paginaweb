import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Frase } from "@/components/frase";
import { phrases } from "@/content/home";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Holi, soy Milu. Profesora de yoga, artista y una eterna curiosa de las formas que encontramos para expresarnos, conocernos y habitar este mundo.",
};

const eyebrow = "text-[11px] uppercase tracking-[0.28em] text-muted";

const story = [
  "Soy profesora de yoga, artista y una eterna curiosa de las formas que encontramos para expresarnos, conocernos y habitar este mundo.",
  "Desde muy chica, el arte ocupa un lugar fundamental en mi vida. Comencé a estudiar canto, teatro y comedia musical, y hoy estoy a punto de terminar la carrera de Actuación en la Universidad Nacional de las Artes.",
  "El arte siempre fue para mí una manera de explorar lo invisible, de poner el cuerpo, de jugar, de transformar lo que sentimos y de descubrir nuevas formas de mirar la realidad.",
  "Con el tiempo, el yoga llegó a mi vida y abrió otra puerta. Me formé como profesora de Hatha Yoga y Yoga Terapéutico, y encontré en esta práctica un espacio para escuchar el cuerpo, observar la mente y cultivar una relación más amorosa conmigo misma.",
  "También me apasiona la escritura. Me gusta escribir poesía, explorar la escritura creativa y descubrir cómo, a veces, las palabras pueden ayudarnos a darle forma a aquello que todavía no sabemos nombrar.",
  "Durante cinco años formé parte de un proyecto de alimentación natural y vegana, una experiencia que me permitió acompañar a otras personas desde otra dimensión del cuidado: la alimentación.",
  "Todas estas búsquedas, que durante mucho tiempo parecían caminos separados, empezaron a encontrarse.",
];

const vision = [
  "Hoy me dedico a compartir el yoga, pero no puedo pensarlo separado del arte, de la alimentación, de la naturaleza ni de la manera en que elegimos vivir nuestros días.",
  "Creo que hay muchas formas de encontrar medicina en nosotrxs. A veces aparece en una postura de yoga; otras, en una comida preparada con amor, en una canción, en una página escrita a mano, en una conversación sincera o en un rato de silencio.",
  "Me interesa explorar cómo esas experiencias pueden ayudarnos a construir una vida más conectada con nuestra esencia. No una vida perfecta. No una versión ideal de nosotrxs. Una vida que se sienta más propia.",
  "Por eso nace Un camino con corazón: como un espacio desde el cual compartir las prácticas, las preguntas y las herramientas que a mí también me acompañan en esta búsqueda.",
  "Mi intención no es enseñarte a vivir, sino acercarte experiencias que puedan inspirarte a descubrir tu propia manera de hacerlo.",
  "Que lo que suceda durante una práctica pueda acompañarte después, cuando estés cocinando, caminando, trabajando, descansando o encontrándote con otras personas. Que el yoga deje de ser solamente algo que hacemos sobre un mat y se convierta, de a poquito, en una forma de estar presentes en la vida.",
];

export default function SobreMi() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2 md:py-20">
        <div className="order-2 md:order-1">
          <p className={eyebrow}>Sobre mí</p>
          <h1 className="mt-4 text-6xl leading-[1.05] sm:text-7xl">Holi, soy Milu.</h1>
          <p className="mt-6 max-w-md text-lg text-muted">{story[0]}</p>
        </div>
        <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[2rem] md:order-2">
          <Image src="/brand/milu/pose.webp" alt="Milu practicando una postura de equilibrio con una cinta" fill priority sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-5 px-4 pb-20 text-lg text-muted">
        {story.slice(1).map((t) => <p key={t}>{t}</p>)}
      </section>

      <Frase tone="surface">{phrases[1]}</Frase>

      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-20 md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5 text-lg text-muted">
          {vision.map((t) => <p key={t}>{t}</p>)}
          <p className="font-serif text-3xl italic text-foreground">Me gusta pensar que estamos acá para aprender a escucharnos, descubrir qué nos hace bien y encontrar nuestro propio camino del corazón.</p>
          <p>Si algo de todo esto resuena con vos, me alegra que nos hayamos encontrado.</p>
          <p>Bienvenidx a este espacio.</p>
          <p className="font-serif text-2xl text-foreground">Con amor, Milu.</p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
          <Image src="/brand/milu/retrato.webp" alt="Milu respirando con la mano sobre el rostro durante una práctica" fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="bg-surface px-4 py-20 text-center">
        <h2 className="text-4xl">Practiquemos juntxs</h2>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/planes">Conocé la membresía</ButtonLink>
          <ButtonLink href="/desafio" variant="secondary">Empezá con el desafío gratuito</ButtonLink>
        </div>
      </section>
    </>
  );
}
