import { ProductContext } from "@/context/salesList";
import { useContext } from "react";

export function List() {
  const { product } = useContext(ProductContext);

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
          {product.map((item) => (
            <tr key={item.id} className="flex text-left items-center text-sm min-h-[4rem]">
              <td className="px-4 w-[60%]">{item.description}</td>
              <td className="px-0 w-[15%]">{item.quantity}</td>
              <td className="px-4 w-[15%]">{item.unityValue}</td>
              <td className="px-4 w-[15%]">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
