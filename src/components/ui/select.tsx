import {
  Content,
  Group as SelectGroup,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root as Select,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value as SelectValue,
  Viewport,
} from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Trigger> {
  label: string;
}

const SelectTrigger = forwardRef<
  React.ElementRef<typeof Trigger>,
  SelectTriggerProps
>(({ className, children, label, ...props }, ref) => (
  <label className="relative block">
    <Trigger
      ref={ref}
      className={cn(
        "flex h-12 w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-4 pt-5 pb-2 text-sm font-semibold ring-offset-white placeholder:text-neutral-500 focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-900 dark:ring-offset-neutral-800 dark:focus:ring-neutral-300 [&>span]:line-clamp-1",
        className
      )}
      aria-label={label}
      {...props}
    >
      {children}
      <Icon asChild>
        <ChevronDown className="absolute top-1/2 right-4 size-6 -translate-y-1/2 opacity-60" />
      </Icon>
    </Trigger>
    <span className="absolute top-0 left-0 origin-left -translate-y-2 px-4 py-3 text-sm font-semibold opacity-60 duration-200 ease-in-out peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-2">
      {label}
    </span>
  </label>
));
SelectTrigger.displayName = Trigger.displayName;

const SelectScrollUpButton = forwardRef<
  React.ElementRef<typeof ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof ScrollUpButton>
>(({ className, ...props }, ref) => (
  <ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="size-4" />
  </ScrollUpButton>
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;

const SelectScrollDownButton = forwardRef<
  React.ElementRef<typeof ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof ScrollDownButton>
>(({ className, ...props }, ref) => (
  <ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="size-4" />
  </ScrollDownButton>
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;

const SelectContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-950 shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)"
        )}
      >
        {children}
      </Viewport>
      <SelectScrollDownButton />
    </Content>
  </Portal>
));
SelectContent.displayName = Content.displayName;

const SelectLabel = forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label
    ref={ref}
    className={cn("py-1.5 pr-2 pl-8 text-sm font-bold", className)}
    {...props}
  />
));
SelectLabel.displayName = Label.displayName;

const SelectItem = forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default items-center rounded-xs py-1.5 pr-2 pl-8 text-sm font-semibold outline-hidden select-none focus:bg-neutral-100 focus:text-neutral-900 data-disabled:pointer-events-none data-disabled:opacity-60 dark:focus:bg-neutral-900 dark:focus:text-neutral-100",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <ItemIndicator>
        <Check className="size-4" />
      </ItemIndicator>
    </span>

    <ItemText>{children}</ItemText>
  </Item>
));
SelectItem.displayName = Item.displayName;

const SelectSeparator = forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={cn(
      "-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-900",
      className
    )}
    {...props}
  />
));
SelectSeparator.displayName = Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
