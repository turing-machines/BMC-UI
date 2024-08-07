import { createLazyFileRoute } from "@tanstack/react-router";
import { InfoIcon } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
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
import { useUSBModeMutation, useUSBNode1Mutation } from "@/lib/api/set";

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
  const { isPending: isPendingUSBMode, mutateAsync: mutateUSBMode } =
    useUSBModeMutation();
  const { data: usbNode1 } = useUSBNode1Query();
  const { isPending: isPendingUSBNode1, mutateAsync: mutateUSBNode1 } =
    useUSBNode1Mutation();

  const [selectedMode, setSelectedMode] = useState(
    modeOptions.find((option) => option.serverValue === data.mode)?.value ?? ""
  );
  const [selectedNode, setSelectedNode] = useState(
    nodeOptions.find((option) => option.label === data.node)?.value ?? ""
  );
  const [isUsbNode1Checked, setIsUsbNode1Checked] = useState(usbNode1);

  useEffect(() => {
    // When the user chooses flash mode for node 1, the checkbox needs to be unchecked.
    if (selectedMode === "2" && selectedNode === "0") {
      setIsUsbNode1Checked(false);
    }
  }, [selectedMode, selectedNode]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (usbNode1 !== isUsbNode1Checked) {
        await mutateUSBNode1({ alternative_port: isUsbNode1Checked });
      }
      await mutateUSBMode({
        node: Number.parseInt(selectedNode),
        mode: Number.parseInt(selectedMode),
      });

      toast({
        title: t("usb.changeSuccessTitle"),
        description: t("usb.changeSuccessMessage"),
      });
    } catch (e) {
      toast({
        title: t("usb.changeFailedTitle"),
        description: (e as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <TabView title={t("usb.header")}>
      <form onSubmit={(e) => void handleSubmit(e)}>
        <div className="space-y-4">
          <Select
            name="mode"
            value={selectedMode}
            onValueChange={(value) => setSelectedMode(value)}
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
            value={selectedNode}
            onValueChange={(value) => setSelectedNode(value)}
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
                checked={isUsbNode1Checked}
                onCheckedChange={(checked) =>
                  setIsUsbNode1Checked(checked as boolean)
                }
                disabled={selectedMode === "2" && selectedNode === "0"}
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
          <Button
            type="submit"
            isLoading={isPendingUSBMode || isPendingUSBNode1}
            disabled={isPendingUSBMode || isPendingUSBNode1}
          >
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
