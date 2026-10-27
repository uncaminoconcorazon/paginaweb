import Link from "next/link";
import { AuthForm } from "@/components/ui/auth-form";
import { Field } from "@/components/ui/field";
import { signUp } from "@/app/auth/actions";

export const metadata = { title: "Crear cuenta" };

export default function Page() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Crear cuenta</h1>
      <AuthForm action={signUp} submitLabel="Crear cuenta">
        <Field label="Nombre" name="fullName" autoComplete="name" />
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field label="Contraseña" name="password" type="password" autoComplete="new-password" />
      </AuthForm>
      <p className="mt-6 text-sm text-muted">¿Ya tenés cuenta? <Link href="/ingresar" className="underline">Ingresar</Link></p>
    </>
  );
}
