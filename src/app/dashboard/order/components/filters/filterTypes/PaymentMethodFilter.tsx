import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useOrderContext } from "@/context/orderContext";
import React, { ReactNode, useState } from "react";
import { Button } from "../../../../../../components/ui/button";
import { SelectComponent } from "./selectComponent";

interface FilterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const PaymentMethodFilter: React.FC<FilterModalProps> = ({ isOpen, onClose, children }) => {
  const { getOrderByFilter } = useOrderContext();
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSelected = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await getOrderByFilter({ field: 'forma_pagamento', value: paymentMethod });
    console.log("Valor selecionado:", paymentMethod);
    setPaymentMethod("");
    onClose?.();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>$ Forma de pagamento</DialogTitle>
          </DialogHeader>
          <DropdownMenu>
            <form onSubmit={handleSelected}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 mb-12 gap-4">
                  <SelectComponent setPaymentMethod={setPaymentMethod} />
                </div>
                <DialogFooter className="absolute right-5 bottom-5">
                  <Button type="submit">Buscar</Button>
                </DialogFooter>
              </div>
            </form>
          </DropdownMenu>
        </DialogContent>
      </Dialog>
    </>
  );
};
