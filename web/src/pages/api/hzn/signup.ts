import type { APIRoute } from "astro";
import { z } from "zod";

const token = import.meta.env.AIRTABLE_TOKEN;

const textAreaLimit = 300;
const urlValue = z.string();
// .refine((value) => {
//   if (value.startsWith("http://") || value.startsWith("https://")) {
//     return z.string().url().parse(value);
//   }
//
//   return z.string().url().parse(`https://${value}`);
// });

export const schema = z.object({
  cohort: z.enum(["hzn2", "hzn3"]),
  heard: z.object({
    type: z.enum([
      "alumni",
      "nf",
      "x",
      "linkedin",
      "event",
      "nearcon",
      "blog",
      "friend",
      "se",
      "other",
    ]),
  }),
  personal: z.object({
    fullName: z.string(),
    email: z.string().email(),
    timezone: z.string(),
    accountId: z.string().optional(),
    firstTime: z.coerce.boolean(),
    background: z.enum([
      "technical",
      "semi-technical",
      "minimally-technical",
      "non-technical",
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
  cohort: "fldzdRKRg598YHljK",
  fullName: "fld2moDBinCy91Tkl",
  email: "fldMulZTxKtwjeirE",
  timezone: "fldozPRS61LhsQo4u",
  accountId: "fldPgoHRQcsobjU1Q",
  firstTime: "fldkEGZBBrmhooUBV",
  background: "fldqcXvcs1cojYDlJ",
  about: "fld3NbifEq7tl6m9q",
  time: "fldpAkYFYkQB1L1Rx",
  linkedin: "fldlLS9EfYbunKXHz",
  x: "fldH0osekm8f2bYsq",
  github: "fldTKmc8vhC1s92e1",
  name: "fldGN8CtsSdek2v38",
  website: "fld4V5jK7U0FIbtfy",
  stage: "fldD6Far3XGejbQeU",
  openSource: "fldoH5L0gT5vlsKwd",
  what: "fldOldcfgozydVrHt",
  unique: "fldqKuRpMG6E3CBCe",
  goals: "fldisS8vyoYYeLxGT",
  team: "fldtkU5jjGdRO7sax",
  audience: "fldcoxCPjpPfJXFPU",
  activeUserbase: "fldlOuD4aru5rKTte",
  partnerships: "fld3SSRiFqgJiIzsv",
  raised: "fldHC7ZfTHFCQDcFv",
  nextRound: "fld3Exs3y9TDanr3r",
  heard: "fldWm2CcibxywMFRM",
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    console.error(parsed.error);
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
    heard: parsed.data.heard.type,
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
