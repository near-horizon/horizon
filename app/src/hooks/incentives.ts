import { useQuery } from "@tanstack/react-query";
import { getIncentives } from "~/lib/incentives";

export function useIncetives() {
  return useQuery({
    queryKey: ["incentives"],
    queryFn: getIncentives,
  });
}
