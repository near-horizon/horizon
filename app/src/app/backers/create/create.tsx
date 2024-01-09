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
import { useCreateBacker } from "~/hooks/backers";
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
  description: z.string().min(30).max(500).optional(),
  image: z.string(),
});

const formId = "create-backer";

export function BackersCreate({ accountId }: { accountId: AccountId }) {
  const form = useZodForm(formSchema);
  const [progress, createBacker] = useCreateBacker();
  const [cid, setCid] = useState<string>("");
  useLocalSaveForm(form, formSchema, formId);

  return (
    <div className="mx-auto flex w-3/5 flex-col items-center justify-start gap-16">
      <h1 className="text-4xl font-bold text-text-black">
        Create a new backer profile
      </h1>

      <Form {...form}>
        <form
          className="w-full"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(({ vertical, email, ...backer }) => {
            clearLocalSaveForm(formId);
            createBacker.mutate({
              accountId,
              email,
              profile: {
                ...backer,
                vertical: Object.fromEntries(vertical.map((v) => [v, ""])),
                image: { ipfs_cid: cid },
              },
            });
          })}
        >
          <TextInput
            control={form.control}
            name="name"
            label="Name"
            placeholder="Enter your name"
            rules={{ required: true }}
          />

          <MultiSelectInput
            control={form.control}
            name="vertical"
            label="Verticals"
            placeholder="Select a vertical"
            rules={{ required: true }}
            options={verticalSchema.options}
          />

          <TextInput
            control={form.control}
            name="tagline"
            label="Tagline"
            placeholder="Your tagline or motto"
            rules={{ required: true }}
          />

          <TextAreaInput
            control={form.control}
            name="description"
            label="Description"
            placeholder="Add a short description"
            rules={{ required: true }}
            maxLength={500}
          />

          <EmailInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email"
            rules={{ required: true }}
          />

          <ImageInput
            accountId=""
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
              triggerText="Create backer profile"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
