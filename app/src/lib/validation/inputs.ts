import { z } from "zod";
import { iso3166 } from "../constants/iso-3166";

export interface InputProps {
  label?: string;
  description?: string;
  placeholder?: string;
}

const handleRegex = /^@[a-zA-Z0-9_]{1,15}$/;

export function createSocialValidation(domain: string) {
  return z
    .string()
    .refine((urlOrHandle) => {
      const urlRegex = new RegExp(
        `^(https?:\/\/)?(www\.)?${domain}\/([A-Za-z0-9_]+)(\?.*)?$`,
      );

      if (handleRegex.test(urlOrHandle)) {
        return z.string().regex(handleRegex).parse(urlOrHandle);
      }

      if (!urlRegex.test(urlOrHandle)) {
        throw new Error("Invalid URL or handle");
      }

      return z
        .string()
        .regex(handleRegex)
        .parse("@" + urlOrHandle.split("/").pop()?.split("?")[0]);
    })
    .transform((handle) => handle.substring(1));
}

export const nameSchema = z.string().min(3).max(100);

export const emailSchema = z.string().email();

export const verticalSchema = z.enum([
  "infrastructure",
  "ai",
  "social",
  "nft",
  "defi",
  "marketplace",
  "virtualworlds",
  "gaming",
  "other",
]);

export const taglineSchema = z.string().min(3).max(100);

export const websiteSchema = z.string().refine((url) => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return z.string().url().parse(url);
  }

  return z.string().url().parse(`https://${url}`);
});

export const socialSchema = z
  .object({
    x: createSocialValidation("x.com").or(
      createSocialValidation("twitter.com"),
    ),
    telegram: createSocialValidation("t.me"),
    linkedin: createSocialValidation("linkedin.com"),
    instagram: createSocialValidation("instagram.com"),
  })
  .partial();

export const locationSchema = z.string().refine(
  (location) => {
    return !iso3166.find((country) => country.value === location);
  },
  { message: "Invalid location" },
);

export const sizeSchema = z.enum(["small", "medium", "large"]);

export const stageSchema = z.enum([
  "pre-seed",
  "seed",
  "series-a",
  "series-b",
  "series-c",
  "series-d",
]);

export const openSourceSchema = z.boolean();

export const nearIntegrationSchema = z.enum(["yes", "no", "in-progress"]);

export const problemSchema = z.string().min(50).max(1000);

export const needsSchema = z.string().min(50).max(1000);

export const fundraisingSchema = z.boolean();

export const raisedSchema = z.boolean();
