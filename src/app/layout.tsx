import type { Metadata } from "next";
import { site } from "@/lib/site";
import "@fontsource/open-sauce-one/300.css";
import "@fontsource/open-sauce-one/400.css";
import "@fontsource/open-sauce-one/500.css";
import "@fontsource/open-sauce-one/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · Yoga, bienestar y comunidad`, template: `%s · ${site.name}` },
  description: "Yoga bajado a la tierra: clases, meditaciones, alimentación, arte y una comunidad para volver a vos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
