import { getProjects } from "~/lib/server/projects";
import { ProjectProfile } from "./profile";
import { getUserFromSession } from "~/lib/session";

export default async function ProjectPage({
  params: { accountId },
}: {
  params: { accountId: string };
}) {
  const user = await getUserFromSession();

  return <ProjectProfile accountId={accountId} user={user} />;
}

export async function generateStaticParams() {
  const projectIds = await getProjects({});

  return projectIds.map((accountId) => ({ accountId }));
}
