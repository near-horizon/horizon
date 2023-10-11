import { redirect } from "next/navigation";
import { hasProject } from "~/lib/projects";
import { getUserFromSession } from "~/lib/session";
import { ContributorsCreate } from "./create";

export default async function ProjectCreatePage() {
  const user = await getUserFromSession();

  if (!user) {
    return redirect("/login");
  }

  if (await hasProject(user.accountId)) {
    return redirect("/account");
  }

  return <ContributorsCreate accountId={user.accountId} />;
}
