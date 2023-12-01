import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import type { InputProps } from "./types";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

export function BinaryOptionField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseControllerProps<TFieldValues, TName> & Omit<InputProps, "type">) {
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
          <FormControl className="md:w-4/5">
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={String(field.value)}
              className="flex flex-row md:flex-col gap-6"
            >
              <FormItem className="flex gap-2 space-y-0">
                <FormControl>
                  <RadioGroupItem
                    value="true"
                    className="rounded-xl border-ui-elements-light"
                  />
                </FormControl>
                <FormLabel>Yes</FormLabel>
              </FormItem>
              <FormItem className="flex gap-2 space-y-0">
                <FormControl>
                  <RadioGroupItem
                    value="false"
                    className="rounded-xl border-ui-elements-light"
                  />
                </FormControl>
                <FormLabel>No</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
