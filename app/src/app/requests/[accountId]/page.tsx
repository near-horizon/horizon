import { redirect } from "next/navigation";
import { type AccountId } from "~/lib/validation/common";
import { getProjects } from "~/pages/api/projects";

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
