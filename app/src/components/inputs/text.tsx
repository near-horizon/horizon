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
import { cn } from "~/lib/utils";

export function TextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseControllerProps<TFieldValues, TName> & InputProps) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="grid w-full grid-cols-12 items-start justify-end gap-2 space-y-0">
          {!props.noLabel && (
            <FormLabel className="col-span-2 text-right capitalize">
              {props.label ?? field.name}
              {props.rules?.required && " *"}
            </FormLabel>
          )}
          <FormControl
            className={cn(props.noLabel ? "col-span-full" : "col-span-10")}
          >
            <Input {...field} placeholder={props.placeholder} type="text" />
          </FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage className="col-start-3" />
        </FormItem>
      )}
    />
  );
}
