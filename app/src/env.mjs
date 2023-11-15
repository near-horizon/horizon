import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    API_URL: z.string().url(),
    API_KEY: z.string().min(32),
    SESSION_PASSWORD: z.string().min(32),
    OPENAI_API_KEY: z.string(),
    REACHOUT_SUBJECT: z
      .string()
      .optional()
      .default("Reaching out from Horizon"),
    REACHOUT_BODY: z
      .string()
      .optional()
      .default(
        "Hi, I'm reaching out from Horizon. I'd like to talk to you about your work.",
      ),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
    NEXT_PUBLIC_CONTRACT_ACCOUNT_ID: z
      .string()
      .min(2)
      .max(64)
      .regex(/^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/),
    NEXT_PUBLIC_IPFS_URL: z.string().url(),
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CONTRACT_ACCOUNT_ID:
      process.env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID,
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    SESSION_PASSWORD: process.env.SESSION_PASSWORD,
    NEXT_PUBLIC_IPFS_URL: process.env.NEXT_PUBLIC_IPFS_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    REACHOUT_SUBJECT: process.env.REACHOUT_SUBJECT,
    REACHOUT_BODY: process.env.REACHOUT_BODY,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
