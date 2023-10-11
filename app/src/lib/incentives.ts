import { env } from "~/env.mjs";
import { viewCall } from "./fetching";

export async function getIncentives() {
  const response = await viewCall(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_incentives_data",
    {}
  );

  return response;
}
