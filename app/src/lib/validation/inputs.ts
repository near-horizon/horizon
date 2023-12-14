import { z } from "zod";
import { iso3166 } from "../constants/iso-3166";

export interface InputProps {
  label?: string;
  description?: string;
  placeholder?: string;
  noLabel?: boolean;
}

const handleRegex = /^@[+a-zA-Z0-9_]{1,45}$/;

export function createSocialValidation(domain: string) {
  return z
    .string()
    .refine((urlOrHandle) => {
      urlOrHandle = urlOrHandle.trim();
      while (urlOrHandle.startsWith("/")) {
        urlOrHandle = urlOrHandle.substring(1);
      }
      const urlRegex = new RegExp(
        `^(https?:\/\/)?(www\.)?${domain}\/([+a-zA-Z0-9_]{1,45})([?].*)?$`,
      );

      if (handleRegex.test(urlOrHandle)) {
        return z.string().regex(handleRegex).parse(urlOrHandle);
      }

      if (handleRegex.test(`@${urlOrHandle}`)) {
        return z.string().regex(handleRegex).parse(`@${urlOrHandle}`);
      }

      if (urlRegex.test(urlOrHandle)) {
        return z
          .string()
          .regex(handleRegex)
          .parse("@" + urlOrHandle.split("/").pop()?.split("?")[0]);
      }

      return false;
    })
    .transform((handle) => {
      if (handle.startsWith("@")) {
        return handle.substring(1);
      }

      return handle;
    });
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

export const descriptionSchema = z.string().min(50).max(1000);

export const websiteSchema = z.string().refine((url) => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return z.string().url().parse(url);
  }

  return z.string().url().parse(`https://${url}`);
});

export const xSchema = createSocialValidation("twitter.com").or(
  createSocialValidation("x.com"),
);
export const telegramSchema = createSocialValidation("t.me");
export const linkedinSchema = createSocialValidation("linkedin.com");
export const instagramSchema = createSocialValidation("instagram.com");

export const socialSchema = z
  .object({
    x: xSchema,
    telegram: telegramSchema,
    linkedin: linkedinSchema,
    instagram: instagramSchema,
  })
  .partial();

export const locationSchema = z.string().refine(
  (location) => {
    return !!iso3166.find((country) => country.value === location);
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
  "other",
]);

export const openSourceSchema = z.boolean();

export const nearIntegrationSchema = z.enum(["yes", "no", "in-progress"]);

export const problemSchema = z.string().min(50).max(1000);

export const needsSchema = z.string().min(50).max(1000);

export const fundraisingSchema = z.boolean();

export const raisedSchema = z.boolean();
