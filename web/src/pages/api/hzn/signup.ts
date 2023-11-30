import type { APIRoute } from "astro";
import { z } from "zod";

const token = import.meta.env.AIRTABLE_TOKEN;

const textAreaLimit = 300;
const urlValue = z.string().refine((value) => {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return z.string().url().parse(value);
  }

  return z.string().url().parse(`https://${value}`);
});

export const schema = z.object({
  cohort: z.enum(["hzn2", "hzn3"]),
  personal: z.object({
    fullName: z.string(),
    email: z.string().email(),
    timezone: z.string(),
    accountId: z.string().optional(),
    firstTime: z.coerce.boolean(),
    background: z.enum([
      "technical",
      "semi-technical",
      "non-technical",
      "other",
    ]),
    about: z.string().min(textAreaLimit),
    time: z.enum(["0-2", "2-4", "4-6", "6-*"]),
    linkedin: urlValue,
    x: urlValue.optional(),
    github: urlValue.optional(),
  }),
  project: z.object({
    name: z.string().min(3).max(100),
    website: urlValue,
    stage: z.enum(["idea", "prototype", "beta", "live-no-users", "live-users"]),
    openSource: z.enum(["yes", "not-yet", "no", "undecided"]),
    what: z.string().min(textAreaLimit),
    unique: z.string().min(textAreaLimit),
    goals: z.string().min(textAreaLimit),
    team: z.string(),
    audience: z.string(),
    activeUserbase: z.coerce.boolean(),
    partnerships: z.string(),
    raised: z.coerce.boolean(),
    nextRound: z.string(),
  }),
});

const keyMapping: Record<string, string> = {
  cohort: "cohort",
  fullName: "fullName",
  email: "email",
  timezone: "timezone",
  accountId: "accountId",
  firstTime: "firstTime",
  background: "background",
  about: "about",
  time: "time",
  linkedin: "linkedin",
  x: "twitter",
  github: "github",
  name: "name",
  website: "website",
  stage: "stage",
  openSource: "openSource",
  what: "what",
  unique: "unique",
  goals: "goals",
  team: "team",
  audience: "audience",
  activeUserbase: "activeUserbase",
  partnerships: "partnerships",
  raised: "raised",
  nextRound: "nextRound",
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return new Response(JSON.stringify(parsed.error), {
      status: 400,
    });
  }

  const fields = {
    cohort: parsed.data.cohort,
    ...parsed.data.personal,
    ...parsed.data.project,
    firstTime: parsed.data.personal.firstTime ? "Yes" : "No",
    raised: parsed.data.project.raised ? "Yes" : "No",
  };

  const records = [
    {
      fields: Object.assign(
        Object.fromEntries(
          Object.entries(fields).map(([key, value]) => [
            keyMapping[key],
            value,
          ]),
        ),
        { from: "website" },
      ),
    },
  ];

  const response = await fetch(
    "https://api.airtable.com/v0/appFoIqAoY0ikoVIb/tblcpAMFMXAyicqYH",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ records }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(await response.json()), {
    status: 200,
  });
};
