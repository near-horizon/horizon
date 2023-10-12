import { cn } from "~/lib/utils";
import FolderIcon from "./icons/folder-x.svg";

export function NoData({
  description = "It looks like there is no data provided",
  className,
}: {
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg border border-ui-elements-light bg-background-light",
        className
      )}
    >
      <FolderIcon className="h-10 text-primary-disabled" />
      <b className="font-semibold text-ui-elements-dark">Oops, nothing here</b>
      <small className="text-sm text-ui-elements-gray">{description}</small>
    </div>
  );
}

export function NotAvailable({
  className,
  description = "Not available",
}: {
  className?: string;
  description?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border border-ui-elements-light bg-background-light",
        className
      )}
    >
      <b className="font-bold text-primary-disabled">N/A</b>
      <small className="text-sm font-semibold text-ui-elements-dark">
        {description}
      </small>
    </div>
  );
}
