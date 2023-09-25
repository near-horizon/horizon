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
import { Checkbox } from "../ui/checkbox";

export function CheckboxesInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName> & {
    placeholder?: string;
    description?: string;
    checkboxes: { id: string; text: string }[];
  }
) {
  const checkboxes = props.checkboxes.map((item) => (
    <FormField
      {...props}
      key={item.id}
      render={({ field }) => {
        return (
          <FormItem
            key={item.id}
            className="flex flex-row items-start space-x-3 space-y-0"
          >
            <FormControl>
              <Checkbox
                checked={(field.value as string[]).includes(item.id)}
                onCheckedChange={(checked) => {
                  return checked
                    ? field.onChange([...field.value, item.id])
                    : field.onChange(
                      (field.value as string[]).filter(
                        (value) => value !== item.id
                      )
                    );
                }}
              />
            </FormControl>
            <FormLabel className="font-normal">{item.text}</FormLabel>
          </FormItem>
        );
      }}
    />
  ));

  return (
    <FormField
      {...props}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base capitalize">{props.name}</FormLabel>
            <FormDescription>{props.description}</FormDescription>
          </div>
          {checkboxes}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
