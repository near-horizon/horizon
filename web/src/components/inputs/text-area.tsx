import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Textarea } from "@components/ui/textarea";
import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import type { InputProps } from "./types";

export function TextAreaField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseControllerProps<TFieldValues, TName> & Omit<InputProps, "type">) {
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
          <div className="flex flex-col items-start justify-start md:w-4/5 w-full">
            <FormControl>
              <Textarea {...field} placeholder={props.placeholder} rows={4} />
            </FormControl>
            <div className="relative w-full">
              {props.description && (
                <FormDescription className="md:w-4/5 w-1/2">
                  {props.description}
                </FormDescription>
              )}
              <span className="absolute right-0 top-0 text-right text-xs pt-2 text-muted-foreground">
                Min 300 characters
              </span>
            </div>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
