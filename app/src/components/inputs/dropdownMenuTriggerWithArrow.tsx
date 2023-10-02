import React from "react";

import { cn } from "~/lib/utils";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

export const DropdownMenuTriggerWithArrow = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> & {
    showArrow?: boolean;
  }
>(({ className, children, showArrow = true, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    className={cn("group", className)}
    {...props}
  >
    {children}
    {showArrow && (
      <ChevronDown
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    )}
  </DropdownMenuPrimitive.Trigger>
));

DropdownMenuTriggerWithArrow.displayName =
  DropdownMenuPrimitive.Trigger.displayName;
