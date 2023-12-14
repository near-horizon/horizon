import { Button } from "~/components/ui/button";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { PlusCircleSvg, XSvg } from "~/icons";
import { type NewProjectType } from "~/lib/validation/project/new";
import { TextInput } from "~/components/inputs/text";
import { MotionDiv } from "~/components/motion";
import { Label } from "~/components/ui/label";

export function MediaInput({
  form,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<NewProjectType, any, undefined>;
}) {
  const media = useFieldArray({
    control: form.control,
    name: "media.value",
  });

  return (
    <div className="flex w-full flex-col items-stretch justify-start gap-6">
      <Label>Public announcement links</Label>
      {media.fields.map((field, index) => (
        <MotionDiv
          key={field.id}
          className="relative flex w-full origin-top-right flex-row items-center justify-start gap-3 rounded-xl bg-background-light p-6"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex-grow p-0">
            <TextInput
              control={form.control}
              name={`media.value.${index}.link` as const}
              defaultValue=""
              noLabel
            />
          </div>

          <Button
            variant="destructive"
            type="button"
            className="flex flex-row items-center justify-center border-none bg-transparent p-2"
            onClick={() => media.remove(index)}
          >
            <XSvg className="h-6 w-6" />
          </Button>
        </MotionDiv>
      ))}

      <div className="flex w-full flex-row items-start justify-end">
        <Button
          variant="outline"
          type="button"
          onClick={() => media.append({ link: "" }, { shouldFocus: true })}
          className="flex flex-row items-center justify-center gap-2"
        >
          <PlusCircleSvg className="h-4 w-4" />
          Add link
        </Button>
      </div>
    </div>
  );
}
