import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Soft Clever - SAT',
  description: 'Soft Clever - Informática',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  showFooter?: boolean;
}) {

  return (
    <div className="flex h-[100vh] gap-8">
      <Navbar />
      <section className="flex-col justify-center items-center pt-8 w-[85%] h-full">
        <div className="w-[95%] h-[95%]">
          {children}
        </div>
        <Footer />
      </section>
    </div>
  );
}
