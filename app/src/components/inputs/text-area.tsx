import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { type InputProps } from "~/lib/validation/inputs";
import { InputBuilder } from "./input-builder";

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
          <span className="ml-3 text-text-gray">
            {props.maxLength -
              (typeof field.value === "string" ? field.value : "").length}{" "}
            characters left
          </span>
        )
      }
    >
      {({ field }) => <Textarea {...field} placeholder={props.placeholder} />}
    </InputBuilder>
  );
}
