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
import { BiBarcodeReader } from 'react-icons/bi';
import { Button } from "../button";

interface FilterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const EANFilter: React.FC<FilterModalProps> = ({ isOpen, onClose, children }) => {
  const { getProductByFilter } = useProductContext();
  const [ean, setEAN] = useState("");

  async function handleSearchEAN(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await getProductByFilter(ean, 'codEAN');
    setEAN("");
    onClose?.();
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center"><BiBarcodeReader className="w-6 h-6" /> EAN</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearchEAN}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="id"
                  value={ean}
                  onChange={(e) => setEAN(e.target.value)}
                  placeholder="Digite o código EAN"
                  className="col-span-full"
                  autoComplete="off"
                />
              </div>
              <DialogFooter className="absolute right-5 bottom-5">
                <Button type="submit">Buscar</Button>
              </DialogFooter>
            </div>
          </form>


        </DialogContent>
      </Dialog>
    </>
  );
};
