import { Skeleton } from "~/components/ui/skeleton";

export default function AvailableCreditsBannerSkeleton() {
  return (
    <div className="rounded-lg bg-background-beige p-6">
      <div className="text-ui-elements-black">
        <div className="text-sm font-semibold ">Available for spending</div>
        <Skeleton className="h-7 w-full" />
      </div>
    </div>
  );
}
