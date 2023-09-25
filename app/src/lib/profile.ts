import { useQuery } from "@tanstack/react-query";
import { type Profile } from "./validation/fetching";
import { type AccountId } from "./validation/common";
import { useProfile } from "./fetching";
import deepEqual from "deep-equal";

export async function getChanges() {
  const result = await fetch("/api/profile/changes");
  const changes = (await result.json()) as Profile;
  return changes;
}

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
  return !deepEqual(changes, profile);
}
