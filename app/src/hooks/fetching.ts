import { useQuery } from "@tanstack/react-query";
import { getProfile, getStats } from "~/lib/fetching";
import { type AccountId } from "~/lib/validation/common";

export function useProfile(accountId?: AccountId, enabled = true) {
  return useQuery({
    queryKey: ["social-profile", accountId],
    queryFn: ({ queryKey: [, accountId] }) =>
      accountId ? getProfile(accountId) : null,
    enabled,
  });
}

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
}
