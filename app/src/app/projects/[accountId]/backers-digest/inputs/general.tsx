import { type UseFormReturn } from "react-hook-form";
import { ImageInput } from "~/components/inputs/image";
import { MultiSelectInput } from "~/components/inputs/multi-select";
import { SelectInput } from "~/components/inputs/select";
import { TextInput } from "~/components/inputs/text";
import { TextAreaInput } from "~/components/inputs/text-area";
import { iso3166 } from "~/lib/constants/iso-3166";
import { STRING } from "~/lib/format";
import { verticalSchema } from "~/lib/validation/inputs";
import {
  type NewProjectType,
  projectSizeSchema,
} from "~/lib/validation/project/new";

export function GeneralInput({
  form,
  cid,
  setCid,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<NewProjectType, any, undefined>;
  cid: string;
  setCid: (cid: string) => void;
}) {
  return (
    <>
      <ImageInput
        name="profile.logo"
        control={form.control}
        label="Logo"
        rules={{ required: true }}
        defaultValue={{ ipfs_cid: "" }}
        setCid={setCid}
        cid={cid}
        generate
        generateEnabled={form.formState.isValid && form.formState.isDirty}
      />

      <TextInput
        control={form.control}
        label="Project name"
        placeholder="Name"
        name="profile.name"
        rules={{ required: true }}
      />

      <TextInput
        control={form.control}
        label="Email"
        placeholder="Email"
        name="profile.email"
        rules={{ required: true }}
      />

      <MultiSelectInput
        control={form.control}
        label="Vertical"
        placeholder="Vertical"
        name="profile.vertical"
        rules={{ required: true }}
        options={verticalSchema.options}
      />

      <TextInput
        control={form.control}
        label="Tagline"
        placeholder="Tagline"
        name="profile.tagline"
        rules={{ required: true }}
      />

      <TextAreaInput
        control={form.control}
        label="Description"
        placeholder="Description"
        name="profile.description"
      />

      <TextInput
        control={form.control}
        label="Website"
        placeholder="Website"
        name="profile.website"
      />

      <h4>Social profiles</h4>

      <TextInput
        control={form.control}
        label="X (Twitter)"
        placeholder="X (Twitter)"
        name="profile.socials.x"
      />

      <TextInput
        control={form.control}
        label="LinkedIn"
        placeholder="LinkedIn"
        name="profile.socials.linkedin"
      />

      <TextInput
        control={form.control}
        label="Instagram"
        placeholder="Instagram"
        name="profile.socials.instagram"
      />

      <TextInput
        control={form.control}
        label="Telegram"
        placeholder="Telegram"
        name="profile.socials.telegram"
      />

      <SelectInput
        control={form.control}
        label="Company size"
        placeholder="Company size"
        name="profile.size"
        options={projectSizeSchema.options.map((option) => ({
          value: option,
          text: STRING.capitalize(option),
        }))}
      />

      <SelectInput
        control={form.control}
        label="Location"
        placeholder="Location"
        name="profile.location"
        options={iso3166}
      />
    </>
  );
}
