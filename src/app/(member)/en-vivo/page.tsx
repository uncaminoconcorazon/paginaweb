import { ModulePlaceholder } from "@/components/ui/module-placeholder";
import { requireMember } from "@/lib/auth/session";

export const metadata = { title: "Clases en vivo" };

export default async function Page() {
  await requireMember();
  return <ModulePlaceholder title="Clases en vivo" phase="Fase 4" needs={["Proveedor de transmisión (Zoom, Meet u otro)","Política de cupos y cancelaciones"]} />;
}
