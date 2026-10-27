import { ModulePlaceholder } from "@/components/ui/module-placeholder";

export const metadata = { title: "Administración" };

export default function Page() {
  return <ModulePlaceholder title="Panel de administración" phase="Fases 2–5"
    needs={["Gestión de usuarios y roles", "Planes y membresías", "Contenido, eventos y moderación (por módulo)"]} />;
}
