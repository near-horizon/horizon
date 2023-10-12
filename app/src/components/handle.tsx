import { Skeleton } from "~/components/ui/skeleton";
import { useProfile } from "~/hooks/fetching";
import { type AccountId } from "~/lib/validation/common";

export function Handle({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProfile(accountId);

  return (
    <div className="flex max-w-md flex-row flex-wrap items-center justify-start gap-2">
      {status === "loading" ? (
        <Skeleton className="h-5 w-48" />
      ) : (
        <b className="truncate text-xl font-medium md:max-w-[24ch] lg:max-w-[20ch] 2xl:max-w-[22ch]">
          {data?.name}
        </b>
      )}
      <span className="truncate text-lg font-medium text-gray-400 md:max-w-[24ch] lg:max-w-[20ch] 2xl:max-w-[28ch]">
        @{accountId}
      </span>
    </div>
  );
}
