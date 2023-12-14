import { z } from "zod";
import { accountIdSchema, imageSchema } from "../common";
import { type Linktree } from "../fetching";
import {
  descriptionSchema,
  emailSchema,
  fundraisingSchema,
  linkedinSchema,
  locationSchema,
  nameSchema,
  nearIntegrationSchema,
  needsSchema,
  openSourceSchema,
  problemSchema,
  raisedSchema,
  sizeSchema,
  socialSchema,
  stageSchema,
  taglineSchema,
  telegramSchema,
  verticalSchema,
  websiteSchema,
  xSchema,
} from "../inputs";
import { type BackersDigest, type Project } from "../projects";

export const projectSizeSchema = z.enum(["small", "medium", "large"]);

export const projectProfileSchema = z.object({
  name: nameSchema,
  logo: imageSchema,
  email: emailSchema,
  vertical: verticalSchema.array(),
  stage: stageSchema,
  tagline: taglineSchema,
  description: descriptionSchema.optional(),
  website: websiteSchema.optional(),
  socials: socialSchema.optional(),
  location: locationSchema.optional(),
  size: sizeSchema.optional(),
});

export function projectProfileCompletion({ profile }: NewProjectType) {
  if (!profile) {
    return 0;
  }

  const fields = [
    profile.name && profile.name.length > 0,
    profile.logo &&
      Object.values(profile.logo).every((v) => {
        if (typeof v === "string") {
          return v.length > 0;
        }

        return Object.values(v).every((v) => v && v.length > 0);
      }),
    profile.email && profile.email.length > 0,
    profile.vertical && profile.vertical.length > 0,
    profile.stage && profile.stage.length > 0,
    profile.tagline && profile.tagline.length > 0,
    profile.website && profile.website.length > 0,
    profile.socials &&
      Object.values(profile.socials).some((v) => v && v.length > 0),
    profile.location && profile.location.length > 0,
    profile.size && profile.size.length > 0,
  ];

  return fields.filter(Boolean).length / fields.length;
}

export function createToggleableSchema<T extends z.ZodSchema>(
  schema: T,
): z.ZodObject<{ value: T; visible: z.ZodBoolean }> {
  return z.object({
    visible: z.boolean(),
    value: schema,
  });
}

export const projectContactSchema = z.object({
  email: emailSchema.optional(),
  meeting_link: websiteSchema.optional(),
});

export function projectContactCompletion({
  contact: { value: contact } = { visible: false, value: {} },
}: NewProjectType) {
  if (!contact) {
    return 0;
  }

  const fields = [
    contact.email && contact.email.length > 0,
    contact.meeting_link && contact.meeting_link.length > 0,
  ];

  return fields.filter(Boolean).length / fields.length;
}

export const projectDetailsSchema = z
  .object({
    open_source: openSourceSchema,
    near_integration: nearIntegrationSchema,
    problem: problemSchema,
    needs: needsSchema,
    fundraising: fundraisingSchema,
    raised: raisedSchema,
  })
  .partial();

export function projectProgressCompletion({
  details: { value: progress } = {
    visible: false,
    value: {},
  },
}: NewProjectType) {
  if (!progress) {
    return 0;
  }

  const fields = [
    progress.open_source !== undefined,
    progress.near_integration !== undefined,
    progress.problem && progress.problem.length > 0,
    progress.needs && progress.needs.length > 0,
    progress.fundraising !== undefined,
    progress.raised !== undefined,
  ];

  return fields.filter(Boolean).length / fields.length;
}

export const founderSchema = z.object({
  name: nameSchema.optional(),
  image: imageSchema.optional(),
  account_id: accountIdSchema.optional(),
  socials: socialSchema.optional(),
});

export function projectFoundersCompletion({
  founders: { value: founders } = { visible: false, value: [] },
}: NewProjectType) {
  if (!founders) {
    return 0;
  }

  return +Object.values(founders).some((founder) => {
    const fields = [
      founder.name && founder.name.length > 0,
      founder.account_id && founder.account_id.length > 0,
      founder.socials &&
        Object.values(founder.socials).some((v) => v && v.length > 0),
    ];

    return fields.filter(Boolean).length === fields.length;
  });
}

export const projectFoundersSchema = z.array(founderSchema);

export const metricsSchema = z
  .array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  )
  .optional();

export function projectMetricsCompletion({
  metrics: { value: metrics } = { visible: false, value: [] },
}: NewProjectType) {
  return +(
    !!metrics &&
    metrics.length > 0 &&
    metrics.every(
      ({ name, value }) => name && value && name.length > 0 && value.length > 0,
    )
  );
}

