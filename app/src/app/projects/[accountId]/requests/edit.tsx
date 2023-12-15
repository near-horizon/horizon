"use client";

import { useState } from "react";
import { z } from "zod";
import { DateInput } from "~/components/inputs/date";
import { MultiSelectInput } from "~/components/inputs/multi-select";
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
import { useUpdateRequest } from "~/hooks/requests";
import { cn } from "~/lib/utils";
import { accountIdSchema, type CID, cidSchema } from "~/lib/validation/common";
import {
  paymentSourceSchema,
  paymentTypeSchema,
  type Request,
  requestTypeSchema,
} from "~/lib/validation/requests";

const schema = z.object({
  cid: cidSchema,
  project_id: accountIdSchema,
  title: z.string().min(5).max(50),
  description: z.string().min(10).max(500),
  open: z.boolean(),
  request_type: requestTypeSchema,
  payment_type: paymentTypeSchema,
  tags: z.array(z.string()).max(8),
  source: paymentSourceSchema,
  deadline: z.string(),
  budget: z.number().min(1),
});

export function EditRequest({ request, cid }: { request: Request; cid: CID }) {
  const form = useZodForm(schema, {
    defaultValues: request,
  });
  const updateRequest = useUpdateRequest();
  const [open, setOpen] = useState(false);

  const isDisabled = !form.formState.isValid || form.formState.isSubmitting;

  const handleSubmit = form.handleSubmit(async (values) => {
    await updateRequest.mutateAsync({
      cid,
      request: values,
    });
    toast({
      title: "Request updated!",
      description: "Your request has been updated successfully.",
    });
    setOpen(false);
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>

      <Form {...form}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit request</SheetTitle>
            <SheetDescription>
              Make changes to your request here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>

          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit}>
            <TextInput
              control={form.control}
              name="title"
              rules={{ required: true }}
            />

            <TextAreaInput
              control={form.control}
              name="description"
              rules={{ required: true }}
              maxLength={500}
            />

            <MultiSelectInput
              control={form.control}
              name="tags"
              options={request.tags}
            />

            <div className="grid w-full grid-cols-12">
              <div className="col-span-6">
                <SelectInput
                  control={form.control}
                  name="request_type"
                  rules={{ required: true }}
                  options={requestTypeSchema.options.map((value) => ({
                    text: value.endsWith("Time")
                      ? value.substring(0, value.indexOf("Time"))
                      : value,
                    value,
                  }))}
                />
              </div>

              <div className="col-span-6">
                <SelectInput
                  control={form.control}
                  name="payment_type"
                  rules={{ required: true }}
                  options={paymentTypeSchema.options.map((value) => ({
                    text: value.substring(0, 4) + " " + value.substring(4),
                    value,
                  }))}
                />
              </div>

              <div className="col-span-6">
                <SelectInput
                  control={form.control}
                  name="source"
                  rules={{ required: true }}
                  options={paymentSourceSchema.options.map((value) => ({
                    text: value,
                    value,
                  }))}
                />
              </div>

              <div className="col-span-6">
                <NumberInput
                  control={form.control}
                  name="budget"
                  rules={{ required: true }}
                />
              </div>

              <div className="col-span-6">
                <DateInput
                  control={form.control}
                  name="deadline"
                  rules={{ required: true }}
                  invalidDates={(date) =>
                    z.date().max(new Date()).safeParse(date).success
                  }
                />
              </div>
            </div>
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
              Save changes
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
