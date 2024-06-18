import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import ConfirmationModal from "@/components/ConfirmationModal";
import TabView from "@/components/TabView";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFlash } from "@/hooks/use-flash";

export const Route = createLazyFileRoute("/_tabLayout/flash-node")({
  component: FlashNode,
});

interface SelectOption {
  value: string;
  label: string;
}

const nodeOptions: SelectOption[] = [
  { value: "0", label: "Node 1" },
  { value: "1", label: "Node 2" },
  { value: "2", label: "Node 3" },
  { value: "3", label: "Node 4" },
];

function FlashNode() {
  const { t } = useTranslation();
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
    _statusMessage && setStatusMessage(_statusMessage);
  }, [_statusMessage]);

  const handleSubmit = () => {
    if (formRef.current) {
      setConfirmFlashModal(false);
      const form = formRef.current;

      const nodeId = (form.elements.namedItem("node") as HTMLSelectElement)
        .selectedOptions[0].value;
      const file = (form.elements.namedItem("file") as HTMLInputElement)
        .files?.[0];
      const url = (form.elements.namedItem("file-url") as HTMLInputElement)
        .value;
      const sha256 = (form.elements.namedItem("sha256") as HTMLInputElement)
        .value;
      const skipCRC = (form.elements.namedItem("skipCrc") as HTMLInputElement)
        .checked;

      const parsedNodeId = Number.parseInt(nodeId);

      void handleNodeUpdate({
        nodeId: parsedNodeId,
        file,
        url,
        sha256,
        skipCRC,
      });
    }
  };

  return (
    <TabView title={t("flashNode.header")}>
      <form ref={formRef}>
        <div className="mb-4">
          <Select name="node">
            <SelectTrigger label={t("flashNode.nodeSelect")}>
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
