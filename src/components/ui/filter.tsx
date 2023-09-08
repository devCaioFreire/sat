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
import { BsFilterCircleFill } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { DescriptionFilter } from "./filterTypes/DescriptionFilter";
import { EANFilter } from "./filterTypes/EANFilter";
import { IDFilter } from "./filterTypes/IDFilter";

export const Filter: React.FC = () => {
  const { setFilter, setFilterType, clearFilter, getProductByFilter } = useProductContext();

  const [isDescriptionFilterOpen, setIsDescriptionFilterOpen] = useState(false);
  const [isIdFilterOpen, setIsIdFilterOpen] = useState(false);
  const [isEANFilterOpen, setIsEANFilterOpen] = useState(false);

  const openDescriptionFilterModal = () => {
    setIsDescriptionFilterOpen(true);
    // setFilterType('id');
  };

  const openIDFilterModal = () => {
    setIsIdFilterOpen(true);
    // setFilterType('id');
  };

  const openEANFilterModal = () => {
    setIsEANFilterOpen(true);
    // setFilterType('codEAN');
  };

  const closeFilterModal = () => {
    setIsDescriptionFilterOpen(false);
    setIsIdFilterOpen(false);
    setIsEANFilterOpen(false);
  };

  const balance = () => {
    getProductByFilter({field:'saldo', value:1})
  }

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
          <DropdownMenuItem onClick={openDescriptionFilterModal}>Descrição</DropdownMenuItem>
          <DropdownMenuItem onClick={openIDFilterModal}>ID</DropdownMenuItem>
          <DropdownMenuItem onClick={openEANFilterModal}>EAN</DropdownMenuItem>
          <DropdownMenuItem onClick={balance}>Com Saldo</DropdownMenuItem>
          <DropdownMenuItem onClick={() => getProductByFilter({field:'saldo', value:0})}>Sem Saldo</DropdownMenuItem>
          <DropdownMenuItem>Últimos Lançamentos</DropdownMenuItem>
          <DropdownMenuItem onClick={clearFilter}>Limpar Filtro</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DescriptionFilter isOpen={isDescriptionFilterOpen} onClose={closeFilterModal} />
      <IDFilter isOpen={isIdFilterOpen} onClose={closeFilterModal} />
      <EANFilter isOpen={isEANFilterOpen} onClose={closeFilterModal} />
    </>
  );
};
