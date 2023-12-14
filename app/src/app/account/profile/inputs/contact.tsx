import { type UseFormReturn } from "react-hook-form";
import { TextInput } from "~/components/inputs/text";
import { type NewProjectType } from "~/lib/validation/project/new";

export function ContactInput({
  form,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<NewProjectType, any, undefined>;
}) {
  return (
    <div className="flex w-full flex-col items-stretch justify-start gap-4 pr-20">
      <TextInput
        control={form.control}
        label="Contact email"
        placeholder="Contact email"
        name="contact.value.email"
      />

      <TextInput
        control={form.control}
        label="Meeting scheduling link"
        placeholder="Meeting scheduling link"
        name="contact.value.meeting_link"
      />
    </div>
  );
}