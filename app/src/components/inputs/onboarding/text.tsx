import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { type InputProps } from "~/lib/validation/inputs";
import { cn } from "~/lib/utils";
import { OnboardingBuilder } from "./builder";
import { Input } from "~/components/ui/input";

export function OnboardingText<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & {
      maxLength?: number;
    },
) {
  return (
    <OnboardingBuilder
      {...props}
      extra={({ field }) =>
        props.maxLength && (
          <span className="flex w-full flex-row items-start justify-end pl-3 pr-3 text-xs text-text-gray">
            {props.maxLength -
              (typeof field.value === "string" ? field.value : "").length}{" "}
            characters left
          </span>
        )
      }
    >
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
    </OnboardingBuilder>
  );
}
