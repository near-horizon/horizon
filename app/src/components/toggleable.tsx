import { cn } from "~/lib/utils";
import { Switch } from "./ui/switch";

export function Toggleable({
  children,
  value,
  onChange,
  id,
  disabled = false,
}: {
  children: React.ReactNode;
  value: boolean;
  onChange: (value: boolean) => void;
  id: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative w-full rounded-2xl border border-ui-elements-light bg-ui-elements-white p-10 pt-8">
      <div className="absolute right-10 top-8 flex flex-row items-center justify-end gap-2">
        <span
          className={cn(
            "text-xs font-semibold text-ui-elements-black transition-all duration-200",
            {
              "opacity-40": value,
            },
          )}
        >
          Visible for backers
        </span>
        <Switch
          id={id}
          checked={value}
          onCheckedChange={onChange}
          disabled={disabled}
          className="scale-90"
        />
        <span
          className={cn(
            "text-xs font-semibold text-ui-elements-black transition-all duration-200",
            {
              "opacity-40": !value,
            },
          )}
        >
          Visible for all users
        </span>
      </div>
      {children}
    </div>
  );
}
