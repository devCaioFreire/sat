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
import { Button } from "../../../../../components/ui/button";

interface FilterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const PaymentMethodFilter: React.FC<FilterModalProps> = ({ isOpen, onClose, children }) => {
  const { getOrderByFilter } = useOrderContext();
  const [paymentMethod, setPaymentMethod] = useState("");

  async function handleSearchID(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await getOrderByFilter({ field: 'forma_pagamento', value: paymentMethod })
    setPaymentMethod("");
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
            <DialogTitle>$ Forma de pagamento</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearchID}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 mb-12 gap-4">
                <Input
                  id="id"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  placeholder="Digite a forma de pagamento"
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
