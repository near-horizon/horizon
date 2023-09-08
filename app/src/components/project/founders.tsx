import { useProject } from "~/lib/projects";
import { type AccountId } from "~/lib/validation/common";
import { Founder } from "./founder";

export function Founders({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProject(accountId);

  const founders = data?.founders ?? [];

  return (
    <div className="flex w-full flex-row flex-wrap items-stretch justify-start gap-6">
      {status === "loading"
        ? ["", "", ""].map((_, i) => (
          <div
            key={i}
            className="w-full md:w-[calc((100%-1.5rem)*.5)] xl:w-[calc((100%-3rem)*.33)]"
          >
            <Founder accountId="nearhorizon.near" loading />
          </div>
        ))
        : founders.map((founder) => (
          <div
            key={founder}
            className="w-full pl-1 md:w-[calc((100%-1.5rem)*.5)] xl:w-[calc((100%-3rem)*.33)]"
          >
            <Founder accountId={founder} />
          </div>
        ))}
    </div>
  );
}
