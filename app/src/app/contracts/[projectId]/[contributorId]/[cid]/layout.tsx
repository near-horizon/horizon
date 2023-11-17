import ContentTabs from "~/components/ui/content-tabs";
import { Availability, AvailabilitySkeleton } from "~/components/availability";
import { EndedActions, OngoingCTAs, ReponseCTAs } from "./ctas";
import { getContract } from "~/lib/server/contracts";
import { getRequest } from "~/lib/server/requests";
import { Suspense } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { type AccountId, type CID } from "~/lib/validation/common";
import { getUserFromSession } from "~/lib/session";

export default function ContractPageLayout({
  params: { projectId, cid, contributorId },
  children,
}: {
  params: { projectId: AccountId; cid: CID; contributorId: AccountId };
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-row rounded-xl border border-ui-elements-light bg-background-white p-12 pt-6 shadow">
      <div className="flex w-full flex-col gap-6">
        <Suspense
          fallback={
            <h1 className="text-2xl font-bold leading-9">
              <Skeleton className="h-6 w-48" />
            </h1>
          }
        >
          <Title projectId={projectId} cid={cid} />
        </Suspense>
        <Suspense fallback={<AvailabilitySkeleton />}>
          <AvailabilitySection
            projectId={projectId}
            cid={cid}
            contributorId={contributorId}
          />
        </Suspense>
        <Suspense fallback={<></>}>
          <CTAs projectId={projectId} cid={cid} contributorId={contributorId} />
        </Suspense>
        <ContentTabs
          tabs={[
            {
              id: "activity",
              text: "Activity",
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
  );
}

async function Title({ projectId, cid }: { projectId: AccountId; cid: CID }) {
  const request = await getRequest(projectId, cid);

  return <h1 className="text-2xl font-bold leading-9">{request.title}</h1>;
}

async function AvailabilitySection({
  projectId,
  cid,
  contributorId,
}: {
  projectId: AccountId;
  cid: CID;
  contributorId: AccountId;
}) {
  const contract = await getContract([[projectId, cid], contributorId]);
  const isActive =
    typeof contract.status === "string" || "Accepted" in contract.status;

  return (
    <Availability
      available={isActive}
      availableText="Active"
      unavailableText={
        typeof contract?.status === "object"
          ? Object.keys(contract?.status).at(0)
          : ""
      }
    />
  );
}

async function CTAs({
  projectId,
  cid,
  contributorId,
}: {
  projectId: AccountId;
  cid: CID;
  contributorId: AccountId;
}) {
  const user = await getUserFromSession();
  const contract = await getContract([[projectId, cid], contributorId]);
  const isSignedIn = !!user;
  const isProject = isSignedIn && user.accountId === projectId;
  const isContributor = isSignedIn && user.accountId === contributorId;
  const nonAdmin = isSignedIn && !isProject && !isContributor;

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
      <ReponseCTAs
        projectId={projectId}
        cid={cid}
        contributorId={contributorId}
      />
    );
  }

  if (isProject && (isCreated || isRejected)) {
    return <></>;
  }

  if (isOngoing || isAccepted) {
    return (
      <OngoingCTAs
        projectId={projectId}
        cid={cid}
        contributorId={contributorId}
        isContributor={isContributor}
        isProject={isProject}
      />
    );
  }

  if (isCompleted || isDelivered) {
    return (
      <EndedActions
        projectId={projectId}
        cid={cid}
        contributorId={contributorId}
        isContributor={isContributor}
        isProject={isProject}
      />
    );
  }

  return <></>;
}
