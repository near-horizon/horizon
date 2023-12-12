import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { type InputProps } from "~/lib/validation/inputs";
import { cn } from "~/lib/utils";
import { InputBuilder } from "./input-builder";

export function SelectInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & {
      options:
        | { value: string; text: string }[]
        | { group: string; options: { value: string; text: string }[] }[];
    },
) {
  const options = props.options.map((option) => {
    if ("group" in option) {
      return (
        <SelectGroup key={option.group}>
          <SelectLabel>{option.group}</SelectLabel>
          {option.options.map(({ value, text }) => (
            <SelectItem key={value} value={value}>
              {text}
            </SelectItem>
          ))}
        </SelectGroup>
      );
    }

    return (
      <SelectItem key={option.value} value={option.value}>
        {option.text}
      </SelectItem>
    );
  });

  return (
    <InputBuilder {...props}>
      {({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger
            className={cn({
              "[&>span]:text-muted-foreground": !field.value,
            })}
          >
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>
          <SelectContent>{options}</SelectContent>
        </Select>
      )}
    </InputBuilder>
  );
}
