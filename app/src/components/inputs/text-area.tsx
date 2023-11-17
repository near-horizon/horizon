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
import { type InputProps } from "~/lib/validation/inputs";

export function TextAreaInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & {
      maxLength?: number;
    }
) {
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
            <Textarea {...field} placeholder={props.placeholder} />
          </FormControl>
          <FormDescription>{props.description}</FormDescription>
          <div className="flex flex-row items-start justify-between">
            <span>
              <FormMessage />
            </span>
            {props.maxLength && (
              <span className="ml-3 text-text-gray">
                {props.maxLength -
                  (typeof field.value === "string" ? field.value : "")
                    .length}{" "}
                characters left
              </span>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}
