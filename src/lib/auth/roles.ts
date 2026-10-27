export type AppRole = "user" | "instructor" | "moderator" | "admin";

/** Rol de plataforma almacenado en profiles.role. "Miembro activo" se deriva de la suscripción, no del rol. */
export const STAFF_ROLES: AppRole[] = ["instructor", "moderator", "admin"];

export const can = {
  accessAdmin: (r: AppRole) => STAFF_ROLES.includes(r),
  manageUsers: (r: AppRole) => r === "admin",
  managePlans: (r: AppRole) => r === "admin",
  manageContent: (r: AppRole) => r === "admin" || r === "instructor",
  moderate: (r: AppRole) => r === "admin" || r === "moderator",
};
