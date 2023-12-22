import { z } from "zod";
import { accountIdSchema } from "./common";

export const profileTypeSchema = z.enum(["project", "contributor", "backer"]);

export type ProfileType = z.infer<typeof profileTypeSchema>;

export const userSchema = z.union([
  z.object({
    loggedIn: z.literal(false),
  }),
  z.object({
    loggedIn: z.literal(true),
    accountId: accountIdSchema,
    publicKey: z.string(),
    admin: z.boolean().default(false),
    hasProfile: z.literal(false),
  }),
  z.object({
    loggedIn: z.literal(true),
    accountId: accountIdSchema,
    publicKey: z.string(),
    admin: z.boolean().default(false),
    hasProfile: z.literal(true),
    profileType: profileTypeSchema,
  }),
]);

export type User = z.infer<typeof userSchema>;

export const DEFAULT_USER: User = {
  logedIn: false,
};
