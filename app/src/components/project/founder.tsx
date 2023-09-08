import { useProfile } from "~/lib/fetching";
import { type AccountId } from "~/lib/validation/common";
import { FounderIcon } from "../founder/icon";
import { Socials } from "../socials";

export function Founder({
  accountId,
  loading = false,
}: {
  accountId: AccountId;
  loading?: boolean;
}) {
  const { data, status } = useProfile(accountId, !loading);

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-4 rounded-2xl bg-gray-200 px-4 py-6 shadow-md shadow-gray-400">
      <FounderIcon accountId={accountId} loading={loading} size="large" />
      <a
        className="flex flex-col items-center justify-start gap-2"
        href={
          loading
            ? ""
            : `https://near.org/near/widget/ProfilePage?accountId=${accountId}`
        }
        target="_blank"
        referrerPolicy="origin"
      >
        {status === "loading" || loading ? (
          <b className="block h-4 w-full animate-pulse bg-gray-200" />
        ) : (
          <b>{data?.name}</b>
        )}
        {status === "loading" || loading ? (
          <b className="block h-4 w-full animate-pulse bg-gray-200" />
        ) : (
          <span>{accountId}</span>
        )}
      </a>
      <Socials links={data?.linktree} loading={loading} />
    </div>
  );
}
