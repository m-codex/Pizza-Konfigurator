import * as React from "react";
import { format } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date?: Date;
  setDate: (date: Date | undefined) => void;
  locale?: string;
}

export function DatePicker({
  date,
  setDate,
  locale = "de-DE",
}: DatePickerProps) {
  const localeObj = locale.startsWith("en") ? enUS : de;
  const placeholderText = locale.startsWith("en")
    ? "Select date"
    : "Datum auswählen";
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: localeObj })
          ) : (
            <span>{placeholderText}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={localeObj}
        />
      </PopoverContent>
    </Popover>
  );
}
