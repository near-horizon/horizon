"use client";

import { useState } from "react";
import { z } from "zod";
import { ComboboxInput } from "~/components/inputs/combobox";
import { EmailInput } from "~/components/inputs/email";
import { ImageInput } from "~/components/inputs/image";
import { TextInput } from "~/components/inputs/text";
import { TextAreaInput } from "~/components/inputs/text-area";
import { ProgressDialog } from "~/components/progress-dialog";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useZodForm } from "~/hooks/form";
import { clearLocalSaveForm } from "~/lib/mutating";
import { useCreateProject } from "~/hooks/projects";
import { type AccountId } from "~/lib/validation/common";
import { useLocalSaveForm } from "~/hooks/mutating";
import { verticals } from "~/lib/constants/filters";

const formSchema = z.object({
  email: z.string().email(),
  "Project name": z.string().min(3).max(50),
  vertical: z
    .string()
    .refine((val) => Object.keys(verticals).some((value) => value === val), {
      message: "Please select a vertical",
    }),
  tagline: z.string().min(3).max(50),
  description: z.string().min(30).max(500),
  image: z.string(),
});

const formId = "create-project";

export function ProjectCreate({ accountId }: { accountId: AccountId }) {
  const form = useZodForm(formSchema);
  const [progress, createProject] = useCreateProject();
  const [cid, setCid] = useState<string>("");
  useLocalSaveForm(form, formSchema, formId);

  return (
    <div className="mx-auto flex w-3/5 flex-col items-center justify-start gap-16">
      <h1 className="text-4xl font-bold text-text-black">
        Create a new project profile
      </h1>
      <Form {...form}>
        <form
          className="w-full"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(({ vertical, email, ...project }) => {
            clearLocalSaveForm(formId);
            createProject.mutate({
              accountId,
              email,
              profile: {
                ...project,
                name: project["Project name"],
                vertical: { [vertical]: "" },
                image: { ipfs_cid: cid },
              },
            });
          })}
        >
          <TextInput
            control={form.control}
            name="Project name"
            placeholder="Enter your project's name"
            rules={{ required: true }}
            defaultValue=""
            disabled={false}
          />
          <div className="w-3/5">
            <ComboboxInput
              control={form.control}
              name="vertical"
              placeholder="Select a vertical"
              rules={{ required: true }}
              defaultValue=""
              disabled={false}
              options={Object.entries(verticals).map(([key, value]) => ({
                text: value,
                value: key,
              }))}
            />
          </div>
          <TextInput
            control={form.control}
            name="tagline"
            placeholder="Your tagline or motto"
            rules={{ required: true }}
            defaultValue=""
            disabled={false}
          />
          <TextAreaInput
            control={form.control}
            name="description"
            placeholder="Describe your project"
            rules={{ required: true }}
            defaultValue=""
            disabled={false}
            maxLength={500}
          />
          <EmailInput
            control={form.control}
            name="email"
            placeholder="Email"
            rules={{ required: true }}
            defaultValue=""
            disabled={false}
          />
          <ImageInput
            name="image"
            control={form.control}
            label="Photo"
            rules={{ required: true }}
            defaultValue=""
            setCid={setCid}
            cid={cid}
            generate
            generateEnabled={form.formState.isValid && form.formState.isDirty}
          />
          <div className="mt-6 flex flex-row items-center justify-between">
            <Button variant="destructive">Cancel</Button>
            <ProgressDialog
              progress={progress.value}
              description={progress.label}
              title="Creating your profile"
              triggerText="Create project profile"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
