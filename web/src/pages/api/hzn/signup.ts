import type { APIRoute } from "astro";
import { z } from "zod";

const token = import.meta.env.AIRTABLE_TOKEN;

export const schema = z.object({
  cohort: z.enum(["hzn2", "hzn3"]),
  personal: z.object({
    fullName: z.string(),
    email: z.string().email(),
    timezone: z.string(),
    accountId: z.string(),
    firstTime: z.coerce.boolean(),
    background: z.enum(["engineering", "design", "business", "other"]),
    about: z.string().min(1000),
    time: z.enum(["full-time", "part-time"]),
    linkedin: z.string().url(),
    x: z.string().url().optional(),
    github: z.string().url().optional(),
  }),
  project: z.object({
    name: z.string().min(3).max(100),
    website: z.string().url(),
    stage: z.enum(["idea", "prototype", "mvp", "live"]),
    openSource: z.enum(["yes", "no", "partial"]),
    what: z.string().min(1000),
    unique: z.string().min(1000),
    goals: z.string().min(1000),
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
    return new Response(JSON.stringify(await response.json()), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(await response.json()), {
    status: 200,
  });
};
