import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useProductContext } from "@/context/productContext";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React, { ReactNode } from "react";
import { Button } from "../../../../components/ui/button";

interface FilterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const DeleteModal: React.FC<FilterModalProps> = ({ isOpen, onClose, children }) => {
  const { selectedProduct, sendDeleteProduct } = useProductContext();

  async function handleDelete() {
    if (selectedProduct && selectedProduct.id) {
      const productId = parseInt(selectedProduct.id);
      console.log(productId)
      try {
        await sendDeleteProduct(productId);
        onClose?.();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
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

          <div className="flex items-center my-8 justify-between w-full">
            <span className="flex gap-2 font-bold flex-col">
              ID
              <span className="font-normal">{selectedProduct?.id}</span>
            </span>

            <span className="flex text-center gap-2 font-bold flex-col">
              Descrição
              <span className="font-normal">{selectedProduct?.descricao}</span>
            </span>

            <span className="flex text-end gap-2 font-bold flex-col">
              Saldo
              <span className="font-normal">{selectedProduct?.saldo}</span>
            </span>
          </div>
          <div className="flex gap-4 min-w-full">
            <Button onClick={() => onClose?.()} className="w-full">Não</Button>
            <Button onClick={handleDelete} className="w-full hover:bg-red-600 hover:text-zinc-50">Sim</Button>
          </div>
        </DialogContent>
      </Dialog >
    </>
  );
};
