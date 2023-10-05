"use client";

import { useProject, useProjectCompletion } from "~/lib/projects";
import { ProfileLayout } from "../profile-layout";
import { useEffect } from "react";
import { useAccountId } from "~/stores/global";
import { LabeledData } from "~/components/profile/labeled-data";
import { z } from "zod";
import { updateFields, useZodForm } from "~/hooks/form";
import { NumberInput } from "~/components/inputs/number";
import { SelectInput } from "~/components/inputs/select";
import { RadioGroupInput } from "~/components/inputs/radio-group";

const formSchema = z
  .object({
    stage: z.string(),
    fundraising: z.string(),
    raise: z.coerce.number(),
    investment: z.coerce.number(),
  })
  .partial();

const stageSchema = {
  "pre-seed": "Pre-seed",
  seed: "Seed",
  "series-a": "Series A",
  "series-b": "Series B",
  "series-c": "Series C",
  "series-d": "Series D",
};

const stageOptions = Object.entries(stageSchema).map(([value, text]) => ({
  value,
  text,
}));

export default function FundingInfo({ }) {
  const accountId = useAccountId();
  const { data } = useProject(accountId ?? "");
  const { funding } = useProjectCompletion();
  const form = useZodForm(formSchema, {
    defaultValues: {
      stage: data?.stage ?? "",
      fundraising: (data?.funding as string) ?? "",
      raise: Number((data?.raise as string) ?? 0),
      investment: Number((data?.investment as string) ?? 0),
    },
  });
  useEffect(() => {
    if (data) {
      updateFields(form, formSchema, {
        stage: data?.stage ?? "",
        fundraising: (data?.funding as string) ?? "",
        raise: Number((data?.raise as string) ?? 0),
        investment: Number((data?.investment as string) ?? 0),
      });
    }
  }, [form, data]);

  return (
    <ProfileLayout
      title="Funding information"
      progress={funding}
      form={form}
      editData={
        <>
          <SelectInput
            name="stage"
            control={form.control}
            options={stageOptions}
            label="Project stage"
          />
          <RadioGroupInput
            name="fundraising"
            control={form.control}
            options={[
              { text: "Yes", id: "true" },
              { text: "No", id: "false" },
            ]}
            description="Are you currently fundraising?"
            label="Are you currently fundraising?"
          />
          <NumberInput
            name="raise"
            control={form.control}
            label="How much investment do you expect to raise?"
          />
          <NumberInput
            name="investment"
            control={form.control}
            label="Have you taken any investment so far?"
          />
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <LabeledData label="Project stage">
          {stageSchema[data?.stage as keyof typeof stageSchema] ??
            "No stage data"}
        </LabeledData>
        <LabeledData label="Are you currently fundraising?">
          {data?.fundraising
            ? data.fundraising === "true"
              ? "Yes"
              : "No"
            : "No fundraising data"}
        </LabeledData>
        <LabeledData label="How much investment do you expect to raise?">
          {data?.raise ? `${data.raise as string} USD` : "No raise data"}
        </LabeledData>
        <LabeledData label="Have you taken any investment so far?">
          {data?.investment
            ? `${data.investment as string} USD`
            : "No investment data"}
        </LabeledData>
      </div>
    </ProfileLayout>
  );
}
