import { getUserFromSession } from "~/lib/session";
import { ProfileForm } from "./form";
import { redirect } from "next/navigation";
import { getNewProject } from "~/lib/server/projects";

export default async function Profile() {
  const user = await getUserFromSession();

  if (!user.logedIn) {
    return redirect("/login");
  }

  if (!user.hasProfile) {
    return redirect("/onboarding");
  }

  const project = await getNewProject(user.accountId);

  return <ProfileForm project={project.asType()} />;
}
