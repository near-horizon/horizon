"use client";

import { useRequest } from "~/hooks/requests";
import {
  type AccountId,
  accountIdSchema,
  type CID,
} from "~/lib/validation/common";
import { Form } from "../ui/form";
import { useZodForm } from "~/hooks/form";
import { useUser } from "~/stores/global";
import { clearLocalSaveForm } from "~/lib/client/mutating";
import { TextInput } from "../inputs/text";
import { TextAreaInput } from "../inputs/text-area";
import { Button } from "../ui/button";
import { useCreateProposal } from "~/hooks/proposals";
import { ComboboxInput } from "../inputs/combobox";
import { NumberInput } from "../inputs/number";
import { DateInput } from "../inputs/date";
import { z } from "zod";
import {
  paymentSourceSchema,
  paymentTypeSchema,
  requestTypeSchema,
} from "~/lib/validation/requests";
import { Progress } from "../ui/progress";
import Link from "next/link";
import { Send01Svg } from "~/icons";
import { useLocalSaveForm } from "~/hooks/mutating";

const formSchema = z.object({
  request_id: z.tuple([accountIdSchema, z.string()]),
  vendor_id: accountIdSchema,
  title: z.string().min(3).max(50),
  description: z.string().min(30).max(500),
  start_date: z.string(),
  end_date: z.string(),
  price: z.number().min(0),
  proposal_type: requestTypeSchema,
  payment_type: paymentTypeSchema,
  payment_source: paymentSourceSchema,
});

export function ProposalForm({
  accountId,
  cid,
}: {
  accountId: AccountId;
  cid: CID;
}) {
  const user = useUser();
  const { data: request } = useRequest(accountId, cid);
  const form = useZodForm(formSchema, {
    defaultValues: {
      request_id: [accountId, cid],
      vendor_id: user!.accountId,
      title: request?.title,
      price: request?.budget,
      payment_type: request?.payment_type,
      payment_source: request?.source,
      proposal_type: request?.request_type,
      start_date: new Date().toISOString(),
      end_date: new Date(
        Number(request?.deadline.substring(0, 13))
      ).toISOString(),
      description: "",
    },
  });
  const [progress, createProposal] = useCreateProposal();
  const formId = `proposal-${accountId}-${cid}-${user?.accountId}`;
  useLocalSaveForm(form, formSchema, formId);

  if (progress.value > 0 && progress.value < 100) {
    return (
      <div>
        <span>{progress.label}</span>
        <Progress value={progress.value} />
      </div>
    );
  }

  if (progress.value === 100) {
    return (
      <div>
        <span>{progress.label}</span>
        <Button variant="link">
          <Link href="/requests">View other requests</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-start gap-16">
      <Form {...form}>
        <form
          className="w-full"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit((proposal) => {
            clearLocalSaveForm(formId);
            createProposal.mutate({
              proposal: {
                ...proposal,
                start_date: `${new Date(proposal.start_date).getTime()}`,
                end_date: `${new Date(proposal.end_date).getTime()}`,
              },
            });
          })}
        >
          <TextInput
            control={form.control}
            name="title"
            placeholder="Enter the proposal title"
            rules={{ required: true }}
            disabled={false}
          />
          <TextAreaInput
            control={form.control}
            name="description"
            placeholder="Add a short description"
            rules={{ required: true }}
            disabled={false}
            maxLength={500}
          />
          <div className="w-3/5">
            <ComboboxInput
              control={form.control}
              name="proposal_type"
              placeholder="Select a proposal type"
              rules={{ required: true }}
              disabled={false}
              options={formSchema.shape.proposal_type.options.map((value) => ({
                text: value,
                value,
              }))}
            />
            <ComboboxInput
              control={form.control}
              name="payment_type"
              placeholder="Select a payment type"
              rules={{ required: true }}
              disabled={false}
              options={formSchema.shape.payment_type.options.map((value) => ({
                text: value,
                value,
              }))}
            />
            <ComboboxInput
              control={form.control}
              name="payment_source"
              placeholder="Select a payment source"
              rules={{ required: true }}
              disabled={false}
              options={formSchema.shape.payment_source.options.map((value) => ({
                text: value,
                value,
              }))}
            />
            <NumberInput
              control={form.control}
              name="price"
              placeholder="Enter the budget"
              rules={{ required: true }}
              disabled={false}
            />
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-4">
            <DateInput
              control={form.control}
              name="start_date"
              placeholder="Enter the start date"
              rules={{ required: true }}
              disabled={false}
              invalidDates={(date) =>
                z.date().max(new Date()).safeParse(date).success
              }
            />
            <DateInput
              control={form.control}
              name="end_date"
              placeholder="Enter the end date"
              rules={{ required: true }}
              disabled={false}
              invalidDates={(date) =>
                z.date().max(new Date()).safeParse(date).success
              }
            />
          </div>
          <div className="mt-6 flex flex-row items-center justify-between">
            <Button variant="destructive">Cancel</Button>
            <Button
              variant="default"
              disabled={!form.formState.isValid}
              className="inline-flex flex-row items-center justify-between gap-2"
            >
              <Send01Svg className="w-5" />
              Send proposal
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
