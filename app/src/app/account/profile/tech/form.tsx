"use client";

import { RadioGroupInput } from "~/components/inputs/radio-group";
import { ProfileLayout } from "../profile-layout";
import { SelectInput } from "~/components/inputs/select";
import { NumberInput } from "~/components/inputs/number";
import { type DefaultValues } from "react-hook-form";
import { type TypeOf, z } from "zod";
import { devPhase, distribution, integration } from "~/lib/constants/filters";

const formSchema = z
  .object({
    userbase: z.coerce.number(),
    tam: z.coerce.number(),
    integration: z.string(),
    dev: z.string(),
    mainnet: z.string(),
    distribution: z.string(),
    token: z.string(),
  })
  .partial();

const integrationOptions = Object.entries(integration).map(([value, text]) => ({
  value,
  text,
}));

const devOptions = Object.entries(devPhase).map(([value, text]) => ({
  value,
  text,
}));

const distributionOptions = Object.entries(distribution).map(([id, text]) => ({
  id,
  text,
}));

export function TechForm({
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
      title="Marketing & techincal info"
      progress={completion}
      formSchema={formSchema}
      defaultValues={defaultValues}
      editData={(control) => (
        <>
          <NumberInput
            name="userbase"
            control={control}
            label="Community / User base (MAU)"
          />
          <NumberInput
            name="tam"
            control={control}
            label="Total addressable market (TAM)"
          />
          <SelectInput
            name="integration"
            control={control}
            options={integrationOptions}
            label="Integration with NEAR"
          />
          <SelectInput
            name="dev"
            control={control}
            options={devOptions}
            label="Development phase"
          />
          <RadioGroupInput
            name="mainnet"
            control={control}
            options={[
              { text: "Yes", id: "true" },
              { text: "No", id: "false" },
            ]}
            description="Have you already launched on mainnet?"
            label="Have you already launched on mainnet?"
          />
          <RadioGroupInput
            name="distribution"
            control={control}
            options={distributionOptions}
            label="Is your project Open Source?"
            description="Is your project Open Source?"
          />
          <RadioGroupInput
            name="token"
            control={control}
            options={[
              { text: "Yes", id: "true" },
              { text: "No", id: "false" },
            ]}
            label="Do you plan to launch a token?"
            description="Do you plan to launch a token?"
          />
        </>
      )}
    >
      {children}
    </ProfileLayout>
  );
}
