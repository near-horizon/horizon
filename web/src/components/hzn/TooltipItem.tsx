import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";

export function TooltipItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <b className="font-medium text-2xl text-ui-elements-dark">{label}</b>
        </TooltipTrigger>
        <TooltipContent className="bg-ui-elements-dark bg-opacity-[.85] shadow-md max-w-xs p-4 relative overflow-visible -translate-y-2">
          <p className="text-white font-xl">{children}</p>
          <svg
            width="27"
            height="15"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full text-ui-elements-dark"
            viewBox="0 0 27 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.85"
              d="M13.5 15L-5.96007e-07 -4.53067e-07L27 1.90735e-06L13.5 15Z"
              fill="currentColor"
            />
          </svg>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
