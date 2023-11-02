import { type IronSession } from "iron-session";
import { /* getKeyInfo, */ viewCall } from "./fetching";
import { env } from "~/env.mjs";
import { type AccountId } from "./validation/common";
import { hasBacker } from "./backers";
import { hasContributor } from "./contributors";
import { hasProject } from "./projects";

export async function loginUser(
  accountId: AccountId,
  publicKey: string
): Promise<IronSession["user"]> {
  // Wait for chain to update key info
  // await sleep(1500);

  // const isKeyValid = await getKeyInfo(accountId, publicKey);
  // if (!isKeyValid) {
  //   throw new Error("Key is not valid");
  // }

  const [admin, ...hasProfile] = await Promise.all([
    viewCall<boolean>(env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID, "check_is_owner", {
      account_id: accountId,
    }),
    hasProject(accountId),
    hasContributor(accountId),
    hasBacker(accountId),
  ]);

  return {
    accountId,
    publicKey,
    admin,
    hasProfile: hasProfile.some(Boolean),
  };
}
