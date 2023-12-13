import { cn } from "~/lib/utils";
import { Switch } from "./ui/switch";

type Props =
  | {
      children: React.ReactNode;
      id: string;
      value: boolean;
      className?: string;
      disabled: true;
    }
  | {
      children: React.ReactNode;
      id: string;
      value: boolean;
      className?: string;
      disabled?: false;
      onChange: (value: boolean) => void;
    };

export function Toggleable(props: Props) {
  return (
    <div
      className={cn(
        "relative w-full rounded-2xl border border-ui-elements-light bg-ui-elements-white p-10 pt-8",
        props.className,
      )}
    >
      <div
        className={cn(
          "absolute right-10 top-8 flex flex-row items-center justify-end gap-2",
          props.disabled && "hidden",
        )}
      >
        <span className="text-xs font-semibold text-ui-elements-black transition-all duration-200">
          Visible for {props.value ? "all users" : "backers"}
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
      </div>
      {props.children}
    </div>
  );
}
