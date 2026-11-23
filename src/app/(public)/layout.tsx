import { PublicFooter } from "@/components/layout/public-footer";
import { PublicHeader } from "@/components/layout/public-header";
import { WhatsappFlotante } from "@/components/whatsapp-flotante";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (<><PublicHeader /><main>{children}</main><PublicFooter /><WhatsappFlotante /></>);
}
