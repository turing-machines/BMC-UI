import { createLazyFileRoute } from "@tanstack/react-router";
import { InfoIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import USBSkeleton from "@/components/skeletons/usb";
import TabView from "@/components/TabView";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useUSBNode1Query, useUSBTabData } from "@/lib/api/get";
import { useUSBModeMutation } from "@/lib/api/set";

export const Route = createLazyFileRoute("/_tabLayout/usb")({
  component: USB,
  pendingComponent: USBSkeleton,
});

interface SelectOption {
  value: string;
  label: string;
  serverValue?: string;
}

const modeOptions: SelectOption[] = [
  { value: "0", label: "usb.mode.host", serverValue: "Host" },
  { value: "1", label: "usb.mode.device", serverValue: "Device" },
  { value: "2", label: "usb.mode.flash", serverValue: "Flash" },
];

const nodeOptions: SelectOption[] = [
  { value: "0", label: "Node 1" },
  { value: "1", label: "Node 2" },
  { value: "2", label: "Node 3" },
  { value: "3", label: "Node 4" },
];

function USB() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { data } = useUSBTabData();
  const { isPending, mutate: mutateUSBMode } = useUSBModeMutation();
  const { data: usbNode1 } = useUSBNode1Query();

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
            title: t("usb.changeSuccessTitle"),
            description: t("usb.changeSuccessMessage"),
          });
        },
        onError: (e) => {
          toast({
            title: t("usb.changeFailedTitle"),
            description: e.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <TabView title={t("usb.header")}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Select
            name="mode"
            defaultValue={
              modeOptions.find((option) => option.serverValue === data.mode)
                ?.value
            }
          >
            <SelectTrigger label={t("usb.modeSelect")}>
              <SelectValue placeholder={t("ui.selectPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {modeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {t(option.label)}
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
            <SelectTrigger label={t("usb.nodeSelect")}>
              <SelectValue placeholder={t("ui.selectPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {nodeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {t("nodes.node", {
                    nodeId: Number.parseInt(option.value) + 1,
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {data.bus_type === "Usb hub" && (
            <div className="mb-4 flex items-center">
              <Checkbox
                id="usbHub"
                name="usbHub"
                aria-label={t("usb.mode.usbNode1")}
              />
              <label
                htmlFor="usbHub"
                className="not-sr-only ml-2 text-sm font-semibold"
              >
                {t("usb.mode.usbNode1")}
              </label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="ml-1 size-4" />
                </TooltipTrigger>
                <TooltipContent sideOffset={16}>
                  <div className="my-1 flex max-w-sm flex-col text-pretty">
                    <p className="font-semibold">{t("usb.mode.usbNode1")}</p>
                    <p>{t("usb.mode.usbNode1Definition")}</p>
                    <p className="mt-1 font-semibold">
                      {t("usb.mode.usageWord")}
                    </p>
                    <p>{t("usb.mode.usbNode1Usage")}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-row flex-wrap justify-between">
          <Button type="submit" isLoading={isPending} disabled={isPending}>
            {t("usb.submitButton")}
          </Button>

          <div className="mt-8 flex flex-col items-start md:mt-0 md:flex-row md:items-center lg:mt-0">
            <p className="mr-4 text-base font-semibold opacity-60">
              {t("usb.mode.definitionsTitle")}
            </p>
            <div className="mt-4 flex gap-4 md:mt-0">
              <div className="group relative cursor-pointer">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between gap-1 rounded-full bg-turing-bg px-4 py-1 text-sm font-semibold dark:bg-turing-bg-dark">
                      <p>{t("usb.mode.host")}</p>
                      <InfoIcon className="size-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={16}>
                    <div className="my-1 flex max-w-sm flex-col text-pretty">
                      <p className="font-semibold">{t("usb.mode.host")}</p>
                      <p>{t("usb.mode.hostDefinition")}</p>
                      <p className="mt-1 font-semibold">
                        {t("usb.mode.usageWord")}
                      </p>
                      <p>{t("usb.mode.hostUsage")}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="group relative cursor-pointer">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between gap-1 rounded-full bg-turing-bg px-4 py-1 text-sm font-semibold dark:bg-turing-bg-dark">
                      <p>{t("usb.mode.device")}</p>
                      <InfoIcon className="size-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={16} align="end">
                    <div className="my-1 flex max-w-sm flex-col text-pretty">
                      <p className="font-semibold">{t("usb.mode.device")}</p>
                      <p>{t("usb.mode.deviceDefinition")}</p>
                      <p className="mt-1 font-semibold">
                        {t("usb.mode.usageWord")}
                      </p>
                      <p>{t("usb.mode.deviceUsage")}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="group relative cursor-pointer">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between gap-1 rounded-full bg-turing-bg px-4 py-1 text-sm font-semibold dark:bg-turing-bg-dark">
                      <p>{t("usb.mode.flash")}</p>
                      <InfoIcon className="size-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={16} align="end">
                    <div className="my-1 flex max-w-sm flex-col text-pretty">
                      <p className="font-semibold">{t("usb.mode.flash")}</p>
                      <p>{t("usb.mode.flashDefinition")}</p>
                      <p className="mt-1 font-semibold">
                        {t("usb.mode.usageWord")}
                      </p>
                      <p>{t("usb.mode.flashUsage")}</p>
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
