/** Solo rutas internas: evita open-redirect vía ?next=. */
export function safeNext(next: string | null | undefined, fallback = "/inicio") {
  return next && next.startsWith("/") && !next.startsWith("//") && !next.includes("\\") ? next : fallback;
}
