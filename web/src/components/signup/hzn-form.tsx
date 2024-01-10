import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { schema } from "@pages/api/hzn/signup";
import { Separator } from "@components/ui/separator";
import { BinaryOptionField } from "@components/inputs/binary";
import { InputField } from "@components/inputs/input";
import { TextAreaField } from "@components/inputs/text-area";
import { SelectField } from "@components/inputs/select";
import { RotateCw } from "lucide-react";

export function SignupForm() {
  const form = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    shouldUseNativeValidation: false,
    resolver: zodResolver(schema),
    defaultValues: {
      cohort: "hzn2",
    },
  });
  const isDisabled = !form.formState.isValid;
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(
    "Submitting your application!",
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          setOpenDialog(true);
          try {
            const response = await fetch("/api/hzn/signup", {
              method: "POST",
              body: JSON.stringify(data),
            });

            if (response.ok) {
              setDialogTitle("Your application has been submitted!");
            } else {
              console.error(response);
              setDialogTitle(
                "There was an error submitting your application, please try again!",
              );
            }
          } catch (e) {
            console.error(e);
            setDialogTitle(
              "There was an error submitting your application, please try again!",
            );
          }
        })}
        className="space-y-10"
      >
        <Dialog open={openDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            {form.formState.isSubmitting ? (
              <RotateCw className="w-20 h-20 mx-auto text-primary animate-spin" />
            ) : (
              <DialogFooter>
                <a href="/hzn/thank-you">Ok</a>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>

        <FormField
          control={form.control}
          name="cohort"
          render={({ field }) => (
            <FormItem className="px-10 pt-8 pb-14 gap-5 bg-ui-elements-white border border-ui-elements-light shadow-lg rounded-2xl flex flex-col items-center justify-center">
              <FormLabel className="text-2xl font-bold text-black">
                What cohort are you applying for?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col md:flex-row gap-6"
                >
                  <FormItem className="h-28 w-[min(20rem,80svw)] relative space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value="hzn3"
                        className="h-full w-full rounded-xl"
                      />
                    </FormControl>
                    <FormLabel className="inset-0 absolute flex flex-col items-center justify-center gap-2">
                      <b className="font-bold text-2xl text-ui-elements-black">
                        HZN3
                      </b>
                      <span className="font-semibold text-ui-elements-black">
                        April - June 2024
                      </span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="px-10 pt-8 pb-14 gap-5 bg-ui-elements-white border border-ui-elements-light shadow-lg rounded-2xl flex flex-col items-end justify-center">
          <h3 className="w-full font-bold text-2xl">1. Personal information</h3>

          <InputField
            control={form.control}
            name="personal.fullName"
            label="Full name"
            placeholder=""
            type="text"
          />

          <InputField
            control={form.control}
            name="personal.email"
            label="Email"
            placeholder=""
            type="email"
          />

          <InputField
            control={form.control}
            name="personal.timezone"
            label="Your time zone"
            placeholder=""
            type="text"
          />

          <InputField
            control={form.control}
            name="personal.accountId"
            label="NEAR ID"
            description={
              <>
                If you don't have a NEAR Wallet,{" "}
                <a href="#" className="underline text-text-link">
                  create one
                </a>
              </>
            }
            optional
            placeholder=""
            type="text"
          />

          <BinaryOptionField
            control={form.control}
            name="personal.firstTime"
            label="Are you a first-time founder?"
            placeholder=""
          />

          <SelectField
            control={form.control}
            name="personal.background"
            label="What is your background?"
            placeholder=""
            options={[
              {
                label: "Technical - I actively write code",
                value: "technical",
              },
              {
                label: "Semi technical - I can write code but rarely do",
                value: "semi-technical",
              },
              {
                label:
                  "Minimally technical - I can carry technical conversations but I cannot code",
                value: "minimally-technical",
              },
              { label: "Not technical - I don't code", value: "non-technical" },
            ]}
          />

          <TextAreaField
            control={form.control}
            name="personal.about"
            label="Tell us about yourself"
            placeholder=""
            description="Please elaborate on experiences, projects, publications, etc that you would like us to know about"
          />

          <SelectField
            control={form.control}
            name="personal.time"
            label="How much time can you commit to the HZN?"
            placeholder=""
            options={[
              { label: "Less than 2 hours / week", value: "0-2" },
              { label: "2-4 hours / week", value: "2-4" },
              { label: "4-6 hours / week", value: "4-6" },
              { label: "6+ hours / week", value: "6-*" },
            ]}
          />

          <div className="h-16" />

          <InputField
            control={form.control}
            name="personal.linkedin"
            label="LinkedIn"
            placeholder=""
            type="text"
          />

          <InputField
            control={form.control}
            name="personal.x"
            label="X (ex. Twitter)"
            placeholder=""
            type="text"
            optional
          />

          <InputField
            control={form.control}
            name="personal.github"
            label="GitHub"
            placeholder=""
            type="text"
            optional
          />
        </div>
        <div className="px-10 pt-8 pb-14 gap-5 bg-ui-elements-white border border-ui-elements-light shadow-lg rounded-2xl flex flex-col items-end justify-center">
          <h3 className="w-full font-bold text-2xl">2. Project information</h3>
          <InputField
            control={form.control}
            name="project.name"
            label="Project name"
            placeholder=""
            type="text"
          />

          <InputField
            control={form.control}
            name="project.website"
            label="Project website"
            placeholder=""
            type="text"
          />

          <SelectField
            control={form.control}
            name="project.stage"
            label="What stage is your project in?"
            placeholder=""
            options={[
              { label: "Idea", value: "idea" },
              { label: "Built proof of concept/prototype", value: "prototype" },
              { label: "In private beta/testnet", value: "beta" },
              {
                label: "Live on mainnet without active users/contributors",
                value: "live-no-users",
              },
              {
                label: "Live on mainnet with active users/contributors",
                value: "live-users",
              },
            ]}
          />

          <SelectField
            control={form.control}
            name="project.openSource"
            label="Is your project open source?"
            placeholder=""
            options={[
              { label: "Yes, it is already open source", value: "yes" },
              {
                label: "Not yet, but I will make it open source",
                value: "not-yet",
              },
              { label: "I would prefer to keep it closed source", value: "no" },
              { label: "I haven't decided yet", value: "undecided" },
            ]}
          />

          <Separator className="w-full h-px bg-ui-elements-light my-8" />

          <TextAreaField
            control={form.control}
            name="project.what"
            label="What are you currently building?"
            placeholder=""
          />

          <TextAreaField
            control={form.control}
            name="project.unique"
            label="What makes your project unique?"
            placeholder=""
          />

          <TextAreaField
            control={form.control}
            name="project.goals"
            label="What are your top goals?"
            placeholder=""
          />

          <TextAreaField
            control={form.control}
            name="project.team"
            label="Who's your team?"
            placeholder=""
            description="If possible, please share location/timezones and linkedIn/socials of your team members."
          />

          <Separator className="w-full h-px bg-ui-elements-light my-8" />

          <TextAreaField
            control={form.control}
            name="project.audience"
            label="Who's your target audience?"
            placeholder=""
          />

          <BinaryOptionField
            control={form.control}
            name="project.activeUserbase"
            label="Do you have an active user base?"
            placeholder=""
          />

          <TextAreaField
            control={form.control}
            name="project.partnerships"
            label="Do you have any active partnerships?"
            placeholder=""
          />

          <BinaryOptionField
            control={form.control}
            name="project.raised"
            label="Have you raised any funding?"
            placeholder=""
          />

          <TextAreaField
            control={form.control}
            name="project.nextRound"
            label="When do you expect your next funding round?"
            placeholder=""
          />
        </div>

        <div className="px-10 pt-8 pb-14 gap-5 bg-ui-elements-white border border-ui-elements-light shadow-lg rounded-2xl flex flex-col items-end justify-center">
          <h3 className="w-full font-bold text-2xl">3. Referral</h3>

          <SelectField
            control={form.control}
            name="heard.type"
            label="How did you hear about HZN?"
            placeholder=""
            options={[
              { label: "A current or alumni HZN founder", value: "alumni" },
              {
                label: "A Near Foundation employee",
                value: "nf",
              },
              { label: "X (Twitter)", value: "x" },
              { label: "LinkedIn", value: "linkedin" },
              { label: "HZN event", value: "event" },
              { label: "NEARCON", value: "nearcon" },
              { label: "HZN blog", value: "blog" },
              { label: "Friend (not a current HZN member)", value: "friend" },
              {
                label: "Google or via search engine doing my own research",
                value: "se",
              },
              { label: "Other", value: "other" },
            ]}
          />
        </div>

        <div className="w-full flex items-center justify-center">
          <button
            type="submit"
            className={cn(
              "px-5 py-3 flex flex-row items-center justify-center gap-2 rounded-full bg-primary text-ui-elements-dark font-mediuum text-lg",
              {
                "bg-background-light text-ui-elements-gray": isDisabled,
              },
            )}
            onClick={(e) => {
              if (isDisabled) {
                e.preventDefault();
                void form.trigger();
                return;
              }
            }}
          >
            Submit application
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.87464 10.625L15.7496 2.75001M7.97033 10.8711L9.94141 15.9396C10.1151 16.3861 10.2019 16.6093 10.327 16.6745C10.4354 16.731 10.5646 16.7311 10.6731 16.6747C10.7983 16.6097 10.8854 16.3865 11.0596 15.9402L16.0023 3.27441C16.1595 2.87152 16.2381 2.67008 16.1951 2.54136C16.1578 2.42957 16.0701 2.34184 15.9583 2.3045C15.8296 2.2615 15.6281 2.34011 15.2252 2.49733L2.55943 7.44009C2.11313 7.61426 1.88997 7.70134 1.82494 7.82652C1.76857 7.93503 1.76864 8.06422 1.82515 8.17267C1.89033 8.29777 2.11358 8.38459 2.56009 8.55824L7.62859 10.5293C7.71923 10.5646 7.76455 10.5822 7.80271 10.6094C7.83653 10.6335 7.86611 10.6631 7.89024 10.6969C7.91746 10.7351 7.93508 10.7804 7.97033 10.8711Z"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </Form>
  );
}
