import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const SelectComponent = ({ setPaymentMethod }: any) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (value: any) => {
    try {
      setSelectedValue(value);
      setPaymentMethod(value);
    } catch (error) {
      throw new Error;
    }
    setSelectedValue("");
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup onChange={handleValueChange}>
          <SelectLabel>Selecione...</SelectLabel>
          <SelectItem value="credito">
            Cartão de Crédito
          </SelectItem>
          <SelectItem value="debito">
            Cartão de Débito
          </SelectItem>
          <SelectItem value="dinheiro">
            Dinheiro
          </SelectItem>
          <SelectItem
            value="vale refeicao">
            Vale Refeição
          </SelectItem>
          <SelectItem
            value="vale alimentacao">
            Vale Alimentação
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
