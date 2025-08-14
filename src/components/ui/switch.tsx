import { Root, Thumb } from "@radix-ui/react-switch";
import { type LucideProps } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof Root> {
  onIcon?: React.ReactElement<LucideProps>;
  offIcon?: React.ReactElement<LucideProps>;
}

const Switch = forwardRef<React.ElementRef<typeof Root>, SwitchProps>(
  ({ className, onIcon, offIcon, ...props }, ref) => (
    <Root
      className={cn(
        "peer inline-flex h-9 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-60 data-[state=checked]:bg-neutral-900 data-[state=unchecked]:bg-neutral-200 dark:focus-visible:ring-neutral-300 dark:focus-visible:ring-offset-neutral-950 dark:data-[state=checked]:bg-neutral-100 dark:data-[state=unchecked]:bg-neutral-700",
        className
      )}
      {...props}
      ref={ref}
    >
      <Thumb
        className={cn(
          "pointer-events-none block h-8 w-8 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0 dark:bg-turing-bg-dark",
          "flex items-center justify-center"
        )}
      >
        {props.checked ? onIcon : offIcon}
      </Thumb>
    </Root>
  )
);
Switch.displayName = Root.displayName;

export { Switch };
