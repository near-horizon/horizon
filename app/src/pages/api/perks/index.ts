import { z } from "zod";
import { env } from "~/env.mjs";
import { withAPISession } from "~/lib/auth";
import { type AccountId } from "~/lib/validation/common";
import { perkSchema } from "~/lib/validation/perks";

export async function getPerks(accountId: AccountId) {
  const response = await fetch(env.API_URL + "/data/perks/" + accountId);
  const perks = z.array(perkSchema).parse(await response.json());
  return perks.sort((a, b) => a.fields.name.localeCompare(b.fields.name));
}

export default withAPISession(async function(req, res) {
  switch (req.method) {
    case "GET":
    default: {
      const accountId = req.session.user?.accountId;
      if (!accountId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      try {
        const perks = await getPerks(accountId);
        res.status(200).json(perks);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
});
