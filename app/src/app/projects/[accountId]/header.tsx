import { Suspense } from "react";
import { Handle, HandleSkeleton } from "~/components/handle";
import { Tags, TagsSkeleton } from "~/components/tags";
import { Skeleton } from "~/components/ui/skeleton";
import { ArrowNarrowLeftSvg } from "~/icons";
import { getNewProject } from "~/lib/server/projects";
import { getRequestsForProject } from "~/lib/server/projects";
import { getUserFromSession } from "~/lib/session";
import { cn, ipfsURL } from "~/lib/utils";
import { type AccountId } from "~/lib/validation/common";
import { Cover } from "./cover";
import Link from "next/link";
import { Icon } from "~/components/icon";
import { CTAs } from "./ctas";

export function Header({ accountId }: { accountId: AccountId }) {
  return (
    <Suspense fallback={<HeaderSkeleton accountId={accountId} />}>
      <HeaderAsync accountId={accountId} />
    </Suspense>
  );
}

async function HeaderAsync({ accountId }: { accountId: AccountId }) {
  const [data, user, requests] = await Promise.all([
    getNewProject(accountId),
    getUserFromSession(),
    getRequestsForProject(accountId),
  ]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-start justify-start gap-4 overflow-hidden",
        "rounded-lg border border-ui-elements-light bg-ui-elements-white px-12 pb-8 pt-28",
        "shadow",
      )}
    >
      <div className="absolute left-0 top-0 z-0 h-40 w-full">
        <Cover
          url={
            data.profile.logo && "ipfs_cid" in data.profile.logo
              ? ipfsURL(data.profile.logo.ipfs_cid)
              : ""
          }
        />
      </div>

      <Link
        href="/projects"
        className="absolute left-12 top-8 z-10 flex flex-row items-center justify-start gap-2 text-sm font-semibold text-ui-elements-white"
      >
        <ArrowNarrowLeftSvg className="h-5 w-5" />
        Back to projects
      </Link>

      <Icon name={data.profile.name} image={data.profile.logo} />

      <div className="flex flex-col items-start justify-start gap-3">
        <Handle name={data.profile.name} accountId={accountId} />

        <p className="text-sm font-medium text-ui-elements-dark">
          {data.profile.tagline}
        </p>

        <Tags tags={data.profile.vertical} />
      </div>

      <CTAs
        user={user}
        accountId={accountId}
        requests={requests.map(([, cid, title]) => ({ cid, title }))}
      />
    </div>
  );
}

function HeaderSkeleton({ accountId }: { accountId: AccountId }) {
  return (
    <div className="flex flex-row items-center justify-start gap-4">
      <Icon name={accountId} />

      <div className="flex flex-col items-start justify-start gap-3">
        <HandleSkeleton accountId={accountId} />

        <p className="text-[14px] font-normal leading-[140%] text-[#101828]">
          <Skeleton className="h-4 w-48" />
        </p>

        <TagsSkeleton />
      </div>
    </div>
  );
}
