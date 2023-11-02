"use client";

import { useProject, useProjectCompletion } from "~/hooks/projects";
import { ProfileLayout } from "../profile-layout";
import { useEffect } from "react";
import { useAccountId } from "~/stores/global";
import { LabeledData } from "~/components/profile/labeled-data";
import { z } from "zod";
import { updateFields, useZodForm } from "~/hooks/form";
import { NumberInput } from "~/components/inputs/number";
import { SelectInput } from "~/components/inputs/select";
import { RadioGroupInput } from "~/components/inputs/radio-group";
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

export default function TechInfo({}) {
  const accountId = useAccountId();
  const { data } = useProject(accountId ?? "");
  const { tech } = useProjectCompletion();
  const form = useZodForm(formSchema, {
    defaultValues: {
      userbase: Number(data?.userbase ?? "0"),
      tam: Number(data?.tam ?? "0"),
      integration: data?.integration ?? "",
      dev: data?.dev ?? "",
      mainnet: (data?.mainnet as string) ?? "",
      distribution: data?.distribution ?? "",
      token: (data?.token as string) ?? "",
    },
  });
  useEffect(() => {
    if (data) {
      updateFields(form, formSchema, {
        userbase: Number(data.userbase ?? "0"),
        tam: Number(data.tam ?? "0"),
        integration: data.integration ?? "",
        dev: data.dev ?? "",
        mainnet: (data.mainnet as string) ?? "",
        distribution: data.distribution ?? "",
        token: (data.token as string) ?? "",
      });
    }
  }, [form, data]);

  return (
    <ProfileLayout
      title="Marketing & techincal info"
      progress={tech}
      form={form}
      editData={
        <>
          <NumberInput
            name="userbase"
            control={form.control}
            label="Community / User base (MAU)"
          />
          <NumberInput
            name="tam"
            control={form.control}
            label="Total addressable market (TAM)"
          />
          <SelectInput
            name="integration"
            control={form.control}
            options={integrationOptions}
            label="Integration with NEAR"
          />
          <SelectInput
            name="dev"
            control={form.control}
            options={devOptions}
            label="Development phase"
          />
          <RadioGroupInput
            name="mainnet"
            control={form.control}
            options={[
              { text: "Yes", id: "true" },
              { text: "No", id: "false" },
            ]}
            description="Have you already launched on mainnet?"
            label="Have you already launched on mainnet?"
          />
          <RadioGroupInput
            name="distribution"
            control={form.control}
            options={distributionOptions}
            label="Is your project Open Source?"
            description="Is your project Open Source?"
          />
          <RadioGroupInput
            name="token"
            control={form.control}
            options={[
              { text: "Yes", id: "true" },
              { text: "No", id: "false" },
            ]}
            label="Do you plan to launch a token?"
            description="Do you plan to launch a token?"
          />
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <LabeledData label="Community / User base (MAU)">
          {Number(data?.userbase ?? 0).toLocaleString("en-US", {
            notation: "compact",
          })}
        </LabeledData>
        <LabeledData label="Total addressable market (TAM)">
          {Number(data?.tam ?? 0).toLocaleString("en-US", {
            notation: "compact",
          })}
        </LabeledData>
        <LabeledData label="Integration with NEAR">
          {integration[data?.integration as keyof typeof integration] ??
            "No integration data"}
        </LabeledData>
        <LabeledData label="Development phase">
          {devPhase[data?.dev as keyof typeof devPhase] ?? "No dev data"}
        </LabeledData>
        <LabeledData label="Have you already launched on mainnet?">
          {(data?.mainnet as string) ?? "No mainnet data"}
        </LabeledData>
        <LabeledData label="Is your project Open Source?">
          {distribution[data?.distribution as keyof typeof distribution] ??
            "No distribution data"}
        </LabeledData>
        <LabeledData label="Do you plan to launch a token?">
          {(data?.token as string) ?? "No token data"}
        </LabeledData>
      </div>
    </ProfileLayout>
  );
}
