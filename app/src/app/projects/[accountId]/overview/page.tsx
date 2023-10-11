import { Overview } from "~/components/project/overview";
import { type AccountId } from "~/lib/validation/common";

export default function ProjectOverview({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  return <Overview accountId={accountId} />;
}
