import { createLazyFileRoute } from "@tanstack/react-router";
import type { AxiosProgressEvent } from "axios";
import { filesize } from "filesize";
import { useState } from "react";

import { useNodeUpdateMutation } from "../../services/api/file";

export const Route = createLazyFileRoute("/node-upgrade/")({
  component: Flash,
});

function Flash() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nodeId = (form.nodeId as HTMLInputElement).value;
    const file = (form.file as HTMLInputElement).files?.[0];
    const sha256 = (form.sha256 as HTMLInputElement).value;
    const skipCRC = (form.skipCrc as HTMLInputElement).checked;

    mutateNodeUpdate({ nodeId, file, sha256, skipCRC });
  };

  return (
    <div
      data-tab="Flash Node"
      id="node-upgrade-tab"
      className="tabs-body__item force-tab-style "
    >
      <form id="node-upgrade-form" className="form" onSubmit={handleSubmit}>
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
            >
              <option selected disabled>
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
          <button type="submit" className="btn btn btn-turing-small-yellow">
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
          <div className="update-text"></div>
        </div>
      </form>
    </div>
  );
}
