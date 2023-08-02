import { ProductContext } from "@/context/salesList";
import { formatCurrency } from "@/utils/date";
import { KeyboardEvent, useContext } from "react";

interface ListProps {
  ref: React.RefObject<HTMLDivElement>;
  tabIndex: number;
}

export function List() {
  const { product, handleRemoveProduct, selectedProductIndex, setSelectedProductIndex } = useContext(ProductContext);

  const handleRemove = (ean: number, quantityToRemove: number) => {
    if (quantityToRemove > 0) {
      handleRemoveProduct(ean, quantityToRemove);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTableRowElement>, ean: number) => {
    if (e.key === "ArrowUp" && selectedProductIndex > 0) {
      setSelectedProductIndex((prevIndex) => prevIndex - 1);
    } else if (e.key === "ArrowDown" && selectedProductIndex < product.length - 1) {
      setSelectedProductIndex((prevIndex) => prevIndex + 1);
    } else if (e.key === "Delete" && selectedProductIndex >= 0) {
      const selectedProduct = product[selectedProductIndex];
      handleRemove(selectedProduct.ean, 1);
    }
  };

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
              className={`flex text-left items-center text-sm min-h-[4rem] border-b outline-none ${index === selectedProductIndex ? "bg-indigo-900" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, item.ean)}
              onClick={() => setSelectedProductIndex(index)}
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
