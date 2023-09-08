import { useProject } from "~/lib/projects";
import { type AccountId } from "~/lib/validation/common";
import { Detail } from "../detail";

export function Funding({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProject(accountId);

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <Detail
        label="Stage"
        value={data?.stage}
        loading={status === "loading"}
      />
      <Detail
        label="Currently fundraising"
        value={"Not available"}
        loading={status === "loading"}
      />
      <Detail
        label="Funding needed"
        value={"Not available"}
        loading={status === "loading"}
      />
      <Detail
        label="Previously raised"
        value={"Not available"}
        loading={status === "loading"}
      />
    </div>
  );
}
