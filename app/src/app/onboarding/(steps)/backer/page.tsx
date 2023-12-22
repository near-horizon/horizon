"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";
import { OnboardingText } from "~/components/inputs/onboarding/text";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useZodForm } from "~/hooks/form";
import { ArrowNarrowLeftSvg, ArrowNarrowRightSvg } from "~/icons";
import { cn } from "~/lib/utils";
import { nameSchema } from "~/lib/validation/inputs";
import { setBackerOnboarding, useOnboarding } from "~/stores/global";

const formSchema = z.object({
  name: nameSchema,
});

export default function BackerOnboarding() {
  const onboarding = useOnboarding<"backer">();
  const form = useZodForm(formSchema, {
    defaultValues: {
      name: onboarding?.name ?? "",
    },
  });
  const router = useRouter();
  const back = () => router.push("/onboarding");
  const next = () => router.push("/onboarding/backer/logo");

  useEffect(() => {
    if (onboarding?.name) {
      form.setValue("name", onboarding.name);
      void form.trigger("name");
    }
  }, [onboarding, form]);

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit((data) => {
          setBackerOnboarding({
            name: data.name,
            step: Math.max(3, onboarding?.step ?? 0),
          });
          next();
        })}
        className="mx-auto flex h-full max-w-screen-sm flex-col items-center justify-center"
      >
        <small className="block w-full text-ui-elements-dark">
          Step 2 of 7
        </small>

        <OnboardingText
          control={form.control}
          name="name"
          label="What's your public name?"
          maxLength={100}
        />

        <div className="flex w-full flex-row items-center justify-between pt-6">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              back();
            }}
            className="flex flex-row items-center justify-center gap-2 font-medium text-ui-elements-dark"
          >
            <ArrowNarrowLeftSvg className="h-5 w-5" />
            Back
          </Button>

          <Button
            type="submit"
            className={cn(
              "flex flex-row items-center justify-center gap-2 font-medium text-ui-elements-dark",
              !form.formState.isValid && "opacity-50",
            )}
            onClick={(e) => {
              if (!form.formState.isValid) {
                e.preventDefault();
                void form.trigger();
              }
            }}
          >
            Next
            <ArrowNarrowRightSvg className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
