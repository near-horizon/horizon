import { Skeleton } from "./ui/skeleton";

export function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-900">{label}</label>
      <div className="flex items-center gap-2">
        <small className="text-sm">{children}</small>
      </div>
    </div>
  );
}

export function DetailSkeleton({ label }: { label: string }) {
  return (
    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-900">{label}</label>
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}
