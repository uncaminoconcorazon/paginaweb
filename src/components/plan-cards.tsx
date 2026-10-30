import { createClient } from "@/lib/supabase/server";
import { ButtonLink } from "@/components/ui/button";

type Plan = { id: string; slug: string; name: string; description: string | null; features: string[]; price_cents: number | null; currency: string | null };

async function loadPlans(): Promise<Plan[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
    const supabase = await createClient();
    const { data } = await supabase.from("plans").select("id, slug, name, description, features, price_cents, currency").eq("is_active", true).order("sort_order");
    return data ?? [];
  } catch { return []; }
}

const price = (p: Plan) =>
  p.price_cents != null && p.currency
    ? `${new Intl.NumberFormat("es-AR", { style: "currency", currency: p.currency, maximumFractionDigits: 0 }).format(p.price_cents / 100)} ARS por mes`
    : "Precio a confirmar";

const cta: Record<string, string> = { esencial: "Quiero sumarme", "con-encuentros-en-vivo": "Quiero practicar en vivo" };

export async function PlanCards() {
  const plans = await loadPlans();
  if (plans.length === 0) return <p className="text-muted">Los planes se publicarán próximamente.</p>;
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {plans.map((p, i) => (
        <li key={p.id} className={`flex flex-col rounded-3xl border p-7 ${i === plans.length - 1 ? "border-accent bg-surface" : "border-border bg-background"}`}>
          <h3 className="text-3xl">{p.name}</h3>
          <p className="mt-2 text-sm text-muted">{p.description}</p>
          <p className="mt-5 text-2xl font-medium">{price(p)}</p>
          <ul className="mt-5 space-y-2 text-sm">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-olive" />{f}</li>
            ))}
          </ul>
          <div className="mt-6"><ButtonLink href="/registro">{cta[p.slug] ?? "Quiero sumarme"}</ButtonLink></div>
          <p className="mt-3 text-xs text-muted">El pago con Mercado Pago se habilitará muy pronto.</p>
        </li>
      ))}
    </ul>
  );
}
