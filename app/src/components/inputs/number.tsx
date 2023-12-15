import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Input } from "../ui/input";
import { type InputProps } from "~/lib/validation/inputs";
import { InputBuilder } from "./input-builder";

export function NumberInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseControllerProps<TFieldValues, TName> & InputProps) {
  return (
    <InputBuilder {...props}>
      {({ field }) => (
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
      )}
    </InputBuilder>
  );
}
