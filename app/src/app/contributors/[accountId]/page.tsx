import { redirect } from "next/navigation";
import { type AccountId } from "~/lib/validation/common";
import { getContributors } from "~/pages/api/contributors";

export default function ContributorsPage({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  return redirect(`/contributors/${accountId}/overview`);
}

export async function generateStaticParams() {
  const contributorIds = await getContributors({});

  return contributorIds.map((accountId) => ({ accountId }));
}
