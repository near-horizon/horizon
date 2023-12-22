import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { type InputProps } from "~/lib/validation/inputs";
import { cn } from "~/lib/utils";
import { OnboardingBuilder } from "./builder";
import { Input } from "~/components/ui/input";

export function OnboardingEmail<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseControllerProps<TFieldValues, TName> & InputProps) {
  return (
    <OnboardingBuilder {...props}>
      {({ field, fieldState }) => (
        <Input
          {...field}
          placeholder={props.placeholder}
          type="email"
          className={cn(
            fieldState.error && "ring ring-destructive ring-offset-2",
          )}
        />
      )}
    </OnboardingBuilder>
  );
}
