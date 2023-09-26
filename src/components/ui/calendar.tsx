"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { DayPicker } from "react-day-picker"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "rounded-md w-9 font-normal text-[0.8rem] text-stone-400",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-stone-800",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "focus:text-stone-50 bg-stone-50 text-stone-900 hover:bg-stone-50 hover:text-stone-900 focus:bg-stone-50 focus:text-stone-900",
        day_today: "bg-stone-800 text-stone-50",
        day_outside: "opacity-50 text-stone-400",
        day_disabled: "opacity-50 text-stone-400",
        day_range_middle:
          "aria-selected:text-stone-900 aria-selected:text-stone-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

