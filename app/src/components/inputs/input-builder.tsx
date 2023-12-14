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
            <FormLabel className="col-span-12 pt-1 text-[1rem] font-bold md:col-span-2 md:text-right">
              {props.label ?? field.name}
              <br className="hidden md:block" />
              {props.rules?.required && (
                <span className="ml-2 text-sm font-light text-ui-elements-gray md:ml-0">
                  Required
                </span>
              )}
            </FormLabel>
          )}
          <FormControl
            className={cn(
              props.noLabel ? "col-span-full" : "col-span-full md:col-span-10",
            )}
          >
            <div className="w-full">
              {props.children({ field, fieldState, formState })}
            </div>
          </FormControl>
          <div className="col-span-full flex flex-row items-start justify-between md:col-span-10 md:col-start-3">
            <FormDescription className="flex-grow">
              {props.description}
            </FormDescription>
            {props.extra && (
              <div className="min-w-fit flex-shrink-0">
                {props.extra({ field, formState, fieldState })}
              </div>
            )}
          </div>
          <FormMessage className="col-span-full md:col-span-10 md:col-start-3" />
        </FormItem>
      )}
    />
  );
}
