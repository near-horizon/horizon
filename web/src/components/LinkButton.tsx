import { cn } from "@lib/utils";

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  variant?: "primary" | "secondary";
}

export function LinkButton({
  label,
  variant = "primary",
  href,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        "px-7 py-3 rounded-full text-center text-text-dark font-semibold text-lg w-fit",
        variant === "secondary" ? "border-2 border-black" : "bg-primary"
      )}
      href={href}
      {...props}
    >
      {label}
    </a>
  );
}
