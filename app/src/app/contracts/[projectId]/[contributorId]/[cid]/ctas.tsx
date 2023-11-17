"use client";

import React from "react";
import {
  useAcceptContract,
  useAddContractContributorFeedback,
  useAddContractEvent,
  useAddContractProjectFeedback,
  useCompleteContract,
  useDeliverContract,
  useRejectContract,
} from "~/hooks/contracts";
import { ProgressDialog } from "~/components/progress-dialog";
import { type AccountId, type CID } from "~/lib/validation/common";

export function ReponseCTAs({
  projectId,
  cid,
  contributorId,
}: {
  projectId: AccountId;
  cid: CID;
  contributorId: AccountId;
}) {
  const [acceptProgress, acceptContract] = useAcceptContract();
  const [rejectProgress, rejectContract] = useRejectContract();

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

export function OngoingCTAs({
  projectId,
  cid,
  contributorId,
  isContributor,
  isProject,
}: {
  projectId: AccountId;
  cid: CID;
  contributorId: AccountId;
  isContributor: boolean;
  isProject: boolean;
}) {
  const [addEventProgress, addEvent] = useAddContractEvent();
  const [deliverProgress, deliverContract] = useDeliverContract();
  const [completeProgress, completeContract] = useCompleteContract();

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

export function EndedActions({
  projectId,
  cid,
  contributorId,
  isContributor,
  isProject,
}: {
  projectId: AccountId;
  cid: CID;
  contributorId: AccountId;
  isContributor: boolean;
  isProject: boolean;
}) {
  const [contributorProgress, addContributorFeedback] =
    useAddContractContributorFeedback();
  const [projectProgress, addProjectFeedback] = useAddContractProjectFeedback();

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
