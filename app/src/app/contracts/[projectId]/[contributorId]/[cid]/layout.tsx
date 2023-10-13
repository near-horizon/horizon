import { Hydrate, type QueryClient, dehydrate } from "@tanstack/react-query";
import getQueryClient from "~/app/query-client";
import { removeEmpty } from "~/lib/utils";
import ContentTabs from "~/components/ui/content-tabs";
import { type Request } from "~/lib/validation/requests";
import { Availability } from "~/components/availability";
import { type Contract } from "~/lib/validation/contracts";
import { CTAs } from "~/components/contract/ctas";
import { getContract } from "~/lib/server/contracts";
import { getRequest } from "~/lib/server/requests";
import { getProposal } from "~/lib/server/proposals";
import { getProject } from "~/lib/server/projects";
import { getContributor } from "~/lib/server/contributors";

export default async function ContractPageLayout({
  params: { projectId, cid, contributorId },
  children,
}: {
  params: { projectId: string; cid: string; contributorId: string };
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  await prefetch(projectId, cid, contributorId, queryClient);
  const request = queryClient.getQueryData<Request>([
    "request",
    projectId,
    cid,
  ]);
  const contract = queryClient.getQueryData<Contract>([
    "contract",
    [[projectId, cid], contributorId],
  ]);
  const isActive =
    typeof contract?.status === "string" ||
    (!!contract?.status && "Accepted" in contract.status);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <div className="flex w-full flex-row">
        <div className="flex w-full flex-col gap-6">
          <h1 className="text-2xl font-bold leading-9">
            {!request ? (
              <b className="block h-4 w-28 animate-pulse bg-gray-200" />
            ) : (
              request?.title
            )}
          </h1>
          <Availability
            available={isActive}
            availableText="Active"
            unavailableText={
              typeof contract?.status === "object"
                ? Object.keys(contract?.status).at(0)
                : ""
            }
          />
          <CTAs contractId={[[projectId, cid], contributorId]} />
          <ContentTabs
            tabs={[
              {
                id: "activity",
                text: "activity",
                href: `/contracts/${projectId}/${contributorId}/${cid}/activity`,
              },
              {
                id: "details",
                text: "Details",
                href: `/contracts/${projectId}/${contributorId}/${cid}/details`,
              },
              {
                id: "feedback",
                text: "Feedback",
                href: `/contracts/${projectId}/${contributorId}/${cid}/feedback`,
              },
            ]}
          />
          {children}
        </div>
      </div>
    </Hydrate>
  );
}

async function prefetch(
  projectId: string,
  cid: string,
  contributorId: string,
  queryClient: QueryClient
) {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["contract", [[projectId, cid], contributorId]],
      queryFn: async () => {
        const c = await getContract([[projectId, cid], contributorId]);
        return removeEmpty(c);
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["request", projectId, cid],
      queryFn: async () => {
        const r = await getRequest(projectId, cid);
        return removeEmpty(r);
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["proposal", [[projectId, cid], contributorId]],
      queryFn: async () => {
        const c = await getProposal([[projectId, cid], contributorId]);
        return removeEmpty(c);
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["project", projectId],
      queryFn: async () => {
        const c = await getProject(projectId);
        return removeEmpty(c);
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["contributor", contributorId],
      queryFn: async () => {
        const c = await getContributor(contributorId);
        return removeEmpty(c);
      },
    }),
  ]);
}
