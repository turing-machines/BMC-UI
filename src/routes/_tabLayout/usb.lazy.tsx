import { createLazyFileRoute } from "@tanstack/react-router";
import { InfoIcon } from "lucide-react";

import USBSkeleton from "@/components/skeletons/usb";
import TabView from "@/components/TabView";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useUSBTabData } from "@/lib/api/get";
import { useUSBModeMutation } from "@/lib/api/set";

export const Route = createLazyFileRoute("/_tabLayout/usb")({
  component: USB,
  pendingComponent: USBSkeleton,
});

interface SelectOption {
  value: string;
  label: string;
}

const modeOptions: SelectOption[] = [
  { value: "0", label: "Host" },
  { value: "1", label: "Device" },
  { value: "2", label: "Flash" },
];

const nodeOptions: SelectOption[] = [
  { value: "0", label: "Node 1" },
  { value: "1", label: "Node 2" },
  { value: "2", label: "Node 3" },
  { value: "3", label: "Node 4" },
];

function USB() {
  const { toast } = useToast();
  const { data } = useUSBTabData();
  const { isPending, mutate: mutateUSBMode } = useUSBModeMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const node = Number.parseInt(
      (form.elements.namedItem("node") as HTMLInputElement).value
    );
    const mode = Number.parseInt(
      (form.elements.namedItem("mode") as HTMLInputElement).value
    );
    mutateUSBMode(
      { node, mode },
      {
        onSuccess: () => {
          toast({
            title: "USB mode changed",
            description: "USB mode changed successfully",
          });
        },
        onError: (e) => {
          toast({
            title: "USB mode change failed",
            description: e.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <TabView title="USB route">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Select
            name="mode"
            defaultValue={
              modeOptions.find((option) => option.label === data.mode)?.value
            }
          >
            <SelectTrigger label="USB mode">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {modeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            name="node"
            defaultValue={
              nodeOptions.find((option) => option.label === data.node)?.value
            }
          >
            <SelectTrigger label="Connected node">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {nodeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 flex flex-row flex-wrap justify-between">
          <Button type="submit" isLoading={isPending} disabled={isPending}>
            Change
          </Button>

          <div className="mt-8 flex items-center md:mt-0 lg:mt-0">
            <p className="mr-4 text-base font-semibold opacity-60">
              USB mode definitions
            </p>
            <div className="flex gap-4">
              <div className="group relative cursor-pointer">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between gap-1 rounded-full bg-turing-bg px-4 py-1 text-sm font-semibold dark:bg-turing-bg-dark">
                      <p>Host</p>
                      <InfoIcon className="size-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={16}>
                    <div className="my-1 flex max-w-sm flex-col text-wrap">
                      <p className="font-semibold">Host</p>
                      <p>Turns the USB_OTG port power on.</p>
                      <p className="mt-1 font-semibold">Usage</p>
                      <p>
                        Use when you want to connect USB devices (like keyboard,
                        mouse, USB drive, etc) through the USB_OTG port to
                        supported modules.
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="group relative cursor-pointer">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between gap-1 rounded-full bg-turing-bg px-4 py-1 text-sm font-semibold dark:bg-turing-bg-dark">
                      <p>Device</p>
                      <InfoIcon className="size-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={16} align="end">
                    <div className="my-1 flex max-w-sm flex-col text-wrap">
                      <p className="font-semibold">Device</p>
                      <p>The default mode. Turns the USB_OTG power off.</p>
                      <p className="mt-1 font-semibold">Usage</p>
                      <p>Use in any other case.</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="group relative cursor-pointer">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between gap-1 rounded-full bg-turing-bg px-4 py-1 text-sm font-semibold dark:bg-turing-bg-dark">
                      <p>Flash</p>
                      <InfoIcon className="size-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={16} align="end">
                    <div className="my-1 flex max-w-sm flex-col text-wrap">
                      <p className="font-semibold">Flash</p>
                      <p>
                        Turns the module into flashing mode and sets the USB_OTG
                        into device mode.
                      </p>
                      <p className="mt-1 font-semibold">Usage</p>
                      <p>Use to flash the module using USB_OTG port.</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </form>
    </TabView>
  );
}
