import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import ConfirmationModal from "@/components/ConfirmationModal";
import TabView from "@/components/TabView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useFlash } from "@/hooks/use-flash";

export const Route = createLazyFileRoute("/_tabLayout/firmware-upgrade")({
  component: FirmwareUpgrade,
});

function FirmwareUpgrade() {
  const formRef = useRef<HTMLFormElement>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [confirmFlashModal, setConfirmFlashModal] = useState(false);
  const {
    flashType,
    isFlashing,
    statusMessage: _statusMessage,
    firmwareUpdateMutation,
    uploadProgress,
    handleFirmwareUpload,
  } = useFlash();

  useEffect(() => {
    _statusMessage && setStatusMessage(_statusMessage);
  }, [_statusMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmFlashModal(true);
  };

  const handleUpload = () => {
    if (formRef.current) {
      setConfirmFlashModal(false);

      const form = formRef.current;
      const file = (form.elements.namedItem("file") as HTMLInputElement)
        .files?.[0];
      const url = (form.elements.namedItem("file-url") as HTMLInputElement)
        .value;
      const sha256 = (form.elements.namedItem("sha256") as HTMLInputElement)
        .value;

      void handleFirmwareUpload({ file, url, sha256 });
    }
  };

  return (
    <TabView title="Upgrade BMC firmware">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="file"
            name="file"
            label=".tpu file (remote or local):"
            accept=".tpu,.tpu.xz,application/octet-stream"
          />
        </div>
        <div className="mb-4">
          <Input type="text" name="sha256" label="SHA-256 (optional):" />
        </div>
        <div>
          <Button
            type="submit"
            disabled={firmwareUpdateMutation.isPending || isFlashing}
            isLoading={
              firmwareUpdateMutation.isPending ||
              (isFlashing && flashType === "firmware")
            }
          >
            Upgrade
          </Button>
        </div>
        {uploadProgress && flashType === "firmware" && (
          <Progress
            aria-label="Firmware upgrade progress"
            className="mt-4"
            value={uploadProgress.pct}
            label={`${uploadProgress.transferred}${
              uploadProgress.total ? ` / ${uploadProgress.total}` : ""
            }`}
            pulsing={firmwareUpdateMutation.isPending || isFlashing}
          />
        )}
        {flashType === "firmware" && statusMessage && (
          <div className="mt-4 text-sm">{statusMessage}</div>
        )}
      </form>
      <ConfirmationModal
        isOpen={confirmFlashModal}
        onClose={() => setConfirmFlashModal(false)}
        onConfirm={handleUpload}
        title="Upgrade Firmware?"
        message="A reboot is required to finalise the upgrade process."
      />
    </TabView>
  );
}
