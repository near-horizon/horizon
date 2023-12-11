import { cn } from "~/lib/utils";
import { Switch } from "./ui/switch";

type Props =
  | {
      children: React.ReactNode;
      id: string;
      disabled: true;
      value: boolean;
    }
  | {
      children: React.ReactNode;
      value: boolean;
      onChange: (value: boolean) => void;
      id: string;
      disabled: false;
    };

export function Toggleable(props: Props) {
  return (
    <div className="relative w-full rounded-2xl border border-ui-elements-light bg-ui-elements-white p-10 pt-8">
      <div className="absolute right-10 top-8 flex flex-row items-center justify-end gap-2">
        <span
          className={cn(
            "text-xs font-semibold text-ui-elements-black transition-all duration-200",
            {
              "opacity-40": props.value,
            },
          )}
        >
          Visible for backers
        </span>
        <Switch
          id={props.id}
          checked={props.value}
          {...(props.disabled
            ? { disabled: true }
            : { disabled: false, onCheckedChange: props.onChange })}
          disabled={props.disabled}
          className="scale-90"
        />
        <span
          className={cn(
            "text-xs font-semibold text-ui-elements-black transition-all duration-200",
            {
              "opacity-40": !props.value,
            },
          )}
        >
          Visible for all users
        </span>
      </div>
      {props.children}
    </div>
  );
}
