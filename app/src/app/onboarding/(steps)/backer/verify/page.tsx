"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { OnboardingCode } from "~/components/inputs/onboarding/code";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useZodForm } from "~/hooks/form";
import { ArrowNarrowLeftSvg, ArrowNarrowRightSvg } from "~/icons";
import { sendCode, verifyCode } from "~/lib/client/auth";
import { cn } from "~/lib/utils";
import { setBackerOnboarding, useOnboarding } from "~/stores/global";

const formSchema = z.object({
  code: z.string().refine(verifyCode, { message: "Invalid code" }),
});

export default function BackerEmail() {
  const onboarding = useOnboarding<"backer">();
  const form = useZodForm(formSchema, {
    mode: "onSubmit",
    defaultValues: {
      code: "",
    },
  });
  const router = useRouter();
  const back = "/onboarding/backer/email";
  const next = () => router.push("/onboarding/backer/create");

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit((_) => {
          setBackerOnboarding({
            email: {
              address: onboarding?.email?.address ?? "",
              verified: true,
            },
            step: Math.max(6, onboarding?.step ?? 0),
          });
          next();
        })}
        className="mx-auto flex h-full max-w-screen-sm flex-col items-center justify-center"
      >
        <small className="block w-full text-ui-elements-dark">
          Step 5 of 7
        </small>

        <OnboardingCode
          control={form.control}
          name="code"
          label="Enter verification code"
          description="Check your inbox for a verification code and type it below"
        />

        <Button
          type="button"
          variant="link"
          className="text-text-link"
          onClick={() => {
            if (onboarding?.email?.address) {
              void sendCode(onboarding?.email?.address);
            }
          }}
        >
          Resend code
        </Button>

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
            Next
            <ArrowNarrowRightSvg className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
