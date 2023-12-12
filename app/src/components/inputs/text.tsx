import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Input } from "../ui/input";
import { type InputProps } from "~/lib/validation/inputs";
import { InputBuilder } from "./input-builder";
import { cn } from "~/lib/utils";

export function TextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseControllerProps<TFieldValues, TName> & InputProps) {
  return (
    <InputBuilder {...props}>
      {({ field, fieldState }) => (
        <Input
          {...field}
          placeholder={props.placeholder}
          type="text"
          className={cn(
            fieldState.error && "ring ring-destructive ring-offset-2",
          )}
        />
      )}
    </InputBuilder>
  );
}
