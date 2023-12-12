import {
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
  type UseFormStateReturn,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { type InputProps } from "~/lib/validation/inputs";
import { cn } from "~/lib/utils";

export function InputBuilder<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & {
      children: ({
        field,
        fieldState,
        formState,
      }: {
        field: ControllerRenderProps<TFieldValues, TName>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<TFieldValues>;
      }) => React.ReactNode;
      extra?: ({
        field,
        fieldState,
        formState,
      }: {
        field: ControllerRenderProps<TFieldValues, TName>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<TFieldValues>;
      }) => React.ReactNode;
    },
) {
  return (
    <FormField
      {...props}
      render={({ field, fieldState, formState }) => (
        <FormItem className="grid w-full grid-cols-12 items-start justify-end gap-2 space-y-0">
          {!props.noLabel && (
            <FormLabel className="col-span-2 pt-1 text-right capitalize">
              {props.label ?? field.name}
              <br />
              {props.rules?.required && (
                <span className="text-sm font-light text-ui-elements-gray">
                  Required
                </span>
              )}
            </FormLabel>
          )}
          <FormControl
            className={cn(props.noLabel ? "col-span-full" : "col-span-10")}
          >
            <div className="w-full">
              {props.children({ field, fieldState, formState })}
            </div>
          </FormControl>
          {props.extra && (
            <div className="col-start-3">
              {props.extra({ field, formState, fieldState })}
            </div>
          )}
          {props.description && (
            <FormDescription className="col-start-3">
              {props.description}
            </FormDescription>
          )}
          <FormMessage className="col-span-10 col-start-3" />
        </FormItem>
      )}
    />
  );
}
