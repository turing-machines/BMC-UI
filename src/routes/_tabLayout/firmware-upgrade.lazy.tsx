import { createLazyFileRoute } from "@tanstack/react-router";
import type { AxiosProgressEvent } from "axios";
import { filesize } from "filesize";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import ConfirmationModal from "../../components/ConfirmationModal";
import FileInput from "../../components/FileInput";
import RebootModal from "../../components/RebootModal";
import TextInput from "../../components/TextInput";
import { useFirmwareUpdateMutation } from "../../services/api/file";
import { useFirmwareStatusQuery } from "../../services/api/get";
import { useRebootBMCMutation } from "../../services/api/set";

export const Route = createLazyFileRoute("/_tabLayout/firmware-upgrade")({
  component: FirmwareUpgrade,
});

function FirmwareUpgrade() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [confirmFlashModal, setConfirmFlashModal] = useState(false);
  const [rebootModalOpened, setRebootModalOpened] = useState(false);
  const [progress, setProgress] = useState<{
    transferred: string;
    total?: string;
    pct: number;
  }>({ transferred: "", total: "", pct: 0 });
  const uploadProgressCallback = (progressEvent: AxiosProgressEvent) => {
    setProgress({
      transferred: filesize(progressEvent.loaded ?? 0, { standard: "jedec" }),
      total: filesize(progressEvent.total ?? 0, { standard: "jedec" }),
      pct: Math.round(
        ((progressEvent.loaded ?? 0) / (progressEvent.total ?? 1)) * 100
      ),
    });
  };
  const {
    mutate: mutateFirmwareUpdate,
    isIdle,
    isPending,
  } = useFirmwareUpdateMutation(uploadProgressCallback);
  const { mutate: mutateRebootBMC } = useRebootBMCMutation();
  const { data, refetch } = useFirmwareStatusQuery(isUpgrading);

  useEffect(() => {
    if (data?.Error) {
      setStatusMessage(data.Error);
      toast.error(data.Error);
      setIsUpgrading(false);
    } else if (data?.Transferring) {
      setIsUpgrading(true);
      setStatusMessage("Writing firmware to BMC...");

      // Update progress bar using bytes_written from Transferring data
      const bytesWritten = data.Transferring.bytes_written ?? 0;
      setProgress({
        transferred: `${filesize(bytesWritten, { standard: "jedec" })} written`,
        total: undefined,
        pct: 100,
      });
    } else if (data?.Done) {
      setIsUpgrading(false);
      const msg = "Firmware upgrade completed successfully";
      setStatusMessage(msg);
      toast.success(msg);
      setRebootModalOpened(true);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmFlashModal(true);
  };

  const handleFirmwareUpload = () => {
    if (formRef.current) {
      setConfirmFlashModal(false);

      const form = formRef.current;
      const file = (form.elements.namedItem("file") as HTMLInputElement)
        .files?.[0];
      const url = (form.elements.namedItem("file-url") as HTMLInputElement)
        .value;
      const sha256 = (form.elements.namedItem("sha256") as HTMLInputElement)
        .value;

      setStatusMessage("Uploading BMC firmware...");
      mutateFirmwareUpdate(
        { file, url, sha256 },
        {
          onSuccess: () => {
            void refetch();
          },
          onError: () => {
            const msg = "Failed to upgrade firmware";
            setStatusMessage(msg);
            toast.error(msg);
          },
        }
      );
    }
  };

  const handleRebootBMC = () => {
    setRebootModalOpened(false);
    mutateRebootBMC(undefined, {
      onSuccess: () => {
        toast.success("Rebooting BMC...");
      },
      onError: () => {
        toast.error("Failed to reboot BMC");
      },
    });
  };

  return (
    <div
      data-tab="Firmware Upgrade"
      id="firmware-upgrade-tab"
      className="tabs-body__item "
    >
      <form
        ref={formRef}
        className="form"
        id="firmware-upgrade-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group row">
          <div className="text-content">
            <p>Upgrade BMC firmware:</p>
          </div>
        </div>
        <div className="form-group row">
          <FileInput
            name="file"
            label=".tpu file (remote or local):"
            accept=".tpu,.tpu.xz,application/octet-stream"
          />
        </div>
        <div className="form-group row">
          <TextInput
            name="sha256"
            label="SHA-256 (optional):"
            className="input-type-file-wrap"
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className={`btn btn-turing-small-yellow ${isPending || isUpgrading ? "loading" : ""}`}
            disabled={isPending || isUpgrading}
          >
            <span className="caption">Upgrade</span>
          </button>
        </div>
        <div
          id="firmware-progress-group"
          className={`progress-bar-group form-group row ${isIdle || "active"}`}
        >
          <div className="progress-bar-wrap">
            <div
              className={`progress-bar ${!isPending && !isUpgrading ? "loaded" : ""}`}
              style={{ width: `${progress.pct}%` }}
            ></div>
            <div className="progress-bar-caption">
              {progress.transferred}
              {progress.total ? ` / ${progress.total}` : ""}
            </div>
          </div>
          <div className="update-text">{statusMessage}</div>
        </div>
      </form>
      <ConfirmationModal
        isOpen={confirmFlashModal}
        onClose={() => setConfirmFlashModal(false)}
        onConfirm={handleFirmwareUpload}
        title="Upgrade Firmware?"
        message="A reboot is required to finalise the upgrade process"
      />
      <RebootModal
        isOpen={rebootModalOpened}
        onClose={() => setRebootModalOpened(false)}
        onReboot={handleRebootBMC}
        title="Upgrade Finished!"
        message={
          <>
            <p>To complete the upgrade a reboot is required.</p>
            <p>Be aware that the nodes will lose power until booted.</p>
            <p>Do you want to reboot?</p>
          </>
        }
        isPending={isPending}
      />
    </div>
  );
}
