import { ProductContext } from "@/context/salesList";
import { formatCurrency } from "@/utils/formatter";
import { KeyboardEvent, useContext, useEffect, useState } from "react";

export function List() {
  const { product, handleRemoveProduct, selectedProductIndex, setSelectedProductIndex } = useContext(ProductContext);
  const [selectedItem, setSelectedItem] = useState<number>(-1);

  const handleRemove = (ean: number, quantityToRemove: number) => {
    if (quantityToRemove > 0) {
      handleRemoveProduct(ean, quantityToRemove);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTableRowElement>, ean: number) => {
    if (e.key === "ArrowUp") {
      setSelectedItem((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (e.key === "ArrowDown") {
      setSelectedItem((prevIndex) => Math.min(prevIndex + 1, product.length - 1));
    } else if (e.key === "Delete" && selectedItem >= 0) {
      const selectedProduct = product[selectedItem];
      handleRemove(selectedProduct.ean, 1);
    }
  };

  useEffect(() => {
    if (product.length > 0) {
      if (selectedItem < 0) {
        setSelectedItem(product.length - 1);
      }
      setSelectedProductIndex(selectedItem);
    }
  }, [product, selectedItem]);

  useEffect(() => {
    if (product.length > 0) {
      setSelectedItem(product.length - 1);
    }
  }, [product]);

  return (
    <div className="flex w-full h-[88vh] flex-col bg-backgroundFields rounded-3xl border border-border overflow-x-auto">
      <div className="flex items-center justify-center w-full h-12 shadow-lg rounded-t-3xl bg-backgroundSecundary">
        <h1 className="font-medium">Produtos</h1>
      </div>

      <table className="flex relative flex-col border-collapse overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#636369] scrollbar-track-transparent">
        <thead className="sticky top-0 w-full drop-shadow-lg pb-4 bg-backgroundFields">
          <tr className="flex text-left">
            <th className="pt-3 px-4 w-[55%] text-base font-medium">Descrição</th>
            <th className="pt-3 px-4 w-[15%] text-base font-medium">Quantidade</th>
            <th className="pt-3 px-4 w-[15%] text-base font-medium">Unitário</th>
            <th className="pt-3 px-4 w-[15%] text-base font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => (
            <tr
              key={index}
              className={`flex text-left items-center text-sm min-h-[4rem] border-b outline-none ${index === selectedItem ? "bg-indigo-900" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, item.ean)}
              onClick={() => setSelectedItem(index)}
            >
              <td className="px-4 w-[60%]">{item.description}</td>
              <td className="px-0 w-[15%]">{item.quantity}</td>
              <td className="px-4 w-[15%]">{formatCurrency(item.unityValue)}</td>
              <td className="px-4 w-[15%]">{formatCurrency(item.unityValue * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
