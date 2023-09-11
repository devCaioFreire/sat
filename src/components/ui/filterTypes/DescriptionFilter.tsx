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
import { Button } from "../button";

interface FilterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const DescriptionFilter: React.FC<FilterModalProps> = ({ isOpen, onClose, children }) => {
  const { getProductByFilter } = useProductContext();
  const [description, setDescription] = useState("");

  async function handleSearchDescription(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await getProductByFilter({ field: 'descricao', value: description })
    setDescription("");
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
            <DialogTitle>Descrição</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearchDescription}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 mb-12 gap-4">
                <Input
                  id="id"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Digite o produto"
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
