"use client";

import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useZodForm } from "~/hooks/form";
import { verifyCode } from "~/lib/client/auth";
// import { useOnboarding } from "~/stores/global";

export default function CreateBacker() {
  // const onboarding = useOnboarding<"backer">();
  const form = useZodForm(z.object({}));

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(async () => {
          await verifyCode("");
        })}
        className="flex h-full w-full flex-col items-center justify-center gap-4"
      >
        <h2 className="text-2xl font-bold">You&apos;re all set!</h2>
        <p className="text-ui-elements-dark">
          You&apos;ll be asked to provide some information about your profile.
        </p>
        <Button variant="default" type="submit">
          Create profile now
        </Button>
      </form>
    </Form>
  );
}
