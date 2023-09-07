import Link from "next/link";
import { useProposal } from "~/lib/proposal";
import { type CID, type AccountId } from "~/lib/utils";
import { ProjectIcon } from "./project/icon";
import { Handle } from "./handle";
import { format } from "timeago.js";
import { Description } from "./description";
import { CTA } from "./ui/cta";

export function Proposal({
  projectId,
  cid,
  contributorId,
  loading = false,
}: {
  projectId: AccountId;
  cid: CID;
  contributorId: AccountId;
  loading?: boolean;
}) {
  const { data, status } = useProposal([[projectId, cid], contributorId]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-row items-center gap-2">
        <Link
          className="flex flex-row items-center gap-2"
          href={{
            pathname: "/contributors/[accountId]",
            query: { accountId: contributorId },
          }}
        >
          <ProjectIcon accountId={contributorId} className="h-8 w-8" />
          <Handle accountId={contributorId} />
        </Link>
        <span className="text-stone-200">
          {format(data?.creationTx?.timestamp ?? "", "en_US")}
        </span>
      </div>
      <Description
        text={data?.description ?? ""}
        loading={status === "loading" || loading}
      />
      <div className="flex w-full flex-row items-center justify-start gap-4">
        <CTA icon={<></>} text="Decline" color="gray" />
        <CTA icon={<></>} text="Hire" color="green" />
      </div>
    </div>
  );
}
