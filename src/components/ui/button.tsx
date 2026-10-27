import Link from "next/link";

const base =
  "inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition-colors disabled:opacity-50";
const variants = {
  primary: "bg-accent text-accent-foreground hover:bg-[#4b5334]",
  secondary: "border border-foreground/30 bg-transparent hover:bg-foreground/5",
  ghost: "hover:bg-border/50",
};
type Variant = keyof typeof variants;

export function ButtonLink({ href, variant = "primary", children }: { href: string; variant?: Variant; children: React.ReactNode }) {
  return <Link href={href} className={`${base} ${variants[variant]}`}>{children}</Link>;
}

export function Button({ variant = "primary", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
