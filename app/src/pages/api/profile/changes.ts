import { env } from "~/env.mjs";
import { withAPISession } from "~/lib/auth";

export default withAPISession(async function(req, res) {
  if (!req.session.user) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }

  try {
    const { accountId } = req.session.user;
    const response = await fetch(
      `${env.API_URL}/data/projects/${accountId}/changes`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      res.json(await response.json());
      return;
    }

    res.status(500).send({ ok: false, error: "Could not perform update" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ ok: false, error: "Bad request body" });
  }
});
