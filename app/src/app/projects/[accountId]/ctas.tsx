import { Suspense } from "react";
import { QRDialog } from "~/components/qr-dialog";
import { Edit03Svg, MessageChatSquareSvg } from "~/icons";
import { getNewProject } from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";
import { Contribute } from "./contribute";
import { type User } from "~/lib/validation/user";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { env } from "~/env.mjs";

export function CTAs({
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
