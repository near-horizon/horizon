"use client";

import Link from "next/link";
import { useProposal } from "~/hooks/proposals";
import { type AccountId, type CID } from "~/lib/validation/common";
import { Icon } from "~/components/icon";
import { Handle } from "~/components/handle";
import { format } from "timeago.js";
import { Description, DescriptionSkeleton } from "~/components/description";
import { useCreateContract, useDeclineProposal } from "~/hooks/contracts";
import { ProgressDialog } from "~/components/progress-dialog";
import { useContributor } from "~/hooks/contributors";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function Proposal({
  projectId,
  cid,
  contributorId,
}: {
  projectId: AccountId;
  cid: CID;
  contributorId: AccountId;
}) {
  const { data, status } = useProposal([[projectId, cid], contributorId]);
  const { data: contributor } = useContributor(contributorId);
  const [acceptProgress, createContract] = useCreateContract();
  const [declineProgress, declineProposal] = useDeclineProposal();

  return (
    <Card className="flex w-full flex-col gap-4 border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex w-full flex-row items-center gap-2">
          <Link
            className="flex flex-row items-center gap-2"
            href={`/contributors/${contributorId}`}
          >
            <Icon
              name={contributor?.name ?? ""}
              image={contributor?.image}
              className="h-8 w-8"
            />
            <Handle accountId={contributorId} />
          </Link>
          <span className="text-sm font-normal text-stone-200">
            {format(data?.creationTx?.timestamp ?? "", "en_US")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {status === "loading" ? (
          <DescriptionSkeleton />
        ) : (
          <Description text={data?.description ?? ""} />
        )}
      </CardContent>
      <CardFooter className="flex w-full flex-row items-center justify-start gap-4">
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
      </CardFooter>
    </Card>
  );
}

export function ProposalSkeleton() {
  return (
    <Card className="flex w-full flex-col gap-4 border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex w-full flex-row items-center gap-2">
          <Link className="flex flex-row items-center gap-2" href="">
            <Icon name="" className="h-8 w-8" />
            <Skeleton className="h-4 w-44" />
          </Link>
          <Skeleton className="h-4 w-24" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DescriptionSkeleton />
      </CardContent>
      <CardFooter className="flex w-full flex-row items-center justify-start gap-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </CardFooter>
    </Card>
  );
}
