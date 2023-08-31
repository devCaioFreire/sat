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
import { Button } from "../button";

interface FilterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const IDFilter: React.FC<FilterModalProps> = ({ isOpen, onClose, children }) => {
  const [ID, setID] = useState("");

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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="id"
                value={ID}
                onChange={(e) => setID(e.target.value)}
                placeholder="Digite o ID"
                className="col-span-full"
                autoComplete="off" 
                />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={onClose}>Buscar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
