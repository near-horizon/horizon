import { z } from "zod";
import { env } from "~/env.mjs";
import { withAPISession } from "~/lib/auth";
import { profileSchema } from "~/lib/validation/fetching";

const bodySchema = profileSchema.extend({
  email: z.string().email().optional(),
});

export default withAPISession(async function(req, res) {
  if (!req.session.user) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const profile = bodySchema.parse(body);
    const { accountId } = req.session.user;
    const response = await fetch(`${env.API_URL}/data/projects/${accountId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.API_KEY}`,
      },
      body: JSON.stringify(profile),
    });

    if (response.ok) {
      res.send({ ok: true });
      return;
    }

    res.status(500).send({ ok: false, error: "Could not perform update" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ ok: false, error: "Bad request body" });
  }
});
