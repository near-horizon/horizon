import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Input } from "../ui/input";
import { type InputProps } from "~/lib/validation/inputs";
import { InputBuilder } from "./input-builder";

export function TextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseControllerProps<TFieldValues, TName> & InputProps) {
  return (
    <InputBuilder {...props}>
      {({ field }) => (
        <Input {...field} placeholder={props.placeholder} type="text" />
      )}
    </InputBuilder>
  );
}
