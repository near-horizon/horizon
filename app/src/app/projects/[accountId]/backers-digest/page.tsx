import { redirect } from "next/navigation";
import { hasBacker } from "~/lib/backers";
import { getBackersDigest } from "~/lib/server/projects";
import { getUserFromSession } from "~/lib/session";
import { type AccountId } from "~/lib/validation/common";
import { BackersDigest } from "./backers-digest";

export default async function BackersDigestPage({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  const user = await getUserFromSession();

  if (!user) {
    return redirect(`/projects/${accountId}/overview`);
  }

  const isBacker = await hasBacker(user.accountId);
  const backersDigest = await getBackersDigest(user.accountId);
  const hasPermission =
    (isBacker || user.accountId === accountId) && backersDigest.published;

  if (!hasPermission) {
    return redirect(`/projects/${accountId}/overview`);
  }

  return <BackersDigest accountId={accountId} />;
}
