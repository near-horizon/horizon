import { Suspense } from "react";
import { Action, ActionSkeleton } from "./activity";
import { getContract } from "~/lib/server/contracts";
import { getContributor } from "~/lib/server/contributors";
import { getProject } from "~/lib/server/projects";
import { getRequest } from "~/lib/server/requests";
import { type AccountId, type CID } from "~/lib/validation/common";
import { type Contract } from "~/lib/validation/contracts";

export default async function ContractActivity({
  params,
}: {
  params: { projectId: AccountId; cid: CID; contributorId: AccountId };
}) {
  const contract = await getContract([
    [params.projectId, params.cid],
    params.contributorId,
  ]);

  return (
    <>
      <Suspense fallback={<ActionSkeleton />}>
        <CompletionAction contract={contract} />
        <DeliveryAction contract={contract} />
      </Suspense>
      <DetailsActions contract={contract} />
      <Suspense
        fallback={
          <>
            <ActionSkeleton />
            <ActionSkeleton />
          </>
        }
      >
        <ResponseAction contract={contract} />
        <CreationAction contract={contract} />
      </Suspense>
    </>
  );
}

async function CreationAction({ contract }: { contract: Contract }) {
  const [[projectId, cid], contributorId] = contract.proposal_id;
  const [project, contributor, request] = await Promise.all([
    getProject(projectId),
    getContributor(contributorId),
    getRequest(projectId, cid),
  ]);

  return (
    <>
      <Action
        description={
          <>
            Awaiting approval by <b>{contributor?.name}</b>
          </>
        }
        time={(contract?.creationTx?.timestamp ?? 0) / 1_000_000}
      />
      <Action
        description={
          <>
            <b>{project?.name}</b> created a contract <b>{request?.title}</b>{" "}
            with <b>{contributor?.name}</b>
          </>
        }
        time={(contract?.creationTx?.timestamp ?? 0) / 1_000_000}
        transactionHash={contract?.creationTx?.hash}
      />
    </>
  );
}

async function ResponseAction({ contract }: { contract: Contract }) {
  const [[projectId, cid], contributorId] = contract.proposal_id;
  const [contributor] = await Promise.all([
    getContributor(contributorId),
    getContract([[projectId, cid], contributorId]),
  ]);

  const isAccepted =
    typeof contract.status === "string" ||
    !("Rejected" in contract.status || "Created" in contract.status);
  const isRejected =
    typeof contract.status === "object" && "Rejected" in contract.status;

  if (isRejected) {
    return (
      <Action
        description={
          <>
            <b>{contributor?.name}</b> rejected the contract
          </>
        }
        time={(contract?.rejectionTx?.timestamp ?? 0) / 1_000_000}
        transactionHash={contract?.rejectionTx?.hash}
      />
    );
  }

  if (isAccepted) {
    return (
      <>
        <Action
          description="Contract has started"
          time={(contract?.acceptanceTx?.timestamp ?? 0) / 1_000_000}
        />
        <Action
          description={
            <>
              <b>{contributor?.name}</b> accepted the contract
            </>
          }
          time={(contract?.acceptanceTx?.timestamp ?? 0) / 1_000_000}
          transactionHash={contract?.acceptanceTx?.hash}
        />
      </>
    );
  }

  return <></>;
}

function DetailsActions({ contract }: { contract: Contract }) {
  return (
    <>
      {contract.actions.map((action, i) => (
        <Action
          description={action.description}
          time={action.start_date.substring(0, 13)}
          transactionHash={
            contract.actionTxs ? contract.actionTxs[i]?.hash : undefined
          }
          key={i}
        />
      ))}
    </>
  );
}

async function DeliveryAction({ contract }: { contract: Contract }) {
  const [, contributorId] = contract.proposal_id;
  const contributor = await getContributor(contributorId);

  const isDelivered = !!contract.deliveryTx;

  if (isDelivered) {
    return (
      <Action
        description={
          <>
            <b>{contributor?.name}</b> delivered the contract
          </>
        }
        time={(contract?.deliveryTx?.timestamp ?? 0) / 1_000_000}
        transactionHash={contract?.deliveryTx?.hash}
      />
    );
  }

  return <></>;
}

async function CompletionAction({ contract }: { contract: Contract }) {
  const [[projectId]] = contract.proposal_id;
  const project = await getProject(projectId);

  const isCompleted =
    typeof contract.status === "object" && "Completed" in contract.status;

  if (isCompleted) {
    return (
      <Action
        description={
          <>
            <b>{project?.name}</b> marked the contract as completed
          </>
        }
        time={(contract?.completionTx?.timestamp ?? 0) / 1_000_000}
        transactionHash={contract?.completionTx?.hash}
      />
    );
  }

  return <></>;
}
