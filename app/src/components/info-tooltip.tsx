import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { HelpCircleSvg } from "~/icons";

export function InfoTooltip({ children }: { children?: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <HelpCircleSvg className="h-3 w-3 text-ui-elements-gray" />
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  );
}
