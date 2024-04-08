import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/node-upgrade")({
  component: Flash,
});

function Flash() {
  return (
    <div
      data-tab="Flash Node"
      id="node-upgrade-tab"
      className="tabs-body__item force-tab-style "
    >
      <form id="node-upgrade-form" className="form ">
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
              data-parsley-errors-container="[data-errors=node-upgrade-picker]"
              id="node-upgrade-picker"
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
              accept=".img,.bin,.xz"
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
              className="upgrade-sha256"
              id="node-upgrade-sha256"
            />
          </label>
        </div>

        <div className="form-group form-flex-row">
          <button
            disabled
            type="submit"
            className="btn btn btn-turing-small-yellow"
          >
            <span className="caption">Install OS</span>
          </button>
          <div className="checkbox-row form-flex-row">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="skipCrc"
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
          className="progress-bar-group form-group row"
        >
          <div className="progress-bar-wrap">
            <div className="progress-bar" style={{ width: "0%" }}></div>
            <div className="progress-bar-caption"></div>
          </div>
          <div className="update-text"></div>
        </div>
      </form>
    </div>
  );
}
