import { env } from "~/env.mjs";
import { getUserFromSession } from "~/lib/session";

import { InfoTooltip } from "~/components/info-tooltip";
import { viewCall } from "~/lib/fetching";
import type { HorizonProject } from "~/lib/validation/projects";

export default async function AvailableCreditsBanner() {
  const user = await getUserFromSession();

  const horizonProfile = await viewCall<HorizonProject>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_project",
    { account_id: user?.accountId }
  );

  return (
    <div className="rounded-lg bg-background-beige p-6">
      <div className="text-ui-elements-black">
        <div className="text-sm font-semibold ">
          <span>Available for spending</span>{" "}
          <InfoTooltip>lorem ipsum</InfoTooltip>
        </div>
        <div className="text-lg font-bold">
          {horizonProfile.credit_balance} NHZN{" "}
          <span className="font-light text-ui-elements-gray">
            (~${horizonProfile.credit_balance})
          </span>
        </div>
      </div>
    </div>
  );
}
