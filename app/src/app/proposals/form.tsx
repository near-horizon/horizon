"use client";

import { useState } from "react";
import { z } from "zod";
import { DateInput } from "~/components/inputs/date";
import { NumberInput } from "~/components/inputs/number";
import { SelectInput } from "~/components/inputs/select";
import { TextInput } from "~/components/inputs/text";
import { TextAreaInput } from "~/components/inputs/text-area";
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
import { UserPlus01Svg } from "~/icons";
import { cn } from "~/lib/utils";
import { type AccountId, type CID } from "~/lib/validation/common";
import {
  paymentSourceSchema,
  paymentTypeSchema,
  type Request,
  requestTypeSchema,
} from "~/lib/validation/requests";

const schema = z.object({
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
  cid,
  request,
  user_account_id,
}: {
  cid: CID;
  request: Request;
  user_account_id: AccountId;
}) {
  const form = useZodForm(schema);
  const createProposal = useCreateProposal();
  const [open, setOpen] = useState(false);

  const isDisabled = !form.formState.isValid || form.formState.isSubmitting;

  const handleSubmit = form.handleSubmit(async (values) => {
    await createProposal.mutateAsync({
      proposal: {
        request_id: [request.project_id, cid],
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
              Propose a contribution for this request
            </SheetDescription>
          </SheetHeader>

          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit} className="pt-8">
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
