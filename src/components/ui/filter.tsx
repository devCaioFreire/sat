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
import { FilterModal } from './filterModal';

export const Filter: React.FC = () => {
  const [isIdFilterOpen, setIsIdFilterOpen] = useState(false);

  const openIdFilterModal = () => {
    console.log("Abrindo o modal");
    setIsIdFilterOpen(true);
  };

  const closeFilterModal = () => {
    setIsIdFilterOpen(false);
  };

  const handleIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    openIdFilterModal();
  };

  console.log("isIdFilterOpen:", isIdFilterOpen);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <BsFilterCircleFill
            className="mt-1 w-6 h-6  text-zinc-100"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex items-center justify-center gap-2">
            <FaFilter className="w-3 h-3" />
            Filtros
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <FilterModal
            isOpen={isIdFilterOpen}
            onClose={closeFilterModal}
          >
            <DropdownMenuItem onClick={openIdFilterModal}>ID</DropdownMenuItem>
          </FilterModal>
          <DropdownMenuItem>EAN</DropdownMenuItem>
          <DropdownMenuItem>Com Saldo</DropdownMenuItem>
          <DropdownMenuItem>Sem Saldo</DropdownMenuItem>
          <DropdownMenuItem>Últimos Lançamentos</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
