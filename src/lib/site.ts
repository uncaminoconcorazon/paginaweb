export const site = {
  name: "Un camino con corazón",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const publicNav = [
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/casa-corazon", label: "Casa Corazón" },
  { href: "/planes", label: "Comunidad" },
  { href: "/desafio", label: "Desafío gratis" },
  { href: "/tienda", label: "Tienda" },
];

export const memberNav = [
  { href: "/inicio", label: "Inicio" },
  { href: "/clases", label: "Clases" },
  { href: "/en-vivo", label: "En vivo" },
  { href: "/calendario", label: "Calendario" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/audio", label: "Audio" },
];
