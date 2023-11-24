import { Button } from "~/components/ui/button";
import { CheckSvg, Edit03Svg, XSvg } from "~/icons";
import { useState } from "react";
import {
  type Control,
  type DefaultValues,
  type FieldValues,
} from "react-hook-form";
import { useUpdateProject } from "~/hooks/projects";
import { useUser } from "~/stores/global";
import { type TypeOf, type z } from "zod";
import { MotionDiv } from "~/components/motion";
import { CardFlip } from "~/components/animation/card-flip";
import { cn } from "~/lib/utils";
import { FormBuilder } from "~/components/inputs/form-builder";
import { NUMBER } from "~/lib/format";
import { redirect } from "next/navigation";

export function ProfileLayout<Schema extends z.ZodObject<FieldValues>>({
  children,
  title,
  progress,
  editData,
  formSchema,
  defaultValues,
}: {
  title: string;
  children?: React.ReactNode;
  progress: number;
  editData: (control: Control<TypeOf<Schema>>) => React.ReactNode;
  formSchema: Schema;
  defaultValues: DefaultValues<TypeOf<Schema>>;
}) {
  const user = useUser();

  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit((prev) => !prev);

  const [progressUpdate, updateProject] = useUpdateProject();

  if (!user.logedIn) return redirect("/login");

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
    >
      <CardFlip
        fliped={edit}
        front={
          <div className="flex flex-col items-stretch justify-start gap-5">
            <div className="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between md:gap-0">
              <div className="flex flex-row items-center justify-start gap-4">
                <h1 className="text-xl font-bold text-text-black">{title}</h1>
                <small className="text-sm font-normal text-ui-elements-gray">
                  Completed: {NUMBER.percentage(progress)}
                </small>
              </div>
              <div className="flex flex-row items-center justify-end gap-4">
                <Button
                  onClick={toggleEdit}
                  variant="outline"
                  className="flex w-24 flex-row items-center justify-center gap-1"
                >
                  <Edit03Svg className="h-5 w-5" />
                  Edit
                </Button>
              </div>
            </div>
            {children}
          </div>
        }
        back={
          <FormBuilder
            submitText={
              <div className="flex flex-row items-center justify-center gap-1">
                <CheckSvg className="h-5 w-5" />
                Update section
              </div>
            }
            formSchema={formSchema}
            defaultValues={defaultValues}
            progress={progressUpdate}
            onSubmit={async function (project) {
              await updateProject.mutateAsync({
                accountId: user.accountId,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                project,
              });
            }}
            onCancel={toggleEdit}
          >
            {({ control, trigger, isDisabled }) => (
              <div className="flex flex-col items-stretch justify-start gap-5">
                <div className="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between md:gap-0">
                  <div className="flex flex-row items-center justify-start gap-4">
                    <h1 className="text-xl font-bold text-text-black">
                      {title}
                    </h1>
                    <small className="text-sm font-normal text-ui-elements-gray">
                      Completed: {NUMBER.percentage(progress)}
                    </small>
                  </div>
                  <div className="flex flex-row items-center justify-end gap-4">
                    <Button
                      type="submit"
                      onClick={(e) => {
                        if (isDisabled) {
                          e.preventDefault();
                          void trigger();
                        }
                      }}
                      variant="default"
                      className={cn(
                        "flex flex-row items-center justify-center gap-1",
                        { "opacity-50": isDisabled },
                      )}
                    >
                      <CheckSvg className="h-5 w-5" />
                      Update section
                    </Button>
                    <Button
                      type="button"
                      onClick={toggleEdit}
                      variant="destructive"
                      className="flex w-24 flex-row items-center justify-center gap-1"
                    >
                      <XSvg className="h-5 w-5" />
                      Cancel
                    </Button>
                  </div>
                </div>
                <div className="w-full rounded-lg bg-background-light px-12 py-8">
                  {editData(control)}
                </div>
              </div>
            )}
          </FormBuilder>
        }
      />
    </MotionDiv>
  );
}
