import { useQuery } from "@tanstack/react-query";
import { hasBacker } from "~/lib/backers";
import { hasContributor } from "~/lib/contributors";
import { hasProject } from "~/lib/projects";
import { type AccountId } from "~/lib/validation/common";

export function useHasProfile(accountId?: AccountId) {
  return useQuery({
    queryKey: ["has-profile", accountId],
    queryFn: async ({ queryKey: [, accountId] }) => {
      if (!accountId) return false;

      const hasProfile = (
        await Promise.all([
          hasProject(accountId),
          hasContributor(accountId),
          hasBacker(accountId),
        ])
      ).some(Boolean);

      return hasProfile;
    },
  });
}
