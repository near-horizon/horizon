"use client";

import { useProject, useProjectCompletion } from "~/hooks/projects";
import { ProfileLayout } from "../profile-layout";
import { useUser } from "~/stores/global";
import { LabeledData } from "~/components/profile/labeled-data";
import { Description } from "~/components/description";
import { ExternalLink } from "~/components/external-link";
import { Socials } from "~/components/socials";
import { z } from "zod";
import { linktreeSchema } from "~/lib/validation/fetching";
import { updateFields, useZodForm } from "~/hooks/form";
import { TextAreaInput } from "~/components/inputs/text-area";
import { TextInput } from "~/components/inputs/text";
import { NumberInput } from "~/components/inputs/number";
import { useEffect } from "react";

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

export default function BasicProfile() {
  const user = useUser();
  const { data, status } = useProject(user?.accountId ?? "");
  const { basic } = useProjectCompletion();
  const form = useZodForm(formSchema, {
    defaultValues: {
      description: data?.description ?? "",
      website: data?.website ?? "",
      company_size: Number(data?.company_size ?? 0),
      geo: data?.geo ?? "",
      linktree: data?.linktree ?? {},
      problem: data?.problem ?? "",
      success_position: data?.success_position ?? "",
      why: data?.why ?? "",
    },
  });
  useEffect(() => {
    if (data) {
      updateFields(form, formSchema, {
        description: data?.description ?? "",
        website: data?.website ?? "",
        company_size: Number(data?.company_size ?? 0),
        geo: data?.geo ?? "",
        linktree: data?.linktree ?? {},
        problem: data?.problem ?? "",
        success_position: data?.success_position ?? "",
        why: data?.why ?? "",
      });
    }
  }, [form, data]);

  return (
    <ProfileLayout
      title="Project overview"
      progress={basic}
      form={form}
      editData={
        <>
          <TextAreaInput
            name="description"
            control={form.control}
            label="Description"
            maxLength={2000}
          />
          <TextInput name="website" control={form.control} label="Website" />
          <NumberInput
            name="company_size"
            control={form.control}
            label="Company size"
          />
          <TextInput name="geo" control={form.control} label="Location" />
          <TextAreaInput
            name="problem"
            control={form.control}
            label="What problem(s) are you solving?"
            maxLength={2000}
          />
          <TextAreaInput
            name="success_position"
            control={form.control}
            label="What makes your team uniquely positioned for success?"
            maxLength={2000}
          />
          <TextAreaInput
            name="why"
            control={form.control}
            label="Why are you building on NEAR?"
            maxLength={2000}
          />
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <LabeledData label="Description">
          <Description
            text={data?.description ?? "No description provided"}
            loading={status === "loading"}
          />
        </LabeledData>
        <LabeledData label="Website">
          {data?.website ? (
            <ExternalLink href={data?.website ?? "#"}>
              {data.website}
            </ExternalLink>
          ) : (
            "No website provided"
          )}
        </LabeledData>
        <LabeledData label="Company size">
          {data?.company_size ?? "No company size provided"}
        </LabeledData>
        <LabeledData label="Location">
          {data?.geo ?? "No location provided"}
        </LabeledData>
        <LabeledData label="Social profiles">
          <Socials links={data?.linktree} />
        </LabeledData>
        <LabeledData label="What problem(s) are you solving?">
          <Description
            text={
              data?.problem.length ? data.problem : "No problem(s) provided"
            }
            loading={status === "loading"}
          />
        </LabeledData>
        <LabeledData label="What makes your team uniquely positioned for success?">
          <Description
            text={
              data?.success_position.length
                ? data.success_position
                : "No position provided"
            }
            loading={status === "loading"}
          />
        </LabeledData>
        <LabeledData label="Why are you building on NEAR?">
          <Description
            text={data?.why.length ? data.why : "No why provided"}
            loading={status === "loading"}
          />
        </LabeledData>
        {/* <LabeledData label="Why do you think you are going to win?"> */}
        {/*   <Description */}
        {/*     text={data?.win ?? ""} */}
        {/*     loading={status === "loading"} */}
        {/*   /> */}
        {/* </LabeledData> */}
        {/* <LabeledData label="What risks do you see that would get in your way?"> */}
        {/*   <Description */}
        {/*     text={data?.risks ?? ""} */}
        {/*     loading={status === "loading"} */}
        {/*   /> */}
        {/* </LabeledData> */}
        {/* <LabeledData label="Which projects in the NEAR Ecosystem do you intend to partner with?"> */}
        {/*   <Description */}
        {/*     text={data?.partners ?? ""} */}
        {/*     loading={status === "loading"} */}
        {/*   /> */}
        {/* </LabeledData> */}
      </div>
    </ProfileLayout>
  );
}
