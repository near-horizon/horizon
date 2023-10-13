import { redirect } from "next/navigation";
import { getProjects } from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";

export default function ProjectPage({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  return redirect(`/projects/${accountId}/overview`);
}

export async function generateStaticParams() {
  const projectIds = await getProjects({});

  return projectIds.map((accountId) => ({ accountId }));
}
