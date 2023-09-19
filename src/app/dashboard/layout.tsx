'use client'
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/context/authContext";
import { CoupomProvider } from "@/context/cancelCoupom";
import { CustomerProvider } from "@/context/customerData";
import { SalesOrderProvider } from "@/context/orderContext";
import { AllProductProvider } from "@/context/productContext";
import { ProductProvider } from "@/context/salesList";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const isSalesPage = pathname === '/dashboard/sales';

  return (
    <AuthProvider>
      <ProductProvider>
        <SalesOrderProvider>
          <CustomerProvider>
            <AllProductProvider>
              <CoupomProvider>
                <div className="flex h-[100vh] gap-8">
                  <Navbar />
                  <section className={`${isSalesPage ? 'flex-col justify-center items-center pt-8 w-[98%] h-full' : 'flex-col justify-center items-center pt-8 w-[85%] h-full'}`}>
                    <div className="w-[98%] h-[95%]">
                      {children}
                    </div>
                    {isSalesPage && <Footer />}
                  </section>
                </div>
              </CoupomProvider>
            </AllProductProvider>
          </CustomerProvider>
        </SalesOrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
