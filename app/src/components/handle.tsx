import { Skeleton } from "~/components/ui/skeleton";
import { useProfile } from "~/hooks/fetching";
import { type AccountId } from "~/lib/validation/common";

export function Handle({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProfile(accountId);

  return (
    <div className="flex max-w-full flex-row flex-wrap items-center justify-start gap-2 overflow-hidden">
      {status === "loading" ? (
        <Skeleton className="h-5 w-48" />
      ) : (
        <b className="max-w-full truncate text-xl font-medium">{data?.name}</b>
      )}
      <span className="max-w-full truncate text-lg font-medium text-gray-400">
        @{accountId}
      </span>
    </div>
  );
}
