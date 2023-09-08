import { type ReactNode } from "react";
import { format } from "timeago.js";
import { useContract } from "~/lib/contracts";
import { useContributor } from "~/lib/contributors";
import { useProject } from "~/lib/projects";
import { useRequest } from "~/lib/requests";
import { type CID, type AccountId } from "~/lib/validation/common";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function Activity({
  projectId,
  cid,
  contributorId,
}: {
  projectId: AccountId;
  cid: CID;
  contributorId: AccountId;
}) {
  const { data: project } = useProject(projectId);
  const { data: contributor } = useContributor(contributorId);
  const { data: contract } = useContract([[projectId, cid], contributorId]);
  const { data: request } = useRequest(projectId, cid);
  const isAccepted =
    contract?.status &&
    (typeof contract.status === "string" ||
      !("Rejected" in contract.status || "Created" in contract.status));
  const isRejected =
    contract?.status &&
    typeof contract.status === "object" &&
    "Rejected" in contract.status;
  const isDelivered = !!contract?.deliveryTx;
  const isCompleted =
    contract?.status &&
    typeof contract.status === "object" &&
    "Completed" in contract.status;

  return (
    <div className="flex flex-col pt-4">
      {isCompleted ? (
        <Action
          description={
            <>
              <b>{project?.name}</b> marked the contract as completed
            </>
          }
          time={(contract?.completionTx?.timestamp ?? 0) / 1_000_000}
          transactionHash={contract?.completionTx?.hash}
        />
      ) : (
        <></>
      )}
      {isDelivered ? (
        <Action
          description={
            <>
              <b>{contributor?.name}</b> delivered the contract
            </>
          }
          time={(contract?.deliveryTx?.timestamp ?? 0) / 1_000_000}
          transactionHash={contract?.deliveryTx?.hash}
        />
      ) : (
        <></>
      )}
      {contract?.actions.map((action, i) => (
        <Action
          description={action.description}
          time={action.start_date.substring(0, 13)}
          transactionHash={
            contract.actionTxs ? contract.actionTxs[i]?.hash : undefined
          }
          key={i}
        />
      ))}
      {isRejected ? (
        <Action
          description={
            <>
              <b>{contributor?.name}</b> rejected the contract
            </>
          }
          time={(contract?.rejectionTx?.timestamp ?? 0) / 1_000_000}
          transactionHash={contract?.rejectionTx?.hash}
        />
      ) : (
        <></>
      )}
      {isAccepted ? (
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
      ) : (
        <></>
      )}
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
    </div>
  );
}

function Action({
  description,
  time,
  transactionHash,
}: {
  description: ReactNode;
  time: string | number;
  transactionHash?: string;
}) {
  return (
    <div className="relative ml-4 flex flex-col items-start justify-start gap-1 border-l-2 border-l-gray-200 pb-6 pl-7 last:border-l-transparent">
      <div className="absolute left-0 top-0 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-green-400">
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33333 8L0 4.59574L1.16667 3.40426L3.33333 5.61702L8.83333 0L10 1.19149L3.33333 8Z"
            fill="white"
          />
        </svg>
      </div>

      <span>{description}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-sm font-normal text-gray-400">
            {format(time, "en_US")}
          </span>
        </TooltipTrigger>
        <TooltipContent side="right">
          {new Date(
            typeof time === "string" ? Number(time) : time
          ).toLocaleString()}
        </TooltipContent>
      </Tooltip>
      {transactionHash ? (
        <small>
          TX:{" "}
          <a
            href={`https://nearblocks.io/txns/${transactionHash}`}
            target="_blank"
            className="cursor-pointer text-blue-500 hover:underline"
          >
            {transactionHash}
          </a>
        </small>
      ) : (
        <></>
      )}
    </div>
  );
}
