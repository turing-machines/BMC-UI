import {
  Content,
  Provider as TooltipProvider,
  Root as Tooltip,
  Trigger as TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const TooltipContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 animate-in overflow-hidden rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-950 shadow-md fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
