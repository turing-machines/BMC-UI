import { createLazyFileRoute } from "@tanstack/react-router";
import { Cpu } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import ConfirmationModal from "@/components/ConfirmationModal";
import FlashNodeSkeleton from "@/components/skeletons/flash-node";
import TabView from "@/components/TabView";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Toggle } from "@/components/ui/toggle";
import { useFlash } from "@/hooks/use-flash";
import { useAboutTabData } from "@/lib/api/get";

export const Route = createLazyFileRoute("/_tabLayout/flash-node")({
  component: FlashNode,
  pendingComponent: FlashNodeSkeleton,
});

const nodeOptions = [
  { value: 0, label: "Node 1" },
  { value: 1, label: "Node 2" },
  { value: 2, label: "Node 3" },
  { value: 3, label: "Node 4" },
];

const isSemverGreaterOrEqual = (a: string, b: string) => {
  return a.localeCompare(b, undefined, { numeric: true }) >= 0;
};

function FlashNode() {
  const { t } = useTranslation();
  const { data: aboutData } = useAboutTabData();
  const batchFlashingSupport = useMemo(
    () => isSemverGreaterOrEqual(aboutData.board_revision, "2.5"),
    [aboutData]
  );

  const [selectedNodes, setSelectedNodes] = useState<number[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [confirmFlashModal, setConfirmFlashModal] = useState(false);
  const {
    flashType,
    isFlashing,
    statusMessage: _statusMessage,
    nodeUpdateMutation,
    uploadProgress,
    handleNodeUpdate,
  } = useFlash();

  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (_statusMessage) setStatusMessage(_statusMessage);
  }, [_statusMessage]);

  const handleSubmit = () => {
    if (formRef.current) {
      setConfirmFlashModal(false);
      const form = formRef.current;

      const file = (form.elements.namedItem("file") as HTMLInputElement)
        .files?.[0];
      const url = (form.elements.namedItem("file-url") as HTMLInputElement)
        .value;
      const sha256 = (form.elements.namedItem("sha256") as HTMLInputElement)
        .value;
      const skipCRC = (form.elements.namedItem("skipCrc") as HTMLInputElement)
        .checked;

      // If more than one node is selected, batch flashing is enabled
      const batch =
        selectedNodes.length > 1 ? selectedNodes.slice(1) : undefined;

      void handleNodeUpdate({
        nodeId: selectedNodes[0],
        batch,
        file,
        url,
        sha256,
        skipCRC,
      });
    }
  };

  return (
    <TabView
      title={t("flashNode.header", { count: batchFlashingSupport ? 4 : 1 })}
    >
      <form ref={formRef}>
        <div className="mb-4">
          <div className="mb-2 flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold">
              {t("flashNode.nodeSelect", {
                count: batchFlashingSupport ? 4 : 1,
              })}
            </span>
            <div className="flex gap-2">
              {nodeOptions.map((option) => (
                <Toggle
                  key={option.value}
                  aria-label={t("flashNode.ariaToggleNode", {
                    nodeId: option.value + 1,
                  })}
                  className="text-xs md:text-sm"
                  pressed={selectedNodes.includes(option.value)}
                  onPressedChange={(pressed) =>
                    setSelectedNodes((prevNodes) => {
                      if (pressed) {
                        return batchFlashingSupport
                          ? [...prevNodes, option.value].sort()
                          : [option.value];
                      } else {
                        return prevNodes.filter(
                          (nodeValue) => nodeValue !== option.value
                        );
                      }
                    })
                  }
                >
                  <Cpu className="mr-2 size-4" />
                  {t("nodes.node", {
                    nodeId: option.value + 1,
                  })}
                </Toggle>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <Input
            type="file"
            name="file"
            label={t("flashNode.fileInput")}
            accept=".img,.bin,.xz,application/octet-stream"
          />
        </div>

        <div className="mb-4">
          <Input name="sha256" label={t("flashNode.shaInput")} />
        </div>

        <div className="mb-4 flex flex-wrap items-center">
          <Button
            type="button"
            onClick={() => setConfirmFlashModal(true)}
            disabled={nodeUpdateMutation.isPending || isFlashing}
            isLoading={
              nodeUpdateMutation.isPending ||
              (isFlashing && flashType === "node")
            }
          >
            {t("flashNode.submitButton")}
          </Button>
          <label className="flex cursor-pointer items-center pl-4">
            <Checkbox
              id="skipCrc"
              name="skipCrc"
              aria-label={t("flashNode.skipCrc")}
            />
            <label
              htmlFor="skipCrc"
              className="not-sr-only ml-2 text-sm font-semibold"
            >
              {t("flashNode.skipCrc")}
            </label>
          </label>
        </div>

        {uploadProgress && flashType === "node" && (
          <Progress
            aria-label={t("flashNode.ariaProgress")}
            className="mt-4"
            value={uploadProgress.pct}
            label={`${uploadProgress.transferred}${uploadProgress.total ? ` / ${uploadProgress.total}` : ""}`}
            pulsing={nodeUpdateMutation.isPending || isFlashing}
          />
        )}
        {flashType === "node" && statusMessage && (
          <div className="mt-2 text-sm">{statusMessage}</div>
        )}
      </form>
      <ConfirmationModal
        isOpen={confirmFlashModal}
        onClose={() => setConfirmFlashModal(false)}
        onConfirm={handleSubmit}
        title={t("flashNode.flashModalTitle")}
        message={t("flashNode.flashModalDescription")}
      />
    </TabView>
  );
}
