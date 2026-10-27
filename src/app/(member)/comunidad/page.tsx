import { ModulePlaceholder } from "@/components/ui/module-placeholder";
import { requireMember } from "@/lib/auth/session";

export const metadata = { title: "Comunidad" };

export default async function Page() {
  await requireMember();
  return <ModulePlaceholder title="Comunidad" phase="Fase 5" needs={["Normas comunitarias","Política de moderación"]} />;
}
