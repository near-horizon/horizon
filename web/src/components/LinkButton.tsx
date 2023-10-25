import { cn } from "../lib/utils";

export function LinkButton({
  label,
  variant = "primary",
  href,
}: {
  label: string;
  variant?: "primary" | "secondary";
  href: string;
}) {
  return (
    <a
      className={cn(
        "px-7 py-3 rounded-full text-center text-text-dark font-semibold text-lg w-fit",
        variant === "secondary" ? "border-2 border-black" : "bg-primary"
      )}
      href={href}
    >
      {label}
    </a>
  );
}
