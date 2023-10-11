"use client";

import { useState } from "react";
import { z } from "zod";
import { ComboboxInput } from "~/components/inputs/combobox";
import { EmailInput } from "~/components/inputs/email";
import { FileInput } from "~/components/inputs/file";
import { TextInput } from "~/components/inputs/text";
import { TextAreaInput } from "~/components/inputs/text-area";
import { ProgressDialog } from "~/components/progress-dialog";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useCreateBacker } from "~/hooks/backers";
import { useZodForm } from "~/hooks/form";
import { useLocalSaveForm } from "~/hooks/mutating";
import { withSSRSession } from "~/lib/auth";
import { hasBacker } from "~/lib/backers";
import { clearLocalSaveForm } from "~/lib/mutating";
import { type AccountId } from "~/lib/validation/common";

const verticals = [
  { text: "DeSci", value: "desci" },
  { text: "DeFi", value: "defi" },
  { text: "Gaming", value: "gaming" },
  { text: "Metaverse", value: "metaverse" },
  { text: "Commercial", value: "commercial" },
  {
    text: "Sports and Entertainment",
    value: "sports-and-entertainment",
  },
  { text: "Infrastructure", value: "infrastructure" },
  { text: "Social", value: "social" },
  { text: "Social Impact", value: "social-impact" },
  { text: "Creative", value: "creative" },
  { text: "Education", value: "education" },
];

const formSchema = z.object({
  email: z.string().email(),
  "Backer name": z.string().min(3).max(50),
  vertical: z
    .string()
    .refine((val) => verticals.some(({ value }) => value === val), {
      message: "Please select a vertical",
    }),
  tagline: z.string().min(3).max(50),
  description: z.string().min(30).max(500),
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
                name: backer["Backer name"],
                vertical: { [vertical]: "" },
                image: { ipfs_cid: cid },
              },
            });
          })}
        >
          <TextInput
            control={form.control}
            name="Backer name"
            placeholder="Enter your name"
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
              options={verticals}
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
            placeholder="Add a short description"
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
          <FileInput
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

export const getServerSideProps = withSSRSession(async function ({ req }) {
  if (req.session.user && (await hasBacker(req.session.user.accountId))) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }

  return { props: {} };
});
