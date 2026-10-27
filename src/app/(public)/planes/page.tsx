import type { Metadata } from "next";
import { PlanCards } from "@/components/plan-cards";

export const metadata: Metadata = { title: "Membresía" };

export default function PlanesPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-4xl">Elegí cómo acompañarte</h1>
      <p className="mt-3 max-w-xl text-muted">Acceso a muchas prácticas por el valor de unas pocas clases en una escuela. Con material nuevo cada mes.</p>
      <div className="mt-10"><PlanCards /></div>
    </section>
  );
}
