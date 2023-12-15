"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { ComboboxInput } from "~/components/inputs/combobox";
import { DateInput } from "~/components/inputs/date";
import { NumberInput } from "~/components/inputs/number";
import { SelectInput } from "~/components/inputs/select";
import { TextInput } from "~/components/inputs/text";
import { TextAreaInput } from "~/components/inputs/text-area";
import { MotionDiv } from "~/components/motion";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { toast } from "~/components/ui/use-toast";
import { useZodForm } from "~/hooks/form";
import { useCreateProposal } from "~/hooks/proposals";
import { RefreshCw01Svg, UserPlus01Svg } from "~/icons";
import { getRequest } from "~/lib/client/requests";
import { cn } from "~/lib/utils";
import { type AccountId, cidSchema } from "~/lib/validation/common";
import {
  paymentSourceSchema,
  paymentTypeSchema,
  requestTypeSchema,
} from "~/lib/validation/requests";

const schema = z.object({
  cid: cidSchema,
  title: z.string().min(5).max(50),
  description: z.string().min(30).max(500),
  start_date: z.string(),
  end_date: z.string(),
  price: z.number().min(0),
  proposal_type: requestTypeSchema,
  payment_type: paymentTypeSchema,
  payment_source: paymentSourceSchema,
});

export function Contribute({
  accountId,
  requests,
  user_account_id,
}: {
  accountId: AccountId;
  requests: { cid: string; title: string }[];
  user_account_id: AccountId;
}) {
  const form = useZodForm(schema);
  const createProposal = useCreateProposal();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"empty" | "loading" | "selected">("empty");

  const isDisabled = !form.formState.isValid || form.formState.isSubmitting;

  const cid = form.watch("cid");

  useEffect(() => {
    if (cid) {
      setState("loading");
      getRequest(accountId, cid)
        .then((request) => {
          form.reset({
            cid,
            title: request.title,
            description: request.description,
            end_date: request.deadline,
            price: request.budget,
            proposal_type: request.request_type,
            payment_type: request.payment_type,
            payment_source: request.source,
          });
          setState("selected");
        })
        .catch(console.error);
    }
  }, [cid, form, accountId]);

  const handleSubmit = form.handleSubmit(async (values) => {
    await createProposal.mutateAsync({
      proposal: {
        request_id: [accountId, values.cid],
        vendor_id: user_account_id,
        ...values,
      },
    });
    toast({
      title: "Proposal created!",
      description: "Your proposal has been submitted successfully.",
    });
    setOpen(false);
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex flex-row items-center justify-center gap-2 text-ui-elements-black"
        >
          <UserPlus01Svg className="h-4 w-4" />
          Contribute
        </Button>
      </SheetTrigger>

      <Form {...form}>
        <SheetContent className="min-w-[600px]">
          <SheetHeader>
            <SheetTitle>Submit proposal</SheetTitle>
            <SheetDescription>
              Propose a contribution to this project
            </SheetDescription>
          </SheetHeader>

          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit} className="pt-8">
            <ComboboxInput
              control={form.control}
              name="cid"
              label="Request"
              placeholder="Select a request"
              options={requests.map(({ cid, title }) => ({
                text: title,
                value: cid,
              }))}
            />

            <MotionDiv
              variants={{
                empty: { opacity: 0, y: -10 },
                loading: { opacity: 1, y: 0 },
                selected: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3 }}
              initial="empty"
              animate={state}
              className="pt-8"
            >
              <MotionDiv
                variants={{
                  empty: { opacity: 0, y: -10 },
                  loading: { opacity: 1, y: 0 },
                  selected: { opacity: 0, y: -10 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <RefreshCw01Svg className="h-16 w-16 animate-spin text-ui-elements-gray" />
              </MotionDiv>

              <MotionDiv
                variants={{
                  empty: { opacity: 0, y: -10 },
                  loading: { opacity: 0, y: -10 },
                  selected: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <TextInput
                  control={form.control}
                  name="title"
                  label="Title"
                  placeholder="Enter the proposal title"
                  rules={{ required: true }}
                />

                <TextAreaInput
                  control={form.control}
                  name="description"
                  label="Description"
                  placeholder="Add a short description"
                  rules={{ required: true }}
                  maxLength={500}
                />

                <SelectInput
                  control={form.control}
                  name="proposal_type"
                  label="Proposal type"
                  placeholder="Select a proposal type"
                  rules={{ required: true }}
                  options={requestTypeSchema.options.map((value) => ({
                    text: value,
                    value,
                  }))}
                />

                <SelectInput
                  control={form.control}
                  name="payment_type"
                  label="Payment type"
                  placeholder="Select a payment type"
                  rules={{ required: true }}
                  options={paymentTypeSchema.options.map((value) => ({
                    text: value,
                    value,
                  }))}
                />

                <SelectInput
                  control={form.control}
                  name="payment_source"
                  label="Payment source"
                  placeholder="Select a payment source"
                  rules={{ required: true }}
                  options={paymentSourceSchema.options.map((value) => ({
                    text: value,
                    value,
                  }))}
                />

                <NumberInput
                  control={form.control}
                  name="price"
                  label="Price"
                  placeholder="Enter the budget"
                  rules={{ required: true }}
                />

                <DateInput
                  control={form.control}
                  name="start_date"
                  label="Start date"
                  placeholder="Enter the start date"
                  rules={{ required: true }}
                  invalidDates={(date) =>
                    z.date().max(new Date()).safeParse(date).success
                  }
                />

                <DateInput
                  control={form.control}
                  name="end_date"
                  label="End date"
                  placeholder="Enter the end date"
                  rules={{ required: true }}
                  disabled={false}
                  invalidDates={(date) =>
                    z.date().max(new Date()).safeParse(date).success
                  }
                />
              </MotionDiv>
            </MotionDiv>
          </form>

          <SheetFooter>
            <Button
              type="submit"
              variant="default"
              className={cn({ "opacity-50": isDisabled })}
              onClick={(e) => {
                if (isDisabled) {
                  e.preventDefault();
                  void form.trigger();
                }
              }}
            >
              Submit
            </Button>

            <SheetClose asChild>
              <Button
                variant="destructive"
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Form>
    </Sheet>
  );
}
