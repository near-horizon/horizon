import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { type InputProps } from "~/lib/validation/inputs";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Creatable from "react-select/creatable";
import { cn } from "~/lib/utils";

export function MultiSelectInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & {
      options: string[];
    },
) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="group grid w-full grid-cols-12 items-start justify-end gap-2 space-y-0">
          {!props.noLabel && (
            <FormLabel className="col-span-2 text-right capitalize">
              {props.label ?? field.name}
              {props.rules?.required && " *"}
            </FormLabel>
          )}
          <FormControl
            className={cn(props.noLabel ? "col-span-full" : "col-span-10")}
          >
            <Creatable
              ref={field.ref}
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              placeholder={props.placeholder}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              options={props.options.map((option) => ({
                label: option,
                value: option,
              }))}
              unstyled
              classNames={{
                control: () =>
                  "form-input rounded-lg focus-within:ring border border-input",
                menu: () => "p-2 bg-white shadow-lg rounded-md shadow",
                input: () => "[&>input:focus]:ring-0",
                valueContainer: () => "pl-0 flex flex-row gap-2 flex-wrap",
                multiValue: () => "rounded-lg bg-ui-elements-light p-1",
                multiValueRemove: () =>
                  "hover:bg-destructive rounded-r-lg hover:rounded-r-lg transition-all duration-300 ease-in-out hover:text-white",
                dropdownIndicator: () => "opacity-50",
                placeholder: () => "text-muted-foreground text-sm",
              }}
              hideSelectedOptions
              isClearable
              isSearchable
              isMulti
            />
          </FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage className="col-start-3" />
        </FormItem>
      )}
    />
  );
}
