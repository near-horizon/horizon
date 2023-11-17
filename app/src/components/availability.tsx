import { cn } from "~/lib/utils";
import { Skeleton } from "./ui/skeleton";

export function Availability({
  available,
  availableText = "Available",
  unavailableText = "Unavailable",
}: {
  available?: boolean;
  availableText?: string;
  unavailableText?: string;
}) {
  if (available === undefined) {
    return <></>;
  }

  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <div
        className={`h-3 w-3 rounded-full ${
          available ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <span
        className={cn(
          "-translate-y-px text-sm font-medium text-gray-400",
          available ? "text-green-500" : "text-red-500"
        )}
      >
        {available ? availableText : unavailableText}
      </span>
    </div>
  );
}

export function AvailabilitySkeleton() {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <Skeleton className="h-3 w-3 rounded-full" />
      <span className="h-3 w-24 rounded-full">
        <Skeleton className="h-3 w-12" />
      </span>
    </div>
  );
}
