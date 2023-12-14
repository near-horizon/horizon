import { getProject, hasProject } from "~/lib/server/projects";
import { Suspense } from "react";
import { type AccountId } from "~/lib/validation/common";
import { Icon } from "~/components/icon";
import { Handle, HandleSkeleton } from "~/components/handle";
import { Tags, TagsSkeleton } from "~/components/tags";
import { Skeleton } from "~/components/ui/skeleton";
import { CTA } from "~/components/ui/cta";
import { ArrowNarrowLeftSvg, MessageChatSquareSvg, Share06Svg } from "~/icons";
import { Tabs } from "./tabs";
import { notFound } from "next/navigation";
import { Cover } from "./cover";
import { cn, ipfsURL } from "~/lib/utils";
import Link from "next/link";

export default async function ProjectPageLayout({
  params: { accountId },
  children,
}: {
  params: { accountId: string };
  children: React.ReactNode;
}) {
  const isProject = await hasProject(accountId);

  if (!isProject) {
    return notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-6">
      <Suspense fallback={<HeaderSkeleton accountId={accountId} />}>
        <Header accountId={accountId} />
      </Suspense>
      <Tabs accountId={accountId} />
      {children}
    </div>
  );
}

async function Header({ accountId }: { accountId: AccountId }) {
  const data = await getProject(accountId);

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
            data.image && "ipfs_cid" in data.image
              ? ipfsURL(data.image.ipfs_cid)
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

      <Icon name={data.name ?? ""} image={data?.image} />

      <div className="flex flex-col items-start justify-start gap-3">
        <Handle name={data.name} accountId={accountId} />

        <p className="text-[14px] font-normal leading-[140%] text-[#101828]">
          {data.tagline}
        </p>

        <Tags tags={data.product_type ?? {}} />
      </div>

      <CTAs />
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

function CTAs() {
  return (
    <div className="flex flex-row flex-wrap items-center justify-start gap-3">
      <CTA
        color="gray"
        icon={<MessageChatSquareSvg className="h-4 w-4" />}
        text="Contact project"
      />
      <CTA
        color="gray"
        icon={<Share06Svg className="h-4 w-4" />}
        text="Share"
      />
    </div>
  );
}
