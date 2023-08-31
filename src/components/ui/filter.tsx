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
import { EANFilter } from "./filterTypes/EANFilter";
import { IDFilter } from "./filterTypes/IDFilter";

export const Filter: React.FC = () => {
  const [isIdFilterOpen, setIsIdFilterOpen] = useState(false);
  const [isEANFilterOpen, setIsEANFilterOpen] = useState(false);


  const openIDFilterModal = () => {
    setIsIdFilterOpen(true);
  };

  const openEANFilterModal = () => {
    setIsEANFilterOpen(true);
  };

  const closeFilterModal = () => {
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
          <DropdownMenuItem onClick={openEANFilterModal}>EAN</DropdownMenuItem>
          <DropdownMenuItem>Com Saldo</DropdownMenuItem>
          <DropdownMenuItem>Sem Saldo</DropdownMenuItem>
          <DropdownMenuItem>Últimos Lançamentos</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <IDFilter isOpen={isIdFilterOpen} onClose={closeFilterModal} />
      <EANFilter isOpen={isEANFilterOpen} onClose={closeFilterModal} />
    </>
  );
};
