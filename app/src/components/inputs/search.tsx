import { Input } from "../ui/input";

import SearchIcon from "../icons/search-sm.svg";
import { cn } from "~/lib/utils";

export function SearchInput({
  placeholder,
  value,
  setValue,
  className,
  inputClassName,
}: {
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  className?: string;
  inputClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-start gap-1 rounded-3xl border border-text-gray",
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
      />
    </div>
  );
}
