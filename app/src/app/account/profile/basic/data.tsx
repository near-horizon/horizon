import { LabeledData } from "~/components/profile/labeled-data";
import { Description, DescriptionSkeleton } from "~/components/description";
import { ExternalLink } from "~/components/external-link";
import { Socials } from "~/components/socials";
import { Skeleton } from "~/components/ui/skeleton";
import { getProject } from "~/lib/server/projects";

export async function Data({ accountId }: { accountId: string }) {
  const project = await getProject(accountId);

  return (
    <>
      <LabeledData label="Description">
        <Description text={project.description ?? "No description provided"} />
      </LabeledData>
      <LabeledData label="Website">
        {project.website ? (
          <ExternalLink href={project.website ?? "#"}>
            {project.website}
          </ExternalLink>
        ) : (
          "No website provided"
        )}
      </LabeledData>
      <LabeledData label="Company size">
        {project.company_size ?? "No company size provided"}
      </LabeledData>
      <LabeledData label="Location">
        {project.geo ?? "No location provided"}
      </LabeledData>
      <LabeledData label="Social profiles">
        <Socials links={project.linktree ?? {}} />
      </LabeledData>
      <LabeledData label="What problem(s) are you solving?">
        <Description
          text={
            project.problem.length ? project.problem : "No problem(s) provided"
          }
        />
      </LabeledData>
      <LabeledData label="What makes your team uniquely positioned for success?">
        <Description
          text={
            project.success_position.length
              ? project.success_position
              : "No position provided"
          }
        />
      </LabeledData>
      <LabeledData label="Why are you building on NEAR?">
        <Description
          text={project.why.length ? project.why : "No why provided"}
        />
      </LabeledData>
    </>
  );
}

export function DataSkeleton() {
  return (
    <>
      <LabeledData label="Description">
        <DescriptionSkeleton />
      </LabeledData>
      <LabeledData label="Website">
        <Skeleton className="h-4 w-4/5" />
      </LabeledData>
      <LabeledData label="Company size">
        <Skeleton className="h-4 w-2/5" />
      </LabeledData>
      <LabeledData label="Location">
        <Skeleton className="h-4 w-3/5" />
      </LabeledData>
      <LabeledData label="Social profiles">
        <Skeleton className="h-4 w-4/5" />
      </LabeledData>
      <LabeledData label="What problem(s) are you solving?">
        <DescriptionSkeleton />
      </LabeledData>
      <LabeledData label="What makes your team uniquely positioned for success?">
        <DescriptionSkeleton />
      </LabeledData>
      <LabeledData label="Why are you building on NEAR?">
        <DescriptionSkeleton />
      </LabeledData>
    </>
  );
}
