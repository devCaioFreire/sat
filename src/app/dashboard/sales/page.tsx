'use client'
import { ProductContext } from "@/context/salesList";
import { formatCurrency } from "@/utils/formatter";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { Barcode } from "./components/barcode/barcode";
import CheckoutModal from "./components/checkout/checkoutModal";
import { CoupomModal } from "./components/coupomModal";
import CustomerModal from "./components/customer/customerModal";
import { DescriptionProduct } from "./components/descriptionProduct";
import { List } from "./components/list";
import { TotalValueSale } from "./components/totalValueSale";
import { ValueProduct } from "./components/valueProduct";

export default function Sales() {
  const pathname = usePathname();
  const isSalesPage = pathname === '/dashboard/sales';

  const { product, setProduct, selectedProductIndex, setSelectedProductIndex } = useContext(ProductContext);

  const [customerModalOpen, setCustomerModalOpen] = useState(true);
  const [coupomModalOpen, setCoupomModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeElementBeforeModal, setActiveElementBeforeModal] = useState<Element | null>(null);
  const [lastProductTotalValue, setLastProductTotalValue] = useState<number>(0);

  const [selectedProductDescription, setSelectedProductDescription] = useState("");
  const [totalValue, setTotalValue] = useState(0);

  const selectedProduct = product[selectedProductIndex];
  const totalValueIndex = parseFloat(selectedProduct?.vlrUnCom) * selectedProduct?.quantity || 0;

  const listRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setSaleModalOpen(true);
  };

  const closeModal = () => {
    setSaleModalOpen(false);
    setCustomerModalOpen(false);
    setCoupomModalOpen(false);
  };

  useEffect(() => {
    if (product.length > 0) {
      const lastProduct = product[product.length - 1];
      setLastProductTotalValue(parseFloat(lastProduct.vlrUnCom) * (lastProduct.quantity || 0));
    }

    // Função para lidar com as teclas "ArrowLeft" e "ArrowRight"
    const handleArrowKeys = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && listRef.current) {
        listRef.current.focus();
      } else if (event.key === "ArrowRight" && barcodeRef.current) {
        barcodeRef.current.focus();
      }
    };

    // Função para lidar com o evento de tecla "F4"
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "F4") {
        openModal();
      }
    };

    // Função para lidar com o evento de tecla "Escape" para fechar o modal
    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (!saleModalOpen && activeElementBeforeModal) {
      (activeElementBeforeModal as HTMLElement).focus();
    }

    // Adicionar event listeners
    document.addEventListener("keydown", handleArrowKeys);
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keydown", handleEscapeKeyPress);

    // Remover event listeners ao desmontar o componente
    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keydown", handleEscapeKeyPress);
    };

  }, [customerModalOpen, coupomModalOpen, selectedProductIndex, product, saleModalOpen, activeElementBeforeModal, formSubmitted]);

  const handleClearList = () => {
    setSelectedProductIndex(-1);
    setProduct([]);
    setTotalValue(0);
    setSelectedProductDescription("");
    setFormSubmitted(true);
    closeModal();
  };

  const handleOpenCoupomModal = () => {
    setCoupomModalOpen(true);
  };

  const handleOpenCustomerModal = () => {
    setCustomerModalOpen(true);
  };

  const handleFormSubmit = () => {
    setSelectedProductIndex(-1);
    setFormSubmitted(true);
    handleClearList();
    closeModal();
  };

  return (
    <>
      {customerModalOpen && (
        <div className="fixed z-40 inset-0 bg-opacity-50 bg-backgroundModal backdrop-blur-md">
          <CustomerModal
            isOpenCustomerModal={customerModalOpen}
            onCloseCustomerModal={closeModal}
            onFormSubmitCustomer={handleFormSubmit} />
        </div>
      )}

      {saleModalOpen && (
        <div className="fixed z-40 inset-0 bg-opacity-50 bg-backgroundModal backdrop-blur-md">
          <CheckoutModal
            isOpen={saleModalOpen}
            onClose={closeModal}
            onFormSubmit={handleFormSubmit}
            onOpenCoupomModal={handleOpenCoupomModal} />
        </div>
      )}

      {coupomModalOpen && (
        <div className="fixed z-40 inset-0 bg-opacity-50 bg-backgroundModal backdrop-blur-md">
          <CoupomModal
            isOpen={coupomModalOpen}
            onClose={closeModal}
            onOpenCoupomModal={handleOpenCoupomModal}
            onOpenCustomerModal={handleOpenCustomerModal} />
        </div>
      )}

      <main className="flex w-full gap-[2%] justify-between">
        <div className={`${isSalesPage ? 'w-[65%]' : 'w-[58%]'}`}>
          <div ref={saleModalOpen ? null : listRef} tabIndex={saleModalOpen ? undefined : 0}>
            <List />
          </div>
        </div>

        {/* Insert Product Fields */}
        <div className={`${isSalesPage ? 'grid w-[40%]' : 'grid w-[40%]'}`}>
          <div className="flex flex-col justify-between">
            <div className="h-[18%]" ref={saleModalOpen ? null : barcodeRef} tabIndex={saleModalOpen ? undefined : 0}>
              <Barcode />
            </div>

            {/* Grid Quantity and Value */}
            <div className="grid grid-cols-2 h-[18%] gap-6 default:gap-4 lg:gap-10">
              {/* Value */}
              <ValueProduct title="Valor Unitário" value={formatCurrency(parseFloat(selectedProduct ? selectedProduct?.vlrUnCom.toString() : '0'))} />
              <ValueProduct title="Valor Total" value={formatCurrency(totalValueIndex || 0)} />
            </div>

            {/* Total Value */}
            <TotalValueSale />

            {/* Product Name */}
            <DescriptionProduct selectedProduct={selectedProduct} />
          </div>
        </div>
      </main >
    </>
  );
}
