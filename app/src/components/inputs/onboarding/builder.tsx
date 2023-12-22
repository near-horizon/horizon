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
} from "~/components/ui/form";
import { type InputProps } from "~/lib/validation/inputs";

export function OnboardingBuilder<
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
        <FormItem className="flex w-full flex-col items-start justify-start gap-1">
          {!props.noLabel && (
            <FormLabel className="text-2xl font-bold text-text-black">
              {props.label ?? field.name}
            </FormLabel>
          )}
          <FormDescription className="flex-grow">
            {props.description}
          </FormDescription>
          <FormControl className="w-full">
            <div className="w-full">
              {props.children({ field, fieldState, formState })}
            </div>
          </FormControl>
          <div className="flex w-full flex-row items-start justify-end">
            {props.extra && (
              <div className="min-w-fit flex-shrink-0">
                {props.extra({ field, formState, fieldState })}
              </div>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
