import { ModulePlaceholder } from "@/components/ui/module-placeholder";
import { requireViewer } from "@/lib/auth/session";

export const metadata = { title: "Mi membresía" };

export default async function Page() {
  await requireViewer();
  return <ModulePlaceholder title="Mi membresía" phase="Fase 4" needs={["Proveedor de pagos","Planes y precios confirmados","Política de cancelación y reembolsos"]} />;
}
