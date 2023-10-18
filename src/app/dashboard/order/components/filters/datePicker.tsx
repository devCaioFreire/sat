"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import * as React from "react"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useOrderContext } from "@/context/orderContext"
import { cn } from "@/lib/utils"
import { formatDate } from "@/utils/formatter"
import { ptBR } from "date-fns/locale"

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {

  const { searchByPeriod } = useOrderContext();

  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  function handleSubmit() {
    if (date?.from && date?.to) {
      const dateInitial = format(date.from, 'yyyy-MM-dd');
      const dateFinal = format(date.to, 'yyyy-MM-dd');
      searchByPeriod({ dateInitial, dateFinal });
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[250px] justify-center text-center font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {formatDate(format(date.from, "LLL dd, y"))} -{" "}
                  {formatDate(format(date.to, "LLL dd, y"))}
                </>
              ) : (
                formatDate(format(date.from, "LLL dd, y"))
              )
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col items-center justify-center w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            locale={ptBR}
          />
          <Button
            onClick={handleSubmit}
            id="date"
            variant={"default"}
            className={cn(
              "flex w-[95%] my-4 items-center justify-center font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <span>Buscar</span>
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
