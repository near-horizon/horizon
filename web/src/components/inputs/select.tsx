import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import type { InputProps } from "./types";

export function SelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName> &
    Omit<InputProps, "type"> & {
      options: { label: string; value: string }[];
    },
) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex flex-col md:flex-row items-start justify-end w-full gap-2 md:gap-8">
          <FormLabel className="pt-5 font-semibold md:max-w-[calc(20%-2rem)] text-right">
            {props.label}
            {!props.optional && " *"}
          </FormLabel>
          <div className="flex flex-col items-start justify-start md:w-4/5 w-full">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {props.options.map((option) => (
                  <SelectItem
                    value={option.value}
                    key={option.value}
                    className="whitespace-wrap max-w-[min(20rem,75svw)]"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
