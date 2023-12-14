import { Separator } from "~/components/ui/separator";
import { EyeOffSvg } from "~/icons";
import { cn } from "~/lib/utils";

export interface SectionProps {
  isOwner: boolean;
  isBacker: boolean;
}

export function Section({
  title,
  separator = false,
  hide = false,
  watermark = false,
  children,
}: {
  title: string;
  separator?: boolean;
  hide?: boolean;
  watermark?: boolean;
  children: React.ReactNode;
}) {
  if (hide) {
    return <></>;
  }

  return (
    <>
      {separator && <Separator className="h-px w-full bg-ui-elements-light" />}
      <section className="relative flex w-full flex-col items-start justify-start gap-4">
        <h2 className="text-xl font-bold text-ui-elements-black">{title}</h2>
        {watermark && (
          <span
            className={cn(
              "absolute right-0 top-0 rounded border border-secondary-disabled p-1",
              "flex flex-row items-center justify-start gap-1 text-xs font-medium",
            )}
          >
            <EyeOffSvg className="h-4 w-4 text-ui-elements-gray" />
            Visible only to backers
          </span>
        )}
        {children}
      </section>
    </>
  );
}
