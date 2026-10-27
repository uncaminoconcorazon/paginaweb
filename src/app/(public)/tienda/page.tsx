import { ModulePlaceholder } from "@/components/ui/module-placeholder";

export const metadata = { title: "Tienda" };

export default function Page() {
  return <ModulePlaceholder title="Tienda" phase="Fase 5" needs={["Catálogo, moneda y proveedor de pagos","Política de envíos (productos físicos)"]} />;
}
