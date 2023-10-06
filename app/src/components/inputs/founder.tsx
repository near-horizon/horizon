"use client";

import { z } from "zod";
import { useZodForm } from "~/hooks/form";
import { accountIdSchema, permissionSchema } from "~/lib/validation/common";
import { linktreeSchema } from "~/lib/validation/fetching";
import { Form } from "../ui/form";
import { FileInput } from "./file";
import { useState } from "react";

const formSchema = z.object({
  image: z.string(),
  first_name: z.string().min(3).max(50),
  last_name: z.string().min(3).max(50),
  account_id: accountIdSchema,
  permissions: permissionSchema,
  linktree: linktreeSchema,
});

export function FounderInput() {
  const form = useZodForm(formSchema);
  const [cid, setCid] = useState<string>("");

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
        })}
      >
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
      </form>
    </Form>
  );
}
