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
        "peer inline-flex h-9 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-zinc-900 data-[state=unchecked]:bg-zinc-200 dark:focus-visible:ring-zinc-300 dark:focus-visible:ring-offset-zinc-950 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=unchecked]:bg-zinc-800",
        className
      )}
      {...props}
      ref={ref}
    >
      <Thumb
        className={cn(
          "pointer-events-none block h-8 w-8 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0 dark:bg-zinc-950",
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
