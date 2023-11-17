"use client";

import { ProfileLayout } from "../profile-layout";
import { type TypeOf, z } from "zod";
import { linktreeSchema } from "~/lib/validation/fetching";
import { TextAreaInput } from "~/components/inputs/text-area";
import { TextInput } from "~/components/inputs/text";
import { NumberInput } from "~/components/inputs/number";
import { type DefaultValues } from "react-hook-form";

const formSchema = z
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

export function BasicForm({
  children,
  completion,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues: DefaultValues<TypeOf<typeof formSchema>>;
  completion: number;
}) {
  return (
    <ProfileLayout
      title="Project overview"
      progress={completion}
      formSchema={formSchema}
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
