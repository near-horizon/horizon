import { redirect } from "next/navigation";
import { hasProject } from "~/lib/client/projects";
import { getUserFromSession } from "~/lib/session";
import { ProjectCreate } from "./create";

export default async function ProjectCreatePage() {
  const user = await getUserFromSession();

  if (!user.logedIn) {
    return redirect("/login");
  }

  if (await hasProject(user.accountId)) {
    return redirect("/account");
  }

  return <ProjectCreate accountId={user.accountId} />;
}
