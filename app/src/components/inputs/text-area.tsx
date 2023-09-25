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
import { Textarea } from "../ui/textarea";

export function TextAreaInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName> & {
    placeholder?: string;
    description?: string;
    maxLength?: number;
  }
) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">
            {props.name}
            {props.rules?.required && " *"}
            {props.maxLength && (
              <span className="ml-3 text-text-gray">
                {(field.value as string).length}/{props.maxLength}
              </span>
            )}
          </FormLabel>
          <FormControl>
            <Textarea {...field} placeholder={props.placeholder} />
          </FormControl>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
