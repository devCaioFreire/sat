import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { BsFilterCircleFill } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { IDFilter } from "./IDFilter";

export const Filter: React.FC = () => {
  const [isIdFilterOpen, setIsIdFilterOpen] = useState(false);

  const openIdFilterModal = () => {
    setIsIdFilterOpen(true);
  };

  const closeIdFilterModal = () => {
    setIsIdFilterOpen(false);
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
          <DropdownMenuItem onClick={openIdFilterModal}>ID</DropdownMenuItem>
          <DropdownMenuItem>EAN</DropdownMenuItem>
          <DropdownMenuItem>Com Saldo</DropdownMenuItem>
          <DropdownMenuItem>Sem Saldo</DropdownMenuItem>
          <DropdownMenuItem>Últimos Lançamentos</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <IDFilter isOpen={isIdFilterOpen} onClose={closeIdFilterModal} />
    </>
  );
};
