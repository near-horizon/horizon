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
import { type InputProps } from "~/lib/validation/inputs";

export function NumberInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputProps) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">
            {props.label ?? field.name}
            {props.rules?.required && " *"}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              onChange={(event) =>
                field.onChange({
                  ...event,
                  target: {
                    ...event.target,
                    value: Number(event.target.value),
                  },
                })
              }
              placeholder={props.placeholder}
              type="number"
            />
          </FormControl>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
