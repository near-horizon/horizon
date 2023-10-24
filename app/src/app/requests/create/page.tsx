import { redirect } from "next/navigation";
import { hasProject } from "~/lib/projects";
import { getUserFromSession } from "~/lib/session";
import { RequestsCreate } from "./create";

export default async function RequestCreatePage() {
  const user = await getUserFromSession();

  if (!user) {
    return redirect("/login");
  }

  if (!(await hasProject(user.accountId))) {
    return redirect("/projects/create");
  }

  return <RequestsCreate accountId={user.accountId} />;
}
