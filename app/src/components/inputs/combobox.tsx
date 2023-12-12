"use client";

import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import { CheckSvg, ChevronDownSvg } from "~/icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { useRef } from "react";
import { type InputProps } from "~/lib/validation/inputs";
import { InputBuilder } from "./input-builder";

export function ComboboxInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName> &
    InputProps & {
      emptyText?: string;
      options: { value: string; text: string }[];
    },
) {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <InputBuilder {...props}>
      {({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-full justify-between rounded-md pr-3",
                !field.value && "text-muted-foreground",
              )}
              ref={ref}
            >
              {field.value
                ? props.options.find((item) => item.value === field.value)?.text
                : "Select option"}
              <ChevronDownSvg className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-0"
            style={{ width: `${ref.current?.clientWidth}px` }}
          >
            <Command>
              <CommandInput placeholder={props.placeholder} />
              <CommandEmpty>{props.emptyText}</CommandEmpty>
              <CommandGroup className="max-h-64">
                {props.options.map((item) => (
                  <CommandItem
                    value={`${item.value}-${item.text}`}
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
                          : "opacity-0",
                      )}
                    />
                    {item.text}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </InputBuilder>
  );
}