export const artifactSchema = z.object({
  name: z.string(),
  note: z.string().optional().optional(),
  value: z.union([
    z.object({
      url: z.string(),
    }),
    z.object({
      file: z.string(),
    }),
  ]),
});

export function projectArtifactsCompletion({ artifacts }: NewProjectType) {
  if (!artifacts) {
    return 0;
  }

  return +artifacts.some(({ value }) => {
    const fields = [
      value.name && value.name.length > 0,
      value.value && Object.values(value.value).some((v) => v && v.length > 0),
    ];

    return fields.filter(Boolean).length === fields.length;
  });
}

export const artifactsSchema = z.array(createToggleableSchema(artifactSchema));

export const artifactNameOptions = [
  "Demo Day Pitch",
  "Pitch Deck",
  "Product Demo",
  "News Article",
  "Media Post",
  "Other",
];

export const mediaSchema = z.array(z.object({ link: websiteSchema }));

export const newProjectSchema = z.object({
  account_id: accountIdSchema,
  profile: projectProfileSchema,
  contact: createToggleableSchema(projectContactSchema),
  details: createToggleableSchema(projectDetailsSchema),
  metrics: createToggleableSchema(metricsSchema),
  founders: createToggleableSchema(projectFoundersSchema),
  artifacts: artifactsSchema,
  media: createToggleableSchema(mediaSchema),
});

export function projectCompletion(project: NewProjectType) {
  const fields = [
    projectProfileCompletion(project),
    projectContactCompletion(project),
    projectProgressCompletion(project),
    projectMetricsCompletion(project),
    projectFoundersCompletion(project),
    projectArtifactsCompletion(project),
  ];

  return fields.reduce((a, b) => a + b, 0) / fields.length;
}

export type NewProjectType = z.infer<typeof newProjectSchema>;

export class NewProject implements NewProjectType {
  public account_id: NewProjectType["account_id"];
  public profile: NewProjectType["profile"];
  public contact: NewProjectType["contact"];
  public details: NewProjectType["details"];
  public metrics: NewProjectType["metrics"];
  public founders: NewProjectType["founders"];
  public artifacts: NewProjectType["artifacts"];
  public media: NewProjectType["media"];

  constructor(data?: unknown) {
    const parsed = newProjectSchema.safeParse(data);
    if (!parsed.success) {
      console.log({ error: parsed.error, data });
      this.account_id = "";
      this.profile = {
        logo: { url: "" },
        name: "",
        email: "",
        tagline: "",
        vertical: [],
        stage: "other",
      };
      this.contact = {
        visible: false,
        value: {},
      };
      this.details = {
        visible: false,
        value: {},
      };
      this.metrics = {
        visible: false,
        value: [],
      };
      this.founders = {
        visible: false,
        value: [],
      };
      this.artifacts = [];
      this.media = {
        visible: false,
        value: [],
      };
    } else {
      this.account_id = parsed.data.account_id;
      this.profile = parsed.data.profile;
      this.contact = parsed.data.contact;
      this.details = parsed.data.details;
      this.metrics = parsed.data.metrics;
      this.founders = parsed.data.founders;
      this.artifacts = parsed.data.artifacts;
      this.media = parsed.data.media;
    }
  }

  asType(): NewProjectType {
    return {
      account_id: this.account_id,
      profile: this.profile,
      contact: this.contact,
      details: this.details,
      metrics: this.metrics,
      founders: this.founders,
      artifacts: this.artifacts,
      media: this.media,
    };
  }

