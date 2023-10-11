import { Requests } from "~/components/project/requests-tab";
import { type AccountId } from "~/lib/validation/common";

export default function ProjectRequests({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  return <Requests accountId={accountId} />;
}
