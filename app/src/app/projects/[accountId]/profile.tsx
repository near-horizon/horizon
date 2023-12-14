import { getNewProject } from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";
import { GeneralSection } from "./sections/general";
import { Separator } from "~/components/ui/separator";
import { TractionMetrics } from "./sections/metrics";

export async function ProjectProfile({ accountId }: { accountId: AccountId }) {
  const project = await getNewProject(accountId);

  return (
    <div className="flex flex-col items-start justify-start gap-12 rounded-lg border border-ui-elements-light bg-ui-elements-white px-12 py-10 shadow">
      <GeneralSection profile={project.profile} />

      <Separator className="h-px w-full bg-ui-elements-light" />

      <TractionMetrics metrics={project.metrics} />
    </div>
  );
}
