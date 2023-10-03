import { z } from "zod";
import { env } from "~/env.mjs";
import { withAPISession } from "~/lib/auth";
import { type AccountId } from "~/lib/validation/common";

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

export default withAPISession(async function(req, res) {
  if (!req.session.user?.accountId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  switch (req.method) {
    case "POST": {
      try {
        const perkId = z.string().parse(req.query.perkId);
        const { accountId } = req.session.user;
        await unlockPerk(perkId, accountId);
        res.status(200).json({ message: "Perk unlocked!" });
        return;
      } catch (error) {
        res.status(500).json({ message: "Failed to unlock perk!" });
        return;
      }
    }
    default: {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
});
