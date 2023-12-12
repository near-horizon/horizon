"use client";

import { type AccountId } from "~/lib/validation/common";
import { useZodForm } from "~/hooks/form";
import { Form } from "~/components/ui/form";
import { useState } from "react";
import { getNewProject } from "~/lib/client/projects";
import {
  newProjectSchema,
  projectArtifactsCompletion,
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
import { ExternalLink } from "lucide-react";
import { Download01Svg, File06Svg, Share03Svg } from "~/icons";
import { getFileURL } from "~/lib/utils";
import { MediaInput } from "./inputs/media";

export function BackersDigest({ accountId }: { accountId: AccountId }) {
  const [cid, setCid] = useState("");
  const form = useZodForm(newProjectSchema, {
    defaultValues: async () => {
      const project = await getNewProject(accountId);
      project.profile.logo &&
        "ipfs_cid" in project.profile.logo &&
        setCid(project.profile.logo.ipfs_cid);
      return project;
    },
  });
  const profile = form.watch();

  return (
    <Form {...form}>
      <form className="flex w-full flex-col items-stretch justify-start gap-8">
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
          value={form.watch("progress.visible")}
          onChange={(value) => form.setValue("progress.visible", value)}
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
export function FileDescription({ file }: { file: string }) {
  const value = getFileURL(file);

  if (typeof value === "string") {
    return (
      <div className="flex w-full flex-col items-start justify-start gap-2 rounded-lg border border-ui-elements-light bg-background-light px-4 py-2">
        <span className="flex w-full flex-row items-center justify-start gap-2">
          <File06Svg className="h-6 w-6 text-ui-elements-gray" />
          <ExternalLink href={value}>
            <span className="flex flex-row items-center justify-start gap-2">
              {value}
              <Share03Svg className="h-4 w-4 text-ui-elements-gray" />
            </span>
          </ExternalLink>
        </span>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2 rounded-lg border border-ui-elements-light bg-background-light px-4 py-2">
      <span className="flex w-full flex-row items-center justify-start gap-2">
        <File06Svg className="h-6 w-6 text-ui-elements-gray" />
        <a
          href={value.url}
          download
          className="flex max-w-prose flex-row items-center justify-start gap-2 truncate text-text-link"
        >
          {value.filename}
          <Download01Svg className="h-4 w-4 text-ui-elements-gray" />
        </a>
        <small className="text-sm font-medium text-ui-elements-gray">
          {value.size}
        </small>
      </span>
      <small className="text-sm font-medium text-ui-elements-gray">
        Uploaded {value.uploaded}
      </small>
    </div>
  );
}
