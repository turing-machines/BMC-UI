import { Range, Root, Thumb, Track } from "@radix-ui/react-slider";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const Slider = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
      <Range className="absolute h-full bg-zinc-900 dark:bg-zinc-50" />
    </Track>
    <Thumb
      aria-label="slider thumb"
      className="block size-5 rounded-full border-2 border-zinc-900 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-50 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300"
    />
  </Root>
));
Slider.displayName = Root.displayName;

export { Slider };
