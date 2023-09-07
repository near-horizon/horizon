import { withIronSessionApiRoute } from "iron-session/next";
import { env } from "~/env.mjs";

export default withIronSessionApiRoute(
  function userRoute(req, res) {
    res.send({ user: req.session.user });
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
