import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { CoupomData, useCoupomContext } from "@/context/cancelCoupom";
import { formatCpfOrCnpj, formatCurrency } from "@/utils/formatter";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React, { ReactNode } from "react";
import { Button } from "../../../../components/ui/button";

interface FilterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  selectedCoupom?: CoupomData | null;
}

export const DeleteCoupomModal: React.FC<FilterModalProps> = ({ isOpen, onClose, children, selectedCoupom }) => {
  const { coupoms, deleteLastSale } = useCoupomContext();
  function handleDelete(cancel: { id: number, status: string }) {
    try {
      deleteLastSale(cancel);
      onClose?.();
    } catch (error) {
      throw new Error;
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Deseja deletar esse registro?</DialogTitle>
          </DialogHeader>
          <Separator className="border" />

          {selectedCoupom && (
            <>
              <tr
                className={`flex text-left items-center text-sm min-h-[5rem] border-b border-border outline-none`}
              >
                <td className="px-4 w-[15%]">{selectedCoupom.id}</td>
                <td className="px-6 w-[35%]">{formatCpfOrCnpj(selectedCoupom.cpf_cnpj)}</td>
                <td className="px-10 w-[25%]">{formatCurrency(selectedCoupom.valor_liquido)}</td>
                <td className="px-12 w-[25%]">{new Date(selectedCoupom.data_criacao).toLocaleDateString()}</td>
              </tr>
              <div className="flex gap-4 min-w-full">
                <Button onClick={() => onClose?.()} className="w-full">Não</Button>
                <Button onClick={() => handleDelete({ id: selectedCoupom.id, status: 'C' })} className="w-full hover:bg-red-600 hover:text-zinc-50">Sim</Button>
              </div >
            </>
          )}
        </DialogContent>
      </Dialog >
    </>
  );
};
