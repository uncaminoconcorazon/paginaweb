import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import "@fontsource/open-sauce-one/300.css";
import "@fontsource/open-sauce-one/400.css";
import "@fontsource/open-sauce-one/500.css";
import "@fontsource/open-sauce-one/700.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · Yoga, bienestar y comunidad`, template: `%s · ${site.name}` },
  description: "Yoga, arte, alimentación consciente, meditación y escritura para encontrar tu propio camino y llevarlo a la vida cotidiana.",
};

// Sitio solo en modo claro: evita que el celular lo oscurezca automáticamente.
export const viewport: Viewport = { colorScheme: "only light", themeColor: "#f1ece6" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
