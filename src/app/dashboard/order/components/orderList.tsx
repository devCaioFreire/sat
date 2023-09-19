'use client'
import { IDFilter } from "@/components/ui/filterTypes/IDFilter";
import { useOrderContext } from "@/context/orderContext";
import { formatCurrency, formatDate } from "@/utils/formatter";
import { useState } from "react";
import { TfiMoreAlt } from 'react-icons/tfi';
import { IconButton } from "../../product/components/inputButton";
import { Detail } from "./detail";

export const OrderList = () => {
  const { sales, selectedProduct, setSelectedOrder, setSelectedProduct, selectedOrder } = useOrderContext();
  const [isIdFilterOpen, setIsIdFilterOpen] = useState(false);

  const filteredProducts = sales;

  const openIDFilterModal = () => {
    setIsIdFilterOpen(true);
  };


  const closeFilterModal = () => {
    setIsIdFilterOpen(false);
  };

  return (
    <table
      id="table"
      className="flex relative flex-col h-full w-full border-collapse overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#636369] scrollbar-track-transparent"
    >
      <thead className="sticky top-0 w-full drop-shadow-lg pb-4 bg-backgroundFields">
        <tr className="flex text-left">
          <th className="pt-3 px-4 w-[20%] text-base font-medium">ID</th>
          <th className="pt-3 px-4 w-[20%] text-base font-medium">Valor</th>
          <th className="pt-3 px-4 w-[20%] text-base font-medium">Pagamento</th>
          <th className="pt-3 px-8 w-[20%] text-base text-right font-medium">Data</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((item, index) => (
          <tr
            key={index}
            className={`flex text-left items-center text-sm min-h-[4rem] border-b outline-none ${item === selectedOrder ? "bg-indigo-900" : ""}`}
            tabIndex={0}
            onClick={() => setSelectedOrder(item)}
          >
            <td className="px-4 w-[20%] overflow-hidden">{item.id}</td>
            <td className="px-8 w-[20%] overflow-hidden">
              {formatCurrency(parseFloat(item.valor_liquido))}
            </td>
            <td className="px-10 w-[20%] overflow-hidden">{item.forma_pagamento}</td>
            <td className="px-0 w-[20%] ml-14 text-right overflow-hidden">{formatDate(item.data_realizacao)}</td>
            <td className="px-12 w-[20%] flex justify-end text-right overflow-hidden">
              <IconButton title="Adicionar Produto">
                <IDFilter />
                <TfiMoreAlt onClick={openIDFilterModal} />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
      <Detail isOpen={isIdFilterOpen} onClose={closeFilterModal} selectedSalesOrder={selectedOrder} />
    </table>
  );
};
