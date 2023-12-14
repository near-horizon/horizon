"use client";

import { useZodForm } from "~/hooks/form";
import { Form } from "~/components/ui/form";
import { useState } from "react";
import {
  newProjectSchema,
  type NewProjectType,
  projectArtifactsCompletion,
  projectCompletion,
  projectContactCompletion,
  projectFoundersCompletion,
  projectMetricsCompletion,
  projectProfileCompletion,
  projectProgressCompletion,
} from "~/lib/validation/project/new";
import { FoundersInput } from "./inputs/founder";
import { KeyValueInput } from "~/components/inputs/key-value";
import { DetailsInput } from "./inputs/details";
import { ContactInput } from "./inputs/contact";
import { GeneralInput } from "./inputs/general";
import { InputSection } from "./inputs/section";
import { ArtifactsInput } from "./inputs/artifacts";
import { Circle2Svg, FileCheck02Svg, LinkExternal02Svg } from "~/icons";
import { MediaInput } from "./inputs/media";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { NUMBER } from "~/lib/format";
import { InfoTooltip } from "~/components/info-tooltip";
import { cn } from "~/lib/utils";
import { useUpdateProject } from "~/hooks/projects";
import { ProgressDialog } from "~/components/progress-dialog";

export function ProfileForm({ project }: { project: NewProjectType }) {
  const [cid, setCid] = useState(
    project.profile.logo && "ipfs_cid" in project.profile.logo
      ? project.profile.logo.ipfs_cid
      : "",
  );
  const form = useZodForm(newProjectSchema, {
    defaultValues: project,
  });
  const profile = form.watch();
  const disabled = !form.formState.isValid || form.formState.isSubmitting;
  const [progress, updateProject] = useUpdateProject();

  const buttons = (
    <div className="flex flex-row items-center justify-end gap-2">
      <ProgressDialog
        progress={progress.value}
        description={progress.label}
        title="Updating project"
        className={cn(
          "flex-row items-center justify-center gap-2 text-ui-elements-dark",
          disabled && "opacity-50",
        )}
        triggerText={
          <>
            <FileCheck02Svg className="h-4 w-4" />
            Save profile
          </>
        }
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            void form.trigger();
          } else {
            void updateProject.mutateAsync({ project: profile });
          }
        }}
      />
      <Link href={`/projects/${project.account_id}`} target="_blank">
        <Button
          type="button"
          variant="outline"
          className="flex-row items-center justify-center gap-2 text-ui-elements-dark"
        >
          <LinkExternal02Svg className="h-4 w-4" />
          Preview
        </Button>
      </Link>
    </div>
  );

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col items-stretch justify-start gap-8"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(async (project) => {
          await updateProject.mutateAsync({ project });
        })}
      >
        <div>
          <div className="flex flex-row items-start justify-between">
            <h1 className="text-2xl font-bold text-ui-elements-black">
              Project profile
            </h1>
            {buttons}
          </div>

          <div className="flex flex-row items-center justify-start gap-2 text-sm font-medium">
            <span className="text-ui-elements-dark">
              Completed: {NUMBER.percentage(projectCompletion(profile))}
            </span>
            <Circle2Svg className="h-1 w-1 text-ui-elements-gray" />
            <span className="text-primary-pressed">Reward: +5 HZN</span>
            <InfoTooltip>
              The reward is given for completing the profile and publishing the
              project.
            </InfoTooltip>
          </div>
        </div>

        <InputSection
          title="General information"
          completion={projectProfileCompletion(profile)}
          value={true}
          disabled
        >
          <GeneralInput form={form} cid={cid} setCid={(cid) => setCid(cid)} />
        </InputSection>

        <InputSection
          title="Contact information"
          completion={projectContactCompletion(profile)}
          value={form.watch("contact.visible")}
          onChange={(value) => form.setValue("contact.visible", value)}
        >
          <ContactInput form={form} />
        </InputSection>

        <InputSection
          title="Project details"
          completion={projectProgressCompletion(profile)}
          value={form.watch("details.visible")}
          onChange={(value) => form.setValue("details.visible", value)}
        >
          <DetailsInput form={form} />
        </InputSection>

        <InputSection
          title="Traction metrics"
          completion={projectMetricsCompletion(profile)}
          value={form.watch("metrics.visible")}
          onChange={(value) => form.setValue("metrics.visible", value)}
        >
          <KeyValueInput form={form} />
        </InputSection>

        <InputSection
          title="Founders"
          completion={projectFoundersCompletion(profile)}
          value={form.watch("founders.visible")}
          onChange={(value) => form.setValue("founders.visible", value)}
        >
          <FoundersInput form={form} />
        </InputSection>

        <InputSection
          title="Artifacts"
          completion={projectArtifactsCompletion(profile)}
          value={true}
          disabled
        >
          <ArtifactsInput form={form} />
        </InputSection>

        <InputSection
          title="Media coverage"
          completion={0}
          value={form.watch("media.visible")}
          onChange={(value) => form.setValue("media.visible", value)}
        >
          <MediaInput form={form} />
        </InputSection>

        {buttons}
      </form>
    </Form>
  );
}

export function Section({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="flex flex-col items-start justify-start gap-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}
