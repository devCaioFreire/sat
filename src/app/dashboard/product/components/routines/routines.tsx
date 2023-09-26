import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { FaFilter } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

export const Routines: React.FC = () => {

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
          <DropdownMenuItem>Entrada</DropdownMenuItem>
          <DropdownMenuItem>Saída</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
