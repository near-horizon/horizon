import { LabeledData } from "~/components/profile/labeled-data";
import { stage } from "~/lib/constants/filters";
import { getProject } from "~/lib/server/projects";
import { Skeleton } from "~/components/ui/skeleton";

export async function Data({ accountId }: { accountId: string }) {
  const project = await getProject(accountId);

  return (
    <div className="flex flex-col gap-4">
      <LabeledData label="Project stage">
        {stage[project.stage as keyof typeof stage] ?? "No stage data"}
      </LabeledData>
      <LabeledData label="Are you currently fundraising?">
        {project.fundraising
          ? project.fundraising === "true"
            ? "Yes"
            : "No"
          : "No fundraising data"}
      </LabeledData>
      <LabeledData label="How much investment do you expect to raise?">
        {project.raise ? `${project.raise as string} USD` : "No raise data"}
      </LabeledData>
      <LabeledData label="Have you taken any investment so far?">
        {project.investment
          ? `${project.investment as string} USD`
          : "No investment data"}
      </LabeledData>
    </div>
  );
}

export function DataSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <LabeledData label="Project stage">
        <Skeleton className="h-4 w-1/2" />
      </LabeledData>
      <LabeledData label="Are you currently fundraising?">
        <Skeleton className="h-4 w-1/5" />
      </LabeledData>
      <LabeledData label="How much investment do you expect to raise?">
        <Skeleton className="h-4 w-1/5" />
      </LabeledData>
      <LabeledData label="Have you taken any investment so far?">
        <Skeleton className="h-4 w-3/5" />
      </LabeledData>
    </div>
  );
}
