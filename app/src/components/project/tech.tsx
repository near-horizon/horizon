import { useProject } from "~/hooks/projects";
import { type AccountId } from "~/lib/validation/common";
import { Detail } from "../detail";

export function Tech({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProject(accountId);

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <Detail
        label="Integration with NEAR"
        value={data?.integration}
        loading={status === "loading"}
      />
      <Detail
        label="Development phase"
        value={data?.dev}
        loading={status === "loading"}
      />
      <Detail
        label="Mainnet launched"
        value={data?.dev === "mainnet"}
        loading={status === "loading"}
      />
      <Detail
        label="Open source"
        value={data?.distribution === "open-source"}
        loading={status === "loading"}
      />
    </div>
  );
}
