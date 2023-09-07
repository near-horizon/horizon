import { withIronSessionApiRoute } from "iron-session/next";
import { env } from "~/env.mjs";

export default withIronSessionApiRoute(
  function logoutRoute(req, res) {
    req.session.destroy();
    res.send({ ok: true });
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
