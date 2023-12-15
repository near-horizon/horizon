import {
  getNewProject,
  getRequestsForProject,
  hasProject,
} from "~/lib/server/projects";
import { Suspense } from "react";
import { type AccountId } from "~/lib/validation/common";
import { Icon } from "~/components/icon";
import { Handle, HandleSkeleton } from "~/components/handle";
import { Tags, TagsSkeleton } from "~/components/tags";
import { Skeleton } from "~/components/ui/skeleton";
import { ArrowNarrowLeftSvg, Edit03Svg, MessageChatSquareSvg } from "~/icons";
import { Tabs } from "./tabs";
import { notFound } from "next/navigation";
import { Cover } from "./cover";
import { cn, ipfsURL } from "~/lib/utils";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getUserFromSession } from "~/lib/session";
import { QRDialog } from "~/components/qr-dialog";
import { env } from "~/env.mjs";
import { Contribute } from "./contribute";
import { type User } from "~/lib/validation/user";

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

function CTAs({
  user,
  accountId,
  requests,
}: {
  user: User;
  accountId: AccountId;
  requests: { cid: string; title: string }[];
}) {
  const isOwner = user.logedIn && user.accountId === accountId;
  const isContributor =
    user.logedIn && user.hasProfile && user.profileType === "contributor";

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row flex-wrap items-center justify-start gap-3">
        <Contact accountId={accountId} />

        {isContributor && requests.length > 0 && (
          <Contribute
            accountId={accountId}
            user_account_id={user.accountId}
            requests={requests}
          />
        )}

        <QRDialog url={`/projects/${accountId}`} />
      </div>

      {isOwner && (
        <Link href="/account/profile">
          <Button variant="outline" type="button">
            <Edit03Svg className="h-5 w-5" />
            Edit
          </Button>
        </Link>
      )}
    </div>
  );
}

async function ContactAsync({ accountId }: { accountId: AccountId }) {
  const {
    profile: { email },
  } = await getNewProject(accountId);
  return (
    <a
      href={`mailto:${email}?subject=${env.REACHOUT_SUBJECT}&body=${env.REACHOUT_BODY}`}
    >
      <Button
        variant="default"
        className="flex flex-row items-center justify-center gap-2 text-ui-elements-black"
      >
        <MessageChatSquareSvg className="h-4 w-4" />
        Contact
      </Button>
    </a>
  );
}

function Contact({ accountId }: { accountId: AccountId }) {
  return (
    <Suspense
      fallback={
        <a>
          <Button
            variant="default"
            className="flex flex-row items-center justify-center gap-2 text-ui-elements-black"
          >
            <MessageChatSquareSvg className="h-4 w-4" />
            Contact
          </Button>
        </a>
      }
    >
      <ContactAsync accountId={accountId} />
    </Suspense>
  );
}
