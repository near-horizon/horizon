"use client";

import { type DefaultValues } from "react-hook-form";
import { ProfileLayout } from "../profile-layout";
import { SelectInput } from "~/components/inputs/select";
import { NumberInput } from "~/components/inputs/number";
import { RadioGroupInput } from "~/components/inputs/radio-group";
import { type TypeOf, z } from "zod";
import { stage } from "~/lib/constants/filters";

const formSchema = z
  .object({
    stage: z.string(),
    fundraising: z.string(),
    raise: z.coerce.number(),
    investment: z.coerce.number(),
  })
  .partial();

const stageOptions = Object.entries(stage).map(([value, text]) => ({
  value,
  text,
}));

export function FundingForm({
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
      title="Funding information"
      progress={completion}
      formSchema={formSchema}
      defaultValues={defaultValues}
      editData={(control) => (
        <>
          <SelectInput
            name="stage"
            control={control}
            options={stageOptions}
            label="Project stage"
          />
          <RadioGroupInput
            name="fundraising"
            control={control}
            options={[
              { text: "Yes", id: "true" },
              { text: "No", id: "false" },
            ]}
            description="Are you currently fundraising?"
            label="Are you currently fundraising?"
          />
          <NumberInput
            name="raise"
            control={control}
            label="How much investment do you expect to raise?"
          />
          <NumberInput
            name="investment"
            control={control}
            label="Have you taken any investment so far?"
          />
        </>
      )}
    >
      {children}
    </ProfileLayout>
  );
}
