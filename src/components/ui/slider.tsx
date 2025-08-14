import { Range, Root, Thumb, Track } from "@radix-ui/react-slider";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

const Slider = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => {
  const { t } = useTranslation();
  return (
    <Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        className
      )}
      {...props}
    >
      <Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
        <Range className="absolute h-full bg-neutral-950 dark:bg-neutral-100" />
      </Track>
      <Thumb
        aria-label={t("ui.ariaSliderThumb")}
        className="block size-5 rounded-full border-2 border-neutral-900 bg-white ring-offset-white transition-colors focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-60 dark:border-neutral-100 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300"
      />
    </Root>
  );
});
Slider.displayName = Root.displayName;

export { Slider };
