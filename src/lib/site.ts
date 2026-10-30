export const site = {
  name: "Un camino con corazón",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const publicNav = [
  { href: "/", label: "Inicio" },
  { href: "/planes", label: "La membresía" },
  { href: "/desafio", label: "Desafío gratuito" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/casa-corazon", label: "Casa Corazón" },
];

export const instagram = { handle: "@un.camino.con.corazon", href: "https://www.instagram.com/un.camino.con.corazon/" };

export const memberNav = [
  { href: "/inicio", label: "Inicio" },
  { href: "/clases", label: "Clases" },
  { href: "/en-vivo", label: "En vivo" },
  { href: "/calendario", label: "Calendario" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/audio", label: "Audio" },
];
