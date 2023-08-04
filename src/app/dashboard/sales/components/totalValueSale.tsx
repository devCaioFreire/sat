'use client'
import { ProductContext } from "@/context/salesList";
import { formatCurrency } from "@/utils/formatter";
import { useContext } from "react";

export function TotalValueSale() {

  const { calculateTotal } = useContext(ProductContext);

  return (
    <div
      className="flex flex-col w-full rounded-xl bg-backgroundFields relative h-[18%]">

      {/*Header */}

      <header
        className="flex items-center justify-center w-full shadow-lg rounded-t-xl bg-backgroundSecundary absolute top-0 default:h-6 lg:h-10">
        <h1 className="font-medium">Valor Total da Venda</h1>
      </header>

      {/* Product Value */}
      <div
        className="flex items-center justify-end pr-4 text-2xl font-medium top-[calc(50%-0.8rem)] relative">
        <span className="text-2xl py-2 px-4">{formatCurrency(calculateTotal())}</span>
      </div>
    </div>

  )
}