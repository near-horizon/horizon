"use client";

import { Description } from "../description";
import { Detail } from "../detail";
import { formatBudget, formatDate } from "~/lib/utils";
import { useContract } from "~/hooks/contracts";
import Link from "next/link";
import { Icon } from "../icon";
import { Handle } from "../handle";
import { useProposal } from "~/hooks/proposals";
import { useContributor } from "~/hooks/contributors";
import { useProject } from "~/hooks/projects";
import { useRequest } from "~/hooks/requests";
import { Details as UIDetails } from "~/components/ui/details";
import { type AccountId, type CID } from "~/lib/validation/common";

export function Details({
  projectId,
  cid,
  contributorId,
}: {
  projectId: AccountId;
  cid: CID;
  contributorId: AccountId;
}) {
  const { data: contract, status: contractStatus } = useContract([
    [projectId, cid],
    contributorId,
  ]);
  const { data: proposal, status: proposalStatus } = useProposal([
    [projectId, cid],
    contributorId,
  ]);
  const { data: request } = useRequest(projectId, cid);
  const { data: contributor } = useContributor(contributorId);
  const { data: project } = useProject(projectId);

  return (
    <UIDetails
      sections={[
        {
          title: "Details",
          id: "details",
          Content: (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Detail
                label="Contributor"
                value={
                  <Link
                    className="flex w-full items-center gap-2"
                    href={`/contributors/${contributorId}`}
                  >
                    <Icon
                      name={contributor?.name ?? ""}
                      image={contributor?.image}
                      className="h-8 w-8"
                    />
                    <Handle accountId={contributorId} />
                  </Link>
                }
                loading={contractStatus === "loading"}
              />
              <Detail
                label="Project"
                value={
                  <Link
                    className="flex w-full items-center gap-2"
                    href={`/projects/${projectId}`}
                  >
                    <Icon
                      name={project?.name ?? ""}
                      image={project?.image}
                      className="h-8 w-8"
                    />
                    <Handle accountId={projectId} />
                  </Link>
                }
                loading={contractStatus === "loading"}
              />
              <Detail
                label="Price"
                value={formatBudget(contract?.price ?? 0)}
                loading={contractStatus === "loading"}
              />
              <Detail
                label="Payment method"
                value={proposal?.payment_source}
                loading={proposalStatus === "loading"}
              />
              <Detail
                label="Payment type"
                value={proposal?.payment_type}
                loading={proposalStatus === "loading"}
              />
              <Detail
                label="Request type"
                value={proposal?.proposal_type}
                loading={proposalStatus === "loading"}
              />
              <Detail
                label="Deadline"
                value={formatDate(
                  Number((proposal?.end_date ?? "").substring(0, 13))
                )}
                loading={proposalStatus === "loading"}
              />
            </div>
          ),
        },
        {
          title: "Description",
          id: "description",
          Content: (
            <>
              <h2 className="text-2xl font-bold">
                Message from <b>{contributor?.name}</b>
              </h2>
              <Description
                text={proposal?.description ?? ""}
                loading={proposalStatus === "loading"}
                full
              />
            </>
          ),
        },
        {
          title: "Request description",
          id: "request-description",
          Content: (
            <>
              <h2 className="text-2xl font-bold">
                Description by <b>{project?.name}</b>
              </h2>
              <Description
                text={request?.description ?? ""}
                loading={contractStatus === "loading"}
                full
              />
            </>
          ),
        },
      ]}
    />
  );
}
