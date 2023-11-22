import { Suspense } from "react";
import { getProject, getProjectCompletion } from "~/lib/server/projects";
import { getUserFromSession } from "~/lib/session";
import { redirect } from "next/navigation";
import { ContributorBasicForm, ProjectBasicForm } from "./form";
import {
  ContributorData,
  ContributorDataSkeleton,
  ProjectData,
  ProjectDataSkeleton,
} from "./data";
import { getContributor } from "~/lib/server/contributors";
import { getContributorCompletion } from "~/lib/client/contributors";
import { redirectOnboarding } from "~/lib/auth";

export default async function BasicProfile() {
  const user = await getUserFromSession();

  if (!user) {
    return redirect("/login");
  }

  if (!user.hasProfile) {
    return redirectOnboarding();
  }

  if (user.hasProfile && user.profileType === "project") {
    const project = await getProject(user.accountId);
    const { basic } = await getProjectCompletion(user.accountId);

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <ProjectBasicForm defaultValues={project} completion={basic}>
        <Suspense fallback={<ProjectDataSkeleton />}>
          <ProjectData accountId={user.accountId} />
        </Suspense>
      </ProjectBasicForm>
    );
  }

  if (user.hasProfile && user.profileType === "contributor") {
    const contributor = await getContributor(user.accountId);
    const { basic } = await getContributorCompletion(user.accountId);

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <ContributorBasicForm defaultValues={contributor} completion={basic}>
        <Suspense fallback={<ContributorDataSkeleton />}>
          <ContributorData accountId={user.accountId} />
        </Suspense>
      </ContributorBasicForm>
    );
  }

  return redirect("/account/dashboard");
}
