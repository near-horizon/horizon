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
import { cn } from "~/lib/utils";

export function TextAreaInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & {
      maxLength?: number;
    },
) {
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
            <Textarea {...field} placeholder={props.placeholder} />
          </FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <div className="col-start-3 flex flex-row items-start justify-between">
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
