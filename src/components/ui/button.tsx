import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import Spinner from "@/assets/spinner.svg?react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full border-2 text-xs font-semibold uppercase outline-black transition duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        "turing-green":
          "border-black bg-turing-btn fill-neutral-900 text-neutral-900 hover:bg-turing-btn-hover",
        bw: "border-black bg-white fill-neutral-900 hover:bg-black hover:text-white dark:border-white dark:bg-black dark:fill-white dark:text-white dark:hover:bg-white dark:hover:text-black",
        bwSquare:
          "rounded-lg border-black bg-white fill-neutral-900 hover:bg-black hover:text-white dark:border-white dark:bg-black dark:fill-white dark:text-white dark:hover:bg-white dark:hover:text-black",
        destructive:
          "border-red-700 bg-red-50 text-red-700 hover:bg-red-700 hover:text-neutral-100 dark:border-red-100 dark:bg-red-700 dark:text-neutral-100 dark:hover:bg-red-100 dark:hover:text-red-700",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "turing-green",
      size: "default",
    },
  }
);

const getSpinnerFill = (variant: string | null) => {
  if (variant === "destructive") {
    return "fill-red-700 dark:fill-red-50 dark:hover:fill-red-700";
  } else if (variant === "turing-green") {
    return "fill-neutral-900";
  }
  return "fill-neutral-900 dark:fill-white dark:hover:fill-neutral-900";
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "turing-green",
      size,
      asChild = false,
      isLoading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          isLoading && "relative"
        )}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner
              className={cn(
                "absolute size-6 animate-spin",
                getSpinnerFill(variant)
              )}
            />
            <span className="opacity-0">{children}</span>
          </div>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
