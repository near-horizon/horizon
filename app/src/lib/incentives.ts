import { env } from "~/env.mjs";
import { viewCall } from "./fetching";
import { useQuery } from "@tanstack/react-query";

export async function getIncentives() {
  const response = await viewCall(
    env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    "get_incentives_data",
    {}
  );

  console.log("getIncentives", response);

  return response;
}

export function useIncetives() {
  return useQuery({
    queryKey: ["incentives"],
    queryFn: getIncentives,
  });
}
