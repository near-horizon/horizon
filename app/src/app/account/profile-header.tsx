"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Handle } from "~/components/handle";
import { ImageInput } from "~/components/inputs/image";
import { MultiSelectInput } from "~/components/inputs/multi-select";
import { TextInput } from "~/components/inputs/text";
import { MotionDiv } from "~/components/motion";
import { Icon } from "~/components/icon";
import { Tags } from "~/components/tags";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useZodForm } from "~/hooks/form";
import { useChanges, useHasChanges } from "~/hooks/profile";
import { useProject, useUpdateProject } from "~/hooks/projects";
import { useSocialSet } from "~/hooks/social";
import { cn } from "~/lib/utils";
import { type AccountId } from "~/lib/validation/common";
import { ProgressDialog } from "~/components/progress-dialog";

const schema = z.object({
  name: z.string().min(3).max(50).optional(),
  tagline: z.string().min(3).max(50).optional(),
  image: z.string().optional(),
  tags: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .array(),
});

export function ProfileHeader({ accountId }: { accountId: AccountId }) {
  const { data } = useProject(accountId);
  const [edit, setEdit] = useState(false);
  const form = useZodForm(schema);
  const toggleEdit = () => setEdit((prev) => !prev);
  const { data: profile } = useChanges();
  const hasChanges = useHasChanges(accountId);
  const [, socialSet] = useSocialSet();
  const viewRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLDivElement>(null);
  const section = usePathname().split("/")[2];
  const [progressUpdate, updateProject] = useUpdateProject();

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
      form.setValue("tagline", data.tagline);
      form.setValue(
        "tags",
        Object.keys(data.tags ?? {}).map((tag) => ({
          label: tag,
          value: tag,
        }))
      );
    }
  }, [form, data]);

  const actions = (
    <div className="flex flex-row items-start justify-end gap-4">
      <Button
        variant={edit ? "destructive" : "outline"}
        type="button"
        onClick={() => toggleEdit()}
        className="transition duration-300 ease-in-out"
      >
        {edit ? "Cancel" : "Edit"}
      </Button>
      <Button variant="outline" type="button">
        Share
      </Button>
      {hasChanges && profile && (
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            socialSet.mutate({
              accountId,
              profile,
            });
          }}
        >
          Export
        </Button>
      )}
    </div>
  );
  const editForm = (
    <Form {...form}>
      <form
        className="flex flex-row items-start justify-start gap-6"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit((data) => {
          updateProject.mutate({
            accountId,
            project: {
              name: data.name,
              tagline: data.tagline,
              image: { ipfs_cid: data.image ?? "" },
              tags: data.tags.reduce(
                (acc, tag) => ({
                  ...acc,
                  [tag.value]: "",
                }),
                {}
              ),
            },
          });
        })}
      >
        <div className="flex flex-grow flex-col items-start justify-start gap-1">
          <ImageInput
            control={form.control}
            name="image"
            defaultValue={
              data?.image && "ipfs_cid" in data.image ? data.image.ipfs_cid : ""
            }
            setCid={(cid) => form.setValue("image", cid)}
            cid={
              data?.image && "ipfs_cid" in data.image ? data.image.ipfs_cid : ""
            }
          />
          <MultiSelectInput
            options={[]}
            control={form.control}
            name="tags"
            defaultValue={Object.keys(data?.tags ?? {}).map((tag) => ({
              value: tag,
              label: tag,
            }))}
          />
        </div>
        <div className="flex flex-grow flex-col items-start justify-start gap-1">
          <div className="flex w-full flex-grow flex-col items-stretch justify-start gap-1">
            <TextInput
              control={form.control}
              name="name"
              defaultValue={data?.name ?? ""}
              label="Project name"
            />
            <TextInput
              control={form.control}
              name="tagline"
              defaultValue={data?.tagline ?? ""}
              label="Tagline"
            />
          </div>
        </div>
        <div>
          <ProgressDialog
            progress={progressUpdate.value}
            title="Updating your profile"
            description={progressUpdate.label}
            triggerText="Save"
          />
        </div>
      </form>
    </Form>
  );
  const viewData = (
    <div className="flex flex-row items-start justify-start gap-6">
      <Icon name={data?.name ?? ""} image={data?.image} className="h-24 w-24" />
      <div className="flex flex-col items-start justify-start gap-1">
        <Handle name={data?.name} accountId={accountId} />
        <div className="hidden lg:block">
          <div className="truncate font-medium">{data?.tagline}</div>
          <Tags tags={data?.tags ?? {}} />
        </div>
        <div className="lg:hidden">{actions}</div>
      </div>
    </div>
  );

  return (
    <div
      className={cn("w-full", {
        hidden: section === "backers-digest",
      })}
    >
      <div className="flex flex-col items-start justify-between">
        <div className="flex w-full flex-row items-start justify-between gap-3">
          <MotionDiv
            className={cn("relative w-full [transform-style:preserve-3d]")}
            initial={false}
            animate={edit ? "edit" : "view"}
            variants={{
              view: {
                height: viewRef.current?.getBoundingClientRect().height ?? 0,
              },
              edit: {
                height: editRef.current?.getBoundingClientRect().height ?? 0,
              },
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <div
              ref={viewRef}
              className={cn(
                "absolute z-10 w-full transition-transform duration-500 [transform-style:preserve-3d] [backface-visibility:hidden]",
                !edit
                  ? "[transform:rotateX(0deg)]"
                  : "[transform:rotateX(180deg)]"
              )}
            >
              {viewData}
            </div>
            <div
              ref={editRef}
              className={cn(
                "absolute w-full transition-transform duration-500 [transform-style:preserve-3d] [backface-visibility:hidden]",
                !edit
                  ? "[transform:rotateX(-180deg)]"
                  : "[transform:rotateX(0deg)]"
              )}
            >
              {editForm}
            </div>
          </MotionDiv>
          <div className="hidden lg:block">{actions}</div>
        </div>
        <div className="lg:hidden">
          <div className="truncate font-medium">{data?.tagline}</div>
          <Tags tags={data?.tags ?? {}} />
        </div>
      </div>
    </div>
  );
}
