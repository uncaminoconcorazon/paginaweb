"use client";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import type { FormState } from "@/app/auth/actions";

export function AuthForm({ action, submitLabel, children }: {
  action: (s: FormState, f: FormData) => Promise<FormState>; submitLabel: string; children: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form action={formAction} className="space-y-4">
      {children}
      {state?.error && <p role="alert" className="text-sm text-danger">{state.error}</p>}
      {state?.ok && <p role="status" className="text-sm text-accent">{state.ok}</p>}
      <Button type="submit" disabled={pending} className="w-full">{pending ? "Enviando…" : submitLabel}</Button>
    </form>
  );
}
