import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { PlusCircleSvg, XSvg } from "~/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { type NewProjectType } from "~/lib/validation/project/new";
import { MotionDiv } from "../motion";
import { Label } from "../ui/label";

export function KeyValueInput({
  form,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<NewProjectType, any, undefined>;
}) {
  const array = useFieldArray({
    control: form.control,
    name: "metrics.value",
  });

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      <div className="hidden flex-row items-center justify-between gap-2 md:flex">
        <h6 className="flex-grow text-sm font-bold">Metric name</h6>
        <h6 className="w-1/3 text-sm font-bold">Value</h6>
      </div>

      {array.fields.map((field, index) => (
        <MotionDiv
          key={field.id}
          className="relative flex w-full flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.4 }}
        >
          <Label className="font-bold md:hidden">Metric name</Label>

          <div className="w-full md:w-auto md:flex-grow">
            <Input
              {...form.register(`metrics.value.${index}.name` as const)}
              type="text"
            />
          </div>

          <Label className="font-bold md:hidden">Value</Label>

          <div className="w-3/4 md:w-1/4">
            <Input
              {...form.register(`metrics.value.${index}.value` as const)}
              type="text"
            />
          </div>

          <Button
            variant="destructive"
            type="button"
            className="absolute bottom-0 right-0 flex flex-row items-center justify-center border-none md:relative md:w-1/12"
            onClick={() => array.remove(index)}
          >
            <XSvg className="h-4 w-4" />
          </Button>
        </MotionDiv>
      ))}

      <div className="flex w-full flex-row items-stretch justify-end">
        <Button
          variant="outline"
          type="button"
          onClick={() =>
            array.append([{ name: "", value: "" }], {
              shouldFocus: true,
            })
          }
          className="flex flex-row items-center justify-center gap-2"
        >
          <PlusCircleSvg className="h-4 w-4" />
          Add metric
        </Button>
      </div>
    </div>
  );
}
