import { ModulePlaceholder } from "@/components/ui/module-placeholder";
import { requireMember } from "@/lib/auth/session";

export const metadata = { title: "Audio" };

export default async function Page() {
  await requireMember();
  return <ModulePlaceholder title="Audio" phase="Fase 5" needs={["Biblioteca de audio y almacenamiento","Series y categorías"]} />;
}
