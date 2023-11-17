import { type AccountId } from "~/lib/validation/common";
import { Skeleton } from "./ui/skeleton";

export function Handle({
  accountId,
  name,
}: {
  accountId: AccountId;
  name?: string;
}) {
  return (
    <div className="flex max-w-full flex-row flex-wrap items-center justify-start gap-2 overflow-hidden">
      <b className="max-w-full truncate text-xl font-medium">{name}</b>
      <span className="max-w-full truncate text-lg font-medium text-gray-400">
        @{accountId}
      </span>
    </div>
  );
}

export function HandleSkeleton({ accountId }: { accountId: AccountId }) {
  return (
    <div className="flex max-w-full flex-row flex-wrap items-center justify-start gap-2 overflow-hidden">
      <b className="max-w-full truncate text-xl font-medium">
        <Skeleton className="h-6 w-24" />
      </b>
      <span className="max-w-full truncate text-lg font-medium text-gray-400">
        @{accountId}
      </span>
    </div>
  );
}
