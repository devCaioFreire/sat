'use client'
import { FilterType, useProductContext } from "@/context/productContext";
import { formatCurrency } from "@/utils/formatter";
import { useState } from "react";

export const ProductList = () => {
  const { products, selectedProduct, setSelectedProduct, filter, setFilter } = useProductContext();

  const [filterType, setFilterType] = useState<FilterType>('');

  // const filteredProducts = filter ? products.filter(product => product.codEAN === filter) : products;

  let filteredProducts = products;

  if (filter && filterType === 'id') {
    filteredProducts = products.filter((product) => {
      return product.id === filter;
    });
  } else if (filter && filterType === 'codEAN') {
    filteredProducts = products.filter((product) => {
      return product.codEAN === filter;
    });
  }

  return (
    <table
      id="table"
      className="flex relative flex-col h-full w-full border-collapse overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#636369] scrollbar-track-transparent"
    >
      <thead className="sticky top-0 w-full drop-shadow-lg pb-4 bg-backgroundFields">
        <tr className="flex text-left">
          <th className="pt-3 px-4 w-[5%] text-base font-medium">ID</th>
          <th className="pt-3 px-4 w-[10%] text-base font-medium">Cód. Interno</th>
          <th className="pt-3 px-4 w-[50%] text-base font-medium">Descrição</th>
          <th className="pt-3 px-4 w-[10%] text-base font-medium">Valor</th>
          <th className="pt-3 px-4 w-[10%] text-base font-medium">Unidade</th>
          <th className="pt-3 px-4 w-[10%] text-base font-medium">Saldo</th>
          <th className="pt-3 px-4 w-[5%] text-base font-medium">Status</th>
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
            <td className="px-4 w-[5%] overflow-hidden">{item.id}</td>
            <td className="px-4 w-[10%] overflow-hidden">{item.codProduto}</td>
            <td className="px-4 w-[50%] overflow-hidden">{item.descricao}</td>
            <td className="px-4 w-[10%] overflow-hidden">
              R$ {formatCurrency(item.vlrUnCom)}
            </td>
            <td className="px-4 w-[10%] overflow-hidden">{item.unCom}</td>
            <td className="px-4 w-[10%] overflow-hidden">{item.saldo}</td>
            <td className="px-4 w-[10%] overflow-hidden">{item.codEAN}</td> {/* Adicione esta coluna */}
            <td className="px-4 w-[5%] overflow-hidden">{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
