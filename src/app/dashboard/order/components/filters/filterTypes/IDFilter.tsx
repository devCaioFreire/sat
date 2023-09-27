import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useOrderContext } from "@/context/orderContext";
import React, { ReactNode, useState } from "react";
import { Button } from "../../../../../../components/ui/button";

interface FilterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const IDFilter: React.FC<FilterModalProps> = ({ isOpen, onClose, children }) => {
  const { getOrderByFilter } = useOrderContext();
  const [ID, setID] = useState("");

  async function handleSearchID(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await getOrderByFilter({ field: 'id', value: ID })
    setID("");
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
            <DialogTitle># ID</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearchID}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 mb-12 gap-4">
                <Input
                  id="id"
                  value={ID}
                  onChange={(e) => setID(e.target.value)}
                  placeholder="Digite o ID"
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
