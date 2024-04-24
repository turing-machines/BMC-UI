import { createLazyFileRoute } from "@tanstack/react-router";
import type { AxiosProgressEvent } from "axios";
import { filesize } from "filesize";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-responsive-modal";
import Select, { type SelectInstance } from "react-select";
import { toast } from "react-toastify";

import WarningSvg from "../../assets/alert-warning.svg?react";
import UploadIcon from "../../assets/upload-icon.svg?react";
import { useNodeUpdateMutation } from "../../services/api/file";
import { useFlashStatusQuery } from "../../services/api/get";

export const Route = createLazyFileRoute("/node-upgrade/")({
  component: Flash,
});

interface SelectOption {
  value: number;
  label: string;
}

const nodeOptions: SelectOption[] = [
  { value: 0, label: "Node 1" },
  { value: 1, label: "Node 2" },
  { value: 2, label: "Node 3" },
  { value: 3, label: "Node 4" },
];

function Flash() {
  const formRef = useRef<HTMLFormElement>(null);
  const selectNodeRef = useRef<SelectInstance<SelectOption> | null>(null);

  const [nodeStateOpened, setNodeStateOpened] = useState(false);

  const [isFlashing, setIsFlashing] = useState(false);
  const [rebootModalOpened, setRebootModalOpened] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [progress, setProgress] = useState<{
    transferred: string;
    total?: string;
    pct: number;
  }>({ transferred: "", total: "", pct: 0 });
  const uploadProgressCallback = (progressEvent: AxiosProgressEvent) => {
    setProgress({
      transferred: filesize(progressEvent.loaded ?? 0, { standard: "jedec" }),
      total: progressEvent.total
        ? filesize(progressEvent.total, { standard: "jedec" })
        : undefined,
      pct: progressEvent.total
        ? Math.round((progressEvent.loaded / (progressEvent.total ?? 1)) * 100)
        : 100,
    });
  };
  const {
    mutate: mutateNodeUpdate,
    isIdle,
    isPending,
  } = useNodeUpdateMutation(uploadProgressCallback);
  const { data, refetch } = useFlashStatusQuery(isFlashing);

  useEffect(() => {
    if (data?.Error) {
      setStatusMessage(data.Error);
      toast.error(data.Error);
      setIsFlashing(false);
    } else if (data?.Transferring) {
      setIsFlashing(true);
      const msg = (
        formRef.current?.elements.namedItem("skipCrc") as HTMLInputElement
      ).checked
        ? "Transferring image to the node..."
        : "Checking CRC and transferring image to the node...";
      setStatusMessage(msg);

      // Update progress bar using bytes_written from Transferring data
      const bytesWritten = data.Transferring.bytes_written ?? 0;
      setProgress({
        transferred: `${filesize(bytesWritten, { standard: "jedec" })} written`,
        total: undefined,
        pct: 100,
      });
    } else if (data?.Done) {
      setIsFlashing(false);
      const msg = "Image flashed successfully to the node";
      setStatusMessage(msg);
      toast.success(msg);
    }
  }, [data]);

  const handleSubmit = () => {
    if (formRef.current) {
      setRebootModalOpened(false);
      const form = formRef.current;

      const nodeId = selectNodeRef.current!.state.selectValue[0].value;
      const file = (form.elements.namedItem("file") as HTMLInputElement)
        .files?.[0];
      const sha256 = (form.elements.namedItem("sha256") as HTMLInputElement)
        .value;
      const skipCRC = (form.elements.namedItem("skipCrc") as HTMLInputElement)
        .checked;

      setStatusMessage(`Transferring image to node ${nodeId + 1}...`);
      mutateNodeUpdate(
        { nodeId, file, sha256, skipCRC },
        {
          onSuccess: () => {
            void refetch();
          },
          onError: () => {
            const msg = `Failed to transfer the image to node ${nodeId + 1}`;
            setStatusMessage(msg);
            toast.error(msg);
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

        <div
          className="form-group row"
          onClick={() => setNodeStateOpened(!nodeStateOpened)}
        >
          <div className="select-item">
            <label htmlFor="connected-node-select">Selected node</label>
            <Select
              inputId="connected-node-select"
              ref={selectNodeRef}
              menuIsOpen={nodeStateOpened}
              options={nodeOptions}
              placeholder="Nothing Selected"
              styles={{
                control: (base) => ({
                  ...base,
                  border: "none",
                  padding: 0,
                  margin: 0,
                }),
                valueContainer: (base) => ({
                  ...base,
                  padding: "0 0 0 14px",
                  margin: 0,
                }),
                indicatorsContainer: (base) => ({
                  ...base,
                  display: "none",
                }),
                input: (base) => ({
                  ...base,
                  padding: 0,
                  margin: 0,
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected
                    ? "#e4e4e7"
                    : state.isFocused
                      ? "#f4f4f5"
                      : "inherit",
                  color: "black",
                }),
              }}
              components={{
                DropdownIndicator: () => null,
                Control(value) {
                  return (
                    <div
                      className="control"
                      onClick={value.selectProps.onMenuOpen}
                    >
                      <div className="value">{value.children}</div>
                    </div>
                  );
                },
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label
            htmlFor="node-upgrade-file-id"
            className="input-wrap input-type-file-wrap active"
          >
            <span className="label">File (remote or local):</span>
            <input type="text" name="url" className="file-upload-input" />

            <button
              type="button"
              className="file-upload-button"
              onClick={() => {
                const fileInput = formRef.current?.elements.namedItem(
                  "file"
                ) as HTMLInputElement;
                fileInput.click();
              }}
            >
              <UploadIcon />
            </button>
            <input
              type="file"
              name="file"
              id="node-upgrade-file-id"
              className="form-control hidden"
              accept=".img,.bin,.xz,application/octet-stream"
              readOnly
              onChange={(e) => {
                const filename = e.target.value.split("\\").pop();
                if (filename) {
                  const urlInput = formRef.current?.elements.namedItem(
                    "url"
                  ) as HTMLInputElement;
                  urlInput.value = filename;
                }
              }}
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
            className={`btn btn btn-turing-small-yellow ${isPending || isFlashing ? "loading" : ""}`}
            onClick={() => setRebootModalOpened(true)}
            disabled={isPending || isFlashing}
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
              className={`progress-bar ${!isPending && !isFlashing ? "loaded" : ""}`}
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
