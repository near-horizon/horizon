import { LabeledData } from "~/components/profile/labeled-data";
import { devPhase, distribution, integration } from "~/lib/constants/filters";
import { getProject } from "~/lib/server/projects";
import { Skeleton } from "~/components/ui/skeleton";
import { NUMBER } from "~/lib/format";

export async function Data({ accountId }: { accountId: string }) {
  const project = await getProject(accountId);
  return (
    <div className="flex flex-col gap-4">
      <LabeledData label="Community / User base (MAU)">
        {NUMBER.compact(Number(project.mau ?? 0))}
      </LabeledData>
      <LabeledData label="Total addressable market (TAM)">
        {NUMBER.compact(Number(project.tam ?? 0))}
      </LabeledData>
      <LabeledData label="Integration with NEAR">
        {integration[project.integration as keyof typeof integration] ??
          "No integration data"}
      </LabeledData>
      <LabeledData label="Development phase">
        {devPhase[project.dev as keyof typeof devPhase] ?? "No dev data"}
      </LabeledData>
      <LabeledData label="Have you already launched on mainnet?">
        {(project.mainnet as string) ?? "No mainnet data"}
      </LabeledData>
      <LabeledData label="Is your project Open Source?">
        {distribution[project.distribution as keyof typeof distribution] ??
          "No distribution data"}
      </LabeledData>
      <LabeledData label="Do you plan to launch a token?">
        {(project.token as string) ?? "No token data"}
      </LabeledData>
    </div>
  );
}

export function DataSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <LabeledData label="Community / User base (MAU)">
        <Skeleton className="h-4 w-1/2" />
      </LabeledData>
      <LabeledData label="Total addressable market (TAM)">
        <Skeleton className="h-4 w-1/5" />
      </LabeledData>
      <LabeledData label="Integration with NEAR">
        <Skeleton className="h-4 w-1/5" />
      </LabeledData>
      <LabeledData label="Development phase">
        <Skeleton className="h-4 w-3/5" />
      </LabeledData>
      <LabeledData label="Have you already launched on mainnet?">
        <Skeleton className="h-4 w-3/5" />
      </LabeledData>
      <LabeledData label="Is your project Open Source?">
        <Skeleton className="h-4 w-3/5" />
      </LabeledData>
      <LabeledData label="Do you plan to launch a token?">
        <Skeleton className="h-4 w-3/5" />
      </LabeledData>
    </div>
  );
}
