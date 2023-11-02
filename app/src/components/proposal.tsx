import Link from "next/link";
import { useProposal } from "~/hooks/proposals";
import { type AccountId, type CID } from "~/lib/validation/common";
import { ProjectIcon } from "./project/icon";
import { Handle } from "./handle";
import { format } from "timeago.js";
import { Description } from "./description";
import { useCreateContract, useDeclineProposal } from "~/hooks/contracts";
import { ProgressDialog } from "./progress-dialog";

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
  const [acceptProgress, createContract] = useCreateContract();
  const [declineProgress, declineProposal] = useDeclineProposal();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-row items-center gap-2">
        <Link
          className="flex flex-row items-center gap-2"
          href={`/contributors/${contributorId}`}
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
        <ProgressDialog
          progress={declineProgress.value}
          title="Declining Proposal"
          description={declineProgress.label}
          triggerText="Decline"
          ctaLink={`/requests/${projectId}/${cid}`}
          ctaText="Back to request"
          buttonVariant="destructive"
          onClick={() => {
            declineProposal.mutate({
              proposal_id: [[projectId, cid], contributorId],
            });
          }}
        />
        <ProgressDialog
          progress={acceptProgress.value}
          title="Creating Contract"
          description={acceptProgress.label}
          triggerText="Hire"
          ctaLink={`/contracts/${projectId}/${contributorId}/${cid}`}
          ctaText="View Contract"
          onClick={() => {
            createContract.mutate({
              proposal_id: [[projectId, cid], contributorId],
            });
          }}
        />
      </div>
    </div>
  );
}
