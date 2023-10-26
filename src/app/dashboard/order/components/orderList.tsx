'use client'
import { Loading } from "@/components/loading";
import { useOrderContext } from "@/context/orderContext";
import { capitalizeFirstLetter, formatCurrency, formatDate } from "@/utils/formatter";
import { useEffect, useState } from "react";
import { TfiMoreAlt } from 'react-icons/tfi';
import { IconButton } from "../../../../components/iconButton";
import { Detail } from "./detail";

export const OrderList = () => {
  const { setSelectedOrder, selectedOrder, loadedProducts, filter, filterType, loadSalesItems, sortOrder, isLoading, loadInitialData, getSalesOrders, setCombined, combineOrdersWithItems } = useOrderContext();
  const [isIdFilterOpen, setIsIdFilterOpen] = useState(false);

  const filteredProducts = loadedProducts.filter((product) => {
    if (!filter || !filterType) {
      return true;
    }
    for (const filter of filterType) {
      switch (filter.field) {
        case "id":
          return product.id === filter.value;
        case "forma_pagamento":
          return product.forma_pagamento === filter.value;
        case "data_realizacao":
          return product.data_realizacao === filter.value;
        default:
          return true;
      }
    }
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.data_realizacao).getTime() - new Date(b.data_realizacao).getTime();
    } else {
      return new Date(b.data_realizacao).getTime() - new Date(a.data_realizacao).getTime();
    }
  });

  const openIDFilterModal = () => {
    setIsIdFilterOpen(true);
  };

  const closeFilterModal = () => {
    setIsIdFilterOpen(false);
  };

  const handleDetail = (orderID: string) => {
    loadSalesItems(orderID);
    openIDFilterModal();
  }

  useEffect(() => {
    loadInitialData(filterType);
  }, []);

  useEffect(() => {
    const fetchAndCombineOrders = async () => {
      await getSalesOrders();
      const orders = await combineOrdersWithItems();
      setCombined(orders);
      console.log('ORDERS',orders);
    };

    fetchAndCombineOrders();
  }, []);

  return (
    <>
      <table
        id="table_order"
        className="flex relative flex-col h-full w-full border-collapse overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#636369] scrollbar-track-transparent"
      >
        <thead className="sticky top-0 w-full drop-shadow-lg pb-4 bg-backgroundFields">
          <tr className="flex text-left">
            <th className="pt-3 px-4 w-[20%] text-base font-medium">ID</th>
            <th className="pt-3 px-4 w-[20%] text-base font-medium">Valor</th>
            <th className="pt-3 px-4 w-[20%] text-base font-medium">Pagamento</th>
            <th
              className="pt-3 px-8 w-[20%] text-base text-right font-medium">
              Data
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((item, index) => (
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
              <td className="px-10 w-[20%] overflow-hidden">{capitalizeFirstLetter(item.forma_pagamento)}</td>
              <td
                className="px-0 w-[20%] ml-14 text-right overflow-hidden">
                {formatDate(item.data_realizacao)}
              </td>
              <td className="px-12 w-[20%] flex justify-end text-right overflow-hidden">
                <IconButton title="Visualizar produtos">
                  <TfiMoreAlt onClick={() => handleDetail(item.id)} />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
        <Detail isOpen={isIdFilterOpen} onClose={closeFilterModal} selectedSalesOrder={selectedOrder} />
      </table>
      {isLoading && <div className="flex items-center justify-center py-4"><Loading /></div>}
    </>
  );
};
