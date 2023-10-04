import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { type InputProps } from "~/lib/validation/inputs";

export function RadioGroupInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & {
      options: { id: string; text: string }[];
    }
) {
  const options = props.options.map((item) => (
    <FormItem className="flex items-center space-x-3 space-y-0" key={item.id}>
      <FormControl>
        <RadioGroupItem value={item.id} />
      </FormControl>
      <FormLabel className="font-normal">{item.text}</FormLabel>
    </FormItem>
  ));

  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{props.description}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {options}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
