import { type AccountId } from "../validation/common";
import { type ProfileType } from "../validation/user";
import { hasBacker } from "./backers";
import { hasContributor } from "./contributors";
import { hasProject } from "./projects";

export async function getProfileType(
  accountId: AccountId,
): Promise<ProfileType | undefined> {
  const [isProject, isContributor, isBacker] = await Promise.all([
    hasProject(accountId),
    hasContributor(accountId),
    hasBacker(accountId),
  ]);

  if (isProject) {
    return "project";
  }

  if (isContributor) {
    return "contributor";
  }

  if (isBacker) {
    return "backer";
  }

  return undefined;
}
