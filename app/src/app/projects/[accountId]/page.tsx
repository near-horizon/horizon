import { getProjects } from "~/lib/server/projects";
import { ProjectProfile } from "./profile";

export default function ProjectPage({
  params: { accountId },
}: {
  params: { accountId: string };
}) {
  if (!accountId || accountId === "undefined") {
    return "Nothing";
  }

  return <ProjectProfile accountId={accountId} />;
}

export async function generateStaticParams() {
  const projectIds = await getProjects({});

  return projectIds.map((accountId) => ({ accountId }));
}
