import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrderContext } from "@/context/orderContext";
import React, { useState } from "react";
import { BsFilterCircleFill } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { IDFilter } from "./IDFilter";
import { PaymentMethodFilter } from "./PaymentMethodFilter";

export const OrderFilter: React.FC = () => {
  const { clearFilter } = useOrderContext();
  const [isPaymentMethodFilterOpen, setIsPaymentMethodFilterOpen] = useState(false);
  const [isIdFilterOpen, setIsIdFilterOpen] = useState(false);
  const [isEANFilterOpen, setIsEANFilterOpen] = useState(false);

  const openPaymentMethodFilterModal = () => {
    setIsPaymentMethodFilterOpen(true);
  };

  const openIDFilterModal = () => {
    setIsIdFilterOpen(true);
  };

  const openEANFilterModal = () => {
    setIsEANFilterOpen(true);
  };

  const closeFilterModal = () => {
    setIsPaymentMethodFilterOpen(false);
    setIsIdFilterOpen(false);
    setIsEANFilterOpen(false);
  };


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <BsFilterCircleFill
            className="mt-1 w-6 h-6 text-zinc-100"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex items-center justify-center gap-2">
            <FaFilter className="w-3 h-3" />
            Filtros
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openIDFilterModal}>ID</DropdownMenuItem>
          <DropdownMenuItem onClick={openPaymentMethodFilterModal}>Forma de Pagamento</DropdownMenuItem>
          <DropdownMenuItem>Últimos Lançamentos</DropdownMenuItem>
          <DropdownMenuItem onClick={() => clearFilter()}>Limpar Filtro</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <IDFilter isOpen={isIdFilterOpen} onClose={closeFilterModal} />
      <PaymentMethodFilter isOpen={isPaymentMethodFilterOpen} onClose={closeFilterModal} />
    </>
  );
};