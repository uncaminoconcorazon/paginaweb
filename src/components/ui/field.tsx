export function Field({ label, name, type = "text", autoComplete, required = true }: {
  label: string; name: string; type?: string; autoComplete?: string; required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      <input name={name} type={type} autoComplete={autoComplete} required={required}
        className="min-h-11 w-full rounded-lg border border-border bg-surface px-3" />
    </label>
  );
}
