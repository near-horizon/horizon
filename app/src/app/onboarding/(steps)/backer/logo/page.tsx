"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { OnboardingImage } from "~/components/inputs/onboarding/image";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useZodForm } from "~/hooks/form";
import { ArrowNarrowLeftSvg, ArrowNarrowRightSvg } from "~/icons";
import { cn } from "~/lib/utils";
import { imageSchema } from "~/lib/validation/common";
import { setBackerOnboarding, useOnboarding, useUser } from "~/stores/global";

const formSchema = z.object({
  logo: imageSchema,
});

function promptText(name: string, accountId: string) {
  const start =
    "Generate a logo for a backer on a blockchain accelerator marketplace whose name is ";
  const end = ". Make the logo in an animated style.";
  return `${start}${name} and blockchain account ID is ${accountId}${end}`;
}

export default function BackerLogo() {
  const onboarding = useOnboarding<"backer">();
  const user = useUser();
  const form = useZodForm(formSchema, {
    defaultValues: {
      logo: onboarding?.logo ?? { ipfs_cid: "" },
    },
  });
  const router = useRouter();
  const back = "/onboarding/backer";
  const next = () => router.push("/onboarding/backer/email");
  const [cid, setCid] = useState("");

  useEffect(() => {
    if (onboarding?.logo) {
      form.setValue("logo", onboarding.logo);
      void form.trigger("logo");

      if ("ipfs_cid" in onboarding.logo) {
        setCid(onboarding.logo.ipfs_cid);
      }
    }
  }, [onboarding, form]);

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit((_) => {
          setBackerOnboarding({
            logo: { ipfs_cid: cid },
            step: Math.max(4, onboarding?.step ?? 0),
          });
          next();
        })}
        className="mx-auto flex h-full max-w-screen-sm flex-col items-center justify-center"
      >
        <small className="block w-full text-ui-elements-dark">
          Step 3 of 7
        </small>

        <OnboardingImage
          control={form.control}
          name="logo"
          label="Add an avatar or logo"
          setCid={setCid}
          cid={cid}
          generate
          generateEnabled
          accountId={user.loggedIn ? user.accountId : ""}
          generatePrompt={promptText(
            onboarding?.name ?? "",
            user.loggedIn ? user.accountId : "",
          )}
          clearError={() => form.clearErrors("logo")}
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
