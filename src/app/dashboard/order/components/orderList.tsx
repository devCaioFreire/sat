'use client'
import { IDFilter } from "@/components/ui/filterTypes/IDFilter";
import { useProductContext } from "@/context/productContext";
import { formatCurrency } from "@/utils/formatter";
import { useState } from "react";
import { TfiMoreAlt } from 'react-icons/tfi';
import { IconButton } from "../../product/components/inputButton";
import { Detail } from "./detail";

export const OrderList = () => {
  const { selectedProduct, setSelectedProduct, filter, filterType, loadedProducts } = useProductContext();
  const [isIdFilterOpen, setIsIdFilterOpen] = useState(false);

  const filteredProducts = loadedProducts.filter((product) => {
    if (!filter || !filterType) {
      return true;
    }
    for (const filter of filterType) {
      switch (filter.field) {
        case "id":
          return product.id === filter.field;
        case "codEAN":
          return product.codEAN === filter.field;
        case "descricao":
          return product.descricao.includes(filter.field);
        case "saldo":
          return product.saldo !== "0";
        case "withoutSaldo":
          return product.saldo === "0";
        default:
          return true;
      }
    }
  });

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
            className={`flex text-left items-center text-sm min-h-[4rem] border-b outline-none ${item === selectedProduct ? "bg-indigo-900" : ""}`}
            tabIndex={0}
            onClick={() => setSelectedProduct(item)}
          >
            <td className="px-4 w-[20%] overflow-hidden">{item.id}</td>
            <td className="px-4 w-[20%] overflow-hidden">
              {formatCurrency(parseFloat(item.vlrUnCom))}
            </td>
            <td className="px-4 w-[20%] overflow-hidden">Crédito</td>
            <td className="px-0 w-[20%] text-right overflow-hidden">Sep 18, 2023</td>
            <td className="px-12 w-[20%] flex justify-end text-right overflow-hidden">
              <IconButton title="Adicionar Produto">
                <IDFilter />
                <TfiMoreAlt onClick={openIDFilterModal} />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
      <Detail isOpen={isIdFilterOpen} onClose={closeFilterModal} />
    </table>
  );
};