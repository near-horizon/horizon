"use client";

import { useState } from "react";
import { z } from "zod";
import { EmailInput } from "~/components/inputs/email";
import { ImageInput } from "~/components/inputs/image";
import { MultiSelectInput } from "~/components/inputs/multi-select";
import { TextInput } from "~/components/inputs/text";
import { TextAreaInput } from "~/components/inputs/text-area";
import { ProgressDialog } from "~/components/progress-dialog";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useCreateContributor } from "~/hooks/contributors";
import { useZodForm } from "~/hooks/form";
import { useLocalSaveForm } from "~/hooks/mutating";
import { clearLocalSaveForm } from "~/lib/client/mutating";
import { type AccountId } from "~/lib/validation/common";
import { verticalSchema } from "~/lib/validation/inputs";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(50),
  vertical: verticalSchema.array(),
  tagline: z.string().min(3).max(50),
  description: z.string().min(30).max(500),
  image: z.string(),
});

const formId = "create-contributor";

export function ContributorsCreate({ accountId }: { accountId: AccountId }) {
  const form = useZodForm(formSchema);
  const [progress, createContributor] = useCreateContributor();
  const [cid, setCid] = useState<string>("");
  useLocalSaveForm(form, formSchema, formId);

  return (
    <div className="mx-auto flex w-3/5 flex-col items-center justify-start gap-16">
      <h1 className="text-4xl font-bold text-text-black">
        Create a new contributor profile
      </h1>
      <Form {...form}>
        <form
          className="w-full"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(({ vertical, email, ...contributor }) => {
            clearLocalSaveForm(formId);
            createContributor.mutate({
              accountId,
              email,
              profile: {
                ...contributor,
                vertical: Object.fromEntries(vertical.map((v) => [v, ""])),
                image: { ipfs_cid: cid },
              },
            });
          })}
        >
          <TextInput
            control={form.control}
            name="name"
            label="Contributor name"
            placeholder="Enter your name"
            rules={{ required: true }}
          />
          <div className="w-3/5">
            <MultiSelectInput
              control={form.control}
              label="Vertical"
              placeholder="Vertical"
              name="vertical"
              rules={{ required: true }}
              options={verticalSchema.options}
            />
          </div>
          <TextInput
            control={form.control}
            name="tagline"
            placeholder="Your tagline or motto"
            rules={{ required: true }}
          />
          <TextAreaInput
            control={form.control}
            name="description"
            placeholder="Add a short description"
            rules={{ required: true }}
            maxLength={500}
          />
          <EmailInput
            control={form.control}
            name="email"
            placeholder="Email"
            rules={{ required: true }}
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
              triggerText="Create contributor profile"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
