import { useBacker } from "~/lib/backers";
import { type AccountId } from "~/lib/utils";
import { ProjectIcon } from "../project/icon";
import { Handle } from "../handle";

export function Header({ accountId }: { accountId: AccountId }) {
  const { data, status } = useBacker(accountId);

  return (
    <div className="flex flex-row items-center justify-start gap-4">
      <ProjectIcon accountId={accountId} />

      <div className="flex flex-col items-start justify-start gap-3">
        <Handle accountId={accountId} />

        {status === "loading" ? (
          <b className="block h-5 w-40 animate-pulse bg-gray-400" />
        ) : (
          <p className="text-[14px] font-normal leading-[140%] text-[#101828]">
            {data?.tagline}
          </p>
        )}
      </div>
    </div>
  );
}
