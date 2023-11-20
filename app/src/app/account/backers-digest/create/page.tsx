"use client";

import { redirect } from "next/navigation";
import { useFieldArray } from "react-hook-form";
import { z } from "zod";
import { FileInput } from "~/components/inputs/file";
import { NumberInput } from "~/components/inputs/number";
import { SocialProfilesInput } from "~/components/inputs/socials";
import { TextInput } from "~/components/inputs/text";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { updateFields, useZodForm } from "~/hooks/form";
import {
  useBackersDigest,
  useProject,
  usePublishBackersDigest,
  useUpdateBackersDigest,
} from "~/hooks/projects";
import { linktreeSchema } from "~/lib/validation/fetching";
import { useUser } from "~/stores/global";
import { PlusCircleSvg, Target04Svg, XSvg } from "~/icons";
import { ImageInput } from "~/components/inputs/image";
import { useEffect } from "react";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { SelectInput } from "~/components/inputs/select";
import { CheckboxInput } from "~/components/inputs/checkbox";
import { useToast } from "~/components/ui/use-toast";
import { NUMBER } from "~/lib/format";

const schema = z.object({
  location: z.string().min(3).max(50).optional(),
  company_size: z.coerce.string(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  email: z.string().email().optional(),
  calendly_link: z.string().optional(),
  linktree: linktreeSchema.nullable(),
  traction: z.array(z.tuple([z.string(), z.string()])).optional(),
  founders: z
    .array(z.record(z.string(), z.string().or(linktreeSchema)))
    .optional(),
  pitch: z.string().optional(),
  demo: z.string().optional(),
  demo_video: z.string().optional(),
  announcement: z.string().optional(),
  fundraising: z.boolean().optional(),
});

export default function BackersDigestForm() {
  const user = useUser();
  const form = useZodForm(schema, {
    defaultValues: {
      traction: [["", ""]],
      founders: [{}],
    },
  });
  const { data, status } = useProject(user?.accountId ?? "");
  const { data: backersDigest } = useBackersDigest(user?.accountId ?? "");
  const traction = useFieldArray({
    control: form.control,
    name: "traction",
  });
  const founders = useFieldArray({
    control: form.control,
    name: "founders",
  });
  const aboutCompleted = NUMBER.percentage(
    (Number(form.watch("location") !== "") +
      Number(form.watch("company_size") !== "") +
      Number(form.watch("website") !== "") +
      Number(form.watch("linkedin") !== "") +
      Number(form.watch("twitter") !== "") +
      Number(form.watch("email") !== "") +
      Number(form.watch("calendly_link") !== "") +
      Number(Object.keys(form.watch("linktree") ?? {}).length > 0)) /
      8.0
  );
  const presentationCompleted =
    Number((form.watch("demo") ?? "") !== "") +
    Number((form.watch("pitch") ?? "") !== "") +
    Number((form.watch("demo_video") ?? "") !== "");
  const [progress, saveBackerDigest] = useUpdateBackersDigest();
  const [publishProgress, publishBackerDigest] = usePublishBackersDigest();
  const { toast } = useToast();

  useEffect(() => {
    if (data ?? backersDigest) {
      updateFields(form, schema, {
        location: backersDigest?.location ?? data?.geo ?? "",
        company_size: backersDigest?.company_size ?? data?.company_size ?? "",
        website:
          backersDigest?.website ??
          data?.website ??
          data?.linktree?.website ??
          "",
        linkedin: backersDigest?.linkedin ?? data?.linktree?.linkedin ?? "",
        twitter: backersDigest?.twitter ?? data?.linktree?.twitter ?? "",
        linktree: backersDigest?.linktree ?? data?.linktree ?? {},
        demo: backersDigest?.demo ?? data?.demo ?? "",
        pitch: backersDigest?.pitch ?? data?.deck ?? "",
        fundraising: backersDigest?.fundraising ?? false,
        ...(backersDigest?.email ? { email: backersDigest.email } : {}),
        ...(backersDigest?.calendly_link
          ? { calendly_link: backersDigest.calendly_link }
          : {}),
        ...(backersDigest?.demo_video
          ? { demo_video: backersDigest.demo_video }
          : {}),
        ...(backersDigest?.announcement
          ? { announcement: backersDigest.announcement }
          : {}),
        ...(backersDigest?.traction
          ? { traction: Object.entries(backersDigest.traction) }
          : {}),
        founders:
          backersDigest?.founders ??
          data?.founders.map((account_id) => ({ account_id })) ??
          [],
      });
    }
  }, [form, data, backersDigest]);

  useEffect(() => {
    if (progress.value === 100) {
      toast({
        title: "Saved!",
        description: "Your changes have been saved.",
      });
    }
  }, [progress, toast]);

  useEffect(() => {
    if (publishProgress.value === 100) {
      toast({
        title: "Published!",
        description: "Your backers digest has been published.",
      });
    }
  }, [publishProgress, toast]);

  if (!user || (!data && status !== "loading")) {
    return redirect("/login");
  }

  const buttons = (
    <div className="flex flex-row items-start justify-end gap-4">
      <Button
        variant="outline"
        type="button"
        className="flex flex-row items-center justify-center gap-2"
      >
        <Link href="/account/backers-digest">Preview</Link>
      </Button>
      <Button
        variant="default"
        type="submit"
        disabled={progress.value > 0 && progress.value < 100}
      >
        {progress.value > 0 && progress.value < 100 ? "Saving..." : "Save"}
      </Button>
      <Button
        variant="secondary"
        type="button"
        onClick={() => {
          publishBackerDigest.mutate({ accountId: user.accountId });
        }}
        disabled={publishProgress.value > 0 && publishProgress.value < 100}
      >
        Publish
      </Button>
    </div>
  );

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(({ traction, ...data }) => {
          saveBackerDigest.mutate({
            accountId: user.accountId,
            digest: {
              ...data,
              published: backersDigest?.published ?? false,
              ...(traction
                ? {
                    traction: Object.fromEntries(traction),
                  }
                : {}),
            },
          });
        })}
      >
        <div className="flex flex-row items-start justify-start gap-4">
          <div className="flex flex-grow flex-col gap-2">
            <div className="flex flex-row items-center justify-start gap-2">
              <Target04Svg className="h-10 w-10 text-error" />
              <h1 className="text-2xl font-bold">Backers digest</h1>
              <Badge
                variant="outline"
                className={cn(
                  "rounded border-orange-400 border-opacity-90 bg-orange-50 text-orange-700 mix-blend-multiply",
                  {
                    "border-primary bg-primary-light text-primary":
                      backersDigest?.published,
                  }
                )}
              >
                {backersDigest?.published ? "Published" : "Draft"}
              </Badge>
            </div>
          </div>
          {buttons}
        </div>
        <Section
          header="About"
          subheader={`Completed: ${aboutCompleted}`}
          description="Add more info about your startup"
        >
          <TextInput
            control={form.control}
            name="location"
            defaultValue=""
            label="Location"
          />
          <NumberInput
            control={form.control}
            name="company_size"
            defaultValue=""
            label="Compnany size"
          />
          <TextInput
            control={form.control}
            name="website"
            defaultValue=""
            label="Website"
          />
          <TextInput
            control={form.control}
            name="linkedin"
            defaultValue=""
            label="LinkedIn"
          />
          <TextInput
            control={form.control}
            name="twitter"
            defaultValue=""
            label="X (ex. Twitter)"
          />
          <TextInput
            control={form.control}
            name="email"
            defaultValue=""
            label="Contact email"
          />
          <TextInput
            control={form.control}
            name="calendly_link"
            defaultValue=""
            label="Calendly link"
          />
          <SocialProfilesInput
            control={form.control}
            name="linktree"
            defaultValue={backersDigest?.linktree ?? data?.linktree ?? {}}
            label="Social profiles"
          />
          <CheckboxInput
            name="fundraising"
            control={form.control}
            label="Fundraising"
            description="Check this box if you are currently fundraising"
            defaultValue={backersDigest?.fundraising ?? false}
          />
        </Section>

        <Section
          header="Founders"
          subheader="Add at least one founder"
          description="Every project has to have an individual face!"
        >
          <div className="flex w-full flex-col items-start justify-start gap-6">
            {founders.fields.map((field, index) => (
              <div
                key={field.id}
                className="relative flex w-full flex-col items-stretch justify-start gap-3"
              >
                <Button
                  variant="destructive"
                  type="button"
                  className="absolute right-0 top-0 flex w-1/12 flex-row items-center justify-center border-none"
                  onClick={() => founders.remove(index)}
                >
                  <XSvg className="h-4 w-4" />
                </Button>
                <ImageInput
                  control={form.control}
                  name={`founders.${index}.image` as const}
                  defaultValue=""
                  label="Photo"
                  setCid={(cid) =>
                    form.setValue(`founders.${index}.image`, cid)
                  }
                  cid={form.watch(`founders.${index}.image` as const) as string}
                />
                <TextInput
                  control={form.control}
                  name={`founders.${index}.first_name` as const}
                  defaultValue=""
                  label="First name"
                />
                <TextInput
                  control={form.control}
                  name={`founders.${index}.last_name` as const}
                  defaultValue=""
                  label="Last name"
                />
                <TextInput
                  control={form.control}
                  name={`founders.${index}.account_id` as const}
                  defaultValue=""
                  label="Account ID"
                />
                <SelectInput
                  control={form.control}
                  name={`founders.${index}.role`}
                  options={[
                    { text: "CEO", value: "ceo" },
                    { text: "CTO", value: "cto" },
                    { text: "CPO", value: "cpo" },
                    { text: "CMO", value: "cmo" },
                  ]}
                  defaultValue="ceo"
                  label="Role"
                />
                <SocialProfilesInput
                  control={form.control}
                  name={`founders.${index}.socials` as const}
                  defaultValue={{}}
                  label="Social profiles"
                />
              </div>
            ))}
            <div className="flex w-full flex-row items-start justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={() => founders.append({}, { shouldFocus: true })}
                className="flex flex-row items-center justify-center gap-2"
              >
                <PlusCircleSvg className="h-4 w-4" />
                Add founder
              </Button>
            </div>
          </div>
        </Section>

        <Section
          header="Traction"
          subheader="Add at least one traction metric"
          description="Add traction metrics to show your progress"
        >
          <div className="flex flex-row items-center justify-between gap-2">
            <h6 className="flex-grow text-sm font-bold">Metric name</h6>
            <h6 className="w-1/3 text-sm font-bold">Value</h6>
          </div>
          {traction.fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-row items-center justify-between gap-2"
            >
              <div className="flex-grow">
                <Input
                  {...form.register(`traction.${index}.0` as const)}
                  type="text"
                />
              </div>
              <div className="w-1/4">
                <Input
                  {...form.register(`traction.${index}.1` as const)}
                  type="text"
                />
              </div>
              <Button
                variant="destructive"
                type="button"
                className="flex w-1/12 flex-row items-center justify-center border-none"
                onClick={() => traction.remove(index)}
              >
                <XSvg className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex w-full flex-row items-start justify-end">
            <Button
              variant="outline"
              type="button"
              onClick={() => traction.append([["", ""]], { shouldFocus: true })}
              className="flex flex-row items-center justify-center gap-2"
            >
              <PlusCircleSvg className="h-4 w-4" />
              Add metric
            </Button>
          </div>
        </Section>

        <Section
          header="Presentation"
          subheader={`Uploaded: ${presentationCompleted}/3`}
        >
          <div className="rounded-xl border border-accent-disabled px-6 py-4">
            <FileInput
              control={form.control}
              name="demo"
              label="Demo day pitch"
            />
          </div>
          <div className="rounded-xl border border-accent-disabled px-6 py-4">
            <FileInput control={form.control} name="pitch" label="Pitch deck" />
          </div>
          <div className="flex flex-col items-stretch justify-start gap-6 rounded-xl border border-accent-disabled px-6 py-4">
            <h6 className="text-sm font-bold">Product demo video</h6>
            <TextInput
              control={form.control}
              name="demo_video"
              defaultValue=""
              label="Paste a link"
            />
          </div>
        </Section>

        <Section
          header="Announcement"
          subheader="(optional)"
          description="Add a link to your public announcement"
        >
          <TextInput
            control={form.control}
            name="announcement"
            defaultValue=""
            label="Public announcement link"
          />
        </Section>
        {buttons}
      </form>
    </Form>
  );
}

function Section({
  header,
  subheader,
  description,
  children,
}: {
  header: React.ReactNode;
  subheader?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-start justify-start gap-4">
      <div className="flex flex-grow flex-col gap-6 rounded-2xl border border-ui-elements-light bg-background-white p-10 pt-8 shadow">
        {children}
      </div>
      <div className="flex w-1/5 flex-col gap-3">
        <h4 className="text-xl font-bold">{header}</h4>
        <h5 className="text-sm text-ui-elements-gray">{subheader}</h5>
        <p className="text-sm text-ui-elements-dark">{description}</p>
      </div>
    </div>
  );
}
