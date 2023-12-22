import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { type InputProps } from "~/lib/validation/inputs";
import { cn } from "~/lib/utils";
import { OnboardingBuilder } from "./builder";
import { Input } from "~/components/ui/input";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

export function OnboardingCode<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & { length?: number },
) {
  const [focused, setFocused] = useState(false);
  const length = props.length ?? 6;
  const ref = useRef<HTMLInputElement>();
  const validRegex = new RegExp(`^[0-9]{0,${length}}$`);
  const inputWidth = length * 48 + (length - 1) * 8 + 2;

  useEffect(() => {
    if (ref.current) {
      ref.current.width = inputWidth;
    }
  }, [inputWidth]);

  return (
    <OnboardingBuilder {...props}>
      {({ field, fieldState, formState }) => {
        return (
          <div className="relative flex flex-row items-start justify-start gap-2">
            <Input
              {...field}
              ref={(node) => {
                if (node) {
                  ref.current = node;
                  field.ref(node);
                }
              }}
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
                field.onBlur();
              }}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const cleanedUp = event.target.value.replaceAll(/[^0-9]/g, "");

                if (validRegex.test(cleanedUp)) {
                  field.onChange(cleanedUp);
                }

                if (cleanedUp.length === length + 1) {
                  field.onChange(
                    cleanedUp.substring(0, length - 1) + cleanedUp[length],
                  );
                }
              }}
              onKeyDown={(event) => {
                if (
                  ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
                    event.key,
                  )
                ) {
                  event.preventDefault();
                }
              }}
              width={inputWidth}
              style={{
                width: inputWidth,
              }}
              placeholder={props.placeholder}
              type="text"
              className={cn(
                "absolute inset-0 box-border border-transparent bg-transparent text-transparent caret-transparent outline-transparent",
                "selection:hidden",
                "focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 active:border-0 active:ring-0",
                "h-12",
              )}
            />
            {[
              Array.from({ length }, (_, i) => i).map((i) => {
                const isInFocus =
                  typeof field.value === "string" &&
                  (field.value.length === i ||
                    (field.value.length === i + 1 && length === i + 1)) &&
                  focused;
                const isInactive =
                  typeof field.value === "string" && i > field.value.length;

                return (
                  <div
                    key={i}
                    className={cn(
                      "h-12 w-12 rounded-md border border-input bg-background shadow shadow-ui-elements-gray",
                      "flex items-center justify-center text-2xl text-ui-elements-gray",
                      isInFocus &&
                        "ring-2 ring-ring ring-offset-2 ring-offset-background",
                      isInactive && "text-muted-foreground",
                      formState.isValid &&
                        formState.submitCount >= 1 &&
                        "border-primary-pressed bg-primary-light",
                      fieldState.error &&
                        "border-error bg-red-200 text-error-pressed",
                    )}
                    onClick={() => {
                      ref.current?.focus();
                    }}
                  >
                    {field.value[i] ?? ""}
                  </div>
                );
              }),
            ]}
          </div>
        );
      }}
    </OnboardingBuilder>
  );
}
