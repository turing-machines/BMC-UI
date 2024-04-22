import { createLazyFileRoute } from "@tanstack/react-router";
import type { AxiosProgressEvent } from "axios";
import { filesize } from "filesize";
import { useRef, useState } from "react";
import { Modal } from "react-responsive-modal";
import { toast } from "react-toastify";

import WarningSvg from "../../assets/alert-warning.svg?react";
import { useNodeUpdateMutation } from "../../services/api/file";

export const Route = createLazyFileRoute("/node-upgrade/")({
  component: Flash,
});

function Flash() {
  const formRef = useRef<HTMLFormElement>(null);
  const [rebootModalOpened, setRebootModalOpened] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [progress, setProgress] = useState<{
    transferred: string;
    total: string;
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
    mutate: mutateNodeUpdate,
    isIdle,
    isPending,
  } = useNodeUpdateMutation(uploadProgressCallback);

  const handleSubmit = () => {
    if (formRef.current) {
      setRebootModalOpened(false);
      const form = formRef.current;
      const nodeId = (form.elements.namedItem("nodeId") as HTMLSelectElement)
        .value;
      const file = (form.elements.namedItem("file") as HTMLInputElement)
        .files?.[0];
      const sha256 = (form.elements.namedItem("sha256") as HTMLInputElement)
        .value;
      const skipCRC = (form.elements.namedItem("skipCrc") as HTMLInputElement)
        .checked;

      setStatusMessage(`Transferring image to node ${Number.parseInt(nodeId) + 1}...`);
      mutateNodeUpdate(
        { nodeId, file, sha256, skipCRC },
        {
          onSuccess: () => {
            toast.success("OS image installed successfully");
          },
          onError: () => {
            toast.error("Failed to install OS image");
          },
        }
      );
    }
  };

  return (
    <div
      data-tab="Flash Node"
      id="node-upgrade-tab"
      className="tabs-body__item force-tab-style "
    >
      <form ref={formRef} className="form">
        <div className="form-group row">
          <div className="text-content">
            <p>Install an OS image on a selected node:</p>
          </div>
        </div>

        <div className="form-group row">
          <div className="select-item">
            <label htmlFor="node-upgrade-picker" className="col-form-label">
              Selected node:
            </label>
            <select
              id="node-upgrade-picker"
              name="nodeId"
              className="selectpicker"
              data-style="btn-outline-primary"
              required
              defaultValue={-1}
            >
              <option value={-1} disabled>
                Nothing Selected
              </option>
              <option value="0">Node 1</option>
              <option value="1">Node 2</option>
              <option value="2">Node 3</option>
              <option value="3">Node 4</option>
            </select>
          </div>
          <div data-errors="node-upgrade-picker" className="errors"></div>
        </div>

        <div className="form-group row">
          <label
            htmlFor="node-upgrade-file-id"
            className="input-wrap input-type-file-wrap active"
          >
            <span className="label">File: (remote or local)</span>
            <input type="text" className="file-upload-input" />
            <input
              type="file"
              name="file"
              id="node-upgrade-file-id"
              className="form-control"
              accept=".img,.bin,.xz,application/octet-stream"
              readOnly
            />
          </label>
        </div>

        <div className="form-group row">
          <label
            htmlFor="node-upgrade-sha256"
            className="input-wrap input-type-file-wrap active"
          >
            <span className="label">Sha256: (optional)</span>
            <input
              type="text"
              name="sha256"
              className="upgrade-sha256"
              id="node-upgrade-sha256"
            />
          </label>
        </div>

        <div className="form-group form-flex-row">
          <button
            type="button"
            className={`btn btn btn-turing-small-yellow " ${isPending ? "loading" : ""}`}
            onClick={() => setRebootModalOpened(true)}
            disabled={isPending}
          >
            <span className="caption">Install OS</span>
          </button>
          <div className="checkbox-row form-flex-row">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="skipCrc"
                name="skipCrc"
                data-color="#008000"
                data-size="small"
              />
            </div>
            <label htmlFor="skipCrc" className="label">
              skip crc
            </label>
          </div>
        </div>

        <div
          id="node-progress-group"
          className={`progress-bar-group form-group row ${isIdle || "active"}`}
        >
          <div className="progress-bar-wrap">
            <div
              className={`progress-bar ${!isPending ? "loaded" : ""}`}
              style={{ width: `${progress.pct}%` }}
            ></div>
            <div className="progress-bar-caption">
              {progress.transferred} / {progress.total}
            </div>
          </div>
          <div className="update-text">{statusMessage}</div>
        </div>
      </form>
      <Modal
        open={rebootModalOpened}
        onClose={() => setRebootModalOpened(false)}
        center
        showCloseIcon={false}
        classNames={{ modal: "modal-rounded" }}
      >
        <div className="modal">
          <div className="modal__icon">
            <WarningSvg />
          </div>
          <h2 className="modal__title">Do you want to continue?</h2>
          <p className="modal__text">
            You are about to overwrite a new image to the selected node.
          </p>
          <div className="modal__buttons">
            <button
              className="btn btn-turing-small-dark"
              onClick={() => setRebootModalOpened(false)}
            >
              Cancel
            </button>
            <button
              className={"reboot-btn btn btn-turing-small-red"}
              onClick={() => {
                handleSubmit();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
