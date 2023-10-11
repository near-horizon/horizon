"use client";

import React from "react";
import { useUser } from "~/stores/global";
import { type ContractId } from "~/lib/validation/contracts";
import {
  useAcceptContract,
  useAddContractContributorFeedback,
  useAddContractEvent,
  useAddContractProjectFeedback,
  useCompleteContract,
  useContract,
  useDeliverContract,
  useRejectContract,
} from "~/hooks/contracts";
import { ProgressDialog } from "../progress-dialog";

export function CTAs({
  contractId: [[projectId, cid], contributorId],
}: {
  contractId: ContractId;
}) {
  const user = useUser();
  const { data: contract } = useContract([[projectId, cid], contributorId]);
  const isSignedIn = !!user;
  const isProject = isSignedIn && user.accountId === projectId;
  const isContributor = isSignedIn && user.accountId === contributorId;
  const nonAdmin = isSignedIn && !isProject && !isContributor;
  const [acceptProgress, acceptContract] = useAcceptContract();
  const [rejectProgress, rejectContract] = useRejectContract();
  const [addEventProgress, addEvent] = useAddContractEvent();
  const [deliverProgress, deliverContract] = useDeliverContract();
  const [completeProgress, completeContract] = useCompleteContract();
  const [contributorProgress, addContributorFeedback] =
    useAddContractContributorFeedback();
  const [projectProgress, addProjectFeedback] = useAddContractProjectFeedback();
  const isCompleted = Boolean(
    contract &&
      typeof contract.status !== "string" &&
      "Completed" in contract.status
  );

  const isDelivered = Boolean(
    contract &&
      typeof contract.status !== "string" &&
      "Delivered" in contract.status
  );
  const isRejected = Boolean(
    contract &&
      typeof contract.status !== "string" &&
      "Rejected" in contract.status
  );
  const isAccepted = Boolean(
    contract &&
      typeof contract.status !== "string" &&
      "Accepted" in contract.status
  );
  const isOngoing = Boolean(
    contract &&
      typeof contract.status === "string" &&
      contract.status === "Ongoing"
  );
  const isCreated = Boolean(
    contract &&
      typeof contract.status !== "string" &&
      "Created" in contract.status
  );

  if (nonAdmin) {
    return <></>;
  }

  if (isContributor && isCreated) {
    return (
      <div className="flex flex-row items-center justify-start gap-3">
        <ProgressDialog
          progress={acceptProgress.value}
          title="Accepting contract"
          description={acceptProgress.label}
          triggerText="Accept"
          ctaText="Back to contract"
          ctaLink={`/contracts/${projectId}/${contributorId}/${cid}`}
          onClick={() =>
            acceptContract.mutate({
              proposal_id: [[projectId, cid], contributorId],
            })
          }
        />
        <ProgressDialog
          progress={rejectProgress.value}
          title="Rejecting contract"
          description={rejectProgress.label}
          triggerText="Reject"
          buttonVariant="destructive"
          ctaText="Back to contract"
          ctaLink={`/contracts/${projectId}/${contributorId}/${cid}`}
          onClick={() =>
            rejectContract.mutate({
              proposal_id: [[projectId, cid], contributorId],
            })
          }
        />
      </div>
    );
  }

  if (isProject && (isCreated || isRejected)) {
    return <></>;
  }

  if (isOngoing || isAccepted) {
    return (
      <div className="flex flex-row items-center justify-start gap-3">
        <ProgressDialog
          progress={addEventProgress.value}
          title="Adding event"
          description={addEventProgress.label}
          triggerText="Add event"
          buttonVariant="secondary"
          ctaText="Back to contract"
          ctaLink={`/contracts/${projectId}/${contributorId}/${cid}`}
          onClick={() =>
            addEvent.mutate({
              proposal_id: [[projectId, cid], contributorId],
              description: "",
            })
          }
        />
        {isProject && (
          <ProgressDialog
            progress={completeProgress.value}
            title="Completing contract"
            description={completeProgress.label}
            triggerText="Complete contract"
            ctaText="Back to contract"
            ctaLink={`/contracts/${projectId}/${contributorId}/${cid}`}
            onClick={() =>
              completeContract.mutate({
                proposal_id: [[projectId, cid], contributorId],
              })
            }
          />
        )}
        {isContributor && (
          <ProgressDialog
            progress={deliverProgress.value}
            title="Delivering contract"
            description={deliverProgress.label}
            triggerText="Deliver contract"
            ctaText="Back to contract"
            ctaLink={`/contracts/${projectId}/${contributorId}/${cid}`}
            onClick={() =>
              deliverContract.mutate({
                proposal_id: [[projectId, cid], contributorId],
              })
            }
          />
        )}
      </div>
    );
  }

  if (isCompleted || isDelivered) {
    return (
      <div className="flex flex-row items-center justify-start gap-3">
        {isProject && (
          <ProgressDialog
            progress={contributorProgress.value}
            title="Leaving feedback for contributor"
            description={contributorProgress.label}
            triggerText="Leave feedback for contributor"
            ctaText="Back to contract"
            ctaLink={`/contracts/${projectId}/${contributorId}/${cid}`}
            onClick={() =>
              addContributorFeedback.mutate({
                proposal_id: [[projectId, cid], contributorId],
                feedback: "",
              })
            }
          />
        )}
        {isContributor && (
          <ProgressDialog
            progress={projectProgress.value}
            title="Leaving feedback for project"
            description={projectProgress.label}
            triggerText="Leave feedback for project"
            ctaText="Back to contract"
            ctaLink={`/contracts/${projectId}/${contributorId}/${cid}`}
            onClick={() =>
              addProjectFeedback.mutate({
                proposal_id: [[projectId, cid], contributorId],
                feedback: "",
              })
            }
          />
        )}
      </div>
    );
  }

  return <></>;
}
