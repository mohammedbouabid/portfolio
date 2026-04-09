import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import MobileBottomNav from "@/components/MobileBottomNav";
import { getProfile } from "@/lib/content";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();
  return (
    <>
      <SideNav email={profile.email} />
      <div className="pb-24 md:pb-0">{children}</div>
      <Ticker />
      <Footer />
      <MobileBottomNav />
    </>
  );
}
