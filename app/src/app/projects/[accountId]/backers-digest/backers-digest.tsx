"use client";

import { type AccountId } from "~/lib/validation/common";
import { Toggleable } from "~/components/toggleable";
import { useZodForm } from "~/hooks/form";
import { Form } from "~/components/ui/form";
import {
  newProjectSchema,
  projectProfileCompletion,
} from "~/lib/validation/projects";
import { TextInput } from "~/components/inputs/text";
import { ImageInput } from "~/components/inputs/image";
import { useEffect, useState } from "react";
import { NUMBER } from "~/lib/format";
import { getNewProject } from "~/lib/client/projects";

// name: nameSchema,
// logo: imageSchema,
// email: emailSchema,
// vertical: verticalSchema,
// tagline: taglineSchema,
// website: websiteSchema.optional(),
// socials: socialsSchema.optional(),
// location: locationSchema.optional(),
// size: sizeSchema.optional(),

export function BackersDigest({ accountId }: { accountId: AccountId }) {
  const form = useZodForm(newProjectSchema);
  const [cid, setCid] = useState("");
  const profile = form.watch();

  useEffect(() => {
    getNewProject(accountId)
      .then((project) => {
        console.log("project", project);
        form.reset(project);
      })
      .catch(console.error);
  }, [accountId, form]);

  return (
    <Form {...form}>
      <form>
        <Toggleable disabled value={true} id="public">
          <div className="flex flex-col items-start justify-start gap-4">
            <h3 className="text-2xl font-bold">General information</h3>
            <div className="flex flex-row items-start justify-start gap-6">
              <span>
                Completed form:{" "}
                {NUMBER.percentage(projectProfileCompletion(profile))}
              </span>
            </div>

            <TextInput
              control={form.control}
              label="Name"
              placeholder="Name"
              name="profile.name"
              rules={{ required: true }}
            />

            <ImageInput
              name="profile.logo"
              control={form.control}
              label="Logo"
              rules={{ required: true }}
              defaultValue={{ ipfs_cid: "" }}
              setCid={setCid}
              cid={cid}
              generate
              generateEnabled={form.formState.isValid && form.formState.isDirty}
            />

            <TextInput
              control={form.control}
              label="Email"
              placeholder="Email"
              name="profile.email"
              rules={{ required: true }}
            />
          </div>
        </Toggleable>
      </form>
    </Form>
  );
}
