import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import Spinner from "@/assets/spinner.svg?react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full border-2 text-xs font-semibold uppercase outline-black transition duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        "turing-green":
          "border-black bg-turing-btn text-zinc-900 hover:bg-turing-btn-hover",
        bw: "border-black bg-white text-zinc-900 hover:bg-black hover:text-white",
        destructive:
          "border-red-700 bg-red-50 text-red-700 hover:bg-red-700 hover:text-white",
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
      variant,
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
          <div className="flex items-center justify-center transition-all">
            <Spinner className="absolute size-6 animate-spin fill-black" />
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
