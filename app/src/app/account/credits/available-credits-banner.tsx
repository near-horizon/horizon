import { redirect } from "next/navigation";

import { InfoTooltip } from "~/components/info-tooltip";
import { getProject } from "~/lib/server/projects";
import { getUserFromSession } from "~/lib/session";

export default async function AvailableCreditsBanner() {
  const user = await getUserFromSession();

  if (!user.logedIn) {
    return redirect("/login");
  }

  const horizonProject = await getProject(user.accountId);

  return (
    <div className="rounded-lg bg-background-beige p-6">
      <div className="text-ui-elements-black">
        <div className="text-sm font-semibold ">
          <span>Available for spending</span>{" "}
          <InfoTooltip>lorem ipsum</InfoTooltip>
        </div>
        <div className="text-lg font-bold">
          {horizonProject.credit_balance} NHZN{" "}
          <span className="font-light text-ui-elements-gray">
            (~${horizonProject.credit_balance})
          </span>
        </div>
      </div>
    </div>
  );
}
