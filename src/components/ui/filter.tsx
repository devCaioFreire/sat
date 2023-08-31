import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterType, useProductContext } from "@/context/productContext";
import React, { useState } from "react";
import { BsFilterCircleFill } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { EANFilter } from "./filterTypes/EANFilter";
import { IDFilter } from "./filterTypes/IDFilter";

export const Filter: React.FC = () => {
  const { setFilter } = useProductContext();

  const [isIdFilterOpen, setIsIdFilterOpen] = useState(false);
  const [isEANFilterOpen, setIsEANFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>('id');


  const openIDFilterModal = () => {
    setIsIdFilterOpen(true);
    setFilterType('id');
  };

  const openEANFilterModal = () => {
    setIsEANFilterOpen(true);
    setFilterType('codEAN');
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
          <DropdownMenuItem onClick={() => setFilter(null)}>Limpar Filtro</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <IDFilter isOpen={isIdFilterOpen} onClose={closeFilterModal} />
      <EANFilter isOpen={isEANFilterOpen} onClose={closeFilterModal} />
    </>
  );
};
