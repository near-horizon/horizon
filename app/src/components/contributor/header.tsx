import { type AccountId } from "~/lib/validation/common";
import { ProjectIcon } from "../project/icon";
import { Handle } from "../handle";
import { useContributor } from "~/lib/contributors";

export function Header({ accountId }: { accountId: AccountId }) {
  const { data, status } = useContributor(accountId);

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
