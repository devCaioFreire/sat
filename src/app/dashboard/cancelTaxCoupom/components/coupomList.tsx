'use client';
import { IconButton } from "@/components/iconButton";
import { useCoupomContext } from "@/context/cancelCoupom";
import { formatCpfOrCnpj, formatCurrency } from "@/utils/formatter";
import { useEffect } from "react";
import { FaRegTrashCan } from 'react-icons/fa6';

export const CoupomList = () => {
  const { coupoms, getLastSales, deleteLastSale } = useCoupomContext();

  useEffect(() => {
    getLastSales();
  }, [coupoms])

  function handleDelete(cancel: { id: number, status: string }) {
    deleteLastSale(cancel);
  }

  return (
    <div className="flex w-full">
      <table className="flex w-full relative flex-col border-collapse overflow-auto overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#636369] scrollbar-track-transparent">
        <thead className="sticky top-0 w-full drop-shadow-lg pb-4 bg-backgroundFields">
          <tr className="flex text-left">
            <th className="pt-3 px-4 w-[15%] text-base font-medium">ID Cupom</th>
            <th className="pt-3 px-4 w-[35%] text-base font-medium">CPF / CNPJ</th>
            <th className="pt-3 px-4 w-[25%] text-base font-medium">R$ Valor</th>
            <th className="pt-3 px-4 w-[25%] text-base font-medium">Data</th>
          </tr>
        </thead>
        <tbody>
          {coupoms.map((item, index) => (
            <tr
              key={index}
              className={`flex text-left items-center text-sm min-h-[5rem] border-b border-border outline-none`}
            >
              <td className="px-4 w-[15%]">{item.id}</td>
              <td className="px-6 w-[35%]">{formatCpfOrCnpj(item.cpf_cnpj)}</td>
              <td className="px-10 w-[25%]">{formatCurrency(item.valor_liquido)}</td>
              <td className="px-12 w-[25%]">{new Date(item.data_criacao).toLocaleDateString()}</td>
              <td
                className="flex items-center justify-center rounded-full mr-4 px-4 w-[0%] cursor-pointer transition-all"
                onClick={() => handleDelete({ id: item.id, status: 'C' })}>
                <IconButton className="px-0 hover:bg-transparent">
                  <FaRegTrashCan className="w-6 h-6 text-zinc-50 hover:text-red-600" />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CoupomList;
