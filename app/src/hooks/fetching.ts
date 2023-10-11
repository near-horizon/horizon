import { useQuery } from "@tanstack/react-query";
import { getProfile, getStats } from "~/lib/fetching";

export function useProfile(accountId: string, enabled = true) {
  return useQuery({
    queryKey: ["social-profile", accountId],
    queryFn: () => getProfile(accountId),
    enabled,
  });
}

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
}
