import { Indicator, Root } from "@radix-ui/react-checkbox";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const TuringCheck = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" {...props}>
    <path
      d="M6.44864 12C6.44288 12 6.4369 12 6.43091 11.9998C6.24668 11.9949 6.07189 11.9165 5.94569 11.7815L2.18783 7.77029C1.92622 7.49119 1.93958 7.05172 2.21731 6.78882C2.49504 6.52616 2.93236 6.53935 3.19396 6.81844L6.47374 10.3196L12.8311 4.19318C13.1061 3.92797 13.5438 3.93677 13.8078 4.21378C14.0719 4.49056 14.0627 4.93004 13.7873 5.19548L6.92672 11.807C6.79799 11.931 6.62642 12 6.44864 12Z"
      strokeWidth="0.5"
    ></path>
  </svg>
);

const Checkbox = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded-sm border-2 border-neutral-900 ring-offset-white focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-60 data-[state=checked]:text-neutral-100 dark:border-neutral-100 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:data-[state=checked]:text-neutral-900",
      className
    )}
    {...props}
  >
    <Indicator className={cn("flex items-center justify-center text-current")}>
      <TuringCheck className="size-3 fill-neutral-900 stroke-neutral-900 dark:fill-neutral-100 dark:stroke-neutral-100" />
    </Indicator>
  </Root>
));
Checkbox.displayName = Root.displayName;

export { Checkbox };
