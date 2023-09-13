import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import React, { ReactNode, useState } from "react";

interface ModalProps {
  product?: any;
  onConfirm?: (product: any, quantity: number) => void;
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const QuantityBarcodeModal: React.FC<ModalProps> = ({ product, onConfirm, isOpen, onClose, children }) => {
  const [quantity, setQuantity] = useState("");

  async function handleQuantity(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (onConfirm) {
      onConfirm(product, Number(quantity));
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle>Quantidade</DialogTitle>
        </DialogHeader>
        <Separator className="border border-stone-700" />
        <form onSubmit={handleQuantity} className="h-[90%]" >
          <div className="flex flex-col gap-4 my-4">
            <Label>Quantidade</Label>
            <Input type="number" min={0} value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Informe a quantidade..." />
          </div>
          <button type="submit" className="hidden">Submit</button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
