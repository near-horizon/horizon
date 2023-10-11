"use client";

import { z } from "zod";
import { updateFields, useZodForm } from "~/hooks/form";
import { accountIdSchema, permissionSchema } from "~/lib/validation/common";
import { linktreeSchema } from "~/lib/validation/fetching";
import { Form } from "../ui/form";
import { FileInput } from "./file";
import { useEffect, useState } from "react";
import { TextInput } from "./text";
import { CheckboxInput } from "./checkbox";
import { SocialProfilesInput } from "./socials";
import { useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { SelectInput } from "./select";
import { ProgressDialog } from "../progress-dialog";
import { useProject, useUpdateProject } from "~/hooks/projects";
import { useAccountId } from "~/stores/global";

const formSchema = z.object({
  founders: z.array(
    z.object({
      image: z.string(),
      first_name: z.string().min(3).max(50),
      last_name: z.string().min(3).max(50),
      account_id: accountIdSchema,
      permissions: z
        .string()
        .transform((value) =>
          z.array(permissionSchema.or(z.literal("user"))).parse([value])
        ),
      cto: z.boolean(),
      linktree: linktreeSchema,
    })
  ),
});

export function FounderInput() {
  const accountId = useAccountId();
  const { data } = useProject(accountId!);
  const form = useZodForm(formSchema);
  const array = useFieldArray({
    control: form.control,
    name: "founders",
  });
  const [cids, setCids] = useState<[string, string][]>([]);
  const [progressUpdate, updateProject] = useUpdateProject();
  useEffect(() => {
    if (data) {
      updateFields(form, formSchema, {
        founders: Object.entries(data?.team ?? {}).map(([key, value]) => ({
          account_id: key,
          first_name: "",
          last_name: "",
          image: "",
          permissions: value,
          cto: false,
          linktree: {},
        })),
      });
    }
  }, [form, data]);

  if (!accountId) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(({ founders }) => {
          updateProject.mutate({
            accountId,
            project: {
              team: Object.fromEntries(
                founders.map((founder) => [
                  founder.account_id,
                  // first_name: founder.first_name,
                  // last_name: founder.last_name,
                  // image: founder.image,
                  founder.permissions
                    .map((permission) =>
                      permission === "user" ? undefined : "Admin"
                    )
                    .filter(Boolean) as "Admin"[],
                  // cto: founder.cto,
                  // linktree: founder.linktree,
                ])
              ),
            },
          });
        })}
        className="flex w-full flex-col items-start justify-start gap-8"
      >
        {array.fields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, left: 40 }}
            animate={{ opacity: 1, left: 0 }}
            exit={{ opacity: 0, left: 40 }}
            transition={{ duration: 0.5 }}
            className="relative w-full origin-top rounded-lg bg-background-light px-12 py-8"
          >
            <Button
              variant="destructive"
              type="button"
              onClick={() => array.remove(index)}
              className="absolute right-12 top-8"
            >
              Remove founder
            </Button>
            <FileInput
              name={`founders.${index}.image`}
              control={form.control}
              label="Photo"
              rules={{ required: true }}
              defaultValue=""
              setCid={(cid) => {
                setCids((prev) => {
                  const old = prev.find(([id]) => id === field.id);
                  if (!old) {
                    return [...prev, [field.id, cid]];
                  }
                  return [
                    ...prev.filter(([id]) => id !== field.id),
                    [field.id, cid],
                  ];
                });
              }}
              cid={cids.find(([id]) => id === field.id)?.[1] ?? ""}
              generate
              generateEnabled={form.formState.isValid && form.formState.isDirty}
            />
            <div className="w-1/2">
              <TextInput
                name={`founders.${index}.first_name`}
                control={form.control}
                label="First name"
                rules={{ required: true }}
              />
              <TextInput
                name={`founders.${index}.last_name`}
                control={form.control}
                label="Last name"
                rules={{ required: true }}
              />
              <SelectInput
                name={`founders.${index}.permissions`}
                control={form.control}
                options={[
                  { text: "Admin", value: "Admin" },
                  { text: "User", value: "user" },
                ]}
                label="Permissions"
              />
              {/* <CheckboxInput */}
              {/*   name={`founders.${index}.permissions`} */}
              {/*   control={form.control} */}
              {/*   label="Is admin" */}
              {/* /> */}
              <CheckboxInput
                name={`founders.${index}.cto`}
                control={form.control}
                label="This person is also a technical founder / CTO"
              />
              <TextInput
                name={`founders.${index}.account_id`}
                control={form.control}
                label="NEAR Account ID"
                rules={{ required: true }}
              />
              <SocialProfilesInput
                name={`founders.${index}.linktree`}
                control={form.control}
                label="Social Profiles"
              />
            </div>
          </motion.div>
        ))}
        <Button
          variant="outline"
          type="button"
          onClick={() =>
            array.append({
              account_id: "",
              cto: false,
              first_name: "",
              image: "",
              last_name: "",
              linktree: {},
              permissions: [],
            })
          }
        >
          Add founder
        </Button>
        <div className="mt-6 flex w-full flex-row items-center justify-between">
          <Button
            variant="destructive"
            type="button"
            onClick={() => {
              array.remove();
              form.reset();
            }}
          >
            Cancel
          </Button>
          <ProgressDialog
            progress={progressUpdate.value}
            description={progressUpdate.label}
            title="Updating your profile"
            triggerText="Update founders"
          />
        </div>
      </form>
    </Form>
  );
}
