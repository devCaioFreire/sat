"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import * as React from "react"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"


export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() - 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(year, parseFloat(month) + 1, parseFloat(day)),
    to: addDays(new Date(year, parseFloat(month) + 1, parseFloat(day)), 0),
  })

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
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col items-center justify-center w-auto p-0 mx-7" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <Button
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
