import { History } from "~/components/project/history";
import { type AccountId } from "~/lib/validation/common";

export default function ProjectHistory({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  return <History accountId={accountId} />;
}
