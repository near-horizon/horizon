import { redirect } from "next/navigation";
import { hasBacker } from "~/lib/client/backers";
import { getBackersDigest } from "~/lib/server/projects";
import { getUserFromSession } from "~/lib/session";
import { type AccountId } from "~/lib/validation/common";
import { BackersDigest } from "./backers-digest";
import { backersViewFromKey } from "~/lib/constants/backers-digest";

export default async function BackersDigestPage({
  params: { accountId },
  searchParams: { token, from },
}: {
  params: { accountId: AccountId };
  searchParams: { token?: string; from?: string };
}) {
  const user = await getUserFromSession();

  if (!user.logedIn || !!token || !!from) {
    return redirect(`/projects/${accountId}/overview`);
  }

  const [isBacker, backersDigest] = await Promise.all([
    hasBacker(user.accountId),
    getBackersDigest(accountId),
  ]);
  const isOwner = user.accountId === accountId;
  const isPublished = !!backersDigest.published;
  const hasToken = !!token && token === backersDigest.token;
  const isFromBackerView = !!from && from === backersViewFromKey;
  const hasPermission =
    isOwner || (isPublished && (isBacker || hasToken || isFromBackerView));

  if (!hasPermission) {
    return redirect(`/projects/${accountId}/overview`);
  }

  return <BackersDigest accountId={accountId} />;
}
