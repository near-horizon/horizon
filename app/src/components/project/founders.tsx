import { useProject } from "~/hooks/projects";
import { type AccountId } from "~/lib/validation/common";
import { Founder } from "./founder";

export function Founders({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProject(accountId);

  const founders = data?.founders ?? [];

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {status === "loading"
        ? ["", "", ""].map((_, i) => (
            <div key={i}>
              <Founder accountId="nearhorizon.near" loading />
            </div>
          ))
        : founders.map((founder) => (
            <div key={founder}>
              <Founder accountId={founder} />
            </div>
          ))}
    </div>
  );
}
