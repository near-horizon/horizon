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
import { cn } from "~/lib/utils";

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
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="grid w-full grid-cols-12 items-start justify-end gap-2 space-y-0">
          {!props.noLabel && (
            <FormLabel className="col-span-2 text-right capitalize">
              {props.label ?? field.name}
              {props.rules?.required && " *"}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl
              className={cn(props.noLabel ? "col-span-full" : "col-span-10")}
            >
              <SelectTrigger
                className={cn({
                  "[&>span]:text-muted-foreground": !field.value,
                })}
              >
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{options}</SelectContent>
          </Select>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage className="col-start-3" />
        </FormItem>
      )}
    />
  );
}
