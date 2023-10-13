'use client'
import { ProductContext } from "@/context/salesList";
import { useContext } from "react";

export function DescriptionProduct({ selectedProduct }: any) {

  const { product } = useContext(ProductContext);
  if (product.length > 0 && !selectedProduct) {
    selectedProduct = product[0];
  }

  return (
    <div className="flex flex-col items-center justify-center w-full rounded-xl bg-backgroundFields relative h-[36%]">
      {/* Header */}
      <header
        className="flex items-center justify-center w-full shadow-lg rounded-t-xl bg-backgroundSecundary absolute top-0 default:h-6 lg:h-10">
        <h1 className="font-medium">Produto</h1>
      </header>

      {/* Description */}
      <div className="flex items-center justify-center rounded-lg default:mt-6 lg:mt-8">
        <span className="text-2xl py-2 px-4 overflow-hidden text-ellipsis">
          {selectedProduct?.descricao}
        </span>
      </div>
    </div>
  )
}