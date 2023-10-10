"use client";

import { Button } from "~/components/ui/button";
import EditIcon from "~/components/icons/edit-03.svg";
import CheckIcon from "~/components/icons/check.svg";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { type FieldValues, type UseFormReturn } from "react-hook-form";
import { useUpdateProject } from "~/lib/projects";
import { useAccountId } from "~/stores/global";
import { ProgressDialog } from "~/components/progress-dialog";
import { Form } from "~/components/ui/form";
import { type z } from "zod";

interface ToggleEditParam {
  toggleEdit: () => void;
}
type Form = (params: ToggleEditParam) => React.ReactNode;

export function ProfileLayout<Schema extends z.ZodObject<FieldValues>>({
  children,
  title,
  progress,
  editData,
  form,
}: {
  title: string;
  children?: React.ReactNode;
  progress: number;
  editData: React.ReactNode | Form;
  form: UseFormReturn<z.infer<Schema>>;
}) {
  const accountId = useAccountId();
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit((prev) => !prev);
  const [progressUpdate, updateProject] = useUpdateProject();

  const handleSubmit = form.handleSubmit((project) => {
    updateProject.mutate({
      accountId: accountId ?? "",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      project,
    });
  });

  return (
    <motion.div
      className="flex flex-col items-stretch justify-start gap-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="flex flex-row items-center justify-start gap-4">
          <h1 className="text-xl font-bold text-text-black">{title}</h1>
          <small className="text-sm font-normal text-ui-elements-gray">
            Completed: {progress.toLocaleString("en-US", { style: "percent" })}
          </small>
        </div>
        <div className="flex flex-row items-center justify-end gap-4">
          <Button
            onClick={toggleEdit}
            className={cn(
              "transition-all duration-300 ease-in-out",
              edit ? "translate-x-0" : "translate-x-[10.5rem]"
            )}
            variant={edit ? "destructive" : "outline"}
          >
            {edit ? (
              "Cancel"
            ) : (
              <>
                <EditIcon className="mr-1 h-5 w-5" />
                Edit
              </>
            )}
          </Button>
          <div className="overflow-hidden">
            <Button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleSubmit}
              variant="default"
              className={cn(
                "origin-right transition-transform duration-300",
                edit ? "translate-x-0" : "translate-x-full"
              )}
            >
              <CheckIcon className="mr-1 h-5 w-5" />
              Update section
            </Button>
          </div>
        </div>
      </div>
      <div className={cn("relative [transform-style:preserve-3d]")}>
        <div
          className={cn(
            "absolute z-10 w-full transition-transform duration-500 [transform-style:preserve-3d] [backface-visibility:hidden]",
            !edit ? "[transform:rotateY(0deg)]" : "[transform:rotateY(180deg)]"
          )}
        >
          {children}
        </div>
        <div
          className={cn(
            "absolute w-full rounded-lg bg-background-light px-12 py-8 transition-transform duration-500 [transform-style:preserve-3d] [backface-visibility:hidden]",
            !edit ? "[transform:rotateY(-180deg)]" : "[transform:rotateY(0deg)]"
          )}
        >
          <Form {...form}>
            <form
              className="w-full"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit}
            >
              {typeof editData === "function"
                ? editData({ toggleEdit })
                : editData}
              <div className="mt-6 flex flex-row items-center justify-between">
                <Button
                  variant="destructive"
                  type="button"
                  onClick={toggleEdit}
                >
                  Cancel
                </Button>
                <ProgressDialog
                  progress={progressUpdate.value}
                  description={progressUpdate.label}
                  title="Updating your profile"
                  triggerText="Update section"
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </motion.div>
  );
}
