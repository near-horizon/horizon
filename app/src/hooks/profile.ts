import { useQuery } from "@tanstack/react-query";
import { useProfile } from "./fetching";
import deepEqual from "deep-equal";
import { getChanges } from "~/lib/profile";
import { type AccountId } from "~/lib/validation/common";
import { removeEmpty } from "~/lib/utils";

export function useChanges() {
  return useQuery({
    queryKey: ["changes"],
    queryFn: getChanges,
  });
}

export function useHasChanges(accountId: AccountId) {
  const { data: changes } = useChanges();
  const { data: profile } = useProfile(accountId);
  if (!changes || !profile) {
    return false;
  }
  return !deepEqual(removeEmpty(changes), profile);
}
