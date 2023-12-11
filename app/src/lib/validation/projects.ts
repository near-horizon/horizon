import { z } from "zod";
import { fetchManySchema, linktreeSchema, profileSchema } from "./fetching";
import {
  accountIdSchema,
  applicationSchema,
  imageSchema,
  permissionSchema,
  transactionSchema,
} from "./common";
import { incentiveTypeSchema } from "./incentives";
import {
  emailSchema,
  fundraisingSchema,
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
  verticalSchema,
  websiteSchema,
} from "./inputs";

export const projectsQuerySchema = fetchManySchema.extend({
  vertical: z.array(z.string()).optional(),
  integration: z.array(z.string()).optional(),
  dev: z.array(z.string()).optional(),
  stage: z.array(z.string()).optional(),
  size: z.array(z.tuple([z.number(), z.number()])).optional(),
  distribution: z.array(z.string()).optional(),
  fundraising: z.boolean().optional(),
});

export type ProjectsQuery = z.infer<typeof projectsQuerySchema>;

export const horizonSchema = z.object({
  founders: z.array(accountIdSchema),
  team: z.record(accountIdSchema, z.array(permissionSchema)),
  why: z.string(),
  integration: z.string(),
  success_position: z.string(),
  problem: z.string(),
  vision: z.string(),
  deck: z.string(),
  white_paper: z.string(),
  roadmap: z.string(),
  demo: z.string(),
  tam: z.string(),
  geo: z.string(),
  verified: z.boolean(),
  application: applicationSchema,
  credits: z.boolean(),
  contracts: z.array(accountIdSchema),
  credit_balance: z.number(),
  achieved_incentives: z.record(incentiveTypeSchema, z.number()),
});

export const projectSizeSchema = z.enum(["small", "medium", "large"]);

export const projectProfileSchema = z.object({
  name: nameSchema,
  logo: imageSchema,
  email: emailSchema,
  vertical: verticalSchema,
  tagline: taglineSchema,
  website: websiteSchema.optional(),
  socials: socialSchema.optional(),
  location: locationSchema.optional(),
  size: sizeSchema.optional(),
});

export function projectProfileCompletion({ profile }: NewProject) {
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
    profile.tagline && profile.tagline.length > 0,
    profile.website && profile.website.length > 0,
    profile.socials &&
      Object.values(profile.socials).some((v) => v && v.length > 0),
    profile.location && profile.location.length > 0,
    profile.size && profile.size.length > 0,
  ];

  return fields.filter(Boolean).length / fields.length;
}

export type ProjectProfile = z.infer<typeof projectProfileSchema>;

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
  contact: { value: contact },
}: NewProject) {
  if (!contact) {
    return 0;
  }

  const fields = [
    contact.email && contact.email.length > 0,
    contact.meeting_link && contact.meeting_link.length > 0,
  ];

  return fields.filter(Boolean).length / fields.length;
}

export const projectProgressSchema = z.object({
  stage: stageSchema,
  open_source: openSourceSchema.optional(),
  near_integration: nearIntegrationSchema.optional(),
  problem: problemSchema,
  needs: needsSchema.optional(),
  fundraising: fundraisingSchema.optional(),
  raised: raisedSchema.optional(),
});

export function projectProgressCompletion({
  progress: { value: progress },
}: NewProject) {
  if (!progress) {
    return 0;
  }

  const fields = [
    progress.stage && progress.stage.length > 0,
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
  account_id: accountIdSchema.optional(),
  socials: socialSchema.optional(),
});

