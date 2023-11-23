"use client";

import { ProfileLayout } from "../profile-layout";
import { type TypeOf, z } from "zod";
import { linktreeSchema } from "~/lib/validation/fetching";
import { TextAreaInput } from "~/components/inputs/text-area";
import { TextInput } from "~/components/inputs/text";
import { NumberInput } from "~/components/inputs/number";
import { type DefaultValues } from "react-hook-form";
import { SocialProfilesInput } from "~/components/inputs/socials";
import { MultiSelectInput } from "~/components/inputs/multi-select";

const projectFormSchema = z
  .object({
    description: z.string().min(30).max(2000),
    website: z.string().url(),
    company_size: z.coerce.number(),
    geo: z.string(),
    linktree: linktreeSchema,
    problem: z.string().min(30).max(2000),
    success_position: z.string().min(30).max(2000),
    why: z.string().min(30).max(2000),
  })
  .partial();

export function ProjectBasicForm({
  children,
  completion,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues: DefaultValues<TypeOf<typeof projectFormSchema>>;
  completion: number;
}) {
  return (
    <ProfileLayout
      title="Project overview"
      progress={completion}
      formSchema={projectFormSchema}
      defaultValues={defaultValues}
      editData={(control) => (
        <>
          <TextAreaInput
            name="description"
            control={control}
            label="Description"
            maxLength={2000}
          />
          <TextInput name="website" control={control} label="Website" />
          <NumberInput
            name="company_size"
            control={control}
            label="Company size"
          />
          <TextInput name="geo" control={control} label="Location" />
          <TextAreaInput
            name="problem"
            control={control}
            label="What problem(s) are you solving?"
            maxLength={2000}
          />
          <TextAreaInput
            name="success_position"
            control={control}
            label="What makes your team uniquely positioned for success?"
            maxLength={2000}
          />
          <TextAreaInput
            name="why"
            control={control}
            label="Why are you building on NEAR?"
            maxLength={2000}
          />
        </>
      )}
    >
      <div className="flex flex-col gap-4">{children}</div>
    </ProfileLayout>
  );
}

const contributorFormSchema = z.object({
  description: z.string().min(30).max(2000),
  skills: z.string().min(30).max(2000),
  website: z.string().url(),
  rate: z.coerce.number(),
  location: z.string(),
  linktree: linktreeSchema,
  poc: z.string(),
  languages: z.array(z.string()),
});

export function ContributorBasicForm({
  children,
  completion,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues: DefaultValues<TypeOf<typeof contributorFormSchema>>;
  completion: number;
}) {
  return (
    <ProfileLayout
      title="Basic information"
      progress={completion}
      formSchema={contributorFormSchema}
      defaultValues={defaultValues}
      editData={(control) => (
        <>
          <TextAreaInput
            name="description"
            control={control}
            label="Description"
            maxLength={2000}
          />
          <TextAreaInput
            name="skills"
            control={control}
            label="Skills"
            maxLength={2000}
          />
          <NumberInput name="rate" control={control} label="Rate" />
          <TextInput name="website" control={control} label="Website" />
          <SocialProfilesInput
            name="linktree"
            control={control}
            label="Social profiles"
          />
          <TextInput name="poc" control={control} label="Point of contact" />
          <MultiSelectInput
            name="languages"
            control={control}
            label="Languages"
            options={[]}
          />
          <TextInput name="location" control={control} label="Location" />
        </>
      )}
    >
      <div className="flex flex-col gap-4">{children}</div>
    </ProfileLayout>
  );
}
