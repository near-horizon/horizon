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
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { type InputProps } from "~/lib/validation/inputs";

export function SelectInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & {
      options:
        | { value: string; text: string }[]
        | { group: string; options: { value: string; text: string }[] }[];
    }
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
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">
            {props.label ?? field.name}
            {props.rules?.required && " *"}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{options}</SelectContent>
          </Select>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
