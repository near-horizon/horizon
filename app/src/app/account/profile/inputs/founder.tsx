import {
  type FieldArrayWithId,
  useFieldArray,
  type UseFieldArrayReturn,
  type UseFormReturn,
} from "react-hook-form";
import { ImageInput } from "~/components/inputs/image";
import { TextInput } from "~/components/inputs/text";
import { MotionDiv } from "~/components/motion";
import { Button } from "~/components/ui/button";
import { PlusCircleSvg, XSvg } from "~/icons";
import { type NewProjectType } from "~/lib/validation/project/new";

export function FoundersInput({
  form,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<NewProjectType, any, undefined>;
}) {
  const founders = useFieldArray({
    control: form.control,
    name: "founders.value",
  });

  return (
    <div className="flex w-full flex-col items-stretch justify-start gap-6">
      {founders.fields.map((field, index) => (
        <FounderInput
          form={form}
          founders={founders}
          field={field}
          index={index}
          key={field.id}
        />
      ))}

      <div className="flex w-full flex-row items-start justify-end">
        <Button
          variant="outline"
          type="button"
          onClick={() =>
            founders.append({ image: { ipfs_cid: "" } }, { shouldFocus: true })
          }
          className="flex flex-row items-center justify-center gap-2"
        >
          <PlusCircleSvg className="h-4 w-4" />
          Add founder
        </Button>
      </div>
    </div>
  );
}

export function FounderInput({
  form,
  founders,
  field,
  index,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<NewProjectType, any, undefined>;
  founders: UseFieldArrayReturn<NewProjectType, "founders.value", "id">;
  field: FieldArrayWithId<NewProjectType, "founders.value", "id">;
  index: number;
}) {
  return (
    <MotionDiv
      key={field.id}
      className="relative flex w-full origin-top-right flex-col items-stretch justify-start gap-3 rounded-xl bg-background-light p-6 pr-20"
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.4 }}
      transition={{ duration: 0.4 }}
    >
      <Button
        variant="destructive"
        type="button"
        className="absolute right-6 top-6 flex flex-row items-center justify-center border-none bg-transparent"
        onClick={() => founders.remove(index)}
      >
        <XSvg className="h-6 w-6" />
      </Button>

      <ImageInput
        control={form.control}
        name={`founders.value.${index}.image` as const}
        label="Photo"
        setCid={(cid) =>
          form.setValue(`founders.value.${index}.image`, {
            ipfs_cid: cid,
          })
        }
        cid={
          (
            form.watch(`founders.value.${index}.image` as const) as {
              ipfs_cid: string;
            }
          ).ipfs_cid
        }
      />

      <TextInput
        control={form.control}
        name={`founders.value.${index}.name` as const}
        defaultValue=""
        label="Full name"
      />

      <TextInput
        control={form.control}
        name={`founders.value.${index}.account_id` as const}
        defaultValue=""
        label="NEAR ID"
      />

      <div className="grid grid-cols-12">
        <h4 className="col-span-4 col-start-2 font-semibold">
          Social profiles
        </h4>
      </div>

      <TextInput
        control={form.control}
        label="X (Twitter)"
        placeholder="X (Twitter)"
        name={`founders.value.${index}.socials.x` as const}
      />

      <TextInput
        control={form.control}
        label="LinkedIn"
        placeholder="LinkedIn"
        name={`founders.value.${index}.socials.linkedin` as const}
      />

      <TextInput
        control={form.control}
        label="Instagram"
        placeholder="Instagram"
        name={`founders.value.${index}.socials.instagram` as const}
      />

      <TextInput
        control={form.control}
        label="Telegram"
        placeholder="Telegram"
        name={`founders.value.${index}.socials.telegram` as const}
      />
    </MotionDiv>
  );
}
