import { withIronSessionApiRoute } from "iron-session/next";
import { z } from "zod";
import { env } from "~/env.mjs";

const bodySchema = z.object({
  email: z.string().email(),
});

export default withIronSessionApiRoute(
  async function userRoute(req, res) {
    if (!req.session.user) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const { email } = bodySchema.parse(body);
      const { accountId } = req.session.user;
      const response = await fetch(
        `${env.API_URL}/data/projects/${accountId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.API_KEY}`,
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      if (response.ok) {
        res.send({ ok: true });
        return;
      }

      res.status(500).send({ ok: false, error: "Could not perform update" });
    } catch (_error) {
      res.status(400).send({ ok: false, error: "Bad request body" });
    }
  },
  {
    cookieName: "horizon-session",
    password: env.SESSION_PASSWORD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: env.NODE_ENV === "production",
    },
  }
);
