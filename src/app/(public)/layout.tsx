import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Ticker />
      <Footer />
    </>
  );
}
