import {
  type DefaultValues,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { type TypeOf, type z } from "zod";
import { updateFields, useZodForm } from "~/hooks/form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import deepEqual from "deep-equal";
import { type Progress as ProgressValue } from "~/lib/client/mutating";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Progress } from "../ui/progress";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { useEffect } from "react";

type WithFormParam<Schema extends z.ZodObject<FieldValues>> = (
  form: UseFormReturn<TypeOf<Schema>> & { isDisabled: boolean },
) => React.ReactNode;

export function FormBuilder<Schema extends z.ZodObject<FieldValues>>({
  formSchema,
  defaultValues,
  progress,
  cancelText = "Cancel",
  submitText = "Submit",
  showDialog = true,
  successText = "Go to profile",
  successLink = "#",
  dialogTitle = "Updating your profile",
  className = "",
  onSubmit,
  onCancel,
  children,
}: {
  formSchema: Schema;
  defaultValues: DefaultValues<TypeOf<Schema>>;
  progress: ProgressValue;
  cancelText?: React.ReactNode;
  submitText?: React.ReactNode;
  showDialog?: boolean;
  successText?: React.ReactNode;
  successLink?: string;
  dialogTitle?: React.ReactNode;
  className?: string;
  onSubmit: (data: TypeOf<Schema>) => Promise<void>;
  onCancel: () => void;
  children: React.ReactNode | WithFormParam<Schema>;
}) {
  const form = useZodForm(formSchema, {
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      updateFields(form, formSchema, defaultValues);
    }
  }, [form, formSchema, defaultValues]);

  const isDisabled =
    !form.formState.isValid || deepEqual(form.getValues(), defaultValues);

  return (
    <Form {...form}>
      <form
        className={className}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* The inputs of the form are children */}
        {typeof children === "function"
          ? children({ ...form, isDisabled })
          : children}

        {/* The bottom of the form that handles the cancel and submit */}
        <div className="mt-6 flex flex-row items-center justify-between">
          <Button variant="destructive" type="button" onClick={onCancel}>
            {cancelText}
          </Button>

          <Button
            type="submit"
            variant="default"
            className={cn({
              "opacity-50": isDisabled,
            })}
            onClick={(e) => {
              if (isDisabled) {
                e.preventDefault();
                void form.trigger();
              }
            }}
          >
            {submitText}
          </Button>

          <Dialog
            open={
              showDialog &&
              (form.formState.isSubmitting || form.formState.isSubmitted)
            }
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogDescription>{progress.label}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Progress value={progress.value} className="w-full" />
              </div>
              <DialogFooter>
                {progress.value === 100 && (
                  <Link href={successLink}>
                    <Button variant="link">{successText}</Button>
                  </Link>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </Form>
  );
}
