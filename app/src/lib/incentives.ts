import { env } from "~/env.mjs";
import { viewCall } from "./fetching";
import type { Incentives } from "./validation/incentives";

export async function getIncentives() {
  const response = await viewCall<Incentives>(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_incentive_data",
    {}
  );

  return response;
}
