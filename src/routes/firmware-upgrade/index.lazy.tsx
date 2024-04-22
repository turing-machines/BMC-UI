import { createLazyFileRoute } from "@tanstack/react-router";
import type { AxiosProgressEvent } from "axios";
import { filesize } from "filesize";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-responsive-modal";
import { toast } from "react-toastify";

import SuccessSvg from "../../assets/alert-success.svg?react";
import WarningSvg from "../../assets/alert-warning.svg?react";
import { useFirmwareUpdateMutation } from "../../services/api/file";
import { useFirmwareStatusQuery } from "../../services/api/get";
import { useRebootBMCMutation } from "../../services/api/set";

export const Route = createLazyFileRoute("/firmware-upgrade/")({
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

  const handleFirmwareUpload = () => {
    if (formRef.current) {
      setConfirmFlashModal(false);

      const form = formRef.current;
      const file = (form.elements.namedItem("file") as HTMLInputElement)
        .files?.[0];
      const sha256 = (form.elements.namedItem("sha256") as HTMLInputElement)
        .value;

      setStatusMessage("Uploading BMC firmware...");
      mutateFirmwareUpdate(
        { file, sha256 },
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

  return (
    <div
      data-tab="Firmware Upgrade"
      id="firmware-upgrade-tab"
      className="tabs-body__item "
    >
      <form ref={formRef} className="form" id="firmware-upgrade-form">
        <div className="form-group row">
          <div className="text-content">
            <p>Upgrade BMC firmware:</p>
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="firmware-upgrade-file-id"
            className="input-wrap input-type-file-wrap active"
          >
            <span className="label">.tpu file</span>
            <input type="text" className="file-upload-input" />
            <input
              type="file"
              name="file"
              id="firmware-upgrade-file-id"
              className="form-control"
              accept=".tpu,.tpu.xz,application/octet-stream"
              readOnly
            />
          </label>
        </div>
        <div className="form-group row">
          <label
            htmlFor="firmware-upgrade-sha256"
            className="input-wrap input-type-file-wrap active"
          >
            <span className="label">Sha256: (optional)</span>
            <input
              type="text"
              name="sha256"
              className="upgrade-sha256"
              id="firmware-upgrade-sha256"
            />
          </label>
        </div>
        <div className="form-group">
          <button
            type="button"
            className={`btn btn-turing-small-yellow ${isPending || isUpgrading ? "loading" : ""}`}
            disabled={isPending || isUpgrading}
            onClick={() => setConfirmFlashModal(true)}
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
      <Modal
        open={confirmFlashModal}
        onClose={() => setConfirmFlashModal(false)}
        center
        showCloseIcon={false}
        classNames={{ modal: "modal-rounded" }}
      >
        <div className="modal">
          <div className="modal__icon">
            <WarningSvg />
          </div>
          <h2 className="modal__title">Upgrade Firmware?</h2>
          <p className="modal__text">
            A reboot is required to finalise the upgrade process
          </p>
          <div className="modal__buttons">
            <button
              className="btn btn-turing-small-dark"
              onClick={() => setConfirmFlashModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="continue-btn btn btn-turing-small-yellow"
              onClick={handleFirmwareUpload}
            >
              Continue
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={rebootModalOpened}
        onClose={() => setRebootModalOpened(false)}
        center
        showCloseIcon={false}
        classNames={{ modal: "modal-rounded" }}
      >
        <div className="modal">
          <div className="modal__icon">
            <SuccessSvg />
          </div>
          <h2 className="modal__title">Upgrade Finished!</h2>
          <p className="modal__text">
            To complete the upgrade a reboot is required.
          </p>
          <p className="modal__text">
            Be aware that the nodes will lose power until booted.
          </p>
          <p className="modal__text">Do you want to reboot?</p>
          <div className="modal__buttons">
            <button
              className="btn btn-turing-small-dark"
              onClick={() => setRebootModalOpened(false)}
            >
              Cancel
            </button>
            <button
              className="reboot-btn btn btn-turing-small-red"
              onClick={() => handleRebootBMC()}
            >
              Reboot
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
