import { Input } from "../ui/input";

import SearchIcon from "../icons/search-sm.svg";
import XIcon from "../icons/x.svg";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

export function SearchInput({
  placeholder,
  value,
  setValue,
  className,
  inputClassName,
  onEnter,
}: {
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  className?: string;
  inputClassName?: string;
  onEnter?: () => void;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-row items-center justify-start gap-1 rounded-3xl border border-text-gray",
        "px-4 shadow-sm shadow-text-gray focus-within:ring-2",
        className
      )}
    >
      <SearchIcon className="h-5 w-5 text-ui-elements-gray" />
      <Input
        placeholder={placeholder}
        type="search"
        className={cn(
          "rounded-3xl border-none",
          "focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0",
          inputClassName
        )}
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        onKeyDown={({ key }) => {
          if (key === "Enter") {
            onEnter && onEnter();
          }
        }}
      />
      {value && (
        <Button
          variant="outline"
          className="absolute right-4 border-none p-0 hover:bg-transparent"
        >
          <XIcon
            className="h-5 w-5 text-ui-elements-gray"
            onClick={() => setValue("")}
          />
        </Button>
      )}
    </div>
  );
}