  static #parseOldSocials(linktree?: Linktree | null) {
    const socials: NewProjectType["profile"]["socials"] = {};
    if (linktree?.twitter && xSchema.safeParse(linktree.twitter).success) {
      socials.x = linktree.twitter;
    }
    if (
      linktree?.telegram &&
      telegramSchema.safeParse(linktree.telegram).success
    ) {
      socials.telegram = linktree.telegram;
    }
    if (
      linktree?.linkedin &&
      linkedinSchema.safeParse(linktree.linkedin).success
    ) {
      socials.linkedin = linktree.linkedin;
    }
    return socials;
  }

  static #parseOldArtifacts(data: Project & { digest: BackersDigest }) {
    const artifacts: NewProjectType["artifacts"] = [];

    if (data.digest.pitch ?? data.deck) {
      const value = data.digest.pitch
        ? data.digest.pitch.startsWith("http")
          ? {
              url: data.digest.pitch,
            }
          : {
              file: data.digest.pitch,
            }
        : data.deck
          ? data.deck.startsWith("http")
            ? {
                url: data.deck,
              }
            : {
                file: data.deck,
              }
          : undefined;
      if (value) {
        artifacts.push({
          visible: false,
          value: { name: "Pitch Deck", value },
        });
      }
    }

    if (data.digest.demo ?? data.demo) {
      const value = data.digest.demo
        ? data.digest.demo.startsWith("http")
          ? {
              url: data.digest.demo,
            }
          : {
              file: data.digest.demo,
            }
        : data.demo
          ? data.demo.startsWith("http")
            ? {
                url: data.demo,
              }
            : {
                file: data.demo,
              }
          : undefined;
      if (value) {
        artifacts.push({
          visible: false,
          value: { name: "Demo Day Pitch", value },
        });
      }
    }

    if (data.digest.demo_video) {
      artifacts.push({
        visible: false,
        value: {
          name: "Demo Video",
          value: data.digest.demo_video.startsWith("http")
            ? {
                url: data.digest.demo_video,
              }
            : {
                file: data.digest.demo_video,
              },
        },
      });
    }

    return artifacts;
  }

  static #parseOldFounders(data: Project & { digest: BackersDigest }) {
    return data.digest.founders
      ? data.digest.founders.reduce(
          (acc, founder) => {
            type Founder = NewProjectType["founders"]["value"][number];

            const list = Object.entries(founder).map<Founder>(
              ([name, value]) => {
                if (typeof value === "string") {
                  return { name, account_id: value };
                }

                const socials: NewProjectType["profile"]["socials"] = {};
                if (value.twitter) {
                  socials.x = value.twitter;
                }
                if (value.telegram) {
                  socials.telegram = value.telegram;
                }
                if (value.linkedin) {
                  socials.linkedin = value.linkedin;
                }

                return { name, socials };
              },
            );

            acc.push(...list);

            return acc;
          },
          [] as NewProjectType["founders"]["value"],
        )
      : [];
  }

  static fromOld(data: Project & { digest: BackersDigest }): NewProject {
    const socials = NewProject.#parseOldSocials(data.linktree);

    const artifacts = NewProject.#parseOldArtifacts(data);

    const parsedStage = stageSchema.safeParse(data.stage);

    const stage = parsedStage.success ? parsedStage.data : "other";

    const companySize = Number(
      data.company_size ?? data.digest.company_size ?? 0,
    );

    const size =
      companySize < 10 ? "small" : companySize < 50 ? "medium" : "large";

    const parsedVertical = verticalSchema
      .array()
      .safeParse(Object.keys(data.vertical ?? {}));

    const vertical = parsedVertical.success ? parsedVertical.data : "other";

    const contact: NewProjectType["contact"] = { visible: false, value: {} };

    if (data.digest.email) {
      contact.value.email = data.digest.email;
    }

    if (data.digest.calendly_link) {
      contact.value.meeting_link = data.digest.calendly_link;
    }

    const founders = NewProject.#parseOldFounders(data);

    const parsedLocation = locationSchema.safeParse(data.geo);

    const location = parsedLocation.success ? parsedLocation.data : undefined;

    return new NewProject({
      account_id: data.account_id,
      profile: {
        name: data.name,
        logo: data.image,
        email: contact.value.email ?? "test@test.com",
        vertical,
        stage,
        tagline: data.tagline ?? " ".repeat(20),
        website: data.website ? data.website : "test.com",
        socials,
        location,
        size,
      },
      contact,
      details: {
        visible: false,
        value: {
          open_source: data.distribution === "open-source",
          near_integration:
            data.integration === "no"
              ? "no"
              : data.integration === "interested"
                ? "in-progress"
                : "yes",
          problem: data.problem
            ? data.problem.concat(
                " ".repeat(Math.max(0, 50 - data.problem.length)),
              )
            : " ".repeat(50),
          fundraising: data.digest.fundraising,
        },
      },
      metrics: {
        visible: true,
        value: data.digest.traction
          ? typeof data.digest.traction === "string"
            ? []
            : Object.entries(data.digest.traction).map(([name, value]) => ({
                name,
                value,
              }))
          : [],
      },
      founders: {
        visible: true,
        value: founders,
      },
      artifacts,
      media: {
        visible: true,
        value: data.digest.announcement ? [data.digest.announcement] : [],
      },
    });
  }
}