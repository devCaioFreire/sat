import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProductContext } from "@/context/productContext";
import React, { useState } from "react";
import { FaFilter } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { Expense } from "./routinesTypes/expense";
import { Income } from "./routinesTypes/income";

export const Routines: React.FC = () => {
  const { selectedProduct } = useProductContext();
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const openIncomeModal = () => {
    setIsIncomeModalOpen(true);
  };

  const openExpenseModal = () => {
    setIsExpenseModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsIncomeModalOpen(false);
    setIsExpenseModalOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <MdSettings className="mt-1 w-7 h-7 text-zinc-100" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex items-center justify-center gap-2">
            <FaFilter className="w-3 h-3" />
            Routines
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openIncomeModal}>Entrada</DropdownMenuItem>
          <DropdownMenuItem onClick={openExpenseModal}>Saída</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Income isOpen={isIncomeModalOpen} onClose={closeFilterModal} selectedIndex={selectedProduct} />
      <Expense isOpen={isExpenseModalOpen} onClose={closeFilterModal} selectedIndex={selectedProduct} />
    </>
  );
};
