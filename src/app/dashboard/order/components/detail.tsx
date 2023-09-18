import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useProductContext } from "@/context/productContext";
import { formatCurrency } from "@/utils/formatter";
import React, { ReactNode } from "react";

interface DetailModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const Detail: React.FC<DetailModalProps> = ({ isOpen, onClose, children }) => {

  const { selectedProduct, setSelectedProduct, filter, filterType, loadedProducts } = useProductContext();

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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-[80%] h-[80%]">
          <DialogHeader>
            <DialogTitle>Produtos da Venda</DialogTitle>
          </DialogHeader>
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
                    {formatCurrency(parseFloat(item.vlrUnCom))}
                  </td>
                  <td className="px-4 w-[10%] overflow-hidden">{item.unCom}</td>
                  <td className="px-4 w-[10%] overflow-hidden">{item.saldo}</td>
                  <td className="px-8 w-[5%] overflow-hidden">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent >
      </Dialog >
    </>
  );
};
