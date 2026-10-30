"use client";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { joinChallenge } from "./actions";

export function LeadForm() {
  const [state, action, pending] = useActionState(joinChallenge, undefined);
  return (
    <form action={action} className="space-y-4">
      <Field label="Tu nombre" name="fullName" autoComplete="given-name" required={false} />
      <Field label="Tu email" name="email" type="email" autoComplete="email" />
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {state?.error && <p role="alert" className="text-sm text-danger">{state.error}</p>}
      {state?.ok && <p role="status" className="text-sm text-accent">{state.ok}</p>}
      <Button type="submit" disabled={pending} className="w-full">{pending ? "Enviando…" : "Quiero hacer el desafío gratis"}</Button>
    </form>
  );
}
