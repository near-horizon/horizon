import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { PlusCircleSvg, XSvg } from "~/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { type NewProjectType } from "~/lib/validation/project/new";

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
    <div>
      <div className="flex flex-row items-center justify-between gap-2">
        <h6 className="flex-grow text-sm font-bold">Metric name</h6>
        <h6 className="w-1/3 text-sm font-bold">Value</h6>
      </div>
      {array.fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-row items-center justify-between gap-2"
        >
          <div className="flex-grow">
            <Input
              {...form.register(`metrics.value.${index}.name` as const)}
              type="text"
            />
          </div>
          <div className="w-1/4">
            <Input
              {...form.register(`metrics.value.${index}.value` as const)}
              type="text"
            />
          </div>
          <Button
            variant="destructive"
            type="button"
            className="flex w-1/12 flex-row items-center justify-center border-none"
            onClick={() => array.remove(index)}
          >
            <XSvg className="h-4 w-4" />
          </Button>
        </div>
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
