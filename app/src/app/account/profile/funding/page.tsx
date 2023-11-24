import { Suspense } from "react";
import { FundingForm } from "./form";
import { getProject, getProjectCompletion } from "~/lib/server/projects";
import { getUserFromSession } from "~/lib/session";
import { redirect } from "next/navigation";
import { Data, DataSkeleton } from "./data";

export default async function FundingInfo() {
  const user = await getUserFromSession();
  if (!user.logedIn) {
    return redirect("/login");
  }
  const project = await getProject(user.accountId);
  const { funding } = await getProjectCompletion(user.accountId);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <FundingForm defaultValues={project} completion={funding}>
      <Suspense fallback={<DataSkeleton />}>
        <Data accountId={user.accountId} />
      </Suspense>
    </FundingForm>
  );
}
