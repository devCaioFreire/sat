import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useProductContext } from "@/context/productContext";
import React, { ReactNode, useState } from "react";
import { Button } from "../../../../../../components/ui/button";

interface FilterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  selectedIndex?: any;
}

export const Expense: React.FC<FilterModalProps> = ({ isOpen, onClose, children, selectedIndex }) => {
  const { selectedProduct } = useProductContext();
  const [decreaseBalance, setDecreaseBalance] = useState("");

  async function handleDecrease(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDecreaseBalance("");
    onClose?.();
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[768px]">
          <DialogHeader>
            <DialogTitle>Saída</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDecrease}>
            <div className="grid gap-4 py-4">
              <div className="flex items-center mb-8 justify-between w-full">
                <span className="flex gap-2 font-bold flex-col">
                  ID
                  <span className="font-normal">{selectedIndex?.id}</span>
                </span>

                <span className="flex text-center gap-2 font-bold flex-col">
                  Descrição
                  <span className="font-normal">{selectedIndex?.descricao}</span>
                </span>

                <span className="flex text-end gap-2 font-bold flex-col">
                  Saldo
                  <span className="font-normal">{selectedIndex?.saldo}</span>
                </span>
              </div>

              <div className="grid grid-cols-4 mb-12 gap-4">
                <Input
                  id="id"
                  type="number"
                  value={decreaseBalance}
                  onChange={(e) => setDecreaseBalance(e.target.value)}
                  placeholder="Saldo a ser retirado"
                  className="col-span-full"
                  autoComplete="off"
                />
              </div>
              <DialogFooter className="absolute right-5 bottom-5">
                <Button type="submit">Retirar</Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
