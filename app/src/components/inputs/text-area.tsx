import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { type InputProps } from "~/lib/validation/inputs";
import { InputBuilder } from "./input-builder";
import { cn } from "~/lib/utils";

export function TextAreaInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & { maxLength?: number },
) {
  return (
    <InputBuilder
      {...props}
      extra={({ field }) =>
        props.maxLength && (
          <span className="ml-3 flex w-full flex-row items-start justify-end pr-3 text-xs text-text-gray">
            {props.maxLength -
              (typeof field.value === "string" ? field.value : "").length}{" "}
            characters left
          </span>
        )
      }
    >
      {({ field, fieldState }) => (
        <Textarea
          {...field}
          placeholder={props.placeholder}
          className={cn(
            fieldState.error && "ring ring-destructive ring-offset-2",
          )}
        />
      )}
    </InputBuilder>
  );
}
