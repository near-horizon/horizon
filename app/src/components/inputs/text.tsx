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
import { Input } from "../ui/input";

export function TextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName> & {
    placeholder?: string;
    description?: string;
  }
) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">
            {field.name}
            {props.rules?.required && " *"}
          </FormLabel>
          <FormControl>
            <Input {...field} placeholder={props.placeholder} type="text" />
          </FormControl>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
