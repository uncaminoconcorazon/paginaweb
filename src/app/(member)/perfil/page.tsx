import { ModulePlaceholder } from "@/components/ui/module-placeholder";
import { requireViewer } from "@/lib/auth/session";

export const metadata = { title: "Perfil" };

export default async function Page() {
  await requireViewer();
  return <ModulePlaceholder title="Perfil" phase="Fase 2 (parcial)" needs={["Edición de datos personales, zona horaria y cambio de contraseña"]} />;
}
