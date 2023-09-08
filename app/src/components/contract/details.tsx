import { type AccountId, type CID } from "~/lib/validation/common";
import { Description } from "../description";
import { Detail } from "../detail";
import { formatBudget, formatDate } from "~/lib/utils";
import { useContract } from "~/lib/contracts";
import Link from "next/link";
import { ProjectIcon } from "../project/icon";
import { Handle } from "../handle";
import { useProposal } from "~/lib/proposals";
import { useContributor } from "~/lib/contributors";
import { useProject } from "~/lib/projects";
import { useRequest } from "~/lib/requests";
import { Separator } from "../ui/separator";

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
    <div className="flex w-full flex-col gap-4">
      <section className="flex flex-col gap-2 py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Detail
            label="Contributor"
            value={
              <Link
                className="flex w-full items-center gap-2"
                href={{
                  pathname: "/contributors/[accountId]",
                  query: { accountId: contributorId },
                }}
              >
                <ProjectIcon accountId={contributorId} className="h-8 w-8" />
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
                href={{
                  pathname: "/projects/[accountId]",
                  query: { accountId: projectId },
                }}
              >
                <ProjectIcon accountId={projectId} className="h-8 w-8" />
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
      </section>
      <Separator className="h-px w-full bg-gray-300" />
      <section>
        <h2 className="text-2xl font-bold">
          Message from <b>{contributor?.name}</b>
        </h2>
        <Description
          text={proposal?.description ?? ""}
          loading={proposalStatus === "loading"}
          full
        />
      </section>
      <Separator className="h-px w-full bg-gray-300" />
      <section>
        <h2 className="text-2xl font-bold">
          Description by <b>{project?.name}</b>
        </h2>
        <Description
          text={request?.description ?? ""}
          loading={contractStatus === "loading"}
          full
        />
      </section>
    </div>
  );
}
