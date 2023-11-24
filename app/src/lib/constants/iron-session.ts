import { type SessionOptions } from "iron-session";
import { env } from "~/env.mjs";

export const ironSessionConfig: SessionOptions = {
  cookieName: "horizon-session",
  password: env.SESSION_PASSWORD,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: env.NODE_ENV === "production",
    path: "/",
    httpOnly: true,
  },
};
