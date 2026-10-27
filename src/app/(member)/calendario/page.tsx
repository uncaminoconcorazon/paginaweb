import { ModulePlaceholder } from "@/components/ui/module-placeholder";
import { requireMember } from "@/lib/auth/session";

export const metadata = { title: "Calendario" };

export default async function Page() {
  await requireMember();
  return <ModulePlaceholder title="Calendario" phase="Fase 4" needs={["Zona horaria principal","Tipos de actividad y reglas de reserva"]} />;
}
