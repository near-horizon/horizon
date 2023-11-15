"use client";

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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import { ArrowDownSvg, CheckSvg } from "~/icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { useRef } from "react";
import { type InputProps } from "~/lib/validation/inputs";

export function ComboboxInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & {
      emptyText?: string;
      options: { value: string; text: string }[];
    }
) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="flex flex-col" ref={ref} onBlur={field.onBlur}>
          <FormLabel className="capitalize">
            {props.label ?? props.name}
            {props.rules?.required && " *"}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between rounded-md",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? props.options.find((item) => item.value === field.value)
                        ?.text
                    : "Select option"}
                  <ArrowDownSvg className="h-6 w-6 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="p-0"
              style={{ width: `${ref.current?.clientWidth}px` }}
            >
              <Command>
                <CommandInput placeholder={props.placeholder} />
                <CommandEmpty>{props.emptyText}</CommandEmpty>
                <CommandGroup>
                  {props.options.map((item) => (
                    <CommandItem
                      value={item.value}
                      key={item.value}
                      onSelect={() => {
                        field.onChange({ target: { value: item.value } });
                      }}
                    >
                      <CheckSvg
                        className={cn(
                          "mr-2 h-6 w-6",
                          item.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {item.text}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
