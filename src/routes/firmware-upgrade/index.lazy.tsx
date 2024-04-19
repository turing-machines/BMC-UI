import { createLazyFileRoute } from "@tanstack/react-router";
import type { AxiosProgressEvent } from "axios";
import { filesize } from "filesize";
import { useState } from "react";

import { useFirmwareUpdateMutation } from "../../services/api/file";

export const Route = createLazyFileRoute("/firmware-upgrade/")({
  component: FirmwareUpgrade,
});

function FirmwareUpgrade() {
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
    mutate: mutateFirmwareUpdate,
    isIdle,
    isPending,
  } = useFirmwareUpdateMutation(uploadProgressCallback);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const file = (form.file as HTMLInputElement).files?.[0];
    const sha256 = (form.sha256 as HTMLInputElement).value;
    const formData = new FormData();
    if (file) formData.append("file", file);
    if (sha256) formData.append("sha256", sha256);

    mutateFirmwareUpdate(formData);
  };

  return (
    <div
      data-tab="Firmware Upgrade"
      id="firmware-upgrade-tab"
      className="tabs-body__item "
    >
      <form className="form" id="firmware-upgrade-form" onSubmit={handleSubmit}>
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
            //disabled
            type="submit"
            className="btn btn-turing-small-yellow"
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
              className={`progress-bar ${!isPending ? "loaded" : ""}`}
              style={{ width: `${progress.pct}%` }}
            ></div>
            <div className="progress-bar-caption">
              {progress.transferred} / {progress.total}
            </div>
          </div>
          <div className="update-text"></div>
        </div>
      </form>
    </div>
  );
}
