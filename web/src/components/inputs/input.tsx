import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import type { InputProps } from "./types";

export function InputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseControllerProps<TFieldValues, TName> & InputProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex flex-col md:flex-row items-start justify-end w-full gap-2 md:gap-8">
          <div className="flex flex-col items-end gap-2 justify-start md:max-w-[calc(20%-2rem)]">
            <FormLabel className="pt-5 font-semibold text-right">
              {props.label}
              {!props.optional && " *"}
            </FormLabel>
          </div>
          <div className="flex flex-col items-start justify-start w-full md:w-4/5">
            <FormControl>
              <Input
                {...field}
                type={props.type}
                className=""
                placeholder={props.placeholder}
              />
            </FormControl>
            {props.description && (
              <FormDescription>{props.description}</FormDescription>
            )}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
