'use client';
import { SalesOrderProps, useOrderContext } from "@/context/orderContext";
import UseOrdersReport, { ProductsReportRef } from "@/hooks/useOrdersReport";
import React, { useEffect, useState } from "react";

interface CoupomModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const PrintOrderModal = ({ isOpen, onClose }: CoupomModalProps) => {
  const [productsToPrint, setProductsToPrint] = useState<SalesOrderProps[]>([]);
  const [cupomVisible, setCupomVisible] = useState(true);
  const ordersReportRef = React.useRef<ProductsReportRef>(null);
  const { fetchAllProductsForPrint, filterArray } = useOrderContext()

  async function loadProducts() {
    const allProducts = await fetchAllProductsForPrint(filterArray);
    setProductsToPrint(allProducts);
  }

  useEffect(() => {
    if (isOpen) {
      loadProducts();
    }
  }, [isOpen, fetchAllProductsForPrint, filterArray]);

  function handleClose() {
    onClose?.();
  }

  async function handlePrint() {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      const iframeWindow = iframe.contentWindow;
      iframeWindow?.print();
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed z-50 inset-0 bg-opacity-50 bg-backgroundModal backdrop-blur-md`}>
      <div className="modalContent absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl flex flex-col w-[32%] h-[83%] gap-4 border border-border rounded-2xl bg-background">
        {/* Header */}
        <div className='absolute flex items-center justify-center top-0 h-16 w-full rounded-t-2xl bg-backgroundSecundary'>
          <h1 className='text-xl font-medium'>Relatório de Produtos</h1>
        </div>

        <div className="flex w-full h-full mt-2">
          {cupomVisible && <UseOrdersReport ref={ordersReportRef} itens={productsToPrint} />}
        </div>
        <div className="flex gap-4">
          <button
            tabIndex={0}
            onClick={handleClose}
            className='fixed left-0 bottom-0 flex w-1/2 justify-center items-center rounded-bl-2xl py-4 transition-all bg-backgroundFields hover:bg-zinc-700'>
            Sair
          </button>
          <button
            tabIndex={1}
            onClick={handlePrint}
            className='fixed right-0 bottom-0 flex w-1/2 justify-center items-center rounded-br-2xl py-4 transition-all bg-indigo-700 hover:bg-indigo-600'>
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
};
