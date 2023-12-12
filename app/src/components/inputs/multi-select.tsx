import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { type InputProps } from "~/lib/validation/inputs";
import Creatable from "react-select/creatable";
import { InputBuilder } from "./input-builder";
import { cn } from "~/lib/utils";

function mapOptions(options: string[]) {
  return options.map((value) => ({
    label: value,
    value,
  }));
}

export function MultiSelectInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & { options: string[] },
) {
  return (
    <InputBuilder {...props}>
      {({ field, fieldState }) => (
        <Creatable
          instanceId={field.name}
          ref={field.ref}
          name={field.name}
          value={
            field.value &&
            Array.isArray(field.value) &&
            typeof field.value[0] === "string"
              ? mapOptions(field.value)
              : field.value
          }
          onBlur={field.onBlur}
          onChange={(v) => field.onChange(v.map((v) => v.value))}
          placeholder={props.placeholder}
          options={mapOptions(props.options)}
          unstyled
          classNames={{
            control: () =>
              cn(
                "form-input rounded-lg focus-within:ring border border-input",
                fieldState.error && "ring ring-offset-2 ring-destructive",
              ),
            menu: () => "p-2 bg-white shadow-lg rounded-md shadow",
            input: () => "[&>input:focus]:ring-0",
            valueContainer: () => "pl-0 flex flex-row gap-2 flex-wrap",
            multiValue: () => "rounded-lg bg-ui-elements-light p-1",
            multiValueRemove: () =>
              "hover:bg-destructive rounded-r-lg hover:rounded-r-lg transition-all duration-300 ease-in-out hover:text-white",
            dropdownIndicator: () => "opacity-50 w-4 h-4",
            placeholder: () => "text-muted-foreground text-sm",
          }}
          hideSelectedOptions
          isClearable
          isSearchable
          isMulti
        />
      )}
    </InputBuilder>
  );
}
