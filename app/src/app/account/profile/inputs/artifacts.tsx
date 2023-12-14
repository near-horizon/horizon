import { Button } from "~/components/ui/button";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { PlusCircleSvg, XSvg } from "~/icons";
import { type NewProjectType } from "~/lib/validation/project/new";
import { FileInput } from "~/components/inputs/file";
import { TextInput } from "~/components/inputs/text";
import { Toggleable } from "~/components/toggleable";
import { MotionDiv } from "~/components/motion";

export function ArtifactsInput({
  form,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<NewProjectType, any, undefined>;
}) {
  const artifacts = useFieldArray({
    control: form.control,
    name: "artifacts",
  });

  return (
    <div className="flex w-full flex-col items-stretch justify-start gap-6">
      {artifacts.fields.map((field, index) => (
        <MotionDiv
          key={field.id}
          className="relative flex w-full origin-top-right flex-col items-stretch justify-start gap-3 rounded-xl bg-background-light p-6"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="destructive"
            type="button"
            className="absolute right-2 top-6 z-10 flex flex-row items-center justify-center border-none bg-transparent p-2"
            onClick={() => artifacts.remove(index)}
          >
            <XSvg className="h-6 w-6" />
          </Button>

          <Toggleable
            id={`artifacts.${index}.visible` as const}
            value={form.watch(`artifacts.${index}.visible` as const)}
            onChange={(value) =>
              form.setValue(`artifacts.${index}.visible`, value)
            }
            className="-mt-6 flex flex-col items-stretch justify-start gap-3 border-none bg-transparent px-0 pt-20 md:pr-20"
          >
            <TextInput
              control={form.control}
              name={`artifacts.${index}.value.name` as const}
              label="Title"
              defaultValue=""
            />

            <FileInput
              control={form.control}
              name={`artifacts.${index}.value.value.file` as const}
              label="Attachment"
              defaultValue=""
            />

            <TextInput
              control={form.control}
              name={`artifacts.${index}.value.note` as const}
              label="Note"
              defaultValue=""
            />
          </Toggleable>
        </MotionDiv>
      ))}

      <div className="flex w-full flex-row items-start justify-end">
        <Button
          variant="outline"
          type="button"
          onClick={() =>
            artifacts.append(
              {
                visible: true,
                value: {
                  name: "",
                  value: { file: "" },
                },
              },
              { shouldFocus: true },
            )
          }
          className="flex flex-row items-center justify-center gap-2"
        >
          <PlusCircleSvg className="h-4 w-4" />
          Add artifact
        </Button>
      </div>
    </div>
  );
}
