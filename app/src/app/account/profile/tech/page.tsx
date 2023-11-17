import { getProject, getProjectCompletion } from "~/lib/server/projects";
import { getUserFromSession } from "~/lib/session";
import { TechForm } from "./form";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Data, DataSkeleton } from "./data";

export default async function TechInfo({}) {
  const user = await getUserFromSession();
  if (!user) {
    return redirect("/login");
  }
  const project = await getProject(user.accountId);
  const { tech } = await getProjectCompletion(user.accountId);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <TechForm defaultValues={project} completion={tech}>
      <Suspense fallback={<DataSkeleton />}>
        <Data accountId={user.accountId} />
      </Suspense>
    </TechForm>
  );
}
