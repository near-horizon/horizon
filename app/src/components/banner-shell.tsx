import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function BannerShell({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const [hide, setHide] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem(id + "banner")) {
      setHide(false);
    }
  }, [id]);

  return (
    <div className={cn("bg-secondary-dark py-4", { hidden: hide })}>
      <div className="relative mx-auto max-w-screen-xl px-6">
        {children}
        <div className="absolute right-6 top-1/2 -translate-y-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <XIcon
                  className="h-5 w-5 text-white"
                  onClick={() => {
                    localStorage.setItem(id + "banner", JSON.stringify(true));
                    setHide(true);
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Dismiss banner</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
