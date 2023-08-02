'use client'
import { ProductContext } from "@/context/salesList";
import { formatCurrency } from "@/utils/date";
import { useContext, useEffect, useRef, useState } from "react";
import { Barcode } from "./components/barcode";
import { DescriptionProduct } from "./components/descriptionProduct";
import { List } from "./components/list";
import { TotalValueSale } from "./components/totalValueSale";
import { ValueProduct } from "./components/valueProduct";

export default function Sales() {

  const { product, selectedProductIndex } = useContext(ProductContext);
  const [untValueIndex, setUntValueIndex] = useState<number>(0);
  const [totalValueIndex, setTotalValueIndex] = useState<number>(0);

  const lastProduct = product[product.length - 1];
  const untValue = lastProduct?.unityValue ? lastProduct.unityValue : 0;

  useEffect(() => {
    if (selectedProductIndex >= 0 && selectedProductIndex < product.length) {
      const selectedProduct = product[selectedProductIndex];
      setTotalValueIndex(selectedProduct.unityValue * selectedProduct.quantity);
      setUntValueIndex(selectedProduct.unityValue);
    } else {
      setTotalValueIndex(0);
      setUntValueIndex(0);
    }
  }, [selectedProductIndex, product]);

  const listRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleArrowLeft = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && listRef.current) {
        listRef.current.focus();
      }
    };

    const handleArrowRight = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && barcodeRef.current) {
        barcodeRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleArrowLeft);
    document.addEventListener("keydown", handleArrowRight);

    return () => {
      document.removeEventListener("keydown", handleArrowLeft);
      document.removeEventListener("keydown", handleArrowRight);
    };
  }, []);

  return (
    <main className="flex w-full gap-[2%] justify-between">
      <div className="w-[58%]">
        <div ref={listRef} tabIndex={0}>
          <List />
        </div>
      </div>

      {/* Insert Product Fields */}
      <div className="grid w-[40%]" >
        <div className="flex flex-col justify-between">
          <div className="h-[18%]" ref={barcodeRef} tabIndex={0}>
            <Barcode />
          </div>

          {/* Grid Quantity and Value */}
          <div className="grid grid-cols-2 h-[18%] gap-6 default:gap-4 lg:gap-10">

            {/* Value */}
            <ValueProduct title="Valor Unitário" value={formatCurrency(untValueIndex)} />
            <ValueProduct title="Valor Total" value={formatCurrency(totalValueIndex)} />
          </div>

          {/* Total Value */}
          <TotalValueSale />

          {/* Product Name */}
          <DescriptionProduct />
        </div>
      </div>
    </main>

  )
}