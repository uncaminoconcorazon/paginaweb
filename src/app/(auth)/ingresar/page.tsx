import Link from "next/link";
import { AuthForm } from "@/components/ui/auth-form";
import { Field } from "@/components/ui/field";
import { signIn } from "@/app/auth/actions";

export const metadata = { title: "Ingresar" };

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Ingresar</h1>
      {error === "config" && <p className="mb-4 text-sm text-danger">El servicio de cuentas aún no está configurado.</p>}
      {error === "callback" && <p className="mb-4 text-sm text-danger">El enlace venció o no es válido.</p>}
      <AuthForm action={signIn} submitLabel="Ingresar">
        <input type="hidden" name="next" value={next ?? ""} />
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field label="Contraseña" name="password" type="password" autoComplete="current-password" />
      </AuthForm>
      <p className="mt-6 text-sm text-muted">
        <Link href="/recuperar" className="underline">Olvidé mi contraseña</Link> · <Link href="/registro" className="underline">Crear cuenta</Link>
      </p>
    </>
  );
}
