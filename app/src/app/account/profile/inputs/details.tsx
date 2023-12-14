import { type UseFormReturn } from "react-hook-form";
import { CheckboxInput } from "~/components/inputs/checkbox";
import { SelectInput } from "~/components/inputs/select";
import { TextAreaInput } from "~/components/inputs/text-area";
import { STRING } from "~/lib/format";
import { nearIntegrationSchema } from "~/lib/validation/inputs";
import { type NewProjectType } from "~/lib/validation/project/new";

export function DetailsInput({
  form,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<NewProjectType, any, undefined>;
}) {
  return (
    <div className="flex w-full flex-col items-stretch justify-start gap-4 pr-20">
      <div className="grid grid-cols-12">
        <div className="col-span-10 col-start-3">
          <CheckboxInput
            control={form.control}
            label="Is your project open source?"
            name="details.value.open_source"
          />
        </div>
      </div>

      <SelectInput
        control={form.control}
        label="Integration with NEAR"
        placeholder="Integration with NEAR"
        name="details.value.near_integration"
        options={nearIntegrationSchema.options.map((option) => ({
          value: option,
          text: STRING.capitalize(option),
        }))}
      />

      <TextAreaInput
        control={form.control}
        label="What problem are you solving? What makes you unique?"
        placeholder=""
        name="details.value.problem"
      />

      <TextAreaInput
        control={form.control}
        label="What are your biggest needs right now?"
        placeholder=""
        name="details.value.needs"
      />

      <div className="grid grid-cols-12">
        <div className="col-span-10 col-start-3">
          <CheckboxInput
            control={form.control}
            label="Are you currently fundraising?"
            name="details.value.fundraising"
          />
        </div>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-10 col-start-3">
          <CheckboxInput
            control={form.control}
            label="Have you raised funding before?"
            name="details.value.raised"
          />
        </div>
      </div>
    </div>
  );
}
