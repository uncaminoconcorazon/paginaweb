import { requireViewer } from "@/lib/auth/session";
import { ButtonLink } from "@/components/ui/button";

export const metadata = { title: "Inicio" };

export default async function Page() {
  const v = await requireViewer();
  return (
    <section>
      <h1 className="text-3xl font-semibold">Hola{v.fullName ? `, ${v.fullName.split(" ")[0]}` : ""}</h1>
      {v.isMember ? (
        <p className="mt-4 text-muted">Tu membresía está activa. Próximas clases, favoritos y novedades aparecerán acá a medida que se habiliten los módulos.</p>
      ) : (
        <div className="mt-4 space-y-4">
          <p className="text-muted">Tu cuenta está creada. Para acceder al contenido de la comunidad necesitás una membresía activa.</p>
          <ButtonLink href="/planes">Ver membresías</ButtonLink>
        </div>
      )}
    </section>
  );
}
