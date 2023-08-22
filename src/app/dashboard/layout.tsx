'use client'
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/context/authContext";
import { CoupomProvider } from "@/context/cancelCoupom";
import { CustomerProvider } from "@/context/customerData";
import { ProductProvider } from "@/context/salesList";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const isHomePage = pathname === '/dashboard/sales';

  return (
    <AuthProvider>
      <ProductProvider>
        <CustomerProvider>
          <CoupomProvider>
            <div className="flex h-[100vh] gap-8">
              <Navbar />
              <section className="flex-col justify-center items-center pt-8 w-[85%] h-full">
                <div className="w-[98%] h-[95%]">
                  {children}
                </div>
                {isHomePage && <Footer />}
              </section>
            </div>
          </CoupomProvider>
        </CustomerProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
