import { Description } from "~/components/description";
import { Details } from "~/components/ui/details";
import { getContract } from "~/lib/server/contracts";
import { type AccountId, type CID } from "~/lib/validation/common";

export default async function ContractFeedback({
  params: { projectId, contributorId, cid },
}: {
  params: { projectId: AccountId; contributorId: AccountId; cid: CID };
}) {
  const contract = await getContract([[projectId, cid], contributorId]);

  return (
    <Details
      sections={[
        {
          id: "project",
          title: "Project feedback",
          Content: (
            <Description
              text={contract.project_feedback ?? "No feedback yet"}
            />
          ),
        },
        {
          id: "contributor",
          title: "Contributor feedback",
          Content: (
            <Description text={contract.vendor_feedback ?? "No feedback yet"} />
          ),
        },
      ]}
    />
  );
}
