import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import ChevronDown from "../icons/chevron-down.svg";

export function FilterDropdown({
  triggerText,
  selected,
  options,
  onChange,
  getFilteredCount,
}: {
  triggerText: React.ReactNode;
  options: string[];
  onChange: (value: string[]) => void;
  selected: string[];
  getFilteredCount: (value: string[]) => number;
}) {
  const [selectedInner, setSelected] = useState<string[]>(selected);

  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="group">
          {triggerText}
          <ChevronDown
            className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-96 flex-col gap-3 py-3">
        <div className="flex flex-row flex-wrap gap-2 px-3">
          {options.map((option) => (
            <Button
              key={option}
              className="transition-colors duration-300 ease-in-out"
              variant={selectedInner.includes(option) ? "secondary" : "outline"}
              onClick={() => {
                const isSelected = selectedInner.includes(option);
                if (isSelected) {
                  setSelected(selectedInner.filter((o) => o !== option));
                } else {
                  setSelected([...selectedInner, option]);
                }
              }}
            >
              {option}
            </Button>
          ))}
        </div>
        <Separator className="h-px w-full bg-ui-elements-light" />
        <div className="flex flex-row items-center justify-center gap-4 px-3">
          <Button
            variant="destructive"
            onClick={() => {
              setSelected([]);
              onChange([]);
            }}
          >
            Clear filters
          </Button>
          <Button variant="default" onClick={() => onChange(selectedInner)}>
            Show {getFilteredCount(selectedInner)} results
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
