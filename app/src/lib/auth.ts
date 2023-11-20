import { type IronSession } from "iron-session";
import { /* getKeyInfo, */ viewCall } from "./client/fetching";
import { env } from "~/env.mjs";
import { type AccountId } from "./validation/common";
import { hasBacker } from "./client/backers";
import { hasContributor } from "./client/contributors";
import { hasProject } from "./client/projects";
import { redirect, RedirectType } from "next/navigation";

export async function loginUser(
  accountId: AccountId,
  publicKey: string
): Promise<IronSession["user"]> {
  const [admin, isProject, isContributor, isBacker] = await Promise.all([
    viewCall<boolean>(env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID, "check_is_owner", {
      account_id: accountId,
    }),
    hasProject(accountId),
    hasContributor(accountId),
    hasBacker(accountId),
  ]);

  const user: IronSession["user"] = {
    accountId,
    publicKey,
    admin,
    hasProfile: false,
  };

  if (isProject) {
    return {
      ...user,
      hasProfile: true,
      profileType: "project",
    };
  }

  if (isContributor) {
    return {
      ...user,
      hasProfile: true,
      profileType: "contributor",
    };
  }

  if (isBacker) {
    return {
      ...user,
      hasProfile: true,
      profileType: "backer",
    };
  }

  return user;
}

export function redirectOnboarding(): never {
  redirect("/onboarding", RedirectType.push);
}
