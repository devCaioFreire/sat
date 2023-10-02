import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { ReactNode, useState } from "react";
import { Button } from "../../../../../../components/ui/button";

interface FilterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  selectedIndex?: any;
}

export const Income: React.FC<FilterModalProps> = ({ isOpen, onClose, children, selectedIndex }) => {
  const [increaseBalance, setIncreaseBalance] = useState("");

  async function handleIncrease(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIncreaseBalance("");
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
            <DialogTitle>Entrada</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleIncrease}>
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
                  value={increaseBalance}
                  onChange={(e) => setIncreaseBalance(e.target.value)}
                  placeholder="Saldo a ser adicionado"
                  className="col-span-full"
                  autoComplete="off"
                />
              </div>
              <DialogFooter className="absolute right-5 bottom-5">
                <Button type="submit">Adicionar</Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
