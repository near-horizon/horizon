import { Suspense } from "react";
import { getProject, getProjectCompletion } from "~/lib/server/projects";
import { getUserFromSession } from "~/lib/session";
import { redirect } from "next/navigation";
import { BasicForm } from "./form";
import { Data, DataSkeleton } from "./data";

export default async function BasicProfile() {
  const user = await getUserFromSession();
  if (!user) {
    return redirect("/login");
  }
  const project = await getProject(user.accountId);
  const { basic } = await getProjectCompletion(user.accountId);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <BasicForm defaultValues={project} completion={basic}>
      <Suspense fallback={<DataSkeleton />}>
        <Data accountId={user.accountId} />
      </Suspense>
    </BasicForm>
  );
}
