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
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { type Linktree, socialsSchema } from "~/lib/validation/fetching";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Button } from "../ui/button";
import PlusIcon from "~/components/icons/plus.svg";
import XIcon from "~/components/icons/x.svg";

export function SocialProfilesInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputProps) {
  const [socials, setSocials] = useState(
    new Map(
      socialsSchema.options.map((value) => [
        value,
        props.defaultValue ? value in props.defaultValue : value === "telegram",
      ])
    )
  );
  const [socialInputs, setSocialInputs] = useState<Linktree>(
    props.defaultValue ?? { telegram: "" }
  );

  useEffect(() => {
    setSocialInputs(props.defaultValue ?? { telegram: "" });
    setSocials(
      new Map(
        socialsSchema.options.map((value) => [
          value,
          props.defaultValue
            ? value in props.defaultValue
            : value === "telegram",
        ])
      )
    );
  }, [props.defaultValue]);

  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">
            {props.label ?? field.name}
            {props.rules?.required && " *"}
          </FormLabel>
          <FormControl onBlur={field.onBlur}>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              {Object.entries(socialInputs).map(([social, socialValue]) => (
                <SocialInput
                  key={social}
                  options={[
                    social,
                    ...[...socials.entries()]
                      .filter(([, selected]) => !selected)
                      .map(([value]) => value),
                  ]}
                  selectedOption={social}
                  value={socialValue}
                  onOptionChange={(option) => {
                    setSocialInputs((prev) => {
                      prev[option as keyof Linktree] =
                        prev[social as keyof Linktree];
                      delete prev[social as keyof Linktree];
                      const newSocials = { ...prev };
                      field.onChange(newSocials);
                      return newSocials;
                    });
                    setSocials((prev) => {
                      prev.set(option as keyof Linktree, true);
                      prev.set(social as keyof Linktree, false);
                      return new Map(prev);
                    });
                  }}
                  onOptionRemove={() => {
                    setSocialInputs((prev) => {
                      delete prev[social as keyof Linktree];
                      const newSocials = { ...prev };
                      field.onChange(newSocials);
                      return newSocials;
                    });
                    setSocials((prev) => {
                      prev.set(social as keyof Linktree, false);
                      return new Map(prev);
                    });
                  }}
                  onValueChange={(value) => {
                    setSocialInputs((prev) => {
                      prev[social as keyof Linktree] = value;
                      const newSocials = { ...prev };
                      field.onChange(newSocials);
                      return newSocials;
                    });
                  }}
                />
              ))}
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  const next = [...socials.entries()].find(
                    ([, selected]) => !selected
                  )![0];
                  setSocialInputs((prev) => {
                    prev[next] = "";
                    const newSocials = { ...prev };
                    field.onChange(newSocials);
                    return newSocials;
                  });
                  setSocials((prev) => {
                    prev.set(next, true);
                    return new Map(prev);
                  });
                }}
                disabled={[...socials.entries()].every(
                  ([, selected]) => selected
                )}
              >
                <PlusIcon className="h-5 w-5" />
              </Button>
            </div>
          </FormControl>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function SocialInput({
  options,
  selectedOption,
  value,
  onValueChange,
  onOptionChange,
  onOptionRemove,
}: {
  options: string[];
  selectedOption: string;
  value: string;
  onOptionChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onOptionRemove: () => void;
}) {
  return (
    <div className="flex w-full flex-row">
      <Select
        onValueChange={(value) => {
          onOptionChange(value);
        }}
        defaultValue={options[0]}
        value={selectedOption}
      >
        <SelectTrigger className="w-1/6 min-w-[calc(100%/6)] rounded-r-none bg-ui-elements-light capitalize">
          {selectedOption}
        </SelectTrigger>
        <SelectContent>
          {options.map((value) => (
            <SelectItem key={value} value={value} className="capitalize">
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder={value}
        value={value}
        onChange={(e) => {
          onValueChange(e.target.value);
        }}
        type="text"
        className="rounded-l-none border-l-0"
      />
      <Button
        variant="destructive"
        type="button"
        onClick={onOptionRemove}
        className="ml-4"
      >
        <XIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}
