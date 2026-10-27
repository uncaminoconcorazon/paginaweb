import Link from "next/link";
import { AuthForm } from "@/components/ui/auth-form";
import { Field } from "@/components/ui/field";
import { requestPasswordReset } from "@/app/auth/actions";

export const metadata = { title: "Recuperar contraseña" };

export default function Page() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Recuperar contraseña</h1>
      <AuthForm action={requestPasswordReset} submitLabel="Enviar enlace">
        <Field label="Email" name="email" type="email" autoComplete="email" />
      </AuthForm>
      <p className="mt-6 text-sm"><Link href="/ingresar" className="underline">Volver</Link></p>
    </>
  );
}
