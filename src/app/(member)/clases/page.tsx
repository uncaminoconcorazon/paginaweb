import { ModulePlaceholder } from "@/components/ui/module-placeholder";
import { requireMember } from "@/lib/auth/session";

export const metadata = { title: "Clases grabadas" };

export default async function Page() {
  await requireMember();
  return <ModulePlaceholder title="Clases grabadas" phase="Fase 4" needs={["Proveedor de video privado","Catálogo de clases y categorías","Criterios de niveles y objetivos"]} />;
}
