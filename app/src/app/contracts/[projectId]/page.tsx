import { redirect } from "next/navigation";
import { getProjects } from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";

export default function ProjectRequestsPage({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  return redirect(`/projects/${accountId}/requests`);
}

export async function generateStaticParams() {
  const projectIds = await getProjects({});

  return projectIds.map((accountId) => ({ accountId }));
}
