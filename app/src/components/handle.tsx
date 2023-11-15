import { type AccountId } from "~/lib/validation/common";

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
