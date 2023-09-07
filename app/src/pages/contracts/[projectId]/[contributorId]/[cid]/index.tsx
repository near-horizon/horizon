import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { z } from "zod";
import { Availability } from "~/components/availability";
import { Activity } from "~/components/contract/activity";
import { Details } from "~/components/contract/details";
import ContentTabs from "~/components/ui/content-tabs";
import { withSSRSession } from "~/lib/auth";
import { useContract } from "~/lib/contracts";
import { useRequest } from "~/lib/requests";
import { accountIdSchema, cidSchema, removeEmpty } from "~/lib/utils";
import { getContract } from "~/pages/api/contracts/[projectId]/[contributorId]/[cid]";
import { getContributor } from "~/pages/api/contributors/[accountId]";
import { getProject } from "~/pages/api/projects/[accountId]";
import { getProposal } from "~/pages/api/proposals/[projectId]/[contributorId]/[cid]";
import { getRequest } from "~/pages/api/requests/[accountId]/[cid]";

export default function Contract() {
  const { query } = useRouter();
  const projectId = accountIdSchema.parse(query.projectId);
  const contributorId = accountIdSchema.parse(query.contributorId);
  const cid = cidSchema.parse(query.cid);
  const { data: contract, status } = useContract([
    [projectId, cid],
    contributorId,
  ]);
  const { data: request } = useRequest(projectId, cid);
  const isActive =
    typeof contract?.status === "string" ||
    (!!contract?.status && "Accepted" in contract.status);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold leading-9">
        {status === "loading" ? (
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
      {/* <CTAs accountId={accountId} cid={cid} /> */}

      <ContentTabs
        tabs={[
          {
            id: "activity",
            text: "Activity",
            children: (
              <Activity
                projectId={projectId}
                cid={cid}
                contributorId={contributorId}
              />
            ),
          },
          {
            id: "details",
            text: "Details",
            children: (
              <Details
                projectId={projectId}
                cid={cid}
                contributorId={contributorId}
              />
            ),
          },
          { id: "feedback", text: "Feedback", children: "Feedback here." },
        ]}
        tabRule={z
          .enum(["activity", "details", "feedback"])
          .default("activity")
          .catch("activity")}
      />
    </div>
  );
}

export const getServerSideProps = withSSRSession(async function ({ query }) {
  const queryClient = new QueryClient();
  const projectId = accountIdSchema.parse(query.projectId);
  const contributorId = accountIdSchema.parse(query.contributorId);
  const cid = cidSchema.parse(query.cid);

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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});
