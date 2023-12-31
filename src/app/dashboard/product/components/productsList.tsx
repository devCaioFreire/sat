'use client'
import { Loading } from "@/components/loading";
import { useProductContext } from "@/context/productContext";
import { formatCurrency } from "@/utils/formatter";
import { useEffect } from "react";

export const ProductList = () => {
  const { selectedProduct, setSelectedProduct, filter, filterType, loadedProducts, sortOrder, isLoading, loadInitialData, tableRef } = useProductContext();

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

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <>
      <table
        id="table"
        ref={tableRef}
        className="flex relative flex-col h-full w-full border-collapse overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#636369] scrollbar-track-transparent"
      >
        <thead className="sticky top-0 w-full drop-shadow-lg pb-4 bg-backgroundFields">
          <tr className="flex text-left">
            <th className="pt-3 px-4 w-[5%] text-base font-medium">ID</th>
            <th className="pt-3 px-4 w-[10%] text-base font-medium">Cód. Interno</th>
            <th className="pt-3 px-4 w-[50%] text-base font-medium xl:w-[47%]">Descrição</th>
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
              <td className="px-4 w-[50%] overflow-hidden xl:w-[47%]">{item.descricao}</td>
              <td className="px-4 w-[10%] overflow-hidden">
                {formatCurrency(parseFloat(item.vlrUnCom))}
              </td>
              <td className="px-4 w-[10%] overflow-hidden">{item.unCom}</td>
              <td className="px-4 w-[10%] overflow-hidden">{item.saldo}</td>
              <td className="px-4 w-[5%] overflow-hidden xl:px-8">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <div className="flex items-center justify-center py-4"><Loading /></div>}
    </>
  );
};
