import { env } from "~/env.mjs";
import { type AccountId } from "./validation/common";
import { redirect, RedirectType } from "next/navigation";
import { type User } from "./validation/user";
import { getProfileType } from "./server/common";
import { viewCall } from "./fetching";

export async function loginUser(
  accountId: AccountId,
  publicKey: string,
): Promise<User> {
  const [admin, profileType] = await Promise.all([
    viewCall<boolean>(env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID, "check_is_owner", {
      account_id: accountId,
    }),
    getProfileType(accountId),
  ]);

  const user: User = {
    loggedIn: true,
    accountId,
    publicKey,
    admin,
    hasProfile: false,
  };

  if (profileType) {
    return {
      ...user,
      hasProfile: true,
      profileType,
    };
  }

  return user;
}

export function redirectOnboarding(): never {
  redirect("/onboarding", RedirectType.push);
}
