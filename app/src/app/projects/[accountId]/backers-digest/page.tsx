import { redirect } from "next/navigation";
import { hasBacker } from "~/lib/backers";
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
  console.log("after user from session");
  const userOrTokenOrBackerView = !!user || !!token || !!from;

  if (!userOrTokenOrBackerView) {
    return redirect(`/projects/${accountId}/overview`);
  }

  const isBacker = !!user && (await hasBacker(user.accountId));
  console.log("after backer check");
  const backersDigest = await getBackersDigest(accountId);
  console.log("after backers digest");
  const isOwner = !!user && user.accountId === accountId;
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
