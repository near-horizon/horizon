"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";
import { OnboardingEmail } from "~/components/inputs/onboarding/email";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useZodForm } from "~/hooks/form";
import { ArrowNarrowLeftSvg } from "~/icons";
import { cn } from "~/lib/utils";
import { emailSchema } from "~/lib/validation/inputs";
import { setBackerOnboarding, useOnboarding } from "~/stores/global";

const formSchema = z.object({
  email: z.object({
    address: emailSchema,
    verified: z.boolean(),
  }),
});

export default function BackerEmail() {
  const onboarding = useOnboarding<"backer">();
  const form = useZodForm(formSchema, {
    defaultValues: {
      email: onboarding?.email ?? {
        address: "",
        verified: false,
      },
    },
  });
  const router = useRouter();
  const back = "/onboarding/backer/logo";
  const next = () => router.push("/onboarding/backer/verify");

  useEffect(() => {
    if (onboarding?.email) {
      form.setValue("email", onboarding.email);
      void form.trigger("email");
    }
  }, [onboarding, form]);

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit((data) => {
          setBackerOnboarding({
            email: {
              address: data.email.address,
              verified: false,
            },
            step: Math.max(5, onboarding?.step ?? 0),
          });
          next();
        })}
        className="mx-auto flex h-full max-w-screen-sm flex-col items-center justify-center"
      >
        <small className="block w-full text-ui-elements-dark">
          Step 4 of 7
        </small>

        <OnboardingEmail
          control={form.control}
          name="email.address"
          label="What's your contact email?"
        />

        <div className="flex w-full flex-row items-center justify-between pt-6">
          <Link href={back}>
            <Button
              variant="outline"
              type="button"
              className="flex flex-row items-center justify-center gap-2 font-medium text-ui-elements-dark"
            >
              <ArrowNarrowLeftSvg className="h-5 w-5" />
              Back
            </Button>
          </Link>

          <Button
            type="submit"
            className={cn(
              "flex flex-row items-center justify-center gap-2 bg-background-darker font-medium text-ui-elements-white",
              !form.formState.isValid && "opacity-50",
            )}
            onClick={(e) => {
              if (!form.formState.isValid) {
                e.preventDefault();
                void form.trigger();
              }
            }}
          >
            Send verification code
          </Button>
        </div>
      </form>
    </Form>
  );
}
