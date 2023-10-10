import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import QuestionMarkIcon from "./icons/help-circle.svg";

export function InfoTooltip({ children }: { children?: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <QuestionMarkIcon className="h-3 w-3 text-ui-elements-gray" />
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  );
}
