import { Indicator, Root } from "@radix-ui/react-progress";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const indicatorVariants = cva("size-full flex-1", {
  variants: {
    variant: {
      default: "bg-turing-btn-hover dark:bg-turing-btn-hover",
      info: "bg-neutral-400 dark:bg-neutral-600",
      infoMedium: "bg-amber-300 dark:bg-amber-600",
      infoHigh: "bg-red-400 dark:bg-red-500",
    },
  },
});

const getIndicatorVariant = (variant: "default" | "info", value: number) => {
  if (variant === "info") {
    if (value >= 90) {
      return "infoHigh";
    } else if (value >= 75) {
      return "infoMedium";
    }
  }
  return variant;
};

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof Root> {
  value: number;
  label?: React.ReactNode;
  variant?: "default" | "info";
  pulsing?: boolean;
}

const Progress = forwardRef<React.ElementRef<typeof Root>, ProgressProps>(
  (
    { className, value, label, variant = "default", pulsing, ...props },
    ref
  ) => {
    return (
      <div className="relative">
        <Root
          ref={ref}
          className={cn(
            "relative h-4 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800",
            variant === "default" && "dark:text-neutral-900",
            className
          )}
          {...props}
        >
          <Indicator
            className={cn(
              "bg-neutral-900 dark:bg-neutral-100",
              indicatorVariants({
                variant: getIndicatorVariant(variant, value),
              }),
              pulsing && "animate-pulse duration-700"
            )}
            style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
          />
          {label && (
            <div className="absolute left-0 top-0 flex size-full items-center justify-center px-4 text-xs">
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
