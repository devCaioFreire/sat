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
import { Button } from "./button";

interface FilterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  children?: ReactNode;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClick, children }) => {
  const [modalOpen, setModalOpen] = useState(isOpen || false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={open => setModalOpen(open)}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle># ID</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input id="id" value="" readOnly placeholder="Digite o ID" className="col-span-full" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setModalOpen(false)}>Buscar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
