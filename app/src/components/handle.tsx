import { useProfile } from "~/hooks/fetching";
import { type AccountId } from "~/lib/validation/common";

export function Handle({
  accountId,
  loading = false,
}: {
  accountId: AccountId;
  loading?: boolean;
}) {
  const { data, status } = useProfile(accountId);

  return (
    <div className="flex max-w-md flex-row flex-wrap items-center justify-start gap-2">
      {loading || status === "loading" ? (
        <b className="h-5 w-48 animate-pulse bg-gray-200 text-xl" />
      ) : (
        <b className="truncate text-xl md:max-w-[24ch] lg:max-w-[20ch] 2xl:max-w-[22ch]">
          {data?.name}
        </b>
      )}
      <span className="truncate font-medium text-gray-400 md:max-w-[24ch] lg:max-w-[20ch] 2xl:max-w-[28ch]">
        @{loading ? "nearhorizon.near" : accountId}
      </span>
    </div>
  );
}
