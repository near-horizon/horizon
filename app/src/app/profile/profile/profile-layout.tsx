import { Button } from "~/components/ui/button";
import EditIcon from "~/components/icons/edit-03.svg";
import CheckIcon from "~/components/icons/check.svg";
import { cn } from "~/lib/utils";

export function ProfileLayout({
  children,
  title,
  progress,
  edit,
  editData,
  onEditToggle,
  submit,
}: {
  title: string;
  children?: React.ReactNode;
  progress: number;
  edit: boolean;
  editData: React.ReactNode;
  onEditToggle: () => void;
  submit: () => void;
}) {
  return (
    <div className="flex flex-col items-stretch justify-start gap-5">
      <div className="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="flex flex-row items-center justify-start gap-4">
          <h1 className="text-xl font-bold text-text-black">{title}</h1>
          <small className="text-sm font-normal text-ui-elements-gray">
            Completed: {progress.toLocaleString("en-US", { style: "percent" })}
          </small>
        </div>
        <div className="flex flex-row items-center justify-end gap-4">
          <Button
            onClick={onEditToggle}
            className={cn(
              "transition-all duration-300 ease-in-out",
              edit ? "translate-x-0" : "translate-x-[10.5rem]"
            )}
            variant={edit ? "destructive" : "outline"}
          >
            {edit ? (
              "Cancel"
            ) : (
              <>
                <EditIcon className="mr-1 h-5 w-5" />
                Edit
              </>
            )}
          </Button>
          <Button
            onClick={submit}
            variant="default"
            className={cn(
              "origin-right transition-transform duration-300",
              edit ? "scale-x-100" : "scale-x-0"
            )}
          >
            <CheckIcon className="mr-1 h-5 w-5" />
            Update section
          </Button>
        </div>
      </div>
      <div className={cn("relative [transform-style:preserve-3d]")}>
        <div
          className={cn(
            "absolute z-10 w-full transition-transform duration-500 [backface-visibility:hidden] [transform-style:preserve-3d]",
            !edit ? "[transform:rotateY(0deg)]" : "[transform:rotateY(180deg)]"
          )}
        >
          {children}
        </div>
        <div
          className={cn(
            "absolute w-full rounded-lg  bg-background-light px-12 py-8 transition-transform duration-500 [backface-visibility:hidden] [transform-style:preserve-3d]",
            !edit ? "[transform:rotateY(-180deg)]" : "[transform:rotateY(0deg)]"
          )}
        >
          {editData}
        </div>
      </div>
    </div>
  );
}
