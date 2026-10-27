import { MemberShell } from "@/components/layout/member-shell";
import { requireViewer } from "@/lib/auth/session";
import { can } from "@/lib/auth/roles";

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const viewer = await requireViewer();
  return (
    <MemberShell name={viewer.fullName ?? viewer.email ?? ""} isStaff={can.accessAdmin(viewer.role)}>
      {children}
    </MemberShell>
  );
}
