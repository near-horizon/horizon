import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CalendarSvg } from "~/icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { cn } from "~/lib/utils";
import { type InputProps } from "~/lib/validation/inputs";

export function DateInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & {
      invalidDates?: (date: Date) => boolean;
    }
) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="capitalize">
            {props.label ?? props.name}
            {props.rules?.required && " *"}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] rounded-md pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(new Date(field.value), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarSvg className="ml-auto h-6 w-6 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(field.value)}
                onSelect={(date) => field.onChange(date?.toISOString())}
                disabled={props.invalidDates}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
