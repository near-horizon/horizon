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
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { type InputProps } from "~/lib/validation/inputs";

export function CheckboxInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputProps) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border-0 p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="capitalize">
              {props.label ?? props.name}
              {props.rules?.required && " *"}
            </FormLabel>
            <FormDescription>{props.description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
}
