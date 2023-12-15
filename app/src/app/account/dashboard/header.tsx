import { Suspense } from "react";
import { Handle, HandleSkeleton } from "~/components/handle";
import { Tags, TagsSkeleton } from "~/components/tags";
import { Skeleton } from "~/components/ui/skeleton";
import { ArrowNarrowLeftSvg } from "~/icons";
import { getNewProject } from "~/lib/server/projects";
import { cn, ipfsURL } from "~/lib/utils";
import { type AccountId } from "~/lib/validation/common";
import Link from "next/link";
import { Icon } from "~/components/icon";
import { Cover } from "~/app/projects/[accountId]/cover";
import { Button } from "~/components/ui/button";
import { QRDialog } from "~/components/qr-dialog";

export function Header({ accountId }: { accountId: AccountId }) {
  return (
    <Suspense fallback={<HeaderSkeleton accountId={accountId} />}>
      <HeaderAsync accountId={accountId} />
    </Suspense>
  );
}

async function HeaderAsync({ accountId }: { accountId: AccountId }) {
  const data = await getNewProject(accountId);

  return (
    <div
      className={cn(
        "relative flex flex-col items-start justify-start gap-4 overflow-hidden",
        "rounded-lg border border-ui-elements-light bg-ui-elements-white px-12 pb-8 pt-28",
        "w-full shadow",
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

      <Icon name={data.profile.name} image={data.profile.logo} />

      <div className="flex w-full flex-col items-start justify-start gap-3">
        <div className="flex w-full flex-row items-start justify-between">
          <Handle name={data.profile.name} accountId={accountId} />

          <div className="flex flex-row items-center justify-end gap-4">
            <Link href={`/account/profile`}>
              <Button variant="outline" type="button">
                Edit
              </Button>
            </Link>

            <QRDialog url={`/projects/${accountId}`} />
          </div>
        </div>

        <p className="text-sm font-medium text-ui-elements-dark">
          {data.profile.tagline}
        </p>

        <Tags tags={data.profile.vertical} />
      </div>
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
