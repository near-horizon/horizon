import ContentTabs from "~/components/ui/content-tabs";
import { getUserFromSession } from "~/lib/session";
import {
  checkBackersDigestPermission,
  getProject,
} from "~/lib/server/projects";
import { Suspense } from "react";
import { type AccountId } from "~/lib/validation/common";
import { Icon } from "~/components/icon";
import { Handle, HandleSkeleton } from "~/components/handle";
import { Tags, TagsSkeleton } from "~/components/tags";
import { Skeleton } from "~/components/ui/skeleton";
import { CTA } from "~/components/ui/cta";
import { MessageChatSquareSvg, Share06Svg } from "~/icons";
import { Tabs } from "./tabs";
import { backersViewFromKey } from "~/lib/constants/backers-digest";

export default async function ProjectPageLayout({
  params: { accountId },
  children,
}: {
  params: { accountId: string };
  children: React.ReactNode;
}) {
  const user = await getUserFromSession();

  const hasPermission = await checkBackersDigestPermission(accountId, user);

  return (
    <div className="flex w-full flex-row rounded-xl border border-ui-elements-light bg-white px-8 py-6 shadow">
      <div className="flex w-full flex-col gap-6">
        <Suspense fallback={<HeaderSkeleton accountId={accountId} />}>
          <Header accountId={accountId} />
        </Suspense>
        <CTAs />
        <Tabs
          accountId={accountId}
          backersViewFromKey={backersViewFromKey}
          hasPermission={hasPermission}
        />
        {children}
      </div>
    </div>
  );
}

async function Header({ accountId }: { accountId: AccountId }) {
  const data = await getProject(accountId);

  return (
    <div className="flex flex-row items-center justify-start gap-4">
      <Icon name={data.name ?? ""} image={data?.image} />

      <div className="flex flex-col items-start justify-start gap-3">
        <Handle name={data.name} accountId={accountId} />

        <p className="text-[14px] font-normal leading-[140%] text-[#101828]">
          {data.tagline}
        </p>

        <Tags tags={data.product_type ?? {}} />
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
