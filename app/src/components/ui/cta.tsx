import { cn } from "~/lib/utils";

export function CTA({
  onClick,
  text,
  icon,
  color,
}: {
  onClick?: React.MouseEventHandler;
  text: string;
  icon: React.ReactNode;
  color: "green" | "gray";
}) {
  return (
    <button
      className={cn(
        "flex flex-row items-center justify-center gap-2 rounded-2xl border px-3 py-1 font-medium transition duration-300",
        color === "green"
          ? "border-green-400 bg-green-400 text-[#11181c]"
          : "border-gray-300 bg-neutral-200 text-[#006ADC] hover:bg-neutral-300",
      )}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}
