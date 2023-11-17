import Link from "next/link";
import { Description } from "~/components/description";
import { Detail } from "~/components/detail";
import { Handle } from "~/components/handle";
import { Icon } from "~/components/icon";
import { Details } from "~/components/ui/details";
import { getContract } from "~/lib/server/contracts";
import { getContributor } from "~/lib/server/contributors";
import { getProject } from "~/lib/server/projects";
import { getProposal } from "~/lib/server/proposals";
import { getRequest } from "~/lib/server/requests";
import { formatBudget, formatDate } from "~/lib/utils";
import { type AccountId, type CID } from "~/lib/validation/common";

export default async function ContractDetails({
  params: { projectId, contributorId, cid },
}: {
  params: { projectId: AccountId; contributorId: AccountId; cid: CID };
}) {
  const [contract, proposal, request, project, contributor] = await Promise.all(
    [
      getContract([[projectId, cid], contributorId]),
      getProposal([[projectId, cid], contributorId]),
      getRequest(projectId, cid),
      getProject(projectId),
      getContributor(contributorId),
    ]
  );

  return (
    <Details
      sections={[
        {
          title: "Details",
          id: "details",
          Content: (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Detail label="Contributor">
                <Link
                  className="flex w-full items-center gap-2"
                  href={`/contributors/${contributorId}`}
                >
                  <Icon
                    name={contributor.name ?? ""}
                    image={contributor.image}
                    className="h-8 w-8"
                  />
                  <Handle name={contributor.name} accountId={contributorId} />
                </Link>
              </Detail>
              <Detail label="Project">
                <Link
                  className="flex w-full items-center gap-2"
                  href={`/projects/${projectId}`}
                >
                  <Icon
                    name={project.name ?? ""}
                    image={project.image}
                    className="h-8 w-8"
                  />
                  <Handle name={project.name} accountId={projectId} />
                </Link>
              </Detail>
              <Detail label="Price">{formatBudget(contract.price ?? 0)}</Detail>
              <Detail label="Payment method">{proposal.payment_source}</Detail>
              <Detail label="Payment type">{proposal.payment_type}</Detail>
              <Detail label="Request type">{proposal.proposal_type}</Detail>
              <Detail label="Deadline">
                {formatDate(Number((proposal.end_date ?? "").substring(0, 13)))}
              </Detail>
            </div>
          ),
        },
        {
          title: "Description",
          id: "description",
          Content: (
            <>
              <h2 className="text-2xl font-bold">
                Message from <b>{contributor.name}</b>
              </h2>
              <Description text={proposal.description ?? ""} full />
            </>
          ),
        },
        {
          title: "Request description",
          id: "request-description",
          Content: (
            <>
              <h2 className="text-2xl font-bold">
                Description by <b>{project.name}</b>
              </h2>
              <Description text={request.description ?? ""} full />
            </>
          ),
        },
      ]}
    />
  );
}
