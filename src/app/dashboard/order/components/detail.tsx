import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { SalesOrderProps, useOrderContext } from "@/context/orderContext";
import { formatCurrency, formatDate } from "@/utils/formatter";
import React, { ReactNode, useState } from "react";

interface DetailModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  selectedSalesOrder?: SalesOrderProps | null;
}

export const Detail: React.FC<DetailModalProps> = ({ isOpen, onClose, children, selectedSalesOrder }) => {

  const { products, selectedProduct, setSelectedProduct, selectedOrder, sales } = useOrderContext();
  const [isIdFilterOpen, setIsIdFilterOpen] = useState(false);

  const filteredProducts = products;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-4 max-w-[80%] h-[80%]">
          <DialogHeader>
            <DialogTitle>Produtos da Venda</DialogTitle>
          </DialogHeader>
          <table
            className="flex flex-col h-fit pb-4 w-full my-4 border-collapse overflow-hidden scrollbar scrollbar-thumb-[#636369] scrollbar-track-transparent"
          >
            <thead className="sticky top-0 w-full drop-shadow-lg pb-4 bg-zinc-300 text-black">
              <tr className="flex text-left">
                <th className="pt-3 px-4 w-[25%] text-base font-medium">ID</th>
                <th className="pt-3 px-4 w-[25%] text-base font-medium">Valor</th>
                <th className="pt-3 px-4 w-[25%] text-base font-medium">Pagamento</th>
                <th className="pt-3 px-8 w-[25%] text-base text-right font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {selectedSalesOrder && (
                <tr
                  className={`flex text-left items-center text-sm min-h-[4rem] border-b outline-none`}
                  tabIndex={0}
                >
                  <td className="px-4 w-[25%]">{selectedSalesOrder.id}</td>
                  <td className="px-4 w-[25%]">
                    {formatCurrency(parseFloat(selectedSalesOrder.valor_liquido))}
                  </td>
                  <td className="px-4 w-[25%]">{selectedSalesOrder.forma_pagamento}</td>
                  <td className="px-4 w-[25%] text-right">{formatDate(selectedSalesOrder.data_realizacao)}

                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <table
            id="table"
            className="flex relative flex-col h-full w-full border-collapse overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#636369] scrollbar-track-transparent"
          >
            <thead className="sticky top-0 w-full drop-shadow-lg pb-4 bg-zinc-300 text-black">
              <tr className="flex text-left">
                <th className="pt-3 px-4 w-[5%] text-base font-medium">ID</th>
                <th className="pt-3 px-4 w-[50%] text-base font-medium">Descrição</th>
                <th className="pt-3 px-4 w-[10%] text-base font-medium">Valor</th>
                <th className="pt-3 px-4 w-[10%] text-base font-medium">Unidade</th>
                <th className="pt-3 px-4 w-[10%] text-base font-medium">Qnt</th>
                <th className="pt-3 px-4 w-[10%] text-base font-medium">Vlr Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item, index) => (
                <tr
                  key={index}
                  className={`flex text-left items-center text-sm min-h-[4rem] border-b outline-none ${item === selectedProduct ? "bg-stone-700" : ""}`}
                  tabIndex={0}
                  onClick={() => setSelectedProduct(item)}
                >
                  <td className="px-4 w-[5%] overflow-hidden">{item.id}</td>
                  <td className="px-4 w-[50%] overflow-hidden">{item.descricao}</td>
                  <td className="px-4 w-[10%] overflow-hidden">
                    {formatCurrency(item.valor_unitario)}
                  </td>
                  <td className="px-4 w-[10%] overflow-hidden">{item.unCom}</td>
                  <td className="px-4 w-[10%] overflow-hidden">{item.quantidade}</td>
                  <td className="px-8 w-[10%] overflow-hidden">{formatCurrency(item.valor_total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent >
      </Dialog >
    </>
  );
};
