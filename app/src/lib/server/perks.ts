import { env } from "~/env.mjs";
import { type AccountId } from "../validation/common";
import { z } from "zod";
import { perkSchema } from "../validation/perks";

export async function getPerks(accountId: AccountId) {
  const response = await fetch(env.API_URL + "/data/perks/" + accountId);
  const perks = z.array(perkSchema).parse(await response.json());
  return perks.sort((a, b) => a.fields.name.localeCompare(b.fields.name));
}

export async function unlockPerk(perkId: string, accountId: AccountId) {
  const response = await fetch(env.API_URL + "/data/perks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      perk_id: perkId,
      account_id: accountId,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to unlock perk!");
  }
  return response;
}
