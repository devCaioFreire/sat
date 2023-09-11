import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useProductContext } from "@/context/productContext";
import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const BarcodeModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const { getProductByFilter } = useProductContext();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="flex flex-col min-w-[720px] h-[90%]">
          <DialogHeader>
            <DialogTitle>Produtos</DialogTitle>
          </DialogHeader>
          <Separator className="border border-stone-700" />
          <div className="flex flex-col gap-4 mt-4">
            <Label>Descrição</Label>
            <Input placeholder="Descrição do produto..." />
          </div>

          
        </DialogContent>
      </Dialog>
    </>
  );
};
