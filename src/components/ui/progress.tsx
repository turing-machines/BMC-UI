import { Indicator, Root } from "@radix-ui/react-progress";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const indicatorVariants = cva("size-full flex-1", {
  variants: {
    variant: {
      info: "bg-neutral-400 dark:bg-neutral-600",
      infoMedium: "bg-amber-300 dark:bg-amber-600",
      infoHigh: "bg-red-400 dark:bg-red-500",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const getIndicatorVariant = (warningOnHigh = false, value: number) => {
  if (warningOnHigh) {
    if (value >= 90) {
      return "infoHigh";
    } else if (value >= 75) {
      return "infoMedium";
    }
  }
  return "info";
};

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof Root> {
  value: number;
  label?: React.ReactNode;
  warningOnHigh?: boolean;
  pulsing?: boolean;
}

const Progress = forwardRef<React.ElementRef<typeof Root>, ProgressProps>(
  ({ className, value, label, warningOnHigh, pulsing, ...props }, ref) => {
    return (
      <div className="relative">
        <Root
          ref={ref}
          className={cn(
            "relative h-4 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800",
            className
          )}
          {...props}
        >
          <Indicator
            className={cn(
              "bg-neutral-900 dark:bg-neutral-100",
              indicatorVariants({
                variant: getIndicatorVariant(warningOnHigh, value),
              }),
              pulsing && "animate-pulse duration-700"
            )}
            style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
          />
          {label && (
            <div className="absolute top-0 left-0 flex size-full items-center justify-center px-4 text-xs">
              {label}
            </div>
          )}
        </Root>
      </div>
    );
  }
);
Progress.displayName = Root.displayName;

export { Progress };
