import { withIronSessionApiRoute } from "iron-session/next";
import { z } from "zod";
import { loginUser } from "~/lib/auth";
import { ironSessionConfig } from "~/lib/constants/iron-session";
import { accountIdSchema } from "~/lib/validation/common";

const bodySchema = z.object({
  accountId: accountIdSchema,
  publicKey: z.string(),
});

const querySchema = z.object({
  account_id: accountIdSchema,
  public_key: z.string(),
  redirect: z.string(),
});

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  switch (req.method) {
    case "POST": {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const body =
          typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        const { accountId, publicKey } = bodySchema.parse(body);
        req.session.user = await loginUser(accountId, publicKey);
        await req.session.save();
        res.send({ ok: true });
      } catch (_error) {
        res.status(400).send({ ok: false, error: "Bad key" });
      }
      return;
    }
    case "GET": {
      try {
        const { account_id, public_key, redirect } = querySchema.parse(
          req.query
        );
        req.session.user = await loginUser(account_id, public_key);
        await req.session.save();
        res.redirect(decodeURIComponent(redirect));
        res.send({ ok: true });
      } catch (_error) {
        res.status(400).send({ ok: false, error: "Bad key" });
      }
      return;
    }
  }
}, ironSessionConfig);
