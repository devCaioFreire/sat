import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProductProvider } from "@/context/salesList";
import { Metadata } from "next";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: 'Soft Clever - SAT',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const isHomePage = pathname === '/dashboard/home';

  return (
    <ProductProvider>
      <div className="flex h-[100vh] gap-8">
        <Navbar />
        <section className="flex-col justify-center items-center pt-8 w-[85%] h-full">
          <div className="w-[98%] h-[95%]">
            {children}
          </div>
          {!isHomePage && <Footer />}
        </section>
      </div>
    </ProductProvider>
  );
}