export function projectFoundersCompletion({
  founders: { value: founders },
}: NewProject) {
  if (!founders) {
    return 0;
  }

  return +founders.some((founder) => {
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
  .record(z.string(), z.string().optional())
  .optional();

export function projectMetricsCompletion({
  metrics: { value: metrics },
}: NewProject) {
  return +(!!metrics && Object.values(metrics).some((v) => v && v.length > 0));
}

export const artifactSchema = z.object({
  name: z.string(),
  value: z.union([
    z.object({
      url: websiteSchema,
    }),
    z.object({
      file: z.string(),
    }),
  ]),
});

export const artifactsSchema = z.array(artifactSchema);

export function projectArtifactsCompletion({
  artifacts: { value: artifacts },
}: NewProject) {
  if (!artifacts) {
    return 0;
  }

  return +artifacts.some((artifact) => {
    const fields = [
      artifact.name && artifact.name.length > 0,
      artifact.value &&
        Object.values(artifact.value).some((v) => v && v.length > 0),
    ];

    return fields.filter(Boolean).length === fields.length;
  });
}

export const artifactNameOptions = [
  "Demo Day Pitch",
  "Pitch Deck",
  "Product Demo",
  "News Article",
  "Media Post",
  "Other",
];

export const newProjectSchema = z.object({
  profile: projectProfileSchema,
  contact: createToggleableSchema(projectContactSchema),
  progress: createToggleableSchema(projectProgressSchema),
  metrics: createToggleableSchema(metricsSchema),
  founders: createToggleableSchema(projectFoundersSchema),
  artifacts: createToggleableSchema(artifactsSchema),
});

export function projectCompletion(project: NewProject) {
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
  public profile: NewProjectType["profile"];
  public contact: NewProjectType["contact"];
  public progress: NewProjectType["progress"];
  public metrics: NewProjectType["metrics"];
  public founders: NewProjectType["founders"];
  public artifacts: NewProjectType["artifacts"];

  constructor(data: unknown) {
    const project = newProjectSchema.parse(data);
    this.profile = project.profile;
    this.contact = project.contact;
    this.progress = project.progress;
    this.metrics = project.metrics;
    this.founders = project.founders;
    this.artifacts = project.artifacts;
  }

  static fromOld(data: Project & { digest: BackersDigest }): NewProject {
    return new NewProject({
      profile: {
        name: data.name,
        logo: data.image,
        email: data.digest.email,
        vertical: Object.keys(data.vertical ?? {})[0],
        tagline: data.tagline,
        website: data.website,
        socials: {
          x: data.linktree?.twitter,
          telegram: data.linktree?.telegram,
          linkedin: data.linktree?.linkedin,
        },
        location: data.geo,
        size: data.company_size,
      },
      contact: {
        visible: false,
        value: {
          email: data.digest.email,
          meeting_link: data.digest.calendly_link,
        },
      },
      progress: {
        visible: false,
        value: {
          stage: data.stage,
          open_source: data.distribution === "open-source",
          near_integration:
            data.integration === "no"
              ? "no"
              : data.integration === "interested"
                ? "in-progress"
                : "yes",
          problem: data.problem,
          fundraising: data.digest.fundraising,
        },
      },
      metrics: {
        visible: true,
        value: data.digest.traction,
      },
      founders: {
        visible: true,
        value: data.digest.founders,
      },
      artifacts: {
        visible: true,
        value: [
          {
            name: "Pitch Deck",
            value: data.digest.pitch
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
                : undefined,
          },
          {
            name: "Demo Day Pitch",
            value: data.digest.demo
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
                : undefined,
          },
          {
            name: "Demo Video",
            value: data.digest.demo_video
              ? data.digest.demo_video.startsWith("http")
                ? {
                    url: data.digest.demo_video,
                  }
                : {
                    file: data.digest.demo_video,
                  }
              : undefined,
          },
        ],
      },
    });
  }
}

export const sectionSchema = z.enum([
  "basic",
  "tech",
  "funding",
  "founders",
  "files",
]);

export type Section = z.infer<typeof sectionSchema>;

export function isHorizonProjectKey(key: string): key is keyof HorizonProject {
  return key in horizonSchema.shape;
}

export type HorizonProject = z.infer<typeof horizonSchema>;

export const projectSchema = horizonSchema
  .merge(
    profileSchema.omit({ team: true }).extend({
      company_size: z.coerce.string().optional(),
    }),
  )
  .extend({
    creationTx: transactionSchema.optional(),
    account_id: accountIdSchema,
  });

export type Project = z.infer<typeof projectSchema>;

export const privateProjectSchema = z.object({
  email: z.string().email(),
});

export type PrivateProject = z.infer<typeof privateProjectSchema>;

export const backersDigestSchema = z.object({
  location: z.string().optional(),
  company_size: z.string().optional(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  email: z.string().optional(),
  calendly_link: z.string().optional(),
  linktree: linktreeSchema.nullable().optional(),
  traction: z.record(z.string(), z.string()).optional().nullable(),
  founders: z
    .array(z.record(z.string(), z.string().or(linktreeSchema)))
    .optional(),
  pitch: z.string().optional(),
  demo: z.string().optional(),
  demo_video: z.string().optional(),
  announcement: z.string().optional(),
  published: z.boolean().optional(),
  fundraising: z.boolean().optional(),
  token: z.string().optional(),
});

export type BackersDigest = z.infer<typeof backersDigestSchema>;
