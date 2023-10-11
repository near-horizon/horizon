import { type Profile } from "./validation/fetching";

export async function getChanges() {
  const result = await fetch("/api/profile/changes");
  const changes = (await result.json()) as Profile;
  return changes;
}
